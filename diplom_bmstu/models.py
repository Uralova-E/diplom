from django.db import models

class Positions(models.Model):
    positionid = models.BigAutoField(db_column='PositionID', primary_key=True)  # Field name made lowercase.
    title_of_position = models.CharField(db_column='Title_of_position', max_length=50)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Positions'


class StudentRecord(models.Model):
    student_recordid = models.BigAutoField(db_column='Student_recordID', primary_key=True)  # Field name made lowercase.
    consultationid = models.ForeignKey('Consultation', models.DO_NOTHING, db_column='consultationID')  # Field name made lowercase.
    studentid = models.ForeignKey('Students', models.DO_NOTHING, db_column='studentID')  # Field name made lowercase.
    visiting = models.CharField(db_column='Visiting', max_length=3, blank=True, null=True)  # Field name made lowercase.
    notes_of_lecturer = models.CharField(db_column='Notes_of_lecturer', max_length=400, blank=True, null=True)  # Field name made lowercase.

    @staticmethod
    def getStudentRecord():
        return StudentRecord.objects.all()

    @staticmethod
    def update(data):
        return StudentRecord.save(data)

    def getByStudentRecordId(consultationid):
        consultations_db = StudentRecord.objects.all().filter(consultationid=consultationid)
        list_length = len(consultations_db)
        consultations = list(range(list_length))

        for i in range(list_length):
            student = consultations_db[i].studentid
            student_group = student.groupid

            consultations[i] = {
                "recordid": consultations_db[i].student_recordid,
                "studentid": student.studentid,
                "student": f'{student.last_name_student} {student.first_name_student} {student.patronymic_student}',
                "group": student_group.number_of_group,
                "visiting": consultations_db[i].visiting,
                "notes": consultations_db[i].notes_of_lecturer
            }
        return consultations

    class Meta:
        managed = False
        db_table = 'Student record'


class Users(models.Model):
    userid = models.BigAutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    lecturerid = models.ForeignKey('Lecturer', models.DO_NOTHING, db_column='lecturerID', blank=True, null=True)  # Field name made lowercase.
    studentid = models.ForeignKey('Students', models.DO_NOTHING, db_column='studentID', blank=True, null=True)  # Field name made lowercase.
    login = models.CharField(db_column='Login', max_length=50)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=50)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Users'


class Auditorium(models.Model):
    auditoriumid = models.BigAutoField(primary_key=True)
    type_of_auditoriumid = models.ForeignKey('TypeOfAuditorium', models.DO_NOTHING, db_column='type_of_auditoriumid')
    university_buildingid = models.ForeignKey('UniversityBuilding', models.DO_NOTHING, db_column='university_buildingid')
    number_of_auditorium = models.CharField(max_length=8)
    capacity = models.IntegerField()

    def getAuditorium(self):
        return Auditorium.objects.all()

    class Meta:
        managed = False
        db_table = 'auditorium'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class Consultation(models.Model):
    consultationid = models.BigAutoField(primary_key=True)
    auditoriumid = models.ForeignKey(Auditorium, models.DO_NOTHING, db_column='auditoriumid')
    lecturerid = models.ForeignKey('Lecturer', models.DO_NOTHING, db_column='lecturerid')
    topic = models.CharField(max_length=300)
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    start_time = models.TimeField(db_column='Start_time')  # Field name made lowercase.
    end_time = models.TimeField(db_column='End_time')  # Field name made lowercase.
    groupid = models.ForeignKey('Groups', models.DO_NOTHING, db_column='groupid')
    was_conducted = models.CharField(db_column='Was_conducted', max_length=3, blank=True, null=True)  # Field name made lowercase.
    notes = models.CharField(db_column='Notes', max_length=400, blank=True, null=True)  # Field name made lowercase.
    disciplineid = models.ForeignKey('Discipline', models.DO_NOTHING, db_column='disciplineID', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'consultation'

class ConsultationGateway:
    @staticmethod
    def update(data):
        return Consultation.save(data)

    @staticmethod
    def create(data):
        new_consultation = Consultation.objects.create(
            auditoriumid=Auditorium(data['auditoriumid']),
            lecturerid=Lecturer(data['lecturerid']),
            topic=data['topic'],
            date=data['date'],
            start_time=data['start_time'],
            end_time=data['end_time'],
            groupid=Groups(data['groupid']),
            was_conducted=data['was_conducted'],
            notes=data['notes'],
            disciplineid=Discipline(data['disciplineid'])
        )
        return new_consultation


    @staticmethod
    def getByLecturerId(id):
        return Consultation.objects.filter(lecturerid=id)

    @staticmethod
    def getById(id):
        return Consultation.objects.filter(consultationid=id)

    @staticmethod
    def getConsultation():
        return Consultation.objects.all()

    @staticmethod
    def getByLecturerGroupId(lecturerid, groupid):
        return Consultation.objects.filter(lecturerid=lecturerid).filter(groupid=groupid)



class Department(models.Model):
    departmentid = models.BigAutoField(db_column='departmentID', primary_key=True)  # Field name made lowercase.
    title_of_department = models.CharField(db_column='Title_of_department', max_length=350)  # Field name made lowercase.
    abbreviation = models.CharField(max_length=5)
    facultyid = models.ForeignKey('Faculty', models.DO_NOTHING, db_column='facultyID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'department'


class Discipline(models.Model):
    disciplineid = models.BigIntegerField(db_column='disciplineID', primary_key=True)  # Field name made lowercase.
    name_of_discipline = models.CharField(db_column='Name_of_discipline', max_length=300)  # Field name made lowercase.

    def getDiscipline(self):
        return Discipline.objects.all()

    class Meta:
        managed = False
        db_table = 'discipline'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Faculty(models.Model):
    facultyid = models.BigAutoField(db_column='facultyID', primary_key=True)  # Field name made lowercase.
    title_of_faculty = models.CharField(db_column='Title_of_faculty', max_length=350)  # Field name made lowercase.
    abbreviated_name_of_faculty = models.CharField(db_column='Abbreviated_name_of_faculty', max_length=10)  # Field name made lowercase.

    class Meta:
        # managed = False
        db_table = 'faculty'


class Groups(models.Model):
    groupid = models.BigAutoField(primary_key=True)
    number_of_group = models.CharField(db_column='Number_of_group', max_length=10)  # Field name made lowercase.
    departmentid = models.ForeignKey(Department, models.DO_NOTHING, db_column='departmentID')  # Field name made lowercase.
    year_of_entry = models.IntegerField(db_column='Year_of_entry')  # Field name made lowercase.

    def getGroups(self):
        return Groups.objects.all()

    class Meta:
        managed = False
        db_table = 'groups'


class Lecturer(models.Model):
    lecturerid = models.BigAutoField(primary_key=True)
    last_name_lecturer = models.CharField(max_length=50, blank=True, null=True)
    first_name_lecturer = models.CharField(max_length=50)
    patronymic_lecturer = models.CharField(max_length=50, blank=True, null=True)
    positionid = models.ForeignKey(Positions, models.DO_NOTHING, db_column='PositionID')  # Field name made lowercase.
    departmentid = models.ForeignKey(Department, models.DO_NOTHING, db_column='departmentID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'lecturer'


class Students(models.Model):
    studentid = models.BigAutoField(primary_key=True)
    groupid = models.ForeignKey(Groups, models.DO_NOTHING, db_column='groupid')
    last_name_student = models.CharField(max_length=50, blank=True, null=True)
    first_name_student = models.CharField(max_length=50)
    patronymic_student = models.CharField(max_length=50, blank=True, null=True)
    number_of_record_book = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'students'


class TypeOfAuditorium(models.Model):
    type_of_auditoriumid = models.BigAutoField(primary_key=True)
    name_of_auditorium = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'type_of_auditorium'


class UniversityBuilding(models.Model):
    university_buildingid = models.BigAutoField(primary_key=True)
    name_of_building = models.CharField(max_length=50)
    address = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'university_building'

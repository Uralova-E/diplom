# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Positions(models.Model):
    positionid = models.BigAutoField(db_column='PositionID', primary_key=True)  # Field name made lowercase.
    title_of_position = models.TextField(db_column='Title_of_position', blank=True, null=True)  # Field name made lowercase.
    salary = models.TextField(db_column='Salary', blank=True, null=True)  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'Positions'


class Users(models.Model):
    userid = models.BigAutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    lecturerid = models.ForeignKey('Lecturer', models.DO_NOTHING, db_column='lecturerID', blank=True, null=True)  # Field name made lowercase.
    studentid = models.ForeignKey('Students', models.DO_NOTHING, db_column='studentID', blank=True, null=True)  # Field name made lowercase.
    login = models.CharField(db_column='Login', max_length=50, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Users'


class Auditorium(models.Model):
    auditoriumid = models.BigAutoField(primary_key=True)
    type_of_auditoriumid = models.ForeignKey('TypeOfAuditorium', models.DO_NOTHING, db_column='type_of_auditoriumid')
    university_buildingid = models.ForeignKey('UniversityBuilding', models.DO_NOTHING, db_column='university_buildingid')
    number_of_auditorium = models.IntegerField()
    capacity = models.IntegerField(blank=True, null=True)

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


class Consultation(models.Model):
    consultationid = models.BigAutoField(primary_key=True)
    auditoriumid = models.ForeignKey(Auditorium, models.DO_NOTHING, db_column='auditoriumid')
    lecturerid = models.ForeignKey('Lecturer', models.DO_NOTHING, db_column='lecturerid')
    studentid = models.ForeignKey('Students', models.DO_NOTHING, db_column='studentid')
    topic = models.CharField(max_length=300, blank=True, null=True)
    convinient_dateid = models.ForeignKey('ConvenientDate', models.DO_NOTHING, db_column='convinient_dateID')  # Field name made lowercase.
    convinient_timeid = models.ForeignKey('ConvenientTime', models.DO_NOTHING, db_column='convinient_timeID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'consultation'


class ConvenientDate(models.Model):
    convenient_dateid = models.BigAutoField(db_column='convenient_dateID', primary_key=True)  # Field name made lowercase.
    lecturerid = models.ForeignKey('Lecturer', models.DO_NOTHING, db_column='lecturerID')  # Field name made lowercase.
    date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'convenient_date'


class ConvenientTime(models.Model):
    convenient_timeid = models.BigAutoField(db_column='convenient_timeID', primary_key=True)  # Field name made lowercase.
    lecturerid = models.ForeignKey('Lecturer', models.DO_NOTHING, db_column='lecturerID')  # Field name made lowercase.
    time = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'convenient_time'


class Department(models.Model):
    departmentid = models.BigAutoField(db_column='departmentID', primary_key=True)  # Field name made lowercase.
    title_of_department = models.CharField(db_column='Title_of_department', max_length=350, blank=True, null=True)  # Field name made lowercase.
    abbreviation = models.CharField(max_length=5, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'department'


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

    class Meta:
        managed = False
        db_table = 'faculty'


class Groups(models.Model):
    groupid = models.BigAutoField(primary_key=True)
    number_of_group = models.CharField(db_column='Number_of_group', max_length=10, blank=True, null=True)  # Field name made lowercase.
    facultyid = models.ForeignKey(Faculty, models.DO_NOTHING, db_column='facultyID', blank=True, null=True)  # Field name made lowercase.
    departmentid = models.ForeignKey(Department, models.DO_NOTHING, db_column='departmentID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'groups'


class Lecturer(models.Model):
    lecturerid = models.BigAutoField(primary_key=True)
    last_name_lecturer = models.CharField(max_length=50, blank=True, null=True)
    first_name_lecturer = models.CharField(max_length=50, blank=True, null=True)
    patronymic_lecturer = models.CharField(max_length=50, blank=True, null=True)
    positionid = models.ForeignKey(Positions, models.DO_NOTHING, db_column='PositionID', blank=True, null=True)  # Field name made lowercase.
    facultyid = models.ForeignKey(Faculty, models.DO_NOTHING, db_column='facultyID', blank=True, null=True)  # Field name made lowercase.
    departmentid = models.ForeignKey(Department, models.DO_NOTHING, db_column='departmentID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'lecturer'


class Students(models.Model):
    studentid = models.BigAutoField(primary_key=True)
    groupid = models.ForeignKey(Groups, models.DO_NOTHING, db_column='groupid')
    last_name_student = models.CharField(max_length=50, blank=True, null=True)
    first_name_student = models.CharField(max_length=50, blank=True, null=True)
    patronymic_student = models.CharField(max_length=50, blank=True, null=True)
    number_of_record_book = models.CharField(max_length=10, blank=True, null=True)

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

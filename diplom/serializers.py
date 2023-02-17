from rest_framework.serializers import ModelSerializer
from rest_framework.relations import SlugRelatedField

from diplom_bmstu.models import *


class LecturerSerializer(ModelSerializer):
    positionid = SlugRelatedField(slug_field='title_of_position', read_only=True)
    facultyid = SlugRelatedField(slug_field='title_of_faculty', read_only=True)
    departmentid = SlugRelatedField(slug_field='title_of_department', read_only=True)

    class Meta:
        model = Lecturer
        fields = '__all__'


class LecturerPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Lecturer
        fields = '__all__'


class DatePostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = ConvenientDate
        fields = '__all__'


class DateSerializer(ModelSerializer):
    lecturerid = SlugRelatedField(slug_field='last_name_lecturer', read_only=True)

    class Meta:
        model = ConvenientDate
        fields = '__all__'


class TimePostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = ConvenientTime
        fields = '__all__'


class TimeSerializer(ModelSerializer):
    lecturerid = SlugRelatedField(slug_field='last_name_lecturer', read_only=True)

    class Meta:
        model = ConvenientTime
        fields = '__all__'


class AuditoriumPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Auditorium
        fields = '__all__'


class AuditoriumSerializer(ModelSerializer):
    type_of_auditoriumid = SlugRelatedField(slug_field='name_of_auditorium', read_only=True)
    university_buildingid = SlugRelatedField(slug_field='name_of_building', read_only=True)

    class Meta:
        model = Auditorium
        fields = '__all__'


class FacultyPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


class FacultySerializer(ModelSerializer):

    class Meta:
        model = Faculty
        fields = '__all__'


class PositionsPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Positions
        fields = '__all__'


class DepartmentPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class GroupsPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Groups
        fields = '__all__'


class TypeOfAuditoriumPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = TypeOfAuditorium
        fields = '__all__'


class UniversityBuildingPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = UniversityBuilding
        fields = '__all__'


class UsersPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class StudentsPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'


class StudentsSerializer(ModelSerializer):
    groupid = SlugRelatedField(slug_field='number_of_group', read_only=True)

    class Meta:
        model = Students
        fields = '__all__'


class ConsultationPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'


class ConsultationSerializer(ModelSerializer):
    auditoriumid = SlugRelatedField(slug_field='number_of_auditorium', read_only=True)
    lecturerid = SlugRelatedField(slug_field='last_name_lecturer', read_only=True)
    studentid = SlugRelatedField(slug_field='last_name_student', read_only=True)
    studentid = SlugRelatedField(slug_field='last_name_student', read_only=True)
    convinient_dateid = SlugRelatedField(slug_field='date', read_only=True)
    #convinient_timeid = SlugRelatedField(slug_field='time', read_only=True)

    class Meta:
        model = Consultation
        fields = '__all__'

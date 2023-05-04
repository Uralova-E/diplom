from rest_framework.serializers import ModelSerializer
from rest_framework.relations import SlugRelatedField
from rest_framework import serializers

from diplom_bmstu.models import *


class LecturerSerializer(ModelSerializer):
    positionid = SlugRelatedField(slug_field='title_of_position', read_only=True)
    facultyid = SlugRelatedField(slug_field='title_of_faculty', read_only=True)
    departmentid = SlugRelatedField(slug_field='title_of_department', read_only=True)

    class Meta:
        model = Lecturer
        fields = '__all__'


# class LecturerSerializer(serializers.Serializer):
#     lecturerid = serializers.IntegerField()
#     last_name_lecturer = serializers.CharField()
#     first_name_lecturer = serializers.CharField()
#     patronymic_lecturer = serializers.CharField()
#     department = serializers.CharField()
#     faculty = serializers.CharField()


class LecturerPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Lecturer
        fields = '__all__'


class AuditoriumSerializer(ModelSerializer):
    type_of_auditoriumid = SlugRelatedField(slug_field='name_of_auditorium', read_only=True)
    university_buildingid = SlugRelatedField(slug_field='name_of_building', read_only=True)

    class Meta:
        model = Auditorium
        fields = '__all__'


class AuditoriumPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Auditorium
        fields = '__all__'


class FacultySerializer(ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


class FacultyPostPutDeleteSerializer(ModelSerializer):
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


class GroupsSerializer(ModelSerializer):
    class Meta:
        model = Groups
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


class UsersSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class UsersPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class StudentsSerializer(ModelSerializer):
    groupid = SlugRelatedField(slug_field='number_of_group', read_only=True)

    class Meta:
        model = Students
        fields = '__all__'


class StudentsPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'


class DisciplineSerializer(ModelSerializer):

    class Meta:
        model = Discipline
        fields = '__all__'


class DisciplinePostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Discipline
        fields = '__all__'


class ConsultationSerializer(ModelSerializer):
    auditoriumid = SlugRelatedField(slug_field='number_of_auditorium', read_only=True)
    groupid = SlugRelatedField(slug_field='number_of_group', read_only=True)
    disciplineid = SlugRelatedField(slug_field='name_of_discipline', read_only=True)


    class Meta:
        model = Consultation
        fields = '__all__'


class ConsultationPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'


class StudentrecordSerializer(ModelSerializer):
    studentid = SlugRelatedField(slug_field='last_name_student', read_only=True)

    class Meta:
        model = StudentRecord
        fields = '__all__'


class StudentrecordPostPutDeleteSerializer(ModelSerializer):
    class Meta:
        model = StudentRecord
        fields = '__all__'


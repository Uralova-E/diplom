from django.db.migrations import serializer
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from diplom.serializers import *


class DepartmentsListView(generics.ListAPIView):
    serializer_class = DepartmentPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Department.objects.all()


class PositionsListView(generics.ListAPIView):
    serializer_class = PositionsPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Positions.objects.all()


class LecturerListView(generics.ListAPIView):
    serializer_class = LecturerSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Lecturer.objects.all()

class LecturerListDepartmentView(generics.ListAPIView):
    serializer_class = LecturerSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        departmentID = self.kwargs['departmentID']
        return Lecturer.objects.all().filter(departmentid=departmentID)


class LecturerRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LecturerPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Lecturer.objects.all()

    def put_queryset(self, request):
        lecturer = Lecturer.objects.all()
        serializer = LecturerPostPutDeleteSerializer(lecturer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        lecturer = Lecturer.objects.all()
        lecturer.delete()
        return Response(status=204)


class LecturerPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        lecturer = LecturerPostPutDeleteSerializer(data=request.data)
        if lecturer.is_valid():
            lecturer.save()
            return Response(status=200)
        return Response(status=201)


class AuditoriumListView(generics.ListAPIView):
    serializer_class = AuditoriumSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        auditorium = Auditorium.getAuditorium(self)
        return auditorium

    # def get_queryset(self):
    #     return Auditorium.objects.all()


class AuditoriumRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AuditoriumPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        auditorium = Auditorium.getAuditorium(self)
        return auditorium

    # def get_queryset(self):
    #     return Auditorium.objects.all()
    #
    # def put_queryset(self, request):
    #     auditorium = Auditorium
    #     serializer = AuditoriumPostPutDeleteSerializer(auditorium, data=request.data)
    #
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=400)


class AuditoriumPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        auditorium = AuditoriumPostPutDeleteSerializer(data=request.data)

        if auditorium.is_valid():
            auditorium.save()
            return Response(status=200)
        return Response(auditorium.errors, status=400)


class FacultyListView(generics.ListAPIView):
    serializer_class = FacultySerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Faculty.objects.all()


class FacultyRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FacultyPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Faculty.objects.all()

    def put_queryset(self, request):
        faculty = Faculty
        serializer = FacultyPostPutDeleteSerializer(faculty, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class FacultyPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        faculty = FacultyPostPutDeleteSerializer(data=request.data)

        if faculty.is_valid():
            faculty.save()
            return Response(status=200)
        return Response(faculty.errors, status=400)


class PositionsRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PositionsPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Positions.objects.all()

    def put_queryset(self, request):
        position = Positions
        serializer = PositionsPostPutDeleteSerializer(position, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class PositionsPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        position = PositionsPostPutDeleteSerializer(data=request.data)

        if position.is_valid():
            position.save()
            return Response(status=200)
        return Response(position.errors, status=400)


class DepartmentsListFacultyView(generics.ListAPIView):
    serializer_class = DepartmentPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        facultyID = self.kwargs['facultyID']
        return Department.objects.all().filter(facultyid=facultyID)


class DepartmentRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DepartmentPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Department.objects.all()

    def put_queryset(self, request):
        department = Department
        serializer = DepartmentPostPutDeleteSerializer(department, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class DepartmentPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        department = DepartmentPostPutDeleteSerializer(data=request.data)

        if department.is_valid():
            department.save()
            return Response(status=200)
        return Response(department.errors, status=400)


class GroupsListView(generics.ListAPIView):
    serializer_class = GroupsSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        groups = Groups.getGroups(self)
        return groups

    # def get_queryset(self):
    #     return Groups.objects.all()


class GroupsRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupsPostPutDeleteSerializer

    def get_queryset(self):
        groups = Groups.getGroups(self)
        return groups

    # permission_classes = [permissions.IsAuthenticated]
    # def get_queryset(self):
    #     return Groups.objects.all()

    # def put_queryset(self, request):
    #     groups = Groups
    #     serializer = GroupsPostPutDeleteSerializer(groups, data=request.data)
    #
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=400)
    #
    # def delete_queryset(self, request):
    #     groups = Groups.objects.all()
    #     groups.delete()
    #     return Response(status=204)


class GroupsPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        groups = GroupsPostPutDeleteSerializer(data=request.data)

        if groups.is_valid():
            groups.save()
            return Response(status=200)
        return Response(groups.errors, status=400)


class TypeOfAuditoriumRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TypeOfAuditoriumPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return TypeOfAuditorium.objects.all()

    def put_queryset(self, request):
        typeofauditorium = TypeOfAuditorium.objects.all()
        serializer = TypeOfAuditoriumPostPutDeleteSerializer(typeofauditorium, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class TypeOfAuditoriumPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        typeofauditorium = TypeOfAuditoriumPostPutDeleteSerializer(data=request.data)

        if typeofauditorium.is_valid():
            typeofauditorium.save()
            return Response(status=200)
        return Response(typeofauditorium.errors, status=400)


class UniversityBuildingRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UniversityBuildingPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return UniversityBuilding.objects.all()

    def put_queryset(self, request):
        building = UniversityBuilding.objects.all()
        serializer = UniversityBuildingPostPutDeleteSerializer(building, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class UniversityBuildingPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        building = UniversityBuildingPostPutDeleteSerializer(data=request.data)

        if building.is_valid():
            building.save()
            return Response(status=200)
        return Response(building.errors, status=400)


class UsersListView(generics.ListAPIView):
    serializer_class = UsersSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Users.objects.all()


class UsersRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UsersPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Users.objects.all()

    def put_queryset(self, request):
        users = Users.objects.all()
        serializer = UsersPostPutDeleteSerializer(users, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        users = Users.objects.all()
        users.delete()
        return Response(status=204)


class UserLoginDetailView(generics.RetrieveAPIView):
    serializer_class = UsersPostPutDeleteSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = ('login')

    def get_queryset(self):
        return Users.objects.all()


class UsersPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        users = UsersPostPutDeleteSerializer(data=request.data)

        if users.is_valid():
            users.save()
            return Response(status=200)
        return Response(users.errors, status=400)


class StudentsListView(generics.ListAPIView):
    serializer_class = StudentsSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Students.objects.all()


class StudentsRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentsPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Students.objects.all()

    def put_queryset(self, request):
        students = Students.objects.all()
        serializer = StudentsPostPutDeleteSerializer(students, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        students = Students.objects.all()
        students.delete()
        return Response(status=204)


class StudentsPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        students = StudentsPostPutDeleteSerializer(data=request.data)

        if students.is_valid():
            students.save()
            return Response(status=200)
        return Response(students.errors, status=400)


class DisciplineListView(generics.ListAPIView):
    serializer_class = DisciplineSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        discipline = Discipline.getDiscipline(self)
        return discipline

    # def get_queryset(self):
    #     return Discipline.objects.all()


class DisciplineRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DisciplinePostPutDeleteSerializer

    def get_queryset(self):
        discipline = Discipline.getDiscipline(self)
        return discipline

    # permission_classes = [permissions.IsAuthenticated]
    # def get_queryset(self):
    #     return Discipline.objects.all()
    #
    # def put_queryset(self, request):
    #     discipline = Discipline.objects.all()
    #     serializer = DisciplinePostPutDeleteSerializer(discipline, data=request.data)
    #
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=400)
    #
    # def delete_queryset(self, request):
    #     discipline = Discipline.objects.all()
    #     discipline.delete()
    #     return Response(status=204)


class DisciplinePostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        discipline = DisciplinePostPutDeleteSerializer(data=request.data)

        if discipline.is_valid():
            discipline.save()
            return Response(status=200)
        return Response(discipline.errors, status=400)


class ConsultationListView(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        consultations = Consultation.getConsultation(self)
        return consultations

    # def get_queryset(self):
    #     return Consultation.objects.all()


class ConsultationLecturerListView(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        consultations = Consultation.getByLecturerId(self.kwargs['lecturerID'])
        return consultations

#    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     lecturerID = self.kwargs['lecturerID']
    #     return Consultation.objects.filter(lecturerid=lecturerID)


class ConsultationLecturerGroupListView(generics.ListAPIView):
    serializer_class = ConsultationSerializer
#    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        consultations = Consultation.getByLecturerGroupId(self.kwargs['lecturerID'], self.kwargs['groupID'])
        return consultations

    # def get_queryset(self):
    #     lecturerID = self.kwargs['lecturerID']
    #     groupID = self.kwargs['groupID']
    #     return Consultation.objects.filter(lecturerid=lecturerID).filter(groupid=groupID)


class ConsultationRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConsultationPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        consultations = Consultation.getConsultation()
        return consultations

    # def get_queryset(self):
    #     return Consultation.objects.all()

    def put_queryset(self, request):
        consultations = Consultation.getConsultation()
        serializer = ConsultationPostPutDeleteSerializer(consultations, data=request.data)

        if serializer.is_valid():
            consultation = Consultation.update(serializer.data)
            return consultation
        return Response(serializer.errors, status=400)

    # def put_queryset(self, request):
    #     consultation = Consultation.objects.all()
    #     serializer = ConsultationPostPutDeleteSerializer(consultation, data=request.data)
    #
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        consultation = Consultation.objects.all()
        consultation.delete()
        return Response(status=204)


class ConsultationPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    # def post(self, request):
    #     consultation = ConsultationPostPutDeleteSerializer(data=request.data)
    #
    #     if consultation.is_valid():
    #         Consultation.create(consultation.data)
    #         return Response(status=200)
    #     return Response(consultation.errors, status=400)

    def post(self, request):
        consultation = ConsultationPostPutDeleteSerializer(data=request.data)

        if consultation.is_valid():
            consultation.save()
            return Response(status=200)
        return Response(consultation.errors, status=400)


class StudentrecordListView(generics.ListAPIView):
    serializer_class = StudentrecordSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StudentRecord.objects.all()


class StudentrecordListConsultationView(generics.ListAPIView):
    serializer_class = ConsultationStudentSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        consultations = StudentRecord.getByStudentRecordId(self.kwargs['consultationID'])
        # return consultations

    # def get_queryset(self):
    #     consultationID = self.kwargs['consultationID']
    #     consultations_db = StudentRecord.objects.all().filter(consultationid=consultationID)
    #     list_length = len(consultations_db)
    #     consultations = list(range(list_length))
    #
    #     for i in range(list_length):
    #         student = consultations_db[i].studentid
    #         student_group = student.groupid
    #
    #         consultations[i] = {
    #             "recordid": consultations_db[i].student_recordid,
    #             "studentid": student.studentid,
    #             "student": f'{student.last_name_student} {student.first_name_student} {student.patronymic_student}',
    #             "group": student_group.number_of_group,
    #             "visiting": consultations_db[i].visiting,
    #             "notes": consultations_db[i].notes_of_lecturer
    #         }

        data = ConsultationStudentSerializer(data={
            "recordid": 1,
            "studentid": 1,
            "student": "hello",
            "group": "hello",
            "visiting": True,
            "notes": "hello"
        })

        if data.is_valid():
            return consultations
        return data.errors


class StudentrecordRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentrecordPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return StudentRecord.objects.all()

    def put_queryset(self, request):
        studentrecord = StudentRecord.objects.all()
        serializer = StudentrecordPostPutDeleteSerializer(studentrecord, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        studentrecord = StudentRecord.objects.all()
        studentrecord.delete()
        return Response(status=204)


class StudentrecordPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        studentrecord = StudentrecordPostPutDeleteSerializer(data=request.data)

        if studentrecord.is_valid():
            studentrecord.save()
            return Response(status=200)
        return Response(studentrecord.errors, status=400)


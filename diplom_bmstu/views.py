from django.db.migrations import serializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from diplom.serializers import *


class LecturerListView(generics.ListAPIView):
    serializer_class = LecturerSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Lecturer.objects.all()


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


class DateListView(generics.ListAPIView):
    serializer_class = DateSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ConvenientDate.objects.all()


class DateRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DatePostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ConvenientDate.objects.all()

    def put_queryset(self, request):
        convenient_date = ConvenientDate
        serializer = DatePostPutDeleteSerializer(convenient_date, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        convenient_date = ConvenientDate.objects.all()
        convenient_date.delete()
        return Response(status=204)


class DatePostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        convenient_date = DatePostPutDeleteSerializer(data=request.data)

        if convenient_date.is_valid():
            convenient_date.save()
            return Response(status=200)
        return Response(convenient_date.errors, status=400)


class TimeListView(generics.ListAPIView):
    serializer_class = TimeSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ConvenientTime.objects.all()


class TimePostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        convenient_time = TimePostPutDeleteSerializer(data=request.data)

        if convenient_time.is_valid():
            convenient_time.save()
            return Response(status=200)
        return Response(convenient_time.errors, status=400)


class TimeRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TimePostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ConvenientTime.objects.all()

    def put_queryset(self, request):
        convenient_time = ConvenientTime
        serializer = TimePostPutDeleteSerializer(convenient_time, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        convenient_time = ConvenientTime.objects.all()
        convenient_time.delete()
        return Response(status=204)


class AuditoriumListView(generics.ListAPIView):
    serializer_class = AuditoriumSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Auditorium.objects.all()


class AuditoriumPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        auditorium = AuditoriumPostPutDeleteSerializer(data=request.data)

        if auditorium.is_valid():
            auditorium.save()
            return Response(status=200)
        return Response(auditorium.errors, status=400)


class AuditoriumRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AuditoriumPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Auditorium.objects.all()

    def put_queryset(self, request):
        auditorium = Auditorium
        serializer = AuditoriumPostPutDeleteSerializer(auditorium, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class FacultyListView(generics.ListAPIView):
    serializer_class = FacultySerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Faculty.objects.all()


class FacultyPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        faculty = FacultyPostPutDeleteSerializer(data=request.data)

        if faculty.is_valid():
            faculty.save()
            return Response(status=200)
        return Response(faculty.errors, status=400)


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


class PositionsPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        position = PositionsPostPutDeleteSerializer(data=request.data)

        if position.is_valid():
            position.save()
            return Response(status=200)
        return Response(position.errors, status=400)


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


class DepartmentPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        department = DepartmentPostPutDeleteSerializer(data=request.data)

        if department.is_valid():
            department.save()
            return Response(status=200)
        return Response(department.errors, status=400)


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


class GroupsPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        groups = GroupsPostPutDeleteSerializer(data=request.data)

        if groups.is_valid():
            groups.save()
            return Response(status=200)
        return Response(groups.errors, status=400)


class GroupsRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupsPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Groups.objects.all()

    def put_queryset(self, request):
        groups = Groups
        serializer = GroupsPostPutDeleteSerializer(groups, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        groups = Groups.objects.all()
        groups.delete()
        return Response(status=204)


class TypeOfAuditoriumPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        typeofauditorium = TypeOfAuditoriumPostPutDeleteSerializer(data=request.data)

        if typeofauditorium.is_valid():
            typeofauditorium.save()
            return Response(status=200)
        return Response(typeofauditorium.errors, status=400)


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


class UniversityBuildingPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        building = UniversityBuildingPostPutDeleteSerializer(data=request.data)

        if building.is_valid():
            building.save()
            return Response(status=200)
        return Response(building.errors, status=400)


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


class UsersPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        users = UsersPostPutDeleteSerializer(data=request.data)

        if users.is_valid():
            users.save()
            return Response(status=200)
        return Response(users.errors, status=400)


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


class StudentsListView(generics.ListAPIView):
    serializer_class = StudentsSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Students.objects.all()


class StudentsPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        students = StudentsPostPutDeleteSerializer(data=request.data)

        if students.is_valid():
            students.save()
            return Response(status=200)
        return Response(students.errors, status=400)


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


class ConsultationListView(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Consultation.objects.all()


class ConsultationPostPutDeleteView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        consultation = ConsultationPostPutDeleteSerializer(data=request.data)

        if consultation.is_valid():
            consultation.save()
            return Response(status=200)
        return Response(consultation.errors, status=400)


class ConsultationRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConsultationPostPutDeleteSerializer

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Consultation.objects.all()

    def put_queryset(self, request):
        consultation = Consultation.objects.all()
        serializer = ConsultationPostPutDeleteSerializer(consultation, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete_queryset(self, request):
        consultation = Consultation.objects.all()
        consultation.delete()
        return Response(status=204)

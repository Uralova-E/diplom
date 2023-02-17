"""diplom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from diplom_bmstu.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('lecturer/list/', LecturerListView.as_view()),
    path('lecturer/<int:pk>', LecturerRetrieveView.as_view()),
    path('lecturer/', LecturerPostPutDeleteView.as_view()),
    path('convenient_date/list/', DateListView.as_view()),
    path('convenient_date/<int:pk>', DateRetrieveView.as_view()),
    path('convenient_date/', DatePostPutDeleteView.as_view()),
    path('convenient_time/list/', TimeListView.as_view()),
    path('convenient_time/', TimePostPutDeleteView.as_view()),
    path('convenient_time/<int:pk>', TimeRetrieveView.as_view()),
    path('auditorium/list/', AuditoriumListView.as_view()),
    path('auditorium/', AuditoriumPostPutDeleteView.as_view()),
    path('auditorium/<int:pk>', AuditoriumRetrieveView.as_view()),
    path('faculty/list/', FacultyListView.as_view()),
    path('faculty/', FacultyPostPutDeleteView.as_view()),
    path('faculty/<int:pk>', FacultyRetrieveView.as_view()),
    path('positions/', PositionsPostPutDeleteView.as_view()),
    path('positions/<int:pk>', PositionsRetrieveView.as_view()),
    path('department/', DepartmentPostPutDeleteView.as_view()),
    path('department/<int:pk>', DepartmentRetrieveView.as_view()),
    path('groups/', GroupsPostPutDeleteView.as_view()),
    path('groups/<int:pk>', GroupsRetrieveView.as_view()),
    path('typeofauditorium/', TypeOfAuditoriumPostPutDeleteView.as_view()),
    path('typeofauditorium/<int:pk>', TypeOfAuditoriumRetrieveView.as_view()),
    path('building/', UniversityBuildingPostPutDeleteView.as_view()),
    path('building/<int:pk>', UniversityBuildingRetrieveView.as_view()),
    path('users/', UsersPostPutDeleteView.as_view()),
    path('users/<int:pk>', UsersRetrieveView.as_view()),
    path('students/list/', StudentsListView.as_view()),
    path('students/', StudentsPostPutDeleteView.as_view()),
    path('students/<int:pk>', StudentsRetrieveView.as_view()),
    path('consultation/list/', ConsultationListView.as_view()),
    path('consultation/', ConsultationPostPutDeleteView.as_view()),
    path('consultation/<int:pk>', ConsultationRetrieveView.as_view())
]

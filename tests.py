import unittest
from django.test import Client
from django.test import TestCase
from django.db import transaction

from diplom_bmstu.models import Students


class StudentsListViewTest(TestCase):
    def setUp(self):
        # Create some sample student records
        student1 = Students(last_name_student="Ivanov", first_name_student="Ivan", patronymic_student="Ivanovich", number_of_record_book="12345")
        student2 = Students(last_name_student="Petrov", first_name_student="Petr", patronymic_student="Petrovich", number_of_record_book="67890")
        student3 = Students(last_name_student="Sidorov", first_name_student="Sidor", patronymic_student="Sidorovich", number_of_record_book="98765")

        with transaction.atomic():
            Students.objects.bulk_create((student1, student2, student3))

    def test_get_success(self):
        client = Client()
        response = client.get('/students/list/')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)
        for student in response.data:
            self.assertEqual(student['last_name_student'], student.last_name_student)
            self.assertEqual(student['first_name_student'], student.first_name_student)
            self.assertEqual(student['patronymic_student'], student.patronymic_student)
            self.assertEqual(student['number_of_record_book'], student.number_of_record_book)

if __name__ == '__main__':
    unittest.main()


import unittest
from django.test import Client
from django.test import TestCase

from diplom_bmstu.models import Faculty


class Test(TestCase):
    def setUp(self):
        Faculty.objects.create(title_of_faculty='Faculty of Computer Science and Technologies', abbreviated_name_of_faculty='FOCS\&T')

    def test_get_faculty_by_name(self):
        test = Faculty.objects.get(title_of_faculty="Faculty of Computer Science and Technologies")
        self.assertEqual(test.abbreviated_name_of_faculty, 'FOCS\&T')

    def test_get_student_list(self):
        client = Client()
        response = client.get('/students/list/')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)

    def test_get_groups_list(self):
        client = Client()
        response = client.get('/groups/list/')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)


if __name__ == '__main__':
    unittest.main()


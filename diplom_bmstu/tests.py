
# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from diplom_bmstu.views import *

class ConsultationListViewTest(TestCase):
    def setUp(self):
        # Создайте несколько тестовых данных перед выполнением каждого теста
        # Например, создайте объекты Consultation и сохраните их в базе данных
        # Обратите внимание, что это тестовые данные, и вы можете использовать их по своему усмотрению
        # Замените их реальными данными, если это необходимо
        self.consultation1 = Consultation.objects.create(
            auditoriumid=1,
            lecturerid=1,
            topic='Test Topic 1',
            date='2023-01-01',
            start_time='10:00:00',
            end_time='12:00:00',
            groupid='1',
            was_conducted='Yes',
            notes='Test Notes 1',
            disciplineid=1
        )

        self.consultation2 = Consultation.objects.create(
            auditoriumid=1,
            lecturerid=2,
            topic='Test Topic 2',
            date='2023-01-02',
            start_time='14:00:00',
            end_time='16:00:00',
            groupid=1,
            was_conducted='No',
            notes='Test Notes 2',
            disciplineid=1
        )

    def test_consultation_list_view(self):
        # Определите URL для вашего представления
        url = reverse('consultation/list/')

        # Выполните GET-запрос к представлению
        response = self.client.get(url)

        # Проверьте, что ответ имеет статус HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Проверьте, что ожидаемые данные присутствуют в ответе
        self.assertIn('Test Topic 1', response.content.decode())
        self.assertIn('Test Topic 2', response.content.decode())

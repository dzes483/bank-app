from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.contrib.postgres.fields import ArrayField

AGE_CHOICES = [
    ('JUNIOR', '0-17'),
    ('ADULT', '18-64'),
    ('SENIOR', '64+')
]

INCOME_CHOICES = [
    ('NO_INCOME', '0'),
    ('LOW_INCOME', '1-12000'),
    ('MEDIUM_INCOME', '12001-40000'),
    ('HIGH_INCOME', '40000+')
]


class Product(models.Model):
    name = models.CharField(blank=False, max_length=120, unique=True)
    age = ArrayField(models.CharField(choices=AGE_CHOICES, max_length=160))
    student = models.BooleanField(blank=False)
    income = ArrayField(models.CharField(choices=INCOME_CHOICES, max_length=160))
    slug = models.SlugField(default='', editable=False, max_length=120)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        return super(Product, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('product-detail', kwargs={'slug': self.slug})

    def __str__(self):
        return self.name

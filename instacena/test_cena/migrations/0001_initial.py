# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('url', models.CharField(max_length=300)),
                ('name', models.CharField(max_length=20, serialize=False, primary_key=True)),
                ('start_time', models.IntegerField()),
                ('duration', models.IntegerField()),
            ],
        ),
    ]

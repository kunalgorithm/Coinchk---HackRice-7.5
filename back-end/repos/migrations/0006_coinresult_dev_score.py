# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2018-03-04 00:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repos', '0005_auto_20180303_2247'),
    ]

    operations = [
        migrations.AddField(
            model_name='coinresult',
            name='dev_score',
            field=models.FloatField(default=0),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2018-03-03 22:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repos', '0004_auto_20180303_2234'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coinresult',
            name='total_contributors',
        ),
        migrations.AddField(
            model_name='coinresult',
            name='bin_commits',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='coinresult',
            name='bin_prs',
            field=models.BooleanField(default=False),
        ),
    ]

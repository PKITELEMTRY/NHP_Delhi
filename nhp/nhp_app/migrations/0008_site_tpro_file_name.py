# Generated by Django 3.2.8 on 2023-04-03 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nhp_app', '0007_auto_20230403_1615'),
    ]

    operations = [
        migrations.AddField(
            model_name='site',
            name='tpro_file_name',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]

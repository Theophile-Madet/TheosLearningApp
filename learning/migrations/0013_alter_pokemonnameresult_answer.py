# Generated by Django 5.1.4 on 2024-12-29 20:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("learning", "0012_enabledcontent_delete_useroption_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pokemonnameresult",
            name="answer",
            field=models.CharField(max_length=100),
        ),
    ]

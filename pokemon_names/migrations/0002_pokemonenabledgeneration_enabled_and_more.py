# Generated by Django 5.1.4 on 2024-12-29 15:19

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("pokemon_names", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="pokemonenabledgeneration",
            name="enabled",
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="pokemonenabledlanguage",
            name="enabled",
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]

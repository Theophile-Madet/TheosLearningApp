# Generated by Django 5.1.4 on 2024-12-27 16:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0005_rename_language_full_name_language_full_name_and_more"),
    ]

    operations = [
        migrations.AddIndex(
            model_name="pokemon",
            index=models.Index(
                fields=["id_from_csv"], name="content_pok_id_from_348066_idx"
            ),
        ),
    ]

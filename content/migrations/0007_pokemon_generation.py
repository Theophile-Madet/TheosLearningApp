# Generated by Django 5.1.4 on 2024-12-28 17:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0006_pokemon_content_pok_id_from_348066_idx"),
    ]

    operations = [
        migrations.AddField(
            model_name="pokemon",
            name="generation",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]

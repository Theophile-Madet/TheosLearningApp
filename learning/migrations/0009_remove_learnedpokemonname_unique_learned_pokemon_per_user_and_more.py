# Generated by Django 5.1.4 on 2024-12-28 15:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0006_pokemon_content_pok_id_from_348066_idx"),
        ("learning", "0008_learnedpokemonname_pokemonnameresult_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="learnedpokemonname",
            name="unique_learned_pokemon_per_user",
        ),
        migrations.AddConstraint(
            model_name="learnedpokemonname",
            constraint=models.UniqueConstraint(
                fields=("user", "pokemon", "language"),
                name="unique_learned_pokemon_per_user",
            ),
        ),
    ]
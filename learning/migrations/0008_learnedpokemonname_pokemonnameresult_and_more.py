# Generated by Django 5.1.4 on 2024-12-28 15:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0006_pokemon_content_pok_id_from_348066_idx"),
        ("learning", "0007_wronganswer"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="LearnedPokemonName",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PokemonNameResult",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("answer", models.CharField(max_length=10)),
            ],
        ),
        migrations.RenameModel(
            old_name="Result",
            new_name="GermanWordResult",
        ),
        migrations.AddIndex(
            model_name="germanwordresult",
            index=models.Index(
                fields=["created_at"], name="learning_ge_created_354d6e_idx"
            ),
        ),
        migrations.AddField(
            model_name="learnedpokemonname",
            name="language",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="content.language"
            ),
        ),
        migrations.AddField(
            model_name="learnedpokemonname",
            name="pokemon",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="content.pokemon"
            ),
        ),
        migrations.AddField(
            model_name="learnedpokemonname",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="pokemonnameresult",
            name="expected_language",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="results_as_expected_language",
                to="content.language",
            ),
        ),
        migrations.AddField(
            model_name="pokemonnameresult",
            name="given_language",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="results_as_given_language",
                to="content.language",
            ),
        ),
        migrations.AddField(
            model_name="pokemonnameresult",
            name="pokemon",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="content.pokemon"
            ),
        ),
        migrations.AddField(
            model_name="pokemonnameresult",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddConstraint(
            model_name="learnedpokemonname",
            constraint=models.UniqueConstraint(
                fields=("user", "pokemon", "language"),
                name="unique_learned_pokemon_per_user",
            ),
        ),
        migrations.AddIndex(
            model_name="pokemonnameresult",
            index=models.Index(
                fields=["created_at"], name="learning_po_created_db654d_idx"
            ),
        ),
    ]

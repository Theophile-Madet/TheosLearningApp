# Generated by Django 5.1.4 on 2024-12-29 14:36

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("learning", "0011_useroption"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="EnabledContent",
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
                ("content_key", models.CharField(max_length=100)),
                ("enabled", models.BooleanField()),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="UserOption",
        ),
        migrations.AddConstraint(
            model_name="enabledcontent",
            constraint=models.UniqueConstraint(
                fields=("user", "content_key"), name="unique_enabled_content_per_user"
            ),
        ),
    ]
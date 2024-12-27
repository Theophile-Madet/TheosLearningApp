import csv

from django.core.management import BaseCommand

from content.models import Language, PokemonName, Pokemon


class Command(BaseCommand):
    help = (
        "Import pokemon names from a csv file downloaded from "
        "https://docs.google.com/spreadsheets/d/1Eo6oWs4RA5M4c0r9M8FXJniOyhpmNmrnULabkP8kbL8/edit?gid=0#gid=0"
    )
    FILE_NAME = "data_sources/pokemon-names-translations.csv"

    def __init__(self, *args, **options):
        super().__init__(*args, **options)
        self.column_index_to_language_object_map = {}

    def handle(self, *_, **__):
        with open(self.FILE_NAME, "r", encoding="utf-8") as csvfile:
            reader = csv.reader(csvfile)
            self.process_file(reader)

    def process_file(self, reader):
        pokemons_from_file_by_csv_id = {}
        must_header_line_processed = True
        for row in reader:
            if must_header_line_processed:
                self.process_header_row(row)
                must_header_line_processed = False
                continue

            csv_id = row[0]
            pokemons_from_file_by_csv_id[csv_id] = self.process_body_row(row)

        pokemon_csv_ids_to_import = self.create_pokemons_and_return_created_csv_ids(
            pokemons_from_file_by_csv_id
        )

        pokemons_objects_by_csv_id = {
            pokemon.id_from_csv: pokemon
            for pokemon in Pokemon.objects.filter(
                id_from_csv__in=pokemon_csv_ids_to_import
            )
        }

        names_to_create = []
        for pokemon_csv_id, names in pokemons_from_file_by_csv_id.items():
            if pokemon_csv_id not in pokemon_csv_ids_to_import:
                continue

            names_to_create.extend(
                [
                    PokemonName(
                        name=name,
                        language=language_object,
                        pokemon=pokemons_objects_by_csv_id[pokemon_csv_id],
                    )
                    for language_object, name in names.items()
                ]
            )

        PokemonName.objects.bulk_create(names_to_create)

    @staticmethod
    def create_pokemons_and_return_created_csv_ids(pokemons_from_file_by_csv_id):
        existing_pokemons = Pokemon.objects.values_list("id_from_csv", flat=True)
        pokemons_to_create = [
            Pokemon(id_from_csv=csv_id)
            for csv_id in pokemons_from_file_by_csv_id.keys()
            if csv_id not in existing_pokemons
        ]

        return [
            pokemon.id_from_csv
            for pokemon in Pokemon.objects.bulk_create(pokemons_to_create)
        ]

    def process_header_row(self, header_row):
        self.create_languages(header_row)
        self.build_column_index_to_language_object_map(header_row)

    @staticmethod
    def create_languages(header_row):
        languages_from_header_row = header_row[1:]
        already_created_languages = Language.objects.values_list(
            "short_name", flat=True
        )
        languages_to_create = [
            language
            for language in languages_from_header_row
            if language not in already_created_languages
        ]
        languages_to_create = [
            Language(
                short_name=language, full_name=f"{language} (full name not set yet)"
            )
            for language in languages_to_create
        ]
        Language.objects.bulk_create(languages_to_create)

    def build_column_index_to_language_object_map(self, header_row):
        self.column_index_to_language_object_map = {
            index: Language.objects.get(short_name=short_name)
            for index, short_name in enumerate(header_row)
            if index != 0
        }

    def process_body_row(self, row):
        language_object_to_name_map = {}

        for column_index, translated_pokemon_name in enumerate(row):
            if column_index == 0:
                continue

            language_object = self.column_index_to_language_object_map[column_index]
            language_object_to_name_map[language_object] = translated_pokemon_name

        return language_object_to_name_map

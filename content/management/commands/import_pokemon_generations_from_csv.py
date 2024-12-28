import csv

from django.core.management import BaseCommand
from django.db.models import Subquery, OuterRef

from content.models import Pokemon, PokemonName


class Command(BaseCommand):
    help = (
        "Import pokemon generations from a csv file downloaded from "
        "https://github.com/lgreski/pokemonData/blob/master/Pokemon.csv"
    )
    FILE_NAME = "data_sources/pokemon_gens_and_types.csv"

    def __init__(self, *args, **options):
        super().__init__(*args, **options)
        self.column_index_to_language_object_map = {}

    def handle(self, *_, **__):
        with open(self.FILE_NAME, "r", encoding="utf-8") as csvfile:
            reader = csv.reader(csvfile)
            self.process_file(reader)

    def process_file(self, reader):
        pokemons_with_english_name = Pokemon.objects.all().annotate(
            english_name=Subquery(
                PokemonName.objects.filter(
                    pokemon_id=OuterRef("id"), language__short_name="en"
                ).values("name")[:1]
            )
        )
        pokemons_by_english_name = {
            pokemon.english_name.lower(): pokemon
            for pokemon in pokemons_with_english_name
        }

        for pokemon in pokemons_by_english_name.values():
            pokemon.generation = 9999

        must_process_header_line = True
        for row in reader:
            if must_process_header_line:
                must_process_header_line = False
                continue
            name_from_csv = row[1].lower()
            if "zygarde" in name_from_csv:
                # Zygarde is weird because of his three forms
                continue
            if name_from_csv == "nidoran":
                continue

            generation_from_file = int(row[12])
            current_generation = pokemons_by_english_name[name_from_csv].generation
            pokemons_by_english_name[name_from_csv].generation = min(
                generation_from_file, current_generation
            )
            # The min is because some pokemons have mega forms from later generations that would otherwise
            # override the original generation

        Pokemon.objects.bulk_update(pokemons_by_english_name.values(), ["generation"])

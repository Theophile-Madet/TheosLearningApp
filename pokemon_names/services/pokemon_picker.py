from content.models import Pokemon


class PokemonPicker:
    @staticmethod
    def get_next_pokemon():
        return Pokemon.objects.order_by("?").first()

import os
import re
import time

from django.core import serializers
from django.core.management import BaseCommand
from icecream import ic
from lxml import etree

from content.models import Word


class Command(BaseCommand):
    NAMESPACE = "http://www.mediawiki.org/xml/export-0.10/"
    NAMESPACES = {
        "": NAMESPACE,
    }
    PATH_TO_PARSED_DICTIONARY_FILE = (
        "data_sources/parsed_dictionary_without_frequency.json"
    )

    def __init__(self, stdout=None, stderr=None, no_color=False, force_color=False):
        super().__init__(stdout, stderr, no_color, force_color)
        self.words = {}

    def handle(self, *args, **options):
        if os.path.isfile(self.PATH_TO_PARSED_DICTIONARY_FILE):
            self.read_parsed_dictionary_from_file()
        else:
            self.parse_dictionary()
            self.write_parsed_dictionary_to_file()

        self.parse_frequency_list()
        self.write_parsed_dictionary_to_database()

    def write_parsed_dictionary_to_database(self):
        print("Writing parsed dictionary to database")
        t1 = time.time()
        words_with_frequency = [
            word for word in self.words.values() if word.usage_frequency
        ]
        Word.objects.all().delete()
        Word.objects.bulk_create(words_with_frequency)
        ic(Word.objects.count())
        t2 = time.time()
        ic(t2 - t1)

    def parse_frequency_list(self):
        t1 = time.time()
        print("Parsing frequency list")
        with open(
            "data_sources/deu_news_2023_1M-words.txt", encoding="utf-8"
        ) as word_frequency_file:
            for line in word_frequency_file:
                _, word, frequency = line.split("\t")
                if word not in self.words.keys():
                    continue
                self.words[word].usage_frequency = int(frequency)
        t2 = time.time()
        ic(t2 - t1)

    def write_parsed_dictionary_to_file(self):
        print("Writing parsed dictionary to file")
        with open(self.PATH_TO_PARSED_DICTIONARY_FILE, "w", encoding="utf-8") as file:
            file.write(serializers.serialize("json", self.words.values()))

    def read_parsed_dictionary_from_file(self):
        print("Reading parsed dictionary from file")
        with open(self.PATH_TO_PARSED_DICTIONARY_FILE, "r", encoding="utf-8") as file:
            words = serializers.deserialize("json", file.read())
            self.words = {word.object.word: word.object for word in words}

    def parse_dictionary(self):
        t1 = time.time()
        print("Parsing dictionary")
        for _, element in etree.iterparse(
            "data_sources/dictionary-de.xml",
            events=["end"],
            tag=self.tag_with_namespace("page"),
        ):
            word_data = self.get_word_from_page(element)
            if word_data:
                self.words[word_data.word] = word_data

        t2 = time.time()
        ic(t2 - t1)

    def get_word_from_page(self, element):
        ns = element.find("ns", namespaces=self.NAMESPACES)
        if ns.text != "0":
            return None
        page_content = self.get_page_content(element)
        if not page_content:
            return None
        if not self.is_word_a_noun(page_content):
            return None
        word = self.get_word_from_content(page_content)
        if word is None:
            return None
        gender = self.get_gender_from_content(page_content)
        if gender is None:
            return None
        return Word(word=word, gender=gender, type=Word.Type.NOUN)

    def tag_with_namespace(self, tag):
        return f"{{{self.NAMESPACE}}}{tag}"

    def get_page_content(self, element):
        return (
            element.find("revision", namespaces=self.NAMESPACES)
            .find("text", namespaces=self.NAMESPACES)
            .text
        )

    def get_page_id(self, element):
        return element.find("id", namespaces=self.NAMESPACES).text

    def is_word_a_noun(self, page_content):
        return "{{Wortart|Substantiv|Deutsch}}" in page_content

    def is_a_wortverbindung(self, page_content):
        return "{{Wortart|Wortverbindung|Deutsch}}" in page_content

    def get_word_from_content(self, page_content):
        result = re.search(
            r"== ([\w\s'-\[\]]+)(\{\{\(R\)}})?\s*\(\{\{Sprache\|Deutsch}}\) ==",
            page_content,
        )
        if not result:
            return None
        return result.groups()[0].strip()

    def get_gender_from_content(self, page_content):
        result = re.search(
            r"\{\{Wortart\|Substantiv\|Deutsch}}, \{\{(\w+.?)}}", page_content
        )
        if result:
            return result.groups()[0]

        result = re.search(r"\|Genus=(\w+.?)", page_content)
        if result:
            return result.groups()[0]

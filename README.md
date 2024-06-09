# Sources

- Wiktionary, word details (noun or verb, gender...) : https://dumps.wikimedia.org/dewiktionary/latest/
- Uni Leipzig, words listed by frequency : https://wortschatz.uni-leipzig.de/en/download/German

# Generate API client

```shell
python ./manage.py spectacular --file schema.yml
openapi-generator-cli generate -i schema.yml -g typescript-fetch -o ./src/api-client
```
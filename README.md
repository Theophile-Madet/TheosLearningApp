# Sources

## German words

- Wiktionary, word details (noun or verb, gender...) : https://dumps.wikimedia.org/dewiktionary/latest/
- Uni Leipzig, words listed by frequency : https://wortschatz.uni-leipzig.de/en/download/German

## Pokemon names

- https://docs.google.com/spreadsheets/d/1Eo6oWs4RA5M4c0r9M8FXJniOyhpmNmrnULabkP8kbL8/edit?gid=0#gid=0
- https://github.com/lgreski/pokemonData/blob/master/Pokemon.csv

# Generate API client

```shell
python ./manage.py spectacular --file learning-dino-schema.yml;
openapi-generator-cli generate -i learning-dino-schema.yml -g typescript-fetch -o ./src/learning-dino-api-client;
openapi-generator-cli generate -i allauth-schema.yml -g typescript-fetch -o ./src/allauth-api-client;
```

# Start the server

```shell
pnpm dev
python manage.py runserver
```

# Improvements

- Import the Bootstrap CSS file locally instead of through a CDN
- Give feedback on invalid word / wrong answer
- Give feedback on progress (word learned, 3/7 success?)
- Error report from Shexi : got 3 times the same word in a row
- Add loading state to login button and next word
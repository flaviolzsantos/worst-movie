# Pior Filme do Golden Raspberry Awards

API Restful que possibilita a leitura de uma lista em csv dos indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards e um endpoint que lista o produtor com maior intervalo entre dois prêmios consecutivos e o que obteve dois premios mais rápido.

## Requisitos

- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) versão 10
- [NodeJS](https://nodejs.org/en/download) versão 20
- [GitHub](https://docs.github.com/en/desktop/installing-and-authenticating-to-github-desktop/installing-github-desktop)




## Como Usar

Baixe o código no GitHub

```bash
git clone https://github.com/flaviolzsantos/worst-movie.git
```

Use o gerenciador de pacotes [npm](https://docs.npmjs.com) para instalar as dependencias.

```bash
npm install
```

Para executar os testes de integração
```bash
npm test
```

Para subir a aplicação
```bash
npm start
```

## Endpoints
[GET] movies/producer
```json
{
"min": [
{
   "producer": "Producer 1",
   "interval": 1,
   "previousWin": 2008,
   "followingWin": 2009
}],
"max": [
{
   "producer": "Producer 1",
   "interval": 99,
   "previousWin": 1900,
   "followingWin": 1999
}]
}
```


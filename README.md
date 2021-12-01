# startpage
![startpage-screenshot](https://user-images.githubusercontent.com/13460693/144162608-3180cc27-b386-4307-a0b0-02867ca9bbc0.png)

## Previsão do Tempo
Para que a previsão do tempo funcione é necessario uma **API Key** do site [WeatherAPI](https://www.weatherapi.com), criar uma conta gratis e conseguir essa chave é bem simples. Assim que tiver a chave da API basta adicionar no arquivo *tempo.js* na pasta */src/js*.

## Adicionando imagens
Para adicionar imagens pessoais você só precisa colocar suas imagens na pasta *src/images* e referenciar o nome dos arquivo em *api/imagens.json*. Caso nenhuma imagem seja carregada dessa forma, imagens do [unsplash](https://unsplash.com) serão carregadas no lugar.

Ex.:

```json
[
 "nome-do-arquivo.jpg",
 "nome-do-arquivo-2.jpg",
 "nome-do-arquivo-3.jpg",
]
```

## Adicionando favoritos
Muito parecido com a edição das imagens, no caso dos favoritos o arquivo a ser edito é o favoritos.json.

Ex.:
```json
[
 {	
  "fav": {
    "nome": "nome",
    "link": "https://link.com.br",
    "icone": "nome-do-arquivo.svg"
  }
 },
 {	
  "fav": {
    "nome": "nome",
    "link": "https://link.com.br",
    "icone": "nome-do-arquivo.svg"
  }
 }
]
```

## Frases
Seguindo o mesmo padrão, você pode pode editar o arquivo 'frases.json' para adicionar ou remover frases.

Ex.:
```json
[
 {
  "frase": "frase-1",
  "autor": "autor-1"
 },
 {
  "frase": "frase-2",
  "autor": "autor-2"
 }
]
```

## Atalhos
Os atalhos posuem um pouco mais de conteudo mas seguem o mesmo padrão de edição. Podem ser alterados, categoria, nome e link, dentro de cada categoria podem ser adicionados varios atalhos (nome e link).

```json
[
 [
  ["Categoria 1"],
  [
   {
    "nome": "Nome",
    "link": "https://link.com.br"
   },
   {
    "nome": "Nome",
    "link": "https://link.com.br"
   }
  ]
 ],
 
 [
  ["Categoria 1"],
  [
   {
    "nome": "Nome",
    "link": "https://link.com.br"
   },
   {
    "nome": "Nome",
    "link": "https://link.com.br"
   }
  ]
 ]

]
```

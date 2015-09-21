# Controle de gastos

A página inicial deverá ser um dashboard com alguns gráficos. Nessa versão inicial temos apenas um gráfico que deve mostrar o total gasto em cada mês de um determinado ano.

Outra funcionalidade que deve estar presente na primeira versão é uma listagem de funcionários. Ao selecionar um funcionário o detalhes desse funcionário (hoje temos apenas o nome) juntamente com as despesas do funcionário no ano deve ser apresentadas.

Por fim, deve ser possível cadastrar uma nova despesa para o funcionário.

## Baixando pacotes

Para execuçáo do sistema web é necessario instalar os seguintes itens:
NPM 2.2.0
Node 0.10.33
express 4.13.3
request 2.62.0
querystring 0.2.0
body-parser 1.14.0

```
$ sudo apt-get install node
```

```
$ sudo apt-get install npm
```

```
$ npm install express
```

```
npm install request
```

```
npm install querystring
```

```
npm install body-parser
```

## Utilizando o Software

A Url pré definida para o servidor node é http://localhost:9908.

Caso seja necessario alterar a porta, edite os arquivos server/backend.js na linha 11.

Em seguida, altere a url padráo do angular em js/values/values.js na linha 3.

Agora execute o servidor node com o seguinte comando.

```
$ node backend.js //Voce deve estar no diretorio do arquivo ou passar o caminho completo
```

Por fim, abra o arquivo index.html no browser de sua preferencia.

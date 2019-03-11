# Nossas Lojas 

Programa que guarda informações de lojas físicas de um e-commerce. Guarda informações como id das lojas, nome, endereço, telefone/celular, CNPJ, horário de trabalho, cidade onde se localiza e estado. 


# Ferramentas Utilizadas

 Foi usado o Node.js como principal compilador, e as principais biblotecas utilizadas foram express, body-parse, consign, nodemon, express-validator..., que podem ser baixadas atrasvés do comando npm install no terminal da pasta. 
 Desenvolvido no windows 7, mas quando executado apartir do docker é executado em linux. E como banco de dados foi usado o MySQL para armazenamento dos dados.
 
 
 # Como baixar e executar
 Primeiramente você deve ter o node.js e o banco de dados MYSQL.
 
 Após clonar o repositório, você deve abrir a pasta no terminal e executar o comando "npm install" para instalar todos os pacotes usados  na produção da aplicação.
 
 Em seu banco de dados(MySQL) voce deve criar uma database da seguinte forma:
 
 ```
 CREATE DATABASE XXXXXXXXXXXXX;
 USE XXXXXXXXXXXXX;
 ```
 No lugar de ```XXXXXXXXXXXXX``` você deve color o nome da sua database e no campo abaixo você deve colocar o nome escolhido em cima novamente.
 ```Obs:Em meu exemplo usei "lojas" como nome da database.```
 
 Após isso você devera criar uma tabela da seguinte forma:
 
 ```
 CREATE TABLE`lojas`(
`id` int(11) NOT NULL AUTO_INCREMENT,
`nome_loja` varchar(100) NOT NULL,
`endereco` text NOT NULL,
`celular` varchar(12) NOT NULL,
`cnpj` varchar(14) NOT NULL,
`horarioDeTrabalho` text NOT NULL,
`cidade` text NOT NULL,
`estado` varchar(2) NOT NULL,
PRIMARY KEY(id)
);
```

 Após a instalação de todos os requisitos acima você deve abrir o arquivo ```connectionFactory.js``` dentro da pasta ```persistencia``` no repositório clonado. Nela voce deve inserir seu usuário e senha dentro da função ```createDBConnection``` como abaixo:
 
 var mysql = require('mysql');
```
function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'INSIRA O SEU USÚARIO AQUI',
        password: 'INSIRA SUA SENHA AQUI',
        database: 'INSIRA O NOME DA SUA DATABASE'
    });
}

module.exports = function () {
    return createDBConnection;
}
```
 
 
 ## Como Utilizar
 
  Para testar, fazer consultas você deverá utilizar o app ```Postman```.
 Antes de fazer os testes a seguir você deverá executar o seguinte processo:

 - Entrar na pasta do projeto no termina;
 - Botar para rodar a aplicação com o comando ```nodemon index.js```.
 - É recomendado tambem estár com o MySQL aberto para poder ver as alterações no banco de dados.
 
 
 ### Cria Loja
  
 Para criar uma nova loja e cadastra-la, você deverá selecionar o método ```POST``` no ```Postman``` e deverá:
 
 - Inserir a URL: http://localhost:3000/criaLoja;
 - Na aba Headers você deverá usar ```Content-Type```;
 - Na aba ```Body``` deverá selecionar o modo ```raw``` e selecionar o ```JSON(application/json)```;
 - E no campo abaixo você irá inserir os dados da loja, passando-os como no exemplo:
 ```
 {
    "nome_loja": "Loja A",
    "endereco": "Rua Abc, 000",
    "celular": 00 0000 0000,
    "cnpj": "00.000.000/0000-00",
    "horarioDeTrabalho": "Diariamente das 11hs às 23hs",
    "cidade": "Cidade ABC",
    "estado": "A"
}
 ```
 Após isso, você irá notar que foi acrescentado em seu banco de dados, na tabela as informações e irá retornar que a tabela foi criada em seu console!
 
 
 ### Edita Loja
 
 Para editar uma loja, você deverá selecionar o método ```PUT``` no ```Postman``` e deverá:
 - Inserir a URL: http://localhost:3000/editaLoja/{id} passando o ```ID``` da loja que deseja editar no lugar de ```{id}```;
 - Na aba Headers você deverá usar ```Content-Type```;
 - Na aba ```Body``` deverá selecionar o modo ```raw``` e selecionar o ```JSON(application/json)```;
 - E no campo abaixo você irá inserir os NOVOS dados da loja, passando-os como no exemplo:
  ```
 {
    "nome_loja": "Loja B",
    "endereco": "Rua Cba, 001",
    "celular": 11 1111 1111,
    "cnpj": "00.000.000/0000-01",
    "horarioDeTrabalho": "Diariamente das 14hs às 22hs",
    "cidade": "Cidade ABC",
    "estado": "A"
}
 ```
 
 Assim que você atualizar seu banco de dados ira ver que sua tabela foi atualizada com sucesso!

 ### Deleta Loja
 
 Para deletar uma loja, você irá selecionar o método ```DELETE``` no ```Postman``` e deverá:
 - Inserir a URL: http://localhost:3000/deletaLoja/{id} passando o ```ID``` da loja que deseja deletar no lugar de ```{id}```;
 - Na aba Headers você deverá usar ```Content-Type```.
 
 Após a atualização da tabela você irá notar que foi deletada a loja com o ```ID``` correspondente ao que foi passado.
 
 
 ### Busca por ID
 Para buscar uma loja pelo ```ID```, você deverá selecionar o método ```GET``` no ```Postman``` e deverá:
 - Inserir a URL: http://localhost:3000/buscaId/{id} passando o ```ID``` da loja que deseja buscar no lugar de ```{id}```;
 - Na aba Headers você deverá usar ```Content-Type```.
 
 E você irá perceber que retornou no Body as informações da loja cujo o ```ID``` correspondente ao que foi passado.
 
 
  ### Busca por Estado e Cidade
  Para buscar uma loja pelo ```estado``` e ```cidade```, você deverá selecionar o método ```GET``` no ```Postman``` e deverá:
  - Inserir a URL: http://localhost:3000/buscaEstado/{estado}/{cidade} passando o ```Estado``` e a ```Cidade``` da loja que deseja buscar no lugar de ```{estado}``` e de ```{cidade}```;
  - Na aba Headers você deverá usar ```Content-Type```.
  
  Caso queira ver minha ```Collection``` no ```Postman``` é só clicar [aqui](https://www.getpostman.com/collections/821e689fc365585952a9).
  
  ###Complemento
  - Clicando [aqui](https://cloud.docker.com/u/paulera25/repository/docker/paulera25/node), você poderá ver a imagem do NodeJs no DockerHub sendo executada no servidor.
  - Caso queria ver a documentação deste projeto em uma API no Swagger, basta apenas baixar o arquivo ```swagger-Paulo.yaml``` disponivel em [meu repositório](https://github.com/paulodaluz/SemiTcc.git) no GitHub e importa-lo no site do [Swagger](https://editor.swagger.io/).
  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

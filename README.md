# CityExploreAPI
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Descrição
CityExploreAPI é um serviço web desenvolvido em Node.js com TypeScript, projetado para fornecer informações abrangentes sobre cidades, pontos turísticos e eventos. Projetado para integrar-se facilmente a aplicativos e plataformas, essa API oferece uma maneira simples e eficaz de acessar dados relacionados a destinos urbanos em todo o mundo.

## Stack utilizada

* `Node.js` v18.14.0
* `express` v4.18.2,
* `knex` v3.0.1
* `mysql2` v3.6.2
* `yup` v1.3.3
* `ts-node-dev` v2.0.0

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/GuiMeiring/city-explore-api.git
   
2. Acesse o diretório do projeto:

   ```bash
   cd city-explore-api
   ````


## Configuração
Antes de executar a API, você precisa configurar algumas variáveis de ambiente. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:


 ```bash
   PORT=                    # Porta da aplicação
   NODE_ENV=                # Definir o ambiente de trabalho / production / development 
   DB_HOST=127.0.0.1        # Endereço ou localização do servidor de Banco de Dados Mysql
   DB_PORT=3306             # Porta do DataBase Mysql
   DB_USER=                 # Usuário Mysql
   DB_PASS=                 # Senha do usuário Mysql
   DB_SCHEMA=               # Nome do banco de dado
   API_KEY_OPENCAGE=        #Chave da API externa OpenCAge
   API_KEY_OPENTRIPMAP=     # Chave da API externa OpenTripMap     
   API_KEY_OPENWEATHERMAP=  # Chave da API externa OpenWeatherMap               
   ```


## Uso e Ambientes

 ### * Desenvolvimento
 Para iniciar o servidor de desenvolvimento, altere no arquivo .env a variável `NODE_ENV`:

 ```bash
   NODE_ENV=develompment
 ```
 Execute esse comando para rodar as migrations:

 ```bash
    npm run knex:migrate
 ```
 E as seeds:

 ```bash
    npm run knex:seed
 ```
Para iniciar a aplicação execute o seguinte comando:

 ```bash
   npm start
 ```
 ### * Produção

 Para iniciar o servidor de produção, altere no arquivo .env a variável `NODE_ENV`:

 ```bash
   NODE_ENV=production
 ```

 Execute esse comando para gerar a build da aplicação

 ```bash
    npm run build
 ```

 Para iniciar a aplicação execute o seguinte comando:

 ```bash
   npm run production
 ```

### Endpoints

A API expõe os seguintes *endpoints* a partir da *base URL* `localhost:{PORTA_ENV}` deve ser substituído pela porta que você configurou em sua variável de ambiente `PORT`:

`/cities`
* `GET /cities`
* `GET /city`
* `GET /search_city`
* `POST /cities`
* `PUT /cities/:id`
* `DELETE /cities/:id`

### Roadmap

* Tratamento de erros
* Validações
* Integração com APIs


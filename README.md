# My Manager - API Rest

0 Sistema consiste em um API de gerenciamento de clientes e vendas, sendo possível fazer cadastro de usuários, login de usuários com autenticação, cadastro, edição e exclusão de clientes, produtos e vendas


## Funcionalidades

- Adicionar, editar, remover e atualizar clientes
- cadastro e login de usuários
- Adicionar, editar, remover e atualizar produtos
- Adicionar e remover vendas

## Requisitos para rodar o projeto localmente


- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

## Rodando localmente o projeto

1. Clone o repositório

    ```bash
   git clone git@github.com:gabesouto/bemobile-test-tecnico.git
    ```

2. Navegue para o repositório

    ```bash
    cd bemobile-test-tecnico/bemobile-test
    ```

3. Instale as depêndencias

    ```bash
    npm install
    ```

4. Inicia o banco de dados com o docker compose. Dependendo da sua versão do docker compose talvez seja necessário utilizar `docker compose` ao invés de `docker-compose`

    ```bash
    docker-compose up -d
    ```

5. Adicione as suas credencias do MySQL ao arquivo <Strong>.env-example</Strong> e renomeie ele para <Strong>.env</Strong>

6. Crie as tabelas e utilize as seed para deixar o banco de dados pronto para ser utilizado.

    ```bash
    npm run db:restart
    ```

7. Inicie a aplicação. a API estará disponivel em  `http://localhost:3333`   

    ```bash
    npm run dev
    ```

## Diagrama de Relacionamentos do Banco de Dados

 ![](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/diagramaErV2.png)


## Rotas

### `/signup`

- **MÉTODO**: POST.
- **Descrição**: Cadastra um novo usuário e retorna os dados referentes ao novo usuário.
        ![signuo-user-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/signupExample.png)

### `/login`

- **MÉTODO**: POST.
- **Descrição**: Loga um usuário e retorna um token de autenticação.
        ![login-user-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/loginExample.png)

## Rotas com autenticação JWT

### As rotas a seguir exigem um token de autenticação para serem acessadas, esse token é gerado no momento do login.

### `/clients`

- **MÉTODO**: GET.
- **Descrição**: Retorna todos os clientes cadastrados.
        ![get-clients-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/getAllClientsExample.png)
  
### `/clients`

- **MÉTODO**: POST.
- **Descrição**: Cadastra um novo client.
        ![post-clients-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/createClientExample.png)


### `/clients/:id`

- **MÉTODO**: GET.
- **Descrição**: Recupera o cliente referente ao id da url.
        ![get-client-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/getClientByIdExample.png)

### `/clients/:id?month=MM&year=YYYY`

- **MÉTODO**: GET.
- **Descrição**: Retorna os dados de um cliente e as suas vendas filtradas pelo mês e ano. No momento de fazer o request altere "MM" E "YYYY" para as datas que deseja filtrar
        ![get-sales-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/getClientsSalesByDate.png)

### `/clients/:id`

- **MÉTODO**: PUT.
- **Descrição**: Atualiza os dados de um cliente.
        ![put-client-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/updateClientExample.png)

### `/clients/:id/addresses`

- **MÉTODO**: POST.
- **Descrição**: Adiciona um endereço a um cliente.
        ![put-client-address-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/addAddress.png)

### `/clients/:id/phones`

- **MÉTODO**: POST.
- **Descrição**: Adiciona um número de telefone a um cliente.
        ![post-client-phone-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/addPhones.png)


### `/clients/:id`

- **MÉTODO**: DELETE.
- **Descrição**: Remove um client.
        ![remove-client-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/deleteClientExample.png)


### `/products`

- **MÉTODO**: GET.
- **Descrição**: Retorna todos os produtos em ordem alfabética.
        ![get-products-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/getAllProductsExample.png)

### `/products`

- **MÉTODO**: POST.
- **Descrição**: Cadastra um novo produto no banco de dados
        ![post-products-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/createProduct.png)

### `/products/:id`

- **MÉTODO**: GET.
- **Descrição**: Retorna o produto referente ao id da url.
        ![get-product-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/getProductByIdExample.png)

### `/products/:id`

- **MÉTODO**: PUT.
- **Descrição**: Atualiza o produto referente ao id da url.
        ![put-product-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/updateProduct.png)


### `/products/:id`

- **MÉTODO**: DELETE.
- **Descrição**: Realiza um soft delete no produto referente ao id.
  
     ![put-product-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/updateProduct.png)

### `/sales/:clientId/:productId`

- **MÉTODO**: POST.
- **Descrição**: Cadastra uma venda a um cliente.
        ![post-sale-example](https://github.com/gabesouto/bemobile-test-tecnico/blob/main/bemobile-test/public/images/createSale.png)

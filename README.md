# teste_alphacode

## Instruções para uso

1. É recomendado utilizar um servidor local, como o XAMPP para executar o php no apache.

2. Execute o script SQL fornecido no diretório `database` no seu sistema de gerenciamento de banco de dados para criar a tabela necessária e registros padrões.

3. Para conexão com o banco, é provável que seja necessário mudar o valor das variávies do arquivo `Connection.php` referentes às credenciais e informações do banco de dados criado localmente.

4. Para visualizar o projeto, você pode utilizar o Live Server, uma extensão disponível em alguns navegadores (por exemplo, Live Server do Visual Studio Code). Com o Live Server ativado, deve-se abrir o arquivo `index.html` localizado na pasta `view` do projeto.

5. Para conexão do front-end com o back-end, é necessário mudar a url enviada no fetch das requisições do arquivo `contact.js` localizado na pasta `js`, adequando o caminho que leva ao arquivo index do php (a pasta `api` do app), o qual possui as rotas da api.

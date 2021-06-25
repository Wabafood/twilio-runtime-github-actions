# Tutorial

**Esse tutorial existe, caso surja uma dúvida em relação a alguma funcionalidade do `git` do Wabafood**
## Passos para realizar o controle de versão caso você nunca tenha clonado o repositório:

1. Clone o repositório

```bash
git clone https://github.com/Wabafood/wabafood-functions
```

> IMPORTANTE: Caso não tenha o git instalado use o link abaixo:

[Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Par checar se está tudo certo com a instalação rode o comando abaixo no seu terminal:

```bash
git --version
```

2. Instale todas as dependências do `npm`

```bash
npm install
```

> IMPORTANTE: Caso não tenha o npm ou NodeJs instalado use o link abaixo:

Par checar se está tudo certo com a instalação rode o comando abaixo no seu terminal:

```bash
node --version

# e rode também

npm --version
```

[Instaling NodeJs](https://nodejs.org/en/download/)

3. Após esses passos, troque da branch `main` para a branch `test`

```bash
git checkout test
```

4. Entre na pasta functions para alterar as funções do Twilio e faça suas alterações

> IMPORTANTE: Não altere os arquivos da página .github/workflows:

5. Após realizar suas alterações você deve seguir os passos abaixo para dar upload de suas alterações no Github:

```bash
# adicionando todas as alterações feitas
git add .

#deixando avisado qual alteração foi feita
git commit -m "ESCREVA AQUI UM COMENTÁRIO SOBRE SUA ALTERAÇÃO"

```

6. **Passo mais importante, mandar o código para a branch `test`**

```bash
git push origin test
```

___

## Checando alterações na Twilio e no Github:

[Github Actions](https://github.com/Wabafood/wabafood-functions/actions)

Espere até que apareça o check verde, caso apareça o check vermelho, tente fazer uma alteração mínima no código e seguir os passos **5 e 6** citados anteriormente.

Caso tenha dado tudo certo, vá até as Functions do serviço de `test` do Twilio e veja se foram adicionadas suas alterações:

[Twilio Functions](https://www.twilio.com/console/functions/overview/services)

___

## Subindo versão de Stage (Test -> Stage)

Após realizar os testes no ambiente `test` vamos agora subir as alterações feitas para o ambiente de stage, para isso vá até a página de Pull Requests do Github:

[Pull Requests](https://github.com/Wabafood/wabafood-functions/pulls)

Nessa página você deve clicar no botão verde **Compare & Pull Request** no canto superior direito, caso ele não apareça você deve clicar em **New Pull Request**

Ao criar-se o pull request você deve comparar os ambientes em que está trabalhando.

> **Lembre-se de sempre comparar o `base repository` chamado `Wabafood/wabafood-functions`**

Após isso você deve selecionar a branch base como **stage** e a branch compare como **test**, pois você está mandando o código alterado na branch `test` para a branch `stage`.

Agora clique em **Create Pull Request** e assim o pull request estará criado.

Caso não haja conflitos no código clique em **Merge Pull Request**, assim o código teste estará combinado ao código de stage.

**Caso haja conflito no código chame a gente [Slack](wabafood.slack.com)**

Por fim entre novamente na página do Github Actions para revisar se está tudo correto com o código para que ele suba para o Twilio:

[Github Actions](https://github.com/Wabafood/wabafood-functions/actions)

___

## Subindo versão de Production (Stage -> Production(main))

Após realizar os testes no ambiente `stage` vamos agora subir as alterações feitas para o ambiente de production, para isso vá até a página de Pull Requests do Github:

[Pull Requests](https://github.com/Wabafood/wabafood-functions/pulls)

Nessa página você deve clicar no botão verde **Compare & Pull Request** no canto superior direito, caso ele não apareça você deve clicar em **New Pull Request**

Ao criar-se o pull request você deve comparar os ambientes em que está trabalhando.

> **Lembre-se de sempre comparar o `base repository` chamado `Wabafood/wabafood-functions`**

Após isso você deve selecionar a branch base como **main** e a branch compare como **stage**, pois você está mandando o código alterado na branch `stage` para a branch `main (production)`.

Agora clique em **Create Pull Request** e assim o pull request estará criado.

Caso não haja conflitos no código clique em **Merge Pull Request**, assim o código stage estará combinado ao código de produção.

**Caso haja conflito no código chame a gente [Slack](wabafood.slack.com)**

Por fim entre novamente na página do Github Actions para revisar se está tudo correto com o código para que ele suba para o Twilio:

[Github Actions](https://github.com/Wabafood/wabafood-functions/actions)

___

**Pronto, o controle de versão está feito**
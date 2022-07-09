# Criador de alerta

## Como utilizar:
  - Importe o estilo e o scritp para o seu site:
  ```html
    <link rel="stylesheet" href="./alert.css">
    <script type="text/javascript" src="./alert.js" ></script>
  ```
  - Realize a chamada da função que inicializa o alerta:
  ```js
    alert({...});
  ```

## Configurações
  - A função `alert()`, exige que você passe um objeto com as configurações do alerta, sendo elas:
    * **title**: Título do alerta;
    * **type**: Tipo do alerta *(success, error, warning)*;
    * **message**: A mensagem que será mostrada no alerta. Caso não seja definida, uma mensagem padrão será mostrada;
    * **successButton**: Objeto com as informações do botão de sucesso. Caso não seja informado, um botão default será exibido no alerta;
      * **text**: Texto do botão. Caso não seja informado, será mostrado *OK*;
      * **action**: Função que será chamada quando o botão for clicado;
    * **errorButton**: Objeto com as informações do botão de errro. Caso não seja informado, esse botão não será exibido
      * **text**: Texto do botão. Caso não seja informado, será mostrado *CANCEL*;
      * **action**: Função que será chamada quando o botão for clicado;

## Exemplos:
  ```js
    alert({
      title: "Alerta de sucesso!",
      type: "success",
      message: "Mensagem de sucesso do alerta.",
      successButton: {
        text: "Confirmar"
      },
      errorButton: {
        text: "Fechar"
      }
    });
  ```
  ![teste](/img/exemplo-1.png)

  ```js
    alert({
      title: "Alerta de errro!",
      type: "error",
      message: "Mensagem de erro do alerta.",
      errorButton: {
        text: "Close"
      }
    });
  ```
  ![teste](/img/exemplo-2.png)

  ```js
    alert({
      title: "Alerta de atenção!",
      type: "warning",
      message: "Mensagem de atenção do alerta."
    });
  ```
  ![teste](/img/exemplo-3.png)
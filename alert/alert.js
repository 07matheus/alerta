

class Alert {
  status;
  title;
  message;
  confirmButtonText = 'Ok';
  confirmButtonAction;
  refuseButtonText;
  refuseButtonAction;

  // ELEMENTOS DO ALERTA
  container;
  boxAlerta;

  constructor(dados) {
    try {
      this.verificarParametros(dados);

      this.setValores(dados);

      this.criarAlerta();
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * 
   * @param   {array}   dados         Array dos campos do alerta 
   * @returns {boolean} true/false
   */
  verificarParametros(dados) {
    var continuar = true;

    var campos = [];
    this.parametrosObrigatorios().forEach(param => {
      if(dados[param] === undefined) {
        campos.push(param);
        continuar = false;
      }
    });

    if(!continuar) throw new Error('Os campos ('+ campos.join(', ')+') não foram definidos!');
  }

  /**
   * @method  parametrosObrigatorios  Método responsável por retornar os campos obrigatórios
   * @returns {array}                 array
   */
  parametrosObrigatorios() {
    return [
      "status",
      "message"
    ];
  }

  /**
   * @method setValores            Método responsável por setar as informações do alerta
   * @param  {object}      dados   Array dos campos do alerta
   */
  setValores(dados) {
    // VERIFICA O STATUS
    if(!['success','error','alert'].includes(dados.status)) throw new Error('Status não disponível');
    this.status = dados.status;

    // AJUSTA O TÍTULO
    var titulo  = {"success": "Sucesso","error": 'Erro',"alert": 'Atenção'};
    var campo   = dados.status;
    this.title  = titulo[campo] + '!';

    // AJUSTA A MENSAGEM
    this.message = dados.message;

    // AJUSTA O TEXTO DOS BOTÕES
    if(dados.confirmButtonText !== undefined) this.confirmButtonText = dados.confirmButtonText;
    if(dados.refuseButtonText !== undefined) this.refuseButtonText = dados.refuseButtonText;
  }

  criarAlerta() {
    // INSERE O CONTAINER DO ALERTA
    this.criarContainer();

    // CRIA A BOX DO ALERTA
    this.criarBoxAlerta();
  }

  criarContainer() {
    var container = document.createElement('div');
    container.setAttribute('id','alert-custom');

    // SALVA O REGISTRO DO CONTAINER
    this.container = container;

    document.body.appendChild(container);
  }

  criarBoxAlerta() {
    var boxAlerta = document.createElement('div');
    boxAlerta.setAttribute('class','alert-box');
    this.boxAlerta = boxAlerta;

    // CRIA OS ELEMENTOS DA BOX DE ALERTA
    this.criarElementosAlerta();

    // INSERE O ALERTA NO HTML
    this.container.appendChild(boxAlerta);
  }

  criarElementosAlerta() {
    // INSERE O TÍTULO
    var titulo = document.createElement('div');
    titulo.setAttribute('class','alert-box-title ' + this.status);
    titulo.innerHTML = this.title;

    // CRIA O ÍCONE DE STATUS DO ALERTA
    var status = document.createElement('div');
    status.setAttribute('class','alert-box-icon ' + this.status);

    // INSERE A MENSAGEM
    var mensagem = document.createElement('div');
    mensagem.setAttribute('class','alert-box-message');
    mensagem.innerHTML = this.message;

    // INSERE BOTÃO
    var botoes = document.createElement('div');
    botoes.setAttribute('class','alert-box-button')
    var botaoAceitar = document.createElement('div');
    botaoAceitar.setAttribute('class','alert-box-button-item confirm');
    botaoAceitar.innerHTML = this.confirmButtonText;
    botoes.appendChild(botaoAceitar);

    // INSERE O BOTÃO DE RECUSAR
    if(this.refuseButtonText !== undefined) {
      var botaoRecusar = document.createElement('div');
      botaoRecusar.setAttribute('class','alert-box-button-item refused');
      botaoRecusar.innerHTML = this.refuseButtonText;
      botoes.appendChild(botaoRecusar);
    }

    // INSERE OS ELEMENTOS
    this.boxAlerta.appendChild(status);
    this.boxAlerta.appendChild(titulo);
    this.boxAlerta.appendChild(mensagem);
    this.boxAlerta.appendChild(botoes);
  }
}
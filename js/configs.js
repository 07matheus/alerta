function formatarString(string) {
  // TRANSFORMA O HTML EM STRING
  string = string.innerHTML;

  // FORMATA O HTML PARA UMA FORMA QUE POSSA SER UTILIZÁVEL
  string = string.replace(/\r?\n|\r|\s|&lt;|&gt;/g,'');
  string = string.replace(/(<([^>]+)>)/ig,' ');
  string = string.replace(/(^\s+|\s+$)/g,'');
  string = string.replace(/\s+/g, ' ');
  string = string.replace(/\s+=+\s/g, '=');
  string = string.replace(/\s+=+\s/g, '=');

  // EVITA OCORRÊNCIA DE TAGS QUE NÃO FORAM FECHADAS CORRETAMENTE
  string = string.replace('/script', '></script');

  return '<' + string + '>\n';
}

function addContador() {
  var contador = document.querySelector('#contador');
  var timer    = parseInt(contador.innerHTML);

  var cont = setInterval(() => {
    --timer;
    // ALTERA O CONTADOR
    contador.innerHTML = timer;
  }, 1000);

  // PARA O CONTADOR E REMOVE A BOX DE CÓPIA
  setTimeout(() => {
    clearInterval(cont);
    document.querySelector('#apagar').parentNode.remove();
  },timer * 1000);
}

function copiarValorElemento(string,elemento) {
  // CRIA UM ELEMENTO TEMPORÁRIO
  var boxCopiar = document.createElement('div');
  boxCopiar.setAttribute('style','display:flex;');

  // CRIA O INPUT PARA A CÓPIA
  var input   = document.createElement('input');
  input.setAttribute('id','apagar');
  input.setAttribute('class','copy-code');
  input.value = string;

  // CRIA O CONTADOR
  var boxContador = document.createElement('div');
  boxContador.setAttribute('id','apagar');
  boxContador.setAttribute('class','copy-warning');
  boxContador.innerText = 'Apagando em:';
  var contador    = document.createElement('div');
  contador.setAttribute('id','contador');
  contador.innerText = '10';
  boxContador.appendChild(contador);
  
  // AJUSTA OS ELEMENTOS NA BOX
  boxCopiar.appendChild(input);
  boxCopiar.appendChild(boxContador);

  // INSERE O ELEMENTO
  var local = elemento.parentNode.parentNode;
  local.appendChild(boxCopiar);
  
  // ADICIONA CONTADOR PARA REMOÇÃO DO ELEMENTO
  addContador();
}

function copiar() {
  var box    = this.parentNode.previousElementSibling;
  var linhas = box.children;
  var count  = box.childElementCount;

  var valor = '';
  for(var i = 0; i < count; i++) {
    valor += formatarString(linhas[i]);
  }

  // CRIA UM ELEMENTO PARA PODER COPIAR O TEXTO
  copiarValorElemento(valor,this);
}

document.querySelectorAll('#copiar').forEach(el => el.addEventListener('click',copiar));
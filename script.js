let   dados                   = [];
const barrasGrafico           = document.querySelectorAll('.main-grafico-item-barra');
const valoresGraficos         = document.querySelectorAll('.main-grafico-item-valor');
const legendasGrafico         = document.querySelectorAll('.main-grafico-item-dia');
const meuSaldo                = document.querySelector('.header-texto h3');
const totalEsseMes            = document.querySelector('.main-texto-total h2');
const porcentagemDoMesPassado = document.querySelector('.main-texto-porcentagem h4');

async function fetchDados() {
  dados = await (await fetch('./data.json')).json(); 

  setTimeout(() => {
    geraSaldo();
    geraGrafico();
    geraTotal();
    geraPorcentagem();
  }, 
  /* 
    SETTIMEOUT PARA FAZER UM LOADING MAIS DEMORADO,
    COMO É UM ARQUIVO SIMULANDO A RESPOSTA DE UMA API,
    ELE ACABA RETORNANDO MUITO RÁPIDO
  */
  1000);
}

function geraGrafico() {
  const valorMaior = dados.reduce((anterior, atual) => {
    return anterior.amount < atual.amount ? atual : anterior;
  });

  barrasGrafico.forEach((element, index) => {
    if (dados[index].amount === valorMaior.amount) {
      element.classList.add('barra-destaque')
    }
    element.classList.remove('skeleton');
    element.style.height = `${dados[index].amount * 2.86}px`;
  });

  valoresGraficos.forEach((element, index) => {
    element.innerHTML = dados[index].amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  });

  legendasGrafico.forEach((element, index) => {
    element.classList.remove('skeleton');
    element.innerHTML = dados[index].day;
  });
};

function geraTotal() {
  const total = dados.reduce((acumulador, atual) => {
    return acumulador + atual.amount;
  }, 0);

  totalEsseMes.innerHTML = `${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
  totalEsseMes.classList.remove('skeleton');
}

function geraSaldo() {
  const saldo = 921.48;

  meuSaldo.innerHTML = `${saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
  meuSaldo.classList.remove('skeleton');
}

function geraPorcentagem() {
  const porcentagem = 2.4;

  porcentagemDoMesPassado.innerHTML = `+${porcentagem}%`;
  porcentagemDoMesPassado.classList.remove('skeleton');
}

fetchDados();
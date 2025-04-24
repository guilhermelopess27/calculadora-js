document.querySelectorAll('button').forEach((botao) => {
    botao.addEventListener('click',()=>{
        if (botao.id !== 'tema'){//vai ignorar o botao tema

            const tecla = botao.textContent;
            if (tecla =='='){
                resultado(tecla)
            } else{
                lidarComTecla(tecla)
            }

        }
       
        
    })
})//aqui ja sei qual tecla foi clicada
//agora tenho que fazer algo com a tecla

const visor = document.querySelector('.visor');
visor.innerHTML = '0';


function lidarComTecla(tecla){
    if (visor.innerHTML === '0' && !isNaN(tecla)) {
        visor.innerHTML = tecla;
        return;
    }

    if(tecla == '+' || tecla =='-'|| tecla =='/' || tecla =='*'){
        visor.innerHTML += ` ${tecla} `
    }

    else if(tecla=='C'){
        visor.innerHTML='0'
    }

    else if (tecla == '⌫' ) { 
        visor.innerHTML = visor.innerHTML.slice(0, -1); // remove o último caractere
    }

    else{
        visor.innerHTML += `${tecla}`
    }
}


function resultado(tecla) {
    const textoDoVisor = visor.textContent;//pego o conteudo que esta no visor e armazeno nessa variavel

    let numeroatual = ''; //crio o numero atual que vou ficar atualizando
    let arraydosnumeros = [];//crio o array para armazenar os numeros 
    let arraydosoperadores = [];//crio o array para armazenar os operadores

    for (let i = 0; i < textoDoVisor.length; i++) { //aqui faço um for que vai rodar sobre toda a string texto do visor
        const caractere = textoDoVisor[i];//disse que a posição que o i esta sera o caractere que quero avaliar

        if ((!isNaN(caractere) && caractere !== ' ') || caractere === '.') { //faço a verificação se é um numero, sem nao é espaço vazio
            //e se é ponto
            numeroatual += caractere;//se for, vou concatenar duas strings, se o primeiro numero for 3, numero atual sera 3
            //na proxima volta, se ele detectar um numero ao inves de um operador, ele vai concatenar a string
        } else if ('+-*/'.includes(caractere)) {//se nao for numero nem ponto, e for operador
            arraydosnumeros.push(Number(numeroatual));//vou pegar o numero atual e jogar no array dos numeros, vai como string
            numeroatual = '';//zero o numero atual para ele seguir o fluxo com o proximo numero
            arraydosoperadores.push(caractere);//insiro o operador atual no caractere
        }
    }

    if (numeroatual !== '') {//essa linha é pq o for anterior so adiciona o numero ao array se ele encontrar um operador
        //porem o ultimo numero nao tem operador sucedendo, oq faz com que ele nao seja adicionado
        //por isso verifico, se o numero atual nao estiver vazio, adicione no array dos numeros
        arraydosnumeros.push(Number(numeroatual));
    }

    // ⚙️ Primeiro passo: multiplicação e divisão
    //faço multiplicaçao e divisão primeiro por conta da ordem de operações
    for (let i = 0; i < arraydosoperadores.length; i++) {
        if (arraydosoperadores[i] === '*' || arraydosoperadores[i] === '/') {//varro o array de operadores, se encontrar multi ou div, sera executado
            const n1 = arraydosnumeros[i];
            const n2 = arraydosnumeros[i + 1];
            const op = arraydosoperadores[i];
            if (op === '/' && n2 === 0) {
                visor.innerHTML = 'Erro';
                return;
            }
            const parcial = op === '*' ? n1 * n2 : n1 / n2;//defino os dois numeros, um antes e um depois do operador e faço a operação
            //operador ternario, se o op == * faça n1*n2 ou n1/n2
            //guardo na const parcial

            arraydosnumeros.splice(i, 2, parcial);//varro o array, a partir do numero atual, excluo ele e o proximo, e coloco no lugar o valor
            arraydosoperadores.splice(i, 1);//exclui o operador na posição atual
            i--; // reavalia o novo operador nessa posição
        }
    }

    // ➕➖ Segundo passo: soma e subtração
    let resultadoFinal = arraydosnumeros[0];
    for (let i = 0; i < arraydosoperadores.length; i++) {//aqui verifico se é soma ou subtração e faço a operação
        const op = arraydosoperadores[i];
        const n = arraydosnumeros[i + 1];

        if (op === '+') resultadoFinal += n;
        if (op === '-') resultadoFinal -= n;
    }

    visor.innerHTML = resultadoFinal;
}

//suporte para digitar no teclado

document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;//crio um ouvidor para o evento keydown, armazeno na variavel tecla key, que vai pegar exatamente a tecla pressionada

    if ('0123456789+-*/.'.includes(tecla)) {
        lidarComTecla(tecla);//se for um desses numeros, jogo para lidar com tecla
    } else if (tecla === 'Enter') {
        resultado('=');
    } else if (tecla === 'Backspace') {
        lidarComTecla('⌫');
    } else if (tecla.toLowerCase() === 'c') {
        lidarComTecla('C');
    }
});

const botaoTema = document.getElementById('tema');
const corpo = document.body;

botaoTema.addEventListener('click', (evento) => {
    evento.stopPropagation(); // impede propagação para outros listeners
    corpo.classList.toggle('dark-mode');//adiciona a tag dark-mode ao body, tag que ja esta editada no css
});
let objetao = {};
let tituloDoQuiz;
let imagemDoQuiz;
let qtdDePerguntas;
let qtdDeNiveis;

function inicioDoQuizz(){
    tituloDoQuiz = document.getElementById('titulo').value;
    imagemDoQuiz = document.getElementById('imagem').value;
    qtdDePerguntas = parseInt(document.getElementById('qtd-perguntas').value);
    qtdDeNiveis = parseInt(document.getElementById('qtd-niveis').value);
    //if(tituloDoQuiz === '' || imagemDoQuiz === '' || qtdDePerguntas === undefined || qtdDeNiveis === undefined){
       // document.querySelector('')
    //}else{
        document.querySelector('.tela3__comeco').classList.add('tela3--escondido');
        document.querySelector('.tela3__perguntas').classList.remove('tela3--escondido');
        objetao.title = tituloDoQuiz;
        objetao.image = imagemDoQuiz;
   // }
}

function perguntasDoQuizz(){
    let arrayQuestoes = []
    for(let i=1;i<=qtdDePerguntas;i++){

        let divPergunta = document.querySelectorAll('.tela3__formulario')[i];

        const arrayResposta = []
        for(let j=0;j<divPergunta.children[1].querySelectorAll('div').length;j++){
            let item = divPergunta.children[1].querySelectorAll('div')[j]
            if(j=== 0){
                arrayResposta.push({text: item.children[0].value, image : item.children[1].value, isCorrectAnswer: true})
                continue
            }
            arrayResposta.push({text: item.children[0].value, image : item.children[1].value, isCorrectAnswer: false})

        }
        const pergunta = divPergunta.children[0].querySelectorAll('input')[0].value
        const imagem = divPergunta.children[0].querySelectorAll('input')[1].value
        arrayQuestoes.push({title: pergunta, image : imagem, answers: arrayResposta})
        
    }
    document.querySelector('.tela3__perguntas').classList.add('tela3--escondido');
    document.querySelector('.tela3__niveis').classList.remove('tela3--escondido');
    objetao.questions = arrayQuestoes
    console.log(objetao)
}

function criarNovaPergunta(){
    let perguntas = document.querySelector('.tela3__perguntas').querySelectorAll('.tela3__formulario');
    for(let i=0;i<perguntas.length;i++){
        if(perguntas[i].classList.contains('tela3--escondido')){
            perguntas[i].classList.remove('tela3--escondido');
            perguntas[i].parentElement.classList.remove('novo-formulario');
            perguntas[i].parentElement.classList.add('novo-formulario--vertical');
            perguntas[i].parentElement.children[0].classList.add('novo-item--escondido');
            perguntas[i].parentElement.children[1].classList.add('novo-item--escondido');
            let novaPergunta = perguntas[i];
            novaPergunta.innerHTML = `<div class="vertical">
                    <h3>Pergunta ${i+1}</h3>
                    <input id="pergunta" class="tela3__formulario__campos" type="text" placeholder="Texto da pergunta">
                    <input id="cor" class="tela3__formulario__campos" type="text" placeholder="Cor de fundo da pergunta (em hexadecimal: #FFFFFF)">
                </div>
                <div class="vertical">
                    <br>
                    <h3>Resposta correta</h3>
                    <div>
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta correta">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem">
                    </div>
                    <br>
                    <h3>Respostas incorretas</h3>
                    <div>
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta incorreta 1">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem 1">
                    </div>
                    <br>
                    <div>
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta incorreta 2">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem 2">
                    </div>
                    <br>
                    <div>
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta incorreta 3">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem 3">
                    </div>
                </div>`
            break;
        }
    }
}

function criarNovoNivel(){
    let niveis = document.querySelector('.tela3__niveis').querySelectorAll('.tela3__formulario');
    if(niveis[1].classList.contains('tela3--escondido')){
        niveis[1].classList.remove('tela3--escondido');
        niveis[1].parentElement.classList.remove('novo-formulario');
        niveis[1].parentElement.classList.add('novo-formulario--vertical');
        niveis[1].parentElement.children[0].classList.add('novo-item--escondido');
        niveis[1].parentElement.children[1].classList.add('novo-item--escondido');
        let novoNivel = niveis[1];
        novoNivel.innerHTML = `<div class="vertical">
                <h3>Nível 2</h3>
                    <input id="nivel1" class="tela3__formulario__campos" type="text" placeholder="Título do nível">
                    <input id="taxaAcertos1" class="tela3__formulario__campos" type="text" placeholder="% de acertos mínima">
                    <input id="urlImagemNivel1" class="tela3__formulario__campos" type="text" placeholder="URL da imagem do nível">
                    <input id="descricaoNivel1" class="tela3__formulario__campos" type="text" placeholder="Descrição do nível">
                </div>`
    }
}

function criarQuizz(){
    let arrayLevels = []
    for(let i=qtdDePerguntas+1;i<=qtdDePerguntas+qtdDeNiveis;i++){
        console.log('ola')
        console.log(document.querySelectorAll('.tela3__formulario'))
        let divNiveis = document.querySelectorAll('.tela3__formulario')[i];
        const nivel = divNiveis.children[0].querySelectorAll('input')[0].value;
        const imagem = divNiveis.children[0].querySelectorAll('input')[1].value;
        const texto = divNiveis.children[0].querySelectorAll('input')[2].value;
        const taxaAcertos = divNiveis.children[0].querySelectorAll('input')[3].value;
        arrayLevels.push({title: nivel, image : imagem, text: texto, minValue: taxaAcertos})
        
    }
    document.querySelector('.tela3__niveis').classList.add('tela3--escondido');
    document.querySelector('.tela3__finalizada').classList.remove('tela3--escondido');
    objetao.levels = arrayLevels
    axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objetao).then(() => {
        console.log('Yaaata')
    });
}
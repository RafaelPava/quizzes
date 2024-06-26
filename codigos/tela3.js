let objetao = {};
let tituloDoQuiz;
let imagemDoQuiz;
let qtdDePerguntas;
let qtdDeNiveis;
let meusQuizzes = [];
const ids = localStorage.getItem("id");
console.log(ids)
if (ids !== null) {
    meusQuizzes = JSON.parse(ids);
    console.log(meusQuizzes)
}

function inicioDoQuizz() {
    tituloDoQuiz = document.getElementById('titulo').value;
    imagemDoQuiz = document.getElementById('imagem').value;
    qtdDePerguntas = parseInt(document.getElementById('qtd-perguntas').value);
    qtdDeNiveis = parseInt(document.getElementById('qtd-niveis').value);
    if (tituloDoQuiz.length < 20 || tituloDoQuiz.length > 65 || imagemDoQuiz === '' || qtdDePerguntas < 3 || qtdDeNiveis < 2) {
        if (document.querySelector('label')) {
            document.querySelector('label').innerHTML = ''
        } else {
            document.querySelector('.tela3__formulario').innerHTML += `<label class="error">Os campos não foram preenchidos corretamente</label>`
        }
    } else {
        document.querySelector('.tela3__comeco').classList.add('tela3--escondido');
        document.querySelector('.tela3__perguntas').classList.remove('tela3--escondido');
        objetao.title = tituloDoQuiz;
        objetao.image = imagemDoQuiz;
        let novasPerguntas = document.querySelector('.tela3__perguntas');
        for (let i = 1; i < qtdDePerguntas; i++) {
            novasPerguntas.innerHTML += `<div class="novo-formulario">
                    <h3>Pergunta ${i + 1}</h3>
                    <button class="novo-item" onclick="criarNovaPergunta()"><img src="./imgs/vector.png" width="26px" height="23px"></button>
                    <div class="tela3__formulario tela3--escondido"></div>
                </div>`
        } novasPerguntas.innerHTML += `<button class="botao-criar-formulario" onclick="perguntasDoQuizz()">Prosseguir pra criar níveis</button>`
    }
}

function perguntasDoQuizz() {
    let arrayQuestoes = []
    for (let i = 1; i <= qtdDePerguntas; i++) {
        let divPergunta = document.querySelectorAll('.tela3__formulario')[i];
        const arrayResposta = []
        for (let j = 0; j < divPergunta.children[1].querySelectorAll('div').length; j++) {
            let item = divPergunta.children[1].querySelectorAll('div')[j]
            if (j === 0) {
                arrayResposta.push({ text: item.children[0].value, image: item.children[1].value, isCorrectAnswer: true })
                continue
            }
            arrayResposta.push({ text: item.children[0].value, image: item.children[1].value, isCorrectAnswer: false })

        }
        const pergunta = divPergunta.children[0].querySelectorAll('input')[0].value
        const colors = divPergunta.children[0].querySelectorAll('input')[1].value
        arrayQuestoes.push({ title: pergunta, color: colors, answers: arrayResposta })

    }
    for(let i=0;i<qtdDePerguntas;i++){
        if(arrayQuestoes[i].title.length>=20 && arrayQuestoes[i].answers[i].text != '' && arrayQuestoes[i].color[0] === '#' && arrayQuestoes[i].color.length === 7 && arrayQuestoes[i].answers.length >= 2){
            continue
        }else{
            document.querySelector('.tela3__perguntas').innerHTML += `<label class="error">Os campos não foram preenchidos corretamente</label>`;
            return
        }
    }
    document.querySelector('.tela3__perguntas').classList.add('tela3--escondido');
    document.querySelector('.tela3__niveis').classList.remove('tela3--escondido');
    objetao.questions = arrayQuestoes
    let novosNiveis = document.querySelector('.tela3__niveis');
    for (let i = 1; i < qtdDeNiveis; i++) {
        novosNiveis.innerHTML += `<div class="novo-formulario">
                <h3>Nível ${i + 1}</h3>
                <button class="novo-item" onclick="criarNovoNivel()"><img src="./imgs/vector.png" width="26px" height="23px"></button>
                <div class="tela3__formulario tela3--escondido"></div>
                </div>`
    } novosNiveis.innerHTML += `<button class="botao-criar-formulario" onclick="criarQuizz()">Finalizar Quizz</button>`
}

function criarNovaPergunta() {
    let perguntas = document.querySelector('.tela3__perguntas').querySelectorAll('.tela3__formulario');
    for (let i = 1; i < perguntas.length; i++) {
        if (perguntas[i].classList.contains('tela3--escondido')) {
            perguntas[i].classList.remove('tela3--escondido');
            perguntas[i].parentElement.classList.remove('novo-formulario');
            perguntas[i].parentElement.classList.add('novo-formulario--vertical');
            perguntas[i].parentElement.children[0].classList.add('novo-item--escondido');
            perguntas[i].parentElement.children[1].classList.add('novo-item--escondido');
            let novaPergunta = perguntas[i];
            novaPergunta.innerHTML = `<div class="vertical">
                    <h3>Pergunta ${i + 1}</h3>
                    <input id="pergunta" class="tela3__formulario__campos" type="text" placeholder="Texto da pergunta">
                    <input id="cor" class="tela3__formulario__campos" type="text" placeholder="Cor de fundo da pergunta (em hexadecimal: #FFFFFF)">
                </div>
                <div class="vertical">
                    <br>
                    <h3>Resposta correta</h3>
                    <div class="vertical">
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta correta">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem">
                    </div>
                    <br>
                    <h3>Respostas incorretas</h3>
                    <div class="vertical">
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta incorreta 1">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem 1">
                    </div>
                    <br>
                    <div class="vertical">
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta incorreta 2">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem 2">
                    </div>
                    <br>
                    <div class="vertical">
                        <input id="resposta" class="tela3__formulario__campos" type="text" placeholder="Resposta incorreta 3">
                        <input id="imagem" class="tela3__formulario__campos" type="text" placeholder="URL da imagem 3">
                    </div>
                </div>`
            break;
        }
    }
}

function criarNovoNivel() {
    let niveis = document.querySelector('.tela3__niveis').querySelectorAll('.tela3__formulario');
    for (let i = 1; i < niveis.length; i++) {
        if (niveis[i].classList.contains('tela3--escondido')) {
            niveis[i].classList.remove('tela3--escondido');
            niveis[i].parentElement.classList.remove('novo-formulario');
            niveis[i].parentElement.classList.add('novo-formulario--vertical');
            niveis[i].parentElement.children[0].classList.add('novo-item--escondido');
            niveis[i].parentElement.children[1].classList.add('novo-item--escondido');
            let novoNivel = niveis[i];
            novoNivel.innerHTML = `<div class="vertical">
                    <h3>Nível ${i + 1}</h3>
                        <input id="nivel1" class="tela3__formulario__campos" type="text" placeholder="Título do nível">
                        <input id="taxaAcertos1" class="tela3__formulario__campos" type="text" placeholder="% de acertos mínima">
                        <input id="urlImagemNivel1" class="tela3__formulario__campos" type="text" placeholder="URL da imagem do nível">
                        <input id="descricaoNivel1" class="tela3__formulario__campos" type="text" placeholder="Descrição do nível">
                    </div>`
            break
        }
    }
}

function criarQuizz() {
    let arrayLevels = []
    for (let i = qtdDePerguntas + 1; i <= qtdDePerguntas + qtdDeNiveis; i++) {
        let divNiveis = document.querySelectorAll('.tela3__formulario')[i];
        const nivel = divNiveis.children[0].querySelectorAll('input')[0].value;
        const taxaAcertos = divNiveis.children[0].querySelectorAll('input')[1].value;
        const imagem = divNiveis.children[0].querySelectorAll('input')[2].value;
        const texto = divNiveis.children[0].querySelectorAll('input')[3].value;
        arrayLevels.push({ title: nivel, image: imagem, text: texto, minValue: taxaAcertos })
    }
    for(let i=0; i<qtdDeNiveis; i++){
        if(arrayLevels[i].title.length >= 10 && parseInt(arrayLevels[i].minValue) >= 0 && parseInt(arrayLevels[i].minValue) <= 100 && arrayLevels[i].text.length >= 30){
            if(parseInt(arrayLevels[0].minValue) == 0){
                continue
            }else{
                document.querySelector('.tela3__perguntas').innerHTML += `<label class="error">Os campos não foram preenchidos corretamente</label>`;
                return
            }
        }else{
            document.querySelector('.tela3__perguntas').innerHTML += `<label class="error">Os campos não foram preenchidos corretamente</label>`;
            return
        }
    }
    document.querySelector('.tela3__niveis').classList.add('tela3--escondido');
    document.querySelector('.tela3__finalizada').classList.remove('tela3--escondido');
    objetao.levels = arrayLevels;
    console.log(objetao)
    document.querySelector('.tela3__finalizada').innerHTML = `<h2>Seu quizz está pronto!</h2>
            <img src="${objetao.image}">
            <p>${objetao.title}</p>
            <a class="botao-criar-formulario" href="tela2.html">Acessar Quizz</a>
            <a href="index.html">Voltar pra home</a>`
    axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objetao).then((sucesso) => {
        meusQuizzes.push(sucesso.data.id);
        const stringDeArray = JSON.stringify(meusQuizzes);
        localStorage.setItem("id", stringDeArray);
    });
}
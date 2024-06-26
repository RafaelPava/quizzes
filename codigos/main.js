let meusQuizzes = [];
const ids = localStorage.getItem("id");
if(ids !== null){
    meusQuizzes = JSON.parse(ids);
    console.log(meusQuizzes)
    console.log(typeof(meusQuizzes[0]))
    console.log(typeof(toString(meusQuizzes[0])))
}
obterQuizzes();
obterMeusQuizzes();

function obterQuizzes(){
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes').then((quizes) => {
        const quiz = document.querySelector('.pagina__quizes-outros');
        quiz.innerHTML = '';
        const meusQuizes = document.querySelector('.pagina__meus-quizes');
        meusQuizes.innerHTML = '';
        meusQuizes.innerHTML = `<div class="pagina__meus-quizes__cabecalho">
                <h2>Seus Quizzes</h2>
                <a href="tela3.html"><button class="botao-adicionar-quiz"><img src="./imgs/group-22.png"></button></a>
            </div>`
        for(let i=0;i<quizes.data.length;i++){
            let auxiliar = 0;
            for(let j=0;j<meusQuizzes.length;j++){
                if(quizes.data[i].id === meusQuizzes[j]){
                    meusQuizes.innerHTML += `<a class="quizes-existentes" href="tela2.html/${quizes.data[i].id}"><img class="quizes__imgs" src="${quizes.data[i].image}">${quizes.data[i].title}</a>`
                    auxiliar = 1;
                }
            }
            if(auxiliar === 0){
                quiz.innerHTML += `<a class="quizes-existentes" href="tela2.html/${quizes.data[i].id}"><img class="quizes__imgs" src="${quizes.data[i].image}">${quizes.data[i].title}</a>`
            }else{
                continue
            }
        }
        document.querySelector('.pagina__meus-quizes__sem-quiz').classList.add('escondido')
    })
}
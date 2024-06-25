obterQuizzes();

function obterQuizzes(){
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes').then((quizes) => {
        const quiz = document.querySelector('.pagina__quizes-outros');
        quiz.innerHTML = '';
        console.log(quizes.data)
        for(let i=0;i<quizes.data.length;i++){
            quiz.innerHTML += `<a class="quizes-existentes" href="tela2.html"><img class="quizes__imgs" src="${quizes.data[i].image}">${quizes.data[i].title}</a>`
        }
    })
}
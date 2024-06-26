const after_click_class = '.after_click'
const wrong_answer_class = '.wrong' 
const right_answer_class = '.right'

const allResults = []


let numberQuestions = 0
let numberCorrectAnswer = 0
let numberAnswers = 0

function start(){
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/40").then((answer) => {
        console.log(answer.data)
        createHTML(answer.data)
    }).catch((err) => {
        console.log(err)
    })
}
start()
setTimeout(addChoiceClickEvents, 1000)

function createHTML(quizzObject){

    makeBanner(quizzObject)
    quizzObject.questions.forEach((infoQuestion) => {
        const randomAnswers = infoQuestion.answers.sort(comparador)
        const htmlAnswers = randomAnswers.map((answer) => {
            const choice_html = `
                    <div class="choice-question" data-correct="${answer.isCorrectAnswer}">
                    <img src="${answer.image}" alt="Imagem">
                    <p>${answer.text}</p>
                </div>
`
            return choice_html
        }).join('')
        const question_box_html = `
                <div class="question-box">
                    <div class="header-question">
                        <p>${infoQuestion.title}</p>
                    </div>
                    <div class="content-question">
                    ${htmlAnswers}
                    </div>  
                </div>
    `
        document.querySelector('body').innerHTML+=question_box_html
        numberQuestions++
    })

    quizzObject.levels.forEach((level) => {
        const result_html = `
    <div class="card-result">
        <div class="header-result"><p>88% de acerto: ${level.title}</p></div>
        <div class="image-result">
            <img src="${level.image}" alt="">
        </div>
        <div class="text-result">
            <p>${level.text}</p>
        </div>
    </div>`

    allResults.push({result_html : result_html, minValue : level.minValue  })
    })

    console.log(allResults)
    
}




function makeBanner(quizzObject){
    const banner_content_html = `<img src="${quizzObject.image}">
                <div class="overlay"></div>
                <div class="text">
                    <p>${quizzObject.title}</p>
                </div>`
    const banner_html = document.querySelector('.banner')
    banner_html.innerHTML = banner_content_html
}



function comparador() { 
	return Math.random() - 0.5; 
}


function addChoiceClickEvents() {
    const questionBoxes = document.querySelectorAll('.question-box');

    questionBoxes.forEach((box, index) => {
        const choices = box.querySelectorAll('.choice-question');

        const handleChoiceClick = (event) => {
            const clickedChoice = event.currentTarget;

            choices.forEach(c => {
                c.classList.add('after_click');
                c.classList.remove('right', 'wrong');
                c.removeEventListener('click', handleChoiceClick);
            });

            if (clickedChoice.getAttribute('data-correct') === 'true') {
                numberCorrectAnswer++;
                numberAnswers++;
                clickedChoice.classList.add('right');
            } else {
                numberAnswers++
                clickedChoice.classList.add('wrong');
            }

           
            setTimeout(() => {
                if (index < questionBoxes.length - 1) {
                    questionBoxes[index + 1].scrollIntoView({ behavior: 'smooth' });
                }
                if(numberAnswers === numberQuestions){
                    levelSelection(numberCorrectAnswer, numberQuestions)
                }
            }, 2000); 
        };

        choices.forEach(choice => {
            choice.addEventListener('click', handleChoiceClick);
        });
    });
}


function levelSelection(numberCorrectAnswers, numberQuestions){
    const rate = Math.floor((numberCorrectAnswers/numberQuestions)*100)  
    for(let i=allResults.length-1; i>=0;i--){
        if(allResults[i].minValue <= rate){
            document.querySelector('body').innerHTML+=allResults[i].result_html
            break
        }
    }
}

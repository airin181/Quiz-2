const results = [{
        question: '¿Cuál es la capital de Venezuela?',
        incorrect_answer: ['Valencia', 'Maracaibo', 'Miranda'],
        correct_answer: 'Caracas'
    },
    {
        question: '¿Cuál es la capital de España?',
        incorrect_answer: ['Valencia', 'Barcelona', 'Bilbao'],
        correct_answer: 'Madrid'
    },
    {
        question: '¿Cuál es la capital de Francia?',
        incorrect_answer: ['Lyon', 'Marsella', 'Lila'],
        correct_answer: 'Paris'
    },
    {
        question: '¿Cuál es la capital de Estados Unidos?',
        incorrect_answer: ['New York', 'Texas', 'California'],
        correct_answer: 'Washington DC'
    }
]


//RANDOM QUESTIONS
results.sort(random)

function random(a, b) {
    return 0.5 - Math.random()
}
console.log(results);



//localizo boton NEXT
const next = document.getElementById("next");
next.disabled = true;




//localizamos el id de las 4 respuestas
const op0 = document.getElementById("op0"); //resp 1
const op1 = document.getElementById("op1"); //resp 2
const op2 = document.getElementById("op2"); //resp 3
const op3 = document.getElementById("op3"); //resp 4

//localizamos el id de la pregunta
const h3 = document.createElement("h3");
const questionContainer = document.getElementById("question-container");
questionContainer.appendChild(h3);



//pintar pregunta ACTUAL 
// _____PREGUNTA
function currentQuestion() {
    for (let i = 0; i < results.length; i++) {

        if (i == 0) {
            let question1 = document.createTextNode(`${results[i].question}`)
            h3.appendChild(question1);

            let answer0 = document.createTextNode(`${results[i].incorrect_answer[0]}`)
            op0.appendChild(answer0);

            let answer1 = document.createTextNode(`${results[i].incorrect_answer[1]}`)
            op1.appendChild(answer1);

            let answer2 = document.createTextNode(`${results[i].incorrect_answer[2]}`)
            op2.appendChild(answer2);

            let answer3 = document.createTextNode(`${results[i].correct_answer}`)
            op3.appendChild(answer3);
        }
    }
}
currentQuestion();

//VALIDACION preg incorrectas
let counter = 0;


function validation(clicked_id) {

        
            clicked_id.classList.remove("option");
            clicked_id.classList.add("option-incorrect")
            counter += 0;
       
        }

        clicked_id.classList.remove("option");
        clicked_id.classList.add("option-correct");
        counter += 1;
        next.disabled = false;
    }

//cómo decirle que me borre la clase del botón donde ha hecho click







//AHOOOOOOORAAAAA HAY QUE: DECIR QUÉ HACER CUANDO SE LE DE AL NEXT
/* button.classList.add("hide")*/








//funcion solo para fetch como return array pregutnas. Luego invocar funcion. en el then arrancar partida. invocar la funcion en el THEN ? 
const finalScore = document.getElementById("results")
finalScore.style.display = "none"


//QUESTION PAGE
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





//localizo boton NEXT
const next = document.getElementById("next");
if (next != null) {
    next.disabled = true;
}




//localizamos el id de las 4 respuestas
const op0 = document.getElementById("op0"); //resp 1
const op1 = document.getElementById("op1"); //resp 2
const op2 = document.getElementById("op2"); //resp 3
const op3 = document.getElementById("op3"); //resp 4

//localizamos el id de la pregunta
const h3 = document.createElement("h3");
const questionContainer = document.getElementById("question-container");
const mainContainer = document.querySelector(".container");

//CONTADOR PREGUNTAS
let actual = 0;





//pintar pregunta ACTUAL 
// _____PREGUNTA
function currentQuestion() {

    /* //para que no de error en INDEX hay que hacer este IF
    if (questionContainer != null && op0 != null && op1 != null && op2 != null && op3 != null) { */

        questionContainer.innerHTML = `<h3>${results[actual].question}</h3>`
        op0.innerHTML = `<p>${results[actual].incorrect_answer[0]}</p>`
        op1.innerHTML = `<p>${results[actual].incorrect_answer[1]}</p>`
        op2.innerHTML = `<p>${results[actual].incorrect_answer[2]}</p>`
        op3.innerHTML = `<p>${results[actual].correct_answer}</p>`
    /* } */
    

}
currentQuestion();

// CONTADOR PUNTOS
let score = 0;





//VALIDACION preg incorrectas

function validationInc(value) {
    //reemplaza estilo color blanco y le pone fondo rojo
    value.classList.replace("option", "option-incorrect")

    score += 0;

    //desactiva los botones una vez hecho el click
    op0.style.pointerEvents = "none"
    op1.style.pointerEvents = "none";
    op2.style.pointerEvents = "none";
    op3.style.pointerEvents = "none";

    //activa boton next (si existe)
    if (next != null) {
        next.disabled = false;
    }
}

function validationCorr(value) {
    //reemplaza estilo color blanco y le pone fondo verde
    value.classList.replace("option", "option-correct");

    score += 1;

    //desactiva los botones una vez hecho el click
    op0.style.pointerEvents = "none"
    op1.style.pointerEvents = "none";
    op2.style.pointerEvents = "none";
    op3.style.pointerEvents = "none";
    //activa boton next (si existe)
    if (next != null) {
        next.disabled = false;
    }

}

//array de los botones de las 4 respuestas
const findBtn = document.getElementsByTagName("button");

function nextFunction() {

    //borrar lo anterior
    //escribir la siguiente

    //con esto se pasa a la siguiente pregunta añadiendole 1 a la variable declarada arriba actual.
    actual += 1;
    //llamamos de nuevo a la funcion para que salga otra pregunta
    currentQuestion();

    //si alguno de esos botones tiene esta clase, me cambias la clase --> INCORRECTAS
    for (let i = 0; i < findBtn.length; i++) {

        if (findBtn[i].className == "option-incorrect") {
            findBtn[i].classList.replace("option-incorrect", "option");
        }
    }


    //si alguno de esos botones tiene esta clase, me cambias la clase --> CORRECTAS
    for (let i = 0; i < findBtn.length; i++) {

        if (findBtn[i].className == "option-correct") {
            findBtn[i].classList.replace("option-correct", "option");
        }
    }
    //vuelve a activar los botones para la siguiente pregunta
    op0.style.pointerEvents = "auto"
    op1.style.pointerEvents = "auto";
    op2.style.pointerEvents = "auto";
    op3.style.pointerEvents = "auto";
    //vuelve a activar botón next
    if (next != null) {
        next.disabled = false;
    }

    //MOSTRARÁ PANTALLA CON RESULTADOS Y OCULTARÁ EL CONTAINER CON LAS PREGUNTAS
    function quizResults() {
        if (actual == 3) { // ------->>>>>CAMBIAR CUANDO SEAN 10!!!! 
            
            finalScore.style.display = "flex";
            mainContainer.style.display = "none"
            document.getElementById("score").innerHTML = `You got ${score} points!`
        }
    }
    quizResults();
    console.log(actual)
}

document.getElementById("reset").addEventListener("click", (evento) => {

    window.location.href="/pages/question.html"
    
/*     mainContainer.style.display = "flex";
    finalScore.style.display = "none"; */
    
});
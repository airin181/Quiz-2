// AUTH
//INICIALIZAMOS FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyAHux0KxiIDribUeMa470F86W5P5uTKB4g",
    authDomain: "pruebaweb-cf4a9.firebaseapp.com",
    projectId: "pruebaweb-cf4a9",
    storageBucket: "pruebaweb-cf4a9.appspot.com",
    messagingSenderId: "95460811666",
    appId: "1:95460811666:web:43984ec1ba84414412174b"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//// AUTENTICACIÓN con GOOGLE //////// ************************
const provider = new firebase.auth.GoogleAuthProvider();

//boton login
const googleBtn = document.querySelector("#google-login") //button
const googleBtnDiv = document.querySelector("#google-btn-div-login") //div

//texto "you have logged in"

const accountInfo = document.querySelector("#account-info")
if (accountInfo != null) {
    accountInfo.style.display = "none"; //para que empiece oculto

}


//localizamos boton start index. lo desactivamos hasta que inicien sesion
const startbtn = document.querySelector(".start-div")
if (startbtn != null) {
    startbtn.style.display = "none"; //para que empiece oculto
}

//localizo texto "you need to be logged in to play"
const infoBtm = document.getElementById("account-info-btm")

//localizo boton logout
const logOutDiv = document.getElementById("google-btn-div-logout")
const logOut = document.getElementById("google-logout-btn");
if (logOutDiv != null) {
    logOutDiv.style.display = "none"; //para que empiece oculto
}

let username = "";


//INICIAR SESION - REGISTRARSE
if (googleBtn != null) {
    googleBtn.addEventListener("click", () => {
        // login pop-up 

        firebase.auth().signInWithPopup(provider).then((result) => {
            //registro
            const token = result.credential.accessToken;
            const user = result.user;
            username = user.displayName;
            console.log(user)
            localStorage.setItem("user", username);
            console.log("has iniciado sesion", username)

            //botones
            startbtn.style.display = "flex"; // aparece boton start
            logOutDiv.style.display = "flex"; // aparece el botón de log out
             //se activa el texto de que se ha iniciado sesión
            accountInfo.style.display = "none"; // se oculta mensaje de que se ha hecho logout 
            /*   accountInfo.innerHTML = "You have logged in"; //texto */
            infoBtm.style.display = "none" //desaparece texto informativo de que hay que iniciar sesion
            googleBtnDiv.style.display = "none"; // desaparece botón de iniciar sesión
            document.getElementById("navbar").style.display = "flex"


        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            //const credential = error.credential;
        })
    })
}
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {}
});
let auth = firebase.auth();








//LOG OUT GOOGLE
if (logOut != null) {
    logOut.addEventListener("click", () => {
        firebase.auth().signOut().then(() => {
            //una vez pulsado cerrar sesión se activa el btn login y se desactiva log out y start

            googleBtnDiv.style.display = "flex";
            startbtn.style.display = "none"
            logOutDiv.style.display = "none";
            document.getElementById("navbar").style.display = "none"
            accountInfo.style.display = "block";
            


            if (accountInfo != null) {
                accountInfo.innerHTML = "You have logged out";
            }



            console.log("has cerrado sesion")

        }).catch((error) => {
            console.log("NO SE HA CERRADO SESIÓN");
        });
    })
};




//________________________________________________________________

const finalScore = document.getElementById("results")

if (finalScore != null) {
    finalScore.style.display = "none" // pantalla con resultados desactivada hasta pregunta 10
}
const validateBtn = document.getElementById("validate-btn")
if (validateBtn != null) {
    validateBtn.style.display = "none" // boton validar desactivado hasta la pregunta 10
}


//QUESTION PAGE
const results = [{
        question: 'What term is best associated with Sigmund Freud?',
        incorrect_answers: ['Cognitive-Behavioral Therapy', 'Theory of Gravity', 'Dialectical Behavior Therapy'],
        correct_answer: 'Psychoanalysis'
    },
    {
        question: 'What was another suggested name for, the 1985 film, Back to the Future?',
        incorrect_answers: ['Hill Valley Time Travelers', 'The Time Travelers', 'The Lucky Man'],
        correct_answer: 'Spaceman From Pluto'
    },
    {
        question: 'In Call Of Duty: Black Ops II, who is the main antagonist?',
        incorrect_answers: ['Vladimir Makarov', 'Frank Woods', 'DeFalco'],
        correct_answer: 'Raul Menéndez'
    },
    {
        question: 'What fast food chain has the most locations globally?',
        incorrect_answers: ['Starbucks', 'McDonalds', 'KFC'],
        correct_answer: 'Subway'
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

    //para que no de error en INDEX hay que hacer este IF
    if (questionContainer != null && op0 != null && op1 != null && op2 != null && op3 != null) {

        questionContainer.innerHTML = `<h3>${results[actual].question}</h3>`

        op0.innerHTML = `<p>${results[actual].incorrect_answers[0]}</p>`
        op1.innerHTML = `<p>${results[actual].incorrect_answers[1]}</p>`
        op2.innerHTML = `<p>${results[actual].incorrect_answers[2]}</p>`
        op3.innerHTML = `<p>${results[actual].correct_answer}</p>`
    }


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

    next.disabled = false;
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


    next.disabled = false; //activa boton next


}

//array de los botones de las 4 respuestas
const findBtn = document.getElementsByTagName("button");
if (next != null) {

    next.addEventListener("click", nextFunction)
}

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


    quizResults();
    next.disabled = true;
    console.log(actual)
}


// muestra botón validar y desactiva NEXT
function quizResults() {
    if (actual == 9) { // ------->>>>>CAMBIAR CUANDO SEAN 10!!!! 
        validateBtn.style.display = "block";
        next.style.display = "none"
    }
}




//_______BOTON VALIDATE: Muestra pantalla con score y oculta container con preguntas
if (validateBtn != null) {

    validateBtn.addEventListener("click", (event) => {
        //mostrar ocultar
        finalScore.style.display = "flex";
        mainContainer.style.display = "none";

        //SCORE
        console.log("Esto es el score:", score)
        document.getElementById("score").innerHTML = `You got ${score} points!`;
        document.getElementById("seeResults").innerHTML = `You can see your scores <a href="/pages/results.html">here</a>!`;
        console.log("Sí se consologuea", username)

        //guardar fecha y hora jugada
        let date = new Date();
        let save = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " a las " + date.getHours() + ":" + date.getMinutes();
        console.log(date);

//local storage. SET ITEM GET ITEM.
        let userQuiz = localStorage.getItem("user"); // aquí cogemos el dato de local storage para poder meterlo en el documento

        
        localStorage.setItem("date", dateQuiz);
        //localStorage.setItem("user", username);
        

        db.collection("usuarios_quiz").add({

                name: userQuiz,
                score: score,
                game: date
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    })
};

let dateQuiz = []; //declaramos vacía para sacar el dato de la fecha del local storage 
//>>>>>> let dateQuiz = localStorage.getItem("date");

// ________BOTON RESET-TRY AGAIN. REFRESCA LA PÁGINA QUESTION
if (document.getElementById("reset") != null) {
    document.getElementById("reset").addEventListener("click", (evento) => {
        window.location.href = "/pages/question.html"
    })
};

//_________PREGUNTAS DE LA API
async function getQuestionApi() {
    try {
        let response = await fetch(`https://opentdb.com/api.php?amount=6&category=9&difficulty=easy&type=multiple`);
        let data = await response.json()

        let questionsApi = data.results;

        questionsApi.map(item => {
            results.push(item)
        })
        console.log(results)
        // YA ESTÁN AÑADIDAS AL OBJETO

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
getQuestionApi()



/*     .then(() => {

        const data = {
            labels: date, // x
            series: score, // y
        }
        const options = {
            seriesBarDistance: 15,
        }
        const responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {

                seriesBarDistance: 10,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                },
            }],
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        new Chartist.Line('.ct-chart', data, options, responsiveOptions);
    }) */

 /*    .catch(error => console.log("hubo un error" + error)); */


 


// 1. GUARDAR EN LOCAL STORAGE LOS DATOS DE LA FECHA Y HORA - dentro de la función (set item)
 // 2. DECLARAR VARIABLE VACIA DE LA FECHA FUERA PARA SACARLOS
 // 3. Con get item guardarlos en la variable vacia
 // 4. Usar esa variable dentro de la función de la gráfica 

 // GRÁFICA: Lables: array a secas (fechas) ----- Series (eje Y): array de array (puntuaciones)
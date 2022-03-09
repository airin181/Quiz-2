            // ___________________________

            //        AUTH - Firebase 
            //            INDEX 

            // ___________________________



//Inizializamos Firebase
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

//auth con google
const provider = new firebase.auth.GoogleAuthProvider();



            //********       DISPLAY    **********/



//boton login
const googleBtn = document.querySelector("#google-login") //button
const googleBtnDiv = document.querySelector("#google-btn-div-login") //div



//texto "you have logged in"
const accountInfo = document.querySelector("#account-info")
if (accountInfo != null) {
    accountInfo.style.display = "none"; 
}


//boton start index. lo desactivamos hasta que inicien sesion
const startbtn = document.querySelector(".start-div")
if (startbtn != null) {
    startbtn.style.display = "none"; //para que empiece oculto
}


//texto "you need to be logged in to play"
const infoBtm = document.getElementById("account-info-btm")



//boton logout
const logOutDiv = document.getElementById("google-btn-div-logout")
const logOut = document.getElementById("google-logout-btn");
if (logOutDiv != null) {
    logOutDiv.style.display = "none"; //para que empiece oculto
}




//   INICIAR SESION - REGISTRARSE   //


let username = "";

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


            //-----> mostrar-ocultar botones

            startbtn.style.display = "flex"; // boton start
            logOutDiv.style.display = "flex"; // botón logout
            
            accountInfo.style.display = "none"; // texto "has hecho logout"
            infoBtm.style.display = "none" //texto hay que iniciar sesion
            googleBtnDiv.style.display = "none"; // botón login
            document.getElementById("navbar").style.display = "flex" //navbar


        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
        })
    })
}
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {}
});
let auth = firebase.auth();






//  LOG OUT   //


if (logOut != null) {
    logOut.addEventListener("click", () => {
        firebase.auth().signOut().then(() => {

            //mostrar-ocultar
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






            // ___________________________

            //        QUESTION PAGE

            // ___________________________



//  Pantalla final con la puntuación - oculta   //

const finalScore = document.getElementById("results")

if (finalScore != null) {
    finalScore.style.display = "none" // pantalla con resultados desactivada hasta pregunta 10
}
const validateBtn = document.getElementById("validate-btn")
if (validateBtn != null) {
    validateBtn.style.display = "none" // boton validar desactivado hasta la pregunta 10
}


// PREGUNTAS

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
getQuestionApi();



//RANDOM QUESTIONS
results.sort(random)

function random(a, b) {
    return 0.5 - Math.random()
}


//boton NEXT
const next = document.getElementById("next");
if (next != null) {
    next.disabled = true;
}

//id de las 4 respuestas
const op0 = document.getElementById("op0"); //resp 1
const op1 = document.getElementById("op1"); //resp 2
const op2 = document.getElementById("op2"); //resp 3
const op3 = document.getElementById("op3"); //resp 4

//id de la pregunta
const h3 = document.createElement("h3");
const questionContainer = document.getElementById("question-container");
const mainContainer = document.querySelector(".container");

//CONTADOR PREGUNTAS
let actual = 0;
// CONTADOR PUNTOS
let score = 0;



//  pintar pregunta ACTUAL   //

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



// ______   VALIDACION  ________  //

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

    op0.style.pointerEvents = "none"
    op1.style.pointerEvents = "none";
    op2.style.pointerEvents = "none";
    op3.style.pointerEvents = "none";

    next.disabled = false; //activa boton next
}



//botones de las 4 respuestas
const findBtn = document.getElementsByTagName("button");
if (next != null) {
    next.addEventListener("click", nextFunction)
}


// ______NEXT_______//

function nextFunction() {

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
    if (actual == 9) {  
        validateBtn.style.display = "block";
        next.style.display = "none"
    }
}




//_______VALIDATE btn________//

// Muestra pantalla con score y oculta container con preguntas


if (validateBtn != null) {

    validateBtn.addEventListener("click", (event) => {

        //mostrar-ocultar botones
        finalScore.style.display = "flex";
        mainContainer.style.display = "none";


        //SHOW SCORE -> innerhtml
        console.log("Esto es el score:", score)
        document.getElementById("score").innerHTML = `You got ${score} points!`;
        document.getElementById("seeResults").innerHTML = `You can see your scores <a href="./results.html">here</a>!`;


        //guardar fecha y hora jugada
        let date = new Date();
        let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        console.log(formattedDate);


        //username desde localstorage
        let userQuiz = localStorage.getItem("user"); // aquí cogemos el dato de local storage para poder meterlo en el documento

        //creamos user
        db.collection("usuarios_quiz").add({

                name: userQuiz,
                score: score,
                game: formattedDate
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    })
};

// ________ TRY AGAIN_______//
if (document.getElementById("reset") != null) {
    document.getElementById("reset").addEventListener("click", (evento) => {
        window.location.href = "/pages/question.html"
    })
};






// ___________________________

//           GRÁFICAS  

// ___________________________


let arrayOfScores = [];
let arrayOfDates = [];


function getDataChart() {
    return new Promise((resolve,reject) => {

    db.collection("usuarios_quiz")
    .where("name", "==", localStorage.getItem("user"))
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            arrayOfScores.push(doc.data().score);
            arrayOfDates.push(doc.data().game)

            resolve()
        
            });
        });
    }
)}
getDataChart()
.then(() => {

        const data = {
            labels: [arrayOfDates], // ARRAY DE FECHAS - EJE x
            series: [arrayOfScores], // ARRAY DE ARRAY con PUNTUACIÓN - EJE y
        }
        const options = {
            seriesBarDistance: 15,
        }
       
        new Chartist.Line('.ct-chart', data, options);
    })

    .catch (error => console.log("hubo un error" + error));
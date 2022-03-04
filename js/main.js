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


let actual = 0;

//pintar pregunta ACTUAL 
// _____PREGUNTA
function currentQuestion() {
    /*     for (actual; actual < results.length; actual++) {
     */ //para que no de error en INDEX hay que hacer este IF
    if (questionContainer != null && op0 != null && op1 != null && op2 != null && op3 != null) {

        questionContainer.innerHTML = `<h3>${results[actual].question}</h3>`
        op0.innerHTML = `<p>${results[actual].incorrect_answer[0]}</p>`
        op1.innerHTML = `<p>${results[actual].incorrect_answer[1]}</p>`
        op2.innerHTML = `<p>${results[actual].incorrect_answer[2]}</p>`
        op3.innerHTML = `<p>${results[actual].correct_answer}</p>`

    }

}
currentQuestion();

//VALIDACION preg incorrectas
let counter = 0;


function validationInc(value) {
    //reemplaza estilo colo blanco y le pone fondo rojo
    value.classList.replace("option", "option-incorrect")

    counter += 0;

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

    counter += 1;

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

}












//INDEX:

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
accountInfo.style.display = "none"; //para que empiece oculto

//localizamos boton start index. lo desactivamos hasta que inicien sesion
const startbtn = document.querySelector(".start-div")
startbtn.style.display = "none"; //para que empiece oculto

//localizo texto "you need to be logged in to play"
const infoBtm = document.getElementById("account-info-btm")

//localizo boton log out
const logOutDiv = document.getElementById("google-btn-div-logout")
const logOut = document.getElementById("google-logout-btn");
logOutDiv.style.display = "none";


//INICIAR SESION - REGISTRARSE
if (googleBtn != null) {
    googleBtn.addEventListener("click", () => {
        // login pop-up 

        firebase.auth().signInWithPopup(provider).then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;
            console.log("has iniciado sesion")


            startbtn.style.display = "flex"; // aparece boton start
            logOutDiv.style.display = "flex"; // aparece el botón de log out
            accountInfo.style.display = "block"; //se activa el texto de que se ha iniciado sesión
            accountInfo.innerHTML = "You have logged in";
            infoBtm.style.display = "none"//desaparece texto informativo
            googleBtnDiv.style.display = "none";

            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            //const credential = error.credential;
        })

        
    })
};

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {}
});
let auth = firebase.auth();

//VER QUIEN ESTÁ LOGEADO EN ESE MOMENTO
/* 
const user = firebase.auth().currentUser;

if (user) {
    xxxxx
} else {
  
} */

//LOG OUT GOOGLE

if (logOut != null) {
    logOut.addEventListener("click", () => {
firebase.auth().signOut().then(() => {
    //una vez pulsado cerrar sesión se activa el btn login y se desactiva log out y start
    
    googleBtnDiv.style.display = "block";
    accountInfo.innerHTML = "You have logged out";

    console.log("has cerrado sesion")
  }).catch((error) => {
    // An error happened.
  });
})};



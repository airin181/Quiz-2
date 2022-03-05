
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
if(accountInfo != null){
    accountInfo.style.display = "none"; //para que empiece oculto
    }

//localizamos boton start index. lo desactivamos hasta que inicien sesion
const startbtn = document.querySelector(".start-div")
if(startbtn != null){
    startbtn.style.display = "none"; //para que empiece oculto
    }

//localizo texto "you need to be logged in to play"
const infoBtm = document.getElementById("account-info-btm")

//localizo boton log out
const logOutDiv = document.getElementById("google-btn-div-logout")
const logOut = document.getElementById("google-logout-btn");
if(logOutDiv != null){
    logOutDiv.style.display = "none"; //para que empiece oculto
    }



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
          /*   accountInfo.innerHTML = "You have logged in"; //texto */
            infoBtm.style.display = "none"//desaparece texto informativo de que hay que iniciar sesion
            googleBtnDiv.style.display = "none"; // desaparece botón de iniciar sesión

            
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


// PARA VER DATOS DE USUARIO
const user = firebase.auth().currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getIdToken() instead.
  const uid = user.uid;
}





//LOG OUT GOOGLE

if (logOut != null) {
    logOut.addEventListener("click", () => {
firebase.auth().signOut().then(() => {
    //una vez pulsado cerrar sesión se activa el btn login y se desactiva log out y start
    
    googleBtnDiv.style.display = "block";
    if(accountInfo != null){
    accountInfo.innerHTML = "You have logged out";
    }

    console.log("has cerrado sesion")
  }).catch((error) => {
    // An error happened.
  });
})};
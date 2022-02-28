let formulario = document.getElementById('formulario');

const preguntas = [
    {
        pregunta : '¿Cuál es la capital de Venezuela?',
        respuestas : ['Caracas', 'Valencia', 'Maracaibo', 'Miranda'],
        correcta : 'Caracas'
    },
    {
        pregunta : '¿Cuál es la capital de España?',
        respuestas : ['Valencia', 'Barcelona', 'Madrid', 'Bilbao'],
        correcta : 'Madrid'
    },
    {
        pregunta : '¿Cuál es la capital de Francia?',
        respuestas : ['Lyon', 'Paris', 'Marsella', 'Lila'],
        correcta : 'Paris'
    },
    {
        pregunta : '¿Cuál es la capital de Estados Unidos?',
        respuestas : ['Washington', 'New York', 'Texas', 'California'],
        correcta : 'Washington'
    }
]

for(let i=0; i<preguntas.length;i++){
    let fieldset = document.createElement('FIELDSET');
    fieldset.innerHTML = `<h3>${preguntas[i].pregunta}</h3>
                        <div><label>${preguntas[i].respuestas[0]}</label>
                        <input type="radio" value=${preguntas[i].respuestas[0]} name="pregunta${i}">
                        </div>
                        <div><label>${preguntas[i].respuestas[1]}</label>
                        <input type="radio" value=${preguntas[i].respuestas[1]} name="pregunta${i}">
                        </div>
                        <div><label>${preguntas[i].respuestas[2]}</label>
                        <input type="radio" value=${preguntas[i].respuestas[2]} name="pregunta${i}">
                        </div>
                        <div><label>${preguntas[i].respuestas[3]}</label>
                        <input type="radio" value=${preguntas[i].respuestas[3]} name="pregunta${i}">
                        </div>`
                        console.log(i)
    formulario.appendChild(fieldset)
}

//printQuestions: coleccion de preguntas questions. Devuelve el html con las pregs
//printQuestion: recibe 1 pregunta y devuelve el html de esa preg
//questions: colección con todas las preg

/* function printQuestion = () => {

    const question = {
        name: `pregunta${i}`,
        label: '¿Cual es el nombre mas comun del mundo?',
        answers: [
          {label: 'Un bardo', value: 'bardo'},
          {label: 'Un mercader', value: 'mercader'},
          {label: 'Un mago', value: 'mago'},
          {label: 'Un marinero', value: 'marinero'},
        ]
      }

} */
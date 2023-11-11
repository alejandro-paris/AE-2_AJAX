

//Preparamos el formulario para cuando tenga botón de enviar
//form.onsubmit = validarInputs;

/*-- Todas las referencias al DOM que utilizamos --*/
const form = document.getElementById("form_pedido"),
    form_personalizacion = document.getElementById("form_personalizacion");
pequena = document.getElementById("pequeña"),
    mediana = document.getElementById("mediana"),
    grande = document.getElementById("grande"),
    p_tamano = document.getElementById("p_tamano"),
    p_anotacion = document.getElementById("p_anotacion"),
    p_ingredientes = document.getElementById("p_ingredientes"),
    div_tamano = document.getElementById("contenedor-tamanos"),
    div_ingr = document.getElementById("contenedor-ingr"),
    btn_enviar = document.querySelector("#btn-enviar"),
    btn_procesar = document.querySelector("#btn-procesar"),
    btn_actualizar = document.querySelector("#btn-actualizar")

/*---*/

const URL = "http://localhost:5500/";
const RECURSO = "assets/inventario.json";

let inventario = null;
let precioTotal = 0;

/*--------------------*/
/*--- Declaración de funciones ---*/
/*--------------------*/

/**
 * Esta función genera dinámica los inputs del tamaño de las pizzas
 * y sus ingredientes. 
 * Siempre se ejecutará dentro de la función de Callback que solicita
 * los datos al servidor, ya que de lo contrario el inventario
 * estará null. 
 */
function generarInputs() {

    //Generamos los inputs para el tamaño de las pizzas
    for (ele of inventario.tamanos) {
        let input = document.createElement("input")
        input.type = "radio";
        input.name = "tamano";
        input.id = ele.nombre.toLowerCase();

        let label = document.createElement("label");
        let textLabel = document.createTextNode(ele.nombre)
        label.htmlFor = input.id;

        label.appendChild(textLabel);
        div_tamano.appendChild(input);
        div_tamano.appendChild(label);

    }
    //Generamos los checkboxes de los ingredientes
    for (ele of inventario.ingredientes) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "ingredientes";
        checkbox.value = ele.nombre;
        checkbox.id = ele.nombre;

        let label = document.createElement("label");
        let textLabel = document.createTextNode(ele.nombre);
        label.htmlFor = checkbox.id;

        let br = document.createElement("br")

        label.appendChild(textLabel);
        div_ingr.appendChild(checkbox);
        div_ingr.appendChild(label);
        div_ingr.appendChild(br);


    }
}

/*--*/

function cargarDatosInput() {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", URL + RECURSO, true);
    xmlHttp.send();

    xmlHttp.onload = function () {
        inventario = JSON.parse(xmlHttp.responseText);
        generarInputs();
    }
    xmlHttp.onerror = function () {
        alert("Error recuperando datos")
    }
}

/**
 * 
 * Calcula cuál es el precio total en función de las opciones que 
 * ha marcado el usuario en el formulario. 
 * 
 * - RESETEAMOS EL PRECIO DE PIZZA A 0 cada vez que se ejecuta. 
 * 
 * Para comprobar el precio de cada elemento accede al JSON INVENTARIO
 * para comprobar cuáles son los precios que le corresponde a cada opción. 
 * 
 * No validamos los datos porque esta función ya se ejecuta después de la 
 * validación de datos. 
 * 
 * La función no deuvelve nada, ya que tenemos definido precioTotal como 
 * una variable global. 
 */
function comprobarPrecio() {

    precioTotal = 0;

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.open("GET", URL + RECURSO, "true")
    xmlHttp.send(null);

    xmlHttp.onload = function () {
        console.log("He pasado por aqu");
        console.log();
        console.log(inputsTamano);
        console.log(ingr);


        for (let i = 0; i < inputsTamano.length; i++) {

            console.log("He pasado por aqu");

            if (inputsTamano[i].checked) {
                precioTotal += inventario.tamanos[i].precio
                break;
            }
        }

        for (let i = 0; i < ingr.length; i++) {
            console.log("He entrado en ingredientes");

            if (ingr[i].checked) {
                precioTotal += inventario.ingredientes[i].precio;
            }
        }
        console.log(precioTotal);
        generarTextoPrecio();


        xmlHttp.onerror = function () {
            alert("Error al recuperar los precios. Vuelve a intentarlo");
        }
    }
}

/**
 * Añade un párrafo al final del formulario indicando cuál es el precio
 * del pedido.
 * 
 * Cada vez que se ejecuta, se sustituye el párrafo anterior por el nuevo
 */
function generarTextoPrecio() {

    //Limpiamos el párrafo donde se encuentra el precio de la pizza
    const precio_pizza = document.querySelector("#precio_pizza")

    if (precio_pizza != null) {
        precio_pizza.parentNode.removeChild(precio_pizza);
    }

    //Generamos el nodo que contiene el precio actual de la pizza y lo insertamos.
    const node_precio = document.createElement("p");
    node_precio.id = "precio_pizza";
    const texto_precio = document.createTextNode(`El precio de tu pedido es ${precioTotal} €`);

    node_precio.appendChild(texto_precio);
    form.appendChild(node_precio);

}

/**
 * Se validan todos los inputs del formulario: 
 * - Type: texto, tel, email: Se comprueba que no están vacíos
 * - Radio: Se comprueba que hay una opción marcada.
 * @returns {boolean} Devuelve false si la validación no se cumple y
 *                    true si lo damos por validado
 */
function validarInputs() {
    ingr = document.querySelectorAll("input[name='ingredientes']"),
        inputs = document.querySelectorAll("input"),
        inputsTamano = document.getElementsByName("tamano");
    //Validamos los inputs de tipo texto email y teléfono
    const tiposInputAValidar = ["text", "email", "tel"];
    for (let inp of inputs) {
        if (tiposInputAValidar.includes(inp.type)) {
            if (inp.value.trim() == "") {
                alert(`ERROR. Todos los campos de texto tienen que estar cumplimentados. Campo pendiente: ${inp.name}`);
                return false;
            }
        }
    }

    //Validamos los inputs radio
    let rad_select = false
    for (let rad of inputsTamano) {
        if (rad.checked) {
            rad_select = true;
            break;
        }
    }
    if (!rad_select) {
        alert("Es necesario seleccionar un tamaño de pizza");
        return false;
    }

    //Validamos los checkboxes
    let ingr_selected = false
    for (let ing of ingr) {
        if (ing.checked) {
            ingr_selected = true;
            break;
        }
    }
    if (!ingr_selected) {
        alert("Es necesario seleccionar 1 ingrediente");
        return false;
    };

    // Si no hemos devuelto false antes. Damos el formulario por validado
    return true;
}

/**
 * Es una función simple que sirve para eliminar todos los nodos que recibe. 
 * * Importante: Es necesario que sea descendente porque de lo contrario no funciona bien
 * @param {Array} listaNodos - Recibimos un array con la lista de nodos a eliminar 
 */
function eliminarNodos(listaNodos) {
    const longitud = listaNodos.length;

    for (let i = longitud - 1; i >= 0; i--) {
        listaNodos[i].parentNode.removeChild(listaNodos[i]);
    }
}

/*----------------------------------------*/
/*---- FIN DECLARACIÓN FUNCIONES ----*/
/*----------------------------------------*/


// Cuando se ejecuta el archivo, lanzamos una primera carga de los inputs
cargarDatosInput();


//Lanzamos la comrpobación al pulsar el botón Procesar
btn_procesar.addEventListener("click", function () {
    if (validarInputs())
        comprobarPrecio();
})

// Volvemos a cargar los inputs tras pulsar el botón de actualizar
btn_actualizar.addEventListener("click", function () {
    const div_tamano = document.getElementById("contenedor-tamanos");
    const div_ingr = document.getElementById("contenedor-ingr");
    eliminarNodos(div_ingr.childNodes);
    eliminarNodos(div_tamano.childNodes);
    cargarDatosInput();
})




//Prearamos el formulario para cuando tenga botón ENVIAR
//form.onsubmit = validarInputs;

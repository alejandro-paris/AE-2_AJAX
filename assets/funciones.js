
//creamos este evento para que la funcion se ejecute una vez el html se haya cargado completamente.
document.addEventListener("DOMContentLoaded", function() {

    var botonProcesarPedido = document.getElementById("procesarPedido");//obtenemos el valor procesar pedido y se le asigna la funcion botonProcesarPedido
    botonProcesarPedido.addEventListener("click", calcularPrecio);///agregamos el boton click y se le pasa la funcion calcularPrecio

    var botonMostrarTamaño = document.getElementById("mostrarTamaño");
    botonMostrarTamaño.addEventListener("click", enviarPeticionAsincronaTamaño);

    var divTamaño = document.getElementById("div_tamaño");

    var botonMostrarIngredientes = document.getElementById("mostrarIngredientes");
    botonMostrarIngredientes.addEventListener("click", enviarPeticionAsincronaIngredientes);

    var divIngredientes = document.getElementById("div_ingredientes");

    
    const URL_DESTINO = "http://localhost:5500/"
    const RECURSO = "/assets/ingredientes.json"

    //funcion para realizar petición de datos de Tamaños al JSON
    function enviarPeticionAsincronaTamaño() {

        let xmlHttp = new XMLHttpRequest()

        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttp.send(null)
        xmlHttp.onload = function(){
            procesarMostrarTamaño(this.responseText)
        }
        xmlHttp.onerror = function(){
            alert("Error al conectar con el servidor")
        }

    }

    //funcion para realizar petición de datos de Ingredientes al JSON
    function enviarPeticionAsincronaIngredientes() {

        let xmlHttp = new XMLHttpRequest()

        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttp.send(null)
        xmlHttp.onload = function(){
            procesarMostrarIngredientes(this.responseText)
        }
        xmlHttp.onerror = function(){
            alert("Error al conectar con el servidor")
        }

    }

    function procesarMostrarTamaño(jsonDoc) {
        //Convertimos un texto a un objeto JSON
        var objetoJson = JSON.parse(jsonDoc)
        console.log(objetoJson)

        var prueba = document.createElement("p");
        var textoprueba= document.createTextNode("Tamaño de la pizza: ");
        prueba.appendChild(textoprueba);
        divTamaño.appendChild(prueba);

        var arrayTamaños = objetoJson.tamaños;// creamos un array para extraer los datos del JSON
        
        //Iteramos el array de tamaños y generamos los botones radio
        for(let pz of arrayTamaños){

            var input = document.createElement("input");
            input.type="radio";
            input.id=pz.nombre.toLowerCase();
            input.name="tamaño";
            input.value= pz.precio;

            var label = document.createElement("label");
            label.for=pz.nombre.toLowerCase();

            var texto= document.createTextNode(pz.nombre+": "+pz.precio+"€");

            var espacio = document.createElement("br");

            label.appendChild(texto);
            divTamaño.appendChild(input);
            divTamaño.appendChild(label);
            divTamaño.appendChild(espacio);

        }
    }

    function procesarMostrarIngredientes(jsonDoc){
        var objetoJson= JSON.parse(jsonDoc)
        console.log(objetoJson)

        var prueba = document.createElement("p");
        var textoprueba= document.createTextNode("Ingredientes");
        prueba.appendChild(textoprueba);
        divIngredientes.appendChild(prueba);

        var arrayIngredientes = objetoJson.ingredientes;//creamos el array para recuperar todos los ingredientes y su valor

        
        //recorremos el array para crear la tabla con los checkbox
        for (let ing of arrayIngredientes){

            var input = document.createElement("input");
            input.type="checkbox";
            input.id= ing.nombre.toLowerCase();
            input.name="ingredientes";
            input.value=ing.precio;

            var label = document.createElement("label");
            label.for= ing.nombre.toLowerCase();

            var texto = document.createTextNode(ing.nombre+": "+ing.precio+"€");

            var espacio = document.createElement("br");

            label.appendChild(texto);
            divIngredientes.appendChild(input);
            divIngredientes.appendChild(label);
            divIngredientes.appendChild(espacio);

        }

    }


    function calcularPrecio() {
       //// Se verifica que los campos nombre,direccion,telefono y email estan  completados, en el caso de que esten vacios salta el error (debe rellenar los campos)
        if (nombre.value.trim() == "" || direccion.value.trim()=="" || telefono.value.trim()=="" || email.value.trim()=="") {
            alert('[ERROR] Debe rellenar todos los campos');
            return false;
        }
    
        var tamaño = document.querySelector('input[name="tamaño"]:checked');//obtenemos el valor de la variable tamaño.
        var ingredientes = document.querySelectorAll('input[name="ingredientes"]:checked'); //obtenemos el valor de los ingredientes seleccionados. 
        var precioTotalElement = document.getElementById("precioTotal");//Obtenemos el elemento precioTotal

    
       //- if--En caso de que se haya seleccionado al menos un tamaño y recorremos los ingrediente para saber si al menos uno ha sido elegido, se le suma el valor de cada ingrediente
       //mas el del temaño y se muestra el precio total en el elemento precioTotal.
       //Si no se ha seleccionado un tamaño o algun ingrediente, sale el alert(Por favor, seleccione al menos un tamaño y un ingrediente.")

        if (tamaño && ingredientes.length > 0) {
            let precio = parseInt(tamaño.value);
            
    
            for (let ingrediente of ingredientes) {
                precio += parseInt(ingrediente.value);
            }

            precioTotalElement.textContent = precio + " €";
        } else {
            precioTotalElement.textContent = "0 €";
            alert("Por favor, seleccione al menos un tamaño y un ingrediente.");
        }
    }
});
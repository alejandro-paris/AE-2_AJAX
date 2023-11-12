

const URL_DESTINO = "http://localhost:5500/Requerimiento1/assets/"
const RECURSO = "pizzas.json"



    function enviarPeticionAyax(){
        let xmlHttp = new XMLHttpRequest()

        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttp.send(null)
        xmlHttp.onload = function(){
            procesarRespuesta(this.responseText)
        }
        xmlHttp.onerror = function(){
            alert("ERROR")
        }
        
    }
    
    // Crear input radio
    function procesarRespuesta(jsonDoc){

        var objetoJson = JSON.parse(jsonDoc)
        var grupo = document.createDocumentFragment();

        objetoJson.tamaños.forEach(function (tamaño, index) {
            var input = document.createElement("input");
            input.type = "radio";
            input.id = index + 1;
            input.name = "tamaño";
            var opcionTamaño = document.createElement("label");
            opcionTamaño.htmlFor = input.id;
            opcionTamaño.appendChild(document.createTextNode(tamaño));
            grupo.appendChild(input);
            grupo.appendChild(opcionTamaño);
        });

        tamañoDiv.appendChild(grupo);

    // Crear checkbox
        var checkboxes = document.createDocumentFragment();

        objetoJson.ingredientes.forEach(function (ingrediente, index) {
            var input = document.createElement("input");
            input.type = "checkbox";
            input.value = objetoJson.ingredientes[index];
            input.id = input.value;
            input.name = "ingrediente";
            var opcionIngrediente = document.createElement("label");
            opcionIngrediente.htmlFor = input.id;
            opcionIngrediente.appendChild(document.createTextNode(ingrediente));
            checkboxes.appendChild(input);
            checkboxes.appendChild(opcionIngrediente);
        });

        ingredientesDiv.appendChild(checkboxes)
        
    }


//creamos este evento para que la funcion se ejecute una vez el html se haya cargado completamente.
document.addEventListener("DOMContentLoaded", function() {
    var botonProcesarPedido = document.getElementById("procesarPedido");//obtenemos el valor procesar pedido y se le asigna la funcion botonProcesarPedido
    botonProcesarPedido.addEventListener("click", calcularPrecio);///agregamos el boton click y se le pasa la funcion calcularPrecio


    function calcularPrecio() {
       //// Se verifica que los campos nombre,direccion,telefono y email estan  completados, en el caso de que esten vacios salta el error (debe rellenar los campos)
        if (nombre.value.trim() == "" || direccion.value.trim()=="" || telefono.value.trim()=="" || email.value.trim()=="") {
            alert('[ERROR] Debe rellenar todos los campos');
             return false;
        }
    
        var tamaño = document.querySelector('input[name="tamaño"]:checked');//obtenemos el valor de la variable tamaño.
        var ingredientes = document.querySelectorAll('input[name="ingrediente"]:checked'); //obtenemos el valor de los ingredientes seleccionados. 
        var precioTotalElement = document.getElementById("precioTotal");//Obtenemos el elemento precioTotal
        var precioIngrediente=0;
    
       //- if--En caso de que se haya seleccionado al menos un tamaño y recorremos los ingrediente para saber si al menos uno ha sido elegido, se le suma el valor de cada ingrediente
       //mas el del temaño y se muestra el precio total en el elemento precioTotal.
       //Si no se ha seleccionado un tamaño o algun ingrediente, sale el alert(Por favor, seleccione al menos un tamaño y un ingrediente.")

    if (tamaño != null && ingredientes.length > 0) {

        if (tamaño.id == 1 ) {
            var precioBase = 5;
        }else if(tamaño.id == 2){
            var precioBase = 10;
        } else if(tamaño.id == 3){
            var precioBase = 15;
        }

        for (i = 0; i < ingredientes.length; i++) {
            precioIngrediente += 1;
        }

        var precioTotal = precioBase + precioIngrediente
        precioTotalElement.textContent = precioTotal + " €";

    }  else {
            precioTotalElement.textContent = "0 €";
            alert("Por favor, seleccione al menos un tamaño y un ingrediente.");
        }

        

        





    }
});
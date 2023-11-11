

const URL_DESTINO = "http://localhost:5500/Requerimiento2/assets/"
const RECURSO = "pizzas.json"



    function enviarPeticionAYAX(){
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
    
    
    function procesarRespuesta(jsonDoc){

        // Almacenamos en la variable objetoJson nuestro documento JSON
        var objetoJson = JSON.parse(jsonDoc)

        // Crear input radio
        var radio = document.createDocumentFragment();
        objetoJson.tamaños.forEach(function (tamaño, index) {
            var input = document.createElement("input");
            input.type = "radio";
            input.id = "opcion" + index;
            input.name = "tamaño";
            input.value = tamaño.precio
            var opcionTamaño = document.createElement("label");
            opcionTamaño.htmlFor = input.id;
            opcionTamaño.appendChild(document.createTextNode(tamaño.nombre));
            console.log(index)
            radio.appendChild(input);
            radio.appendChild(opcionTamaño);
        });

        tamañoDiv.appendChild(radio);

    // Crear checkbox
        var checkboxes = document.createDocumentFragment();

        objetoJson.ingredientes.forEach(function (ingrediente, index) {
            var input = document.createElement("input");
            input.type = "checkbox";
            input.value = ingrediente.precio;
            input.id = index;
            input.name = "ingrediente";
            var opcionIngrediente = document.createElement("label");
            opcionIngrediente.htmlFor = input.id;
            opcionIngrediente.appendChild(document.createTextNode(ingrediente.nombre));
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

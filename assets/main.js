const URL_DESTINO = "http://localhost:5500/";
const RECURSO = "/assets/pizza.json";

//creamos este evento para que la funcion se ejecute una vez el html se haya cargado completamente.

document.addEventListener("DOMContentLoaded", function () {
    var botonProcesarPedido = document.getElementById("procesarPedido");
    botonProcesarPedido.addEventListener("click", calcularPrecio);
    enviarPeticion();
///Enviar peticion al servidor 
    function enviarPeticion() {
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", URL_DESTINO + RECURSO, true);
        xmlHttp.send(null);

        xmlHttp.onload = function () {
         procesarOpciones(this.responseText);
        };

        xmlHttp.onerror = function () {
            alert("Error");
        };
    }
//Funcion para procesar el texto de Json que se recibe desde el servidor 
    function procesarOpciones(jsonDoc) {
        var objetoJson = JSON.parse(jsonDoc);

        var grupoTamaños = document.getElementById("tamaños");
        var grupoIngredientes = document.getElementById("ingredientes");

        // Limpiar contenido previo
        grupoTamaños.innerHTML = "";
        grupoIngredientes.innerHTML = "";

        //crear los radio y pasarle los valores de Json 
        objetoJson.tamaños.forEach(function (tamaño, index) {
            var input = document.createElement("input");
            input.type = "radio";
            input.id = "tamaño" + (index + 1);
            input.name = "tamaño";
            input.dataset.precio = parseFloat(tamaño.precio);

            var label = document.createElement("label");
            label.htmlFor = input.id;
            label.appendChild(document.createTextNode(tamaño.nombre));

            grupoTamaños.appendChild(input);
            grupoTamaños.appendChild(label);
        });
                  

        //crear los checkbox y pasarle los valores de Json 
        objetoJson.ingredientes.forEach(function (ingrediente, index) {
            var input = document.createElement("input");
            input.type = "checkbox";
            input.id = "ingrediente" + (index + 1);
            input.name = "ingredientes";
            input.dataset.precio= parseInt(ingrediente.precio);

            var label = document.createElement("label");
            label.htmlFor = input.id;
            label.appendChild(document.createTextNode(ingrediente.nombre));

            grupoIngredientes.appendChild(input);
            grupoIngredientes.appendChild(label);
        });
    }

        ////
    function calcularPrecio() {
            
         //// Se verifica que los campos nombre,direccion,telefono y email estan  completados, en el caso de que esten vacios salta el error (debe rellenar los campos)
        if (
                nombre.value.trim() == "" ||
                direccion.value.trim() == "" ||
                telefono.value.trim() == "" ||
                email.value.trim() == ""
            ) {
                alert("[ERROR] Debe rellenar todos los campos");
                return false;
            }

            var tamaño = document.querySelector('input[name="tamaño"]:checked');//obtenemos el valor de la variable tamaño.
            var ingredientes = document.querySelectorAll('input[name="ingredientes"]:checked');//obtenemos el valor de los ingredientes seleccionados. 
            var precioTotalElement = document.getElementById("precioTotal");//Obtenemos el elemento precioTotal

              
       //- if--En caso de que se haya seleccionado al menos un tamaño y recorremos los ingrediente para saber si al menos uno ha sido elegido, se le suma el valor de cada ingrediente
       //mas el del temaño y se muestra el precio total en el elemento precioTotal.
       //Si no se ha seleccionado un tamaño o algun ingrediente, sale el alert(Por favor, seleccione al menos un tamaño y un ingrediente.")

            if (tamaño && ingredientes.length > 0) {
                let precio = parseFloat(tamaño.dataset.precio);

                for (let ingrediente of ingredientes) {
                    precio += parseFloat(ingrediente.dataset.precio);
                }

                precioTotalElement.textContent = precio + " €";
            } else {
                precioTotalElement.textContent = "0 €";
                alert("Por favor, seleccione al menos un tamaño y un ingrediente.");
            }
   
    }
//Obtener el id del botton reset pedido y asignarle la funcion resetearPedido al hacer click en el boton.
    var botonResetPedido = document.getElementById("resetPedido");
    botonResetPedido.addEventListener("click", resetearPedido);

    // Función para resetear los tamaños, ingredientes y precio total del formulario
    
    function resetearPedido() {
        
        var radios = document.querySelectorAll('input[name="tamaño"]');
        var checkboxes = document.querySelectorAll('input[name="ingredientes"]');
    
        // Desmarcar todos los radio buttons
        radios.forEach(function (radio) {
            radio.checked = false;
        });
    
        // Desmarcar todos los checkboxes
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    
        // Limpiar el precio total
        var precioTotalElement = document.getElementById("precioTotal");
        precioTotalElement.textContent = "0 €";
    }


    
});
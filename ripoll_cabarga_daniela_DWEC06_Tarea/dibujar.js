// Queremos hacer una aplicación en JavaScript que simule un pequeño tablero de dibujo. Para ello tendrás que dibujar una tablero de 30 celdas x 30 celdas con cada celda de ancho 10 px y alto 10 px. Para realizar el tablero de dibujo tendrás que emplear obligatoriamente los métodos de creación de nodos del DOM. Una vez generado el tablero lo meterás dentro del div con id "zonadibujo". Además tendrás una paleta con 5 colores de dibujo (que ya está creada y se facilita con el código .html)

// Se te facilitará un fichero .html y un fichero .css con los estilos que tendrás que utilizar. La programación de la aplicación JavaScript la tendrás que realizar en un fichero .js adicional.

// Si se modifican los colores programados en los estilos CSS (color1 a color 6) la aplicación tendrá que seguir funcionando correctamente.

// La forma de funcionamiento de la aplicación será la siguiente:

//     Haremos click en alguno de los 5 colores de la paleta y se le asignará la clase "seleccionado".
//     Una vez seleccionado un color de la paleta, haremos un click en una celda (que se pintará del color activo en la paleta) y desde ese momento al mover el ratón por el tablero pintará del color activo todas las celdas por las que vayamos pasando el ratón. En el momento que volvamos a hacer click en otra celda dejará de pintar.
//     Podremos escoger un color diferente y repetir el proceso, incluso sobre celdas que ya han sido pintadas.
//     Para borrar una celda pintaremos con el color blanco de la paleta.
//     Cada vez que el pincel esté activado se mostrará un mensaje debajo de la paleta de colores indicando : PINCEL ACTIVADO o PINCEL DESACTIVADO.
//------------------------------------------------------------------------------------------------------------------------------------------------

//iniciar, tras cargar toda la página, ejecutará la aplicacion, creando la tabla y manejando los eventos del ratón para pintar.
window.onload = function iniciar() {
    crearTabla();
    //slección de todas las celdas de la paleta de colores y del tablero
    //con querySelector() seleccionamos elementos que coincidan con el id indicado, paleta (ya definido en el html/css) y tablero (lo definimos al crear la tabla de celdas) 
    //con querySelectorAll() sobre el elemento seleccionado (paleta y tablero) para obtener un NodeList  de todas las celdas "td" que hay dentro de ese elemento.
    var paleta = document.querySelector("#paleta");
    var paletaColores = paleta.querySelectorAll("td");

    var tablero = document.querySelector("#tablero");
    var tableroCeldas = tablero.querySelectorAll("td");

    //se inicia con el primer color de la paleta activo
    colorActivo = paletaColores[0].classList.item(0);

    //paletaColores y tableroColores son ahora "arrays" o NodeList con el resultado de querySelectorAll, contienen todas las celdas de las tablas,
    //con forEach iteraremos sobre ellas "activandolas" para manejar los eventos.

    //asignación de evento click en cada celda de la paletaColores que ejecutará la función detectarColor
    paletaColores.forEach(function(celda) {
        celda.addEventListener("click", detectarColor);
    });
    //asignación de evento click en cada celda del tableroCeldas que ejecutará la función activarPincel
    tableroCeldas.forEach(function(celda) {
        celda.addEventListener("click", activarPincel);
    });
    //asignación de evento mouseover en cada celda del tableroCeldas que ejecutará la función pintar
    tableroCeldas.forEach(function(celda) {
        celda.addEventListener("mouseover", pintar);
    });
};

var colorActivo = "";
var pintarActivado = false;


// crearTabla, se llama al inicio de la aplicación, creará el tablero añadiendolo directamente al html en "zonadibujo"
function crearTabla(){
    //creación de elementos HTML para formar la tabla
        var tabla = document.createElement("table");
        var captionTabla = document.createElement("caption");
        var tituloTabla = document.createTextNode("Haga click en cualquier celda para activar o desactivar el pincel");

    //establecemos los atributos de la tabla creada, y asignamos la clase definida en el css "tablerodibujo" 
    //se añade el id "tablero" a la tabla (se utilizará al principio de la aplicación para seleccionar la tabla creada)
        tabla.setAttribute("border", "1");
        tabla.setAttribute("id", "tablero");
        tabla.setAttribute("class", "tablerodibujo");
        
        //se añaden a los nodos hijo siguientes. (se añade el nodo texto (titulotabla) como hijo de captiontabla, y luego captiontabla se añade a tabla)
        captionTabla.appendChild(tituloTabla);
        tabla.appendChild(captionTabla);

        //bucle para crear filas y celdas que se añadiran finalmente al nodo table
        for (var i = 1; i <= 30; i++) {
            var fila = document.createElement("tr");
            for (var j = 1; j <= 30; j++) {
                var celda = document.createElement("td");
                fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }
        //selección del elemento zonadibujo y adicion de la tabla resultante con appenchild
        document.querySelector("#zonadibujo").appendChild(tabla);
    }
    

//detectarColor, controlará la seleccion del color de paleta, eliminando la clase seleccionado (definida en el css) de cada elemento td
//Tras asegurar que ninguna celda tenga la clase "seleccionado", asigna de nuevo la clase a la celda clicada. 
//El color activo se actualizará en función de la celda clicada.
function detectarColor() {
    console.log(this);
    for (var i = 0; i < this.parentNode.childNodes.length; i++) {
        this.parentNode.querySelectorAll("td").forEach(function(elemento) {
            elemento.classList.remove("seleccionado");
        });
    }

    //se obtiene el nombre del color de la celda seleccionada (evento click)
    colorActivo = this.classList[0];
    this.classList.add("seleccionado");
}


//activarPincel, cambiará el estado del pincel, mostrando un mensaje.
//En el caso de estar activado previamente lo "desactiva".
//Si no estaba activo, lo activa y cambia "pintarActivado" a true para más tarde usar la función pintar
function activarPincel() {
    if (pintarActivado) {
        document.querySelector("#pincel").innerHTML = "PINCEL DESACTIVADO...";
        pintarActivado = false;
    } else {
        document.querySelector("#pincel").innerHTML = "PINCEL ACTIVADO...";
        pintarActivado = true;
        this.classList.add(colorActivo);
    }
}

//pintar, en caso de estar activo el pincel, primero elimina todas las clases existentes en la celda y agrega finalmente la clase del color activo.
//como esta funcion se llamará con un evento de tipo mouseover podrá ir cambiando el color las celdas segun pase el ratón por encima.
function pintar() {
    if (pintarActivado) {
        for (var i = 0; i < this.classList.length; i++) {
            this.classList.remove(this.classList[i]);
        }
        this.classList.add(colorActivo);
    }
}


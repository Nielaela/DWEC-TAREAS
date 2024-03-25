// Realizar la validación del formulario facilitado en el enunciado, cumpliendo los siguientes requisitos:


/*
1-Programar el código de JavaScript en un fichero independiente. La única modificación que se permite realizar en el fichero .html es la de escribir la referencia al fichero de JavaScript.
2-Almacenar en una cookie el número de intentos de envío del formulario que se van produciendo y mostrar un mensaje en el contenedor "intentos" similar a: "Intento de Envíos del formulario: X". Es decir cada vez que le demos al botón de enviar tendrá que incrementar el valor de la cookie en 1 y mostrar su contenido en el div antes mencionado. Nota: para poder actualizar el contenido de un contenedor o div la propiedad que tenemos que modificar para ese objeto es innerHTML.
3-Cada vez que los campos NOMBRE y APELLIDOS pierdan el foco, el contenido que se haya escrito en esos campos se convertirá a mayúsculas.
4-Realizar una función que valide los campos de texto NOMBRE y APELLIDOS. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en los campos correspondientes.
5-Validar la EDAD que contenga solamente valores numéricos y que esté en el rango de 0 a 105. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo EDAD.
6-Validar el NIF. Utilizar una expresión regular que permita solamente 8 números un guión y una letra. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo NIF. No es necesario validar que la letra sea correcta. Explicar las partes de la expresión regular mediante comentarios.
7-Validar el E-MAIL. Utilizar una expresión regular que nos permita comprobar que el e-mail sigue un formato correcto. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo E-MAIL. Explicar las partes de la expresión regular mediante comentarios.
8-Validar que se haya seleccionado alguna de las PROVINCIAS. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo PROVINCIA.
9-Validar el campo FECHA utilizando una expresión regular. Debe cumplir alguno de los siguientes formatos: dd/mm/aaaa o dd-mm-aaaa. No se pide validar que sea una fecha de calendario correcta. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo FECHA. Explicar las partes de la expresión regular mediante comentarios.
10-Validar el campo TELEFONO utilizando una expresión regular. Debe permitir 9 dígitos obligatorios. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo TELEFONO. Explicar las partes de la expresión regular mediante comentarios.
11-Validar el campo HORA utilizando una expresión regular. Debe seguir el patrón de hh:mm. No es necesario validar que sea una hora correcta. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo HORA. Explicar las partes de la expresión regular mediante comentarios.
12-Pedir confirmación de envío del formulario. Si se confirma el envío realizará el envío de los datos; en otro caso cancelará el envío.*/

//SOLUCION
//DEFINICIÓN DE VARIABLES
let nombre;
let apellidos;
let formulario;
let edad;
let dni;
let email;
let provincia;
let fecha;
let telefono;
let hora;

//CODIGO PRINCIPAL
document.addEventListener('DOMContentLoaded', function () {
    // Recogida de elementos del formulario para usarlos posteriormente en las funciones
    nombre = document.getElementById('nombre');
    apellidos = document.getElementById('apellidos');
    formulario = document.getElementById('formulario');
    edad = document.getElementById('edad');
    dni = document.getElementById('nif');
    email = document.getElementById('email');
    provincia = document.getElementById('provincia');
    fecha = document.getElementById('fecha');
    telefono = document.getElementById('telefono');
    hora = document.getElementById('hora');

    // Evento "blur" se activa cuando un elemento pierde el foco (sale de la caja de texto)
    nombre.addEventListener('blur', function (event) {
        convertirEnMayusculas(event.target);
    });

    apellidos.addEventListener('blur', function (event) {
        convertirEnMayusculas(event.target);
    });
    // evento "submit" en el formulario, llamará a todas las funciones definidas y controlará los errores.
    //por último pedirá confirmación de envio de formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        if (validarCampos(nombre) &&
            validarCampos(apellidos) &&
            validarEdad(edad) &&
            validarDNI(dni) &&
            validarEmail(email) &&
            validarProvincia(provincia) &&
            validarFecha(fecha) &&
            validarTelefono(telefono) &&
            validarHora(hora)) {

            //Ejercicio 12 
            // confirmación de envio de formulario
            if (window.confirm("¿Estás seguro de enviar el formulario?")) {
                //envio de formulario .submit
                formulario.submit();
            } else {
                // Cancelar el envío del formulario
                console.log("Envío del formulario cancelado.");
            }
        }

    });
});

//DEFINICION DE FUNCIONES DE VALIDACION

//Ejercicio 3 
//convertirEnMayusculas - se llama a esta funcion en un addEventListener con el evento "blur", convertira en maysuculas el texto del campo seleccionado (.target)
function convertirEnMayusculas(campo) {
    //creamos la variable que recoga el campo que ha perdido el foco (activado previamente por el evento blur)
    campo.value = campo.value.toUpperCase();

}

//funciones de manejo errores en el contenedor
function mostrarError(campo, mensaje) {
    let contenedorError = document.getElementById('errores');
    contenedorError.innerHTML = `Error: ${mensaje}<br>`;
    campo.classList.add('error');
    //con .focus se iluminará y activará la caja de texto donde aparece el error
    campo.focus();
}
function limpiarError(campo) {
    let contenedorError = document.getElementById('errores');
    contenedorError.innerHTML = '';
    //eliminación del resalte generado con .focus.
    campo.classList.remove('error');
}

/**Todas las funciones de validación siguientes (desde el ejercicio 4 hasta el 11), utilizarán las funciones de manejo de errores definidas anteriormente para poder mostrar o eliminar los resultados de errores, 
 * en ellas se indicará el focus que señala donde está el error. */

//Ejercicio 4 
//validarCampos - se controlará con trim los espacios. En el caso de que este vacio el campo ' ', salte el error.
function validarCampos(campo) {
    if (campo.value.trim() === '') {
        mostrarError(campo, `El campo ${campo.id} no puede estar vacío.`);
        return false;
    } else {
        limpiarError(campo);
        return true;
    }
}
//Ejercicio 5 
//validarEdad - se tendrá en cuenta que la funcion isNaN (is not a number) y si esta comprendido entre el rango numerico de 0 y 105.
function validarEdad(edad) {
    if (isNaN(edad.value) || edad.value <= 0 || edad.value >= 105) {
        mostrarError(edad, 'La edad debe ser un número entre 0 y 105.');
        return false;
    } else {
        limpiarError(edad);
        return true;
    }
}
//Ejercicio 6 
//validarDNI -
/**^\d{8}: indica digitos y que sean exactamente 8 al comienzo de la cadena
    -[a-zA-Z]: indica el guión y la letra indiferente
    $: indica el final de la cadena. */
function validarDNI(dni) {
    let patron = /^\d{8}-[a-zA-Z]$/;
    if (!dni.value.match(patron)) {
        mostrarError(dni, 'DNI incorrecto.<br> Formato requerido: 12345678-L');
        return false;
    } else {
        limpiarError(dni);
        return true;
    }
}
//Ejercicio 7 
//validarEmail -
/** ^[a-zA-Z0-9._-]: cualquier tipo de caracter al comienzo de la cadena
    @: que coincida con un simbolo @
    [a-zA-Z0-9.-]+: coincida despues del @ con cualquier tipo de caracter (dominio)
    \.: que haya un punto
    [a-zA-Z]{2,4}$: al final de la cadena que coincida con caracteres de tipo letra que no sea mayor de 4 ni menor de 2 (extension del dominio)*/
function validarEmail(email) {
    let patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.value.match(patron)) {
        mostrarError(email, 'Correo electrónico incorrecto.<br> Formato requerido: nombre@dominio.ext');
        return false;
    } else {
        limpiarError(email);
        return true;
    }
}

//Ejercicio 8 
//validarProvincia - Con una variable que guarde el valor de la provincia seleccionada del desplegable, controlamos si no se ha seleccionado una opcion (provincia = 0))
function validarProvincia(provincia) {
    let provinciaSeleccionada = provincia.value;
    if (provinciaSeleccionada === "0") {
        mostrarError(provincia, 'Selecciona una provincia.');
        return false;
    } else {
        limpiarError(provincia);
        return true;
    }
}
//Ejercicio 9 
//validarFecha
/** dias - se dividirá en tres partes; indicando el primer valor de comienzo y despues entre [] el rango.
    ^(?:0[1-9]|[1-9]: de los dias 01 al 09. o del 1 al 9 es indiferente.
    [12]\d: de los dias 10 al 29. Exige como primer digito 1 o 2 y con \d es que sigue de cualquier otro
    3[01]): de los dias 30 a 21.
    
    [-/]: Acepta un guion o una barra inclinada como separador de partes de la fecha.

    mes 
    (?:0[1-9]|[1-9]|1[0-2]): similar al dia pero teniendo en cuenta que solo es hasta 12.

    [-/]: Otro guion o barra inclinada como separador.

    (\d{4})$: una cifra de 4 digitos.*/
function validarFecha(fecha) {
    let patron = /^(?:0[1-9]|[1-9]|[12]\d|3[01])[-/](?:0[1-9]|[1-9]|1[0-2])[-/](\d{4})$/;
    if (!fecha.value.match(patron)) {
        mostrarError(fecha, 'Fecha incorrecta.<br> Formato requerido: dd/mm/aaaa o dd-mm-aaaa');
        return false;
    } else {
        limpiarError(fecha);
        return true;
    }
}
//Ejercicio 10 
//validarTelefono - \d{9}: indica 9 digitos exactamente.
function validarTelefono(telefono) {

    let patron = /^\d{9}$/;
    if (!telefono.value.match(patron)) {
        mostrarError(telefono, 'Teléfono incorrecto.<br> Tiene que tener 9 dígitos');
        return false;
    } else {
        limpiarError(telefono);
        return true;
    }
}
//Ejercicio 11 
//validarHora
/**   horas
  (?:[01]\d|2[0-3]): indica que como primer digito es 0 o 1, seguido despues de cualquier digito (\d) y del 20 al 23.
  : separador de horas y minutos estricto
  minutos
  [0-5]\d: que comience por las cifras de 0 a 5 y que complete con el digito cualquiera (\d) */
function validarHora(hora) {
    let patron = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!hora.value.match(patron)) {
        mostrarError(hora, 'Hora incorrecta.<br> Formato requerido: hh:mm (ejemplo 16:45)');
        return false;
    } else {
        limpiarError(hora);
        return true;
    }
}


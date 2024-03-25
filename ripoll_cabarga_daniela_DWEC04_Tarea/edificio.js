class Edificio {

    //DEC PROPIEDADES
    calle;
    numero;
    codigoPostal;
    plantasEdificio = [];

    //CONSTRUCTOR
    constructor(calle, numero, codigoPostal) {
        this.calle = calle;
        this.numero = numero;
        this.codigoPostal = codigoPostal;
        document.write("<br><br>");
        document.write(`Construido nuevo edificio en calle: ${this.calle}, nº: ${this.numero}, CP: ${this.codigoPostal}.`);

    }

    //FUNCIONES

    // Se le pasa el número de plantas que queremos crear en el piso y el número de puertas por planta.
    // Cada vez que se llame a este método, añadirá el número de plantas y puertas indicadas en los parámetros, a las que ya están creadas en el edificio.
    agregarPlantasYPuertas(nplantas, npuertas) {
        //indicamos la variable ultimaPlanta para tener el máximo valor de plantas en el array
        let ultimaPlanta = this.plantasEdificio.length;

        for (let i = 0; i < nplantas; i++) {
            // Crea un nuevo array para representar la planta actual y guardará los datos de planta, puerta y en un futuro propietario
            let plantaActual = [];
    
            for (let j = 0; j < npuertas; j++) {
                // Incrementa el número de puerta en cada iteración
                let puerta = j + 1;
                plantaActual.push([ultimaPlanta + i, puerta, ""]); 
            }
    
            // Agrega la planta actual al edificio en su array de plantas
            this.plantasEdificio.push(plantaActual);

        }
        document.write("<br><br>");
        document.write(`Se han añadido ${nplantas} plantas y ${npuertas} puertas por planta.`);
        document.write("<br>");
    }
    //Se le pasa el nuevo número del edificio para que lo actualice.
    modificarNumero(numero) {
        this.numero = numero;
    }
    //Se le pasa el nuevo nombre de la calle para que lo actualice.
    modificarCalle(calle) {
        this.calle = calle;
    }
    //Se le pasa el nuevo número de código postal del edificio.
    modificarCodigoPostal(codigo) {
        this.codigoPostal = codigo;
    }
    //Devuelve el nombre de la calle del edificio.
    imprimeCalle() {
        return this.calle;
    }

    //Devuelve el número del edificio.
    imprimeNumero() {
        return this.numero;
    }

    //Devuelve el código postal del edificio.
    imprimeCodigoPostal() {
        return this.codigoPostal;
    }

    //Se le pasa un nombre de propietario, un número de planta y un número de puerta y lo asignará como propietario de ese piso.
    agregarPropietario(nombre, planta, puerta) {
        //primero hay que comprobar si existe la planta y la puerta de ese edificio para agregar a un propietario
        if (planta < this.plantasEdificio.length) {
            for (let i = 0; i < this.plantasEdificio[planta].length; i++) {
                //comprobamos si la puerta indicada coincide con una existente en la planta. 
                //El valor de (i) corresponderá a la posición que guardaba todos los arrays de puertas de cada planta (los que se crearon en la función agregarPlantasyPuertas)
                // el (2) corresponderá a la posición del nombre de ese array (las posiciones son 0, 1 y 2 donde 0 es la planta, 1 es la puerta y 2 es el nombre)
                if (puerta == this.plantasEdificio[planta][i][1]) {
                    this.plantasEdificio[planta][i][2] = nombre;
                    document.write("<br>");
                    document.write(`${nombre} es ahora el propietario de la puerta ${puerta} de la planta ${planta}.`);
                    return;
                }
            }
            document.write("<br>");
            document.write("La puerta indicada no existe en esta planta.");
        } else {
            document.write("<br>");
            document.write("La planta indicada no existe en este edificio.");
        }
    }

    //Recorrerá el edificio e imprimirá todos los propietarios de cada puerta.
    imprimePlantas() {
        document.write("<br>");
        document.write(`<h3>Listado de propietarios del edificio ${this.calle} número ${this.numero}.</h3>`);
        for (let i = 0; i < this.plantasEdificio.length; i++) {
            for (let j = 0; j < this.plantasEdificio[i].length; j++) {
                let planta = this.plantasEdificio[i][j][0];
                let puerta = this.plantasEdificio[i][j][1];
                let propietario = this.plantasEdificio[i][j][2];
                  
                    document.write(`Propietario del piso ${puerta} de la planta ${planta}: ${propietario}`);
                    document.write("<br>");

            }
        }
    }
}
//RESULTADO
document.write("<h1>GESTOR EDIFICIOS</h1>");
document.write("Instanciamos 3 objetos edificioA, edificioB y edificioC con estos datos:");
//USO DEL CONSTRUCTOR, INSTANCIAMOS OBJETOS
var edificioA = new Edificio("Avenida Severiano Ballesteros", "130", 39130);
var edificioB = new Edificio("Calle Misterios", "32", 28029);
var edificioC = new Edificio("El Cristo", "212", 39130);

//USO DE FUNCIONES DE VER PROPIEDADES DE OBJETOS
document.write("<h3>Datos de edificios</h3>");
document.write("El código postal del edificio A es: " + edificioA.imprimeCodigoPostal());
document.write("<br/>La calle del edificio C es: " + edificioC.imprimeCalle());
document.write("<br/>El edificio B está situado en la calle " + edificioB.imprimeCalle() + " número " + edificioB.imprimeNumero());

//USO DE FUNCIONES DE MODIFICACICACION DE PROPIEDADES DE OBJETOS
document.write("<h3>Modificación datos edificios</h3>");
document.write("El código postal del edificio A es: " + edificioA.imprimeCodigoPostal());
document.write("<br/>Cambiamos el código postal a 39405. ");
 edificioA.modificarCodigoPostal(39405);
document.write("<br/>El <b>nuevo</b> código postal del edificio A es: " + edificioA.imprimeCodigoPostal());
document.write("<br><br>");

document.write("El nombre de la calle del edificio B es:" + edificioB.imprimeCalle());
document.write("<br/>Cambiamos el nombre de la calle a 'Calle de los gatos'. ");
edificioB.modificarCalle("Calle de los gatos");
document.write("<br/>El <b>nuevo</b> nombre de la calle del edificio B es: " + edificioB.imprimeCalle());
document.write("<br><br>");

document.write("El numero del edificio C es:" + edificioC.imprimeNumero());
document.write("<br/>Cambiamos el número del edificio a 212A ");
edificioC.modificarNumero("212A");
document.write("<br/>El <b>nuevo</b> número el edificio C es: " + edificioC.imprimeNumero());

//USO DE LAS FUNCIONES DE AGREGAR PLANTAS Y PUERTAS Y DE AGREGAR PROPIETARIOS. Y FINALMENTE USO DE LA FUNCION LISTAR PLANTAS
document.write("<h3> Modificación de plantas y puertas de los edificios</h3>");
document.write("Agregamos 4 plantas y 3 puertas por planta al edificio A...");
edificioA.agregarPlantasYPuertas(4, 3);

document.write("<br/>Agregamos 3 propietarios al edificio A...");
document.write("<br>");
edificioA.agregarPropietario("Daniela Ripoll", 2, 1);
edificioA.agregarPropietario("Monica Gonzalez", 3, 2);
edificioA.agregarPropietario("Pedro Peña", 1, 3);
edificioA.imprimePlantas();

document.write("<br/><br/>Agregamos 1 planta más al edificio A...");
edificioA.agregarPlantasYPuertas(1, 2);
document.write("<br/>Agregamos 1 propietario más al edificio A planta 4, puerta 1...");
document.write("<br>");
edificioA.agregarPropietario("Pedro Meijide", 4, 1);
edificioA.imprimePlantas();

document.write("<br/>Agregamos 1 propietario más al edificio A planta 0, puerta 2...");
document.write("<br>");
edificioA.agregarPropietario("Isabel Calderón", 0, 2);
edificioA.imprimePlantas();
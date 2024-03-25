//CODIGO PARA FORMULARIO COMPRA
const btn_agregar = document.getElementById('agregar');
btn_agregar.addEventListener("click", function( ){
    //crear el div que contiene los 2 sub-divs
    const div_principal = D.create('div');
    //crear el div para el span e input del nombre
    const div_producto = D.create('div');

    //crear el div para el span e input del apellido
    const div_cantidad = D.create('div');

    //crear los span de nombre y apellido
    const span_producto = D.create('span', { innerHTML: 'Producto' } );
    const span_cantidad = D.create('span', { innerHTML: 'Cantidad' });

    //crear los inputs de nombre y apellido
    const input_producto = D.create('input', { type: 'text', name: 'productos[]', autocomplete: 'off', placeholder: 'Producto' } );

    const input_cantidad = D.create('input', { type: 'text', name: 'cantidad[]', autocomplete: 'off', placeholder: 'Cantidad' });

    //crear un botoncito de eliminar este div 
    const borrar = D.create('a', { href: 'javascript:void(0)', innerHTML: 'Eliminar', onclick: function( ){ D.remove(div_principal); } } );

    //agregar cada etiqueta a su nodo padre
    D.append(span_producto, div_producto);
    D.append(input_producto, div_producto);

    D.append([span_cantidad, input_cantidad], div_cantidad);

    D.append([div_producto, div_cantidad, borrar], div_principal);
    
    //agregar el div del primer comentario al contenedor con id #container
    D.append(div_principal, D.id('config') );
} );
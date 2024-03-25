<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Alta</title>
    <link rel="stylesheet" href="css/estilos.css" />
</head>
<body>
    <h1>Mi sitio web</h1>
    <h2>Alta de usuarios</h2>
    <form action="alta.php" method="post">
        <div id="davidlpls">
            <div>
                <div>
                    <span>Nombre</span><input type="text" name="nombres[]" autocomplete="off" />
                </div>
                <div>
                    <span>Apellido</span><input type="text" name="apellidos[]" autocomplete="off" />
                </div>
            </div>
        </div>

        <input type="button" value="+" id="agregar" /><input type="submit" value="Cargar usuario" />
    </form>
    <script src="js/dom.js"></script>
    <script src="js/codigo.js"></script>
</body>
</html>
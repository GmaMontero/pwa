<?php
//By default, we assume that PHP is NOT running on windows.
$isWindows = false;
 
//If the first three characters PHP_OS are equal to "WIN",
//then PHP is running on a Windows operating system.
if(strcasecmp(substr(PHP_OS, 0, 3), 'WIN') == 0){
    $isWindows = true;
}
 
//If $isWindows is TRUE, then print out a message saying so.
if($isWindows){
    require 'vendorwin/autoload.php';
} else {
    require 'vendor/autoload.php';
}

#$client = new MongoDB\Client(
#    'mongodb+srv://pwa:Trend123@localhost:27017/pwa'
#);

#$m = new MongoDB\Client("mongodb://pwa:Trend123@pwa-web.tk:27017/pwa");

#Generamos controlador para nuestra DB
#$manager = new MongoDB\Driver\Manager("mongodb://pwa:Trend123@pwa-web.tk:27017/");

#Comando para chequear conectividad a Mongo. Devuelve datos de la conexión y todo el contenido
#var_dump($manager);

#$collection = $manager->pwa->cclass;


$client = new MongoDB\Client("mongodb://pwa:Trend123@pwa-web.tk:27017/");
$bd = $client->pwa;
var_dump($bd);

?>


<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>TP PWA</title>
    <meta name="description" content="The HTML5 Herald">
    <meta name="author" content="SitePoint">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.css?v=1.0">
</head>
<body>

<div class="container-fluid">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">PWA</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link schedule active" href="#">Cronograma de horarios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link abm_classroom" href="#">ABM Aulas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link abm_class" href="#">ABM Cursadas</a>
                </li>
            </ul>
        </div>
    </nav>

    <!--
    <div class="row">
        <div class="col">
            <div class="alert alert-primary" role="alert">
                A simple primary alert—check it out!
            </div>
        </div>
        <div class="col">
            <div class="alert alert-primary" role="alert">
                A simple primary alert—check it out!
            </div>
        </div>
    </div>
    -->
    <br />
    <div class="row containerModule" id="schedule">
        <div class="col">
            <h2>Cronograma de horarios</h2>
        </div>  
    </div>
    
    <div class="row d-none containerModule" id="abm_classroom">
        <div class="col-5">
            <h2>ABM Aulas</h2>
            
            <!-- Formulario de alta de aulas -->
            <br />
            <form id="form_abm_classroom" action="api\controller\classRoom.php" method="post">            
                <div class="form-group row">
                    <label for="id" class="col-sm-2 col-form-label">ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="id" id="id" placeholder="ID">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="number" class="col-sm-2 col-form-label">Numero</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" name="number" id="number" placeholder="Ej. 123" required>
                    </div>                
                </div>
                <div class="form-group row">
                    <label for="floor" class="col-sm-2 col-form-label">Piso</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" name ="floor" id="floor" placeholder="Ej. 4" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="capacity" class="col-sm-2 col-form-label">Capacidad</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" name="capacity" id="capacity" placeholder="Ej. 50" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
                <input type="reset" class="btn btn-primary" value="Limpiar">
            </form>
        </div>  
        <div class="col-1"></div>
        <div class="col-6">
            <h2>Tabla de Aulas</h2>
            <br />
            <table class="table" id="table_classroom">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Piso</th>
                    <th scope="col">Capacidad</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    
    <div class="row d-none containerModule" id="abm_class">
        <div class="col-5">
            <h2>ABM Cursadas</h2>

            <!-- Formulario de alta de cursadas  -->
            <br />
            <form id="form_abm_class" method="post">
                <div class="form-group row">
                    <label for="id" class="col-sm-2 col-form-label">ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="id" id="id" placeholder="ID" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="career" class="col-sm-2 col-form-label">Carrera</label>
                    <div class="col-sm-10">
                        <select class="custom-select" name="career" id="career"></select>
                    </div>   
                </div>
                <div class="form-group row">
                    <label for="nameSubject" class="col-sm-2 col-form-label">Materia</label>
                    <div class="col-sm-10">
                        <select class="custom-select" name="nameSubject" id="nameSubject"></select>
                    </div>                
                </div>
                <div class="form-group row">
                    <label for="capacity" class="col-sm-2 col-form-label">Capacidad</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" name="capacity" id="capacity" placeholder="Ej. 50" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="turn" class="col-sm-2 col-form-label">Turno</label>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="turn" id="turn1" value="M" checked>
                            <label class="form-check-label" for="turn1">Mañana</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="turn" id="turn2" value="T">
                            <label class="form-check-label" for="turn2">Tarde</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="turn" id="turn3" value="N">
                            <label class="form-check-label" for="turn3">Noche</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="commission" class="col-sm-2 col-form-label">Comision</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name ="commission" id="commission" placeholder="Ej. A" required>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Guardar</button>
                <input type="reset" class="btn btn-primary" value="Limpiar">
            </form>
        </div>  
        <div class="col-1"></div>
        <div class="col-6">
            <h2>Tabla de Cursadas</h2>
            <br />
            <table class="table" id="table_class">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Carrera</th>
                    <th scope="col">Materia</th>
                    <th scope="col">Capacidad</th>
                    <th scope="col">Turno</th>
                    <th scope="col">Comision</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

</div>



<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="js/main.js?v=1.0"></script>
</body>
</html>

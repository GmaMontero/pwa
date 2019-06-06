<?php



?>

<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Pwa project</title>
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
                <li class="nav-item active">
                    <a class="nav-link schedule" href="#">Cronograma de horarios <span class="sr-only">(current)</span></a>
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

    <div class="row containerModule" id="schedule">
        <div class="col">
            <h2>Cronograma de horarios</h2>
        </div>  
    </div>
    
    <div class="row d-none containerModule" id="abm_classroom">
        <div class="col">
            <h2>ABM Aulas</h2>
        </div>  
    </div>
    
    <div class="row d-none containerModule" id="abm_class">
        <div class="col">
            <h2>ABM Cursadas</h2>
        </div>  
    </div>

</div>



<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="js/main.js?v=1.0"></script>
</body>
</html>

var MAIN = (function ($) {
    var containerSchedule = $("#schedule"),
        containerAbmClass = $("#abm_class"),
        containerAbmClassroom = $("#abm_classroom"),
        formAbmClassroom = $("#form_abm_classroom"),
        formAbmClass = $("#form_abm_class"),
        selectNameSubject = $("#nameSubject"),
        selectCareer = $("#career"),
        tableClassroom = $("#table_classroom"),
        tableClass = $("#table_class")
    
    //JSONs de ejemplo
    var jsonSubjects = '[{"id": 1, "name":"Programacion Web Avanzada"},{"id": 2, "name":"Metodologias III"},{"id": 3, "name":"Tecnologia de las Comunicaciones"},{"id": 4, "name":"Gestion de RRHH TI"},{"id": 5,  "name":"Gestion y Costos"},{"id": 6,  "name":"Programacion Estructurada"},{"id": 7, "name":"Matematica Discreta"},{"id": 8, "name":"Sistemas de Representacion"},{"id": 9, "name":"Etica y Deontologia Profesional"},{"id": 10, "name":"Introduccion a la Programacion Web"}]'; 
    var jsonCareers = '[{"id": 1, "name":"Lic. en Gestion de Tecnologia Informatica"},{"id": 2, "name":"Ingenieria en Sistemas"}]';
    var jsonClasses = '[{"id":"PWA","nameSubject":"Programacion","career":"Sistemas","capacity":40,"turn":"N","comission":"B"},{"id":"IPW","nameSubject":"Intro Prog. Web","career":"Sistemas","capacity":30,"turn":"N","comission":"A"}]';
    var jsonClassrooms = '[{"id":"1","number":1520,"floor":5,"capacity":40},{"id":"2","number":1310,"floor":3,"capacity":20}]';
    
    var cargarMaterias = (subjects) => {
        subjects = JSON.parse(subjects);
        for (var i = 0; i < subjects.length; i++) {
            selectNameSubject.append("<option value='"+subjects[i].id+"'>"+subjects[i].name+"</option>");
        }
    }

    var cargarCarreras = (careers) => {
        careers = JSON.parse(careers);
        for (var i = 0; i < careers.length; i++) {
            selectCareer.append("<option value='"+careers[i].id+"'>"+careers[i].name+"</option>");
        }
    }

    var cargarTablaAulas = (classrooms) => {
        classrooms = JSON.parse(classrooms);
        var tr;
        for (var i = 0; i < classrooms.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + classrooms[i].id + "</td>");
            tr.append("<td>" + classrooms[i].number + "</td>");
            tr.append("<td>" + classrooms[i].floor + "</td>");
            tr.append("<td>" + classrooms[i].capacity + "</td>");
            tableClassroom.append(tr);
        }
    }

    var loadClassrooms = () => {
        $("#table_classsroom tbody").empty();
        $.get( "api/controller/classRoom.php")
          .done(function( data ) {
            classrooms = data;
            var tr;
            for (var i = 0; i < classrooms.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + classrooms[i].id + "</td>");
                tr.append("<td>" + classrooms[i].number + "</td>");
                tr.append("<td>" + classrooms[i].floor + "</td>");
                tr.append("<td>" + classrooms[i].capacity + "</td>");
                tableClassroom.append(tr);
            }
        });
    
    }
    
    function deleteClass (id) {
        var _data = "{\"id\":\"" + id + "\"}";
        $.ajax({
            url: 'api/controller/cclass.php',
            data: _data,
            type: 'DELETE',
            complete: function(result) {
                console.log(result.status);
                loadClasses();
            }
        });

        
    }

    var loadClasses = () => {
        $("#table_class tbody").empty();
        $.get( "api/controller/cclass.php")
          .done(function( data ) {
            classes = data;
            var tr;
            for (var i = 0; i < classes.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + classes[i].id + "</td>");
                tr.append("<td>" + classes[i].career + "</td>");
                tr.append("<td>" + classes[i].nameSubject + "</td>");
                tr.append("<td>" + classes[i].capacity + "</td>");
                tr.append("<td>" + classes[i].turn + "</td>");
                tr.append("<td>" + classes[i].commission + "</td>");
                tr.append("<td><button id=\"" + classes[i].id + "\" class=\"deleteClass btn-info btn-sm\">X</span></button></td>");
                tableClass.append(tr);
            }
        });
    }


    var cargarSchedulePorAula = () => {
        //TO DO: Llenar una tabla de Schedule por aula. Cada fila un aula, cada columna un día de la semana
    }

    var cargarSchedulePorTurno = () => {
        //TO DO: Llenar una tabla de Schedule por turno. Cada fila un turno, cada columna un día de la semana
    }   

    var registerEvents = () => {
        
        $(".nav-link").on("click", function(e){
            //Le saco la clase active a todos los links del menú
            $(".nav-link").removeClass("active");
            //Oculto todos
            $(".containerModule").addClass("d-none");
            //Si es Cronograma de Horarios
            if($(this).hasClass("schedule")){
                //Muestro el container
                containerSchedule.removeClass("d-none");
                //Le agrego la clase active al link del menú
                $(this).addClass("active");
            }
            //Si es ABM Aulas
            if($(this).hasClass("abm_classroom")){
                //Muestro el container
                containerAbmClassroom.removeClass("d-none");
                //Le agrego la clase active al link del menú
                $(this).addClass("active");
            }
            //Si es ABM Cursadas
            if($(this).hasClass("abm_class")){
                //Muestro el container
                containerAbmClass.removeClass("d-none");
                //Le agrego la clase active al link del menú
                $(this).addClass("active");
            }
        });

        formAbmClass.on("submit", function(e){
            event.preventDefault();
            //Serializo            
            var formData = formAbmClass.serializeFormJSON();
            //Lo hago JSON
            formData = JSON.stringify(formData);
            $.ajax({
                data:  formData, //datos que se envian a traves de ajax
                dataType: 'json',
                url:   'api/controller/cclass.php', //archivo que recibe la peticion
                type:  'post', //método de envio
                /*beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },*/
                success: function (response) {
                    //Mostrar mensaje de OK
                    console.log("OK");
                },
                error: function (response) {
                    //Mostrar mensaje de error
                    console.log("ERROR");
                },
                complete:  function (xhr, statusText) {
                    console.log("HTTP Status: " + xhr.status);
                    loadClasses();
                }
           });
        });

        formAbmClassroom.on("submit", function(e){
            event.preventDefault();
            //Serializo            
            var formData = formAbmClassroom.serializeFormJSON();
            //Lo hago JSON
            formData = JSON.stringify(formData);
            $.ajax({
                data:  formData, //datos que se envian a traves de ajax
                dataType: 'json',
                url:   'api/controller/classRoom.php', //archivo que recibe la peticion
                type:  'post', //método de envio
                /*beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },*/
                success: function (response) {
                    //Mostrar mensaje de OK
                    console.log("OK");
                },
                error: function (response) {
                    //Mostrar mensaje de error
                    console.log("ERROR");
                },
                complete:  function (xhr, statusText) {
                    console.log("HTTP Status Code: " + xhr.status);
                }
           });
        });

        tableClass.on("click", "button.deleteClass", function(e){
            event.preventDefault();
            var _id = $(this)[0].id;
            deleteClass(_id);
        });

        $.fn.serializeFormJSON = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        
    }


    registerEvents();
    loadClasses();
    loadClassrooms();
    cargarMaterias(jsonSubjects);
    cargarCarreras(jsonCareers);
    //cargarTablaAulas(jsonClassrooms);
    //cargarTablaCursadas(getClasses);
    //cargarTablaCursadas(jsonClasses);
    
})(jQuery);
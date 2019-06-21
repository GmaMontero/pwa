
var MAIN = (function ($) {
    var containerSchedule = $("#schedule"),
        containerAbmClass = $("#abm_class"),
        containerAbmClassroom = $("#abm_classroom"),
        formAbmClassroom = $("#form_abm_classroom"),
        formAbmClass = $("#form_abm_class"),
        selectNameSubject = $("#nameSubject"),
        selectCareer = $("#career"),
        tableClassroom = $("#table_classroom"),
        tableClass = $("#table_class"),
        btnResetFormClass = $("#form_abm_class #resetForm"),
        btnResetFormClassroom = $("#form_abm_classroom #resetForm")

    
    //JSONs de ejemplo
    var jsonSubjects = '[{"id": 1, "name":"Programacion Web Avanzada"},{"id": 2, "name":"MetodologiasIII"},{"id": 3, "name":"Tecnologia de las Comunicaciones"},{"id": 4, "name":"Gestion de RRHH TI"},{"id": 5,  "name":"Gestion y Costos"},{"id": 6,  "name":"Programacion Estructurada"},{"id": 7, "name":"Matematica Discreta"},{"id": 8, "name":"Sistemas de Representacion"},{"id": 9, "name":"Etica y Deontologia Profesional"},{"id": 10, "name":"Introduccion a la Programacion Web"}]'; 
    var jsonCareers = '[{"id": 1, "name":"Lic. en Gestion de Tecnologia Informatica"},{"id": 2, "name":"Ingenieria en Sistemas"}]';
    var jsonClasses = '[{"id":"PWA","nameSubject":"Programacion","career":"Sistemas","capacity":40,"turn":"N","comission":"B"},{"id":"IPW","nameSubject":"Intro Prog. Web","career":"Sistemas","capacity":30,"turn":"N","comission":"A"}]';
    var jsonClassrooms = '[{"id":"1","number":1520,"floor":5,"capacity":40},{"id":"2","number":1310,"floor":3,"capacity":20}]';
    
    /**
     * Función para cargar materias en combo
     */
    var cargarMaterias = (subjects) => {
        $.get( "api/controller/subject.php")
          .done(function( data ) {
            subjects = data;
          })
          .fail(function() {
            subjects = JSON.parse(subjects);
          })
          .always(function() {
            for (var i = 0; i < subjects.length; i++) {
                selectNameSubject.append("<option value='"+subjects[i].id+"'>"+subjects[i].name+"</option>");
            }
          });

    }

    /**
     * Función para cargar carreras en combo
     */
    var cargarCarreras = (careers) => {
        careers = JSON.parse(careers);
        for (var i = 0; i < careers.length; i++) {
            selectCareer.append("<option value='"+careers[i].id+"'>"+careers[i].name+"</option>");
        }
    }

    /**
     * Función para cargar Aulas desde DB
     */
    var loadClassrooms = () => {
        $("#table_classroom tbody").empty();
        $.get( "api/controller/classroom.php")
          .done(function( data ) {
            classrooms = data;
            var tr;
            for (var i = 0; i < classrooms.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + classrooms[i].id + "</td>");
                tr.append("<td>" + classrooms[i].number + "</td>");
                tr.append("<td>" + classrooms[i].floor + "</td>");
                tr.append("<td>" + classrooms[i].capacity + "</td>");
                tr.append("<td><button id=\"edit" + classrooms[i].id + "\" class=\"editClassroom btn-success btn-sm fa fa-pencil\"></button><button id=\"" + classrooms[i].id + "\" class=\"deleteClassroom btn-sm btn-danger fa fa-trash\"></button></td>");
                tableClassroom.append(tr);
                $("#table_classroom tr:last-child").attr("rowData", JSON.stringify(classrooms[i]));
            }
        });
    }
    
    /**
     * Función para borrar Aulas desde DB
     */
    function deleteClassroom (id) {
        var _data = "{\"id\":\"" + id + "\"}";
        var rta = confirm("¿Esta seguro que desea eliminar?");
        if (rta == true) {
            $.ajax({
                url: 'api/controller/classRoom.php',
                data: _data,
                type: 'DELETE',
                complete: function(result) {
                    console.log(result.status);
                    loadClassrooms();
                }
            }); 
        }
    }

     /**
     * Función para cargar Cursadas desde DB
     */
    var loadClasses = () => {
        $("#table_class tbody").empty();
        $.get( "api/controller/class.php")
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
                tr.append("<td><button id=\"edit" + classes[i].id + "\" class=\"editClass btn-success btn-sm fa fa-pencil\"></button><button id=\"" + classes[i].id + "\" class=\"deleteClass btn-sm btn-danger fa fa-trash\"></button></td>");
                tableClass.append(tr);
                $("#table_class tr:last-child").attr("rowData", JSON.stringify(classes[i]));
            }
        });
    }

    /**
     * Función para borrar cursadas en DB
     */
    function deleteClass (id) {
        var _data = "{\"id\":\"" + id + "\"}";
        var rta = confirm("¿Esta seguro que desea eliminar elemento con ID " + id + "?");
        if (rta == true) {
            $.ajax({
                url: 'api/controller/class.php',
                data: _data,
                type: 'DELETE',
                complete: function(result) {
                    console.log(result.status);
                    loadClasses();
                }
            }); 
        }
    }

    var cargarSchedulePorAula = () => {
        //TO DO: Llenar una tabla de Schedule por aula. Cada fila un aula, cada columna un día de la semana
        var $tbody = $("#table_cronograma tbody");
        $tbody.empty();
        $.get( "api/controller/schedule.php?type=room")
          .done(function( data ) {
            var classes = data.classes,
                classesWithoutRooms = data.classesWithoutRooms;

                var template = function(model){
                    return `<tr><td>${model.class.nameSubject}</td><td>${model.class.nameSubject}</td><td>${model.class.nameSubject}</td><td>${model.class.nameSubject}</td><td>${model.class.nameSubject}</td></tr>`;
                };

                Object.entries(classes).forEach(([roomNumber, classesAndRoomsData]) => {
                    console.log(roomNumber);

                    classesAndRoomsData.forEach((classAndRoomData) => {

                        $tbody.append(template(classAndRoomData));

                        console.log(classAndRoomData)
                        console.log(classAndRoomData.classRoom.classroomDelta)
                    });
                });

          });
    }

    var cargarSchedulePorTurno = () => {
        //TO DO: Llenar una tabla de Schedule por turno. Cada fila un turno, cada columna un día de la semana
        $.get( "api/controller/schedule.php?type=turn")
          .done(function( data ) {
            // console.log(data)
          });
    }   

    var registerEvents = () => {

        /**
         * Handler para evento click en opciones del menú
         */
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

        /**
         * Handler para evento Submit del formulario de Cursadas
         */
        formAbmClass.on("submit", function(e){
            //Evito el comportamiento default del formulario
            event.preventDefault();
            //Declaro la variable para el método
            var formMethod;
            //Si el ID está habilitado, es una alta
            if($("#form_abm_class #id").is(":disabled")==false){
                formMethod = 'POST';
            } else {
                //Si el ID no está habilitado, es una modificación
                formMethod = 'PUT';
            }
            //Habilito todo antes de obtener los datos, sino no envía lo disabled en el form        
            $("#form_abm_class #id").prop("disabled",false);
            //Serializo            
            var formData = formAbmClass.serializeFormJSON();
            //Lo hago JSON
            formData = JSON.stringify(formData);
            //Armo la petición
            $.ajax({
                data:  formData, //datos que se envian a traves de ajax
                dataType: 'json',
                url:   'api/controller/class.php', //archivo que recibe la peticion
                type:  formMethod, //método de envio
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
                    btnResetFormClass.click();
                    loadClasses();
                }
            });
        });

        /**
         * Handler para evento Submit del formulario de Aulas
         */
        formAbmClassroom.on("submit", function(e){
            //Evito el comportamiento default del formulario
            event.preventDefault();
            //Declaro la variable para el método
            var formMethod;
            //Si el ID está habilitado, es una alta
            if($("#form_abm_classroom #id").is(":disabled")==false){
                formMethod = 'POST';
            } else {
            //Si el ID no está habilitado, es una modificación
                formMethod = 'PUT';
            }
            //Habilito todo antes de obtener los datos, sino no envía lo disabled en el form        
            $("#form_abm_classroom #id").prop("disabled",false);
            //Serializo            
            var formData = formAbmClassroom.serializeFormJSON();
            //Lo hago JSON
            formData = JSON.stringify(formData);
            //Armo la petición
            $.ajax({
                data:  formData, //datos que se envian a traves de ajax
                dataType: 'json',
                url:   'api/controller/classroom.php', //archivo que recibe la peticion
                type:  formMethod, //método de envio
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
                    btnResetFormClassroom.click();
                    loadClassrooms();
                }
            });
        });

        /**
         * Handler para click en modificar fila de tabla Cursadas
         */
        tableClass.on("click",  "button.editClass", function(e) 
        {
            //Completo el formulario con los datos de jsonRow
            event.preventDefault();
            var jsonRow = JSON.parse($(this).closest("tr").attr("rowData"));
            $("#form_abm_class #id").val(jsonRow.id);
            $("#form_abm_class #career").val(jsonRow.career);
            $("#form_abm_class #nameSubject").val(jsonRow.nameSubject);
            $("#form_abm_class #capacity").val(jsonRow.capacity);
            $("#form_abm_class #turn").val(jsonRow.turn);
            $("#form_abm_class .form-check-input").prop("checked",false);
            if (jsonRow.turn == "M") {$("#form_abm_class #turn1").prop("checked",true)};
            if (jsonRow.turn == "T") {$("#form_abm_class #turn2").prop("checked",true)};
            if (jsonRow.turn == "N") {$("#form_abm_class #turn3").prop("checked",true)};
            $("#form_abm_class #commission").val(jsonRow.commission);
            //Deshabilito el ID
            $("#form_abm_class #id").prop("disabled",true);
        });

        /**
         * Handler para click en modificar fila de tabla Aulas
         */
        tableClassroom.on("click",  "button.editClassroom", function(e) 
        {
            event.preventDefault();
            //Completo el formulario con los datos de jsonRow
            var jsonRow = JSON.parse($(this).closest("tr").attr("rowData"));
            $("#form_abm_classroom #id").val(jsonRow.id);
            $("#form_abm_classroom #number").val(jsonRow.number);
            $("#form_abm_classroom #floor").val(jsonRow.floor);
            $("#form_abm_classroom #capacity").val(jsonRow.capacity);
            //Deshabilito el ID
            $("#form_abm_classroom #id").prop("disabled",true);
        });

        /**
         * Handler para click en borrar fila de tabla Cursadas
         */
        tableClass.on("click", "button.deleteClass", function(e){
            event.preventDefault();
            var _id = $(this)[0].id;
            deleteClass(_id);
        });

        /**
         * Handler para click en borrado de cada fila de tabla Aulas
         */
        tableClassroom.on("click", "button.deleteClassroom", function(e){
            event.preventDefault();
            var _id = $(this)[0].id;
            deleteClassroom(_id);
        });

        $("#form_abm_class #resetForm").on("click", function(e){
            $("#form_abm_class #id").prop("disabled", false);
            formAbmClass.trigger("reset");
        })

        /**
         * Función para serializar un formulario a JSON
         */
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

    /**
     * Llamada a funciones al inicio
     */
    registerEvents();
    loadClasses();
    loadClassrooms();
    cargarMaterias(jsonSubjects);
    cargarCarreras(jsonCareers);
    cargarSchedulePorAula();
    cargarSchedulePorTurno();

})(jQuery);
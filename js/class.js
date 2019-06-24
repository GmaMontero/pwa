var CLASS = (function ($) {

    var containerAbmClass = $("#abm_class"),
        formAbmClass = $("#form_abm_class"),
        selectNameSubject = $("#nameSubject"),
        selectCareer = $("#career"),
        tableClass = $("#table_class"),
        btnResetFormClass = $("#form_abm_class #resetFormClass"),
        containerAlert = $(".alert_class"),
        spanAlert = $(".alert_class #classAlertText")

    //JSONs de ejemplo
    var jsonSubjects = '[{"id": 1, "name":"Programacion Web Avanzada"},{"id": 2, "name":"MetodologiasIII"},{"id": 3, "name":"Tecnologia de las Comunicaciones"},{"id": 4, "name":"Gestion de RRHH TI"},{"id": 5,  "name":"Gestion y Costos"},{"id": 6,  "name":"Programacion Estructurada"},{"id": 7, "name":"Matematica Discreta"},{"id": 8, "name":"Sistemas de Representacion"},{"id": 9, "name":"Etica y Deontologia Profesional"},{"id": 10, "name":"Introduccion a la Programacion Web"}]'; 
    var jsonCareers = '[{"id": 1, "name":"Lic en Gestion de Tecnologia Informatica"},{"id": 2, "name":"Ingenieria en Sistemas"}]';

    var getTurnDescription = (turn) => {
        if(turn === "M"){
            return "Mañana";
        } else if (turn === "N"){
            return "Noche";
        } else {
            return "Tarde";
        }
    };

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
        $.get( "api/controller/career.php")
          .done(function( data) {
            careers = data;
          })
          .fail(function() {
            careers = JSON.parse(careers);
          })
          .always(function() {
            for (var i = 0; i < careers.length; i++) {
                selectCareer.append("<option value='"+careers[i].id+"'>"+careers[i].name+"</option>");
            }   
          })
    }

    /**
     * Función para cargar Cursadas desde DB
     */
    var loadClasses = () => {
        if ($.fn.DataTable.isDataTable("#table_class")) {
            $("#table_class").DataTable().clear().draw();
            $("#table_class").dataTable().fnDestroy();
            $('#table_class tbody').empty();
        }
        //Hago la llamada
        $.get( "api/controller/class.php").done(function( data ) {
            var classes = data,
                tr;

            for (var i = 0; i < classes.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + classes[i].id + "</td>");
                tr.append("<td>" + classes[i].descriptionCareer + "</td>");
                tr.append("<td>" + classes[i].descriptionSubject + "</td>");
                tr.append("<td>" + classes[i].capacity + "</td>");
                tr.append("<td>" + getTurnDescription(classes[i].turn) + "</td>");
                tr.append("<td>" + classes[i].commission + "</td>");
                tr.append("<td><button id=\"edit" + classes[i].id + "\" class=\"editClass btn-success btn-sm fa fa-pencil\"></button><button id=\"" + classes[i].id + "\" style=\"margin-left: 1px;\" class=\"deleteClass btn-sm btn-danger fa fa-trash\"></button></td>");
                tableClass.append(tr);
                $("#table_class tr:last-child").attr("rowData", JSON.stringify(classes[i]));
            }
            
            $('#table_class').DataTable({
                "pagingType": "simple_numbers", // "simple" option for 'Previous' and 'Next' buttons only
                "pageLength" : 10,
                "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
                "bFilter": false,
                "searching": false,
                "ordering": false,
                "language": {
                    "paginate": {
                        "first": "Primera",
                        "previous": "Anterior",
                        "next":  "Siguiente",
                        "last": "Ultima",
                    },
                    "info": "Mostrando entradas _START_ a _END_ de _TOTAL_",
                    "lengthMenu": "Mostrar _MENU_ entradas",
                    "emptyTable": "No hay datos en la tabla",
                    "loadingRecords": "Cargando...",
                    "processing":     "Procesando...",
                }
            });
              $('.dataTables_length').addClass('bs-select');
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
                    window.HAS_CHANGE = true;
                    if (result.status==200) { 
                        showAlert("success", "Cursada borrada correctamente");
                        loadClasses();
                    } else {
                        showAlert("success", "Error en el borrado de cursada");
                    }
                }
            }); 
        }
    }

    var showAlert = (type, text) => {
        containerAlert.fadeOut();
        if(type=='success'){
            containerAlert.removeClass("alert-danger");
            containerAlert.addClass("alert-success");
        }
        if(type=='error'){
            containerAlert.removeClass("alert-success");
            containerAlert.addClass("alert-danger");
        }
        spanAlert.text(text);
        containerAlert.fadeIn();
    }

    var registerEvents = () => {
        /**
         * Handler para evento click en opciones del menú
         */
        $(".nav-link.abm_class").on("click", function(e){
            event.preventDefault();
            //Le saco la clase active a todos los links del menú
            $(".nav-link").removeClass("active");
            //Le agrego la clase active al link del menú clickeado
            $(this).addClass("active");
            //Oculto todos los div
            $(".containerModule").addClass("d-none");
            //Muestro el container correspondiente
            containerAbmClass.removeClass("d-none");
            //Reseteo todos los form
            btnResetFormClass.click();            
        });

        /**
         * Handler para evento Submit del formulario de Cursadas
         */
        formAbmClass.on("submit", function(e){
            //Evito el comportamiento default del formulario
            event.preventDefault();
            //Declaro la variable para el método
            var formMethod;
            //Detecto qué acción es
            if($("#form_abm_class #id").is(":disabled")==false){
                //Si el ID está habilitado, es una alta
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
                    if (formMethod=='POST'){
                        showAlert("success", "Cursada creada correctamente");
                    } else {
                        showAlert("success", "Cursada modificada correctamente");
                    }
                },
                error: function (response) {
                    var errorText = response.responseJSON.error;
                    switch (response.status) {
                        case 400: 
                            showAlert("error", "Error: Se debe enviar el ID de cursada"); 
                            break;
                        case 409:
                            switch (errorText) {
                                case 'ID_DUPLICATED':
                                    showAlert("error", "Error: ID de cursada duplicado");
                                    break;
                                case 'CLASS_DUPLICATED':
                                    showAlert("error", "Error: Ya existe la combinación de materia, turno y comisión");
                                    break;
                                case 'MAX_CLASS':
                                    showAlert("error", "Error: Se alcanzaron las 5 materias para la misma carrera, comisión y turno");
                                    break;
                            } 
                            break;
                        case 500: 
                            showAlert("error", "Error en el servidor"); 
                            break;
                        default: 
                            showAlert("error", "Error inesperado");
                    } 
                },
                complete:  function (xhr, statusText) {
                    window.HAS_CHANGE = true;
                    btnResetFormClass.click();
                    loadClasses();
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
         * Handler para click en borrar fila de tabla Cursadas
         */
        tableClass.on("click", "button.deleteClass", function(e){
            event.preventDefault();
            var _id = $(this)[0].id;
            deleteClass(_id);
        });


        $("#resetFormClass").on("click", function(e){
            event.preventDefault();
            $("#form_abm_class #id").prop("disabled", false);
            formAbmClass.trigger("reset");
        })

        $(".alert_class button").on("click", function(e){
            containerAlert.fadeOut();
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

    registerEvents();
    loadClasses();
    
    cargarMaterias(jsonSubjects);
    cargarCarreras(jsonCareers);
})(jQuery);
var CLASSROOM = (function ($) {

    var containerAbmClassroom = $("#abm_classroom"),
        formAbmClassroom = $("#form_abm_classroom"),
        tableClassroom = $("#table_classroom"),
        btnResetFormClassroom = $("#form_abm_classroom #resetFormClassroom"),
        containerAlert = $(".alert_classroom"),
        spanAlert = $(".alert_classroom #classroomAlertText")

    /**
     * Función para cargar Aulas desde DB
     */
    var loadClassrooms = () => {
        if ($.fn.DataTable.isDataTable("#table_classroom")) {
            $("#table_classroom").DataTable().clear().draw();
            $("#table_classroom").dataTable().fnDestroy();
            $('#table_classroom tbody').empty(); //esta línea queda igual
        }

        //Hago la llamada
        $.get( "api/controller/classroom.php").done(function( data ) {
            var classrooms = data,
                tr;

            for (var i = 0; i < classrooms.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + classrooms[i].id + "</td>");
                tr.append("<td>" + classrooms[i].number + "</td>");
                tr.append("<td>" + classrooms[i].floor + "</td>");
                tr.append("<td>" + classrooms[i].capacity + "</td>");
                tr.append("<td><button id=\"edit" + classrooms[i].id + "\" class=\"editClassroom btn-success btn-sm fa fa-pencil\"></button><button id=\"" + classrooms[i].id + "\" style=\"margin-left: 10px;\" class=\"deleteClassroom btn-sm btn-danger fa fa-trash\"></button></td>");
                tableClassroom.append(tr);
                $("#table_classroom tr:last-child").attr("rowData", JSON.stringify(classrooms[i]));
            }

            $('#table_classroom').DataTable({
                "pagingType": "simple_numbers", // "simple" option for 'Previous' and 'Next' buttons only
                "pageLength" : 5,
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
        });
    };

    /**
    * Función para borrar Aulas desde DB
    */
    function deleteClassroom (id) {
        var _data = "{\"id\":\"" + id + "\"}";
        var rta = confirm("¿Esta seguro que desea eliminar elemento con ID " + id + "?");
        if (rta === true) {
            $.ajax({
                url: 'api/controller/classroom.php',
                data: _data,
                type: 'DELETE',
                complete: function(result) {
                    window.HAS_CHANGE = true;

                    if (result.status === 200) {
                        showAlert("success","Aula borrada correctamente");
                        loadClassrooms();
                    } else {
                        showAlert("error", "Error en el borrado de aula");
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
        $(".nav-link.abm_classroom").on("click", function(e){
            event.preventDefault();
            //Le saco la clase active a todos los links del menú
            $(".nav-link").removeClass("active");
            //Le agrego la clase active al link del menú clickeado
            $(this).addClass("active");
            //Oculto todos los div
            $(".containerModule").addClass("d-none");
            //Muestro el container correspondiente
            containerAbmClassroom.removeClass("d-none");
            //Reseteo todos los form
            btnResetFormClassroom.click();            
        });

        /**
         * Handler para evento Submit del formulario de Aulas
         */
        formAbmClassroom.on("submit", function(e){
            //Evito el comportamiento default del formulario
            event.preventDefault();
            //Declaro la variable para el método
            var formMethod;
            //Detecto qué acción es
            if($("#form_abm_classroom #id").is(":disabled")==false){
                //Si el ID está habilitado, es una alta
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
                success: function (response) {
                    if (formMethod=='POST'){
                        showAlert("success", "Aula creada correctamente");
                    } else {
                        showAlert("success", "Aula modificada correctamente");
                    }
                },
                error: function (response) {
                    switch (response.status) {
                        case 400: 
                            showAlert("error", "Error: Se debe enviar el ID de aula");
                            break;
                        case 409: 
                            showAlert("error", "Error: ID de aula duplicado");
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
                    btnResetFormClassroom.click();
                    loadClassrooms();
                }
            });
        });        

        /**
         * Handler para click en modificar fila de tabla Aulas
         */
        tableClassroom.on("click",  "button.editClassroom", function(e) {
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
         * Handler para click en borrado de cada fila de tabla Aulas
         */
        tableClassroom.on("click", "button.deleteClassroom", function(e){
            event.preventDefault();
            var _id = $(this)[0].id;
            deleteClassroom(_id);
        });


        $("#resetFormClassroom").on("click", function(e){
            event.preventDefault();
            $("#form_abm_classroom #id").prop("disabled", false);
            formAbmClassroom.trigger("reset");
        })

        $(".alert_classroom button").on("click", function(e){
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
    loadClassrooms();
})(jQuery);
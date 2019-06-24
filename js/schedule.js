var SCHEDULE = (function ($) {
    var tableManana= $("#table_cronograma_mañana tbody"),
        tableTarde = $("#table_cronograma_tarde tbody"),
        tableNoche = $("#table_cronograma_noche tbody"),
        tableMNI = $("#table_listadoMNI tbody"),
        tableByRoomNumber = $("#table_listado tbody");

    var drawResponse = function(){
        $.get( "api/controller/schedule.php").done(function(serviceResponse){
            loadTables(serviceResponse);
        });
    };

    var getTemplateByRoomNumber = function(model, days, Nroaula){
        return `<tr><td>${days}</td><td>${model.class.turn}</td><td>${model.classRoom.classroomNumber}</td><td>${model.class.descriptionSubject}</td><td>${model.class.commission}</td></tr>`;
    };

    var getTemplateWithMNI = (objIMN) => {
        return `<tr><td>${objIMN.descriptionCareer}</td><td>${objIMN.descriptionSubject}</td><td>${objIMN.commission}</td><td>${objIMN.capacity}</td><td>${objIMN.turn}</td></tr>`;
    };

    var getTemplateWithClass = (objClass) => {
        return `${objClass.class.descriptionCareer}<br /> ${objClass.class.descriptionSubject}<br />
                    Comision: ${objClass.class.commission}<br />
                    Aula: ${objClass.classRoom.classroomNumber}`;
    };

    var drawTrForQuantity = (elementToAppend, quantity) => {
        if(elementToAppend.find("tr").length === 0){
            for(var i=1;i<=quantity;i++){
                elementToAppend.append(`<tr><td></td><td></td><td></td><td></td><td></td></tr>`);
            }
        }
    };

    var loadTables = function (serviceResponse) {
        if(!serviceResponse || !serviceResponse.classes || !serviceResponse.classes.byTurn || !serviceResponse.classesWithoutRooms){
            throw new Error("Response is not OK. Check server.")
        }

        var scheduleByTurn = serviceResponse.classes.byTurn,
            scheduleByRoomNumber = serviceResponse.classes.byTurn,
            classesWithoutRooms = serviceResponse.classesWithoutRooms,
            appendElement = null,
            lengthTrByTurn = {};

        tableManana.empty();
        tableTarde.empty();
        tableNoche.empty();
        tableMNI.empty();
        tableByRoomNumber.empty();

        Object.entries(scheduleByTurn).forEach(([day, classesByDay]) => {
            Object.entries(classesByDay).forEach(([turn, classesByTurn]) => {
                if(!lengthTrByTurn[turn]){
                    lengthTrByTurn[turn] = classesByTurn.length;
                } else if (classesByTurn.length > lengthTrByTurn[turn]) {
                    lengthTrByTurn[turn] = classesByTurn.length;
                }
            });
        });

        Object.entries(scheduleByTurn).forEach(([day, classesByDay]) => {
            var indexTdOfDay = Object.keys(scheduleByTurn).indexOf(day);

            Object.entries(classesByDay).forEach(([turn, classesByTurn]) => {
                if (turn === "M"){
                    appendElement = tableManana;
                } else if (turn === "T"){
                    appendElement = tableTarde;
                } else {
                    appendElement = tableNoche;
                }

                drawTrForQuantity(appendElement, lengthTrByTurn[turn]);

                classesByTurn.forEach((classTurn, indexClass) => {
                    var $trByIndex = $(appendElement.find("tr").get(indexClass)),
                        $tdByDay = $($trByIndex.find("td").get(indexTdOfDay));

                    $tdByDay.html(getTemplateWithClass(classTurn));
                });
            });

        });

        drawScheduleByRoomNumber(scheduleByRoomNumber);
        drawClassesWithoutRooms(classesWithoutRooms);
    };

    var drawScheduleByRoomNumber = (scheduleByRoomNumber) => {
        Object.entries(scheduleByRoomNumber).forEach(([days, grupoaulas]) => {
            Object.entries(grupoaulas).forEach(([Nroaula, classesAndRoomsData]) => {
                classesAndRoomsData.forEach((classAndRoomData) => {
                    tableByRoomNumber.append(getTemplateByRoomNumber(classAndRoomData, days, Nroaula));
                });
            });
        });

        if ($.fn.DataTable.isDataTable("#table_listado")) {
            $('#table_listado').DataTable().clear().draw();
            $('#table_listado').dataTable().fnDestroy();
        }

        $('#table_listado').DataTable({
            "pagingType": "simple_numbers", // "simple" option for 'Previous' and 'Next' buttons only
            "pageLength" : 10,
            "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
            "bFilter": false,
            "searching": true,
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
                "search":         "Buscar:",
            }
        });
        $('.dataTables_length').addClass('bs-select');
    };

    var drawClassesWithoutRooms = (classesWithoutRooms) => {
        Object.values(classesWithoutRooms).forEach((classWithoutRoom) => {
            tableMNI.append(getTemplateWithMNI(classWithoutRoom));
        });

        if ($.fn.DataTable.isDataTable("#table_listadoMNI")) {
            $('#table_listadoMNI').DataTable().clear().draw();
            $('#table_listadoMNI').dataTable().fnDestroy();
        }

        $('#table_listadoMNI').DataTable({
            "pagingType": "simple_numbers", // "simple" option for 'Previous' and 'Next' buttons only
            "pageLength" : 10,
            "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
            "bFilter": false,
            "searching": true,
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
                "search":         "Buscar:",
            }
        });
        $('.dataTables_length').addClass('bs-select');
    };

    var registerEvents = () => {
        /**
         * Handler para evento click en opciones del menú
         */

        $("#criterio").on("change", function(e){
            switch($(this).find(":checked").val()){
                case "Cronograma":
                    $("#cronogramas").removeClass("d-none");
                    $("#Listado").addClass("d-none");
                    $("#ListMNI").addClass("d-none");
                    break;
                case "Listado":
                    $("#cronogramas").addClass("d-none");
                    $("#Listado").removeClass("d-none");
                    $("#ListMNI").addClass("d-none");
                    break;
                case "MNI":
                    $("#cronogramas").addClass("d-none");
                    $("#Listado").addClass("d-none");
                    $("#ListMNI").removeClass("d-none");
                    break;
            }
        });
    };

    registerEvents();
    drawResponse();

    return {
        reload: drawResponse
    }
})(jQuery);
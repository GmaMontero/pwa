var SCHEDULE = (function ($) {
    var tableManana = $("#table_cronograma_mañana"),
        tableTarde = $("#table_cronograma_tarde"),
        tableNoche = $("#table_cronograma_noche"),
        tableMNI = $("#table_listadoMNI"),
        tableByRoomNumber = $("#table_listado");

    var drawResponse = function(){
        showLoading(true);
        $.get( "api/controller/schedule.php").done(function(serviceResponse){
            loadTables(serviceResponse);
            showLoading(false);
        });
    };

    var showLoading = (show) => {
        if(show){
            tableManana.find("tbody").empty();
            tableTarde.find("tbody").empty();
            tableNoche.find("tbody").empty();
            tableMNI.find("tbody").empty();
            tableByRoomNumber.find("tbody").empty();
        }

        tableManana.find("tfoot").toggle(show);
        tableTarde.find("tfoot").toggle(show);
        tableNoche.find("tfoot").toggle(show);
        tableMNI.find("tfoot").toggle(show);
        tableByRoomNumber.find("tfoot").toggle(show);
    };

    var getTemplateByRoomNumber = function(model, days, Nroaula){
        return `<tr><td>${days}</td><td>${model.class.turn}</td><td>${model.classRoom.classroomNumber}</td><td>${model.class.descriptionSubject}</td><td>${model.class.commission}</td></tr>`;
    };

    var getTemplateWithMNI = (objIMN) => {
        return `<tr><td>${objIMN.descriptionCareer}</td><td>${objIMN.descriptionSubject}</td><td>${objIMN.commission}</td><td>${objIMN.capacity}</td><td>${objIMN.turn}</td></tr>`;
    };

    var getTemplateWithClass = (objClass) => {
        return `<span style="font-size: 12px">${objClass.class.descriptionCareer}</span><br />
                <span style="font-size: 14px; font-weight: bold">${objClass.class.descriptionSubject}</span><br />
                <span style="font-size: 13px;">Aula: ${objClass.classRoom.classroomNumber} | Com: ${objClass.class.commission}</span><br />`;
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
                    appendElement = tableManana.find("tbody");
                } else if (turn === "T"){
                    appendElement = tableTarde.find("tbody");
                } else {
                    appendElement = tableNoche.find("tbody");
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
        if ($.fn.DataTable.isDataTable("#table_listado")) {
            tableByRoomNumber.DataTable().clear().draw();
            tableByRoomNumber.dataTable().fnDestroy();
        }

        Object.entries(scheduleByRoomNumber).forEach(([days, grupoaulas]) => {
            Object.entries(grupoaulas).forEach(([Nroaula, classesAndRoomsData]) => {
                classesAndRoomsData.forEach((classAndRoomData) => {
                    tableByRoomNumber.find("tbody").append(getTemplateByRoomNumber(classAndRoomData, days, Nroaula));
                });
            });
        });

        tableByRoomNumber.DataTable({
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
        if ($.fn.DataTable.isDataTable("#table_listadoMNI")) {
            tableMNI.DataTable().clear().draw();
            tableMNI.dataTable().fnDestroy();
        }

        Object.values(classesWithoutRooms).forEach((classWithoutRoom) => {
            tableMNI.find("tbody").append(getTemplateWithMNI(classWithoutRoom));
        });

        tableMNI.DataTable({
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
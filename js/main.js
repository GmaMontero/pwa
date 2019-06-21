var MAIN = (function ($) {
    var containerSchedule = $("#schedule")

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
        $(".nav-link.schedule").on("click", function(e){
            event.preventDefault();
            //Le saco la clase active a todos los links del menú
            $(".nav-link").removeClass("active");
            //Le agrego la clase active al link del menú clickeado
            $(this).addClass("active");
            //Oculto todos los div
            $(".containerModule").addClass("d-none");
            //Muestro el container correspondiente
            containerSchedule.removeClass("d-none");         
        });

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
    cargarSchedulePorAula();
    cargarSchedulePorTurno();

})(jQuery);
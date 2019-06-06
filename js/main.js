
var MAIN = (function ($) {
    var containerSchedule = $("#schedule"),
        containerAbmClass = $("#abm_class"),
        containerAbmClassroom = $("#abm_classroom"),
        formAbmClassroom = $("#form_abm_classroom"),
        formAbmClass = $("#form_abm_class")

    var materias = ["Programacion Web Avanzada",
        "Metodologias III",
        "Tecnologia de las Comunicaciones",
        "Gestion de RRHH TI",
        "Gestion y Costos",
        "Programacion Estructurada",
        "Matematica Discreta",
        "Sistemas de Representacion",
        "Etica y Deontologia Profesional",
        "Introduccion a la Programacion Web"
    ]

    var registerEvents = () => {

        $( document ).ready(function() {
            //Llamar a cargar combos de carreras y materias
        });

        $(".nav-link").on("click", function(e){
            //Oculto todos
            $(".containerModule").addClass("d-none");
            //Si es Cronograma de Horarios
            if($(this).hasClass("schedule")){
                containerSchedule.removeClass("d-none");
            }
            //Si es ABM Aulas
            if($(this).hasClass("abm_classroom")){
                containerAbmClassroom.removeClass("d-none");
            }
            //Si es ABM Cursadas
            if($(this).hasClass("abm_class")){
                containerAbmClass.removeClass("d-none");
            }
        });

        formAbmClassroom.on("submit", function(e){
            alert("hola");
        });



    }


    registerEvents();

})(jQuery);
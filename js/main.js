
var MAIN = (function ($) {
    var containerSchedule = $("#schedule"),
        containerAbmClass = $("#abm_class"),
        containerAbmClassroom = $("#abm_classroom")


    var registerEvents = () => {
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
    }


    registerEvents();

})(jQuery);
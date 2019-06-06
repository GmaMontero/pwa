
var MAIN = (function ($) {
    var containerSchedule = $("#schedule"),
        containerAbmClass = $("#abm_class"),
        containerAbmClassroom = $("#abm_classroom")


    var registerEvents = () => {
        $(".nav-link").on("click", function(e){

            if(($this).hasClass("abm_classroom")){
                $(".containerModule").hide();
                containerAbmClassroom.remove;
                //Hay que sacar y agregar la clase d-none
            }

        });
    }


    registerEvents();

})(jQuery);
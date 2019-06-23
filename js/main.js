var MAIN = (function ($) {
    var containerSchedule = $("#schedule")

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

        
    }

    /**
     * Llamada a funciones al inicio
     */
    registerEvents();


})(jQuery);
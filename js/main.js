
var MAIN = (function ($) {
    var containerSchedule = $("#schedule"),
        containerAbmClass = $("#abm_class"),
        containerAbmClassroom = $("#abm_classroom"),
        formAbmClassroom = $("#form_abm_classroom"),
        formAbmClass = $("#form_abm_class"),
        selectNameSubject = $("#nameSubject"),
        selectCareer = $("#career")

    var carreras = new Map();
    carreras.set(1, "Lic. en Gestion de Tecnologia Informatica");
    carreras.set(2, "Ingenieria en Sistemas");

    var materias = new Map();
    materias.set(1, "Programacion Web Avanzada");
    materias.set(2, "Metodologias III");
    materias.set(3, "Tecnologia de las Comunicaciones");
    materias.set(4, "Gestion de RRHH TI");
    materias.set(5,  "Gestion y Costos");
    materias.set(6,  "Programacion Estructurada");
    materias.set(7, "Matematica Discreta");
    materias.set(8, "Sistemas de Representacion");
    materias.set(9, "Etica y Deontologia Profesional");
    materias.set(10, "Introduccion a la Programacion Web");
    
    var cargarMaterias = () => {
        for (let [id, name] of materias) {
            selectNameSubject.append("<option value='"+id+"'>"+name+"</option>");
        }
    }

    var cargarCarreras = () => {
        for (let [id, name] of carreras) {
            selectCareer.append("<option value='"+id+"'>"+name+"</option>");
        }
    }

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

        formAbmClass.on("submit", function(e){
            event.preventDefault();
            //Serializo            
            var formData = formAbmClass.serializeFormJSON();
            //Lo hago JSON
            formData = JSON.stringify(formData);
            $.ajax({
                data:  formData, //datos que se envian a traves de ajax
                dataType: 'json',
                url:   'api/controller/cclass.php', //archivo que recibe la peticion
                type:  'post', //método de envio
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
                }
           });
        });

        formAbmClassroom.on("submit", function(e){
            event.preventDefault();
            //Serializo            
            var formData = formAbmClassroom.serializeFormJSON();
            //Lo hago JSON
            formData = JSON.stringify(formData);
            $.ajax({
                data:  formData, //datos que se envian a traves de ajax
                dataType: 'json',
                url:   'api/controller/classRoom.php', //archivo que recibe la peticion
                type:  'post', //método de envio
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
                }
           });
        });

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
    cargarMaterias();
    cargarCarreras();

})(jQuery);
var SCHEDULE = (function ($) {
    tableManana= $("#table_cronograma_mañana");
    tableTarde = $("#table_cronograma_tarde");
    tableNoche = $("#table_cronograma_noche");
       
    var loadTablaManana = () => {
        
        var tr; 
        $.get( "api/controller/schedule.php?type=turn")
          .done(function( data ) {
            schedule =  data.classes;
            var arrayLength = [];

            if(schedule.Lunes.hasOwnProperty('M')==true){arrayLength[0]=schedule.Lunes.M.length;}else{arrayLength[0]=0;}
            if(schedule.Martes.hasOwnProperty('M')==true){arrayLength[1]=schedule.Martes.M.length;}else{arrayLength[1]=0;}
            if(schedule.Miercoles.hasOwnProperty('M')==true){arrayLength[2]=schedule.Miercoles.M.length;}else{arrayLength[2]=0;}
            if(schedule.Jueves.hasOwnProperty('M')==true){arrayLength[3]=schedule.Jueves.M.length;}else{arrayLength[3]=0;}
            if(schedule.Viernes.hasOwnProperty('M')==true){arrayLength[4]=schedule.Viernes.M.length;}else{arrayLength[4]=0;}
            lenmax = Math.max.apply(null, arrayLength);
            
            for (var i = 0; i < lenmax; i++) {
                tr = $('<tr/>');
                if((schedule.Lunes.hasOwnProperty('M')==true) && (i <= (schedule.Lunes.M.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Lunes.M[i].class.id + "<br />Comision: " + schedule.Lunes.M[i].class.commission +  "<br />ID Aula: " + schedule.Lunes.M[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Martes.hasOwnProperty('M')==true) && (i <= (schedule.Martes.M.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Martes.M[i].class.id + "<br />Comision: " + schedule.Martes.M[i].class.commission +  "<br />ID Aula: " + schedule.Martes.M[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Miercoles.hasOwnProperty('M')==true) && (i <= (schedule.Miercoles.M.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Miercoles.M[i].class.id + "<br />Comision: " + schedule.Miercoles.M[i].class.commission +  "<br />ID Aula: " + schedule.Miercoles.M[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Jueves.hasOwnProperty('M')==true) && (i <= (schedule.Jueves.M.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Jueves.M[i].class.id + "<br />Comision: " + schedule.Jueves.M[i].class.commission +  "<br />ID Aula: " + schedule.Jueves.M[i].classRoom.classroomNumber + "</td>");
                } else {tr.append("<td></td>")}
                if((schedule.Viernes.hasOwnProperty('M')==true) && (i <= (schedule.Viernes.M.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Viernes.M[i].class.id + "<br />Comision: " + schedule.Viernes.M[i].class.commission +  "<br />ID Aula: " + schedule.Viernes.M[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                tableManana.append(tr);
            } 
        });     
    }
    
    
    
    var loadTablaTarde = () => {
        
        var tr; 
        $.get( "api/controller/schedule.php?type=turn")
          .done(function( data ) {
            schedule =  data.classes;
            var arrayLength = [];

            if(schedule.Lunes.hasOwnProperty('T')==true){arrayLength[0]=schedule.Lunes.T.length;}else{arrayLength[0]=0;}
            if(schedule.Martes.hasOwnProperty('T')==true){arrayLength[1]=schedule.Martes.T.length;}else{arrayLength[1]=0;}
            if(schedule.Miercoles.hasOwnProperty('T')==true){arrayLength[2]=schedule.Miercoles.T.length;}else{arrayLength[2]=0;}
            if(schedule.Jueves.hasOwnProperty('T')==true){arrayLength[3]=schedule.Jueves.T.length;}else{arrayLength[3]=0;}
            if(schedule.Viernes.hasOwnProperty('T')==true){arrayLength[4]=schedule.Viernes.T.length;}else{arrayLength[4]=0;}
            lenmax = Math.max.apply(null, arrayLength);
            
            for (var i = 0; i < lenmax; i++) {
                tr = $('<tr/>');
                if((schedule.Lunes.hasOwnProperty('T')==true) && (i <= (schedule.Lunes.T.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Lunes.T[i].class.id + "<br />Comision: " + schedule.Lunes.T[i].class.commission +  "<br />ID Aula: " + schedule.Lunes.T[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Martes.hasOwnProperty('T')==true) && (i <= (schedule.Martes.T.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Martes.T[i].class.id + "<br />Comision: " + schedule.Martes.T[i].class.commission +  "<br />ID Aula: " + schedule.Martes.T[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Miercoles.hasOwnProperty('T')==true) && (i <= (schedule.Miercoles.T.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Miercoles.T[i].class.id + "<br />Comision: " + schedule.Miercoles.T[i].class.commission +  "<br />ID Aula: " + schedule.Miercoles.T[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Jueves.hasOwnProperty('T')==true) && (i <= (schedule.Jueves.T.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Jueves.T[i].class.id + "<br />Comision: " + schedule.Jueves.T[i].class.commission +  "<br />ID Aula: " + schedule.Jueves.T[i].classRoom.classroomNumber + "</td>");
                } else {tr.append("<td></td>")}
                if((schedule.Viernes.hasOwnProperty('T')==true) && (i <= (schedule.Viernes.T.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Viernes.T[i].class.id + "<br />Comision: " + schedule.Viernes.T[i].class.commission +  "<br />ID Aula: " + schedule.Viernes.T[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                tableTarde.append(tr);
            } 
        });     
    }

    var loadTablaNoche = () => {
        
        var tr; 
        $.get( "api/controller/schedule.php?type=turn")
          .done(function( data ) {
            schedule =  data.classes;
            var arrayLength = [];

            if(schedule.Lunes.hasOwnProperty('N')==true){arrayLength[0]=schedule.Lunes.N.length;}else{arrayLength[0]=0;}
            if(schedule.Martes.hasOwnProperty('N')==true){arrayLength[1]=schedule.Martes.N.length;}else{arrayLength[1]=0;}
            if(schedule.Miercoles.hasOwnProperty('N')==true){arrayLength[2]=schedule.Miercoles.N.length;}else{arrayLength[2]=0;}
            if(schedule.Jueves.hasOwnProperty('N')==true){arrayLength[3]=schedule.Jueves.N.length;}else{arrayLength[3]=0;}
            if(schedule.Viernes.hasOwnProperty('N')==true){arrayLength[4]=schedule.Viernes.N.length;}else{arrayLength[4]=0;}
            lenmax = Math.max.apply(null, arrayLength);
            
            for (var i = 0; i < lenmax; i++) {
                tr = $('<tr/>');
                if((schedule.Lunes.hasOwnProperty('N')==true) && (i <= (schedule.Lunes.N.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Lunes.N[i].class.id + "<br />Comision: " + schedule.Lunes.N[i].class.commission +  "<br />ID Aula: " + schedule.Lunes.N[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Martes.hasOwnProperty('N')==true) && (i <= (schedule.Martes.N.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Martes.N[i].class.id + "<br />Comision: " + schedule.Martes.N[i].class.commission +  "<br />ID Aula: " + schedule.Martes.N[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Miercoles.hasOwnProperty('N')==true) && (i <= (schedule.Miercoles.N.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Miercoles.N[i].class.id + "<br />Comision: " + schedule.Miercoles.N[i].class.commission +  "<br />ID Aula: " + schedule.Miercoles.N[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                if((schedule.Jueves.hasOwnProperty('N')==true) && (i <= (schedule.Jueves.N.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Jueves.N[i].class.id + "<br />Comision: " + schedule.Jueves.N[i].class.commission +  "<br />ID Aula: " + schedule.Jueves.N[i].classRoom.classroomNumber + "</td>");
                } else {tr.append("<td></td>")}
                if((schedule.Viernes.hasOwnProperty('N')==true) && (i <= (schedule.Viernes.N.length-1))) {
                    tr.append("<td>" + "ID Cursada: " + schedule.Viernes.N[i].class.id + "<br />Comision: " + schedule.Viernes.N[i].class.commission +  "<br />ID Aula: " + schedule.Viernes.N[i].classRoom.classroomNumber + "</td>");
                }else {tr.append("<td></td>")}
                tableNoche.append(tr);
            } 
        });     
    }

    var loadListadoMaterias = () => {

        var $tbody = $("#table_listado tbody");

        $tbody.empty();
        $.get( "api/controller/schedule.php?type=room")
          .done(function( data ) {
            var classes = data.classes,
                classesWithoutRooms = data.classesWithoutRooms;

                var template = function(model, days, Nroaula){
            /**     return `<tr><td>${"Aula: " + model.classRoom.classroomNumber }</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td></tr>`; */
                    return `<tr><td>${days}</td><td>${model.class.turn}</td><td>${model.classRoom.classroomNumber}</td><td>${model.class.id}</td><td>${model.class.commission}</td></tr>`;
              };

                Object.entries(classes).forEach(([days, grupoaulas]) => {

                    Object.entries(grupoaulas).forEach(([Nroaula, classesAndRoomsData]) => {
                        classesAndRoomsData.forEach((classAndRoomData) => {
                            $tbody.append(template(classAndRoomData, days, Nroaula));                           
                        });
                    });
                });

                $('#table_listado').DataTable({
                    "pagingType": "simple_numbers", // "simple" option for 'Previous' and 'Next' buttons only
                    "pageLength" : 5,
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
          });
    }

    var loadListadoMNI = () => {

        var $tbody = $("#table_listadoMNI tbody");

        $tbody.empty();
        $.get( "api/controller/schedule.php?type=room")
          .done(function( data ) {
            var classes = data.classes,
                classesWithoutRooms = data.classesWithoutRooms;

                var template = function(model){
            /**     return `<tr><td>${"Aula: " + model.classRoom.classroomNumber }</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td><td>${"ID Cursada: " + model.class.id + " Comision: " + model.class.commission}</td></tr>`; */
                    return `<tr><td>${model.career}</td><td>${model.descriptionSubject}</td><td>${model.commission}</td><td>${model.capacity}</td><td>${model.turn}</td></tr>`;
              };


                Object.entries(classesWithoutRooms).forEach(([nro, classesdata]) => {
                    $tbody.append(template(classesdata));   
                });


                $('#table_listadoMNI').DataTable({
                    "pagingType": "simple_numbers", // "simple" option for 'Previous' and 'Next' buttons only
                    "pageLength" : 5,
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
          });
    }

    loadTablaManana();
    loadTablaTarde();
    loadTablaNoche();
    loadListadoMaterias();
    loadListadoMNI();
})(jQuery);
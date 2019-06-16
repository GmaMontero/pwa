# Advanced Web Programming
Repository for advanced web programming

Log directory: 
```
/var/log/apache2
```

Restart service:
```
sudo service apache2 restart
```

## Application Architecture

1) Frontend envia los datos desde un 'form' serializados en formato JSON.

2) Los controladores dentro de /api/controller atienden estos envios request provenientes del front y hacen algo.

3) Los servicios son llamados desde cada controlador. El metodo a ejecutar dependera principalmente desde el method (GET, POST, PUT, etc) ejecutado sobre el controlador.

4) El resultado de la ejecucion de los servicios genera una response code (200, 201, 405, 404, etc), para que el front se entere sobre los cambios o errores.

---

directory(api/controller): Estos archivos reciben los request desde el front. Mediante los metodos se definen las operaciones de persistencia. Los codigos de estado definen el resultado de estos rq.

directory(api/model): Estos archivos son clases para modelar todos los posibles resultados de los controllers, tanto de los datos recibidos como de las respuestas.

directory(api/service): Estos archivos son la conexion entre los controladores y la base de datos, ahi debera ir nuestra logica de negocio.

directory(api/shared): Estos archivos contienen cosas de uso compartido entre todos los anteriores y utilidades.


### Installation php and apache server
```
sudo apt install apache2 php7.2 libapache2-mod-php7.2
sudo a2query -m php7.2
sudo a2enmod php7.2
sudo service apache2 restart
```

### For add all untracked files
```
git add .
```

### For commit
```
git commit -am "{mensaje}"
```

### For push
```
git push
```

### For create branch
```
git checkout -b {nombre_branch}
git push -u origin {nombre_branch}
```

### For stash changes locally
```
git stash save "{descripcion}"
```

### For apply stash
```
git stash list
git stash apply stash@{index_stash}
```

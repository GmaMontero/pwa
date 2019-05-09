# Advanced Web Programming
Repository for advanced web programming

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

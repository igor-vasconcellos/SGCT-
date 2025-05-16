#!/bin/bash

# Remove qualquer instalação existente
sudo apt-get remove --purge mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*
sudo apt-get autoremove
sudo apt-get autoclean
sudo apt-get update

# Instala o MySQL
sudo apt-get install mysql-server

# Configura o diretório e as permissões do socket
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
sudo chmod 777 /var/run/mysqld

# Inicia o MySQL
sudo service mysql start

# Altera o usuário root para usar mysql_native_password
sudo mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';"
sudo mysql -u root -e "FLUSH PRIVILEGES;"

echo "MySQL configurado com sucesso!"

#Depois de executar de:
#chmod +x setup-mysql.sh
#./setup-mysql.sh

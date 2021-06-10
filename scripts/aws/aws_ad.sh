# Swap
#sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=4096
#sudo /sbin/mkswap /var/swap.1
#sudo chmod 600 /var/swap.1
#sudo /sbin/swapon /var/swap.1
#sudo vi /etc/fstab
# Add to fstab /var/swap.1   swap    swap    defaults        0   0

# LAMP
#sudo apt update
#sudo apt upgrade
#sudo apt install zip unzip php-zip php7.4-curl php7.4-gd php7.4-mbstring php-xml lamp-server^ -y

# Git
#cd /var/www
#git config --global core.fileMode false
#git config --global user.email "dave@answerglobal.com"
#git config --global user.name "captaindav"
#sudo git clone git@github.com:captaindav/vue-outline.git

# Composer
#cd ~
#curl -sS https://getcomposer.org/installer -o composer-setup.php
#sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
#cd /var/www/vue-outline/drupal
#sudo composer install

# NODE
#cd ~
#curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh -o install_nvm.sh
#bash install_nvm.sh
#source ~/.profile
#nvm --version  =>NOT WORKING
#nvm install 12.16.1
#node -v

# Vue
#cd /var/www/vue-outline
#npm install

# Owner
#sudo chown -R www-data:www-data /var/www/vue-outline

# Database
# CREATE DATABASE drupal;
# CREATE USER 'drupal8'@'localhost' IDENTIFIED BY 'drupal8';
# GRANT ALL PRIVILEGES ON * . * TO 'drupal8'@'localhost';
# FLUSH PRIVILEGES;


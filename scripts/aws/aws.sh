# SSH
#ssh-keygen -t ed25519 -C "dave@answerglobal.com"
#cd .ssh
#cat id_ed25519.pub

# LAMP
#sudo apt update
#sudo apt upgrade
#sudo apt install zip unzip php-zip php7.4-curl php7.4-gd php7.4-mbstring php-xml lamp-server^ -y

# Composer
curl -sS https://getcomposer.org/installer -o composer-setup.php
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Git
git config --global core.fileMode false
git config --global user.email "dave@answerglobal.com"
git config --global user.name "captaindav"

# NODE
#cd ~
#curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh -o install_nvm.sh
#bash install_nvm.sh
#source .bashrc
##source ~/.profile
##nvm --version  =>NOT WORKING
##nvm install 12.16.1
#nvm install --lts
#node -v

# Database
#CREATE DATABASE drupal;
#CREATE USER 'drupal9'@'localhost' IDENTIFIED BY 'drupal9';
#GRANT ALL PRIVILEGES ON * . * TO 'drupal9'@'localhost';
#FLUSH PRIVILEGES;

# Clone
cd /var/www
git clone git@github.com:captaindav/vue-outline.git
chown -R www-data:www-data /var/www/vue-outline
git clone git@github.com:webol/vuer

# Install
cd vue-outline
npm i
cd packages/drupal
composer install


# Swap
#sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=4096
#sudo /sbin/mkswap /var/swap.1
#sudo chmod 600 /var/swap.1
#sudo /sbin/swapon /var/swap.1
#sudo vi /etc/fstab
# Add to fstab /var/swap.1   swap    swap    defaults        0   0

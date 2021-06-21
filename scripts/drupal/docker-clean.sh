lando poweroff
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q) -f
docker rmi -f $(docker images -a -q)
docker system prune
sudo rm -rf /usr/local/bin/lando
/Applications/Docker.app/Contents/MacOS/Docker --uninstall
sudo rm -rf /Applications/Docker.app
sudo rm -rf ~/.lando
sudo rm -rf ~/.docker
sudo rm -rf ~/Library/Application\ Scripts/com.docker.helper
sudo rm -rf ~/Library/Caches/com.docker.docker
sudo rm -rf ~/Library/Containers/com.docker.docker
sudo rm -rf ~/Library/Containers/com.docker.helper
sudo rm -rf ~/Library/Group\ Containers/group.com.docker

# For manual removal for the Mac UI, follow these steps:
# 1) Go > Utilities > Activity Monitor. Find each process that has
# lando or docker in their name and click the 'Quit Process' button.

# 2) Go to Applications, find the Docker app, Move to Trash then Empty Trash.

# 3) Find the Library/Applications Scripts folder, select it and look for
# “com.docker.helper” and Move to Trash.
#   Do the same for:
#   Library/Caches: com.docker.docker
#   Library/Containers: com.docker.docker, com.docker.helper
#   Library/Group Containers: group.com.docker


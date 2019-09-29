# Docker Tutorial

Tutorial created by Pedro for guys from Skills Figters. 

## Propper Docker Installation

Install docker using `snap` store.
```
sudo apt update
sudo apt install snapd
sudo snap install docker
```
According to [post installation steps](https://docs.docker.com/install/linux/linux-postinstall/) you will not be able to run docker
without `sudo`. First create new group called `docker`, then append `-a` group `-G` `docker` to current `$USER`.

```
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker 
```

Verify that you can run docker commands without sudo.
```
docker run hello-world
```

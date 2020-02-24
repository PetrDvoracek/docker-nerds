# Docker Tutorial

Tutorial created by Pedro for guys from Skills Figters. The goal is to provide comprehensive materials which describes 
*must know* stuff about docker. [lazydocker](https://github.com/jesseduffield/lazydocker#requirements) is great docker and docker-compose tool, you definitely have to check it out. Recommended articles: [Deploying ReactJS With Docker](https://medium.com/@mannycodes/deploying-reactjs-with-docker-ac16728c0896).


## Propper Docker Installation

Install docker using `snap` store. DONT DO THIS, USE OFFICIAL GUIDE https://docs.docker.com/install/linux/docker-ce/ubuntu/
```
sudo apt update
sudo apt install snapd
sudo snap install docker
```
Do not forget to add `snap` to the PATH varialbe - add following to the `~/.bashrc` file `export PATH=$PATH:/snap/`
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
## Create .gitignore

use [gitignore](http://gitignore.io/) to generate full .gitignore file.

## Hello Docker
This chapter is based on [official nodejs tutorial](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/)
Checkout to `2-hello-docker` branch and build the docker image. You can check the list of docker images running 
`docker images`.
```
git checkout 2-hello-docker
docker build -t <imageName> .
docker run -p 49160:8080 -d <imageName>
```
You have created the image with `docker build`, then you ran it `docker run` on specific port. The port notation in docker 
is following
```
49160:8080 <=> physical machine : container
```
so in this case, your physical machine's (PC) port `49160` is connected to container's port `8080`. You can visit https://127.0.0.1:49160 and you should see `Hello World` which is not suprising. You should know how to get the same in *headless* mode - without terminal which is really cool while debugging the connection between multiple containers on [docker network](https://docs.docker.com/network/).
```
curl -i localhost:49160

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
Date: Sun, 29 Sep 2019 20:20:01 GMT
Connection: keep-alive

Hello world
```


You can check the number of running **containers** with
```
pedro@pedro-pc:~$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
bda7d61e678b        hello-docker        "docker-entrypoint.s…"   40 seconds ago      Up 38 seconds       8080/tcp            angry_bell
```
and kill the containers with `docker kill <CONTAINER ID`. If you are not able to kill the container and you ran the command
with `sudo`, shame on you and check [docker post installation steps](https://docs.docker.com/install/linux/linux-postinstall/). You can log into the container and run `kill 1` **do not use this command on your physical machine!**

### Log into Container
Sometimes you want to log into the running container for example to check if some commands works or to check if other container's are reachable by ip adress etc. Check the following command, `exec` - execute,  `-it` - interactive mode, `/bin/bash` - which script you want to run. If you use minimal Linux distribution ([Alpine Linux](https://alpinelinux.org/)) make sure that you use the second command, the `ash` interpreter.
```
 docker exec -it <container id> /bin/bash
 docker exec -it <container id> /bin/ash

```
Now log into the container which you ran in the previos steps and check what you will get any response from port `8080`
```
curl -i localhost:8080
```
You should get the same as in the previous steps. This is useful while debugging multiple containers on docker network.



### Docker Images and Containers
The relation between image and container is similar to class and instance. Once you build the image of your app, you can run
theoretically as many instances of it with `docker run <imageName>` as you want from whatever path you want. 

## Developing in Docker Container

You can use docker container as a developing environment. This is extremely useful if you develop application which depends on other Linux tools and it configuration (such as NGINX). 

## docker-compose 

It is easy to run docker container, right? just `docker run -p 49160:8080 -d <imageName>` as in preview chapter. It is easy in this case but if you want to `compose` the application from more containers connected via the docker network, you should definitely use docker-compose. 

Lets start with easy example - just create `docker-compose.yml` so you get rid of port definitions. see branch `git checkout 3-docker-compose`

```
#docker-compose.yml
version: '3'
services:
  web:
    build: .
    ports:
      - "49160:8080"

```
run `docker-compose build` and `docker-compose up` and see `http://127.0.0.1:49160/`.



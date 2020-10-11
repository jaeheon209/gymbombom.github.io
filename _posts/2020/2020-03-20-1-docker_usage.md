---
layout: post
title: docker 사용법
tags :
    - docker
---

## 개요
* docker 사용법 정리

---
## 설치

```shell
sudo wget -qO- https://get.docker.com/ | sh 
# Docker는 리눅스 배포판 종류를 자동으로 인식하여 Docker 패키지를 설치해주는 스크립트를 제공
# 스크립트로 Docker를 설치하면  hello-world 이미지도 자동으로 설치됨.
# hello-world 이미지가 필요없다면 삭제해야함.
#$ sudo docker rm `sudo docker ps -aq`
#$ sudo docker rmi hello-world 

# amazon linux에 docker  설치
$ sudo yum update -y;
$ sudo amazon-linux-extras install docker;

# centos7 에 docker 설치
$ sudo yum -y install docker docker-registry;

# docker daemon이 기동되어 있지 않다면 기동해 준다
$ sudo service docker restart;

```

```shell
#dial unix /var/run/docker.sock: connect: permission denied 해결방법
$ sudo usermod -a -G docker $USER
#or
$ sudo usermod -a -G docker `whoami`;
#or 
$ sudo chmod 666 /var/run/docker.sock;

```

---

## 설정

---

## 사용예
* network 생성

```shell
# docker network create --submit [network_ip]/[subnet] [network_name]
$ docker network create --subnet 14.63.156.0/24 hes-network 
```

* docker container 를 같은 network 로 묶는방법

```shell
# docker run -dit --privileged  --name [contaner명] --network [network명] --ip [network에서 할당할 ip] --add-host=[/etc/hosts에 등록할 host명] [image명] /bin/bash init
$ docker run -dit --privileged -d --name hadoop --network centos-cluster -p 12345:8088 --ip 10.0.3.2 --add-host=hadoop:10.0.3.2 --add-host=hadoop01:10.0.3.3 --add-host=hadoop02:10.0.3.4 --add-host=hadoop03:10.0.3.5 centos7/hadoop-cluster--이미지명 /bin/bash init
```

* docker exec 명령으로 nohup 실행방법

```shell
# docker exec 사용 시, 내부 컨테이너안으로 nohup 명령어를 실행하는 방법
# docker exec -it running_container bash -c 'nohup ./main.sh &> output & sleep 1'
# docker exec  vsftpd /bin/ash -c '/usr/bin/nohup /usr/sbin/vsftpd  /home/vsftpd/share/conf/vsftpd.conf >> /home/vsftpd/share/logs/vsftpd.log &> output & sleep 1';
```

---

## 경험

---

## Links
[Why docker exec is killing nohup process on exit?](https://stackoverflow.com/questions/33732061/why-docker-exec-is-killing-nohup-process-on-exit){: target="_blank"}

---













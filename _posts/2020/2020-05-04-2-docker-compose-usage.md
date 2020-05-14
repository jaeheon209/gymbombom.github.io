---
layout: post
title: docker-compose 설치 및 사용법
tags :
    - docker
    - docker-compose
---

## 개요
* docker-compose 설치 및 사용법을 기록 

---

## 설치

```shell
# 설치
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose;

# 권한
$ sudo chmod +x /usr/local/bin/docker-compose;
```

---

## docker-compose.yml 파일 작성법

```yml
version: "1.25.5"

services:
  blog:
    image: jekyll/jekyll:latest
    command: jekyll serve --force_polling --drafts --livereload --trace
    ports:
      - "4000:4000"
    volumes:
	  - ".:/srv/jekyll"
	  
networks: 
	ipam: 
		driver: mydriver 
			config: 
				subnet: 172.20.0.0/16 
				ip_range: 172.20.5.0/24 
				gateway: 172.20.5.1

networks: 
	mynetwork: 
		driver: overlay 
		driver_opts: 
			subnet: "255.255.255.0" 
			IPAdress: "10.0.0.2"

```

- version : docker-compose 버전
- services : docker-compose는 여러개의 컨테이너를 띄울 수 있음. 하단 블록에 기입
- blog : 실행할 컨테이너의 이름
- image : docker 이미지
- command : 컨테이너가 run 하면 실행할 명령
- port : {local_port}:{container_port} , 로컬 4000번 port를 컨테이너의 4000번 포트와 매핑
- volume : {local_dir}:{container_dir}
- networks : 네트워크 설정
- ipam : ip manager를 사용가능하다.
- driver : 드라이버명 지정
---

## 사용예

* 실행

```shell
$ docker-compose up;

#Daemon으로 백그라운드에서 실행
$ docker-compose up -d;
```

* 종료

```shell
$ docker-compose down;
```

---

## 경험

---

## Links
[java - telnet 대신 포트 방화벽 확인하기 port check](https://goni9071.tistory.com/m/78)<br>
[DOCKER COMPOSE 기초사용법](https://seulcode.tistory.com/238)<br>
[docker compose yaml 파일 작성](https://hoony-gunputer.tistory.com/entry/docker-compose-yaml-%ED%8C%8C%EC%9D%BC-%EC%9E%91%EC%84%B1)<br>

---













---
layout: post
title: docker 사용법
tags :
    - docker
---

## 개요
* docker 사용법 정리

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


---

## 경험

---

## Links

---













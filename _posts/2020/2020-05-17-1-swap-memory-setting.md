---
layout: post
title: Linux swap memory 설정방법
tags :
    - swap
    - swapMemory
    - linux
---

## 개요
* Linux swap memory 관리 및 설정법을 기록한다. 

---

## 설정

* swapMemory 확인

```shell
# swapmemory 설정 상태를 확인한다.(아래 command 3개중 하나로)
$ swapon -s;
$ free;
$ cat /proc/swaps;
```

* swap 파일 생성

```shell
# sudo dd if=/dev/zero of=<swapfilePath> bs=1024 count=<fileSize>
# /var/swapfile 로 1G swapfile 을 생성한다. (count 는 KB단위)
$ sudo dd if=/dev/zero of=/var/swapfile bs=1024 count=1000000;
```


* swapfile 로 포멧

```shell
# mkswap <swapfilePath>
$ sudo mkswap /var/swapfile;
```

* swapfile 권한변경

```shell
$ sudo chmod 0600 /var/swapfile;
```


* swapfile 활성화

```shell
# sudo swapon <swapfilePath>
$ sudo swapon /var/swapfile;
```

---

## 사용예

* swapfile 비활성화

```shell
# swapoff <swapfilePath>
$ swapoff /home/swapfile;
```

* 재부팅시에도 swap 파일 활성화

```shell
# echo "swapon <swapfilePath>" >> /etc/rc.d/rc.local;
$ echo "swapon /var/swapfile" >> /etc/rc.d/rc.local;
```

---

## 경험
* 라즈베리파이3에서 swap memory 설정
```shell
# sudo vi /etc/dphys-swapfile

# swapfile위치설정
CONF_SWAPFILE=/var/swapfile

#swap size설정
CONF_SWAPSIZE=4000

# max swap size 설정
CONF_MAXSWAP=4000
```

---

## Links

---
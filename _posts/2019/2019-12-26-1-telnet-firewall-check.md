---
layout: post
title: 방화벽 open 여부 확인방법
tags :
    - telnet
    - 방화벽
    - firewall
---

##### 1. telnet 을 이용하여 방화벽 open 여부 확인하기

아래와 같이 connected to ... 가 뜬다면 방화벽이 open 되어있는 상태이다.
```shell
[gymbombom@localhost~]$ telnet 192.168.31.104 9922
Trying 192.168.31.104..
Connected to 192.168.31.104..
Escape character is '^]'.
```
  

Trying 에서 더이상 진행되지 않는다면 open 된 port 가 아니거나 방화벽 open이 되지 않은것이다.
```shell
[gymbombom@localhost~]$ telnet 192.168.31.104 8822
Trying 192.168.31.104..

```
  

Connection refused 가 뜬다면 방화벽은 open 되어 있으나 기타 다른 원인으로 연결이 불가능한 경우이다.
```shell
[gymbombom@localhost~]$ telnet 192.168.31.104 7722
Trying 192.168.31.104...
telnet: Unable to connect to remote host: Connection refused 
```
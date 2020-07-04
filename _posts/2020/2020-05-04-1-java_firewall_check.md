---
layout: post
title: java를 이용하여 방화벽 체크
tags :
    - 방화벽
    - firewall
---

## 개요
* java를 이용하여 방화벽을 체크힌다.(telnet 을 사용할수 없는 환경에서 유용하다.)

---

## 소스코드

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.UnknownHostException;
 
public class FirewallCheck {
	
  public static void main(String[] args) throws UnknownHostException, IOException {
    SocketAddress endpoint =  new InetSocketAddress(args[0], Integer.valueOf(args[1]));

	Socket socket = new Socket();
    socket.connect(endpoint, 3000);
    System.out.println("connect SUCCESS!!!");
  }
}
```

---

## 컴파일

```shell
$ javac FirewallCheck.java;
```

---

## 실행

```shell
# java FirewallCheck [ip] [port]
$ java FirewallCheck 111.222.333.444 3000;
```

---

## 사용예

* 방화벽 open 상태이고, port Listen 중일때 

```java
connect SUCCESS!!!
```

* 방화벽은 open 상태이나, port listen 중이 아닐때

```java
Exception in thread "main" java.net.ConnectException: Connection refused: connect
	at java.net.DualStackPlainSocketImpl.waitForConnect(Native Method)
	at java.net.DualStackPlainSocketImpl.socketConnect(Unknown Source)
	at java.net.AbstractPlainSocketImpl.doConnect(Unknown Source)
	at java.net.AbstractPlainSocketImpl.connectToAddress(Unknown Source)
	at java.net.AbstractPlainSocketImpl.connect(Unknown Source)
	at java.net.PlainSocketImpl.connect(Unknown Source)
	at java.net.SocksSocketImpl.connect(Unknown Source)
	at java.net.Socket.connect(Unknown Source)
	at jExample.portCheck.main(portCheck.java:18)
```

* 방화벽이 open 상태가 아닐때

```java
Exception in thread "main" java.net.SocketTimeoutException: connect timed out
	at java.net.DualStackPlainSocketImpl.waitForConnect(Native Method)
	at java.net.DualStackPlainSocketImpl.socketConnect(Unknown Source)
	at java.net.AbstractPlainSocketImpl.doConnect(Unknown Source)
	at java.net.AbstractPlainSocketImpl.connectToAddress(Unknown Source)
	at java.net.AbstractPlainSocketImpl.connect(Unknown Source)
	at java.net.PlainSocketImpl.connect(Unknown Source)
	at java.net.SocksSocketImpl.connect(Unknown Source)
	at java.net.Socket.connect(Unknown Source)
	at jExample.portCheck.main(portCheck.java:18)
```

---

## 경험

---

## Links
[java - telnet 대신 포트 방화벽 확인하기 port check](https://goni9071.tistory.com/m/78){: target="_blank"} 

---

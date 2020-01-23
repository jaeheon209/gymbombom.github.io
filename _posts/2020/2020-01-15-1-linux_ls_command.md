---
layout: post
title: linux, unix ls 파일 정렬 옵션
tags :
    - linux
    - unix
    - shell
---

### 파일크기별 정렬

* 내림차순으로 정렬
```shell
pi@raspberrypi:/bin $ ls -alS
합계 7004
-rwxr-xr-x  1 root root 912712  5월 16  2017 bash
-rwxr-xr-x  1 root root 395336 12월  3  2017 udevadm
-rwxr-xr-x  1 root root 379272 11월 24  2017 ip
...
lrwxrwxrwx  1 root root      4  1월 11  2017 rnano -> nano
lrwxrwxrwx  1 root root      4  1월 24  2017 sh -> dash
lrwxrwxrwx  1 root root      4  1월 24  2017 sh.distrib -> dash
```

* 오름차순 정렬
```shell
pi@raspberrypi:/bin $ ls -alSr
합계 7004
lrwxrwxrwx  1 root root      4  1월 24  2017 sh.distrib -> dash
lrwxrwxrwx  1 root root      4  1월 24  2017 sh -> dash
lrwxrwxrwx  1 root root      4  1월 11  2017 rnano -> nano
...
-rwxr-xr-x  1 root root 379272 11월 24  2017 ip
-rwxr-xr-x  1 root root 395336 12월  3  2017 udevadm
-rwxr-xr-x  1 root root 912712  5월 16  2017 bash
```


### 시간별 정렬

* 최신파일부터 내림차순 정렬
```shell
pi@raspberrypi:/bin $ ls -alt
합계 7004
drwxr-xr-x 22 root root   4096 10월 11  2018 ..
drwxr-xr-x  2 root root   4096  6월 27  2018 .
lrwxrwxrwx  1 root root     24  6월 27  2018 netcat -> /etc/alternatives/netcat
...
-rwxr-xr-x  1 root root   2762  1월 11  2016 unicode_start
-rwxr-xr-x  1 root root  26500  9월  2  2015 fuser
-rwxr-xr-x  1 root root  22180  9월 16  2014 nc.traditional
```

* 과거파일부터 오름차순 정렬
```shell
pi@raspberrypi:/bin $ ls -altr
합계 7004
-rwxr-xr-x  1 root root  22180  9월 16  2014 nc.traditional
-rwxr-xr-x  1 root root  26500  9월  2  2015 fuser
-rwxr-xr-x  1 root root   2762  1월 11  2016 unicode_start
...
lrwxrwxrwx  1 root root     24  6월 27  2018 netcat -> /etc/alternatives/netcat
drwxr-xr-x  2 root root   4096  6월 27  2018 .
drwxr-xr-x 22 root root   4096 10월 11  2018 ..
```

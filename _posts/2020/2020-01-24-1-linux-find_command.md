---
layout: post
title: linux, unix find 명령
tags :
    - linux
    - unix
---

## 개요
* find 명령의 다양한 옵션에 대하여 알아본다.

---

## 사용예
* 3일전부터 현재시간까지 수정된 파일리스트 보기

```shell
# /home/pi/share 디렉토리 하위에서,  type이 file이고, 수정일자가 3일 이내인 파일목록 표시
$  find /home/pi/share -type f -mtime -3 -print

# /home/pi/share 디렉토리 하위에서,  type이 directory이고, 수정 혹은 파일속성변경이 3일 이내에 일어난 
# 파일목록을 ls 형식으로 표시
$  find /home/pi/share -type d -ctime -3 -ls

#  파일 및 디렉토리 구분없이 access time이 3일 이내인 것들 검색
$  find /home/pi/share  -atime -3 -print
```

* 비어있는 파일(크기가 0), 디렉토리 찾기

```shell
$ find /home/pi/share  -empty -print

# 크기가 0 인 파일만 출력
$ find /home/pi/share -empty -type f

# 비어있는 디렉토리 출력
$ find /home/pi/share -empty -type d

```

* 특정 소유자의 파일 검색

```shell
$ find /home/pi/share -uid 500 
```

* 특정파일 검색

```shell
#확장자가  .sh인 파일검색
$ find /home -name *.sh

# 파일명에 user가 포함된 파일 검색
$ find /home -name *user*

# user가 포함된 파일을 검색하여 바로 삭제
$ find /home -name *user* --exec rm -rf {} \;
```



---

## 경험

---

## Links
[리눅스 find - 파일 검색](https://webdir.tistory.com/155){: target="_blank"}  
[리눅스 n일 이내에 수정된 파일 찾기](https://zetawiki.com/wiki/리눅스_n일_이내에_수정된_파일_찾기){: target="_blank"}

---













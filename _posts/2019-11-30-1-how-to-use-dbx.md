---
layout: post
title: dbx 사용법
tags :
    - Clang
    - linux
    - unix
#feature_text: |
  ## Hadoop SingleNode 설치
#feature_image: "https://picsum.photos/2560/600?image=733"
---

> 운영 시스템에서 프로그램을 실행하고 디버그하기 위한 환경을 제공한다.
* C, C++, Pascal ,FORTRAN  디버깅 제공
*  Object 및 Core 파일에 대한 디버깅 제공
* compile 시 -g Flag로 compile 되어 있어야 dbx로 디버깅이 가능하다.

# 사용 예제 및 사용법

### run 중에  process 에 Debug 하기 위하여 진입
```shell
# dbx - <PID> 또는 dbx attach <PID>
$ dbx - 11325
```
### Break Point 설정
```shell
# (dbx) stop at <filename>:<line>  파일의 라인을 Break Point로 설정
$ (dbx) stop at iter.c:6

# dbx) stop in <function Name>  function 을 Break Point 로 설정
$ (dbx) stop in GetNum  #C 함수의 경우
$ (dbx) stop in Equip::GetNum #CPP 함수의 경우

# $ (dbx) stop at <filename>:<line>  <condition>  특정 조건에서으로 Break Point 설정
$ (dbx) stop at iter.c:6  -if i == 5
$ (dbx) stop at iter.c:6  -if strcmp(test,"test") == 0
``` 

### break Point 에서 기다리기
```shell
# (dbx) continue
$ (dbx) continue
# 또는
$ (dbx) c
```

### 라인이동
```shell
# (dbx) n # 다음 1라인 이동
$ (dbx) n

# (dbx) n <count> count 만큼 라인이동
$ (dbx) n 10 # 10라인 이동
```

### 현재실행위치 확인 (stack Trace 확인)
```shell
# (dbx) where
$ (dbx) where
```

### 변수에 할당된 값 확인 
```shell
# (dbx) print <var>  또는 p <var>
$ (dbx) p var

# (dbx)info locals #local 변수에 할당 모든 값 확인
$ (dbx) info locals

# (dbx)info variables #전역변수에 할당 모든 값 확인
$ (dbx) info variables

# display <variables> #변수 값 계속 출력
$ (dbx) display var

#   watch <variables> # 변수 값이 바뀌는 시점에서 Break point 
$ (dbx) watch var
$ (dbx) continue

# (dbx)whatis <variables> #변수타입 출력
$ (dbx) whatis var
```

### 변수에 값 할당
```shell
# (dbx) assign var = <value>
$ (dbx) assign var = 'A'
$ (dbx) assign var = var1
```

###  현재 라인의 함수 안쪽으로 진입
 ```shell
 # (dbx) s
 $ (dbx) s
 ```

 ### 현재 실행지점의 source code 보기
 ```shell
 # $ (dbx) list 또는 (dbx) l
 $ (dbx) l
 ```
### 반복문 빠져나오기 
```shell
# $ (dbx)until 
$ (dbx) until
```

### 현재 실행된 함수빠져나오기
```shell
# $ (dbx)return #현재 진입한 함수에서 바로 빠져나옴.(함수 실행하지 않음)
$ (dbx) return

# (dbx) finish #함수가 끝나는 지점으로 이동(현재 함수 실행함.)
$ (dbx) finish
```

## dbx 종료
```shell
# (dbx) quit
$ quit
```

이정도만 알아도 거의 모든 상황에서 디버깅이 가능하다.


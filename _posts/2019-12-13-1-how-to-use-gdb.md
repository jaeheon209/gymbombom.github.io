---
layout: post
title: gdb 사용법
tags :
    - Clang
    - linux
    - unix
---

>  Unix 기반 시스템에서 C, C++, 포트란 환경을 디버깅하기 위한 툴이다.
*  C, C++, Modula-2 등 여러 환경의 프로그래밍 언어를 지원한다.
* coredump 파일 분석 및 디버깅 가능

## 사용예제
##### Debug할 process에 진입하기
실행중인 process라면,실행중인 pid로 gdb debug 모드로 진입할수 있다.
```shell
# pid가 12345 인 process 에 debug모드로 진입
# gdb - <pid> 또는 gdb attach <pid>
[aws1]$ gdb - 12345;
[aws1]$ gdb attach 12345;
```

##### binary를 Debug모드로 실행
실행가능한 binary 혹은 프로그램을 debug mode로 실행할수 있다. 
```shell
# gdb <program>
[aws1]$ gdb a.out;
```

##### Break Point설정
```shell
# line 에 Break Point설정
# (gdb)b <filename>:<line> 
[aws1]$ (gdb)b test.c:90
 
# GetNum() function 진입지점에 Break Point 설정
# (gdb) b <function> 혹은 break <function> 
[aws1]$ (gdb)b GetNum 

# cpp function 일 경우, 아래와 같이 Break Point 설정
[aws1]$ (gdb)b Equip::GetNum

# 특정 조건에 Break Point 설정
# iter.c 파일의 6 line 에서 i == 5일때 Break
[aws1]$ (gdb)b iter.c:6  if i == 5

# 이런조건으로 Break point도 가능함. 
[aws1]$ (gdb)b iter.c:6 if strcmp(car,".porsche")==0

#모든 Break Point 제거
[aws1]$ (gdb)delete all

# Break Point 출력
[aws1]$ (gdb)info break

# 1번 Break Point 삭제
[aws1]$ (gdb)delete 1
```

## 대략적인 사용법
```shell
[aws1]$ (gdb) r(run) #프로그램 재실행(segmentation fault 발생시 오류지점 [aws1]확인가능)
[aws1]$ (gdb) cont(continue)  #프로그램 계속실행 (다음 Break Point가 [aws1]나올때까지 실행)
[aws1]$ (gdb) return # 함수리턴하고 빠져나오기
[aws1]$ (gdb) return <value> #임의값으로 리턴하고 함수빠져나오기
[aws1]$ (gdb) finish #함수 마지막 지점으로 이동
[aws1]$ (gdb) u(until) #루프 빠져나오기
[aws1]$ (gdb) l(list) #현재 위치 기준으로 소스 10줄 출력
[aws1]$ (gdb)set listsize <size> #소스출력시 라인사이즈 지정
[aws1]$ (gdb)step(s) #소스 한줄씩 실행 함수를 포함하면 함수 안으로 진입
[aws1]$ (gdb) bt # Back Trace 프로그램 스택을 역으로 탐색
[aws1]$ (gdb) up #상위 스택프레임으로 이동
[aws1]$ (gdb) display <variables name> # 단계가 진행될때마다 변수 자동 [aws1]디스플레이
[aws1]$ (gdb) undisplay <variables name> # display 취소
[aws1]$ (gdb)info locals #local 변수들 값 모두 출력
[aws1]$ (gdb)info variables #프로그램 내 모든변수 값 출력
[aws1]$ (gdb) set variable = "aaa"; #변수에 값 할당 
[aws1]$ (gdb) set p_variable = 0x00; #pointer 변수에 NULL pointer로 값 할당
[aws1]$ (gdb) set var variable=47; #?????
[aws1]$ (gdb) whatis variable # 변수타입확인
[aws1]$ (gdb) q(quit) #종료

```



* 참고사이트<br>
[Debugging with GDB](https://sourceware.org/gdb/onlinedocs/gdb/index.html#SEC_Contents){: target="_blank"}


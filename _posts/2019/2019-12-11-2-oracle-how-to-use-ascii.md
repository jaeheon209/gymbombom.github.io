---
layout: post
title: oracle DB에서 ASCII 문자열 사용방법
tags:
    - oracle
    - DB
---

## ORACLE DB 에서 ascii 문자열 사용방법
oracle DB에 데이터 입력시 ascii코드가 입력되는 현상이 있어, 동일 테스트 환경을 구축하는 과정에서 정리
ascii코드표를 참조하여 사용해야함.
```sql
select char(0) from dual; // ascii코드로 null
```
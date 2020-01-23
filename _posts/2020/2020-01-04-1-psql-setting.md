---
layout: post
title: postgresql 초기설정 방법
tags :
    - postgresql
    - sql
    - psql
---

##### 1.Data File 초기화
```shell
[gymbombom@localhost]$ initdb /home/psql/share/data/test2
The files belonging to this database system will be owned by user "psql".
This user must also own the server process.

The database cluster will be initialized with locales
  COLLATE:  C
  CTYPE:    C.UTF-8
  MESSAGES: C
  MONETARY: C
  NUMERIC:  C
  TIME:     C
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

creating directory /home/psql/share/data/test2 ... ok
creating subdirectories ... ok
selecting default max_connections ... 100
selecting default shared_buffers ... 128MB
selecting default timezone ... UTC
selecting dynamic shared memory implementation ... posix
creating configuration files ... ok
running bootstrap script ... ok
performing post-bootstrap initialization ... sh: locale: not found
2020-01-04 10:34:56.323 UTC [761] WARNING:  no usable system locales were found
ok
syncing data to disk ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the option -A, or
--auth-local and --auth-host, the next time you run initdb.

Success.
```


##### 2. 외부에서 접속 가능하도록 설정
* pg_hba.conf 파일 마지막 line에 해당내용 추가
```shell
host    all     all     0.0.0.0/0       password
```
* postgresql.conf 수정<br>
`listen_address = '*'` 로 설정

##### 3. postgresql 실행
```shell
[gymbombom@localhost]$ nohup postgres -D /home/psql/share/data/test > /home/psql/share/log/psql.log &
```

##### 4.user 생성
```shell
[gymbombom@localhost]$ psql postgres
psql (11.6)
Type "help" for help.
postgres=# CREATE USER test WITH ENCRYPTED PASSWORD 'password123';
```

##### 5.database 생성
oracle 의 tablespace 개념과 비슷함.
```shell
[gymbombom@localhost]$ psql postgres
psql (11.6)
Type "help" for help.
postgres=# CREATE DATABASE testdb OWNER test ENCODING 'utf-8';
```
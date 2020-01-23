---
layout: post
title: table join 하여 update
tags :
    - sql
---
## test 데이터 생성 
##### create table 
table 3개를 생성
```sql
create table table_a
(
	key varchar(100),
	column_1 varchar(100),
	column_2 varchar(100),
	column_3 varchar(100)
);

create table table_b
(
	key varchar(100),
	column_1 varchar(100),
	column_2 varchar(100),
	column_3 varchar(100)
);

create table table_c
(
	key varchar(100),
	column_1 varchar(100),
	column_2 varchar(100),
	column_3 varchar(100)
);
```

table_a 테이블 column_1, column_2, column_3 에 전자제품 회사 데이터 insert
```sql
insert into table_a
(key,column_1,column_2,column_3)
values
('1','삼성1','삼성2','삼성3');

insert into table_a
(key,column_1,column_2,column_3)
values
('2','애플1','애플2','애플3');

insert into table_a
(key,column_1,column_2,column_3)
values
('3','hp1','hp2','hp3');

insert into table_a
(key,column_1,column_2,column_3)
values
('4','소니1','소니2','소니3');
```

table_b 는 자동차회사 데이터 insert
```sql
insert into table_b
(key,column_1,column_2,column_3)
values
('1','현대1','현대2','현대3');

insert into table_b
(key,column_1,column_2,column_3)
values
('2','토요타1','토요타2','토요타3');

insert into table_b
(key,column_1,column_2,column_3)
values
('3','벤츠1','벤츠2','벤츠3');
```

table_c 는 나라이름 데이터 insert
```sql
insert into table_c
(key,column_1,column_2,column_3)
values
('1','프랑스1','프랑스2','프랑스3');

insert into table_c
(key,column_1,column_2,column_3)
values
('2','미국1','미국2','미국3');

insert into table_c
(key,column_1,column_2,column_3)
values
('3','대한민국1','대한민국2','대한민국3');
```


##### 1. 두개의 table join 하여 update

join 하여 update 는 아래처럼 하면 되지만, 이런식으로 했을 경우에 table_a의 모든 row 의 column_1 이 update 된다.
```sql
UPDATE table_a a
   SET column_1 = (SELECT column_1
                     FROM table_b b
                    WHERE a.KEY = b.KEY);
```

table_a의 모든 row 가 업데이트 되지 않도록 하기 위해선 아래와 같이 `WHERE` 절 에서 `EXISTS` 를 써줘야 한다.
이렇게 해야 table_a 테이블과 table_b 테이블 JOIN 된 ROW 만 UPDATE 된다.

```sql
UPDATE table_a a
   SET column_1 = (SELECT column_1
                     FROM table_b b
                    WHERE a.KEY = b.KEY)
WHERE EXISTS (
                SELECT 
                      1 
                FROM 
                    table_b b_exists
                WHERE
                    a.KEY = b_exists.KEY
             );
```

여러 테이블을 JOIN 하여 UPDATE 할 경우, 아래와 같이 사용한다.
이렇게 할 경우 위와 마찬가지로, `table_a` 테이블의 모든 ROW 가 UPDATE 된다.
  ```sql
  UPDATE 
       (
        SELECT a.column_1 AS a_column_1,
               a.column_2 AS a_column_2,
               a.column_3 AS a_column_3,
               c.column_1 AS c_column_1,
               c.column_2 AS c_column_2,
               c.column_3 AS c_column_3
          FROM table_a a,
               table_b b,
               table_c c
         WHERE a.key= b.key
               AND b.key = c.key
       )
   SET a_column_1 = c_column_1,
       a_column_2 = c_column_2,
       a_column_3 = c_column_3;
  ```
위처럼 UPDATE 할 경우, `table_a` 테이블 모든 ROW 의 `a_column_1` , `a_column_2` , `a_column_3` 
컬럼들이 UPDATE 될것이다.
Key 끼리 JOIN 한 ROW 만 UPDATE 하려면 아래와 같이 한다.
```shell
UPDATE 
       (
        SELECT a.column_1 AS a_column_1,
               a.column_2 AS a_column_2,
               a.column_3 AS a_column_3,
               c.column_1 AS c_column_1,
               c.column_2 AS c_column_2,
               c.column_3 AS c_column_3
          FROM table_a a,
               table_b b,
               table_c c
         WHERE a.key= b.key
              AND b.key = c.key
       )
SET a_column_1 = c_column_1,
    a_column_2 = c_column_2,
    a_column_3 = c_column_3
WHERE EXISTS (
                SELECT 1 FROM 

             )

```
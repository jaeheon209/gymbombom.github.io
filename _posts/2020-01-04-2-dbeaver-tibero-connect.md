---
layout: post
title: dbeaver 에서 tibero DB 연결하기
tags :
    - tibero
    - dbeaver
    - DB
---

##### 1. DBeaver 에서 Driver manager 열기
dbeaver 에서<br>
database - driver manager 열기<br>

##### 2. driver manager 에서 `[new]` Click
<img src="/images/posts/17.png" width='400' height='400'>

##### 3. tibero Driver 정보 입력
tibero Driver 정보를 아래와 같이 입력 후 `[Add File]` click 하여 tibero6-jdbc.jar 파일을 등록<br>
* Driver Name : Tibero<br>
* Class Name : com.tmax.tibero.jdbc.TbDriver<br>
* URL Template : jdbc:tibero:thin:@{host}[:{port}]:{database}<br>
* Default Port : 8629<br>

<img src="/images/posts/18.png" width='350' height='400'>
---
layout: post
title: docker 로 jekyll 개발환경 만들기
tags :
    - vscode
    - docker
    - jekyll
---

## 개요
* local pc에 docker 로 jekyll 개발환경을 구축하는 방법을 기록한다.

---


## 설정

* 1.docker-compose.yml 파일 작성하기

```yml
version: "3.3" #docker-compose 버전

services:
  blog:
    image: jekyll/jekyll:latest # docker container jekyll 이미지
    command: jekyll serve --force_polling --drafts --livereload --trace #container run 시 실행할 명령
    ports:
      - "4000:4000" #local 4000번 포트와 container 4000번 포트를 연결
    volumes:
      - ".:/srv/jekyll" # 현재 경로를 container 경로로 mount
```
<br>
* 2.vscode 에 docker plugin 설치
<img src="/images/posts/20.png">

<br>
* 3.`docker-compose.yml` 파일에서 마우스 오른쪽 클릭 후, `Compose Up` 선택

---

## 경험

```shell
Generating 중
Skipping: _posts/2020/2020-10-11-2-docker-jekyll-developing.md has a future date
와 같은 로그가 보일경우, config.yml 에서 future: true 항목을 추가하여 미래의 post도 보이도록 설정한다.
```

---

## Links
[Developing inside a Container](https://code.visualstudio.com/docs/remote/containers){: target="_blank"}<br> 
[VS Code로 컨테이너 안에서 개발하기](https://medium.com/@ssowonny/vs-code로-컨테이너-안에서-개발하기-d8ed0950d69a){: target="_blank"}<br> 
 
---













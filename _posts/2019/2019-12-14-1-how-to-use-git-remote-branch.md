---
layout: post
title: git remote branch 생성 및 pull request 까지의 Flow  정리
tags :
    - git
    - github
---

### git remote branch 생성하기

##### 1. git local branch 생성
master Branch 인지 확인
```shell
[gymbombom]$ git branch
* master
```

code-color 의 Branch명으로 local branch 생성
```shell
[gymbombom]$ git branch code-color
```

local branch 생성 확인
```shell
[gymbombom]$ git branch
  code-color
* master
```


##### 2. git local branch -> remote 저장소로 push 하여 remote branch 생성

origin 이란 remote 저장소를 의미<br>
code-color branch를 remote 저장소에도 push함.
```shell
[gymbombom]$ git push origin code-color
Total 0 (delta 0), reused 0 (delta 0)
remote:
remote: Create a pull request for 'code-color' on GitHub by visiting:
remote:      https://github.com/gymbombom/gymbombom.github.io/pull/new/code-color
remote:
To https://github.com/gymbombom/gymbombom.github.io.git
 * [new branch]      code-color -> code-color
```

##### 3. local branch 를 remote brach로 추적하도록 설정
local의 code-color branch에서 git pull 시,<br>
remote branch인 origin/code-color branch 를 추적하도록 설정
 ```shell
 [gymbombom]$ git branch --set-upstream-to origin/code-color
 ```

##### 4. 소스 변경  및 commit , push
현재 local branch 확인
 ```shell
[gymbombom]$ git branch
  code-color
* master
```

현재의 local branch가 master 일 경우, code-color 로 전환
```shell
[gymbombom]$ git checkout code-color
M	.gitignore
M	_sass/_highlights.scss
Switched to branch 'code-color'
```

잘 전환되었는지 확인
```shell 
[gymbombom]$ git branch
* code-color
  master
```

소스를 수정하고 수정된 _sass/_highlights.scss 파일을 local code-color branch 에 <br>
commit 하고 remote branch인 origin/code-color branch 에 push 한다.
```shell
[gymbombom]$ git status
On branch code-color
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .gitignore
	modified:   _sass/_highlights.scss

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.jekyll-cache/

no changes added to commit (use "git add" and/or "git commit -a")
```

add
```shell
[gymbombom]$ git add _sass/_highlights.scss;
```

commit
```shell
[gymbombom]$ git commit -m "code 블럭 color 변경";
[code-color 977fa24] code 블럭 color 변경
 1 file changed, 8 insertions(+), 1 deletion(-)
```

remote 의 code-color branch 로 push
```shell
[gymbombom]$ git push origin code-color
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 463 bytes | 463.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/gymbombom/gymbombom.github.io.git
   5335b9f..977fa24  code-color -> code-color
```

##### 5.remote branch 생성확인 및  compare, pull request 요청
remote branch(github) 에 새로 생성된 branch를 확인하고, compare & pull request 버튼이 생기는데,
해당 버튼을 클릭한다.
  
<img src="/images/posts/5.png">
  
pull request 메시지 및 변경사항을 기록하고 create pull request 를 클릭하여 pull request 를 작성한다.
  
<img src="/images/posts/6.png">

##### 6.pull request 변경사항 확인 및 origin/master branch로 merge후 origin/code-color branch 삭제
pull request 에 대한 변경사항을 확인하고 merge pull request 버튼을 클릭하여 origin/master branch 와 merge 한다.
  
<img src="/images/posts/7.png">
  
origin/master branch로 merge 완료되면, remote branch를 삭제한다.
  
<img src="/images/posts/8.png">

### 기타 추가 작업들
local branch에서 추가 작업해야 하는 것들

##### master branch pull
현재 branch 가 code-color branch 에 있으면 master branch로 전환
```shell
[gymbombom]$ git branch
* code-color
  master

[gymbombom]$  git checkout master
M	.gitignore
Switched to branch 'master'
Your branch is behind 'origin/master' by 2 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
```

git pull 명령으로 remote branch 변경사항을 가져온다.
```shell
[gymbombom]$ git pull
Updating 5335b9f..066eb99
Fast-forward
 _sass/_highlights.scss | 9 ++++++++-
 1 file changed, 8 insertions(+), 1 deletion(-)
```

local branch를 삭제한다.
```shell
[gymbombom]$ git branch -d code-color
Deleted branch code-color (was 977fa24).
```
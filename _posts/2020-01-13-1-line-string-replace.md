---
layout: post
title: 특정 문자열이 포함된 라인을 모두 치환(replace)하기
tags :
    - shell
---

특정 문자열이 포함된 라인에 대하여, 원하는 문자열로 라인 전체를 치환하는 방법을 기록한다.
아래는 문자치환 test를 위하여 작성한 file 이다.


* test.dat
```shell
# vi test.dat
가나다라마바사아
abc
가나다라마바사아
abcdef
가나다라마바사아
aaaaabc
가나다라마바사아
aaaerwabcaaa
가나다라마바사아
aabbcc
```

위의 test.dat 파일에서 파일에서 `abc`가 포함된 라인의 문자열을 `123`으로 치환할 것이다.<br>
아래 스크립트 파일을 작성한다.

*replace.sh
```shell
#!/bin/bash

sed -e '/abc/ c\
123' test.dat
```

작성한 스크립트를 실행한다.<br>
아래와 같이 치환된 결과를 확인할수 있다.
```shell
[gymbombom@localhost]$ ./replace.sh
가나다라마바사아
123
가나다라마바사아
123
가나다라마바사아
123
가나다라마바사아
123
가나다라마바사아
aabbcc
```

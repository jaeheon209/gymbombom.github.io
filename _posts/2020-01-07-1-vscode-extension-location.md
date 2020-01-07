---
layout: post
title: VSCODE 기본경로 및 VSCODE portable 설정방법
tags :
    - vscode
---
vscode 개인설정파일(user data), 확장프로그램(extension) 기본경로 및 vscode portable 모드 설정방법을 기록한다.

### Extension 기본 경로

OS | Location
---|---
Windows | `%USERPROFILE%\.vscode\extensions`
MacOS | `~/.vscode/extensions` 또는 `/Users/<user>/.vscode/extensions`
Linux | `~/.vscode/extensions`


### 개인설정파일(user-data) 기본 경로

OS | Location
---|---
Windows | `%APPDATA%\Code\`
MacOS | `~/Library/Application Support/Code/`
Linux | `~/.config/Code/`


### 경로 변경
--extensions-dir , --user-data-dir 옵션을 설정하여 기본 경로를 변경할 수 있다.<br>
`"D:\Microsoft VS Code\Code.exe" --extensions-dir="D:\Microsoft VS Code\extensions"`<br>
`"D:\Microsoft VS Code\Code.exe" --user-data-dir="D:\Microsoft VS Code\Code"`<br>

### portable 모드 설정
vscode portable 버전을 다운로드 받고, data directory를 생성한다.<br>

windows 나 Linux일 경우 vscode 설치 directory 하위에 `data` directory를 만들고 vscode를 실행한다.<br>
임시파일도 저장장소도 설정하고 싶으면` data` directory 하위에 `tmp` directory도 만든다.
```
|- VSCode-win32-x64-1.25.0-insider
|   |- Code.exe (or code executable)
|   |- data
|   |  |- tmp
|   |  |- ...
```

MacOS 일경우는 Visual Studio Code.app 실행파일과 동일한 directory에 `code-portable-data` directory를 만든다.<br>

```
|- Visual Studio Code.app
|- code-portable-data
|   |- tmp
|   |- ...
```

MacOS 일 경우, 최초 VScode 실행 시 아래와 같은 경고가 뜬다.<br>
<img src="/images/posts/19.png" width='400' height='200'>

아래와 같이 실행파일의 경고를 제거하여 준다.
```shell
[gymbombom@localhost]$ xattr -dr com.apple.quarantine Visual\ Studio\ Code.app
```

data directory를 생성해 주고 VScode를 실행하면, data directory 하위에 extensions, user-data directory 가 생성된다. 
```
|- VSCode-win32-x64-1.25.0-insider
|   |- Code.exe (or code executable)
|   |- data
|   |   |- user-data
|   |   |   |- ...
|   |   |- extensions
|   |   |   |- ...
|   |- ...
```
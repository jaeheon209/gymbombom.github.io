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


### 개인설정파일(settings.json) 기본 경로

OS | Location
---|---
Windows | `%APPDATA%\Code\User\`
MacOS | `~/Library/Application Support/Code/User/`
Linux | `~/.config/Code/User/settings.json`


### 경로 변경
--extensions-dir , --user-data-dir 옵션을 설정하여 기본 경로를 변경할 수 있다.<br>
`"D:\Microsoft VS Code\Code.exe" --extensions-dir="D:\Microsoft VS Code\extensions"`<br>
`"D:\Microsoft VS Code\Code.exe" --user-data-dir="D:\Microsoft VS Code\settings"`<br>

### portable 모드 설정
vscode portable 버전을 다운로드 받고, data directory를 생성한다.<br>
* Windows, Linux : `mkdir $VSCODE_HOME\data`
* Mac OS : `mkdir $VSCODE_HOME/code-portable-data`<br>


위와 같이 data directory를 생성하고 VSCODE를 실행하면 , 그 하위 directory로 `extensions`,`user-data` 가 생성된다. 여기에 `tmp` directory를 생성하여 주면 임시파일도 저장된다.

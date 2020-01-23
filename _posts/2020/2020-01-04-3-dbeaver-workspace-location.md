---
layout: post
title: dbeaver workspace 경로 및 경로변경 방법
tags :
    - dbeaver
    - DB
---

### workspace 기본 경로
기본적으로 DBeaver는 모든 파일 (구성, 스크립트, 다이어그램 등)을 다음 폴더에 저장합니다.<br>

OS | Location
---|---
Windows | `%APPDATA%\DBeaverData\`
MacOS | `~/Library/DBeaverData/`
Linux | `$XDG_DATA_HOME/DBeaverData/` ($XDG_DATA_HOME=`~/.local/share` if not set)

#### Folders

Folder | Location
---|---
`workspace6` | Workspace files for DBeaver 6.1+
`drivers` | Auto downloaded database drivers

### 경로 변경
CLI 에  `-data <path>`  매개변수를 전달하여 사용자 정의 작업 공간 위치를 지정할 수 있습니다.<br>
`<path>` 는 절대 또는 상대 디렉토리 경로 일 수 있습니다.

### Old (before DBeaver 6.1.3) default workspace location

OS | Location
---|---
Windows | `C:\Users\YourName\.dbeaver4`.
Linux | `~/.dbeaver4/`
MacOS | `~/.dbeaver4/`

### Ancient (before DBeaver 4) default workspace location

OS | Location
---|---
Windows | `C:\Users\YourName\.dbeaver`.
Linux | `~/.dbeaver/`
MacOS | `~/.dbeaver/`
  
  
* 참고 사이트<br>
[Workspace-Location-wiki](https://github.com/dbeaver/dbeaver/wiki/Workspace-Location){: target="_blank"}
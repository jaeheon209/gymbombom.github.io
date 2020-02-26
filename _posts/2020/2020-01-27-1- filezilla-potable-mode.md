---
layout: post
title: filezilla portable mode 구성방법
tags :
    - filezilla
---

## 개요
* filezilla portable 모드를 구성하여 설정파일을 default directory에 구성되지 않게 한다.

---

## 설정

* 기본 설정파일 디렉토리

OS | Location
---|---
Windows | `%USERPROFILE%\AppData\Roaming\FileZilla\`
MacOS | `$HOME/.config/filezilla`

* 기본설정변경방법<br>
1.`%FILEZILLA_HOME%\docs\fzdefaults.xml.example` 파일을 파일질라 실행파일과 동일한 장소에 `fzdefaults.xml` 의 이름으로 복사<br>
(mac os 의 경우, app bundle 안쪽의 Contents/SharedSupport/ 디렉토리에 위치함.)
2.아래  property  수정
```xml
    <Settings>
      <Setting name="Config Location">$SOMEDIR/filezilla/</Setting>
      <Setting name="Kiosk mode">0</Setting>
      <Setting name="Disable update check">0</Setting>
    </Settings>
```

---

## 경험

---

## Links
[Portable mode client installation](https://wiki.filezilla-project.org/Portable_mode_client_installation)  
[Download FileZilla Client](https://filezilla-project.org/download.php?show_all=1)
---













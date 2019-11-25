---
title: Hadoop SingleNode 설치
categories:
- hadoop
feature_text: |
  ## Hadoop SingleNode 설치
feature_image: "https://picsum.photos/2560/600?image=872"
---

## 준비
* hadoop version : hadoop-2.7.2  
* java version : 1.8.0_121  
* os : Red Hat Enterprise Linux Server 7.2 (Maipo)  

나의 경우 위와 같은 환경에서 설치를 진행하였다.  
혹시나 다른 버전의 hadoop이 필요할 경우, [hadoop Archive Realese](https://archive.apache.org/dist/hadoop/core/) 사이트에서 다운로드 받으면 된다.  

hadoop version 과 java version 간 호환성에 대하여 알고 싶으면, [HadoopJavaVersions](https://cwiki.apache.org/confluence/display/HADOOP2/HadoopJavaVersions) , 또는
[Hadoop+Java+Versions](https://cwiki.apache.org/confluence/display/HADOOP/Hadoop+Java+Versions) 에서 확인 가능하다.  

## 설치 및 환경파일 setting
설치의 경우는 jdk 만 설치되어 있으면, 그냥 [hadoop Archive Realese](https://archive.apache.org/dist/hadoop/core/) 사이트에서 다운로드 받은 tar.gz 파일을 압축해제만 하면 끝이다.  
설정파일은 각 xml 파일별로 아래와 같이 설정하여 주면 된다.  

* $(HADOOP_HOME)/etc/hadoop/core-site.xml  

``` xml
<configuration>
    <!-- fs.defaultFS 항목은 기본 파일 시스템의 이름이자,FileSystem 구현을 결정하는 URI. 그리고 namenode URI 가 된다. -->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>

    <!-- 
          복제계수... 같은 데이터를 다른 node로 몇개나 복제할것이냐? 를 결정하는 수.
          기본적으로 singleNode 의 경우 당연히 node 갯수가 1개 이므로 1, 
          MultiNode의 경우 Node수에 맞추어 홀수로 설정해야 한다. 
    -->
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
```

* $(HADOOP_HOME)/etc/hadoop/hdfs-site.xml  

```xml
<configuration>

    <!-- 
         namenode 의 FSimage(스냅샷) 저장위치..
         필수옵션은 아니지만 원하는 directory 로 설정하는것을 권장.
         설정하지 않을 경우, default(어느위치였는지는 기억안남) 에 저장되므로 
         되도록이면 설정하도록 한다.
    -->
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>/home/hadoop/data/hdfs/namenode</value>
    </property>

    <!-- 
        hadoop data 디렉토리
        필수옵션은 아니지만 원하는 directory 로 설정하는것을 권장.
        설정하지 않을 경우,  기본 datadir 이 /tmp/hadoop-${user.name}/dfs/data 로 지정됨.
        되도록이면 설정하는 것을 권장한다. 
    -->
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>/home/hadoop/data/hdfs/datanode</value>
    </property>
   
    <!-- 
        hadoop tmp directory
        필수옵션은 아니지만 원하는 directory 로 설정하는것을 권장. 
    -->
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/home/hadoop/data/hdfs/tmp</value>
    </property>

</configuration>
```

설정파일 setting 이 완료되었으면, ssh공개키 인증을 통하여, 패스워드 없이 localhost에 ssh 접속이 가능한지 확인한다.  
```shell
    $ ssh localhost; #password 없이 접속 가능하다면 PASS... 그렇지 않다면 아래과정 진행

    #ssh 키 생성 및 공개키 배포
    $ ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa; # ssh key 생성
    $ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys; #ssh 공개키 배포
    $ chmod 0600 ~/.ssh/authorized_keys; # 파일 권한설정
```

## 실행  
실행 전 hadoop 을 설치하고 namenode 를 최초 기동하는 경우라면, 기동전에 namenode format 을 해줘야 한다.  
format하지 않고 실행할 경우, namenode format 어쩌구 에러를 내뱉으면서 namenode 가 실행되지 않는다...

```shell
    $ $HADOOP_HOME/bin/hdfs namenode -format;
```

namenode 및 datanode를 기동한다.  

```shell
    $ $HADOOP_HOME/sbin/start-dfs.sh; # namenode, datanode 같이 실행
    $ $HADOOP_HOME/sbin/hadoop-daemon.sh start namenode; #hadoop namenode만 실행
    $ $HADOOP_HOME/sbin/hadoop-daemon.sh start datanode; #hadoop datanode만 실행
```

## 확인
namenode web interface  UI 에 접속하여 잘 실행되었는지 확인한다.  
> NameNode - http://localhost:50070/
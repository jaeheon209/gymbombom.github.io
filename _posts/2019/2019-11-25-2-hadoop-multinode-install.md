---
layout: post
title: Hadoop MultiNode 설치
tags:
    - hadoop
    - 빅데이터
#categories:
#- hadoop
#feature_text: |
  ## Hadoop MultiNode 설치
#feature_image: "https://picsum.photos/2560/600?image=733"
---

## 준비
MultiNode를 설치를 시작하기 전에 [Hadoop-SingleNode-Install](/2019/11/25/1-hadoop-singlenode-install/){: target="_blank"} 을 참고하여 SingleNode 먼저 구성후에 MultiNode를 세팅하도록 권장한다.  
처음부터 MultiNode로 구성했을때 설정을 잘못했을 경우, 삽질!할 가능성이 있으므로 SingleNode 세팅 후 정상동작을 확인하고 MultiNode를 설정하도록 한다.


MultiNode이므로  hadoop1 서버는 namenode 서버이고, 나머지 노드는 datanode 서버로 설정한다.  
참고로 여기서는  1번 node는 namenode 와 datanode 모두 사용할 것이다.  
필수로 이렇게 설정해야 하는건 아니고, 필요에 따라서 namenode서버만 단독으로 이용할수도 있다.  

* server : 
> hadoop1 : 192.168.0.1(namenode, datanode)  
> hadoop2 : 192.168.0.2(datanode)  
> hadoop3 : 192.168.0.3(datanode)  
> hadoop4 : 192.168.0.4(datanode)  
> hadoop5 : 192.168.0.5(datanode)  

각각  node 에 /etc/hosts파일에 hostname을 등록한다.  
필수로 해야하는건 아니지만, 등록해 놓으면 환경설정 및 배포작업시에 편리하게 이용할수 있다.  

* /etc/hosts

```shell
192.168.0.1 hadoop1
192.168.0.2 hadoop2
192.168.0.3 hadoop3
192.168.0.4 hadoop4
192.168.0.5 hadoop5
```

/etc/hosts 에  hostname이 잘 등록되었는지 확인한다.  

```shell
    [hadoop1]$ ping hadoop1;
    [hadoop1]$ ping hadoop2;
    [hadoop1]$ ping hadoop3;
    [hadoop1]$ ping hadoop4;
    [hadoop1]$ ping hadoop5;
```


## 설치 및 환경파일 setting
설치에 관한 내용은 [Hadoop-SingleNode-Install](/2019/11/25/1-hadoop-singlenode-install/){: target="_blank"} 참고  

ssh공개키 인증을 통하여, 패스워드 없이 namenode(hadoop1)에서 각 node로 ssh 접속이 가능한지 확인한다.  

```shell
[hadoop1]$ ssh hadoop@hadoop1;
[hadoop1]$ ssh hadoop@hadoop2;
[hadoop1]$ ssh hadoop@hadoop3;
[hadoop1]$ ssh hadoop@hadoop4;
[hadoop1]$ ssh hadoop@hadoop5;
```

패스워드 없이 ssh 접속이 불가능할 경우 각 node에서 ssh key 생성, namenode(hadoop1)의 ssh키를 각 node 에 배포해야 한다.  

* 각 node에서 ssh-key생성 및 authorized_keys 파일 생성

 ```shell
 # ssh-key 생성
 [hadoop1]$ ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa;
 ....
 [hadoop5]$ ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa;

 # authorized_keys파일생성
 [hadoop1]$ touch ~/.ssh/authorized_keys;
 [hadoop1]$ chmod 0600 ~/.ssh/authorized_keys;
 ....
 [hadoop5]$ touch ~/.ssh/authorized_keys;
 [hadoop5]$ chmod 0600 ~/.ssh/authorized_keys;
 ```

* namenode의 ssh 공개키를 각 노드에 배포 

```shell
[hadoop1]$ ssh-copy-id -i ~/.ssh/id_rsa.pub hadoop@hadoop1;
[hadoop1]$ ssh-copy-id -i ~/.ssh/id_rsa.pub hadoop@hadoop2;
[hadoop1]$ ssh-copy-id -i ~/.ssh/id_rsa.pub hadoop@hadoop3;
[hadoop1]$ ssh-copy-id -i ~/.ssh/id_rsa.pub hadoop@hadoop4;
[hadoop1]$ ssh-copy-id -i ~/.ssh/id_rsa.pub hadoop@hadoop5;
```

namenode(hadoop1) 에서 설정파일을 아래와 같이 설정한다.
[Hadoop-SingleNode-Install](/2019/11/25/1-hadoop-singlenode-install/){: target="_blank"} 에서 설정한 내용을 바탕으로 없는   
항목은 추가하여야 하고, 이미 설정된 항목에 대해서는 수정하여야 한다.  

* $(HADOOP_HOME)/etc/hadoop/core-site.xml  

``` xml
<configuration>
    <!-- fs.default.name 은 MultiNode Cluster 의 경우, namenode URI로 설정한다. -->  
   <property> 
      <name>fs.default.name</name> 
      <value>hdfs://hadoop1:9000/</value> 
   </property>

    <!-- 
        dfs.replication 설정은 node 갯수에 맞춰서 홀수로 설정한다. 
        현재의 환경(node수가 5대) 일때, 복제계수를 홀수가 아닌 4로 설정하게 되면,
        하나의 데이터 복제본이 4개의 node에 저장되고,  4개의 복제본 중 2개 node에서 데이터 일관성이 깨지게 된다면
        2:2 의 상황으로 어느 데이터로 일관성을 유지해야 할지 모르는 상황이 된다.
    -->
    <property>
      <name>dfs.replication</name>
      <value>3</value>
    </property>

</configuration>
```

masters File을 생성하고, masternode(namenode) 의 ip를 등록한다. 

```shell
[hadoop1]$ touch $HADOOP_HOME/etc/hadoop/masters;
```

* $HADOOP_HOME/etc/hadoop/masters  

```shell
hadoop1
```

slaves File 을 생성하고, slavenode(datanode) 의 ip를 등록한다.  

```shell
[hadoop1]$ touch $HADOOP_HOME/etc/hadoop/slaves;
```

* $HADOOP_HOME/etc/hadoop/slaves  

```shell
hadoop1
hadoop2
hadoop3
hadoop4
hadoop5
```

설정이 완료되었으면, 설정파일을 수정한 masternode(hadoop1)에서  $HADOOP_HOME 디렉토리를 압축하여 Cluster 의 모든 Node에 배포한다.  

```shell
[hadoop1]$ tar -xvf hadoop.tar $HADOOP_HOME;

[hadoop1]$ scp ./hadoop.tar hadoop@hadoop2:~/hadoop.tar;
....
[hadoop1]$ scp ./hadoop.tar hadoop@hadoop5:~/hadoop.tar;
```

masternode(hadoop1) 에서 전송받은 압축파일을 각 node에서 압축해제 한다.  

```shell
[hadoop2]$ tar -cvf ~/hadoop.tar;
....
[hadoop5]$ tar -cvf ~/hadoop.tar;
```

## 실행 
실행 전 hadoop 을 설치하고 namenode 를 최초 기동하는 경우라면, 기동전에 namenode format 을 해줘야 한다.  
format하지 않고 실행할 경우, namenode format 어쩌구 에러를 내뱉으면서 namenode 가 실행되지 않는다...  

```shell
[hadoop1]$ $HADOOP_HOME/bin/hdfs namenode -format;
```

모든 Node에서 hadoop을 실행한다. 

```shell
# hadoop.sh 에서 masters, slaves 파일의 설정을 바탕으로 각 node 마다 알아서 namenode, datanode 가 실행된다.
[hadoop1]$ $HADOOP_HOME/sbin/hadoop.sh start;
....
[hadoop5]$ $HADOOP_HOME/sbin/hadoop.sh start;
```
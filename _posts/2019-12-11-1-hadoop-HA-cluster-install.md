---
layout: post
title: Hadoop HA cluster 세팅 방법
tags:
    - hadoop
    - 빅데이터
---

## 준비
Hadoop HA cluser를 세팅하기 전에 사전작업으로 [Hadoop-SingleNode-Install](/2019/11/25/1-hadoop-singlenode-install/){: target="_blank"} => [Hadoop-multiNode-Install](/2019/11/25/1-hadoop-multinode-install/){: target="_blank"} 이 구성되어 있는 상태에서 HA cluster를 세팅하는것을 권장한다.


HA(High Availability) 설정이란 active/standby 설정으로 구성하여, namenode 장애시에도 서비스가 중단되지 않도록 구성한다.

## 서버구성
* aws1
```shell
[aws1]$ jps
2821 DataNode
2934 JobHistoryServer
2104 DFSZKFailoverController
1881 QuorumPeerMain
2365 NameNode
1967 JournalNode
```
* aws2
```shell
[aws2]$ jps
1573 QuorumPeerMain
1801 DataNode
1962 NameNode
1628 JournalNode
2060 DFSZKFailoverController
```
* aws3
```shell
[aws3]$ jps
1474 QuorumPeerMain
1685 DataNode
1531 JournalNode
```
* aws4
```shell
[aws4]$ jps
1538 DataNode
```
* aws5
```shell
[aws5]$ jps
1538 DataNode
```

## 설치 및 세팅
##### zookeeper 다운로드 및 설치
[zookeeper achrive site](https://archive.apache.org/dist/zookeeper/){: target="_blank"}에서 zookeeper download
```shell
[aws1]$ curl -O https://archive.apache.org/dist/zookeeper/zookeeper-3.4.9/zookeeper-3.4.9.tar.gz;
# 압축해제만 하면 설치 완료
[aws1]$ tar -xvf zookeeper-3.4.9.tar.gz;
```
##### zookeeper설정
```shell
# sample 설정파일을 복사
[aws1]$ cp $ZOOKEEPER_HOME/conf/zoo_sample.cfg $ZOOKEEPER_HOME/conf/zoo.cfg;
```
* zoo.cfg

```properties
#data Directory 설정
dataDir=/home/hadoop/data/zookeeper

#0으로 설정하면 client 제한이 없어짐.
maxClientCnxns=0 

#session Timeout 설정
maxSessionTimeout=180000

#zookeeper가 설치될 node들을 모두 적어준다.
# server.숫자 는 뒤에서 설정할 myid 설정시 key가 된다.
server.1=aws1:2888:3888
server.2=aws2:2888:3888
server.3=aws3:2888:3888
```

##### zookeeper 배포
zookeeper가 실행될 node들에 aws1번 서버에서 설정한 zookeeper를 압축해서 배포한다.
```shell
# aws1번 서버에서 지금까지 설정한 zookeeper directory 압축
[aws1]$ tar -xvf zookeeper3.4.9.tar ./zookeeper3.4.9;

#aws2,aws3 서버에 zookeeper 배포
[aws1]$ scp -r /home/hadoop/zookeeper3.4.9.tar aws2:/home/hadoop/zookeeper3.4.9.tar;
[aws1]$ scp -r /home/hadoop/zookeeper3.4.9.tar aws3:/home/hadoop/zookeeper3.4.9.tar;
```

##### 각 서버에서 zookeeper 압축해제
```shell
[aws1] tar -cvf /home/hadoop/zookeeper3.4.9.tar;
```
```shell
[aws2] tar -cvf /home/hadoop/zookeeper3.4.9.tar;
```
```shell
[aws3] tar -cvf /home/hadoop/zookeeper3.4.9.tar;
```
##### 각 서버에서 myid 설정
myid 파일 설정시 zoo.cfg에 설정하였던 server.1 ,server.2..... 숫자에 맞게 설정해 주어야한다.
또한 myid 파일 설정 디렉토리는 zoo.cfg 에서 설정하였던 dataDir 디렉토리에 위치해야 한다.
```shell
[aws1]$ echo 1 > /home/hadoop/data/zookeeper/myid;
```
```shell
[aws2]$ echo 2 > /home/hadoop/data/zookeeper/myid;
```
```shell
[aws3]$ echo 3 > /home/hadoop/data/zookeeper/myid;
```

##### zookeeper 실행
aws1~3 각 서버에서 zookeeper를 기동한다.
```shell
[aws1]$ $ZOOKEEPER_HOME/bin/zkServer.sh start;
```
```shell
[aws2]$ $ZOOKEEPER_HOME/bin/zkServer.sh start;
```
```shell
[aws3]$ $ZOOKEEPER_HOME/bin/zkServer.sh start;
```
aws1~3 서버 모두 기동 후 QuorumPeerMain process가 기동중이면 정상 기동됨.
```shell
# aws1~3 서버 모두확인
[aws1]$ jps
        1665 QuorumPeerMain
```

zookeeper status 확인
```shell
#zookeeper가 설치된  aws1~3 서버 모두 확인 시 Mode가 reader가 1대 나머지는 Follower 이다. 
# reader, follower 는 랜덤으로 설정됨.
[aws1]$ $ZOOKEEPER_HOME/bin/zkServer.sh status;
ZooKeeper JMX enabled by default
Using config: /home/hadoop/zookeeper-3.4.9/bin/../conf/zoo.cfg
Mode: follower
```
##### hadoop설정
hadoop 설정은 [Hadoop-multiNode-Install](2019/11/25/1-hadoop-multinode-install/){: target="_blank"} 까지 완료되어 있는 상태에서 config에서 이미 있는 property는 수정, 없는 property는 추가되어야 한다.
aws1에서 수정하고 모든 node에 압축하여 일괄 배포한다.

masters 파일 삭제
```shell
[aws1]$ rm $HADOOP_HOME/etc/hadoop/masters;
```
* core-site.xml property 수정 및 추가

```xml
<configuration>
    <!-- 기본 파일시스템 명.
         적당한 파이시스템명으로 수정해야 함.
     -->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hes-cluster</value>
    </property>


    <!-- zookeeper 서버 리스트 
         앞에서 설치한 zookeeper의 설치서버들을 모두
         입력해 주면된다.
    -->
    <property>
        <name>ha.zookeeper.quorum</name>
        <value>aws1:2181,aws2:2181,aws3:2181</value>
    </property>

</configuration>
```

* hdfs-site.xml property 수정 및 추가

```xml
<configuration>
 
    <!--  
      Journalnode 의 역할은 NameNode 동기화 상태를 유지한다.
      특정 시점에 구성된 fsimage snapshot 이후로 발생된 변경 사항을
      editlog 라 하는데, 해당 데이터의 저장위치를 설정한다.
     -->
    <property>
        <name>dfs.journalnode.edits.dir</name>
        <value>/home/hadoop/data/hdfs/journalnode</value>
    </property>

    <!--  네임서비스 리스트. 콤마(,)로 구분하여 여러개 설정가능. -->
    <property>
        <name>dfs.nameservices</name>
        <value>hes-cluster</value>
    </property>

    <!-- hes-cluster 네임서비스의 NameNode ID 
        property name 에 dfs.nameservices 항목에서 설정한 
        네임서비스명 들어가야 한다.
        위에서 hes-cluster 로 설정했으므로 아래와 같이 설정한다.
    -->
    <property>
        <name>dfs.ha.namenodes.hes-cluster</name>
        <value>nn1,nn2</value>
    </property>


    <!-- 
      nn1 NameNode의 RPC 포트 
      dfs.ha.namenodes.hes-cluster 에서 clustering할 namenodeid 중 
      nn1에 해당하는 서버의 rpc포트를 지정한다.
    -->
    <property>
        <name>dfs.namenode.rpc-address.hes-cluster.nn1</name>
        <value>aws1:8020</value>
    </property>


    <!-- 
      nn2 NameNode의 RPC 포트 
      dfs.ha.namenodes.hes-cluster 에서 clustering할 namenodeid 중 
      nn2에 해당하는 서버의 rpc포트를 지정한다.
    -->
    <property>
        <name>dfs.namenode.rpc-address.hes-cluster.nn2</name>
        <value>aws2:8020</value>
    </property>


    <!-- nn1 NameNode의 Web UI 포트 -->
    <property>
        <name>dfs.namenode.http-address.hes-cluster.nn1</name>
        <value>aws1:50070</value>
    </property>

    <!-- nn2 NameNode의 Web UI 포트 -->
    <property>
        <name>dfs.namenode.http-address.hes-cluster.nn2</name>
        <value>aws2:50070</value>
    </property>

    <!-- NameNode가 edit log를 쓰고 읽을 JournalNode URI 
       zookeeper가 설치된 서버와 동일하게 JournalNode를 설정하면 된다.
    -->
    <property>
        <name>dfs.namenode.shared.edits.dir</name>
        <value>qjournal://aws1:8485;aws2:8485;aws3:8485/hes-cluster</value>
    </property>

    <!-- HDFS 클라이언트가 active NameNode에 접근할 때 사용되는 Java class -->
    <property>
        <name>dfs.client.failover.proxy.provider.hes-cluster</name>
        <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
    </property>

    <!-- Failover 상황에서 기존 active NameNode를 차단할 때 사용할 방법 지정 -->
    <property>
        <name>dfs.ha.fencing.methods</name>
        <value>sshfence</value>
    </property>

    <!-- 
        ha.fencing.method를 sshfence로 지정했을 경우 ssh를 경유해 기존 active NameNode를 죽이는데,
        이때 passphrase를 통과하기 위해 SSH private key file을 지정해야 함.
     -->
    <property>
        <name>dfs.ha.fencing.ssh.private-key-files</name>
        <value>/home/hes/.ssh/id_rsa</value>
    </property>

    <!-- 장애복구를 자동으로 한다고 지정 -->
    <property>
        <name>dfs.ha.automatic-failover.enabled</name>
        <value>true</value>
    </property>

</configuration>
```

##### hadoop 배포
hadoop binary를 압축하여 전체서버에 배포한다.
```shell
# hadoop 압축
[aws1]$ cd /home/hadoop;
[aws1]$ tar -xvf ./hadoop-2.7.2.tar ./hadoop-2.7.2;

#전체 서버에 압축파일 배포
[aws1]$ scp -r /home/hadoop/hadoop-2.7.2.tar aws1:/home/hadoop/hadoop-2.7.2.tar;
[aws1]$ scp -r /home/hadoop/hadoop-2.7.2.tar aws2:/home/hadoop/hadoop-2.7.2.tar;
[aws1]$ scp -r /home/hadoop/hadoop-2.7.2.tar aws3:/home/hadoop/hadoop-2.7.2.tar;
[aws1]$ scp -r /home/hadoop/hadoop-2.7.2.tar aws4:/home/hadoop/hadoop-2.7.2.tar;
[aws1]$ scp -r /home/hadoop/hadoop-2.7.2.tar aws5:/home/hadoop/hadoop-2.7.2.tar;
```

각 서버별로 압축해제 한다.
```shell
[aws1]$ tar -cvf ./hadoop-2.7.2.tar;
```
```shell
[aws2]$ tar -cvf ./hadoop-2.7.2.tar;
```
```shell
[aws3]$ tar -cvf ./hadoop-2.7.2.tar;
```
```shell
[aws4]$ tar -cvf ./hadoop-2.7.2.tar;
```
```shell
[aws5]$ tar -cvf ./hadoop-2.7.2.tar;
```

##### zookeeper 초기화
 ```shell
 #zookeeper Format
 [server1]$ $HADOOP_HOME/bin/hdfs zkfc -formatZK;
 
 # 초기화 확인 위해 Zookeeper 접속
[server01] $ZOOKEEPER_HOME/bin/zkCli.sh;

# hadoop-ha 아래에 dfs.nameservices 지정한 nameserviceID 노드가 있으면 성공
[zk: localhost:2181(CONNECTED) 1] ls /hadoop-ha
        [hes-cluster]
[zk: localhost:2181(CONNECTED) 1] quit
 ```

##### aws1~3 에서 JournalNode 실행
 ```shell
 [aws1]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start journalnode;
 ```
```shell
 [aws2]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start journalnode;
 ```
 ```shell
 [aws3]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start journalnode;
 ```

##### JournalNode 초기화
  ```shell
  [aws1]$ $HADOOP_HOME/bin/hdfs namenode -initializeSharedEdits;
  ```

##### Active NameNode 실행
  Active Namenode에서 먼저 NameNode를 실행하고, zkfc를 실행한다.
```shell
[aws1]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start namenode;
[aws1]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start zkfc;

# 아래와 같이 4개가 나와야 정상
[aws1]$ jps
1832 QuorumPeerMain
2040 JournalNode
2184 NameNode
2270 DFSZKFailoverController
```

##### 모든 Node에서 Datanode 실행
```shell
[aws1]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start datanode;
```
```shell
[aws2]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start datanode;
```
```shell
[aws3]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start datanode;
```
```shell
[aws4]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start datanode;
```
```shell
[aws5]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start datanode;
```

##### Standby NameNode 실행
  Standby Namenode에서 NameNode를 실행하고, zkfc를 실행한다.

```shell
[aws1]$ $HADOOP_HOME/bin/hdfs namenode -bootstrapStandby;
[aws1]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start namenode;
[aws1]$ $HADOOP_HOME/sbin/hadoop-daemon.sh start zkfc;

# 아래와 같이 4개가 나와야 정상
[aws1]$ jps
1832 QuorumPeerMain
2040 JournalNode
2184 NameNode
2270 DFSZKFailoverController
```

##### 나머지 yarn, JobHistoryServer 실행
```shell
[aws1]$ $HADOOP_HOME/sbin/start-yarn.sh;
[aws1]$ $HADOOP_HOME/sbin/mr-jobhistory-daemon.sh start historyserver;
```
##### Active NameNode와 Standy NameNode가 잘 설정되었는지 확인
```shell
[aws1]$ $HADOOP_HOME/bin/hdfs haadmin -getServiceState nn1;
active
[aws1]$ $HADOOP_HOME/bin/hdfs haadmin -getServiceState nn2;
standby
```
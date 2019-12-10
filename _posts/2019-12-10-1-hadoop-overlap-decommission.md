---
layout: post
title: hadoop 중복 decommission 방법 & <br>
       중복 decommission 을 수행하면 어떻게 될까?
tags :
    - hadoop
    - 빅데이터
---

> hadoop decommission 시 이미 decommission 된 node 들이 존재하는 상황에서, 중복으로
  여러번에 걸쳐서 다른 node 들을  decommission 하면 어떻게 반응할지 테스트해 보았다.


### 테스트 환경
> 총 5개 node 로 구성된 환경에서 테스트 하였고 hadoop HA setting 이 되어있으며, node 의 구성은 아래와 같다.<br>

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

* namenode  hdfs-site.xml 의  dfs.hosts.exclude, dfs.hosts property 설정은 아래와 같다<br>
```xml
    <property>
        <name>dfs.hosts.exclude</name>
        <value>/home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts.exclude</value>
   </property>
   <property>
        <name>dfs.hosts</name>
        <value>/home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts</value>
   </property>
```

### 테스트 방법
   aws4, aws5 node 2대를 먼저 decommission 한 후, aws3 node 를 decommission 한다.<br>
   group1(aws4,aws5) 를 먼저 동시에 decommission 한 후, group2(aws3) 을 decommission 할 때<br>
   어떤 방식으로 decommission 을 수행해야 안정적이고 올바르게 decommission 되는지를 찾는다.<br>

### 테스트 과정 
#### group1(aws4,aws5) node 들을 decommission 한다.

* dfs.hosts, dfs.host.exclude, slaves 파일들은 아래와 같이 설정하였다.<br>
```shell
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts
#aws1
#aws2
#aws3
#aws4
#aws5
```
```shell
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts.exclude
aws4
aws5
```
```shell
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/slaves
aws1
aws2
aws3
#aws4
#aws5
```

* refreshodes 명령실행으로 decommission 수행
```shell
[aws1]$ pwd
/home/hadoop/hadoop-2.7.3/bin
[aws1]$ ./hdfs dfsadmin -refreshNodes
Refresh nodes successful for aws1/172.31.16.230:8020
Refresh nodes successful for aws2/172.31.27.141:8020
```

* group1(aws4, aws5) node decommission 완료
<img src="/images/posts/1.png">

#### group2(aws3) decommission 수행
* 설정파일을 아래과 같이 세팅하였다.<br>
```shell
#이미 group1(aws4,aws5) 에서  decommission 한 aws4, aws5 node는 주석처리함.
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts.exclude
aws3
#aws4
#aws5
```
```shell
[aws1]$ /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts
#aws1
#aws2
#aws3
#aws4
#aws5
```
```shell
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/slaves
aws1
aws2
#aws3
#aws4
#aws5
```

* refreshodes 명령실행하여 group2(aws3) decommission 수행
```shell
[aws1]$ pwd
/home/hadoop/hadoop-2.7.3/bin
[aws1]$ ./hdfs dfsadmin -refreshNodes
Refresh nodes successful for aws1/172.31.16.230:8020
Refresh nodes successful for aws2/172.31.27.141:8020
```

dfs.hosts.exclude 설정파일에 이미 decommission 된 group1(aws4,aws5)는 주석처리하고 refreshNodes를 실행
하여  group2(aws3)  decommission 과정에서 group1(aws4,aws5) 번 node 들이 기동됨.
<img src="/images/posts/2.png">

위의 결과로 인하여, dfs.hosts.exclude 설정파일 setting 시 이미 Decommisson 되어있는 node들을 주석처리 하지않고
여러번에 걸쳐서 중복 decommission 했을 경우, 어떻게 반응하는지 테스트 해보았다.

##### aws3 node 가 decommission 되어있는 상태에서 aws4 node를 decommission 해보자.
* 설정파일 setting
```shell
#이미 decommission 되어있는 aws3 은 주석처리 하지않고, aws4 추가
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts.exclude
aws3
aws4
#aws5
```
```shell
[aws1]$ /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts
#aws1
#aws2
#aws3
#aws4
#aws5
```
```shell
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/slaves
aws1
aws2
#aws3
#aws4
aws5
```
* refreshNodes 명령 수행하여 aws4 node decommission 수행
```shell
[aws1]$ pwd
/home/hadoop/hadoop-2.7.3/bin
[aws1]$ ./hdfs dfsadmin -refreshNodes
Refresh nodes successful for aws1/172.31.16.230:8020
Refresh nodes successful for aws2/172.31.27.141:8020
```

dfs.hosts.exclude 파일에 이미 decommission 된 aws3 node를 주석처리 하지 않고, aws4  node를 추가하여
decommission 했을 경우,  이미 decommission 된 aws3 번은 영향을 미치지않고 aws4 가 정상적으로 decommission 
되었다.
<img src="/images/posts/3.png">

##### aws5 node 하나만 더 decommission 해보자
* 설정파일 setting
```shell
#이미 decommission 되어있는 aws3,aws4 는 주석처리 하지않고, aws5 추가
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts.exclude
aws3
aws4
aws5
```
```shell
[aws1]$ /home/hadoop/hadoop-2.7.3/etc/hadoop/dfs.hosts
#aws1
#aws2
#aws3
#aws4
#aws5
```
```shell
[aws1]$ cat /home/hadoop/hadoop-2.7.3/etc/hadoop/slaves
aws1
aws2
#aws3
#aws4
#aws5
```
* refreshNodes 명령 수행하여 aws5 node decommission 수행
```shell
[aws1]$ pwd
/home/hadoop/hadoop-2.7.3/bin
[aws1]$ ./hdfs dfsadmin -refreshNodes
Refresh nodes successful for aws1/172.31.16.230:8020
Refresh nodes successful for aws2/172.31.27.141:8020
```

마찬가지로 aws5 decommission 과정에서 이전 decommission  된 node들에게 영향을 주지않고 aws5번만 
decommission 되었다.
<img src="/images/posts/4.png">

### 결론
* 여러번에 걸쳐서 중복 decommission을 수행할 경우, 설정파일에 이전decommission된 node들은 삭제하지 않고,
  decommission을 수행해야 한다.

* 설정파일에 이전decommission된 node를 중복 decommission해도 이미 decommission된 node라면 전혀 영향을 
  미치지 않는다.
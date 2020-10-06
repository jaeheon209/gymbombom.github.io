---
layout: post
title: 리눅스 파일시스템 관리
tags :
    - linux
---

## 개요
* 리눅스 파일시스템 관리방법 기록

---


## 디스크 확인
```shell
$ sudo fdisk -l
Disk /dev/sda: 931.5 GiB, 1000204886016 bytes, 1953525168 sectors # disk용량, byte수, sector수 확인
Disk model: 0
Units: sectors of 1 * 512 = 512 bytes #섹터당 byte수 확인
Sector size (logical/physical): 512 bytes / 512 bytes #sector 사이즈 확인
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x311221b2

#disk의 partition 확인
Device     Boot  Start        End    Sectors   Size Id Type
/dev/sda1  *      2048     206847     204800   100M  7 HPFS/NTFS/exFAT
/dev/sda2       206848 1953521663 1953314816 931.4G  6 FAT16
```

## 디스크의 Filesystem 확인
```shell
$ sudo file -s /dev/sda1
/dev/sda1: Linux rev 1.0 ext4 filesystem data, UUID=c8fb0585-e1c0-4d35-bb29-39b407c19841 (extents) (64bit) (large files) (huge files)
```

## Filesystem Format
```shell
$ umount /media/disk #디스크가 mount 되어있는경우, mount 해제한다. 
$ sudo mkfs.ext4 /dev/sda1 #ext4 type으로 Format
mke2fs 1.44.5 (15-Dec-2018)
Creating filesystem with 244190390 4k blocks and 61054976 inodes
Filesystem UUID: 2644fd98-dc51-4503-8bb6-3e25540cafd1
Superblock backups stored on blocks:
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
	4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968,
	102400000, 214990848

Allocating group tables: done
Writing inode tables: done
Creating journal (262144 blocks):
done
Writing superblocks and filesystem accounting information:
done
```

---

## 파티션 병합
```shell
$ sudo fdisk -l # 디스크 정보확인
Disk /dev/sda: 931.5 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: 0
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x311221b2

Device     Boot  Start        End    Sectors   Size Id Type
/dev/sda1  *      2048     206847     204800   100M  7 HPFS/NTFS/exFAT
/dev/sda2       206848 1953521663 1953314816 931.4G  6 FAT16


$ sudo fdisk /dev/sda #디스크 정보에서 확인한 /dev/sda 에 대한 파티션 작업 시작
Welcome to fdisk (util-linux 2.33.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): d #1번 파티션 삭제
Partition number (1,2, default 2): 1

Partition 1 has been deleted.

Command (m for help): d #2번 파티션 삭제
Selected partition 2
Partition 2 has been deleted.

Command (m for help): n #파티션 재생성
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p #primary 파티션 생성
Partition number (1-4, default 1): 1 # 기본 1번 파티션 넘버로 생성
First sector (2048-1953525167, default 2048): # 시작섹터 입력
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-1953525167, default 1953525167): # 끝섹터 입력

Created a new partition 1 of type 'Linux' and of size 931.5 GiB.
Partition #1 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: y

The signature will be removed by a write command.

Command (m for help): p # 파티션이 잘 생성되었는지 확인
Disk /dev/sda: 931.5 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: 0
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x311221b2

Device     Boot Start        End    Sectors   Size Id Type
/dev/sda1        2048 1953525167 1953523120 931.5G 83 Linux

Filesystem/RAID signature on partition 1 will be wiped.

Command (m for help): w # 종료
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

```

---

## 경험

---

## Links
[https://qastack.kr/ubuntu/66000/how-to-merge-partitions](파티션을 병합하는 방법){: target="_blank"}<br>

---













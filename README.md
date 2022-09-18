# ci/cd 자동화 배포 프로젝트

# 목차
* [개발 환경](#개발환경)
* [사용기술](#사용-기술)
    * [벡엔드](#백엔드)
    * [프론트엔드](#프론트엔드)
    * [Infra](#infra)
* [ci/cd 아키텍쳐](#cicd-아키텍쳐)
* [cluster 아키텍쳐](#cluster-아키텍쳐)
* [핵심 기능](#핵심-기능)
    * [로그인 및 회원가입](#로그인-및-회원-가입)
    * [CRUD 기능](#crud-기능)
    * [프로필 설정](#프로필-설정)
    * [DB](#db)
    * [무중단 배포](#무중단-배포)
        * []
* []
* [프로젝트 느낀점](#프로젝트-느낀점)

## 개발환경
***
* github
* Visual Studio Code
* Docker
* Jenkins
* Argo CD
* 

## 사용 기술
***

### **백엔드**

주요 프레임워크/라이브러리
* node.js 16.17.0 LTS
* 

**DataBase**
* Mongo DB

### 프론트엔드
* React

### Infra
* Kubernetes
* Docker
* Jenkins
* Argo CD
* AWS EKS
* AWS EBS
* AWS ALB

### 모니터링
* AWS CloudWatch
* AWS FluentBit

## 핵심 키워드
***
* React, node.js를 사용하여 웹 애플리케이션 기획부터 배포 유지 보수까지 전과정 개발과 운영 경험 확보
* AWS / 리눅스 기반 CI/CD 무중단 배포 인프라 구축
* Jenkins 파이프라인 작성
* Kubernetes, Docker 사용하여 cluster 관리

## CI/CD 아키텍쳐
***


## Cluster 아키텍쳐
***
## 핵심 기능
***
### **로그인 및 회원 가입**

로그인과 회원 가입 버튼을 만들어 클릭 시 전환할 수 있도록 구현하였습니다.

회원 가입 버튼을 클릭 시 회원 가입 페이지로 이동하여 회원 가입하게 되면 DB에 저정하도록 구현하였습니다.

회원 가입 후 로그인을 하게 되면 게시물 페이지로 이동하며 JWT 토큰을 발급하여 로그인 세션를 유지하게 설계하였습니다.



### **CRUD 기능**

게시물에 대한 기본적인 CRUD 기능을 구현하였습니다.

게시물 작성 시 모든 사용자의 게시물 피드에 제공합니다.

게시물 수정 및 삭제는 해당 게시물에 대한 작성자에게만 인가하여 권한을 제한 하였고 수정, 삭제 버튼을 보여주도록 하였습니다.


### **프로필 설정**

닉네임 설정과 로그아웃 기능을 구현하였습니다.

닉네임을 수정하게 되면 상태 업데이트를 하며 게시물 페이지로 이동합니다.

로그아웃 시 로그인 및 회원 가입 페이지로 이동하여 세션을 단절 시킵니다.

### **DB**
DB는 간단한 CRUD 기능을 사용하기에 설계가 쉬운 MongoDB를 사용하였습니다.

초기 설계에는 벡엔드와 DB를 한 컨테이너 안에서 구현하는 것으로 하였으나 보안과 관리 상 벡엔드와 DB를 분리하도록 설계하였습니다.

그 과정에서 DB를 고도화 하여 구현하게 되었습니다.

이중화를 구현하기 위해 인터페이스 역할을 하는 Mongos와 전체 클러스터의 메타데이터,  구성 설정등을 저장하는 서버인 config server와 shard로 설계를 하였습니다.

Mongos는 Config 서버와 연결 후 쿼리가 들어오면 구성정보를 바탕으로 Shard 1, 2에 쿼리를 전달합니다.

선거를 통해 선출되며 Master의 기능하는 primary와 Primary의 데이터를 복제한POD(Slave)인 Secondary를 레플리카셋으로 구현하였습니다.

그리고 3개의 mongoDB서버를 레플리카셋으로 배포하여 고가용성 실현하였습니다.


### **무중단 배포**

애플리케이션 출시에 있어서 지속적 통합과 지속적 배포를 위해 github, AWS EKS, Jenkins, Argo CD를 사용했으며 빌드와 배포를 분리하였습니다.



## 프로젝트 느낀점
***






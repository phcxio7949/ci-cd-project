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
        * [AWS](#aws)
* [이슈](#이슈)
* [프로젝트 느낀점](#프로젝트-느낀점)

## 개발환경
* github
* Visual Studio Code
* Docker
* Jenkins
* Argo CD
* 

## 사용 기술


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

* React, node.js를 사용하여 웹 애플리케이션 기획부터 배포 유지 보수까지 전과정 개발과 운영 경험 확보
* AWS / 리눅스 기반 CI/CD 무중단 배포 인프라 구축
* Jenkins 파이프라인 작성
* Kubernetes, Docker 사용하여 cluster 관리

## CI/CD 아키텍쳐
<img width="970" alt="파이프라인 아키텍쳐" src="https://user-images.githubusercontent.com/78542349/190887112-b1f51548-d4de-4d8a-9b2e-660324649af9.png">



## Cluster 아키텍쳐
![클러스터 아키텍쳐](https://user-images.githubusercontent.com/78542349/190885186-9f81e06d-236a-498f-87d9-8b85a8df2db1.png)

## 핵심 기능


### **로그인 및 회원 가입**

![로그인,회원가입](https://user-images.githubusercontent.com/78542349/190887402-be1a1cfc-90c2-4c1b-8c9b-a8ea5ab3c5bc.png)
![JWT](https://user-images.githubusercontent.com/78542349/190887423-aeee501d-4451-4b7a-83ff-1df09cf51415.png)

로그인과 회원 가입 버튼을 만들어 클릭 시 전환할 수 있도록 구현하였습니다.

회원 가입 버튼을 클릭 시 회원 가입 페이지로 이동하여 회원 가입하게 되면 DB에 저정하도록 구현하였습니다.

회원 가입 후 로그인을 하게 되면 게시물 페이지로 이동하며 JWT 토큰을 발급하여 로그인 세션를 유지하게 설계하였습니다.



### **CRUD 기능**

![게시판](https://user-images.githubusercontent.com/78542349/190887425-67b17a28-18eb-4309-beb6-943d6bccc3bf.png)

게시물에 대한 기본적인 CRUD 기능을 구현하였습니다.

게시물 작성 시 모든 사용자의 게시물 피드에 제공합니다.

게시물 수정 및 삭제는 해당 게시물에 대한 작성자에게만 인가하여 권한을 제한 하였고 수정, 삭제 버튼을 보여주도록 하였습니다.

![수정](https://user-images.githubusercontent.com/78542349/190887406-6ecdec0a-235b-4036-be6a-3599b67b1122.png)
![수정2](https://user-images.githubusercontent.com/78542349/190887407-05b7ac3a-76e6-4f28-99ae-1adc7ee05569.png)


### **프로필 설정**

![닉네임,로그아웃](https://user-images.githubusercontent.com/78542349/190887426-b8c85f11-e11b-469f-9d3d-e86ea2b409d5.png)

닉네임 설정과 로그아웃 기능을 구현하였습니다.

닉네임을 수정하게 되면 상태 업데이트를 하며 게시물 페이지로 이동합니다.

로그아웃 시 로그인 및 회원 가입 페이지로 이동하여 세션을 단절 시킵니다.

### **DB**

![db1](https://user-images.githubusercontent.com/78542349/190887414-9efb0186-8c61-405e-9775-58c5a41d224a.png)
![db2](https://user-images.githubusercontent.com/78542349/190887417-c04588be-acb3-47de-87d8-9d2d34536b29.png)

DB는 간단한 CRUD 기능을 사용하기에 설계가 쉬운 MongoDB를 사용하였습니다.

초기 설계에는 벡엔드와 DB를 한 컨테이너 안에서 구현하는 것으로 하였으나 보안과 관리 상 벡엔드와 DB를 분리하도록 설계하였습니다.

그 과정에서 DB를 고도화 하여 구현하게 되었습니다.

이중화를 구현하기 위해 인터페이스 역할을 하는 Mongos와 전체 클러스터의 메타데이터,  구성 설정등을 저장하는 서버인 config server와 shard로 설계를 하였습니다.

Mongos는 Config 서버와 연결 후 쿼리가 들어오면 구성정보를 바탕으로 Shard 1, 2에 쿼리를 전달합니다.

선거를 통해 선출되며 Master의 기능하는 primary와 Primary의 데이터를 복제한POD(Slave)인 Secondary를 레플리카셋으로 구현하였습니다.

그리고 3개의 mongoDB서버를 레플리카셋으로 배포하여 고가용성 실현하였습니다.


### **무중단 배포**

<img width="970" alt="파이프라인 아키텍쳐" src="https://user-images.githubusercontent.com/78542349/190887112-b1f51548-d4de-4d8a-9b2e-660324649af9.png">

애플리케이션 출시에 있어서 지속적 통합과 지속적 배포를 위해 github, AWS EKS, Jenkins, Argo CD를 사용했으며 빌드와 배포를 분리하였습니다.

**pipeline 흐름**

먼저 빌드와 배포를 구분하기 위해 2개의 github repository를 사용하였습니다. 

빌드용 github에는 frontend, backend, DB에 관한 코드를 저장하도록 하였습니다.

배포용 github에는 각각의 manifest 파일을 저장하여 버전 업데이트에 관한 내용을 저장하였습니다.

1. 개발자가 업데이트한 코드를 빌드용 github 저장소에 push한다.
2. github에서 push가 되면 이벤트가 발생하여 jenkins에서 빌드를 실행한다.
3. 새로운 빌드가 발생하면 jenkins pipeline으로 dockerhub에 새로운 이미지를 생성하고 배포용 github 저장소의 manifest 파일에 버전을 업데이트하여 push 하여 이미지 태그를 수정한다.
4. 배포용 github가 업데이트 되면 Argo CD에서 업데이트 된 내용을 감지하여 클러스터를 자동으로 업데이트하며 도커의 새로운 이미지를 불러와 배포를 시작한다.

**Jenkins**

Jenkins에서 사용한 파이프라인에는 Declarative 문법으로 작성하였습니다.

Jenkins의 URL이 외부 노출 되었을 경우를 대비하여 내부 설정으로 관리자 이외에는 접근 불가능하게 설정하였습니다.

AWS EBS와 연동하여 Jenkins의 pod가 삭제되어도 데이터는 저장하여 새롭게 생성하여 이전과 동일한 데이터를 가질 수 있게 설정하였습니다.

**Argo CD**

Helm으로 Argo CD를 설치하였습니다.

### **AWS**

**Cluster 아키텍쳐**

AWS EKS를 사용하여 기본 cluster를 구성하였습니다.

각 용도 별로 네임스페이스를 만들어 해당하는 pod들을 실행하였습니다.

jenkins, argo cd, app, monitoring의 네임스페이스를 만들어 로드벨런스를 이용하여 호스트를 구분하였습니다.

jenkins나 db와 같은 저장소가 필요한 곳을 EBS로 연동하여 데이터를 저장하게 하였습니다.

**EKS 설정**

서버의 사용량에 따라 자동적으로 스케일링을 할 수 있도록 yaml파일을 설정하였습니다.

![EKS.yaml](https://github.com/phcxio7949/ci-cd_project_app/blob/d5a8acb7650a1fe449e27948b67213b293b34795/eks_setting.yaml)

**네트워크**

![ALB](https://user-images.githubusercontent.com/78542349/190887412-84fda42d-8618-40fa-bd90-563e947a8f9a.png)
![ALB2](https://user-images.githubusercontent.com/78542349/190887413-04ffa2c1-665e-4e23-811b-72f932fcdbd7.png)

기본적을 AWS ALB를 사용하여 로드벨런싱을 하였습니다.

보안을 위해서 EKS 상의 노드들은 전부 private network 영역에서 실행을 시켰으며 ALB Ingress를 사용하여 외부에서 접근할 수 있도록 하였습니다.

* AWS Route53을 이용하여 보유한 도메인을 등록하였습니다.
* AWS ACM에서 도메인에 대하여 인증서 발급 및 Ingress에 적용여 https 연결 설정하였습니다.
* Route53 하위도메인으로 자동등록, ALB에 라우팅 규칙 자동생성하여 ingress 배포하였습니다.

-> 하나의 ALB에서 여러개의 서비스를 각 Ingress에 적힌 host를 통해서 접근할수 있습니다.

![ALB Ingress](https://user-images.githubusercontent.com/78542349/190887409-ee9c72a0-6bbe-4fad-9fda-4dae6e983297.png)


**모니터링 도구**

![모니터링1](https://user-images.githubusercontent.com/78542349/190887403-d153f497-f104-43f6-bb85-e079d171f622.png)
![모니터링2](https://user-images.githubusercontent.com/78542349/190887404-29ca2c43-7217-4f1a-80b6-31d4e63ed995.png)

cloudwatch Agent/fleuntbit 를 Demonset 형태로 배포하였으며 각 노드의 Metric 및 Log 수집하여 cloudwatch에서 시각화된 정보를 얻습니다.

또한 cloudwatch로 임계값을 적용하여 Cluster AutoScaling을 설정하였습니다.



## 이슈

**Jenkins agent pod에서 도커 사용**

jenkins pod가 EKS에서 agent pod로 올라기 때문에 docker 기능 사용 불가

해결방법

DooD

에이전트 파드를 kubernetes yaml파일 형식으로 프로비저닝할 수 있는 젠킨스 pipeline script 이용하였습니다.
DooD(docker out of docker) 방식으로 호스트의 도커 소켓 파일을 컨테이너에 마운트하여 공유하였습니다.

DinD


![dind1](https://user-images.githubusercontent.com/78542349/190887418-44f2c897-78ab-4a9c-8bf9-96d92ed3e3b0.png)
![dind2](https://user-images.githubusercontent.com/78542349/190887420-cb29f5a6-9b47-4cb0-8a44-6b27a4170de0.png)

에이전트 파드에 도커를 설치한 jenkins-agent 이미지 신규 생성(DinD(docker in docker) 방식)하였습니다.

도커가 설치된 이미지로 에이전트를 배포해 docker 사용





## 프로젝트 느낀점

처음으로 한 팀 프로젝트이다보니 처음에서는 팀에 민폐가 되지 않을까 많은 고민을 하였습니다.

비전공이고 Devops에 관한 공부는 처음이고 짧은 시간을 공부하고 프로젝트로 들어가는 것이라서 시작은 어려운 느낌을 받았습니다.

프로젝트를 진행하는 동안 팀에 최대한 피해를 끼치지 않기 위해 중간에 쉬는 시간이라던지 밤을 세서라도 필요한 공부를 하며 팀 프로젝트에 기여하게 되니 스스로 개발에 몰입하는 모습을 발견하게 되었습니다.

이번 프로젝트로 많은 것을 배웠고, 문제에 직면했을때 이를 해결했던 경험을이 저에게 많은 도움이 되었다고 생각합니다.




# Traduler

다 같이 여행을 떠날 때 저희 서비스와 함께해요! - 여행 일정 관리 웹사이트

여행을 더욱 특별하고 편리하게 만들어주는 플랫폼입니다. 좋은 친구, 가족, 동반자와 함께 여행 장소를 공유하고, 지출 내역을 투명하게 관리하며, 함께 만든 추억을 대표 사진으로 간직할 수 있는 공간을 제공합니다.

🌍 **여행 장소 공유와 계획하기**

📸 **추억을 대표하는 사진으로 기념하기**

💰 **투명한 지출 내역 관리**

🤝 **더치페이로 편리한 지출 분담**

## 팀원

| 팀원   | 스택         | 팀원구분 | 깃허브                                |
| ------ | ------------ | -------- | ------------------------------------- |
| 노진철 | `프론트엔드` | `리더`   | [진철](https://github.com/jinoc-git)  |
| 유지완 | `프론트엔드` | `부리더` | [지완](https://github.com/NickYOOO)   |
| 박기태 | `프론트엔드` | 팀원     | [기태](https://github.com/kitae0831)  |
| 김진우 | `프론트엔드` | 팀원     | [진우](https://github.com/Kimjinwoo1) |
| 윤수민 | `프론트엔드` | 팀원     | [수민](https://github.com/suminute)   |

## 목차

- [1. 구현기능](#1-구현-기능)
- [2. 프로젝트 S.A](#4-프로젝트-sa)
- [3. 기술스택](#5-기술스택)
- [4. 사용한 라이브러리](#6-사용한-라이브러리)
- [5. API Table](#7-api-table)
- [6. 커밋 컨벤션](#7-api-table)
- [7. 코드 컨벤션](#7-api-table)

## 1. 구현기능

### Landing

![Landing](https://github.com/jinoc-git/traduler-project/assets/92218638/afc5659d-ba1a-4832-bc08-80c4faa05ac0)

### Main

![Main](https://github.com/jinoc-git/traduler-project/assets/92218638/6ded036f-b957-4eca-910c-918582abbfe8)
![PlanList](https://github.com/jinoc-git/traduler-project/assets/92218638/6816515f-7213-4ad8-a376-933f435f0fef)

### Plan

![Plan](https://github.com/jinoc-git/traduler-project/assets/92218638/f1fc1038-aa16-4d7f-ba3e-77122c7586ac)

### Ending

![Ending](https://github.com/jinoc-git/traduler-project/assets/92218638/0f5cd888-3e32-45d0-aa75-ed610f28e626)
![EndingPage](https://github.com/jinoc-git/traduler-project/assets/92218638/9cb64a95-789b-4bb6-bc71-9a5605f5ddb2)

## 2. 프로젝트 S.A

[Traduler](URL)

## 3. 기술스택

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=black"><img src="https://img.shields.io/badge/zustand-179C7D?style=for-the-badge&logo=&logoColor=white">

## 4. 사용한 라이브러리

<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black"><img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=black"><img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"><img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=black"><img src="https://img.shields.io/badge/React_Router_Dom-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/uuid-00AEF0?style=for-the-badge&logo=&logoColor=black">

## 5. API 명세

| Number | Method   | URL                | Description             | Request                                                                                                                | Response                                                                                                             |
| ------ | -------- | ------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1      | `POST`   | /api/auth/register | 회원가입                | {email: string,password: string,userName:string,}                                                                      | Success (HTTP 200 OK){"message": "회원가입 성공"},Error (HTTP [Error Code]){"error": "회원가입 에러"}                |
| 2      | `POST`   | /api/auth/login    | 로그인                  | { email: string, password: string}                                                                                     |                                                                                                                      |
| 3      | `POST`   | /api/plans/create  | 계획 작성               | { planState:string, planId: string, planTitle: string, place: string, cost: number, isDeleted: boolean date: string[]} |                                                                                                                      |
| 4      | `GET`    | /api/plans/get     | 내 계획 리스트 가져오기 |                                                                                                                        |                                                                                                                      |
| 5      | `GET`    | /api/plans/get     | 계획 가져오기           | { planId : string}                                                                                                     | { planState:string, planId: string, planTitle: string, lace: string, cost: number isDeleted: boolean date: string[]} |
| 6      | `PATCH`  | /api/plans/get     | 계획 수정[여행중]       | { planId:string, lanTitle: string, place: string, cost: number, date: string}                                          |                                                                                                                      |
| 7      | `PATCH`  | /api/plans/get     | 계획 삭제               | { planId: string, isDeleted: boolean}                                                                                  |                                                                                                                      |
| 8      | `GET`    | /api/plans/get     | 즐겨찾기 조회           | { userId:string}                                                                                                       | [ { userId:string, planId:string }, …]                                                                               |
| 9      | `POST`   | /api/plans/get     | 즐겨찾기 추가           | { userId:string, planId:string}                                                                                        |                                                                                                                      |
| 10     | `POST`   | /api/plans/get     | 즐겨찾기 삭제           | { userId:string, planId:string}                                                                                        |                                                                                                                      |
| 11     | `GET`    | /api/plans/get     | 한 줄 코멘트 조회       | { planId: string, date: string}                                                                                        | { userId:string, planId:string, commentId:string, date: string, contents:string}                                     |
| 12     | `POST`   | /api/plans/get     | 한 줄 코멘트 작성       | { userId:string, planId:string, commentId:string, date: string, contents:string}                                       |                                                                                                                      |
| 13     | `DELETE` | /api/plans/get     | 한 줄 코멘트 삭제       | { commentId: string}                                                                                                   |                                                                                                                      |

## 6. 커밋 컨벤션

- Feat : 새로운 기능 추가
- Fix : 버그 수정
- Docs : 문서 변경, 폴더 구조 변경
- Design : UI, UX 변경
- Chore : 설정 변경 등 기타 변경사항(merge conflict 해결)
- Refactor : 코드 리팩토링 (변수명 변경 등)
- Comment : 주석 추가 및 변경

## 7. 코드 컨벤션

### 폴더, 파일명

컴포넌트 파일명은 파스칼 케이스(PascalCase)를 사용한다.

```javascript
MainHome.tsx;
```

### 함수

함수명은 카멜 케이스(camelCase)를 원칙으로 한다.

```javascript
function nameOfFunction() {
  // ...some logic
}
```

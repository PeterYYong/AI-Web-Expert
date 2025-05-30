Netflix 스타일 영화 갤러리
실제 Netflix UI를 모방한 반응형 영화 갤러리 웹페이지입니다.

![image](https://github.com/user-attachments/assets/8709bfdc-43db-424c-8ce1-707f3a7a8353)



🚀 실행 방법

index.html 파일을 브라우저에서 열기
또는 더블클릭하여 실행

🎯 구현된 기능들
1. Flexbox 레이아웃

display: flex와 flex-wrap: wrap을 사용하여 영화 카드들을 반응형으로 배치
justify-content: center로 중앙 정렬
gap 속성으로 카드 간 간격 조정

2. 호버 효과

카드 확대: transform: scale(1.05)로 전체 카드 크기 증가
이미지 줌: 카드 내부 이미지가 scale(1.1)로 추가 확대
그림자 효과: Netflix 브랜드 컬러를 활용한 빨간 그림자
정보 오버레이: 호버 시 영화 제목, 년도, 평점 표시

3. 실제 영화 포스터 이미지

TMDB API의 고품질 영화 포스터 사용
오펜하이머, 바비, 기생충, 인터스텔라 등 인기 영화들
이미지 로딩 실패 시 플레이스홀더 표시

4. 반응형 디자인

데스크톱: 여러 열로 표시
태블릿: 카드 크기 조정
모바일: 단일 열로 재배치

5. Netflix 스타일링

브랜드 컬러 (#e50914) 활용
검은 배경과 그라데이션
Netflix 로고 포함
Money Heist 메인 히어로 섹션

6. 추가 기능

부드러운 스크롤 애니메이션
영화 카드 클릭 이벤트
마우스 드래그로 가로 스크롤
스크롤 시 헤더 배경 변화

🛠️ 기술 스택

HTML5: 시맨틱 마크업
CSS3: Flexbox, 애니메이션, 반응형 디자인
JavaScript: 인터랙션 및 이벤트 처리

📝 주요 섹션
Hero Section: Money Heist 메인 배경
Netflix Originals: 넷플릭스 오리지널 콘텐츠
Trending Now: 인기 영화 목록


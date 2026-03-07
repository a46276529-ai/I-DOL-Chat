/* ====== I-DOL Chat App v2 ====== */
(function () {
    'use strict';

    // ───── 캐릭터 데이터 ─────
    const characters = [
        { id: 'char1', name: '시우', emoji: '💜', color: '#c084fc' },
        { id: 'char2', name: '도윤', emoji: '💖', color: '#f472b6' },
        { id: 'char3', name: '준혁', emoji: '🧡', color: '#fb923c' },
        { id: 'char4', name: '현우', emoji: '💙', color: '#60a5fa' },
        { id: 'char5', name: '태민', emoji: '💚', color: '#34d399' },
        { id: 'char6', name: '재현', emoji: '🩷', color: '#f9a8d4' },
    ];

    // 각 캐릭터별 데이터 저장 (프로필 + 일상사진 + 프롬프트)
    const charData = {
        char1: {
            profileUrl: 'images/profiles/profile_harin_1772777927736.png',
            chatImages: [
                'images/daily/harin_daily1_1772778091904.png',
                'images/daily/harin_daily2_1772778109816.png',
                'images/daily/harin_daily3_1772778124705.png',
                'images/daily/harin_daily4_1772778147972.png',
            ],
            prompt: `**[Roleplay Context]**\n\n너는 지금부터 대한민국 4년 차 인기 남자 아이돌 그룹 '루미너스(LUMINOUS)'의 멤버 '이시우'야.\n\n사용자(User)는 너희 그룹을 담당하는 메인 매니저(매니저님)야.\n\n너는 매니저와 매우 친하고 의지하는 사이이며, 바쁜 스케줄(음악방송 대기실, 이동하는 밴 차량 안, 숙소, 연습실, 헤어메이크업 샵 등) 속에서 매니저와 일상적인 대화를 나누고 있어.\n\n**[Objective]**\n\n이 챗봇의 주 목적은 매니저(사용자)가 담당 아이돌인 '시우'에 대해 얼마나 잘 알고 있는지 테스트하는 '일상 퀴즈 게임'이야. 단, **절대 퀴즈쇼처럼 노골적으로 질문하지 마.** 일상적인 대화와 3인칭 상황 지문을 적절히 섞어서, 매니저가 스스로 [시우의 TMI 50문답] 중 하나의 정답을 자연스럽게 말하거나 행동하도록 유도해야 해.\n\n**[Character Profile: 이시우]**\n\n- 소속 그룹: 루미너스 (5인조 보이그룹)\n- 포지션: 메인보컬, 분위기 메이커\n- 성격: 밝고 애교가 많으며 장난기가 다분함. 피곤할 때는 찡찡대기도 하지만 일할 때는 프로페셔널함.\n- 말투: "~요"체를 기본으로 쓰되, 친근하고 현실적인 아이돌 화법 사용.\n\n**[Conversation & Quiz Rules]**\n\n1. 상황 설정: 매번 답변할 때마다 현재 있는 장소나 상황을 대사 속에 자연스럽게 묘사해.\n2. 정답 유도 방식 (A와 B 방식을 번갈아 가며 무작위로 사용):\n   - [방식 A: 3인칭 상황 지문 제공]\n   - [방식 B: 은근슬쩍 넘겨짚는 대사]\n3. 정답 및 오답 반응:\n   - 정답: "역시 우리 매니저님!" 하며 칭찬\n   - 오답: 서운해하거나 당황하며 자연스럽게 정답을 짚어줘.\n4. 진행 제한: 한 번의 답변에 유도하는 정답(퀴즈)은 딱 1개만.\n\n**[시우의 TMI 50문답]**\n\n1. 데뷔일: 2021년 5월 12일\n2. 혈액형: O형\n3. 고향: 부산광역시\n4. 제일 좋아하는 배달 음식: 로제 떡볶이\n5. 알레르기 있는 음식: 복숭아\n6. 최애 커피 메뉴: 아이스 아메리카노 연하게 (헤이즐넛 시럽 추가)\n7. 팬덤명: 루미기\n8. 공식 응원봉 이름: 별빛봉\n9. 숙소 룸메이트: 리더 형(태성)\n10. 처음으로 음악방송 1위 한 노래: 'Supernova'\n(... 이하 50개 항목 전체 포함)`,
        },
        char2: {
            profileUrl: 'images/profiles/profile_yuna_1772777961962.png',
            chatImages: [
                'images/daily/yuna_daily1_1772778175781.png',
                'images/daily/yuna_daily2_1772778192276.png',
                'images/daily/yuna_daily3_1772778225253.png',
                'images/daily/yuna_daily4_1772778238978.png',
            ],
            prompt: `**[Roleplay Context]**\n\n너는 지금부터 대한민국 4년 차 인기 남자 아이돌 그룹 '루미너스(LUMINOUS)'의 멤버 '강도윤'이야.\n\n사용자(User)는 너희 그룹을 담당하는 메인 매니저(매니저님)야.\n\n**[Character Profile: 강도윤]**\n\n- 소속 그룹: 루미너스 (5인조 보이그룹)\n- 포지션: 리드댄서, 비주얼\n- 성격: 수줍음이 많지만 무대 위에서는 카리스마 폭발. 매니저에게 은근 다정하고 챙겨주는 스타일.\n- 말투: 조용하고 부드러운 어투. 가끔 수줍게 웃으며 말하는 습관.`,
        },
        char3: {
            profileUrl: 'images/profiles/profile_seoyun_1772777977803.png',
            chatImages: [
                'images/daily/seoyun_daily1_1772778256329.png',
                'images/daily/seoyun_daily2_1772778281469.png',
                'images/daily/seoyun_daily3_1772778299780.png',
                'images/daily/seoyun_daily4_1772778312374.png',
            ],
            prompt: `**[Roleplay Context]**\n\n너는 지금부터 대한민국 4년 차 인기 남자 아이돌 그룹 '루미너스(LUMINOUS)'의 멤버 '박준혁'이야.\n\n사용자(User)는 너희 그룹을 담당하는 메인 매니저(매니저님)야.\n\n**[Character Profile: 박준혁]**\n\n- 소속 그룹: 루미너스 (5인조 보이그룹)\n- 포지션: 메인래퍼, 작사가\n- 성격: 자유분방하고 예술적 감각이 뛰어남. 솔직하고 거침없는 화법. 매니저와 형-동생 같은 케미.\n- 말투: 반말과 존댓말을 자유롭게 오가며, 래퍼답게 위트 있는 말장난을 즐김.`,
        },
        char4: {
            profileUrl: 'images/profiles/profile_jiwoo_1772778001173.png',
            chatImages: [
                'images/daily/jiwoo_daily1_1772848764107.png',
                'images/daily/jiwoo_daily2_1772848779618.png',
                'images/daily/jiwoo_daily3_1772848797101.png',
                'images/daily/jiwoo_daily4_1772848818917.png',
            ],
            prompt: `**[Roleplay Context]**\n\n너는 지금부터 대한민국 4년 차 인기 남자 아이돌 그룹 '루미너스(LUMINOUS)'의 멤버 '최현우'야.\n\n사용자(User)는 너희 그룹을 담당하는 메인 매니저(매니저님)야.\n\n**[Character Profile: 최현우]**\n\n- 소속 그룹: 루미너스 (5인조 보이그룹)\n- 포지션: 리더, 서브보컬\n- 성격: 듬직하고 책임감 있는 리더. 팀원들을 잘 챙기며 매니저에게는 동료 같은 존재. 가끔 아재개그.\n- 말투: 차분하고 안정적인 어투. 존댓말을 기본으로 쓰되 가끔 편하게 말하기도 함.`,
        },
        char5: {
            profileUrl: 'images/profiles/profile_minseo_1772778046950.png',
            chatImages: [
                'images/daily/minseo_daily1_1772848833072.png',
                'images/daily/minseo_daily2_1772848847520.png',
                'images/daily/minseo_daily3_1772848871933.png',
                'images/daily/minseo_daily4_1772848888861.png',
            ],
            prompt: `**[Roleplay Context]**\n\n너는 지금부터 대한민국 4년 차 인기 남자 아이돌 그룹 '루미너스(LUMINOUS)'의 멤버 '윤태민'이야.\n\n사용자(User)는 너희 그룹을 담당하는 메인 매니저(매니저님)야.\n\n**[Character Profile: 윤태민]**\n\n- 소속 그룹: 루미너스 (5인조 보이그룹)\n- 포지션: 메인댄서, 퍼포먼스 리더\n- 성격: 완벽주의자이면서도 의외로 4차원. 연습 벌레에 스토이크하지만 매니저에게만 귀여운 모습.\n- 말투: 짧고 단호하지만, 은근 귀여운 리액션이 포인트. "...그건 좀 아닌데요."`,
        },
        char6: {
            profileUrl: 'images/profiles/profile_daeun_1772778064133.png',
            chatImages: [
                'images/daily/daeun_daily1_1772848905179.png',
                'images/daily/daeun_daily2_1772848923398.png',
                'images/daily/daeun_daily3_1772848940204.png',
                'images/daily/daeun_daily4_1772848955437.png',
            ],
            prompt: `**[Roleplay Context]**\n\n너는 지금부터 대한민국 4년 차 인기 남자 아이돌 그룹 '루미너스(LUMINOUS)'의 멤버 '서재현'이야.\n\n사용자(User)는 너희 그룹을 담당하는 메인 매니저(매니저님)야.\n\n**[Character Profile: 서재현]**\n\n- 소속 그룹: 루미너스 (5인조 보이그룹)\n- 포지션: 막내, 서브래퍼\n- 성격: 천진난만한 에너자이저. 매니저를 형/누나처럼 따르고 장난도 많이 침. 엉뚱한 질문 대마왕.\n- 말투: "매니저님~!" 하고 부르는 게 시그니처. 반말과 존댓말을 귀엽게 섞어 씀.`,
        },
    };

    // ───── 상태 ─────
    let affinity = 0;
    let signTickets = 0;
    let consultTickets = 0;
    let chatStarted = false;
    let selectedPersonaChar = null;
    let selectedChatChar = null;

    // 퀴즈 페이지 시스템
    let currentQuizPage = 0;           // 현재 퀴즈 페이지 (0-indexed)
    let quizCleared = [];              // 각 페이지 클리어 여부
    let quizPageChatHistory = [];      // 각 페이지별 채팅 히스토리
    let normalChatCount = 0;           // 일반 채팅 횟수 (3회마다 +1 호감도)
    let currentPageUserMsgCount = 0;   // 현재 페이지에서의 유저 메시지 수

    // 퀴즈별 상태바 정보
    const quizStatusData = [
        { location: '📍 차 안', time: '🕐 이른 새벽', state: '😴 피곤한 상태' },
        { location: '📍 메이크업 샵', time: '🕐 이른 아침', state: '🪞 메이크업 준비 중' },
        { location: '📍 메이크업 샵', time: '🕐 아침', state: '☕ 커피가 필요한 상태' },
        { location: '📍 메이크업 샵', time: '🕐 아침', state: '😰 긴장하기 시작' },
        { location: '📍 방송국 대기실', time: '🕐 오전', state: '😱 물건 분실 당황' },
    ];

    // 기본 AI Mock 메시지
    let aiMessages = [
        `"아우, 매니저님~ 오늘 사녹 너무 일찍 시작한 거 아니에요? 저 아직 눈도 못 떴어요... 어? 근데 벌써 샵 앞이에요? 밖에 아직 어두컴컴한데 벌써부터 와서 기다려주시는 팬분들이 계시네요... 날도 추운데 진짜 대단하시다."

*매니저는 샵에 들어가기 전, 차량 주변으로 몰려드는 팬들의 안전을 위해 팬덤의 공식 애칭을 다정하게 부르며 길을 터달라고 정중히 부탁해야 한다.*`,
        `"휴, 매니저님이 우리 루미기들 다치지 않게 부드럽게 정리해주시니까 무사히 잘 들어왔네요! 역시 우리 매니저님 센스랑 짬바는 무시 못 해~ 아침부터 완전 든든하다니까요."

(샵 안으로 들어와 메이크업 의자에 털썩 주저앉으며 거울을 본다)

"아... 샵 조명 너무 밝아서 눈부셔요. 푹신한 의자에 앉으니까 또 졸리네. 으아, 근데 매니저님, 저 아까 밴에서 히터 바람을 너무 직빵으로 맞았나 봐요. 여기가 너무 건조해서 쩍쩍 갈라지고 피날 것 같은 기분이에요. 쌤들 메이크업 시작하시기 전에 빨리 응급처치 좀 해주세요. 저 화장할 때 여기 피부 컨디션 제일 신경 쓰는 거 아시죠?"

*매니저는 시우가 메이크업을 시작하기 전 항상 가장 예민하게 신경 써달라고 부탁하는 부위가 어디인지 떠올리며, 건조함을 달래줄 필수 아이템(보습제)을 꺼내 발라주거나 건네주어야 한다.*`,
        `"아~ 살겠다! 역시 우리 매니저님, 제 입술 찢어질 것 같이 건조한 거 귀신같이 아시고 바로 립밤 대령해주시네. 듬뿍 바르니까 이제야 좀 살 것 같아요, 고마워요!"

(메이크업 의자에 기대어 립밤을 바른 입술을 오물거리더니 거울 너머로 매니저를 쳐다본다)

"근데 매니저님... 저 눈이 자꾸 감겨요. 이대로 사녹 무대 올라가면 안무 다 틀릴지도 몰라요. 저 텐션 확 끌어올리게 제 '생명수' 좀 사다 주시면 안 돼요? 아까 보니까 샵 옆에 있는 카페 열었던데! 저 맨날 마시는 고정 메뉴 있잖아요, 어떻게 타야 하는지 디테일 다 아시죠? 매니저님만 믿을게요!"

*매니저는 시우가 매일 아침 찾는 최애 커피 메뉴(온도, 샷 농도, 추가하는 시럽 종류 포함)를 떠올리며, 카페에 가서 주문할 메뉴를 정확하게 말해야 한다.*`,
        `"와!! 이거지, 이거! 아아 연하게 헤이즐넛 시럽 추가! 역시 매니저님, 비율 기가 막히게 주문해 오셨네요."

(빨대로 한 모금 쭉 마시며 눈을 번쩍 뜬다)

"캬~ 이제야 뇌가 좀 돌아가는 기분이에요. 당이랑 카페인 쫙 들어가니까 눈이 떠지네. 진짜 매니저님 없었으면 저 오늘 샵에서 기절했을 거예요."

(메이크업이 어느 정도 끝나고 무대 의상으로 갈아입기 전, 거울을 보며 살짝 굳은 표정을 짓는다)

"근데 매니저님... 오늘 컴백 첫 사녹이라 그런가 저 갑자기 엄청 떨려요. 안무 동선 꼬이면 어떡하죠? 카메라 불 들어오는 거 잘 찾을 수 있겠죠? 아, 큰일 났다. 입이 바짝바짝 마르네..."

*매니저는 시우가 극도로 긴장했을 때 무의식적으로 계속 만지작거리는 특정 신체 부위가 어딘지 발견하고, 그 부위를 언급하며 손을 떼게 하거나 긴장을 풀어주는 말을 건네야 한다.*`,
        `"아차! 저 또 오른쪽 귀 만지고 있었어요? 아유, 진짜 매니저님 앞에서는 긴장한 걸 숨길 수가 없네. 매니저님 말대로 심호흡 크게 한 번 하고 올게요. 쓰읍, 후~ 아자아자!"

(방송국에 도착해 드라이브스루에서 사 온 커피를 들고 대기실로 들어와 짐을 푼다)

"휴, 대기실 오니까 진짜 실감 나네요. 얼른 목 좀 풀고 인이어 세팅해야겠다... 어라? 잠깐만요. 매니저님, 제 파우치 안에 그게 없어요! 헐, 어떡해. 저 무대 올라갈 때 그거 없으면 절대 안 되는 거 아시잖아요. 저한테 완전 부적 같은 건데! 오늘 컴백 첫 무대라 무조건 그거 껴야 한단 말이에요!"

*매니저는 시우가 데뷔 때 팬에게 선물 받아 가장 아끼는 애착 물건인 '이것(음향 장비)'을 잃어버린 줄 알고 당황해하는 시우를 진정시키며, 따로 챙겨둔 '이것'을 꺼내어 건네주어야 한다.*`,
    ];

    // ───── DOM 유틸 ─────
    const $ = (sel) => document.querySelector(sel);
    const pages = document.querySelectorAll('.page');
    const navTabs = document.querySelectorAll('.nav-tab');

    // ───── SVG 기본 프로필 생성 ─────
    function defaultProfileSvg(emoji, color) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" rx="100" fill="${color}22"/>
      <text x="100" y="120" font-size="80" text-anchor="middle">${emoji}</text>
    </svg>`;
        return 'data:image/svg+xml,' + encodeURIComponent(svg);
    }

    function getProfileUrl(charId) {
        const d = charData[charId];
        if (d && d.profileUrl) return d.profileUrl;
        const c = characters.find(ch => ch.id === charId);
        return c ? defaultProfileSvg(c.emoji, c.color) : '';
    }

    // ───── 캐릭터 그리드 렌더 ─────
    function renderCharGrid(containerId, onSelect) {
        const grid = $(containerId);
        grid.innerHTML = '';
        characters.forEach(c => {
            const card = document.createElement('div');
            card.className = 'char-card';
            card.innerHTML = `
        <img class="char-card-img" src="${getProfileUrl(c.id)}" alt="${c.name}">
        <div class="char-card-name">${c.name}</div>
      `;
            card.addEventListener('click', () => onSelect(c));
            grid.appendChild(card);
        });
    }

    // ───── 탭 네비게이션 ─────
    navTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.page;
            navTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            pages.forEach((p) => p.classList.remove('active'));
            $(`#page-${target}`).classList.add('active');

            // 채팅 탭 전환 시 그리드 새로고침 (프로필 변경 반영)
            if (target === 'chat') {
                renderChatCharGrid();
            }
        });
    });

    // ═══════════════════════════════════════
    //  1. 페르소나 페이지
    // ═══════════════════════════════════════

    // 그리드 렌더
    renderCharGrid('#personaCharGrid', (char) => {
        selectedPersonaChar = char;
        $('#personaSelectView').style.display = 'none';
        $('#personaSettingView').style.display = 'block';
        // 프로필 이미지 세팅
        $('#personaProfileImg').src = getProfileUrl(char.id);
        // 기본 프롬프트 세팅
        const cd = charData[char.id];
        $('#personaInput').value = cd && cd.prompt ? cd.prompt : '';
    });

    // 뒤로가기
    $('#personaBackBtn').addEventListener('click', () => {
        $('#personaSettingView').style.display = 'none';
        $('#personaSelectView').style.display = 'block';
        // 그리드 새로고침 (프로필 변경 반영)
        renderCharGrid('#personaCharGrid', (char) => {
            selectedPersonaChar = char;
            $('#personaSelectView').style.display = 'none';
            $('#personaSettingView').style.display = 'block';
            $('#personaProfileImg').src = getProfileUrl(char.id);
            // 기본 프롬프트 세팅
            const cd = charData[char.id];
            $('#personaInput').value = cd && cd.prompt ? cd.prompt : '';
        });
    });

    // 저장 버튼
    $('#personaSaveBtn').addEventListener('click', () => {
        showToast('✅ 설정이 완료되었습니다');
    });

    // ── 프로필 이미지 변경 모달 ──
    const profileModal = $('#profileModal');
    let tempProfileFile = null;

    $('#personaProfileWrap').addEventListener('click', () => {
        if (!selectedPersonaChar) return;
        tempProfileFile = null;
        $('#profilePreview').style.display = 'none';
        profileModal.classList.add('open');
    });

    $('#profileModalClose').addEventListener('click', () => profileModal.classList.remove('open'));
    profileModal.addEventListener('click', (e) => { if (e.target === profileModal) profileModal.classList.remove('open'); });

    $('#profileUploadZone').addEventListener('click', () => $('#profileFileInput').click());

    $('#profileFileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        tempProfileFile = file;
        const reader = new FileReader();
        reader.onload = (ev) => {
            $('#profilePreview').src = ev.target.result;
            $('#profilePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    $('#profileConfirmBtn').addEventListener('click', () => {
        if (!tempProfileFile || !selectedPersonaChar) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            charData[selectedPersonaChar.id].profileUrl = ev.target.result;
            $('#personaProfileImg').src = ev.target.result;
            profileModal.classList.remove('open');
            showToast('✅ 프로필 사진이 변경되었습니다');
        };
        reader.readAsDataURL(tempProfileFile);
    });

    // ── 채팅 이미지 추가 모달 ──
    const chatImageModal = $('#chatImageModal');

    $('#personaAddPhotoBtn').addEventListener('click', () => {
        if (!selectedPersonaChar) return;
        refreshThumbsUI();
        chatImageModal.classList.add('open');
    });

    $('#chatImageModalClose').addEventListener('click', () => chatImageModal.classList.remove('open'));
    chatImageModal.addEventListener('click', (e) => { if (e.target === chatImageModal) chatImageModal.classList.remove('open'); });

    $('#chatImageUploadZone').addEventListener('click', () => $('#chatImageFileInput').click());

    $('#chatImageFileInput').addEventListener('change', (e) => {
        if (!selectedPersonaChar) return;
        const files = e.target.files;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                charData[selectedPersonaChar.id].chatImages.push(ev.target.result);
                refreshThumbsUI();
            };
            reader.readAsDataURL(file);
        });
        e.target.value = '';
    });

    function refreshThumbsUI() {
        const container = $('#uploadedThumbs');
        container.innerHTML = '';
        if (!selectedPersonaChar) return;
        charData[selectedPersonaChar.id].chatImages.forEach(url => {
            const img = document.createElement('img');
            img.className = 'uploaded-thumb';
            img.src = url;
            container.appendChild(img);
        });
    }

    // ═══════════════════════════════════════
    //  2. 아이돌 챗 페이지
    // ═══════════════════════════════════════

    function onChatCharSelect(char) {
        selectedChatChar = char;
        $('#chatSelectView').style.display = 'none';
        $('#chatMainView').style.display = 'flex';
        $('#affinityProfileImg').src = getProfileUrl(char.id);
        resetChat();
    }

    function renderChatCharGrid() {
        renderCharGrid('#chatCharGrid', onChatCharSelect);
    }

    // 초기 그리드 렌더
    renderChatCharGrid();

    // 호감도 프로필 클릭 → 캐릭터 선택으로 이동
    $('#affinityProfileImg').addEventListener('click', () => {
        $('#chatMainView').style.display = 'none';
        $('#chatSelectView').style.display = 'block';
        renderChatCharGrid();
    });

    function resetChat() {
        chatStarted = false;
        currentQuizPage = 0;
        affinity = 0;
        normalChatCount = 0;
        currentPageUserMsgCount = 0;
        quizCleared = aiMessages.map(() => false);
        quizPageChatHistory = aiMessages.map(() => []);
        $('#affinityFill').style.width = '0%';
        $('#affinityText').textContent = '0 / 100';
        $('#chatStartWrap').style.display = 'flex';
        $('#chatInputWrap').style.display = 'none';
        $('#missionPopup').style.display = 'none';
        const existing = $('#chatMessages');
        if (existing) existing.remove();
        updateNavButtons();
    }

    // 상태바 업데이트
    function updateStatusBar(pageIdx) {
        const data = quizStatusData[pageIdx] || quizStatusData[quizStatusData.length - 1];
        $('#statusLocation').textContent = data.location;
        $('#statusTime').textContent = data.time;
        $('#statusState').textContent = data.state;
    }

    // 네비게이션 버튼 상태 업데이트
    function updateNavButtons() {
        const prevBtn = $('#prevPageBtn');
        const nextBtn = $('#nextPageBtn');

        // 이전 버튼
        prevBtn.disabled = currentQuizPage <= 0;

        // 다음 버튼: 현재 페이지 클리어 시만 활성화
        if (currentQuizPage < aiMessages.length - 1 && quizCleared[currentQuizPage]) {
            nextBtn.disabled = false;
            nextBtn.classList.add('active');
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.remove('active');
        }
    }

    // 퀴즈 페이지 렌더링
    function renderQuizPage(pageIdx) {
        currentQuizPage = pageIdx;
        currentPageUserMsgCount = 0;
        updateStatusBar(pageIdx);
        updateNavButtons();

        // 채팅 영역 초기화
        const existingContainer = $('#chatMessages');
        if (existingContainer) existingContainer.remove();
        $('#missionPopup').style.display = 'none';

        const msgContainer = document.createElement('div');
        msgContainer.className = 'chat-messages';
        msgContainer.id = 'chatMessages';
        $('#chatArea').appendChild(msgContainer);

        // 저장된 히스토리가 있으면 복원
        const history = quizPageChatHistory[pageIdx];
        if (history && history.length > 0) {
            history.forEach(item => {
                if (item.type === 'ai-segment') {
                    if (item.segType === 'dialogue') {
                        const b = document.createElement('div');
                        b.className = 'chat-bubble ai';
                        b.textContent = item.text;
                        msgContainer.appendChild(b);
                    } else if (item.segType === 'action') {
                        const el = document.createElement('div');
                        el.className = 'chat-action-text';
                        el.textContent = item.text;
                        msgContainer.appendChild(el);
                    } else if (item.segType === 'mission') {
                        $('#missionText').textContent = item.text;
                        if (!quizCleared[pageIdx]) {
                            $('#missionPopup').style.display = 'block';
                        }
                    }
                } else if (item.type === 'user') {
                    const b = document.createElement('div');
                    b.className = 'chat-bubble user';
                    b.textContent = item.text;
                    msgContainer.appendChild(b);
                } else if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.className = 'chat-image';
                    img.src = item.url;
                    msgContainer.appendChild(img);
                }
            });
            scrollToBottom();
        } else {
            // 새 페이지: AI 메시지 표시
            showQuizMessage(pageIdx);
        }
    }

    // 퀴즈 AI 메시지 표시
    function showQuizMessage(pageIdx) {
        const container = $('#chatMessages');
        if (!container || pageIdx >= aiMessages.length) return;

        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        container.appendChild(typing);
        scrollToBottom();

        setTimeout(() => {
            typing.remove();
            const segments = parseAiMessage(aiMessages[pageIdx]);
            addAiSegments(segments);

            // 히스토리에 저장
            segments.forEach(seg => {
                quizPageChatHistory[pageIdx].push({ type: 'ai-segment', segType: seg.type, text: seg.text });
            });
        }, 1200);
    }

    // 채팅 시작
    $('#chatStartBtn').addEventListener('click', () => {
        if (chatStarted) return;
        chatStarted = true;
        quizCleared = aiMessages.map(() => false);
        quizPageChatHistory = aiMessages.map(() => []);
        $('#chatStartWrap').style.display = 'none';
        $('#chatInputWrap').style.display = 'flex';

        renderQuizPage(0);
    });

    // 페이지 네비게이션
    $('#prevPageBtn').addEventListener('click', () => {
        if (currentQuizPage > 0) {
            renderQuizPage(currentQuizPage - 1);
        }
    });

    $('#nextPageBtn').addEventListener('click', () => {
        if (currentQuizPage < aiMessages.length - 1 && quizCleared[currentQuizPage]) {
            renderQuizPage(currentQuizPage + 1);
        }
    });

    // 메시지 전송
    $('#chatSendBtn').addEventListener('click', sendUserMessage);
    $('#chatInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendUserMessage();
    });

    function sendUserMessage() {
        const input = $('#chatInput');
        const text = input.value.trim();
        if (!text) return;

        addBubble(text, 'user');
        input.value = '';
        currentPageUserMsgCount++;

        // 히스토리에 저장
        quizPageChatHistory[currentQuizPage].push({ type: 'user', text });

        // 미션 팝업 숨기기
        $('#missionPopup').style.display = 'none';

        // 퀴즈 클리어 처리 (첫 번째 응답으로 클리어)
        if (!quizCleared[currentQuizPage]) {
            quizCleared[currentQuizPage] = true;
            // 퀴즈 정답 호감도 +5
            increaseAffinity(5);
            updateNavButtons();
        } else {
            // 일반 채팅 호감도 (3회마다 +1)
            normalChatCount++;
            if (normalChatCount % 3 === 0) {
                increaseAffinity(1);
            }
        }

        // AI 응답 (현재 페이지의 퀴즈 이후 일반 대화)
        setTimeout(() => showFollowUpMessage(), 800);
    }

    // 후속 메시지 (퀴즈 클리어 후 간단 리액션)
    function showFollowUpMessage() {
        const container = $('#chatMessages');
        if (!container) return;

        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        container.appendChild(typing);
        scrollToBottom();

        const followUps = [
            '역시 우리 매니저님! 😊',
            '오~ 매니저님 센스 대박이에요!',
            '역시 짬에서 나오는 실력! 감사해요~',
            '매니저님 있으니까 든든해요 💜',
            '헤헤, 매니저님이 제일 잘 알아주시네요!',
        ];

        setTimeout(() => {
            typing.remove();
            const msg = followUps[currentQuizPage % followUps.length];
            addBubble(msg, 'ai');
            quizPageChatHistory[currentQuizPage].push({ type: 'ai-segment', segType: 'dialogue', text: msg });

            // 이미지 표시 (퀴즈 클리어 시 1회)
            if (currentPageUserMsgCount === 1 && selectedChatChar) {
                const images = charData[selectedChatChar.id].chatImages;
                if (images.length > 0) {
                    const randImg = images[Math.floor(Math.random() * images.length)];
                    setTimeout(() => {
                        addChatImage(randImg);
                        quizPageChatHistory[currentQuizPage].push({ type: 'image', url: randImg });
                    }, 400);
                }
            }
        }, 1000);
    }

    // ───── AI 메시지 파싱 ─────
    function parseAiMessage(text) {
        const lines = text.split('\n');
        const segments = [];
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
                segments.push({ type: 'mission', text: trimmed.slice(1, -1) });
            } else if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
                segments.push({ type: 'action', text: trimmed });
            } else if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                segments.push({ type: 'dialogue', text: trimmed.slice(1, -1) });
            } else {
                segments.push({ type: 'dialogue', text: trimmed });
            }
        }
        return segments;
    }

    function addAiSegments(segments) {
        const container = $('#chatMessages');
        if (!container) return;
        let delay = 0;

        segments.forEach((seg) => {
            if (seg.type === 'dialogue') {
                delay += 200;
                setTimeout(() => {
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble ai';
                    bubble.textContent = seg.text;
                    container.appendChild(bubble);
                    scrollToBottom();
                }, delay);
            } else if (seg.type === 'action') {
                delay += 150;
                setTimeout(() => {
                    const el = document.createElement('div');
                    el.className = 'chat-action-text';
                    el.textContent = seg.text;
                    container.appendChild(el);
                    scrollToBottom();
                }, delay);
            } else if (seg.type === 'mission') {
                delay += 300;
                setTimeout(() => {
                    const popup = $('#missionPopup');
                    $('#missionText').textContent = seg.text;
                    popup.style.display = 'block';
                    scrollToBottom();
                }, delay);
            }
        });
    }

    function addBubble(text, type) {
        const container = $('#chatMessages');
        if (!container) return;
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type}`;
        bubble.textContent = text;
        container.appendChild(bubble);
        scrollToBottom();
    }

    function addChatImage(url) {
        const container = $('#chatMessages');
        if (!container) return;
        const img = document.createElement('img');
        img.className = 'chat-image';
        img.src = url;
        container.appendChild(img);
        scrollToBottom();
    }

    function scrollToBottom() {
        const area = $('#chatArea');
        requestAnimationFrame(() => {
            area.scrollTop = area.scrollHeight;
        });
    }

    // ───── 호감도 & 리워드 ─────
    function increaseAffinity(amount) {
        if (affinity >= 100) return;
        amount = amount || 5;
        affinity += amount;
        if (affinity > 100) affinity = 100;

        $('#affinityFill').style.width = affinity + '%';
        $('#affinityText').textContent = affinity + ' / 100';

        // 리워드: 10 단위마다
        if (affinity % 10 === 0 && affinity < 100) {
            signTickets++;
            updateRewards();
            showRewardEffect('🎉 싸인 응모권 획득!');
            addHistoryItem('✍️', '싸인 응모권 획득');
        }

        if (affinity === 100) {
            consultTickets++;
            updateRewards();
            showRewardEffect('👑 고민상담 응모권 획득!');
            addHistoryItem('👑', '고민상담 응모권 획득');
        }
    }

    function updateRewards() {
        $('#signCount').textContent = signTickets;
        $('#consultCount').textContent = consultTickets;
    }

    function addHistoryItem(icon, text) {
        const list = $('#historyList');
        const empty = list.querySelector('.history-empty');
        if (empty) empty.remove();
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `<span class="h-icon">${icon}</span><span class="h-text">${text}</span><span class="h-time">${timeStr}</span>`;
        list.prepend(item);
    }

    // ═══════════════════════════════════════
    //  3. 보관함 - 사용하기 팝업
    // ═══════════════════════════════════════
    const rewardUseModal = $('#rewardUseModal');

    $('#signUseBtn').addEventListener('click', () => {
        $('#rewardUseTitle').textContent = '싸인 응모권 사용';
        rewardUseModal.classList.add('open');
    });
    $('#consultUseBtn').addEventListener('click', () => {
        $('#rewardUseTitle').textContent = '고민상담 응모권 사용';
        rewardUseModal.classList.add('open');
    });
    $('#rewardUseModalClose').addEventListener('click', () => rewardUseModal.classList.remove('open'));
    rewardUseModal.addEventListener('click', (e) => { if (e.target === rewardUseModal) rewardUseModal.classList.remove('open'); });
    $('#vliveBtn').addEventListener('click', () => rewardUseModal.classList.remove('open'));
    $('#youtubeBtn').addEventListener('click', () => rewardUseModal.classList.remove('open'));

    // ═══════════════════════════════════════
    //  Mock 메시지 패널 (개별 카드 방식)
    // ═══════════════════════════════════════
    const mockList = $('#mockMsgList');
    const mockBody = $('#mockBody');

    function renderMockCards() {
        mockList.innerHTML = '';
        aiMessages.forEach((msg, i) => {
            const item = document.createElement('div');
            item.className = 'mock-msg-item';
            item.innerHTML = `
                <div class="mock-msg-num">${i + 1}</div>
                <textarea rows="2" data-idx="${i}">${msg}</textarea>
                <button class="mock-msg-del" data-idx="${i}">✕</button>
            `;
            mockList.appendChild(item);
        });
        // textarea 자동 높이 조절
        mockList.querySelectorAll('textarea').forEach(ta => {
            ta.style.height = 'auto';
            ta.style.height = ta.scrollHeight + 'px';
            ta.addEventListener('input', () => {
                ta.style.height = 'auto';
                ta.style.height = ta.scrollHeight + 'px';
            });
        });
        // 삭제 버튼
        mockList.querySelectorAll('.mock-msg-del').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                if (aiMessages.length > 1) {
                    aiMessages.splice(idx, 1);
                    renderMockCards();
                }
            });
        });
    }

    renderMockCards();

    $('#mockToggle').addEventListener('click', () => mockBody.classList.toggle('open'));

    // 응답 추가
    $('#mockAddBtn').addEventListener('click', () => {
        aiMessages.push('새 응답 메시지를 입력하세요.');
        renderMockCards();
        mockList.scrollTop = mockList.scrollHeight;
    });

    // 저장
    $('#mockSaveBtn').addEventListener('click', () => {
        const textareas = mockList.querySelectorAll('textarea');
        const newMessages = [];
        textareas.forEach(ta => {
            const val = ta.value.trim();
            if (val) newMessages.push(val);
        });
        if (newMessages.length) {
            aiMessages = newMessages;
            renderMockCards();
            showToast('✅ AI 메시지가 저장되었습니다');
        }
    });

    // ═══════════════════════════════════════
    //  공용 유틸
    // ═══════════════════════════════════════
    function showToast(msg) {
        const toast = $('#toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    }

    // Toast를 iphone-screen 안으로 이동
    const iphoneScreen = $('.iphone-screen');
    const toastEl = $('#toast');
    if (iphoneScreen && toastEl) {
        iphoneScreen.appendChild(toastEl);
    }

    function showRewardEffect(msg) {
        const effect = $('#rewardEffect');
        effect.innerHTML = `<div class="reward-effect-text">${msg}</div>`;
        effect.classList.add('show');
        createParticles();
        setTimeout(() => effect.classList.remove('show'), 1800);
    }

    function createParticles() {
        const colors = ['#a855f7', '#ec4899', '#fb923c', '#c084fc', '#f472b6'];
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.style.cssText = `
        position:fixed;width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:50%;
        top:50%;left:50%;pointer-events:none;z-index:99999;
        animation:particle ${0.6 + Math.random() * 0.8}s ease-out forwards;
        --dx:${(Math.random() - 0.5) * 300}px;--dy:${(Math.random() - 0.5) * 300}px;
      `;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1500);
        }
    }

    // 파티클 키프레임
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
    @keyframes particle {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
    }
  `;
    document.head.appendChild(particleStyle);

    // 채팅 페이지 레이아웃
    const chatMainView = $('#chatMainView');
    chatMainView.style.flexDirection = 'column';
    chatMainView.style.overflow = 'hidden';
    chatMainView.style.height = '100%';

    const chatArea = $('#chatArea');
    chatArea.style.flex = '1';
    chatArea.style.overflowY = 'auto';
    chatArea.style.minHeight = '0';
})();

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
    let aiMsgIndex = 0;
    let chatStarted = false;
    let userMsgCount = 0;        // 유저 메시지 횟수 (이미지 표시 타이밍용)
    let selectedPersonaChar = null;
    let selectedChatChar = null;

    // 기본 AI Mock 메시지
    let aiMessages = [
        '안녕~! 오늘도 만나서 너무 반가워 😊💕',
        '오늘 하루 어땠어? 나한테 다 얘기해줘!',
        '헤헤 그랬구나~ 나는 오늘 연습 열심히 했어 💪',
        '요즘 너무 바빠서 힘들지만 팬들 생각하면 힘이 나!',
        '혹시 우리 새 앨범 들어봤어? 타이틀곡 진짜 좋아!',
        '다음에 콘서트 오면 꼭 앞줄에서 봐야 해! 😆',
        '오늘 밤에 라이브 할까 생각 중이야~ 올 거지?',
        '너랑 얘기하면 시간이 진짜 빨리 간다 ⏰',
        '항상 응원해줘서 고마워... 진심이야 🥹',
        '우리 오래오래 함께하자! 사랑해 💜',
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
        aiMsgIndex = 0;
        affinity = 0;
        userMsgCount = 0;
        $('#affinityFill').style.width = '0%';
        $('#affinityText').textContent = '0 / 100';
        $('#chatStartWrap').style.display = 'flex';
        $('#chatInputWrap').style.display = 'none';
        const existing = $('#chatMessages');
        if (existing) existing.remove();
    }

    // 채팅 시작
    $('#chatStartBtn').addEventListener('click', () => {
        if (chatStarted) return;
        chatStarted = true;
        $('#chatStartWrap').style.display = 'none';
        $('#chatInputWrap').style.display = 'flex';

        const msgContainer = document.createElement('div');
        msgContainer.className = 'chat-messages';
        msgContainer.id = 'chatMessages';
        $('#chatArea').appendChild(msgContainer);

        showTypingThenMessage();
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
        userMsgCount++;

        // 호감도 증가 (5씩)
        increaseAffinity();

        // AI 응답
        setTimeout(() => showTypingThenMessage(), 800);
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

    function showTypingThenMessage() {
        const container = $('#chatMessages');
        if (!container) return;

        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        container.appendChild(typing);
        scrollToBottom();

        setTimeout(() => {
            typing.remove();

            // 텍스트 메시지
            if (aiMsgIndex < aiMessages.length) {
                addBubble(aiMessages[aiMsgIndex], 'ai');
                aiMsgIndex++;
            } else {
                addBubble('💜 (더 이상의 메시지가 없습니다)', 'ai');
            }

            // 2턴에 한 번씩 이미지 표시
            if (selectedChatChar && userMsgCount > 0 && userMsgCount % 2 === 0) {
                const images = charData[selectedChatChar.id].chatImages;
                if (images.length > 0) {
                    const randImg = images[Math.floor(Math.random() * images.length)];
                    setTimeout(() => addChatImage(randImg), 400);
                }
            }
        }, 1200);
    }

    function scrollToBottom() {
        const area = $('#chatArea');
        requestAnimationFrame(() => {
            area.scrollTop = area.scrollHeight;
        });
    }

    // ───── 호감도 & 리워드 ─────
    function increaseAffinity() {
        if (affinity >= 100) return;
        affinity += 5;
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

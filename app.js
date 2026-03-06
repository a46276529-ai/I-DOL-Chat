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

    // 각 캐릭터별 데이터 저장 (프로필 + 일상사진)
    const charData = {
        char1: {
            profileUrl: 'images/profiles/profile_harin_1772777927736.png',
            chatImages: [
                'images/daily/harin_daily1_1772778091904.png',
                'images/daily/harin_daily2_1772778109816.png',
                'images/daily/harin_daily3_1772778124705.png',
                'images/daily/harin_daily4_1772778147972.png',
            ],
        },
        char2: {
            profileUrl: 'images/profiles/profile_yuna_1772777961962.png',
            chatImages: [
                'images/daily/yuna_daily1_1772778175781.png',
                'images/daily/yuna_daily2_1772778192276.png',
                'images/daily/yuna_daily3_1772778225253.png',
                'images/daily/yuna_daily4_1772778238978.png',
            ],
        },
        char3: {
            profileUrl: 'images/profiles/profile_seoyun_1772777977803.png',
            chatImages: [
                'images/daily/seoyun_daily1_1772778256329.png',
                'images/daily/seoyun_daily2_1772778281469.png',
                'images/daily/seoyun_daily3_1772778299780.png',
                'images/daily/seoyun_daily4_1772778312374.png',
            ],
        },
        char4: {
            profileUrl: 'images/profiles/profile_jiwoo_1772778001173.png',
            chatImages: [],
        },
        char5: {
            profileUrl: 'images/profiles/profile_minseo_1772778046950.png',
            chatImages: [],
        },
        char6: {
            profileUrl: 'images/profiles/profile_daeun_1772778064133.png',
            chatImages: [],
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
    //  Mock 메시지 패널
    // ═══════════════════════════════════════
    const mockArea = $('#mockMessagesArea');
    const mockBody = $('#mockBody');
    mockArea.value = aiMessages.join('\n');

    $('#mockToggle').addEventListener('click', () => mockBody.classList.toggle('open'));
    $('#mockSaveBtn').addEventListener('click', () => {
        const lines = mockArea.value.split('\n').filter((l) => l.trim());
        if (lines.length) {
            aiMessages = lines;
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

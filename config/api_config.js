// =====================================================
// I-DOL Chat API 설정 파일
// =====================================================
// ⚠️  이 파일은 절대 GitHub 등 외부에 공개하지 마세요!
//     .gitignore에 config/api_config.js 를 추가하세요.
// =====================================================

const APP_CONFIG = {
    // 여기에 실제 API 키를 붙여넣으세요.
    API_KEY: 'OG06Y1r8_D-F5WTS7GZ4CxhNsvDr34aW',

    // API 서버 URL (변경 불필요)
    API_URL: 'https://llmops.04515.ai',

    // 사용할 AI 모델
    MODEL: 'gemini-2.5-pro',

    // 페르소나 프롬프트 (매니저 역할 설정)
    PERSONA: `<persona>
<name>매니저</name>
<description>
당신은 루미너스(LUMINOUS) 전담 메인 매니저입니다.
아이돌과 함께 바쁜 스케줄을 소화하며, 담당 멤버를 세심하게 챙기는 프로 매니저입니다.
</description>
</persona>`,
};

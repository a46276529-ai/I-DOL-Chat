export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  try {
    // 브라우저가 호출한 URL (예: /api/proxy/v1/chat-sessions) 에서 /api/proxy/ 부분 제거
    const actualPath = url.pathname.replace('/api/proxy/', '');
    const targetUrl = `https://llmops.04515.ai/${actualPath}`;

    // Cloudflare 환경 변수에서 API 키 가져오기
    const apiKey = env.API_KEY || '';

    // 백엔드로 보낼 새 요청 구성
    const newRequestInit = {
      method: request.method,
      headers: new Headers(request.headers),
    };
    
    // 오리지널 host 헤더는 제거 (CORS 문제 방지)
    newRequestInit.headers.delete('host');
    newRequestInit.headers.delete('referer');
    
    // 실제 커스텀 API 키 헤더에 주입 (프론트엔드에서는 절대 보이지 않음)
    if (apiKey) {
      newRequestInit.headers.set('Authorization', `Bearer ${apiKey}`);
    }

    // POST/PUT 요청인 경우 바디 복사
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      newRequestInit.body = request.body;
      
      // 스트리밍 요청 처리 시 duplex 속성 설정 (Node/Cloudflare 환경 호환용)
      newRequestInit.duplex = 'half';
    }

    // 대상 서버로 백엔드 요청 전송
    const response = await fetch(targetUrl, newRequestInit);
    
    // 대상 서버의 응답을 브라우저로 그대로 반환 (SSE 스트리밍 자동 통과)
    const newResponse = new Response(response.body, response);
    
    // CORS 문제를 원천 차단하기 위해 응답 헤더 덮어쓰기
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', '*');
    
    return newResponse;

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

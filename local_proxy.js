const http = require('http');
const https = require('https');

http.createServer((req, res) => {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const options = {
        hostname: 'llmops.04515.ai',
        port: 443,
        path: req.url.replace('/proxy', ''),
        method: req.method,
        headers: {
            ...req.headers,
            host: 'llmops.04515.ai'
        }
    };
    
    const proxyReq = https.request(options, (proxyRes) => {
        // 응답 헤더 복사
        Object.keys(proxyRes.headers).forEach(key => {
            res.setHeader(key, proxyRes.headers[key]);
        });
        // 스트림을 위해 상태코드 작성
        res.writeHead(proxyRes.statusCode);
        proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });
    
    proxyReq.on('error', (e) => {
        console.error('Proxy Error:', e);
        res.writeHead(500);
        res.end(e.message);
    });
}).listen(3000, () => {
    console.log('Local CORS Proxy running on http://127.0.0.1:3000');
});

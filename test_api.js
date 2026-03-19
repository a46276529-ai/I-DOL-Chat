const API_KEY = "OG06Y1r8_D-F5WTS7GZ4CxhNsvDr34aW";

async function test() {
    try {
        const res1 = await fetch('http://127.0.0.1:3000/proxy/v1/chat-sessions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }
        });
        const session = await res1.json();
        
        const payload = {
            model: "gemini-2.5-pro",
            context: {
                messages: [{ role: "user", content: "hello test", createdAt: new Date().toISOString() }],
                persona: "friendly AI",
                character: "AI"
            }
        };

        const res2 = await fetch(`http://127.0.0.1:3000/proxy/v1/chat-sessions/${session.id}/talk`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const reader = res2.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let sseBuffer = '';
        while(true) {
            const {done, value} = await reader.read();
            if(done) break;
            sseBuffer += decoder.decode(value, { stream: true });
            const lines = sseBuffer.split('\n');
            sseBuffer = lines.pop() || '';
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataStr = line.slice(6).trim();
                    if (!dataStr || dataStr === '[DONE]') continue;
                    try {
                        const parsed = JSON.parse(dataStr);
                        console.log("Got type:", parsed.type);
                        if(parsed.type !== 'reasoning-delta' && parsed.type !== 'start' && parsed.type !== 'start-step' && parsed.type !== 'reasoning-start') {
                           console.log(parsed);
                        }
                    } catch(e) {}
                }
            }
        }
    } catch (e) {}
}
test();

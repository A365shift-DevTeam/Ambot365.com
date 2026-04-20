import dotenv from 'dotenv';
import express from 'express';
import net from 'net';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_BASE_URL = process.env.API_BASE_URL || 'http://api:8080';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom SMTP client using net module to avoid third-party libraries
function sendMailNative({ from, to, subject, body }) {
    return new Promise((resolve, reject) => {
        const client = net.createConnection(587, process.env.SMTP_HOST || 'smtp.gmail.com', () => {
            console.log('Connected to SMTP server');
        });

        let step = 0;
        const host = process.env.SMTP_HOST || 'smtp.gmail.com';
        const user = Buffer.from(process.env.SMTP_USER || '').toString('base64');
        const pass = Buffer.from(process.env.SMTP_PASS || '').toString('base64');

        client.on('data', (data) => {
            const response = data.toString();
            console.log('SMTP:', response);

            if (step === 0 && response.startsWith('220')) {
                client.write(`EHLO ${host}\r\n`);
                step++;
            } else if (step === 1 && response.startsWith('250')) {
                client.write('AUTH LOGIN\r\n');
                step++;
            } else if (step === 2 && response.startsWith('334')) {
                client.write(`${user}\r\n`);
                step++;
            } else if (step === 3 && response.startsWith('334')) {
                client.write(`${pass}\r\n`);
                step++;
            } else if (step === 4 && response.startsWith('235')) {
                client.write(`MAIL FROM:<${from}>\r\n`);
                step++;
            } else if (step === 5 && response.startsWith('250')) {
                client.write(`RCPT TO:<${to}>\r\n`);
                step++;
            } else if (step === 6 && response.startsWith('250')) {
                client.write('DATA\r\n');
                step++;
            } else if (step === 7 && response.startsWith('354')) {
                const message = [
                    `From: ${from}`,
                    `To: ${to}`,
                    `Subject: ${subject}`,
                    'Content-Type: text/plain; charset=utf-8',
                    '',
                    body,
                    '.',
                    ''
                ].join('\r\n');
                client.write(message + '\r\n');
                step++;
            } else if (step === 8 && response.startsWith('250')) {
                client.write('QUIT\r\n');
                resolve({ success: true });
            } else if (response.startsWith('5')) {
                reject(new Error(`SMTP Error: ${response}`));
                client.end();
            }
        });

        client.on('error', (err) => {
            reject(err);
        });

        client.on('end', () => {
            console.log('Disconnected from SMTP server');
        });
    });
}

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        await sendMailNative({
            from: process.env.SMTP_USER,
            to: 'Info@ambot365.com',
            subject: `Contact Form: ${subject}`,
            body: body
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api-proxy', async (req, res) => {
    const targetUrl = `${API_BASE_URL}${req.originalUrl.replace(/^\/api-proxy/, '')}`;

    try {
        const upstreamResponse = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Content-Type': req.get('Content-Type') || 'application/json',
            },
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
        });

        const responseText = await upstreamResponse.text();
        res.status(upstreamResponse.status);

        const contentType = upstreamResponse.headers.get('content-type');
        if (contentType) {
            res.setHeader('content-type', contentType);
        }

        res.send(responseText);
    } catch (error) {
        console.error('API proxy error:', error);
        res.status(502).json({ error: 'Backend API is unavailable' });
    }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

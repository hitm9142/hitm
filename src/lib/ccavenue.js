import crypto from 'crypto';

export function getAlgorithm(keyBase64) {
    const key = Buffer.from(keyBase64, 'base64');
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';
    }
    throw new Error('Invalid key length: ' + key.length);
}

export function encrypt(plainText, workingKey) {
    // Generate Md5 hash for the key and then convert in base64 string
    const md5 = crypto.createHash('md5').update(workingKey).digest();
    const keyBase64 = Buffer.from(md5).toString('base64');

    // Initializing Vector and then convert in base64 string
    const ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');

    const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encText, workingKey) {
    // Generate Md5 hash for the key and then convert in base64 string
    const md5 = crypto.createHash('md5').update(workingKey).digest();
    const keyBase64 = Buffer.from(md5).toString('base64');

    // Initializing Vector and then convert in base64 string
    const ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');

    const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
    let decrypted = decipher.update(encText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export async function queryStatus(orderId, workingKey, accessCode, isProduction = true) {
    try {
        const payload = JSON.stringify({ order_no: orderId });
        const encRequest = encrypt(payload, workingKey);

        const apiEndpoint = isProduction
            ? 'https://api.ccavenue.com/apis/servlet/DoWebTrans'
            : 'https://apitest.ccavenue.com/apis/servlet/DoWebTrans';

        const postBody = new URLSearchParams();
        postBody.append('command', 'orderStatusTracker');
        postBody.append('access_code', accessCode);
        postBody.append('request_type', 'JSON');
        postBody.append('response_type', 'JSON');
        postBody.append('version', '1.2');
        postBody.append('enc_request', encRequest);

        const res = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postBody.toString(),
        });

        if (!res.ok) {
            throw new Error(`CCAvenue API responded with status ${res.status}`);
        }

        const responseText = await res.text();
        let encResponse = responseText.trim();

        if (encResponse.includes('enc_response=')) {
            const params = new URLSearchParams(encResponse);
            encResponse = params.get('enc_response') || encResponse;
        }

        const decrypted = decrypt(encResponse, workingKey);
        
        try {
            return JSON.parse(decrypted.trim());
        } catch (jsonErr) {
            if (decrypted.includes('=')) {
                const urlParams = new URLSearchParams(decrypted);
                const obj = {};
                for (const [key, val] of urlParams.entries()) {
                    obj[key] = val;
                }
                return obj;
            }
            throw new Error(`Failed to parse decrypted response: ${decrypted}`);
        }
    } catch (error) {
        console.error('Error querying CCAvenue transaction status:', error);
        throw error;
    }
}


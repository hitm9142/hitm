import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const imageUrl = new URL('/images/logo/ahct-logo.png', baseUrl).href;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={imageUrl}
                    alt="HITM logo"
                    width={64}
                    height={64}
                    style={{ objectFit: 'contain' }}
                />
            </div>
        ),
        size
    );
}
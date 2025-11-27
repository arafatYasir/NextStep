import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366F1" />
                        <stop offset="1" stopColor="#A855F7" />
                    </linearGradient>
                </defs>
                <circle cx="220" cy="220" r="160" stroke="url(#paint0_linear)" strokeWidth="40" strokeLinecap="round" />
                <path d="M335 335L460 460" stroke="url(#paint0_linear)" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M110 220 H160 L190 130 L250 310 L280 220 H330" stroke="url(#paint0_linear)" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    )
}
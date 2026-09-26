import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'moon-white': '#F4F6F0',
        'silver': '#A0AEC0',
        'pearl': '#EAE0C8',
        'midnight-blue': '#070A14',
        'space-black': '#050505',
        'moon-glow': '#F0E68C',
        // Retro Privacy Vault Color Palette
        'terminal-green': '#00FF66',
        'terminal-dim': '#059669',
        'cyber-cyan': '#00F0FF',
        'cyber-blue': '#0284C7',
        'arcade-amber': '#F59E0B',
        'danger-red': '#EF4444',
        'vault-bg': '#070708',
        'vault-panel': '#0D0E12',
        'vault-card': '#12141A',
        'vault-border': '#222634',
        'vault-border-glow': '#2DD4BF',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', boxShadow: '0 0 15px 5px rgba(0, 255, 102, 0.15)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px 8px rgba(0, 255, 102, 0.3)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        covenant: {
          bg: '#000000',
          surface: '#080808',
          'surface-2': '#0f0f0f',
          border: '#1a1a1a',
          text: '#fafafa',
          'text-dim': '#666666',
          accent: '#ffffff',
          'accent-dim': '#cccccc',
          danger: '#ff4444',
          warning: '#888888',
          info: '#aaaaaa',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.4s ease-out forwards',
        'scan-line': 'scan-line 3s linear infinite',
      },
    },
  },
  plugins: [],
}

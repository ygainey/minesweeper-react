/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'windows-main': "url('https://res.cloudinary.com/dr9aiqtjj/image/upload/v1727453598/windows10main_1_umqe3q.png')",
        'windows-taskbar': "url('https://res.cloudinary.com/dr9aiqtjj/image/upload/v1727453598/windows10tb_1_t5sr6l.png')",
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}


import { Heart, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative text-center py-16 md:py-24 px-4">
      <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm animate-bounce-soft">
        <Sparkles className="text-lavender-300 w-5 h-5" />
        <span className="text-sm md:text-base text-peach-400 font-semibold">
          Made with love for you
        </span>
        <Sparkles className="text-lavender-300 w-5 h-5" />
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
        <span className="text-gradient">สำหรับคนโปรดของฉัน</span>
        <br />
        <span className="text-blush-400 inline-flex items-center gap-2 mt-2">
          แพรวา <Heart className="w-8 h-8 md:w-10 md:h-10 fill-blush-300 text-blush-400 animate-pulse-soft" />
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
        ยินดีต้อนรับสู่มุมเล็กๆ ที่สร้างมาเพื่อทำให้เธอยิ้ม
        <br className="hidden md:block" />
        เพราะความสุขของแพรวา คือความสุขของฉัน 💕
      </p>

      <div className="glass inline-block px-6 py-4 rounded-2xl shadow-lg max-w-lg mx-auto animate-fade-in">
        <p className="text-base md:text-lg font-bold text-lavender-300 mb-1">
          มุกประจำตัวของเรา 🎭
        </p>
        <p className="text-xl md:text-2xl font-extrabold text-gradient">
          น้าหมาก็ชอบ ลัคกี้ก็สนุก
        </p>
        <p className="text-sm text-gray-500 mt-2">
          (และฉันก็รักเธอที่สุดในโลก ❤️)
        </p>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {['💕', '🌸', '✨', '🎀', '🦋'].map((emoji, i) => (
          <span
            key={i}
            className="text-2xl md:text-3xl animate-bounce-soft"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </section>
  )
}

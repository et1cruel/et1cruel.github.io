import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative px-4 py-12 mt-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass rounded-3xl p-8 md:p-10 shadow-lg">
          <Heart className="w-10 h-10 text-blush-400 fill-blush-300 mx-auto mb-4 animate-pulse-soft" />

          <p className="text-xl md:text-2xl font-bold text-gradient mb-3">
            รักแพรวาเสมอ ❤️
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            ขอให้ทุกวันของเธอเต็มไปด้วยรอยยิ้ม ความสุข และความอบอุ่น
            <br />
            ไม่ว่าจะเกิดอะไรขึ้น ฉันจะอยู่ข้างๆ เธอเสมอ
          </p>

          <p className="text-sm text-gray-400 italic">
            "น้าหมาก็ชอบ ลัคกี้ก็สนุก — แต่ความสุขที่สุดคือมีแพรวาอยู่ข้างๆ"
          </p>

          <div className="mt-6 flex justify-center gap-2 text-2xl">
            {['💕', '🐶', '🌸', '✨', '💫'].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Made with 💕 for แพรวา · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

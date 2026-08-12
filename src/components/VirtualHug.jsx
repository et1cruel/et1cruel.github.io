import { useState } from 'react'
import { HeartHandshake, Flame, Sparkles } from 'lucide-react'
import { hugMessages } from '../data/messages'

export default function VirtualHug() {
  const [activeMessage, setActiveMessage] = useState('')
  const [showBurst, setShowBurst] = useState(false)
  const [burstEmoji, setBurstEmoji] = useState('')

  const triggerEffect = (type) => {
    const messages = hugMessages
    const msg = messages[Math.floor(Math.random() * messages.length)]
    setActiveMessage(msg)

    const emojis = type === 'hug'
      ? ['🤗', '💕', '🫂', '❤️']
      : ['🔥', '☀️', '🌸', '✨', '💖']

    setBurstEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    setShowBurst(true)
    setTimeout(() => setShowBurst(false), 1500)
  }

  return (
    <section className="px-4 py-10">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
          ส่งกอด & ความอบอุ่น
        </h2>
        <p className="text-gray-500 mb-8">กดปุ่มแล้วรับพลังบวกทันที! ⚡</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => triggerEffect('hug')}
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blush-200 to-blush-300 text-white font-bold text-lg px-6 py-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <HeartHandshake className="w-7 h-7" />
            ส่งกอดให้แพรวา
          </button>

          <button
            onClick={() => triggerEffect('warmth')}
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-peach-200 to-peach-300 text-white font-bold text-lg px-6 py-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Flame className="w-7 h-7" />
            ส่งความอบอุ่น
          </button>
        </div>

        <div className="relative min-h-[80px]">
          {showBurst && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl animate-scale-in">{burstEmoji}</span>
            </div>
          )}

          {activeMessage && (
            <div key={activeMessage} className="glass rounded-2xl p-5 shadow-md animate-fade-in">
              <Sparkles className="w-5 h-5 text-lavender-300 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-700">{activeMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

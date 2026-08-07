import { useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import { compliments } from '../data/messages'

export default function ComplimentButton() {
  const [message, setMessage] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [usedIndices, setUsedIndices] = useState([])

  const getRandomCompliment = () => {
    setIsAnimating(true)

    let available = compliments
      .map((_, i) => i)
      .filter((i) => !usedIndices.includes(i))

    if (available.length === 0) {
      setUsedIndices([])
      available = compliments.map((_, i) => i)
    }

    const idx = available[Math.floor(Math.random() * available.length)]
    setUsedIndices((prev) => [...prev, idx])
    setMessage(compliments[idx])

    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <section className="px-4 py-10">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-7 h-7 text-lavender-300" />
          ปุ่มสุ่มคำชม
          <Sparkles className="w-7 h-7 text-lavender-300" />
        </h2>
        <p className="text-gray-500 mb-6">กดแล้วรับคำชมฟรี! ไม่จำกัดจำนวน 😊</p>

        <button
          onClick={getRandomCompliment}
          className="group relative bg-gradient-to-r from-blush-300 to-peach-300 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-soft"
        >
          <span className="flex items-center gap-2">
            <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            สุ่มคำชมให้แพรวา!
          </span>
        </button>

        {message && (
          <div
            key={message}
            className={`mt-8 glass rounded-2xl p-6 shadow-md ${isAnimating ? 'animate-wiggle' : 'animate-scale-in'}`}
          >
            <p className="text-lg md:text-xl font-semibold text-gray-700 leading-relaxed">
              {message}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

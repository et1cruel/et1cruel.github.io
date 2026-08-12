import { useState } from 'react'
import { Heart, RotateCcw } from 'lucide-react'
import { loveReasons } from '../data/messages'

export default function LoveCards() {
  const [flipped, setFlipped] = useState({})
  const [shuffled, setShuffled] = useState(loveReasons)

  const toggleCard = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const resetCards = () => {
    setFlipped({})
    setShuffled([...loveReasons].sort(() => Math.random() - 0.5))
  }

  return (
    <section className="px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2 flex items-center justify-center gap-2">
            <Heart className="w-7 h-7 text-blush-400 fill-blush-300" />
            เหตุผลที่รักเธอ
          </h2>
          <p className="text-gray-500">กดการ์ดเพื่อเปิดดู~ มีเซอร์ไพรส์รออยู่ 🎴</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {shuffled.map((reason, index) => (
            <button
              key={index}
              onClick={() => toggleCard(index)}
              className="group perspective aspect-[3/4] cursor-pointer"
              aria-label={flipped[index] ? reason.text : 'เปิดการ์ด'}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  flipped[index] ? '[transform:rotateY(180deg)]' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Heart className="w-10 h-10 text-blush-300 fill-blush-200 mb-2 group-hover:animate-pulse-soft" />
                  <span className="text-sm font-semibold text-blush-400">กดเปิด 💌</span>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blush-100 to-lavender-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-md"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="text-3xl mb-2">{reason.emoji}</span>
                  <p className="text-sm md:text-base font-semibold text-gray-700 text-center leading-relaxed">
                    {reason.text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={resetCards}
            className="inline-flex items-center gap-2 text-blush-400 hover:text-blush-300 font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            สลับการ์ดใหม่
          </button>
        </div>
      </div>
    </section>
  )
}

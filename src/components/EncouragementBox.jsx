import { useState } from 'react'
import { MessageCircleHeart, ChevronRight } from 'lucide-react'
import { encouragements } from '../data/messages'

export default function EncouragementBox() {
  const [activeTab, setActiveTab] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  const current = encouragements[activeTab]

  const nextMessage = () => {
    setMessageIndex((prev) => (prev + 1) % current.messages.length)
  }

  const switchTab = (index) => {
    setActiveTab(index)
    setMessageIndex(0)
  }

  return (
    <section className="px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2 flex items-center justify-center gap-2">
            <MessageCircleHeart className="w-7 h-7 text-blush-400" />
            กล่องข้อความให้กำลังใจ
          </h2>
          <p className="text-gray-500">เลือกอารมณ์แล้วอ่านข้อความจากใจ 💌</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {encouragements.map((enc, i) => (
            <button
              key={i}
              onClick={() => switchTab(i)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === i
                  ? 'bg-gradient-to-r from-blush-300 to-peach-300 text-white shadow-md scale-105'
                  : 'glass text-gray-600 hover:bg-white/80'
              }`}
            >
              <span>{enc.emoji}</span>
              {enc.title}
            </button>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 shadow-lg text-center min-h-[180px] flex flex-col items-center justify-center">
          <span className="text-4xl mb-4">{current.emoji}</span>
          <p
            key={`${activeTab}-${messageIndex}`}
            className="text-lg md:text-xl font-semibold text-gray-700 leading-relaxed animate-fade-in"
          >
            {current.messages[messageIndex]}
          </p>

          <button
            onClick={nextMessage}
            className="mt-6 inline-flex items-center gap-1 text-blush-400 hover:text-blush-300 font-semibold transition-colors group"
          >
            ข้อความถัดไป
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

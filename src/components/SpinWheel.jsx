import { useState, useRef } from 'react'
import { RotateCw, UtensilsCrossed } from 'lucide-react'
import { wheelItems } from '../data/messages'

export default function SpinWheel() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const segmentAngle = 360 / wheelItems.length

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)

    const randomIndex = Math.floor(Math.random() * wheelItems.length)
    const spins = 5 + Math.random() * 3
    const targetAngle = spins * 360 + (360 - randomIndex * segmentAngle - segmentAngle / 2)
    const newRotation = rotation + targetAngle

    setRotation(newRotation)

    setTimeout(() => {
      setSpinning(false)
      setResult(wheelItems[randomIndex])
    }, 4000)
  }

  return (
    <section className="px-4 py-10">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2 flex items-center justify-center gap-2">
          <UtensilsCrossed className="w-7 h-7 text-peach-400" />
          วงล้อสุ่มกิจกรรม
        </h2>
        <p className="text-gray-500 mb-8">ไม่รู้จะทำอะไร? ให้วงล้อตัดสิน! 🎡</p>

        <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72 mb-8">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[24px] border-l-transparent border-r-transparent border-t-blush-400 drop-shadow-md" />
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-full h-full rounded-full shadow-xl border-4 border-white overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {wheelItems.map((item, i) => {
                const startAngle = (i * segmentAngle - 90) * (Math.PI / 180)
                const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180)
                const x1 = 100 + 95 * Math.cos(startAngle)
                const y1 = 100 + 95 * Math.sin(startAngle)
                const x2 = 100 + 95 * Math.cos(endAngle)
                const y2 = 100 + 95 * Math.sin(endAngle)
                const largeArc = segmentAngle > 180 ? 1 : 0
                const midAngle = ((i + 0.5) * segmentAngle - 90) * (Math.PI / 180)
                const textX = 100 + 60 * Math.cos(midAngle)
                const textY = 100 + 60 * Math.sin(midAngle)
                const textRotation = (i + 0.5) * segmentAngle

                return (
                  <g key={i}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 95 95 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                      stroke="white"
                      strokeWidth="1"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="7"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    >
                      {item.label.length > 14 ? item.label.slice(0, 12) + '..' : item.label}
                    </text>
                  </g>
                )
              })}
              <circle cx="100" cy="100" r="15" fill="white" stroke="#ffa3c0" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-lavender-200 to-lavender-300 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <RotateCw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
          {spinning ? 'กำลังหมุน...' : 'หมุนวงล้อ!'}
        </button>

        {result && !spinning && (
          <div key={result.label} className="mt-8 glass rounded-2xl p-6 shadow-md animate-scale-in">
            <p className="text-sm text-gray-500 mb-1">ผลลัพธ์คือ...</p>
            <p className="text-2xl font-extrabold text-gradient">{result.label}</p>
            <p className="text-sm text-gray-500 mt-2">ไปทำด้วยกันนะ! น้าหมาก็ชอบ ลัคกี้ก็สนุก 🎉</p>
          </div>
        )}
      </div>
    </section>
  )
}

import { useState, useRef } from 'react'
import { RotateCw, UtensilsCrossed, Sparkles } from 'lucide-react'
import { wheelItems } from '../data/messages'
import { foodWheels } from '../data/foodWheels'

const foodWheelMeta = {
  vegetables: { title: 'มีผัก 🥬', color: '#4ade80' },
  noVegetables: { title: 'ไม่มีผัก 🍖', color: '#f59e0b' },
  soup: { title: 'เน้นน้ำ / เมนูต้ม 🍲', color: '#38bdf8' },
  rice: { title: 'เน้นข้าว 🍚', color: '#fbbf24' },
}

function getRandomFood(categoryKey, previousResult) {
  const items = foodWheels[categoryKey]
  if (!items || items.length === 0) return null

  const available = previousResult ? items.filter((item) => item !== previousResult) : items
  const pool = available.length > 0 ? available : items
  return pool[Math.floor(Math.random() * pool.length)]
}

function FoodWheelCard({ categoryKey, state, onSpin, allSpinning }) {
  const items = foodWheels[categoryKey]
  const meta = foodWheelMeta[categoryKey]
  const segmentAngle = 360 / items.length

  return (
    <div className="glass rounded-3xl p-5 shadow-lg border border-white/70">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-extrabold text-gray-700">{meta.title}</h3>
        <span className="text-2xl">{categoryKey === 'vegetables' ? '🥬' : categoryKey === 'noVegetables' ? '🍖' : categoryKey === 'soup' ? '🍲' : '🍚'}</span>
      </div>

      <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 mb-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[24px] border-l-transparent border-r-transparent border-t-gray-700 drop-shadow-md" />
        </div>

        <div
          className="w-full h-full rounded-full shadow-xl border-4 border-white overflow-hidden"
          style={{
            transform: `rotate(${state.rotation}deg)`,
            transition: state.spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {items.map((item, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180)
              const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180)
              const x1 = 100 + 95 * Math.cos(startAngle)
              const y1 = 100 + 95 * Math.sin(startAngle)
              const x2 = 100 + 95 * Math.cos(endAngle)
              const y2 = 100 + 95 * Math.sin(endAngle)
              const largeArc = segmentAngle > 180 ? 1 : 0
              const midAngle = ((index + 0.5) * segmentAngle - 90) * (Math.PI / 180)
              const textX = 100 + 58 * Math.cos(midAngle)
              const textY = 100 + 58 * Math.sin(midAngle)
              const textRotation = (index + 0.5) * segmentAngle
              const colors = ['#a7f3d0', '#fbbf24', '#7dd3fc', '#fca5a5', '#c4b5fd', '#fdba74', '#86efac', '#f9a8d4', '#93c5fd', '#fcd34d']

              return (
                <g key={`${categoryKey}-${item}`}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 95 95 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={colors[index % colors.length]}
                    stroke="white"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="#374151"
                    fontSize="7"
                    fontWeight="700"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                  >
                    {item.length > 10 ? item.slice(0, 9) + '..' : item}
                  </text>
                </g>
              )
            })}
            <circle cx="100" cy="100" r="14" fill="white" stroke={meta.color} strokeWidth="3" />
          </svg>
        </div>
      </div>

      <button
        onClick={() => onSpin(categoryKey)}
        disabled={state.spinning || allSpinning}
        className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-lavender-200 to-lavender-300 text-white font-bold px-5 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <RotateCw className={`w-4 h-4 ${state.spinning ? 'animate-spin' : ''}`} />
        {state.spinning ? 'กำลังหมุน...' : 'หมุน'}
      </button>

      <div className="mt-4 min-h-[68px] flex items-center justify-center rounded-2xl bg-white/60 px-3 py-2 text-center shadow-sm">
        {state.result ? (
          <p className="text-sm md:text-base font-extrabold text-gradient">{state.result}</p>
        ) : state.spinning ? (
          <p className="text-sm text-gray-500">กำลังสุ่มเมนู...</p>
        ) : (
          <p className="text-sm text-gray-400">ยังไม่มีผลลัพธ์</p>
        )}
      </div>
    </div>
  )
}

export default function SpinWheel() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [allFoodSpinning, setAllFoodSpinning] = useState(false)
  const [foodWheelState, setFoodWheelState] = useState({
    vegetables: { spinning: false, result: null, rotation: 0 },
    noVegetables: { spinning: false, result: null, rotation: 0 },
    soup: { spinning: false, result: null, rotation: 0 },
    rice: { spinning: false, result: null, rotation: 0 },
  })
  const wheelRef = useRef(null)

  const segmentAngle = 360 / wheelItems.length
  const anyFoodSpinning = Object.values(foodWheelState).some((wheel) => wheel.spinning)

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

  const spinFoodWheel = (categoryKey) => {
    if (foodWheelState[categoryKey].spinning || allFoodSpinning) return

    const items = foodWheels[categoryKey]
    const previousResult = foodWheelState[categoryKey].result
    const selectedFood = getRandomFood(categoryKey, previousResult)
    const selectedIndex = items.indexOf(selectedFood)
    const spins = 5 + Math.random() * 3
    const targetAngle = spins * 360 + (360 - selectedIndex * (360 / items.length) - (360 / items.length) / 2)
    const newRotation = foodWheelState[categoryKey].rotation + targetAngle

    setFoodWheelState((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        spinning: true,
        result: null,
        rotation: newRotation,
      },
    }))

    setTimeout(() => {
      setFoodWheelState((prev) => ({
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          spinning: false,
          result: selectedFood,
        },
      }))
    }, 4000)
  }

  const spinAllFoodWheels = () => {
    if (anyFoodSpinning || allFoodSpinning) return

    setAllFoodSpinning(true)

    Object.keys(foodWheels).forEach((categoryKey) => {
      const items = foodWheels[categoryKey]
      const previousResult = foodWheelState[categoryKey].result
      const selectedFood = getRandomFood(categoryKey, previousResult)
      const selectedIndex = items.indexOf(selectedFood)
      const spins = 5 + Math.random() * 3
      const targetAngle = spins * 360 + (360 - selectedIndex * (360 / items.length) - (360 / items.length) / 2)
      const newRotation = foodWheelState[categoryKey].rotation + targetAngle

      setFoodWheelState((prev) => ({
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          spinning: true,
          result: null,
          rotation: newRotation,
        },
      }))

      setTimeout(() => {
        setFoodWheelState((prev) => ({
          ...prev,
          [categoryKey]: {
            ...prev[categoryKey],
            spinning: false,
            result: selectedFood,
          },
        }))
      }, 4000)
    })

    setTimeout(() => setAllFoodSpinning(false), 4200)
  }

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-lg mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2 flex items-center justify-center gap-2">
            <UtensilsCrossed className="w-7 h-7 text-peach-400" />
            วงล้อสุ่มกิจกรรม
          </h2>
          <p className="text-gray-500">ไม่รู้จะทำอะไร? ให้วงล้อตัดสิน! 🎡</p>

          <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72 mt-8 mb-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[24px] border-l-transparent border-r-transparent border-t-blush-400 drop-shadow-md" />
            </div>

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

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/70 px-5 py-3 rounded-full shadow-sm">
            <Sparkles className="w-5 h-5 text-lavender-300" />
            <p className="text-lg font-extrabold text-gray-700">วงล้อสุ่มอาหาร</p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={spinAllFoodWheels}
            disabled={allFoodSpinning || anyFoodSpinning}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-300 via-blush-300 to-lavender-300 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <RotateCw className={`w-5 h-5 ${allFoodSpinning ? 'animate-spin' : ''}`} />
            {allFoodSpinning ? 'กำลังสุ่มทั้งหมด...' : 'สุ่มทั้งหมด'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(foodWheelMeta).map((categoryKey) => (
            <FoodWheelCard
              key={categoryKey}
              categoryKey={categoryKey}
              state={foodWheelState[categoryKey]}
              onSpin={spinFoodWheel}
              allSpinning={allFoodSpinning}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { Heart, Sparkles, Star } from 'lucide-react'

const hearts = [
  { left: '10%', delay: '0s', size: 20, duration: '6s' },
  { left: '25%', delay: '1.5s', size: 16, duration: '7s' },
  { left: '45%', delay: '0.5s', size: 24, duration: '8s' },
  { left: '65%', delay: '2s', size: 18, duration: '6.5s' },
  { left: '80%', delay: '1s', size: 22, duration: '7.5s' },
  { left: '90%', delay: '3s', size: 14, duration: '9s' },
  { left: '55%', delay: '2.5s', size: 20, duration: '6s' },
  { left: '35%', delay: '4s', size: 16, duration: '8s' },
]

const icons = [Heart, Sparkles, Star]

export default function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h, i) => {
        const Icon = icons[i % icons.length]
        return (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: h.left,
              bottom: '-40px',
              animationDelay: h.delay,
              animationDuration: h.duration,
            }}
          >
            <Icon
              size={h.size}
              className="text-blush-300 fill-blush-200"
            />
          </div>
        )
      })}
    </div>
  )
}

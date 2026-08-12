import FloatingHearts from './components/FloatingHearts'
import HeroSection from './components/HeroSection'
import ComplimentButton from './components/ComplimentButton'
import LoveCards from './components/LoveCards'
import VirtualHug from './components/VirtualHug'
import SpinWheel from './components/SpinWheel'
import EncouragementBox from './components/EncouragementBox'
import Footer from './components/Footer'

function SectionDivider() {
  return (
    <div className="flex justify-center py-2">
      <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blush-200 via-peach-200 to-lavender-200" />
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cream-50 via-blush-100/30 to-lavender-50 overflow-x-hidden">
      <FloatingHearts />

      <main className="relative z-10">
        <HeroSection />
        <SectionDivider />
        <ComplimentButton />
        <SectionDivider />
        <LoveCards />
        <SectionDivider />
        <VirtualHug />
        <SectionDivider />
        <SpinWheel />
        <SectionDivider />
        <EncouragementBox />
        <Footer />
      </main>
    </div>
  )
}

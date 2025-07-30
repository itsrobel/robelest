import { Crown, Github, Linkedin, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="h-screen bg-[#faf4ed] text-[#575279] overflow-hidden relative">
      {/* Lion of Judah Watermark - Bottom Right */}
      <div className="absolute bottom-8 right-8 opacity-[0.04] pointer-events-none">
        <Image
          src="/images/lion-of-judah.png"
          alt="Lion of Judah"
          width={280}
          height={280}
          className="object-contain"
        />
      </div>

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric Lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#ea9d34]/10 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ea9d34]/10 to-transparent"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-1/4 w-2 h-2 bg-[#d7827e] rotate-45"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 border border-[#ea9d34] rotate-12"></div>
        <div className="absolute top-1/3 left-10 w-1 h-16 bg-[#ea9d34]/20"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <nav className="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea9d34]" />
            <span className="text-xs sm:text-sm font-medium">RE</span>
          </div>
          <div className="text-xs sm:text-sm text-[#9893a5] font-mono">2025</div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-12 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              {/* Left Side - Main Content */}
              <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                {/* Header */}
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light leading-[0.85] tracking-tight">
                    <span className="text-[#575279]">Robel Estifanos</span>
                  </h1>

                  <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#575279] max-w-lg">
                    Building software that <span className="italic text-[#d7827e]">amplifies human compassion</span> @
                    Trestle
                  </p>
                </div>

                {/* Mission & Values */}
                <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center gap-3 text-[#ea9d34] font-mono text-xs">
                      <span>01</span>
                      <div className="w-6 h-px bg-[#ea9d34]"></div>
                      <span>MISSION</span>
                      <Crown className="w-3 h-3 lg:w-4 lg:h-4 text-[#ea9d34]" />
                    </div>
                    <p className="text-sm lg:text-base text-[#575279] leading-relaxed">
                      Every API endpoint serves a greater purpose—connecting people with housing, healthcare, food
                      security, and dignity.
                    </p>
                  </div>
                </div>

                {/* Contact & Social */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-4 lg:gap-6 text-[#9893a5]">
                  <div className="flex items-center gap-3 text-[#9893a5]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Manhattan, NYC</span>
                  </div>
                  </div>

                </div>
              </div>

              {/* Right Side - Philosophy & Values Detail */}
              <div className="lg:col-span-5 space-y-6 lg:space-y-8">
                {/* Philosophy Quote */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="text-right">
                    <div className="text-[#ea9d34] font-mono text-xs mb-3 lg:mb-4">PHILOSOPHY</div>
                    <blockquote className="text-lg sm:text-xl lg:text-2xl font-light leading-tight text-[#575279] italic">
                      "Technology should serve humanity's <span className="text-[#d7827e]">highest aspirations</span>"
                    </blockquote>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-12 h-px bg-[#d7827e]"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-12 py-3 lg:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-4">
            <p className="text-[#9893a5] text-xs">
              © {new Date().getFullYear()} Robel Estifanos. Building bridges through technology.
            </p>
            <div className="flex items-center gap-2 text-[#9893a5] text-xs">
              <Crown className="w-3 h-3 text-[#ea9d34]" />
              <span>Heritage • Innovation • Impact</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

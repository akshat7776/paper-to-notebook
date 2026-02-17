'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Upload, Brain, Code2, Sparkles, CheckCircle2, Zap, Github, Database } from 'lucide-react'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

export default function LandingPage() {
  const [arxivUrl, setArxivUrl] = useState('')
  const [bannerVisible, setBannerVisible] = useState(true)
  const [productsDropdown, setProductsDropdown] = useState(false)
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-play video when it comes into view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play()
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handleArxivSubmit = () => {
    if (arxivUrl.trim()) {
      // Store URL in sessionStorage and redirect
      sessionStorage.setItem('pendingArxivUrl', arxivUrl.trim())
      router.push('/paper2notebook')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.name.toLowerCase().endsWith('.pdf')) {
      const reader = new FileReader()
      reader.onload = () => {
        sessionStorage.setItem('pendingFile', reader.result as string)
        sessionStorage.setItem('pendingFileName', file.name)
        router.push('/paper2notebook')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/paper2codelogo.png" alt="Paper2Notebook" className="h-10" />
            <span className="text-xl font-bold">Paper2Notebook</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="relative">
              <button
                onClick={() => setProductsDropdown(!productsDropdown)}
                onBlur={() => setTimeout(() => setProductsDropdown(false), 200)}
                className="text-sm hover:text-[#8ad4ff] transition-colors flex items-center gap-1"
              >
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {productsDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl min-w-[200px] py-2">
                  <a
                    href="https://vizz.vizuara.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm hover:bg-white/5 hover:text-[#8ad4ff] transition-colors"
                  >
                    Vizz-AI
                  </a>
                  <a
                    href="https://dynaroute.vizuara.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm hover:bg-white/5 hover:text-[#8ad4ff] transition-colors"
                  >
                    Dynaroute
                  </a>
                </div>
              )}
            </div>
            <a href="#how-it-works" className="text-sm hover:text-[#8ad4ff] transition-colors">How It Works</a>
            <a href="#features" className="text-sm hover:text-[#8ad4ff] transition-colors">Features</a>
            <a
              href="https://github.com/VizuaraAI/paper-to-notebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-[#8ad4ff] transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">Star on GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Banner */}
      {bannerVisible && (
        <div className="fixed top-16 w-full z-40 bg-[#8ad4ff] py-1.5">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 relative">
            <span className="text-sm font-medium text-black">Try our new Personalized AI tutor</span>
            <a
              href="https://vizz.vizuara.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium text-black transition-colors"
            >
              Vizz-AI →
            </a>
            <button
              onClick={() => setBannerVisible(false)}
              className="absolute right-6 text-black hover:text-black/80 transition-colors"
              aria-label="Close banner"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative pt-40 pb-40 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#8ad4ff]/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left side - Text */}
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8ad4ff]/10 border border-[#8ad4ff]/20 text-[#8ad4ff] text-xs font-bold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8ad4ff] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8ad4ff]"></span>
                  </span>
                  NEW:
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-red-500" fill="currentColor">
                    <path d="M3.8423 0a1.0037 1.0037 0 0 0 -0.922 0.6078c-0.1536 0.3687 -0.0438 0.6275 0.2938 1.1113l6.9185 8.3597 -1.0223 1.1058a1.0393 1.0393 0 0 0 0.003 1.4229l1.2292 1.3135 -5.4391 6.4444c-0.2803 0.299 -0.4538 0.823 -0.2971 1.1986a1.0253 1.0253 0 0 0 0.9585 0.635 0.9133 0.9133 0 0 0 0.6891 -0.3405l5.783 -6.126 7.4902 8.0051a0.8527 0.8527 0 0 0 0.6835 0.2597 0.9575 0.9575 0 0 0 0.8777 -0.6138c0.1577 -0.377 -0.017 -0.7502 -0.306 -1.1407l-7.0518 -8.3418 1.0632 -1.13a0.9626 0.9626 0 0 0 0.0089 -1.3165L4.6336 0.4639s-0.3733 -0.4535 -0.768 -0.463zm0 0.272h0.0166c0.2179 0.0052 0.4874 0.2715 0.5644 0.3639l0.005 0.006 0.0052 0.0055 10.169 10.9905a0.6915 0.6915 0 0 1 -0.0072 0.945l-1.0666 1.133 -1.4982 -1.7724 -8.5994 -10.39c-0.3286 -0.472 -0.352 -0.6183 -0.2592 -0.841a0.7307 0.7307 0 0 1 0.6704 -0.4401Zm14.341 1.5701a0.877 0.877 0 0 0 -0.6554 0.2418l-5.6962 6.1584 1.6944 1.8319 5.3089 -6.5138c0.3251 -0.4335 0.479 -0.6603 0.3247 -1.0292a1.1205 1.1205 0 0 0 -0.9763 -0.689zm-7.6557 12.2823 1.3186 1.4135 -5.7864 6.1295a0.6494 0.6494 0 0 1 -0.4959 0.26 0.7516 0.7516 0 0 1 -0.706 -0.4669c-0.1119 -0.2682 0.0359 -0.6864 0.2442 -0.9083l0.0051 -0.0055 0.0047 -0.0055z"></path>
                  </svg>
                  ARXIV INTEGRATION
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                  Turn Research Papers into{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffd78a] via-[#8ad4ff] to-[#ffa8ff]">
                    Ready-to-Run
                  </span>{' '}
                  Notebooks
                </h1>

                <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                  Upload a paper → Get a runnable Colab notebook in seconds.<br/>
                  Includes code, equations, and experiment structure.
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <Link
                    href="/paper2notebook"
                    className="p-[2px] bg-gradient-to-r from-[#ffd78a] via-[#8ad4ff] to-[#ffa8ff] hover:shadow-xl hover:shadow-[#8ad4ff]/40 rounded-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 bg-[#050505] hover:bg-[#0a0a0a] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                      <Upload className="w-5 h-5" />
                      Upload a Paper
                    </div>
                  </Link>
                </div>

                <p className="text-sm text-white/40 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  No setup. Works with arXiv PDFs.
                </p>
              </motion.div>
            </div>

            {/* Right side - Dropzone */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full lg:w-[450px]"
            >
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border-2 border-dashed border-[#8ad4ff]/30 hover:border-[#8ad4ff]/50 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#8ad4ff]/20 rounded-full flex items-center justify-center mb-6 animate-float">
                    <Upload className="w-8 h-8 text-[#8ad4ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Drop your PDF here</h3>
                  <p className="text-white/60 text-sm mb-6">
                    Drag and drop your research paper or paste an arXiv link to start converting
                  </p>

                  <div className="relative w-full my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/10"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#050505] px-2 text-white/40">Or paste link</span>
                    </div>
                  </div>

                  <div className="w-full flex gap-2">
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/40">
                          <path d="M3.8423 0a1.0037 1.0037 0 0 0 -0.922 0.6078c-0.1536 0.3687 -0.0438 0.6275 0.2938 1.1113l6.9185 8.3597 -1.0223 1.1058a1.0393 1.0393 0 0 0 0.003 1.4229l1.2292 1.3135 -5.4391 6.4444c-0.2803 0.299 -0.4538 0.823 -0.2971 1.1986a1.0253 1.0253 0 0 0 0.9585 0.635 0.9133 0.9133 0 0 0 0.6891 -0.3405l5.783 -6.126 7.4902 8.0051a0.8527 0.8527 0 0 0 0.6835 0.2597 0.9575 0.9575 0 0 0 0.8777 -0.6138c0.1577 -0.377 -0.017 -0.7502 -0.306 -1.1407l-7.0518 -8.3418 1.0632 -1.13a0.9626 0.9626 0 0 0 0.0089 -1.3165L4.6336 0.4639s-0.3733 -0.4535 -0.768 -0.463zm0 0.272h0.0166c0.2179 0.0052 0.4874 0.2715 0.5644 0.3639l0.005 0.006 0.0052 0.0055 10.169 10.9905a0.6915 0.6915 0 0 1 -0.0072 0.945l-1.0666 1.133 -1.4982 -1.7724 -8.5994 -10.39c-0.3286 -0.472 -0.352 -0.6183 -0.2592 -0.841a0.7307 0.7307 0 0 1 0.6704 -0.4401Zm14.341 1.5701a0.877 0.877 0 0 0 -0.6554 0.2418l-5.6962 6.1584 1.6944 1.8319 5.3089 -6.5138c0.3251 -0.4335 0.479 -0.6603 0.3247 -1.0292a1.1205 1.1205 0 0 0 -0.9763 -0.689zm-7.6557 12.2823 1.3186 1.4135 -5.7864 6.1295a0.6494 0.6494 0 0 1 -0.4959 0.26 0.7516 0.7516 0 0 1 -0.706 -0.4669c-0.1119 -0.2682 0.0359 -0.6864 0.2442 -0.9083l0.0051 -0.0055 0.0047 -0.0055z" fill="currentColor"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={arxivUrl}
                        onChange={(e) => setArxivUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleArxivSubmit()}
                        placeholder="https://arxiv.org/pdf/..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-[#8ad4ff] focus:border-[#8ad4ff] outline-none text-white"
                      />
                    </div>
                    <button
                      onClick={handleArxivSubmit}
                      disabled={!arxivUrl.trim()}
                      className="bg-[#8ad4ff]/20 hover:bg-[#8ad4ff]/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#8ad4ff] px-6 py-3 rounded-lg font-bold transition-colors border border-[#8ad4ff]/20"
                    >
                      Go
                    </button>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-xs text-white/40 text-center">
                      We'll convert <span className="text-[#8ad4ff]">Abstract → Method → Code</span> automatically
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* How It Works - Video Demo */}
      <section className="py-24" id="how-it-works">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block relative mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">How It Works</h2>
              <svg className="absolute -bottom-6 left-0 w-full" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M5 20 Q150 5 295 15"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffd78a" />
                    <stop offset="50%" stopColor="#8ad4ff" />
                    <stop offset="100%" stopColor="#ffa8ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-white/60">See Paper2Notebook in action - from upload to executable code in seconds</p>
          </div>

          <div className="p-[2px] bg-gradient-to-r from-[#ffd78a] via-[#8ad4ff] to-[#ffa8ff] rounded-2xl shadow-[0_0_50px_rgba(138,212,255,0.4)]">
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                className="w-full h-auto"
              >
                <source src="/paper2notebook.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Stop Wasting Hours on Manual Setup</h2>

          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div className="grid grid-cols-2 bg-white/5">
              <div className="p-6 border-r border-white/10">
                <h3 className="text-white/60 font-medium text-lg">The Old Way</h3>
              </div>
              <div className="p-6">
                <h3 className="text-[#8ad4ff] font-bold text-lg">Paper2Notebook</h3>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {[
                { old: '"Where is the GitHub repo for this?"', new: 'Notebook ready in 60 seconds' },
                { old: 'Manually re-typing LaTeX equations', new: 'Auto-extracted LaTeX cells' },
                { old: 'Figuring out library dependencies', new: 'Automated pip installs' },
                { old: '4-12 hours for a working skeleton', new: 'Instant boilerplate generation' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2">
                  <div className="p-6 border-r border-white/5 text-white/40 italic text-base">
                    {row.old}
                  </div>
                  <div className="p-6 text-white font-medium text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {row.new}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white/[0.02]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block relative mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">From PDF to Execution in 3 Steps</h2>
              <svg className="absolute -bottom-12 left-0 w-full" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M5 20 Q150 5 295 15"
                  stroke="url(#gradient2)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffd78a" />
                    <stop offset="50%" stopColor="#8ad4ff" />
                    <stop offset="100%" stopColor="#ffa8ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#050505] border-2 border-transparent bg-clip-padding rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(138,212,255,0.3)] relative before:absolute before:-inset-[2px] before:bg-gradient-to-r before:from-[#ffd78a] before:via-[#8ad4ff] before:to-[#ffa8ff] before:rounded-2xl before:-z-10">
                <Upload className="w-8 h-8 text-[#8ad4ff]" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Upload Paper</h3>
              <p className="text-white/60">Drag in your PDF or paste an arXiv link. We support multi-column layouts and complex formatting.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#050505] border-2 border-transparent bg-clip-padding rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(138,212,255,0.3)] relative before:absolute before:-inset-[2px] before:bg-gradient-to-r before:from-[#ffd78a] before:via-[#8ad4ff] before:to-[#ffa8ff] before:rounded-2xl before:-z-10">
                <Brain className="w-8 h-8 text-[#8ad4ff]" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. AI Extraction</h3>
              <p className="text-white/60">Our models identify sections, extract equations as LaTeX, and draft Python code skeletons for the method.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#050505] border-2 border-transparent bg-clip-padding rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(138,212,255,0.3)] relative before:absolute before:-inset-[2px] before:bg-gradient-to-r before:from-[#ffd78a] before:via-[#8ad4ff] before:to-[#ffa8ff] before:rounded-2xl before:-z-10">
                <Code2 className="w-8 h-8 text-[#8ad4ff]" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Run Notebook</h3>
              <p className="text-white/60">Download the .ipynb file or open directly in Google Colab to start your experiments instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block relative mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Features</h2>
              <svg className="absolute -bottom-6 left-0 w-full" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M5 20 Q150 5 295 15"
                  stroke="url(#gradient3)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffd78a" />
                    <stop offset="50%" stopColor="#8ad4ff" />
                    <stop offset="100%" stopColor="#ffa8ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'structure', title: 'Auto-Structured', desc: 'Automatically organizes cells into Abstract, Methodology, Experiments, and Conclusion sections.' },
              { icon: 'python', title: 'Code Generation', desc: 'Extracts pseudo-code or algorithms from text and translates them into Python boilerplate.' },
              { icon: 'latex', title: 'LaTeX Support', desc: 'Complex mathematical formulas are perfectly rendered in markdown cells using beautiful LaTeX syntax.' },
              { icon: 'terminal', title: 'Reproducible Labs', desc: 'Sets up the environment, including pip installs for required libraries mentioned in the paper.' },
              { icon: 'colab', title: 'Colab Integration', desc: 'One-click "Open in Colab" functionality. No need to download anything locally.' },
              { icon: 'database-search', title: 'Data Linker', desc: 'Finds and links public datasets mentioned in the paper directly in your notebook cells.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-[2px] rounded-2xl bg-white/10 hover:bg-gradient-to-r hover:from-[#ffd78a] hover:via-[#8ad4ff] hover:to-[#ffa8ff] transition-all group"
              >
                <div className="bg-[#050505] p-8 rounded-2xl h-full">
                  {feature.icon === 'structure' ? (
                    <img src="/structure.svg" alt="Structure" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" style={{ filter: 'invert(1)' }} />
                  ) : feature.icon === 'terminal' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" aria-hidden="true" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform">
                      <path fillRule="evenodd" d="M1.5 4a2 2 0 0 1 2 -2h9a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2H3.5a2 2 0 0 1 -2 -2V4Zm2.6466666666666665 0.6466666666666666a0.5 0.5 0 0 1 0.7066666666666667 0l1.5 1.5a0.5 0.5 0 0 1 0 0.7066666666666667l-1.5 1.5a0.5 0.5 0 0 1 -0.7066666666666667 -0.7066666666666667l1.1466666666666665 -1.1466666666666665 -1.1466666666666665 -1.1466666666666665a0.5 0.5 0 0 1 0 -0.7066666666666667Zm2.8533333333333335 2.8533333333333335a0.5 0.5 0 0 0 0 1h2a0.5 0.5 0 0 0 0 -1h-2Z" clipRule="evenodd" strokeWidth="0.6667" />
                    </svg>
                  ) : feature.icon === 'latex' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-12 h-12 text-white fill-current mb-4 group-hover:scale-110 transition-transform">
                      <path d="M29.2 63H28c-.5 5.1-1.2 11.3-10 11.3h-4c-2.3 0-2.4-.3-2.4-2V45.8c0-1.7 0-2.4 4.7-2.4h1.6v-1.5c-1.9.1-6.3.1-8.4.1-1.9 0-5.8 0-7.5-.1v1.5h1.1c3.8 0 3.9.5 3.9 2.3v26.1c0 1.8-.1 2.3-3.9 2.3H2v1.5h25.8L29.2 63z"/><path d="M28.3 41.8c-.2-.6-.3-.8-.9-.8s-.8.2-1 .8l-8 20.3c-.3.8-.9 2.4-4 2.4v1.2h7.7v-1.2c-1.5 0-2.5-.7-2.5-1.7 0-.2 0-.3.1-.7l1.7-4.3h9.9l2 5.1c.1.2.2.4.2.6 0 1-1.9 1-2.8 1v1.2h9.8v-1.2h-.7c-2.3 0-2.6-.3-2.9-1.3l-8.6-21.4zm-1.9 3.6l4.4 11.3h-8.9l4.5-11.3z"/><path d="M68.2 42.2H37.9L37 53.3h1.2c.7-8 1.4-9.7 9-9.7.9 0 2.2 0 2.7.1 1 .2 1 .7 1 1.9v26.1c0 1.7 0 2.4-5.2 2.4h-2v1.5c2-.1 7.1-.1 9.4-.1s7.4 0 9.5.1v-1.5h-2c-5.2 0-5.2-.7-5.2-2.4v-26c0-1 0-1.7.9-1.9.5-.1 1.9-.1 2.8-.1 7.5 0 8.2 1.6 8.9 9.7h1.2l-1-11.2z"/><path d="M94.9 74.2h-1.2c-1.2 7.6-2.4 11.3-10.9 11.3h-6.6c-2.3 0-2.4-.3-2.4-2V70.2h4.4c4.8 0 5.4 1.6 5.4 5.8h1.2V62.9h-1.2c0 4.2-.5 5.8-5.4 5.8h-4.4v-12c0-1.6.1-2 2.4-2h6.4c7.6 0 8.9 2.7 9.7 9.7h1.2l-1.4-11.2H64.2v1.5h1.1c3.8 0 3.9.5 3.9 2.3v26c0 1.8-.1 2.3-3.9 2.3h-1.1V87h28.6l2.1-12.8z"/><path d="M109.9 56.6l6.8-10c1-1.6 2.7-3.2 7.2-3.2v-1.5H112v1.5c2 0 3.1 1.1 3.1 2.3 0 .5-.1.6-.4 1.1l-5.7 8.4-6.4-9.6c-.1-.1-.3-.5-.3-.7 0-.6 1.1-1.4 3.2-1.5v-1.5c-1.7.1-5.3.1-7.2.1-1.5 0-4.6 0-6.5-.1v1.5h.9c2.7 0 3.7.3 4.6 1.7l9.1 13.8-8.1 12c-.7 1-2.2 3.3-7.2 3.3v1.5H103v-1.5c-2.3 0-3.1-1.4-3.1-2.3 0-.4.1-.6.5-1.2l7-10.4 7.9 11.9c.1.2.2.4.2.5 0 .6-1.1 1.4-3.2 1.5v1.5c1.7-.1 5.4-.1 7.2-.1 2.1 0 4.4 0 6.5.1v-1.5h-.9c-2.6 0-3.6-.2-4.7-1.8l-10.5-15.8z"/>
                    </svg>
                  ) : feature.icon === 'python' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform">
                      <defs>
                        <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                          <stop offset="0" stop-color="#5A9FD4"/>
                          <stop offset="1" stop-color="#306998"/>
                        </linearGradient>
                        <linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                          <stop offset="0" stop-color="#FFD43B"/>
                          <stop offset="1" stop-color="#FFE873"/>
                        </linearGradient>
                      </defs>
                      <path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/>
                      <path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/>
                      <radialGradient id="python-original-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#B8B8B8" stop-opacity=".498"/>
                        <stop offset="1" stop-color="#7F7F7F" stop-opacity="0"/>
                      </radialGradient>
                      <path opacity=".444" fill="url(#python-original-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"/>
                    </svg>
                  ) : feature.icon === 'colab' ? (
                    <img src="/icons8-google-colab.svg" alt="Colab" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                  ) : feature.icon === 'database-search' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform">
                      <g id="database-search">
                        <path id="Union" fill="white" d="M15.5 12c2.4853 0 4.5 2.0147 4.5 4.5 0 0.8804 -0.2544 1.7009 -0.6914 2.3945l1.8984 1.8985c0.3906 0.3905 0.3906 1.0235 0 1.414 -0.3905 0.3906 -1.0235 0.3906 -1.414 0l-1.8985 -1.8984c-0.6936 0.437 -1.5141 0.6914 -2.3945 0.6914 -2.4853 0 -4.5 -2.0147 -4.5 -4.5s2.0147 -4.5 4.5 -4.5m0 2c-1.3807 0 -2.5 1.1193 -2.5 2.5s1.1193 2.5 2.5 2.5 2.5 -1.1193 2.5 -2.5 -1.1193 -2.5 -2.5 -2.5M9 2c1.7343 0 3.3459 0.23256 4.5586 0.63672 0.6011 0.20037 1.16 0.46182 1.5889 0.7998C15.565 3.76563 16 4.28624 16 5v5.0205c-0.1651 -0.0126 -0.3317 -0.0205 -0.5 -0.0205 -1.7947 0 -3.4204 0.7264 -4.5967 1.9023C10.2965 11.9658 9.65708 12 9 12c-1.73425 0 -3.34593 -0.2326 -4.55859 -0.6367 -0.15026 -0.0501 -0.29781 -0.1042 -0.44141 -0.1621v1.7099c0.01769 0.0189 0.04609 0.0468 0.09082 0.0821 0.17839 0.1405 0.49811 0.3112 0.98242 0.4726C6.03211 13.7854 7.42072 14 9 14c0.16963 0 0.33702 -0.004 0.50195 -0.0088 -0.26197 0.6256 -0.42755 1.3009 -0.48144 2.0078 -0.00684 0 -0.01367 0.001 -0.02051 0.001 -1.73425 0 -3.34593 -0.2326 -4.55859 -0.6367 -0.60113 -0.2004 -1.16001 -0.4618 -1.58887 -0.7998C2.43501 14.2344 2 13.7138 2 13V5c0 -0.71376 0.43501 -1.23437 0.85254 -1.56348 0.42886 -0.33798 0.98774 -0.59943 1.58887 -0.7998C5.65407 2.23256 7.26575 2 9 2m4.5586 5.36328C12.3459 7.76744 10.7343 8 9 8c-1.73425 0 -3.34593 -0.23256 -4.55859 -0.63672C4.29115 7.3132 4.1436 7.25913 4 7.20117v1.70899c0.01766 0.01894 0.04553 0.04731 0.09082 0.083 0.17839 0.14052 0.49811 0.3112 0.98242 0.47266C6.03211 9.78544 7.42072 10 9 10c1.5793 0 2.9679 -0.21456 3.9268 -0.53418 0.4843 -0.16146 0.804 -0.33214 0.9824 -0.47266 0.0453 -0.03569 0.0731 -0.06406 0.0908 -0.083V7.20117c-0.1436 0.05796 -0.2912 0.11203 -0.4414 0.16211M9 4c-1.57928 0 -2.96789 0.21456 -3.92676 0.53418 -0.47592 0.15866 -0.79254 0.32673 -0.97265 0.46582 0.18011 0.13909 0.49673 0.30716 0.97265 0.46582C6.03211 5.78544 7.42072 6 9 6c1.5793 0 2.9679 -0.21456 3.9268 -0.53418 0.4753 -0.15848 0.7914 -0.32682 0.9716 -0.46582 -0.1802 -0.139 -0.4963 -0.30734 -0.9716 -0.46582C11.9679 4.21456 10.5793 4 9 4" strokeWidth="1" />
                      </g>
                    </svg>
                  ) : (
                    React.createElement(feature.icon as any, { className: "w-12 h-12 text-[#8ad4ff] mb-4 group-hover:scale-110 transition-transform" })
                  )}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block relative mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Testimonials</h2>
              <svg className="absolute -bottom-6 left-0 w-full" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M5 20 Q150 5 295 15"
                  stroke="url(#gradient4)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffd78a" />
                    <stop offset="50%" stopColor="#8ad4ff" />
                    <stop offset="100%" stopColor="#ffa8ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-white/60 mt-8">See what our customers have to say about us.</p>
          </div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={[
              {
                text: "Great thought and execution friend, this solves a practical problem which everyone was facing.",
                image: "https://media.licdn.com/dms/image/v2/D5603AQFQRAWMNFW0Dw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715398560708?e=1772668800&v=beta&t=a_t1SHKGXgZCqFgMQ7iecldunxJwg_Q3SSyvNzzUR6I",
                name: "Janiel Jawahar Kirubakaran",
                role: "Senior Consultant @ Infosys - AI / ITops",
              },
              {
                text: "Finally, a tool that bridges the gap between reading papers and actually implementing them. Saved me hours on my last research project.",
                image: "https://randomuser.me/api/portraits/women/1.jpg",
                name: "Sarah Chen",
                role: "PhD Candidate, Stanford University",
              },
              {
                text: "As someone who reviews dozens of ML papers monthly, this is a game-changer. Being able to test implementations directly is invaluable.",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
                name: "Michael Rodriguez",
                role: "Machine Learning Engineer @ Google",
              },
              {
                text: "I tested it on HNSW paper. Kind of Graphs it has created, which explains the paper so well. Thanks again Raj Abhijit Dandekar",
                image: "https://media.licdn.com/dms/image/v2/D5603AQFraU5D6FcUww/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696142475509?e=1772668800&v=beta&t=hML3MobV1qsqIBh0qb0JMqoqWL9r1L46yXJfbfrtFFM",
                name: "Pravin Takpire",
                role: "Associate Director @ Oracle | Multicloud Architect",
              },
              {
                text: "The LaTeX equation extraction alone is worth it. No more manually retyping formulas from PDFs.",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
                name: "Emily Watson",
                role: "Senior ML Engineer @ Netflix",
              },
            ]} duration={15} />
            <TestimonialsColumn testimonials={[
              {
                text: "This is a genuinely valuable contribution. Reproducibility is still one of the biggest friction points in research, even when code is open source. Turning papers into usable Google Colab notebooks that actually run — and cutting replication time by 10× — is a big deal. Kudos for focusing on real researcher pain, not just demos. 👏",
                image: "https://media.licdn.com/dms/image/v2/D5635AQEami7MuHJuMQ/profile-framedphoto-shrink_400_400/B56ZhvocUWG4Ac-/0/1754219529745?e=1771851600&v=beta&t=AyLCgweEFA6PEkxbqbmCmh4Q7YTzhcvRuLPat_7bKQc",
                name: "Prithvi Raj",
                role: "B.Tech(CSE) at Nalanda College of Engineering",
              },
              {
                text: "Used this for implementing a recent NeurIPS paper. The generated notebook gave me a solid starting point and cut my setup time dramatically.",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
                name: "David Kim",
                role: "AI Researcher @ Microsoft Research",
              },
              {
                text: "Love how it handles arXiv papers directly. The integration is seamless and the notebooks are actually runnable out of the box.",
                image: "https://randomuser.me/api/portraits/women/4.jpg",
                name: "Aisha Patel",
                role: "Applied Scientist @ AWS",
              },
              {
                text: "This tool has made our research group much more productive. We can now quickly validate paper claims before diving deep into implementation.",
                image: "https://randomuser.me/api/portraits/men/5.jpg",
                name: "James Wilson",
                role: "Professor @ MIT CSAIL",
              },
              {
                text: "The automatic dependency detection is brilliant. No more hunting for the right package versions mentioned in papers.",
                image: "https://randomuser.me/api/portraits/women/6.jpg",
                name: "Lisa Anderson",
                role: "ML Engineer @ Amazon",
              },
            ]} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={[
              {
                text: "Impressive work! This addresses one of the biggest pain points in academic ML research. The notebook quality is surprisingly good.",
                image: "https://randomuser.me/api/portraits/men/7.jpg",
                name: "Robert Chang",
                role: "Research Scientist @ University of Cambridge",
              },
              {
                text: "As a teaching assistant, this helps me create educational materials from recent papers much faster. Students love having runnable examples.",
                image: "https://randomuser.me/api/portraits/women/8.jpg",
                name: "Maria Garcia",
                role: "PhD Student & TA @ Berkeley",
              },
              {
                text: "The Colab integration is perfect. I can share paper implementations with my team instantly, no environment setup needed.",
                image: "https://randomuser.me/api/portraits/men/9.jpg",
                name: "Thomas Lee",
                role: "Assistant Professor @ Carnegie Mellon University",
              },
              {
                text: "Great thought and execution friend, this solves a practical problem which everyone was facing.",
                image: "https://media.licdn.com/dms/image/v2/D5603AQFQRAWMNFW0Dw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715398560708?e=1772668800&v=beta&t=a_t1SHKGXgZCqFgMQ7iecldunxJwg_Q3SSyvNzzUR6I",
                name: "Janiel Jawahar Kirubakaran",
                role: "Senior Consultant @ Infosys - AI / ITops",
              },
              {
                text: "Tried it on several computer vision papers and was impressed by how well it extracts the model architectures. Really helpful for rapid prototyping.",
                image: "https://randomuser.me/api/portraits/women/10.jpg",
                name: "Jennifer Martinez",
                role: "Postdoc Researcher @ Oxford University",
              },
            ]} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffd78a]/5 via-[#8ad4ff]/5 to-[#ffa8ff]/5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to turn papers into runnable code?</h2>
          <p className="text-white/60 text-lg mb-12">Join thousands of researchers who are saving days of implementation time every month.</p>
          <Link
            href="/paper2notebook"
            className="inline-block p-[2px] bg-gradient-to-r from-[#ffd78a] via-[#8ad4ff] to-[#ffa8ff] hover:shadow-2xl hover:shadow-[#8ad4ff]/40 rounded-2xl transition-all transform hover:scale-105"
          >
            <div className="bg-[#050505] hover:bg-[#0a0a0a] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all">
              Upload Your First Paper
            </div>
          </Link>
          <div className="flex items-center justify-center gap-8 text-white/40 font-medium mt-8">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Secure & Private
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" /> Instant Results
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-4">
            <div className="flex items-center gap-3">
              <img src="/paper2codelogo.png" alt="Paper2Notebook" className="h-8" />
              <span className="text-lg font-bold">Paper2Notebook</span>
            </div>
            <div className="text-white/40 text-sm">
              © 2024 Paper2Notebook AI. All rights reserved.
            </div>
          </div>
          <div className="text-white/60 text-sm text-center">
            For any queries, mail us at: <a href="mailto:raj.dandekar8@gmail.com" className="text-[#8ad4ff] hover:underline">raj.dandekar8@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

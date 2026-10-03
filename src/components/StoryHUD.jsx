import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sounds } from "./BirthdayCake/audioUtils";

const CHAPTERS = [
  { num: "01", name: "Where It All Began", subtitle: "Childhood & Early Days", scrollRatio: 0.04 },
  { num: "02", name: "A Letter from the Heart", subtitle: "Family & Roots", scrollRatio: 0.16 },
  { num: "03", name: "The Railway Journey", subtitle: "Tracks of Destiny", scrollRatio: 0.30 },
  { num: "04", name: "Sky & Global Horizons", subtitle: "World Adventures", scrollRatio: 0.48 },
  { num: "05", name: "Celebrations & Smiles", subtitle: "Joyful Milestones", scrollRatio: 0.78 },
  { num: "06", name: "Green Lights Ahead", subtitle: "The Future & Cake", scrollRatio: 0.93 },
];

export default function StoryHUD({ scrollProgress = 0 }) {
  const navigate = useNavigate();
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showMusicDisclaimer, setShowMusicDisclaimer] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [showChapterMenu, setShowChapterMenu] = useState(false);
  const autoScrollRaf = useRef(null);
  const menuRef = useRef(null);
  const musicToastTimerRef = useRef(null);

  const percent = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  // Determine active chapter based on progress
  const activeChapterIndex = CHAPTERS.slice()
    .reverse()
    .findIndex((c) => scrollProgress >= c.scrollRatio - 0.05);
  
  const activeChapter =
    activeChapterIndex !== -1
      ? CHAPTERS[CHAPTERS.length - 1 - activeChapterIndex]
      : CHAPTERS[0];

  const currentIdx = CHAPTERS.findIndex((c) => c.num === activeChapter.num);

  const triggerMusicDisclaimer = () => {
    setShowMusicDisclaimer(true);
    if (musicToastTimerRef.current) {
      clearTimeout(musicToastTimerRef.current);
    }
    musicToastTimerRef.current = setTimeout(() => {
      setShowMusicDisclaimer(false);
    }, 5500);
  };

  const toggleMusic = () => {
    const isPlaying = sounds.toggleAmbientMusic();
    setIsPlayingMusic(isPlaying);
    if (isPlaying) {
      triggerMusicDisclaimer();
    }
  };

  // Listen to ambient music start events
  useEffect(() => {
    const handleMusicStart = () => {
      setIsPlayingMusic(true);
      triggerMusicDisclaimer();
    };
    window.addEventListener("ambient-music-started", handleMusicStart);
    return () => {
      window.removeEventListener("ambient-music-started", handleMusicStart);
      if (musicToastTimerRef.current) {
        clearTimeout(musicToastTimerRef.current);
      }
    };
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowChapterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup music when leaving story
  useEffect(() => {
    return () => {
      sounds.stopAmbientMusic();
    };
  }, []);

  // Auto-scroll mechanism
  useEffect(() => {
    if (isAutoScrolling) {
      const step = () => {
        window.scrollBy({ top: 3.5, behavior: "instant" });
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50
        ) {
          setIsAutoScrolling(false);
          return;
        }
        autoScrollRaf.current = requestAnimationFrame(step);
      };
      autoScrollRaf.current = requestAnimationFrame(step);
    } else {
      if (autoScrollRaf.current) {
        cancelAnimationFrame(autoScrollRaf.current);
      }
    }

    return () => {
      if (autoScrollRaf.current) {
        cancelAnimationFrame(autoScrollRaf.current);
      }
    };
  }, [isAutoScrolling]);

  const jumpToChapter = (ratio) => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: maxScroll * ratio,
      behavior: "smooth",
    });
    setShowChapterMenu(false);
  };

  return (
    <>
      {/* 1. TOP DYNAMIC AMBER PROGRESS LINE */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-black/40 backdrop-blur-xs">
        <div
          className="relative h-full bg-linear-to-r from-amber-500 via-amber-300 to-yellow-200 transition-all duration-150 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
          style={{ width: `${percent}%` }}
        >
          {/* Glowing Trailing Bead */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_#fde047,0_0_18px_#f59e0b]" />
        </div>
      </div>

      {/* 2. SOLID FLOATING GLASS HUD NAVBAR */}
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <div
          ref={menuRef}
          className="relative pointer-events-auto flex items-center justify-between gap-2.5 sm:gap-4 rounded-full bg-neutral-950/80 backdrop-blur-2xl px-3 sm:px-5 py-2.5 sm:py-3 border border-white/10 ring-1 ring-white/5 shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-all duration-300 max-w-full text-stone-200"
        >
          {/* LEFT: BACK BUTTON & CHAPTER SELECTOR */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Back to Intro */}
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-white/15 px-3 py-1.5 text-xs sm:text-sm text-stone-300 hover:text-white border border-white/5 transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95"
              title="Return to Intro"
            >
              <span className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              <span className="hidden sm:inline font-medium">Intro</span>
            </button>

            {/* Divider */}
            <div className="h-4.5 w-px bg-white/10" />

            {/* Chapter Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setShowChapterMenu(!showChapterMenu)}
                className="group flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm border border-white/10 hover:border-amber-400/40 transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95"
              >
                {/* Live Pulse Beacon */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>

                {/* Chapter Number */}
                <span className="rounded-md bg-amber-400/15 border border-amber-400/30 px-1.5 py-0.5 text-[10px] font-mono text-amber-300 font-semibold leading-none">
                  {activeChapter.num}
                </span>

                {/* Chapter Title */}
                <span className="max-w-28 sm:max-w-44 md:max-w-60 truncate text-stone-100 font-medium tracking-wide">
                  {activeChapter.name}
                </span>

                {/* Chevron */}
                <span
                  className={`text-[10px] text-stone-400 transition-transform duration-200 ${
                    showChapterMenu ? "rotate-180 text-amber-300" : "group-hover:text-stone-200"
                  }`}
                >
                  ▾
                </span>
              </button>

              {/* Dropdown Menu */}
              {showChapterMenu && (
                <div className="absolute top-12 left-0 w-80 rounded-2xl border border-white/15 bg-neutral-950/95 backdrop-blur-3xl p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10 animate-fade-in z-50">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                      Story Timeline
                    </span>
                    <span className="text-[11px] font-mono text-stone-300 font-medium">
                      {percent}% Completed
                    </span>
                  </div>

                  <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                    {CHAPTERS.map((ch, idx) => {
                      const isCurrent = activeChapter.name === ch.name;
                      const isPassed = currentIdx > idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => jumpToChapter(ch.scrollRatio)}
                          className={`w-full text-left rounded-xl px-3 py-2.5 text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                            isCurrent
                              ? "bg-amber-400/15 text-white font-medium border border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                              : "text-stone-300 hover:bg-white/10 hover:text-white border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {/* Status Icon */}
                            <span
                              className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono ${
                                isCurrent
                                  ? "bg-amber-400 text-neutral-950 font-bold"
                                  : isPassed
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-white/10 text-stone-400"
                              }`}
                            >
                              {isPassed ? "✓" : ch.num}
                            </span>

                            <div>
                              <div className="truncate text-stone-100 font-medium group-hover:text-amber-200 transition-colors">
                                {ch.name}
                              </div>
                              <div className="text-[10px] text-stone-400 font-normal">
                                {ch.subtitle}
                              </div>
                            </div>
                          </div>

                          <span className="text-[10px] text-stone-500 group-hover:text-amber-300 font-mono ml-2">
                            {Math.round(ch.scrollRatio * 100)}%
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: PROGRESS CAPSULE (DESKTOP) */}
          <div
            className="hidden md:flex items-center gap-2.5 rounded-full bg-white/5 px-3 py-1.5 border border-white/5"
            title={`Story Progress: ${percent}%`}
          >
            <div className="w-16 sm:w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-amber-400 to-yellow-300 transition-all duration-150 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono font-medium text-stone-300">
              {percent}%
            </span>
          </div>

          {/* RIGHT: CONTROLS & CAKE BUTTON */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Auto-Scroll / Tour Button */}
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 border ${
                isAutoScrolling
                  ? "bg-amber-400/20 text-amber-200 border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                  : "bg-white/5 text-stone-300 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
              title={isAutoScrolling ? "Pause Auto Tour" : "Start Auto Tour"}
            >
              <span className={`text-[11px] ${isAutoScrolling ? "text-amber-300 animate-pulse" : "text-stone-400"}`}>
                {isAutoScrolling ? "⏸" : "▶"}
              </span>
              <span className="hidden lg:inline">
                {isAutoScrolling ? "Pause" : "Auto Tour"}
              </span>
            </button>

            {/* Music Button with Equalizer */}
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 border ${
                isPlayingMusic
                  ? "bg-amber-400/15 text-amber-200 border-amber-400/30 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                  : "bg-white/5 text-stone-400 border-white/5 hover:bg-white/10 hover:text-stone-200"
              }`}
              title={isPlayingMusic ? "Mute Background Music" : "Play Ambient Music"}
            >
              {isPlayingMusic ? (
                <div className="flex items-end gap-[2px] h-3.5 py-0.5">
                  <span className="w-0.5 bg-amber-300 rounded-full animate-eq-1" />
                  <span className="w-0.5 bg-amber-300 rounded-full animate-eq-2" />
                  <span className="w-0.5 bg-amber-300 rounded-full animate-eq-3" />
                  <span className="w-0.5 bg-amber-300 rounded-full animate-eq-4" />
                </div>
              ) : (
                <span className="text-xs text-stone-500">🔈</span>
              )}
              <span className="hidden lg:inline">
                {isPlayingMusic ? "Music On" : "Music Off"}
              </span>
            </button>

            {/* Cake Shortcut Button */}
            <button
              onClick={() => navigate("/cake")}
              className="group flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-500/10 border border-amber-400/40 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-amber-200 hover:from-amber-500/30 hover:to-yellow-500/20 hover:border-amber-300 hover:text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.15)] active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
              title="Go to 3D Birthday Cake"
            >
              <span className="text-xs sm:text-sm transition-transform duration-200 group-hover:scale-125 group-hover:rotate-6">🎂</span>
              <span className="hidden sm:inline font-semibold">Cake</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. MUSIC DISCLAIMER POPUP MODAL / TOAST */}
      <div
        className={`fixed top-18 sm:top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto sm:min-w-105 max-w-lg transition-all duration-500 ease-out pointer-events-none ${
          showMusicDisclaimer
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-6 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative pointer-events-auto overflow-hidden rounded-2xl bg-neutral-950/92 backdrop-blur-2xl border border-amber-400/35 ring-1 ring-white/10 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(251,191,36,0.15)] text-stone-100">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-500/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl" />

          <div className="flex items-start gap-3.5 sm:gap-4 relative z-10">
            {/* Animated Icon Badge */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-amber-400/20 to-yellow-500/10 border border-amber-400/40 text-xl shadow-[0_0_15px_rgba(251,191,36,0.25)]">
              <span className="animate-wiggle inline-block">🎶</span>
            </div>

            {/* Content */}
            <div className="flex-1 pr-2">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold tracking-wide text-amber-300">
                  Quick Heads Up!
                </h4>
                <span className="rounded-full bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                  Disclaimer
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                Don&apos;t take the music too seriously! 😂 Just vibe with the memories, enjoy the nostalgia, and have a good laugh!
              </p>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center gap-2.5">
                <button
                  onClick={() => setShowMusicDisclaimer(false)}
                  className="rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 px-3.5 py-1 text-xs font-medium text-amber-200 transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_0_10px_rgba(251,191,36,0.15)]"
                >
                  Haha got it 😄
                </button>
              </div>
            </div>

            {/* Close Cross Button */}
            <button
              onClick={() => setShowMusicDisclaimer(false)}
              className="shrink-0 rounded-full p-1 text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs leading-none"
              title="Dismiss"
            >
              ✕
            </button>
          </div>

          {/* Auto-Dismiss Progress Bar Timer */}
          {showMusicDisclaimer && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
              <div className="h-full bg-linear-to-r from-amber-400 via-yellow-300 to-amber-500 animate-toast-progress" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}


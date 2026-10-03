import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cake3D from "../components/BirthdayCake/Cake3D";
import ConfettiCanvas from "../components/BirthdayCake/ConfettiCanvas";
import { sounds } from "../components/BirthdayCake/audioUtils";

const ALL_MEMORIES = [
  // 1. Childhood & Roots (Early memories & childhood days)
  { id: 1, src: "/images/Main.jpg", title: "Cherished Early Days", category: "Childhood" },
  { id: 2, src: "/images/MaiNn.jpg", title: "Where It All Began", category: "Childhood" },
  { id: 3, src: "/images/papa/child/one.jpg", title: "Innocent Beginnings", category: "Childhood" },
  { id: 4, src: "/images/papa/child/two.jpg", title: "Treasured Family Roots", category: "Childhood" },
  { id: 5, src: "/images/papa/child/three.JPG", title: "Joyful Childhood Moments", category: "Childhood" },
  { id: 6, src: "/images/papa/child/four.JPG", title: "Early Adventures", category: "Childhood" },
  { id: 7, src: "/images/papa/child/five.JPG", title: "Always Our Hero", category: "Childhood" },

  // 2. Family & Warmth (Family moments & smiles)
  { id: 8, src: "/images/papa/child/six.JPG", title: "Warm Family Smiles", category: "Family & Warmth" },
  { id: 9, src: "/images/papa/child/seven.JPG", title: "Treasured Bonds", category: "Family & Warmth" },
  { id: 10, src: "/images/papa/child/Eigth.JPG", title: "Wisdom & Grace", category: "Family & Warmth" },
  { id: 11, src: "/images/papa/child/nine.JPG", title: "Endless Warmth & Love", category: "Family & Warmth" },
  { id: 12, src: "/images/papa/20240705_141601.jpg", title: "Golden Milestones", category: "Family & Warmth" },
  { id: 13, src: "/images/papa/Add-ons/20250201_110952.jpg", title: "Special Celebrations", category: "Family & Warmth" },

  // 3. Railway Journey (Train memories & journeys)
  { id: 14, src: "/images/papa/Add-ons/one.jpg", title: "Reflections on the Rails", category: "Railway Journey" },
  { id: 15, src: "/images/papa/Add-ons/two.jpg", title: "Journeys Across Tracks", category: "Railway Journey" },
  { id: 16, src: "/images/papa/Add-ons/three.JPG", title: "Nostalgic Horizons", category: "Railway Journey" },
  { id: 17, src: "/images/papa/Add-ons/Four.jpg", title: "Adventures on the Rails", category: "Railway Journey" },

  // 4. World Travels (International trips)
  { id: 18, src: "/images/papa/inter/one.jpg", title: "Adventures Across Borders", category: "World Travels" },
  { id: 19, src: "/images/papa/inter/two.jpg", title: "Iconic Cityscapes", category: "World Travels" },
  { id: 20, src: "/images/papa/inter/three.jpg", title: "Exploring Grand Sights", category: "World Travels" },
  { id: 21, src: "/images/papa/international/IMG-20200208-WA0021.jpg", title: "Frozen in Distant Lands", category: "World Travels" },
  { id: 22, src: "/images/papa/international/DSC02132.JPG", title: "Skylines & Architecture", category: "World Travels" },
  { id: 23, src: "/images/papa/international/DSC02180.JPG", title: "Historic Streets", category: "World Travels" },
  { id: 24, src: "/images/papa/international/DSC02240.JPG", title: "Heritage & Grandeur", category: "World Travels" },
  { id: 25, src: "/images/papa/international/DSC02297.JPG", title: "Continents Explored", category: "World Travels" },
  { id: 26, src: "/images/papa/international/DSC02303.JPG", title: "Sunlit Avenues", category: "World Travels" },
  { id: 27, src: "/images/papa/international/DSC02388.JPG", title: "Breathtaking Panoramas", category: "World Travels" },
  { id: 28, src: "/images/papa/international/DSC02543.JPG", title: "Under Distant Skies", category: "World Travels" },
  { id: 29, src: "/images/papa/international/DSC02591.JPG", title: "The Joy of Discovery", category: "World Travels" },
  { id: 30, src: "/images/papa/international/20251130_110919.jpg", title: "Modern Marvels", category: "World Travels" },
  { id: 31, src: "/images/papa/international/IMG_20200208_103058.jpg", title: "Famous Landmarks", category: "World Travels" },
  { id: 32, src: "/images/papa/international/IMG_20200208_104004.jpg", title: "City Wonders", category: "World Travels" },

  // 5. Celebrations (Recent celebrations, festivals, smiles)
  { id: 33, src: "/images/papa/inter/four.jpg", title: "Joyful Celebrations", category: "Celebrations" },
  { id: 34, src: "/images/papa/inter/five.jpg", title: "Laughter & Cheer", category: "Celebrations" },
  { id: 35, src: "/images/papa/inter/six.jpg", title: "Family Festive Delight", category: "Celebrations" },
  { id: 36, src: "/images/papa/inter/seven.jpg", title: "Golden Moments", category: "Celebrations" },
  { id: 37, src: "/images/papa/inter/eigth.jpg", title: "Joyful Gatherings", category: "Celebrations" },
  { id: 38, src: "/images/papa/inter/nine.JPG", title: "Bright Smiles & Radiance", category: "Celebrations" },
  { id: 39, src: "/images/papa/inter/ten.jpg", title: "Evening Festivities", category: "Celebrations" },
  { id: 40, src: "/images/papa/inter/eleven.jpg", title: "Forever With Papa", category: "Celebrations" },
];

const CATEGORIES = ["All Memories", "Childhood", "Family & Warmth", "World Travels", "Railway Journey", "Celebrations"];

export default function CakeScene() {
  const navigate = useNavigate();
  const [isLit, setIsLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showAlbum, setShowAlbum] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Memories");
  const [activeZoomPhoto, setActiveZoomPhoto] = useState(null);

  const handleBlowCandles = () => {
    sounds.playBlowSound();
    setIsLit(false);
    setShowConfetti(true);

    setTimeout(() => {
      sounds.playFanfare();
    }, 600);
  };

  const handleRelight = () => {
    sounds.playSparkleSound();
    setIsLit(true);
  };

  const filteredMemories = activeCategory === "All Memories"
    ? ALL_MEMORIES
    : ALL_MEMORIES.filter((m) => m.category === activeCategory);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-neutral-950 via-[#120D1A] to-neutral-950 text-stone-100 select-none">
      {/* Confetti & Fireworks Particle Layer */}
      <ConfettiCanvas active={showConfetti} />

      {/* Background Decorative Ambient Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-125 w-125 rounded-full bg-amber-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

      {/* Top Header & Navigation */}
      <header className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12">
        <button
          onClick={() => navigate("/papa")}
          className="group flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-[11px] font-light tracking-[0.25em] text-stone-300 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white cursor-pointer"
        >
          <span className="text-[10px] transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
          <span>STORY</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-[11px] font-light tracking-[0.2em] text-stone-300 transition-all duration-300 hover:border-neutral-700 hover:text-white cursor-pointer"
          >
            {autoRotate ? "PAUSE ROTATION" : "AUTO ROTATE"}
          </button>
          <button
            onClick={() => sounds.playFanfare()}
            className="rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-[11px] font-light tracking-[0.2em] text-stone-300 transition-all duration-300 hover:border-neutral-700 hover:text-white cursor-pointer flex items-center gap-1.5"
          >
            <span>♫</span>
            <span>MELODY</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center justify-between min-h-[calc(100vh-140px)] px-4 pb-8">
        
        {/* Title / Celebration Banner */}
        <div className="text-center pt-2 md:pt-4 max-w-xl mx-auto">
          <p className="text-[11px] font-light tracking-[0.45em] text-white/50 uppercase">
            A Sweet Celebration
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
            Happy Birthday, <span className="font-normal text-stone-200">Papa</span>
          </h1>

          <p className="mt-2 text-xs md:text-sm text-white/50 font-light">
            {isLit
              ? "Touch the cake to rotate it in 3D, and blow out the candles to celebrate."
              : "The candles are blown. Wishing you endless joy, health, and happiness."}
          </p>
        </div>

        {/* 3D Cake Interactive Canvas */}
        <div className="relative my-auto h-[48vh] sm:h-[52vh] md:h-[56vh] w-full max-w-2xl cursor-grab active:cursor-grabbing">
          <Cake3D isLit={isLit} autoRotate={autoRotate} />

          {/* Hint Overlay */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-neutral-800 bg-neutral-900/90 px-4 py-1 text-[10px] uppercase tracking-[0.25em] text-stone-400">
            Drag to rotate • Scroll to zoom
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          {isLit ? (
            <button
              onClick={handleBlowCandles}
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-8 text-xs font-normal uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              BLOW CANDLES
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-8 text-xs font-normal uppercase tracking-[0.2em] text-white/90 transition-all duration-300 hover:border-white hover:text-white hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              RELIGHT
            </button>
          )}

          <button
            onClick={() => {
              setShowConfetti(true);
              sounds.playSparkleSound();
            }}
            className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 px-7 text-xs font-normal uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-neutral-700 hover:text-white active:scale-95 cursor-pointer whitespace-nowrap"
            title="Pop Confetti"
          >
            CONFETTI
          </button>

          <button
            onClick={() => setShowAlbum(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-6 text-xs font-normal uppercase tracking-[0.2em] text-amber-200 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400/20 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>📷</span>
            <span>PHOTO ALBUM</span>
          </button>
        </div>

      </div>

      {/* FULL-SCREEN INTERACTIVE PHOTO ALBUM MODAL */}
      {showAlbum && (
        <div
          onClick={() => setShowAlbum(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-3 sm:p-6 transition-all duration-300 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col h-[90vh] w-full max-w-5xl rounded-3xl bg-neutral-950/95 border border-neutral-800 p-4 sm:p-6 shadow-2xl overflow-hidden"
          >
            {/* Album Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400">
                  Keepsake Collection
                </p>
                <h2 className="text-xl sm:text-2xl font-light tracking-tight text-stone-100">
                  Papa's Cherished Memories
                </h2>
              </div>

              <button
                onClick={() => setShowAlbum(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800 text-stone-400 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 py-3 border-b border-neutral-900 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-light tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-stone-200 text-neutral-950 font-normal shadow-sm"
                      : "bg-neutral-900 text-stone-400 hover:bg-neutral-800 hover:text-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="flex-1 overflow-y-auto pt-4 pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredMemories.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActiveZoomPhoto(photo)}
                  className="group relative aspect-4/5 overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800/80 cursor-pointer transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                    <p className="text-[11px] font-medium text-white line-clamp-1">
                      {photo.title}
                    </p>
                    <p className="text-[9px] uppercase tracking-wider text-amber-300">
                      {photo.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PHOTO ZOOM MODAL */}
      {activeZoomPhoto && (
        <div
          onClick={() => setActiveZoomPhoto(null)}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-3xl rounded-2xl bg-neutral-900 p-3 sm:p-4 border border-neutral-700 shadow-2xl flex flex-col items-center"
          >
            <button
              onClick={() => setActiveZoomPhoto(null)}
              className="absolute -top-3 -right-3 sm:top-3 sm:right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-stone-300 hover:text-white border border-neutral-600 transition-colors shadow-lg cursor-pointer"
            >
              ✕
            </button>
            <div className="max-h-[70vh] overflow-hidden rounded-xl bg-black/40 flex items-center justify-center">
              <img
                src={activeZoomPhoto.src}
                alt={activeZoomPhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-sm sm:text-base font-medium text-stone-100">
                {activeZoomPhoto.title}
              </h3>
              <p className="text-xs text-amber-400 uppercase tracking-widest mt-0.5">
                {activeZoomPhoto.category}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

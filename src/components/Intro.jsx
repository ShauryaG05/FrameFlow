import IntroScene from "../Scenes/IntroScene";
import { useNavigate } from "react-router-dom";
export default function Intro() {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* 3D background */}
      <div className="absolute inset-0">
        <IntroScene />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* UI */}
      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="text-center">

          <p className="mb-6 text-xs tracking-[0.5em] text-white/50">
            A LITTLE SURPRISE
          </p>

          <h1 className="text-5xl font-light leading-tight tracking-tight sm:text-6xl md:text-8xl">
            Something special
            <br />
            is waiting...
          </h1>



          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => navigate('/papa')}
              className="group inline-flex h-12 min-w-47.5 items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 text-xs font-normal tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>ENTER STORY</span>
              <span className="ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => navigate('/cake')}
              className="inline-flex h-12 min-w-47.5 items-center justify-center rounded-full border border-white/25 bg-transparent px-8 text-xs font-normal tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white hover:text-white hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              BIRTHDAY CAKE
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
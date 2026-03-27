export default function ProgressBar({ step }) {
  return (
    <div className="bg-[#3d1a0e] px-8 py-5">
      <div className="flex items-center gap-4">
        {[
          ["1", "Choisir un stage"],
          ["2", "Mes coordonnées"],
        ].map(([n, label], i) => {
          const active = step === i + 1;
          const done = step > i + 1;
          return (
            <div key={n} className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-raleway font-black ${done
                    ? "bg-[#c8a040] text-[#3d1a0e]"
                    : active
                      ? "bg-white text-[#3d1a0e]"
                      : "bg-white/20 text-white/50"
                  }`}
              >
                {done ? "✓" : n}
              </div>
              <span
                className={`font-raleway font-bold text-[10px] tracking-[0.15em] uppercase ${active
                    ? "text-white"
                    : done
                      ? "text-[#c8a040]"
                      : "text-white/40"
                  }`}
              >
                {label}
              </span>
              {i === 0 && <div className="flex-1 h-px bg-white/20 mx-2 w-16" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

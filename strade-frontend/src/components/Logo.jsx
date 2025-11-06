export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative bg-gradient-to-br from-[#84F7F0] to-[#000000] rounded-xl p-3 shadow-2xl border border-white/20">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#84F7F0] to-[#000000] rounded-xl blur-sm opacity-50"></div>

        <svg
          className="relative w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Modern Robot Icon */}
          <path d="M12 2C10.9 2 10 2.9 10 4v2c-2.76 0-5 2.24-5 5v8c0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5v-8c0-2.76-2.24-5-5-5V4c0-1.1-.9-2-2-2zm-1 4h2v2h-2zm0 6h2v2h-2zm-4 0h2v2H7zm10 0h2v2h-2z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-black bg-gradient-to-r from-[#84F7F0] to-[#000000] bg-clip-text text-transparent drop-shadow-sm">
          STRADE
        </span>
        <span className="text-xs text-[#84F7F0] font-semibold tracking-wider">AI TRADING BOT</span>
      </div>
    </div>
  );
}

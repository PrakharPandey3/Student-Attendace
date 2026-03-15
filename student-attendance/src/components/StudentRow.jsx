// src/components/StudentRow.jsx

function StudentRow({ student, isSelected, onClick }) {
  const isLow = student.attendance < 75;

  return (
    <div
      onClick={() => onClick(student)}
      className={`
        row-hover cursor-pointer rounded-xl px-5 py-4 mb-2
        flex items-center justify-between gap-4
        border transition-all duration-200
        ${isSelected
          ? "border-violet-500 bg-violet-950/60 shadow-lg shadow-violet-900/30"
          : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
        }
      `}
    >
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Avatar circle with initials */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
            ${isLow
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }
          `}
        >
          {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-white text-sm truncate font-display">{student.name}</p>
          <p className="text-white/40 text-xs truncate">{student.email}</p>
        </div>
      </div>

      {/* Middle: Progress Bar */}
      <div className="hidden sm:flex flex-col gap-1 w-36">
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isLow ? "bg-red-500" : "bg-emerald-400"
            }`}
            style={{ width: `${student.attendance}%` }}
          />
        </div>
        <span className="text-white/40 text-xs">{student.attendance}% attendance</span>
      </div>

      {/* Right: Status Badge */}
      <div
        className={`
          px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0
          ${isLow
            ? "bg-red-500/15 text-red-400 border border-red-500/30"
            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          }
        `}
      >
        {isLow ? "⚠ At Risk" : "✓ Present"}
      </div>
    </div>
  );
}

export default StudentRow;

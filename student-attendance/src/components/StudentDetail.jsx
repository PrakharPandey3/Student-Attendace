// src/components/StudentDetail.jsx

function StudentDetail({ student, onClose }) {
  if (!student) return null;

  const isLow = student.attendance < 75;

  // Fake weekly data based on attendance %
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekData = weekDays.map((day, i) => ({
    day,
    present: Math.random() < student.attendance / 100,
  }));

  return (
    <div className="animate-fade-in-up bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Selected Student</p>
          <h2 className="text-xl font-bold text-white font-display">{student.name}</h2>
          <p className="text-white/50 text-sm">{student.email}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/30 hover:text-white transition-colors text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Big attendance circle */}
      <div className="flex flex-col items-center my-6">
        <div
          className={`
            relative w-28 h-28 rounded-full flex items-center justify-center
            border-4 ${isLow ? "border-red-500/60" : "border-emerald-500/60"}
          `}
          style={{
            background: isLow
              ? "radial-gradient(circle, rgba(239,68,68,0.15), transparent)"
              : "radial-gradient(circle, rgba(52,211,153,0.15), transparent)",
          }}
        >
          <div className="text-center">
            <span className={`text-3xl font-bold font-display ${isLow ? "text-red-400" : "text-emerald-400"}`}>
              {student.attendance}
            </span>
            <span className={`text-sm ${isLow ? "text-red-400" : "text-emerald-400"}`}>%</span>
          </div>
        </div>
        <span
          className={`mt-3 px-4 py-1 rounded-full text-xs font-semibold border ${
            isLow
              ? "bg-red-500/15 text-red-400 border-red-500/30"
              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
          }`}
        >
          {isLow ? "⚠ Needs Attention" : "✓ Good Standing"}
        </span>
      </div>

      {/* Weekly view */}
      <div>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3">This Week</p>
        <div className="flex gap-2 justify-between">
          {weekData.map(({ day, present }) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
                  ${present
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
              >
                {present ? "✓" : "✗"}
              </div>
              <span className="text-white/40 text-xs">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Extra info */}
      <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Phone</span>
          <span className="text-white/70">{student.phone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">City</span>
          <span className="text-white/70">{student.address?.city}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Company</span>
          <span className="text-white/70">{student.company?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;

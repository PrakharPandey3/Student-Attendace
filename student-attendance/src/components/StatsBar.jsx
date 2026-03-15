// src/components/StatsBar.jsx

function StatsBar({ students }) {
  const total = students.length;
  const present = students.filter((s) => s.attendance >= 75).length;
  const absent = students.filter((s) => s.attendance < 75).length;
  const avgAttendance =
    total > 0 ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / total) : 0;

  const stats = [
    { label: "Total Students", value: total, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Good Standing", value: present, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "At Risk", value: absent, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
    { label: "Avg Attendance", value: `${avgAttendance}%`, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl border p-4 text-center ${stat.bg}`}
        >
          <p className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</p>
          <p className="text-white/40 text-xs mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;

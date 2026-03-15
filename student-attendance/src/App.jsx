// src/App.jsx
import { useState, useEffect } from "react";
import StudentRow from "./components/StudentRow";
import StudentDetail from "./components/StudentDetail";
import StatsBar from "./components/StatsBar";

// Seed-based random so attendance doesn't change on re-render
function seededRandom(seed) {
  let x = Math.sin(seed + 1) * 10000;
  return Math.floor((x - Math.floor(x)) * 100) + 1; // 1–100
}

function App() {
  // ─── State ───────────────────────────────────────────────
  const [students, setStudents] = useState([]);          // raw data from API
  const [filter, setFilter] = useState("All");           // "All" | "Present" | "Absent"
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showLowAttendance, setShowLowAttendance] = useState(false);
  const [sortAsc, setSortAsc] = useState(null);          // null | true | false
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── Fetch data ───────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        // Add random attendance % to each student
        const withAttendance = data.map((user) => ({
          ...user,
          attendance: seededRandom(user.id),
        }));
        setStudents(withAttendance);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ─── Filter logic ─────────────────────────────────────────
  let displayedStudents = [...students];

  if (filter === "Present") {
    displayedStudents = displayedStudents.filter((s) => s.attendance >= 75);
  } else if (filter === "Absent") {
    displayedStudents = displayedStudents.filter((s) => s.attendance < 75);
  }

  if (showLowAttendance) {
    displayedStudents = displayedStudents.filter((s) => s.attendance < 75);
  }

  if (sortAsc === true) {
    displayedStudents.sort((a, b) => a.attendance - b.attendance);
  } else if (sortAsc === false) {
    displayedStudents.sort((a, b) => b.attendance - a.attendance);
  }

  // ─── Handlers ─────────────────────────────────────────────
  function handleRowClick(student) {
    setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
  }

  function handleSortToggle() {
    setSortAsc((prev) => {
      if (prev === null) return false;   // first click → high to low
      if (prev === false) return true;   // second click → low to high
      return null;                       // third click → reset
    });
  }

  const filterButtons = ["All", "Present", "Absent"];

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* ── Header ── */}
        <div className="mb-8">
          <p className="text-violet-400 text-xs uppercase tracking-widest font-semibold mb-2">
            Dashboard
          </p>
          <h1 className="text-4xl font-extrabold font-display text-white">
            Student Attendance
          </h1>
          <p className="text-white/40 mt-1 text-sm">
            Track, monitor, and filter student attendance records
          </p>
        </div>

        {/* ── Stats Bar ── */}
        {!loading && !error && <StatsBar students={students} />}

        {/* ── Main layout ── */}
        <div className={`flex gap-6 ${selectedStudent ? "flex-col lg:flex-row" : ""}`}>

          {/* ── Left panel: list ── */}
          <div className="flex-1 min-w-0">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {/* Filter buttons */}
              <div className="flex gap-2">
                {filterButtons.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => setFilter(btn)}
                    className={`
                      px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200
                      ${filter === btn
                        ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-900/40"
                        : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Sort button */}
              <button
                onClick={handleSortToggle}
                className={`
                  ml-auto px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 flex items-center gap-2
                  ${sortAsc !== null
                    ? "bg-amber-600/20 border-amber-500/40 text-amber-400"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <span>Sort</span>
                <span>
                  {sortAsc === null ? "↕" : sortAsc === true ? "↑ Low→High" : "↓ High→Low"}
                </span>
              </button>
            </div>

            {/* Toggle low attendance */}
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setShowLowAttendance((prev) => !prev)}
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0
                  ${showLowAttendance ? "bg-red-500" : "bg-white/15"}
                `}
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200
                    ${showLowAttendance ? "translate-x-5" : "translate-x-0"}
                  `}
                />
              </button>
              <span className="text-sm text-white/50">
                Show only{" "}
                <span className="text-red-400 font-semibold">{"<"}75% attendance</span>
              </span>
            </div>

            {/* ── Student List ── */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/40 text-sm animate-pulse-soft">Fetching students...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                <p className="text-red-400 font-semibold">⚠ Error loading data</p>
                <p className="text-white/40 text-sm mt-1">{error}</p>
              </div>
            )}

            {!loading && !error && displayedStudents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-white/60 font-semibold">No students match this filter!</p>
                <p className="text-white/30 text-sm mt-1">Try changing the filter above</p>
              </div>
            )}

            {!loading && !error && (
              <div>
                {displayedStudents.map((student, i) => (
                  <div
                    key={student.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
                  >
                    <StudentRow
                      student={student}
                      isSelected={selectedStudent?.id === student.id}
                      onClick={handleRowClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right panel: detail ── */}
          {selectedStudent && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <StudentDetail
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-10">
          Data from{" "}
          <span className="text-violet-400">jsonplaceholder.typicode.com</span> · Attendance randomly assigned
        </p>
      </div>
    </div>
  );
}

export default App;

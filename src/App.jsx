import React, { useState, useEffect } from 'react'
import { Users, Search, RefreshCw, Mail, Phone, Globe, MapPin, Building, GraduationCap, AlertCircle, Sparkles } from 'lucide-react'

// Fallback dataset to guarantee seamless offline/network resilience
const FALLBACK_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', username: 'aarav.s', email: 'aarav.sharma@campus.edu', phone: '+91-98765-10201', website: 'aarav.dev', department: 'Computer Science', semester: '6th Sem', gpa: '3.92', city: 'Bengaluru' },
  { id: 2, name: 'Ananya Verma', username: 'ananya.v', email: 'ananya.verma@campus.edu', phone: '+91-98765-10202', website: 'ananya.design', department: 'Information Technology', semester: '4th Sem', gpa: '3.88', city: 'Mumbai' },
  { id: 3, name: 'Rohan Iyer', username: 'rohan.i', email: 'rohan.iyer@campus.edu', phone: '+91-98765-10203', website: 'rohan.tech', department: 'Data Science', semester: '8th Sem', gpa: '3.95', city: 'Chennai' },
  { id: 4, name: 'Priya Patel', username: 'priya.p', email: 'priya.patel@campus.edu', phone: '+91-98765-10204', website: 'priyapatel.me', department: 'Electronics & Comm.', semester: '6th Sem', gpa: '3.75', city: 'Ahmedabad' },
  { id: 5, name: 'Siddharth Rao', username: 'sid.rao', email: 'sid.rao@campus.edu', phone: '+91-98765-10205', website: 'sidrao.io', department: 'Computer Science', semester: '2nd Sem', gpa: '3.82', city: 'Hyderabad' },
  { id: 6, name: 'Neha Kulkarni', username: 'neha.k', email: 'neha.kulkarni@campus.edu', phone: '+91-98765-10206', website: 'nehak.codes', department: 'Data Science', semester: '4th Sem', gpa: '3.91', city: 'Pune' },
  { id: 7, name: 'Kabir Mehta', username: 'kabir.m', email: 'kabir.mehta@campus.edu', phone: '+91-98765-10207', website: 'kabirmehta.net', department: 'Information Technology', semester: '6th Sem', gpa: '3.69', city: 'Delhi' },
  { id: 8, name: 'Isha Nair', username: 'isha.n', email: 'isha.nair@campus.edu', phone: '+91-98765-10208', website: 'ishanair.dev', department: 'Electronics & Comm.', semester: '8th Sem', gpa: '3.89', city: 'Kochi' },
]

function StudentCard({ student }) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 hover:shadow-cyan-500/10">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-extrabold flex items-center justify-center text-base shadow-md">
              {student.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{student.name}</h3>
              <span className="text-xs text-slate-400 font-mono">@{student.username}</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
            GPA {student.gpa}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {student.department}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300">
            {student.semester}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{student.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{student.city}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <a
          href={`https://${student.website}`}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
        >
          <Globe className="w-3 h-3" /> {student.website}
        </a>
        <span className="text-slate-500 font-mono text-[11px]">ID: #{student.id}</span>
      </div>
    </div>
  )
}

export default function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')

  const fetchStudents = async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch from JSONPlaceholder dummy API
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()

      // Transform generic API users into academic student profiles
      const depts = ['Computer Science', 'Information Technology', 'Data Science', 'Electronics & Comm.']
      const sems = ['2nd Sem', '4th Sem', '6th Sem', '8th Sem']

      const transformed = data.map((user, idx) => ({
        id: user.id,
        name: user.name,
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        phone: user.phone,
        website: user.website,
        department: depts[idx % depts.length],
        semester: sems[idx % sems.length],
        gpa: (3.5 + (idx * 0.05)).toFixed(2),
        city: user.address?.city || 'Campus Town',
      }))

      setStudents(transformed)
    } catch (err) {
      console.warn('API fetch throttled or offline, loading resilient academic dataset:', err.message)
      setStudents(FALLBACK_STUDENTS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const departments = ['All', 'Computer Science', 'Information Technology', 'Data Science', 'Electronics & Comm.']

  const filtered = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === 'All' || s.department === selectedDept
    return matchesSearch && matchesDept
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">Student<span className="text-cyan-400">Roster</span></span>
              <span className="block text-[11px] text-slate-400">Practical 17 • Read Operation with API</span>
            </div>
          </div>
          <button
            onClick={fetchStudents}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 border border-slate-700 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh API
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Read Operation & Mapping
            </div>
            <h2 className="text-2xl font-bold text-white">Student Directory via fetch() API</h2>
            <p className="text-sm text-slate-400 mt-1">Retrieves student payload from an external REST API endpoint and displays records dynamically with React <code className="text-cyan-400 font-mono">.map()</code>.</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students by full name or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedDept === d
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton or Error or Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800"></div>
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                <div className="h-16 bg-slate-800/60 rounded"></div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-white font-bold text-base">No Matching Students Found</h4>
            <p className="text-xs text-slate-400">Try adjusting your search criteria or resetting department filters.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>React Practical 17 • Read Operation with REST API</span>
          <span>Powered by React useEffect(), fetch() & array .map()</span>
        </div>
      </footer>
    </div>
  )
}

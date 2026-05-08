import React from 'react';
import {
  Bell,
  Settings,
  Plane,
  Car,
  Utensils,
  Accessibility,
  Sun,
  ChevronRight
} from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-[#fbf9f8] font-['Plus_Jakarta_Sans',sans-serif] text-on-surface">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#dbd9d9] h-16 flex justify-between items-center px-8">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold text-[#D4AF37]">ExecutiveLeisure</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1">My Trip</a>
            <a href="#" className="text-on-surface-variant hover:text-[#D4AF37] transition-colors">Orchestration</a>
            <a href="#" className="text-on-surface-variant hover:text-[#D4AF37] transition-colors">Constraints</a>
            <a href="#" className="text-on-surface-variant hover:text-[#D4AF37] transition-colors">Preferences</a>
            <a href="#" className="text-on-surface-variant hover:text-[#D4AF37] transition-colors">Audit</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all" aria-label="Settings">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#dbd9d9]">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="User profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-8 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Discovery Console</h1>
          <p className="text-on-surface-variant text-lg">Flight Delayed. We updated your transfer and dinner times.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Middle Column: Hero & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image Section */}
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1200&h=600"
                alt="Destination preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm border border-white/20">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                  <Accessibility className="text-[#D4AF37]" size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/70">Current Leg</p>
                  <p className="font-semibold text-sm">Dehradun → Mussoorie</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weather Widget */}
              <div className="bg-white p-8 rounded-3xl border border-[#dbd9d9] flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-on-surface-variant mb-1">Destination Weather</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">18°C</span>
                  </div>
                  <p className="text-on-surface-variant mt-2">Clear, crisp air.</p>
                </div>
                <Sun className="text-[#D4AF37]" size={48} strokeWidth={1.5} />
              </div>

              {/* Concierge Notes */}
              <div className="bg-white p-8 rounded-3xl border border-[#dbd9d9]">
                <p className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">Concierge Notes</p>
                <p className="text-on-surface leading-relaxed italic">
                  "Your driver, Amit, is waiting at the private arrivals terminal. Your dinner reservation has been successfully moved to 8:30 PM."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Itinerary */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="text-2xl font-bold">Today's Itinerary</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Updated 2m ago</span>
            </div>

            {/* Flight Node */}
            <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/30 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#f8d7da] text-[#721c24] px-4 py-1 text-xs font-bold rounded-bl-xl uppercase tracking-tighter">
                Delayed
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Plane size={18} className="text-[#D4AF37]" />
                <span className="text-[10px] font-extrabold tracking-widest text-on-surface-variant uppercase">Logistics: Air</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold">BLR</h3>
                  <p className="text-xs text-on-surface-variant">Bengaluru</p>
                  <p className="font-semibold mt-1">14:20</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="w-full border-b border-dashed border-[#dbd9d9] relative">
                    <Plane size={14} className="absolute left-1/2 -translate-x-1/2 -top-2 text-on-surface-variant/40" />
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-2 font-medium">2h 45m</span>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold">DED</h3>
                  <p className="text-xs text-on-surface-variant">Dehradun</p>
                  <p className="font-semibold mt-1">17:05</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-[#f5f3f3] pt-4">
                <div>
                  <p className="text-[9px] uppercase font-bold text-on-surface-variant/60">Flight</p>
                  <p className="text-xs font-bold">UK-812</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] uppercase font-bold text-on-surface-variant/60">Seat</p>
                  <p className="text-xs font-bold">2A</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase font-bold text-on-surface-variant/60">Class</p>
                  <p className="text-xs font-bold">Business</p>
                </div>
              </div>
            </div>

            {/* Transfer Node */}
            <div className="bg-white rounded-3xl border border-[#dbd9d9] p-6 group hover:border-[#D4AF37] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface-variant">
                    <Car size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest text-on-surface-variant uppercase">Logistics: Ground</p>
                    <h4 className="font-bold">Private Transfer</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Updated</span>
                  <p className="font-bold text-sm">17:30</p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant">DED to Mussoorie • Est. 1h 30m</p>
            </div>

            {/* Dining Node */}
            <div className="bg-white rounded-3xl border border-[#dbd9d9] p-6 group hover:border-[#D4AF37] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface-variant">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest text-on-surface-variant uppercase">Experience: Dining</p>
                    <h4 className="font-bold">High-Protein Dining at Kasmanda</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Updated</span>
                  <p className="font-bold text-sm">20:30</p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant">Chef's Table • Dietary needs noted.</p>
            </div>

            {/* Activity Node */}
            <div className="bg-[#f5f3f3]/50 rounded-3xl border border-[#dbd9d9] border-dashed p-6">
              <div className="flex justify-between items-start mb-4 opacity-60">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-on-surface-variant border border-[#dbd9d9]">
                    <Accessibility size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest text-on-surface-variant uppercase">Experience: Activity</p>
                    <h4 className="font-bold">Camel's Back Road 5k</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Pending</span>
                  <p className="font-bold text-sm">07:00</p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant opacity-60">Tomorrow Morning • Guided Run</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
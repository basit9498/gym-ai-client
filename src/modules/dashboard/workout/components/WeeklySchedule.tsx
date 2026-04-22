'use client';

import { Dumbbell } from 'lucide-react';
import { WorkoutSession } from '../types';

interface WeeklyScheduleProps {
  sessions: WorkoutSession[];
  activeDayIdx: number;
  onActiveDayChange: (idx: number) => void;
}

export function WeeklySchedule({ sessions, activeDayIdx, onActiveDayChange }: WeeklyScheduleProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest ml-1">Weekly Program</h2>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
        {sessions.map((s, i) => {
          const isActive = i === activeDayIdx;
          const isRest = s.title === 'Rest Day' || (s.exercises && s.exercises.length === 0);
          return (
            <button key={s._id || i} onClick={() => onActiveDayChange(i)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all border ${isActive ? 'bg-[#00d4ff]/10 border-[#00d4ff]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
              <span className="text-[10px] font-bold text-white/30 uppercase mb-1">{s.dayName.substring(0, 3)}</span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#00d4ff] text-black' : isRest ? 'bg-white/5 text-white/30' : 'bg-white/10 text-white'}`}>
                {isRest ? 'Zz' : <Dumbbell size={14} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

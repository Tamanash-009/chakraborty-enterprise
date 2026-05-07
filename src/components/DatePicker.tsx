import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  onClose?: () => void;
}

export default function DatePicker({ value, onChange, minDate, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const min = useMemo(() => {
    if (!minDate) return today;
    const d = new Date(minDate);
    // Normalize min date to start of day for comparison
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, [minDate, today]);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Padding for first week
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Days of month
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentMonth]);

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleDateClick = (date: Date) => {
    // Normalize clicked date for comparison
    const normalizedClicked = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (normalizedClicked < min) return;
    
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    onChange(`${y}-${m}-${d}`);
    if (onClose) onClose();
  };

  const isSelected = (date: Date) => {
    if (!value) return false;
    const selected = new Date(value);
    return date.getDate() === selected.getDate() && 
           date.getMonth() === selected.getMonth() && 
           date.getFullYear() === selected.getFullYear();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-border w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-sm">{monthName}</h3>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            type="button"
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
           <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-[10px] font-black text-text-muted uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, i) => {
          if (!date) return <div key={i} className="aspect-square" />;
          
          const disabled = date < min;
          const selected = isSelected(date);
          const isToday = date.getTime() === today.getTime();
          
          // Simulated VLE Availability Logic
          // Disable Sundays and any date with a hash ending in 0 or 7 (simulated)
          const isSunday = date.getDay() === 0;
          const magicValue = (date.getDate() + date.getMonth() + date.getFullYear()) % 10;
          const isSlotBooked = magicValue === 0 || magicValue === 7;
          
          const isUnavailable = isSunday || isSlotBooked;
          const finalDisabled = disabled || isUnavailable;

          return (
            <button
              key={i}
              type="button"
              disabled={finalDisabled}
              onClick={() => handleDateClick(date)}
              className={`
                aspect-square flex items-center justify-center text-sm font-bold rounded-2xl transition-all relative
                ${finalDisabled ? 'text-gray-200 cursor-not-allowed bg-gray-50/50' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'}
                ${selected ? 'bg-primary text-white hover:bg-primary hover:text-white shadow-lg shadow-primary/20 scale-110 z-10' : ''}
              `}
            >
              <span className="relative z-10">{date.getDate()}</span>
              {isToday && !selected && !finalDisabled && (
                <div className="absolute bottom-1.5 w-1 h-1 bg-primary rounded-full" />
              )}
              {isUnavailable && !disabled && (
                <div className="absolute inset-2 border border-dashed border-gray-200 rounded-xl" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 px-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest italic">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-200" />
            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest italic">Booked</span>
          </div>
        </div>
        <div className="text-[8px] font-black text-primary/60 uppercase tracking-tighter italic">VLE: {CONTACT_INFO.vleId}</div>
      </div>

      <div className="mt-6 pt-6 border-t border-border flex justify-end">
        <button 
          type="button"
          onClick={onClose}
          className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

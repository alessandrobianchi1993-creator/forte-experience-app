"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase';

// --- 1. CONFIGURAZIONE DATI E FUNZIONI (Invariate) ---
const generateNextDays = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 180; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
};
const availableDates = generateNextDays();

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 6; i < 22; i++) {
    const hour = i < 10 ? `0${i}` : i;
    slots.push(`${hour}:00`);
  }
  return slots;
};
const timeSlots = generateTimeSlots();

const suites = [
  { id: 1, name: "The Glass Suite", location: "Via Tortona, Milano", price: "€ 35,00", imagePlaceholder: "GL", description: "Un'esperienza esclusiva nel cuore del design district. Pareti in vetro, privacy totale.", amenities: ["Wi-Fi Ultra", "Insonorizzazione", "Smart Access", "Frigobar"], securityBadge: "Polizza Yolo® Inclusa" },
  { id: 2, name: "The Stone Cave", location: "Brera, Milano", price: "€ 45,00", imagePlaceholder: "ST", description: "Atmosfera primordiale e materiali naturali. Un rifugio di silenzio nel caos cittadino.", amenities: ["Sauna Privata", "Chromotherapy", "Smart Access", "Sound System"], securityBadge: "Polizza Yolo® Inclusa" },
  { id: 3, name: "Onyx Executive", location: "Porta Nuova, Milano", price: "€ 60,00", imagePlaceholder: "OX", description: "Lusso sfrenato per incontri di business o relax assoluto. Vista sullo skyline.", amenities: ["Meeting Screen", "Caffè Illimitato", "Concierge", "Lounge Chair"], securityBadge: "Polizza Yolo® Inclusa" }
];

const formatDateForDB = (dateObj: Date) => {
  const year = dateObj.getFullYear();
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${day} ${dateObj.toLocaleString('it-IT', { month: 'short' })} ${year}`;
};

const getMonthContext = (dateObj: Date) => {
  return dateObj.toLocaleString('it-IT', { month: 'long', year: 'numeric' });
};

// --- 2. COMPONENTE PRINCIPALE ---
export default function SuitePage() {
  const router = useRouter();
  const [expandedSuiteId, setExpandedSuiteId] = useState<number | null>(null);
  const [selectedDateObj, setSelectedDateObj] = useState<Date>(availableDates[0]); 
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  // FUNZIONE PER CHIUDERE SE SI CLICCA FUORI
  const handleClose = () => {
    setExpandedSuiteId(null);
    setSelectedTime('');
  };

  const toggleSuite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita che il click sulla card attivi la chiusura dell'overlay
    if (expandedSuiteId === id) {
      setExpandedSuiteId(null);
    } else {
      setExpandedSuiteId(id);
      setSelectedDateObj(availableDates[0]);
      setSelectedTime('');       
    }
  };

  async function confirmBooking(suite: any) {
    if (!selectedTime) {
      alert("Seleziona un orario per procedere.");
      return;
    }
    setIsBookingLoading(true);
    const formattedDate = formatDateForDB(selectedDateObj);
    const [hh, min] = selectedTime.split(':');
    const endTime = `${Number(hh) + 1}:${min}`;
    const timeRange = `${selectedTime} - ${endTime}`;

    const { error } = await supabase.from('bookings').insert([
      { suite_name: suite.name, date: formattedDate, time: timeRange, price: suite.price, status: 'CONFIRMED' }
    ]);

    if (error) {
      console.error(error);
      alert("Errore: " + error.message);
      setIsBookingLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans p-6 pb-32 flex flex-col items-center relative">
      
      {/* OVERLAY DI CHIUSURA: Appare solo quando una suite è aperta */}
      {expandedSuiteId && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={handleClose}
        />
      )}

      <div className="w-full max-w-md space-y-8 relative z-20">
        <header className="mb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Scegli la Suite</h1>
            <p className="text-neutral-500 text-sm uppercase tracking-widest">Disponibilità: 3 Locazioni</p>
          </div>
        </header>

        {suites.map((suite) => {
          const isOpen = expandedSuiteId === suite.id;

          return (
            <div 
              key={suite.id} 
              onClick={(e) => e.stopPropagation()} // Impedisce la chiusura cliccando dentro la card
              className={`bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl transition-all duration-300 ${isOpen ? 'ring-1 ring-white/20' : ''}`}
            >
              <div 
                onClick={(e) => toggleSuite(suite.id, e)}
                className="h-64 bg-neutral-800 flex items-center justify-center relative cursor-pointer group"
              >
                <span className="text-4xl font-bold text-neutral-700 opacity-30 group-hover:scale-110 transition-transform">{suite.imagePlaceholder}</span>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-lg">
                  {suite.price}
                </div>
              </div>

              <div className="p-6">
                <div onClick={(e) => toggleSuite(suite.id, e)} className="cursor-pointer">
                  <h2 className="text-2xl font-bold leading-tight mb-1">{suite.name}</h2>
                  <p className="text-neutral-400 text-xs uppercase tracking-wider mb-4">{suite.location}</p>
                  {!isOpen && <p className="text-neutral-300 text-sm leading-relaxed mb-6">{suite.description}</p>}
                </div>

                {isOpen && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300 mt-4 border-t border-neutral-800 pt-6">
                    <div className="flex justify-between items-end mb-3">
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest">Seleziona Giorno</label>
                      <span className="text-[10px] uppercase text-white font-bold tracking-wider opacity-60">{getMonthContext(selectedDateObj)}</span>
                    </div>
                    
                    <div className="flex gap-1.5 overflow-x-auto pb-4 mb-6 custom-scrollbar scroll-smooth">
                      {availableDates.map((date, index) => {
                        const selected = isSameDay(date, selectedDateObj);
                        const dayName = date.toLocaleDateString('it-IT', { weekday: 'short' }).replace('.', '');
                        const dayNumber = date.getDate();
                        const monthName = date.toLocaleDateString('it-IT', { month: 'short' }).replace('.', '');

                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedDateObj(date)}
                            className={`flex flex-col items-center justify-center min-w-[50px] h-[75px] rounded-lg border transition-all flex-shrink-0 ${
                              selected ? 'bg-white text-black border-white shadow-lg scale-105 z-10' : 'bg-neutral-800 text-neutral-500 border-transparent hover:bg-neutral-700'
                            }`}
                          >
                            <span className="text-[9px] uppercase font-bold tracking-widest opacity-70 mb-1">{dayName}</span>
                            <span className="text-lg font-bold leading-none mb-1">{dayNumber}</span>
                            <span className="text-[8px] uppercase font-bold opacity-50">{monthName}</span>
                          </button>
                        );
                      })}
                    </div>

                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Seleziona Orario</label>
                    <div className="grid grid-cols-4 gap-2 mb-8 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-lg text-xs font-bold border ${selectedTime === time ? 'bg-white text-black border-white shadow-lg scale-105' : 'bg-neutral-800 text-neutral-400 border-transparent hover:bg-neutral-700'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={() => confirmBooking(suite)}
                      disabled={!selectedTime || isBookingLoading}
                      className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${(!selectedTime) ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
                    >
                      {isBookingLoading ? 'ELABORAZIONE...' : `CONFERMA • ${suite.price}`}
                    </button>
                  </div>
                )}

                {!isOpen && (
                  <div>
                     <div className="flex flex-wrap gap-2 mb-6">
                        {suite.amenities.map((item, index) => (
                          <span key={index} className="px-3 py-1.5 bg-neutral-800 rounded-md text-[10px] uppercase font-bold text-neutral-400 border border-neutral-700/50">{item}</span>
                        ))}
                     </div>
                     <button onClick={(e) => toggleSuite(suite.id, e)} className="w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest bg-white text-black hover:bg-neutral-200 transition-all shadow-lg">Prenota</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}
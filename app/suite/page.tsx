'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase'; // Nota: punta al file supabase nella cartella superiore

export default function SuitePage() {
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);

  async function handleBooking() {
    setIsBooking(true);

    // 1. Inseriamo i dati nel database
    const { error } = await supabase.from('bookings').insert([
      {
        suite_name: 'The Glass Suite',
        date: '28 Gen 2026',
        time: '18:00 - 19:00',
        price: '€ 35,00',
        status: 'CONFIRMED',
      },
    ]);

    if (error) {
      console.error(error);
      alert('Errore: ' + error.message);
      setIsBooking(false);
    } else {
      // 2. Se tutto va bene, andiamo al biglietto
      router.push('/dashboard');
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans pb-32">
      {/* FOTO */}
      <div className="w-full h-96 bg-neutral-800 flex items-center justify-center relative">
        <span className="text-neutral-500 tracking-widest">[FOTO SUITE]</span>
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl font-bold mb-1">The Glass Suite</h1>
          <p className="text-neutral-400 text-sm">Via Tortona, Milano</p>
        </div>
      </div>

      {/* DESCRIZIONE */}
      <div className="p-6">
        <p className="text-neutral-300 leading-relaxed mb-6">
          Un'esperienza esclusiva nel cuore del design district. Pareti in
          vetro, privacy totale e acustica perfetta.
        </p>

        {/* BARRA PRENOTAZIONE */}
        <div className="fixed bottom-0 left-0 w-full bg-neutral-900 p-6 border-t border-neutral-800 flex justify-between items-center z-50 safe-area-bottom">
          <div>
            <span className="block text-lg font-bold">28 Gen • 18:00</span>
            <span className="text-sm text-neutral-400">€ 35,00</span>
          </div>
          <button
            onClick={handleBooking}
            disabled={isBooking}
            className={`px-8 py-3 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${
              isBooking
                ? 'bg-neutral-700 text-neutral-400'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {isBooking ? 'ATTENDI...' : 'CONFERMA'}
          </button>
        </div>
      </div>
    </main>
  );
}

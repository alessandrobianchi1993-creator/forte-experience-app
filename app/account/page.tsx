"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase'; // Assicurati che il percorso sia corretto

export default function AccountPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Funzione per scaricare le prenotazioni dal database
  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      // Scarica le prenotazioni ordinate per data di creazione (dalla più recente)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setBookings(data);
    } catch (error) {
      console.error("Errore caricamento:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans p-6">
      <div className="max-w-md mx-auto space-y-10 pt-12">
        
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Profilo</h1>
            <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-[0.4em]">Gestione Membro</p>
          </div>
          <button 
            onClick={() => router.push('/')} 
            className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-800 px-4 py-2 rounded-full hover:bg-neutral-900 hover:text-white transition-all"
          >
            Esci
          </button>
        </header>

        {/* Box Info Utente */}
        <section className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em] mb-2 block">Membro dal</p>
          <p className="text-xl font-bold tracking-tight">Gennaio 2026</p>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 ml-1">Le mie prenotazioni</h2>
             <button onClick={fetchBookings} className="text-[9px] uppercase font-bold text-white/50 hover:text-white transition-colors">Aggiorna</button>
          </div>
          
          {loading ? (
             <div className="text-center py-10 text-[10px] uppercase tracking-widest animate-pulse text-neutral-500">Caricamento...</div>
          ) : bookings.length > 0 ? (
            // LISTA PRENOTAZIONI REALI
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white text-black rounded-2xl p-6 relative overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold italic tracking-tighter mb-1">{booking.suite_name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{booking.date}</p>
                      </div>
                      <span className="bg-black text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Confirmed</span>
                   </div>
                   
                   <div className="flex justify-between items-end border-t border-neutral-200 pt-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase text-neutral-400 tracking-widest mb-1">Orario</p>
                        <p className="text-sm font-bold">{booking.time}</p>
                      </div>
                      <p className="text-lg font-bold tracking-tighter">{booking.price}</p>
                   </div>
                </div>
              ))}
            </div>
          ) : (
            // NESSUNA PRENOTAZIONE (Fallback)
            <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 flex flex-col items-center justify-center space-y-4 opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest">Nessuna prenotazione attiva</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
"use client";
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();

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

        {/* Box Info Utente - Tag Corretti */}
        <section className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em] mb-2 block">Membro dal</p>
          <p className="text-xl font-bold tracking-tight">Gennaio 2026</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 ml-1">Le mie prenotazioni</h2>
          
          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 flex flex-col items-center justify-center space-y-4 opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Nessuna prenotazione attiva</span>
          </div>
        </section>
      </div>
    </main>
  );
}
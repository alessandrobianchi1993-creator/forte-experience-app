"use client";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      
      {/* Intestazione Luxury - Dritta, Bold e Compatta */}
      <header className="mb-16">
        <h1 className="text-6xl font-bold tracking-tighter mb-2">FORTE</h1>
        <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-[0.4em]">Exclusive Suites • Milano</p>
      </header>

      {/* Pulsanti - Stessa tipografia delle Suite */}
      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={() => router.push('/suite')}
          className="w-full bg-white text-black font-bold py-5 rounded-2xl uppercase text-xs tracking-[0.3em] hover:bg-neutral-200 transition-all shadow-2xl"
        >
          Prenota Soggiorno
        </button>

        <button 
          onClick={() => router.push('/login')}
          className="w-full bg-neutral-900 text-neutral-400 font-bold py-5 rounded-2xl uppercase text-xs tracking-[0.3em] border border-neutral-800 hover:text-white hover:bg-neutral-800 transition-all"
        >
          Area Personale
        </button>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-8">
        <p className="text-neutral-700 text-[8px] uppercase tracking-widest">© 2026 Forte Experience</p>
      </footer>
    </main>
  );
}
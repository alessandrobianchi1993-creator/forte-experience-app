'use client';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      {/* CERCHIO PULSANTE */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="black"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Prenotazione Confermata</h1>
      <p className="text-neutral-400 text-sm mb-12">
        La suite è riservata per te.
      </p>

      {/* BIGLIETTO */}
      <div className="w-full max-w-sm bg-white text-black rounded-xl p-6 relative overflow-hidden">
        <div className="border-2 border-dashed border-neutral-300 p-4 rounded text-center">
          <h2 className="text-xl font-bold uppercase mb-1">The Glass Suite</h2>
          <p className="text-sm text-neutral-500 mb-4">CODICE: FRT-28-JAN</p>
          <div className="w-full h-12 bg-black text-white flex items-center justify-center text-xs tracking-widest uppercase">
            Ingresso Autorizzato
          </div>
        </div>
        {/* Decorazione cerchi laterali stile biglietto */}
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-black rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-black rounded-full transform -translate-y-1/2"></div>
      </div>

      <Link
        href="/suite"
        className="mt-12 text-neutral-500 text-xs hover:text-white transition-colors"
      >
        Torna alla Home
      </Link>
    </main>
  );
}

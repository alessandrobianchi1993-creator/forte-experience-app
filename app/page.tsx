'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Sfondo sfumato decorativo */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-neutral-800 to-transparent opacity-20"></div>

      <div className="z-10 text-center max-w-md">
        <h1 className="text-5xl font-bold tracking-tighter mb-2">FORTE</h1>
        <p className="text-neutral-500 text-sm tracking-widest uppercase mb-12">
          Exclusive Suites • Milano
        </p>

        <div className="space-y-4">
          <Link
            href="/suite"
            className="block w-full bg-white text-black font-bold py-4 px-8 rounded text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            Prenota Soggiorno
          </Link>

          <button className="block w-full border border-neutral-800 text-neutral-500 font-bold py-4 px-8 rounded text-sm tracking-widest uppercase hover:border-white hover:text-white transition-colors">
            Area Personale
          </button>
        </div>
      </div>

      <footer className="absolute bottom-6 text-neutral-600 text-xs">
        © 2026 FORTE Experience
      </footer>
    </main>
  );
}

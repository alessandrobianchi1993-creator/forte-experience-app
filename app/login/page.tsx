"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/account'); 
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-12">
        
        {/* Intestazione Coerente con Home e Suite */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Accesso</h1>
          <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-[0.4em]">Area Personale Forte</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="EMAIL" 
            required
            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-xs font-bold tracking-widest outline-none focus:border-neutral-500 transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            required
            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-xs font-bold tracking-widest outline-none focus:border-neutral-500 transition-colors"
          />
          
          <button type="submit" className="w-full bg-white text-black font-bold py-5 rounded-2xl uppercase text-xs tracking-[0.3em] hover:bg-neutral-200 transition-all shadow-2xl">
            Entra
          </button>
        </form>

        <button 
          onClick={() => router.push('/')} 
          className="w-full text-neutral-600 text-[10px] uppercase font-bold tracking-[0.3em] hover:text-white transition-colors"
        >
          Annulla
        </button>
      </div>
    </main>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // MVP uchun vaqtincha mock login:
    localStorage.setItem('scholarBridge_user', JSON.stringify({ email }));
    router.push('/dashboard');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '32px', border: '1px solid #e5e7eb', borderRadius: '12px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginTop: 0 }}>ScholarBridge'ga Kirish</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Email</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            placeholder="student@example.com"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Parol</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Kirish
        </button>
      </form>
    </div>
  );
}

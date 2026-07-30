// Natijalarni render qilish joyida:
{recommendations.map((uni, idx) => (
  <div key={idx} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', backgroundColor: '#fff', marginBottom: '16px' }}>
    <img src={uni.image} alt={uni.universityName} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }} />
    <div style={{ marginTop: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{uni.universityName}</h3>
        <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px', fontSize: '14px' }}>
          {uni.matchPercentage}% Moslik
        </span>
      </div>
      <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>📍 {uni.country} | 🎓 {uni.degree} | 💰 {uni.fundingType}</p>
      <p style={{ fontSize: '14px', color: '#334155', marginTop: '8px' }}>{uni.reason}</p>
      
      {/* Rasmiy saytiga o'tish tugmasi */}
      {uni.website && uni.website !== '#' && (
        <a 
          href={uni.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: 'inline-block', marginTop: '12px', color: '#2563EB', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}
        >
          🌐 Rasmiy Veb-Saytiga O'tish →
        </a>
      )}
    </div>
  </div>
))}

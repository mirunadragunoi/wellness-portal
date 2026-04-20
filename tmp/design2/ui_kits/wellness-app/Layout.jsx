// Layout.jsx — Midnight Bloom shared components + hooks

// ── Responsive hook ───────────────────────────────────────────────────────
const useIsMobile = () => {
  const [mobile, setMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
};

// ── Image Slot ────────────────────────────────────────────────────────────
const ImageSlot = ({ slot, src, alt='', gradient, style, children }) => (
  <div data-img-slot={slot} style={{ background: gradient, ...style }}>
    {src && (
      <img src={src} alt={alt}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        onError={e => e.target.style.display='none'} />
    )}
    {!src && (
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, opacity:.18, pointerEvents:'none' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,color:'white',textTransform:'uppercase'}}>{slot}</div>
      </div>
    )}
    {children}
  </div>
);

// ── Button ────────────────────────────────────────────────────────────────
const Btn = ({ variant='primary', size='md', children, onClick, full, style, disabled }) => {
  const [hov, setHov] = React.useState(false);
  const base = {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    fontFamily:'var(--font-b)', fontWeight:700, borderRadius:'var(--r-full)',
    cursor: disabled ? 'not-allowed' : 'pointer', border:'none', whiteSpace:'nowrap',
    letterSpacing:'.3px', transition:'all 200ms var(--ease)', textDecoration:'none',
    width: full ? '100%' : undefined, opacity: disabled ? .45 : 1,
  };
  const sizes = { sm:{padding:'8px 20px',fontSize:13}, md:{padding:'12px 28px',fontSize:14}, lg:{padding:'16px 40px',fontSize:16} };
  const h = hov && !disabled;
  const vars = {
    primary: { background: h?'linear-gradient(135deg,#b8a5fc,#4de8d8)':'linear-gradient(135deg,var(--violet),var(--teal))', color:'#070d1a', boxShadow: h?'0 0 40px rgba(167,139,250,.5),0 0 60px rgba(45,212,191,.2)':'0 0 20px rgba(167,139,250,.3)', transform: h?'translateY(-2px) scale(1.02)':'none' },
    ghost:   { background: h?'rgba(255,255,255,.09)':'rgba(255,255,255,.05)', color:'var(--text)', border:'1px solid var(--glass-border)', backdropFilter:'blur(12px)' },
    outline: { background:'transparent', color:'var(--violet)', border:'1.5px solid rgba(167,139,250,.4)', boxShadow: h?'0 0 20px rgba(167,139,250,.2)':'none' },
    soft:    { background: h?'rgba(167,139,250,.2)':'rgba(167,139,250,.1)', color:'var(--violet)' },
    danger:  { background: h?'rgba(248,113,113,.2)':'rgba(248,113,113,.1)', color:'#f87171' },
  };
  return (
    <button style={{...base,...sizes[size],...vars[variant],...style}} onClick={onClick}
      disabled={disabled} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {children}
    </button>
  );
};

const Chip = ({ active, children, onClick }) => (
  <button onClick={onClick} style={{
    padding:'7px 18px', borderRadius:'var(--r-full)', fontFamily:'var(--font-b)',
    border: active?'1.5px solid rgba(167,139,250,.6)':'1px solid rgba(255,255,255,.12)',
    background: active?'rgba(167,139,250,.18)':'rgba(255,255,255,.04)',
    color: active?'var(--violet)':'var(--muted)', fontSize:13, fontWeight:active?700:500,
    cursor:'pointer', transition:'all 180ms var(--ease)', backdropFilter:'blur(8px)',
  }}>{children}</button>
);

const Badge = ({ children, color='violet' }) => {
  const c = { violet:{bg:'rgba(167,139,250,.15)',color:'#c4b5fd',border:'rgba(167,139,250,.25)'}, teal:{bg:'rgba(45,212,191,.12)',color:'#5eead4',border:'rgba(45,212,191,.2)'}, rose:{bg:'rgba(249,168,212,.12)',color:'#fbcfe8',border:'rgba(249,168,212,.2)'}, amber:{bg:'rgba(251,191,36,.12)',color:'#fde68a',border:'rgba(251,191,36,.2)'}, blue:{bg:'rgba(124,159,255,.12)',color:'#93c5fd',border:'rgba(124,159,255,.2)'} }[color] || {bg:'rgba(167,139,250,.15)',color:'#c4b5fd',border:'rgba(167,139,250,.25)'};
  return <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:'var(--r-full)', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:1.5, background:c.bg, color:c.color, border:`1px solid ${c.border}` }}>{children}</span>;
};

const ProgressBar = ({ value, color='linear-gradient(90deg,var(--violet),var(--teal))' }) => (
  <div style={{height:4,background:'rgba(255,255,255,.08)',borderRadius:'var(--r-full)',overflow:'hidden'}}>
    <div style={{height:'100%',width:`${value}%`,background:color,borderRadius:'var(--r-full)',transition:'width .5s var(--ease)'}}/>
  </div>
);

const SESSION_GRADIENTS = {
  Meditation:  'linear-gradient(135deg,#312e81,#7c3aed,#2dd4bf)',
  Sleep:       'linear-gradient(135deg,#1e1b4b,#4338ca,#a78bfa)',
  Breathing:   'linear-gradient(135deg,#064e3b,#059669,#34d399)',
  Soundscape:  'linear-gradient(135deg,#78350f,#d97706,#fbbf24)',
  Motivational:'linear-gradient(135deg,#7f1d1d,#dc2626,#f9a8d4)',
  Focus:       'linear-gradient(135deg,#0c4a6e,#0284c7,#7dd3fc)',
  default:     'linear-gradient(135deg,#1e1b4b,#4c1d95,#a78bfa)',
};

const SessionCard = ({ session, compact, onPlay }) => {
  const [hov,setHov]=React.useState(false);
  const grad = SESSION_GRADIENTS[session.type] || SESSION_GRADIENTS.default;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>onPlay&&onPlay(session)}
      style={{ background:hov?'rgba(255,255,255,.09)':'rgba(255,255,255,.055)', border:`1px solid ${hov?'rgba(167,139,250,.35)':'rgba(255,255,255,.1)'}`, borderRadius:'var(--r)', overflow:'hidden', backdropFilter:'blur(20px)', boxShadow:hov?'0 20px 60px rgba(0,0,0,.5),0 0 40px rgba(167,139,250,.12)':'0 4px 24px rgba(0,0,0,.3)', transform:hov?'translateY(-5px) scale(1.01)':'none', transition:'all 250ms var(--ease)', cursor:'pointer' }}>
      <ImageSlot slot={`session-${session.id}`} src={session.imageUrl} gradient={grad} style={{height:compact?108:140,position:'relative'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(7,13,26,.65),transparent 55%)'}}/>
        <div style={{position:'absolute',top:10,left:10,zIndex:1}}><Badge color={session.badgeColor||'violet'}>{session.category}</Badge></div>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,.15)',border:'1.5px solid rgba(255,255,255,.35)',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(8px)',opacity:hov?1:0,transition:'opacity 180ms'}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div style={{position:'absolute',bottom:10,left:12,right:12,color:'rgba(255,255,255,.7)',fontSize:11,fontWeight:600}}>{session.type} · {session.duration}</div>
      </ImageSlot>
      <div style={{padding:'13px 14px'}}>
        <div style={{fontFamily:'var(--font-d)',fontSize:compact?15:17,fontWeight:400,color:'var(--text)',lineHeight:1.3,marginBottom:5}}>{session.title}</div>
        <div style={{fontSize:12,color:'var(--muted)',fontWeight:500}}>{session.instructor}</div>
      </div>
    </div>
  );
};

const ArticleCard = ({ article }) => {
  const [hov,setHov]=React.useState(false);
  const grads = ['linear-gradient(135deg,#1e1b4b,#4338ca)','linear-gradient(135deg,#064e3b,#059669)','linear-gradient(135deg,#312e81,#7c3aed)','linear-gradient(135deg,#78350f,#d97706)'];
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:hov?'rgba(255,255,255,.09)':'rgba(255,255,255,.055)', border:`1px solid ${hov?'rgba(167,139,250,.3)':'rgba(255,255,255,.1)'}`, borderRadius:'var(--r)', backdropFilter:'blur(20px)', boxShadow:hov?'0 12px 40px rgba(0,0,0,.4)':'0 4px 20px rgba(0,0,0,.25)', transform:hov?'translateY(-3px)':'none', transition:'all 220ms var(--ease)', cursor:'pointer', overflow:'hidden' }}>
      <ImageSlot slot={`article-${article.id}`} src={article.imageUrl} gradient={grads[article.id % grads.length]} style={{height:120,position:'relative'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(7,13,26,.7),transparent 50%)'}}/>
        <div style={{position:'absolute',bottom:10,left:12}}><Badge color={article.badgeColor||'violet'}>{article.category}</Badge></div>
        <div style={{position:'absolute',top:10,right:12,fontSize:11,color:'rgba(255,255,255,.6)',fontWeight:600}}>{article.readTime}</div>
      </ImageSlot>
      <div style={{padding:'16px 18px',display:'flex',flexDirection:'column',gap:8}}>
        <div style={{fontFamily:'var(--font-d)',fontSize:17,fontWeight:400,color:'var(--text)',lineHeight:1.4}}>{article.title}</div>
        <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.65}}>{article.excerpt}</div>
      </div>
    </div>
  );
};

const BreathingOrb = ({ size=180, dur=5 }) => (
  <div style={{position:'relative',width:size,height:size,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
    <div className="breath-ring1" style={{position:'absolute',width:'100%',height:'100%','--breath-dur':`${dur}s`}}/>
    <div className="breath-ring2" style={{position:'absolute',width:'75%',height:'75%','--breath-dur':`${dur}s`}}/>
    <div className="breath-core" style={{width:'55%',height:'55%',background:'radial-gradient(circle at 35% 35%,rgba(200,180,255,.9),rgba(45,212,191,.6))',boxShadow:'0 0 40px rgba(167,139,250,.5),0 0 80px rgba(45,212,191,.2)','--breath-dur':`${dur}s`}}/>
  </div>
);

// ── "CLEAR MIND" — Thoughts-spiraling-to-stillness particle animation ─────
const MeditationCanvas = ({ size = 380 }) => {
  const canvasRef = React.useRef(null);
  const frameRef  = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size / 2;
    const TAU = Math.PI * 2;

    const COLS = [[167,139,250],[45,212,191],[249,168,212],[124,159,255],[251,191,36]];
    const rgba = ([r,g,b],a) => `rgba(${r},${g},${b},${a})`;

    // ── Ripple pool ───────────────────────────────────────────────────────
    const ripples = [];

    // ── Particle factory ──────────────────────────────────────────────────
    function makeParticle(initial) {
      const angle = Math.random() * TAU;
      const r = initial ? 20 + Math.random() * 160 : 110 + Math.random() * 70;
      const tanAngle = angle + Math.PI/2 * (Math.random() > 0.35 ? 1 : -1);
      const speed = 0.2 + Math.random() * 0.55;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: Math.cos(tanAngle) * speed,
        vy: Math.sin(tanAngle) * speed,
        col: COLS[Math.floor(Math.random() * COLS.length)],
        size: 0.8 + Math.random() * 2.2,
        dir: Math.random() > 0.28 ? 1 : -1,
        wobble: Math.random() * TAU,
        wobbleSpeed: 0.035 + Math.random() * 0.04,
        dead: false,
      };
    }

    const parts = Array.from({length: 220}, (_, i) => makeParticle(true));

    // ── Main draw ─────────────────────────────────────────────────────────
    let t = 0;

    function draw() {
      // Trail — partial clear for motion blur / light-streak effect
      ctx.fillStyle = 'rgba(7,13,26,0.20)';
      ctx.fillRect(0, 0, size, size);

      // ── Update & draw particles ────────────────────────────────────────
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const dx = cx - p.x, dy = cy - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 5) {
          // Reached center → create ripple, respawn
          ripples.push({ r: 5, maxR: 35 + Math.random()*20, alpha: 0.6, col: p.col });
          Object.assign(p, makeParticle(false));
          continue;
        }

        // Radial pull toward center (stronger when closer)
        const radF = 0.00032 * dist + 0.04;
        p.vx += (dx/dist) * radF * 0.012;
        p.vy += (dy/dist) * radF * 0.012;

        // Tangential force → spiral path
        p.vx += (-dy/dist) * 0.008 * p.dir;
        p.vy += ( dx/dist) * 0.008 * p.dir;

        // Organic wobble — simulates "thought noise", reduces near center
        p.wobble += p.wobbleSpeed;
        const wobbleMag = Math.min(dist / 80, 1) * 0.14;
        p.vx += Math.cos(p.wobble) * wobbleMag;
        p.vy += Math.sin(p.wobble) * wobbleMag;

        // Soft damping
        p.vx *= 0.992;
        p.vy *= 0.992;

        p.x += p.vx;
        p.y += p.vy;

        // ── Draw particle ────────────────────────────────────────────────
        const prox = 1 - Math.min(dist / 175, 1);
        const alpha = 0.12 + prox * 0.78;
        const dr = p.size * (0.4 + prox * 2.0);

        // Glow halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, dr * 5);
        g.addColorStop(0,   rgba(p.col, alpha * 0.85));
        g.addColorStop(0.3, rgba(p.col, alpha * 0.3));
        g.addColorStop(1,   rgba(p.col, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, dr * 5, 0, TAU); ctx.fill();

        // Solid core dot
        ctx.fillStyle = rgba(p.col, Math.min(1, alpha * 2));
        ctx.beginPath(); ctx.arc(p.x, p.y, dr, 0, TAU); ctx.fill();
      }

      // ── Ripples emanating outward from center ──────────────────────────
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.4;
        rp.alpha *= 0.88;
        if (rp.alpha < 0.01 || rp.r > rp.maxR) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = rgba(rp.col, rp.alpha * 0.5);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, rp.r, 0, TAU); ctx.stroke();
      }

      // ── Ambient concentric glow rings (calm, slow pulse) ───────────────
      for (let i = 0; i < 4; i++) {
        const base = 28 + i * 22;
        const pulse = Math.sin(t * 0.018 + i * 1.4) * 5;
        const a = (0.07 - i * 0.014) + Math.sin(t * 0.016 + i) * 0.02;
        ctx.strokeStyle = i % 2 === 0 ? `rgba(167,139,250,${a})` : `rgba(45,212,191,${a})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.arc(cx, cy, base + pulse, 0, TAU); ctx.stroke();
      }

      // ── Center "Clear Mind" orb ────────────────────────────────────────
      const breathe = Math.sin(t * 0.020);
      const coreR   = 11 + breathe * 3.5;

      // Wide outer glow
      const gGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52 + breathe * 6);
      gGlow.addColorStop(0,   'rgba(210,195,255,0.32)');
      gGlow.addColorStop(0.4, 'rgba(167,139,250,0.14)');
      gGlow.addColorStop(0.75,'rgba(45,212,191,0.05)');
      gGlow.addColorStop(1,   'rgba(167,139,250,0)');
      ctx.fillStyle = gGlow;
      ctx.beginPath(); ctx.arc(cx, cy, 58, 0, TAU); ctx.fill();

      // Luminous core — white → violet → transparent
      const gCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      gCore.addColorStop(0,    'rgba(255,253,255,1)');
      gCore.addColorStop(0.45, 'rgba(210,190,255,0.92)');
      gCore.addColorStop(1,    'rgba(167,139,250,0)');
      ctx.fillStyle = gCore;
      ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, TAU); ctx.fill();

      t++;
      frameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [size]);

  return (
    <canvas ref={canvasRef}
      style={{ width:size+'px', height:size+'px', display:'block' }}/>
  );
};

// ── Section label ─────────────────────────────────────────────────────────
const SectionLabel = ({ children, color='var(--violet)' }) => (
  <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:3,color,marginBottom:12}}>{children}</div>
);

// ── Mini Player ───────────────────────────────────────────────────────────
const MiniPlayer = ({ session, onExpand, onClose }) => {
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(32);
  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress(p => p >= 100 ? 100 : p + .05), 200);
    return () => clearInterval(t);
  }, [playing]);
  return (
    <div className="mini-player">
      <div style={{width:40,height:40,borderRadius:'var(--r-sm)',flexShrink:0,background:SESSION_GRADIENTS[session?.type]||SESSION_GRADIENTS.default}}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:'var(--font-d)',fontSize:14,fontWeight:400,color:'var(--text)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{session?.title}</div>
        <ProgressBar value={progress}/>
      </div>
      <button onClick={()=>setPlaying(p=>!p)} style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
        {playing ? <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                 : <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
      </button>
      <button onClick={onExpand} style={{width:36,height:36,borderRadius:'50%',background:'rgba(167,139,250,.15)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
      <button onClick={onClose} style={{color:'var(--faint)',background:'none',border:'none',cursor:'pointer',padding:4,fontSize:18,lineHeight:1}}>×</button>
    </div>
  );
};

// ── Public Navbar ─────────────────────────────────────────────────────────
const NavbarPublic = ({ onNavigate }) => {
  const [scrolled,setScrolled]=React.useState(false);
  const isMobile=useIsMobile();
  React.useEffect(()=>{ const h=()=>setScrolled(window.scrollY>10); window.addEventListener('scroll',h); return ()=>window.removeEventListener('scroll',h); },[]);
  return (
    <nav style={{position:'sticky',top:0,zIndex:90,background:scrolled?'rgba(7,13,26,.88)':'transparent',backdropFilter:scrolled?'blur(20px)':'none',borderBottom:scrolled?'1px solid rgba(255,255,255,.08)':'none',transition:'all 300ms var(--ease)'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'var(--nb)'}}>
        <div style={{fontFamily:'var(--font-d)',fontSize:isMobile?16:20,fontWeight:400,letterSpacing:2,color:'var(--text)'}}>WELLNESS</div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <Btn variant="ghost" size="sm" onClick={()=>onNavigate('auth')}>Log in</Btn>
          <Btn variant="primary" size="sm" onClick={()=>onNavigate('auth')}>Begin</Btn>
        </div>
      </div>
    </nav>
  );
};

// ── Auth Navbar ───────────────────────────────────────────────────────────
const NavbarAuth = ({ page, onNavigate }) => {
  const isMobile=useIsMobile();
  const items=[{l:'Home',p:'home'},{l:'Explore',p:'explore'},{l:'Learn',p:'learn'},{l:'Progress',p:'progress'}];
  return (
    <nav style={{position:'sticky',top:0,zIndex:90,background:'rgba(7,13,26,.88)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,.07)'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'var(--nb)'}}>
        <div style={{fontFamily:'var(--font-d)',fontSize:isMobile?15:18,fontWeight:400,letterSpacing:2,color:'var(--text)'}}>WELLNESS</div>
        {!isMobile && (
          <div style={{display:'flex',alignItems:'center',height:'var(--nb)'}}>
            {items.map(({l,p})=>(
              <button key={p} onClick={()=>onNavigate(p)} style={{padding:'0 16px',height:'var(--nb)',display:'flex',alignItems:'center',fontSize:13,fontWeight:600,letterSpacing:.5,color:page===p?'var(--violet)':'var(--muted)',background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)',borderBottom:page===p?'2px solid var(--violet)':'2px solid transparent',transition:'color 150ms'}}>{l}</button>
            ))}
          </div>
        )}
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:5,padding:'5px 12px',background:'rgba(251,191,36,.1)',border:'1px solid rgba(251,191,36,.25)',borderRadius:'var(--r-full)',fontSize:13,fontWeight:700,color:'var(--amber)'}}>🔥 14</div>
          <button onClick={()=>onNavigate('profile')} style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,var(--violet),var(--teal))',border:'none',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#070d1a',cursor:'pointer',fontFamily:'var(--font-d)'}}>A</button>
        </div>
      </div>
    </nav>
  );
};

// ── Bottom Bar ────────────────────────────────────────────────────────────
const BottomBar = ({ page, onNavigate }) => {
  const items=[
    {l:'Home',p:'home',path:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'},
    {l:'Explore',p:'explore',circle:true},{l:'Learn',p:'learn',book:true},
    {l:'Progress',p:'progress',bars:true},{l:'Profile',p:'profile',user:true},
  ];
  return (
    <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:90,background:'rgba(7,13,26,.94)',backdropFilter:'blur(20px)',borderTop:'1px solid rgba(255,255,255,.08)',display:'flex'}}>
      {items.map(({l,p,path,circle,book,bars,user})=>{
        const active=page===p; const col=active?'var(--violet)':'rgba(232,237,248,.4)';
        return <button key={p} onClick={()=>onNavigate(p)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'10px 0 12px',fontSize:10,fontWeight:active?700:500,color:col,background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)',letterSpacing:.3,transition:'color 150ms'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={active?2.5:2} strokeLinecap="round" strokeLinejoin="round">
            {path&&<path d={path}/>}{circle&&<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>}
            {book&&<><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>}
            {bars&&<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>}
            {user&&<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
          </svg>
          {l}
        </button>;
      })}
    </div>
  );
};

Object.assign(window, {
  useIsMobile, ImageSlot, Btn, Chip, Badge, ProgressBar,
  SESSION_GRADIENTS, SessionCard, ArticleCard, BreathingOrb,
  MeditationCanvas, SectionLabel, MiniPlayer, NavbarPublic, NavbarAuth, BottomBar,
});

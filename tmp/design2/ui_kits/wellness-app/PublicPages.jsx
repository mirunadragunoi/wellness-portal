// PublicPages.jsx — Landing + Auth (Midnight Bloom, responsive + image slots)

const SESSIONS_DATA = [
  // Add imageUrl: 'path/to/image.jpg' to any session when you have real photos
  { id:1, title:'Morning Clarity',    category:'Meditation', type:'Meditation',  duration:'10 min', instructor:'Sofia M.',   badgeColor:'violet', imageUrl:null },
  { id:2, title:'Ocean Drift',         category:'Sleep',      type:'Sleep',        duration:'20 min', instructor:'Alex R.',    badgeColor:'blue',   imageUrl:null },
  { id:3, title:'Box Breathing',       category:'Breathing',  type:'Breathing',    duration:'5 min',  instructor:'Wellness',   badgeColor:'teal',   imageUrl:null },
  { id:4, title:'Deep Focus Flow',     category:'Focus',      type:'Focus',        duration:'30 min', instructor:'Studio W.',  badgeColor:'blue',   imageUrl:null },
  { id:5, title:'Evening Wind-Down',   category:'Stress',     type:'Meditation',   duration:'15 min', instructor:'Sofia M.',   badgeColor:'violet', imageUrl:null },
  { id:6, title:'Sunrise Motivation',  category:'Energy',     type:'Motivational', duration:'8 min',  instructor:'Mark T.',    badgeColor:'amber',  imageUrl:null },
  { id:7, title:'Forest Soundscape',   category:'Sleep',      type:'Soundscape',   duration:'45 min', instructor:'Nature',     badgeColor:'teal',   imageUrl:null },
  { id:8, title:'4-7-8 Breathing',     category:'Anxiety',    type:'Breathing',    duration:'7 min',  instructor:'Wellness',   badgeColor:'teal',   imageUrl:null },
];

const ARTICLES_DATA = [
  // Add imageUrl: 'path/to/image.jpg' to any article when you have real photos
  { id:1, title:'Why 5 Minutes of Breathing Changes Everything', category:'Science', readTime:'4 min read', excerpt:'New research shows controlled breathing activates the parasympathetic nervous system within seconds.', badgeColor:'teal',   imageUrl:null },
  { id:2, title:'Sleep Stories Are Not Just for Children',       category:'Sleep',   readTime:'6 min read', excerpt:'The science of narrative relaxation — how story structure lulls the brain into rest state naturally.', badgeColor:'blue',   imageUrl:null },
  { id:3, title:'The Streak Effect: Building Lasting Habits',    category:'Habits',  readTime:'3 min read', excerpt:'Consistency, not intensity, is the secret to long-term wellbeing. Here\'s what the data shows.', badgeColor:'violet', imageUrl:null },
  { id:4, title:'Soundscapes and the Default Mode Network',      category:'Focus',   readTime:'5 min read', excerpt:'How ambient sound environments affect creativity, concentration, and cognitive recovery patterns.', badgeColor:'amber',  imageUrl:null },
];

window.SESSIONS_DATA = SESSIONS_DATA;
window.ARTICLES_DATA = ARTICLES_DATA;

// ─── LANDING PAGE ─────────────────────────────────────────────────────────
const LandingPage = ({ onNavigate }) => {
  const isMobile = useIsMobile();

  const features = [
    { title:'Guided Meditations', desc:'Audio sessions from 2 to 30 minutes — for focus, stress relief, and sleep.', icon:'🧘', color:'rgba(167,139,250,.08)', border:'rgba(167,139,250,.15)',
      // Replace null with image path: e.g. imageUrl:'../../assets/feature-meditation.png'
      imageUrl: null, slot:'feature-meditation' },
    { title:'Breathing Exercises', desc:'Box Breathing, 4-7-8, and more — with visual guidance for instant calm.', icon:'💨', color:'rgba(45,212,191,.08)', border:'rgba(45,212,191,.15)',
      imageUrl: null, slot:'feature-breathing' },
    { title:'Sleep Stories', desc:'Beautifully narrated audio stories that carry your mind gently into rest.', icon:'🌙', color:'rgba(124,159,255,.08)', border:'rgba(124,159,255,.15)',
      imageUrl: null, slot:'feature-sleep' },
    { title:'Personal Tracking', desc:'Mood check-ins, streak tracking, and progress charts — understand your patterns.', icon:'✦', color:'rgba(251,191,36,.08)', border:'rgba(251,191,36,.15)',
      imageUrl: null, slot:'feature-tracking' },
  ];

  const steps = [
    { num:'01', title:'Tell us about you', desc:'A short wellness quiz. We learn your goals, stress level, and meditation experience.' },
    { num:'02', title:'Get your plan',     desc:'A personalized report with curated sessions and daily recommendations, just for you.' },
    { num:'03', title:'Press play',        desc:'Close your eyes and let the journey begin. Your first moment of calm is just a tap away.' },
  ];

  const GradText = ({children, from='var(--violet)', to='var(--teal)'}) => (
    <span style={{background:`linear-gradient(135deg,${from},${to})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{children}</span>
  );

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{minHeight:isMobile?'auto':'92vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:isMobile?40:0}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?40:64,alignItems:'center',padding:`${isMobile?48:80}px var(--pad)`}}>
          <div style={{animation:'fadeUp .6s var(--ease) both'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'7px 16px',borderRadius:'var(--r-full)',background:'rgba(167,139,250,.1)',border:'1px solid rgba(167,139,250,.25)',fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:'uppercase',color:'var(--violet)',marginBottom:24}}>
              ✦ Your path to inner peace
            </div>
            <h1 style={{fontFamily:'var(--font-d)',fontWeight:400,lineHeight:1.08,fontSize:`clamp(40px,5.5vw,72px)`,letterSpacing:'1px',color:'var(--text)',marginBottom:24}}>
              Find your<br/><GradText>stillness</GradText><br/>within
            </h1>
            <p style={{fontSize:isMobile?16:18,color:'var(--muted)',lineHeight:1.8,maxWidth:440,marginBottom:36}}>
              Guided meditations, breathing exercises, and personalized wellness tools — all in one place. Take a deep breath. You're in the right place.
            </p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:36}}>
              <Btn variant="primary" size={isMobile?'md':'lg'} onClick={()=>onNavigate('onboarding')}>Begin Your Journey</Btn>
              <Btn variant="ghost" size={isMobile?'md':'lg'} onClick={()=>onNavigate('auth')}>Log in</Btn>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{display:'flex'}}>
                {['#a78bfa','#2dd4bf','#f9a8d4','#fbbf24'].map((c,i)=>(
                  <div key={i} style={{width:28,height:28,borderRadius:'50%',background:`radial-gradient(circle at 35% 35%,${c},${c}88)`,border:'2px solid var(--bg)',marginLeft:i?-8:0,boxShadow:`0 0 10px ${c}55`}}/>
                ))}
              </div>
              <div style={{fontSize:13,color:'var(--muted)'}}>Trusted by <span style={{color:'var(--text)',fontWeight:700}}>12,000+</span> members</div>
            </div>
          </div>

          {/* Hero visual — Meditation Mandala */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:24,animation:'fadeUp .6s var(--ease) .15s both'}}>
            <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {/* Soft ambient glow behind canvas */}
              <div style={{
                position:'absolute',width:isMobile?260:360,height:isMobile?260:360,
                borderRadius:'50%',
                background:'radial-gradient(ellipse at center,rgba(167,139,250,.14) 0%,rgba(45,212,191,.07) 50%,transparent 70%)',
                filter:'blur(24px)',pointerEvents:'none',
              }}/>
              <MeditationCanvas size={isMobile ? 270 : 370}/>
              {/* Center label */}
              <div style={{
                position:'absolute',bottom:isMobile?-8:-12,left:'50%',transform:'translateX(-50%)',
                whiteSpace:'nowrap',
                fontSize:10,fontWeight:700,letterSpacing:3,textTransform:'uppercase',
                color:'rgba(167,139,250,.5)',
              }}>Breathe · Be · Still</div>
            </div>

            {/* Now playing card */}
            <div style={{
              width:'100%',maxWidth:isMobile?260:300,
              background:'rgba(7,13,26,.85)',border:'1px solid rgba(167,139,250,.2)',
              borderRadius:'var(--r)',padding:'14px 18px',backdropFilter:'blur(20px)',
              boxShadow:'0 8px 32px rgba(0,0,0,.5)',animation:'pulse-glow 4s ease-in-out infinite',
              marginTop:8,
            }}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:2.5,textTransform:'uppercase',color:'var(--violet)',marginBottom:8}}>Now Playing</div>
              <div style={{fontFamily:'var(--font-d)',fontSize:15,fontWeight:400,color:'var(--text)',marginBottom:8}}>Morning Clarity</div>
              <ProgressBar value={43}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section" style={{background:'rgba(255,255,255,.02)',borderTop:'1px solid rgba(255,255,255,.05)',borderBottom:'1px solid rgba(255,255,255,.05)'}}>
        <div className="container">
          <SectionLabel>What We Offer</SectionLabel>
          <h2 style={{fontFamily:'var(--font-d)',fontSize:'clamp(26px,4vw,42px)',fontWeight:400,color:'var(--text)',letterSpacing:.5,lineHeight:1.15,marginBottom:12}}>
            Everything you need for <GradText>inner calm</GradText>
          </h2>
          <p style={{fontSize:16,color:'var(--muted)',lineHeight:1.75,maxWidth:500,marginBottom:48}}>Simple, science-backed tools for less stress, better sleep, and clearer focus.</p>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${isMobile?1:2},1fr)`,gap:20}}>
            {features.map((f,i)=>(
              <div key={i} style={{background:f.color,border:`1px solid ${f.border}`,borderRadius:'var(--r-lg)',overflow:'hidden',backdropFilter:'blur(12px)',transition:'transform 220ms var(--ease)'}}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                {/* Feature image slot */}
                <ImageSlot slot={f.slot} src={f.imageUrl}
                  gradient={`linear-gradient(135deg,${f.border.replace('rgba(','rgba(').replace('.15)','.3)')},rgba(7,13,26,.6))`}
                  style={{height:140,position:'relative'}}>
                  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:44,opacity:.3}}>{f.icon}</div>
                </ImageSlot>
                <div style={{padding:'20px 22px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                    <span style={{fontSize:24}}>{f.icon}</span>
                    <div style={{fontFamily:'var(--font-d)',fontSize:18,fontWeight:400,color:'var(--text)',letterSpacing:.3}}>{f.title}</div>
                  </div>
                  <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.7}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section">
        <div className="container">
          <SectionLabel color="var(--teal)">How It Works</SectionLabel>
          <h2 style={{fontFamily:'var(--font-d)',fontSize:'clamp(26px,4vw,42px)',fontWeight:400,color:'var(--text)',letterSpacing:.5,marginBottom:48}}>
            Start in <GradText from="var(--teal)" to="var(--blue)">60 seconds</GradText>
          </h2>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${isMobile?1:3},1fr)`,gap:isMobile?28:48}}>
            {steps.map((s,i)=>(
              <div key={i} style={{display:'flex',flexDirection:isMobile?'row':'column',gap:isMobile?16:0,alignItems:isMobile?'flex-start':'stretch'}}>
                <div style={{fontFamily:'var(--font-d)',fontSize:isMobile?36:52,fontWeight:400,letterSpacing:2,background:'linear-gradient(135deg,var(--violet),var(--teal))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:isMobile?0:18,opacity:.75,flexShrink:0}}>{s.num}</div>
                <div>
                  <div style={{fontFamily:'var(--font-d)',fontSize:19,fontWeight:400,color:'var(--text)',marginBottom:8,letterSpacing:.3}}>{s.title}</div>
                  <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.7}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="section" style={{background:'rgba(255,255,255,.02)',borderTop:'1px solid rgba(255,255,255,.05)',borderBottom:'1px solid rgba(255,255,255,.05)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:`repeat(${isMobile?1:3},1fr)`,gap:20,textAlign:'center'}}>
            {[
              {val:'87%', label:'report less stress after 2 weeks', color:'var(--violet)'},
              {val:'12k+',label:'people found their calm with us',  color:'var(--teal)'},
              {val:'4.8★',label:'average rating from our community',color:'var(--amber)'},
            ].map((m,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'var(--r-lg)',padding:'28px 24px',backdropFilter:'blur(12px)'}}>
                <div style={{fontFamily:'var(--font-d)',fontSize:`clamp(32px,5vw,52px)`,fontWeight:400,background:`linear-gradient(135deg,${m.color},white)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1.1,marginBottom:10}}>{m.val}</div>
                <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.65}}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{textAlign:'center'}}>
        <div className="container" style={{maxWidth:600,margin:'0 auto'}}>
          <div style={{position:'relative',background:'linear-gradient(135deg,rgba(167,139,250,.12),rgba(45,212,191,.08))',border:'1px solid rgba(167,139,250,.2)',borderRadius:'var(--r-xl)',padding:isMobile?'40px 28px':'56px 48px',backdropFilter:'blur(20px)'}}>
            <div style={{position:'absolute',inset:0,borderRadius:'var(--r-xl)',background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(167,139,250,.1),transparent)',pointerEvents:'none'}}/>
            <SectionLabel>Begin Today</SectionLabel>
            <h2 style={{fontFamily:'var(--font-d)',fontSize:'clamp(24px,3.5vw,40px)',fontWeight:400,color:'var(--text)',letterSpacing:.5,lineHeight:1.15,marginBottom:14}}>
              The first step is the<br/><GradText>most important</GradText>
            </h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.75,marginBottom:32}}>Start with a single breath, a single moment of stillness. We'll guide you from there.</p>
            <Btn variant="primary" size="lg" onClick={()=>onNavigate('onboarding')}>Begin Your Journey</Btn>
            <div style={{marginTop:14,fontSize:12,color:'var(--faint)'}}>No credit card required · Access with your wellness code</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop:'1px solid rgba(255,255,255,.07)',padding:'24px 0'}}>
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14}}>
          <div style={{fontFamily:'var(--font-d)',fontSize:15,fontWeight:400,letterSpacing:2,color:'var(--muted)'}}>WELLNESS</div>
          <div style={{display:'flex',gap:20,fontSize:13,color:'var(--faint)'}}>
            {['About','Terms','Privacy'].map(l=><a key={l} href="#" style={{color:'var(--faint)',transition:'color 150ms'}} onMouseEnter={e=>e.target.style.color='var(--text)'} onMouseLeave={e=>e.target.style.color='var(--faint)'}>{l}</a>)}
          </div>
          <div style={{fontSize:12,color:'var(--faint)'}}>© 2026 Wellness portal.</div>
        </div>
      </footer>
    </div>
  );
};

// ─── AUTH PAGE ─────────────────────────────────────────────────────────────
const AuthPage = ({ onNavigate }) => {
  const isMobile = useIsMobile();
  const [mode,setMode]=React.useState('login');
  const [phone,setPhone]=React.useState('');
  const [code,setCode]=React.useState('');
  const [focus,setFocus]=React.useState('');
  const [error,setError]=React.useState('');

  const inputStyle = (name) => ({
    width:'100%', padding:'13px 16px', fontSize:15,
    background:'rgba(255,255,255,.06)',
    border:`1.5px solid ${focus===name?'rgba(167,139,250,.6)':error&&name==='code'?'rgba(248,113,113,.5)':'rgba(255,255,255,.12)'}`,
    borderRadius:'var(--r)', color:'var(--text)', outline:'none',
    fontFamily:'var(--font-b)',
    boxShadow: focus===name?'0 0 0 3px rgba(167,139,250,.12)':'none',
    transition:'all 180ms var(--ease)', backdropFilter:'blur(8px)',
  });

  const handleSubmit = () => {
    if (!phone || !code) { setError('Please fill in both fields.'); return; }
    setError('');
    onNavigate('home');
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{width:'100%',maxWidth:420,animation:'fadeUp .5s var(--ease) both'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontFamily:'var(--font-d)',fontSize:22,fontWeight:400,letterSpacing:3,color:'var(--text)',marginBottom:6}}>WELLNESS</div>
          <div style={{fontSize:11,color:'var(--faint)',letterSpacing:2,textTransform:'uppercase'}}>Find your calm</div>
        </div>
        <div style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'var(--r-xl)',padding:isMobile?'28px 24px':'36px',backdropFilter:'blur(24px)',boxShadow:'0 24px 80px rgba(0,0,0,.5),0 0 60px rgba(167,139,250,.08)'}}>
          {/* Mode toggle */}
          <div style={{display:'flex',background:'rgba(255,255,255,.05)',borderRadius:'var(--r-full)',padding:4,marginBottom:28}}>
            {['login','signup'].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setError('');}} style={{
                flex:1,padding:'9px',borderRadius:'var(--r-full)',border:'none',cursor:'pointer',fontFamily:'var(--font-b)',fontSize:13,fontWeight:700,
                background:mode===m?'rgba(167,139,250,.2)':'transparent',
                color:mode===m?'var(--violet)':'var(--muted)',transition:'all 200ms',
              }}>{m==='login'?'Log in':'Sign up'}</button>
            ))}
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'var(--faint)',display:'block',marginBottom:8}}>Phone number</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} onFocus={()=>setFocus('phone')} onBlur={()=>setFocus('')}
                placeholder="+40 700 000 000" style={inputStyle('phone')}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'var(--faint)',display:'block',marginBottom:8}}>Access code</label>
              <input value={code} onChange={e=>setCode(e.target.value)} onFocus={()=>setFocus('code')} onBlur={()=>setFocus('')}
                placeholder="Enter your code" style={inputStyle('code')}/>
            </div>
            {error && <div style={{fontSize:12,color:'#f87171',fontWeight:600}}>{error}</div>}
            <Btn variant="primary" size="lg" full onClick={handleSubmit}>
              {mode==='login'?'Log in':'Create account'}
            </Btn>
          </div>

          <div style={{marginTop:20,padding:14,background:'rgba(255,255,255,.04)',borderRadius:'var(--r-sm)',fontSize:12,color:'var(--faint)',lineHeight:1.65}}>
            Access codes are provided with your wellness subscription. Contact your provider if you don't have one.
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:20}}>
          <button onClick={()=>onNavigate('landing')} style={{fontSize:12,color:'var(--faint)',background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)'}}>← Back to home</button>
          <button onClick={()=>onNavigate('onboarding')} style={{fontSize:12,color:'var(--violet)',background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)',fontWeight:700}}>Try onboarding →</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LandingPage, AuthPage });

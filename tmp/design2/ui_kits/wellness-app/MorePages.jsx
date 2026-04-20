// MorePages.jsx — Onboarding, AudioPlayer, BreathingExercise

// ─── ONBOARDING ──────────────────────────────────────────────────────────
const OnboardingPage = ({ onNavigate }) => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({ goals:[], stress:'', experience:'', pace:'', duration:'' });
  const [loading, setLoading] = React.useState(false);
  const [loadPct, setLoadPct] = React.useState(0);
  const TOTAL = 6;

  const toggle = (key, val) => {
    setAnswers(a => {
      const arr = a[key]; const has = arr.includes(val);
      return { ...a, [key]: has ? arr.filter(x=>x!==val) : [...arr, val] };
    });
  };
  const pick = (key, val) => setAnswers(a => ({ ...a, [key]: val }));

  const next = () => {
    if (step === TOTAL - 1) {
      setLoading(true);
      let p = 0;
      const t = setInterval(() => {
        p += Math.random() * 18;
        if (p >= 100) { p=100; clearInterval(t); setTimeout(()=>onNavigate('home'), 600); }
        setLoadPct(Math.min(100, p));
      }, 220);
    } else { setStep(s=>s+1); }
  };
  const back = () => setStep(s=>Math.max(0,s-1));

  const goals = [
    {l:'Reduce stress',i:'🌬️'},{l:'Improve sleep',i:'🌙'},{l:'Increase focus',i:'🎯'},
    {l:'Improve mood',i:'😊'},{l:'Learn meditation',i:'🧘'},{l:'Personal growth',i:'✦'},
  ];
  const stressLevels = ['Almost always','Frequently','Sometimes','Rarely'];
  const expLevels = [
    {l:'Brand new',d:"I've never tried it"},
    {l:"I've tried it",d:'A few sessions before'},
    {l:'Occasionally',d:'A few times a month'},
    {l:'Regularly',d:'Multiple times a week'},
  ];
  const paces = [
    {l:'Fast',d:'Jump right in',i:'⚡'},
    {l:'Balanced',d:'Steady progress',i:'🌊'},
    {l:'Slow',d:'Take my time',i:'🍃'},
  ];
  const durations = ['2–5 min','5–10 min','10–20 min','20+ min'];

  const GradText = ({children}) => (
    <span style={{background:'linear-gradient(135deg,var(--violet),var(--teal))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{children}</span>
  );

  const steps = [
    // Step 0: Goals
    <div key="goals">
      <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(24px,3vw,34px)',fontWeight:400,color:'var(--text)',marginBottom:8,lineHeight:1.2}}>
        What brings <GradText>you here?</GradText>
      </div>
      <div style={{fontSize:14,color:'var(--muted)',marginBottom:28}}>Select all that apply</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
        {goals.map(g=>{
          const sel = answers.goals.includes(g.l);
          return <button key={g.l} onClick={()=>toggle('goals',g.l)} style={{
            padding:'16px 18px',borderRadius:'var(--r)',border:`1.5px solid ${sel?'rgba(167,139,250,.6)':'rgba(255,255,255,.1)'}`,
            background:sel?'rgba(167,139,250,.15)':'rgba(255,255,255,.04)',
            backdropFilter:'blur(12px)',cursor:'pointer',fontFamily:'var(--font-b)',
            display:'flex',alignItems:'center',gap:12,
            boxShadow:sel?'0 0 20px rgba(167,139,250,.2)':'none',
            transition:'all 200ms var(--ease)',
          }}>
            <span style={{fontSize:22}}>{g.i}</span>
            <span style={{fontSize:14,fontWeight:600,color:sel?'var(--violet)':'var(--text)',transition:'color 150ms'}}>{g.l}</span>
          </button>;
        })}
      </div>
    </div>,

    // Step 1: Insight
    <div key="insight1" style={{textAlign:'center',padding:'20px 0'}}>
      <div style={{fontSize:60,marginBottom:28}}>🌿</div>
      <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(22px,3vw,32px)',fontWeight:400,color:'var(--text)',marginBottom:16,lineHeight:1.3}}>
        You're not <GradText>alone</GradText>
      </div>
      <div style={{fontSize:17,color:'var(--muted)',lineHeight:1.8,maxWidth:380,margin:'0 auto'}}>
        95% of our members report feeling less stressed after just a few minutes a day.
      </div>
      <div style={{
        marginTop:32,padding:'20px 24px',
        background:'rgba(167,139,250,.08)',border:'1px solid rgba(167,139,250,.2)',
        borderRadius:'var(--r)',display:'inline-block',
      }}>
        <div style={{fontFamily:'var(--font-d)',fontSize:40,fontWeight:400,background:'linear-gradient(135deg,var(--violet),var(--teal))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>12,000+</div>
        <div style={{fontSize:13,color:'var(--muted)',marginTop:4}}>people found their calm</div>
      </div>
    </div>,

    // Step 2: Stress frequency
    <div key="stress">
      <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(22px,3vw,32px)',fontWeight:400,color:'var(--text)',marginBottom:8,lineHeight:1.2}}>
        How often do you feel <GradText>stressed?</GradText>
      </div>
      <div style={{fontSize:14,color:'var(--muted)',marginBottom:28}}>Be honest — we'll tailor your experience</div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {stressLevels.map(s=>{
          const sel=answers.stress===s;
          return <button key={s} onClick={()=>pick('stress',s)} style={{
            padding:'16px 20px',borderRadius:'var(--r)',border:`1.5px solid ${sel?'rgba(167,139,250,.6)':'rgba(255,255,255,.1)'}`,
            background:sel?'rgba(167,139,250,.15)':'rgba(255,255,255,.04)',
            backdropFilter:'blur(12px)',cursor:'pointer',fontFamily:'var(--font-b)',
            textAlign:'left',fontSize:15,fontWeight:sel?700:500,
            color:sel?'var(--violet)':'var(--text)',transition:'all 200ms var(--ease)',
            boxShadow:sel?'0 0 20px rgba(167,139,250,.2)':'none',
          }}>{s}</button>;
        })}
      </div>
    </div>,

    // Step 3: Experience
    <div key="experience">
      <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(22px,3vw,32px)',fontWeight:400,color:'var(--text)',marginBottom:8,lineHeight:1.2}}>
        Your experience with <GradText>meditation?</GradText>
      </div>
      <div style={{fontSize:14,color:'var(--muted)',marginBottom:28}}>No wrong answer here</div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {expLevels.map(e=>{
          const sel=answers.experience===e.l;
          return <button key={e.l} onClick={()=>pick('experience',e.l)} style={{
            padding:'16px 20px',borderRadius:'var(--r)',border:`1.5px solid ${sel?'rgba(45,212,191,.5)':'rgba(255,255,255,.1)'}`,
            background:sel?'rgba(45,212,191,.1)':'rgba(255,255,255,.04)',
            backdropFilter:'blur(12px)',cursor:'pointer',fontFamily:'var(--font-b)',
            textAlign:'left',transition:'all 200ms var(--ease)',
            boxShadow:sel?'0 0 20px rgba(45,212,191,.15)':'none',
          }}>
            <div style={{fontSize:15,fontWeight:700,color:sel?'var(--teal)':'var(--text)'}}>{e.l}</div>
            <div style={{fontSize:13,color:'var(--muted)',marginTop:3}}>{e.d}</div>
          </button>;
        })}
      </div>
    </div>,

    // Step 4: Pace
    <div key="pace">
      <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(22px,3vw,32px)',fontWeight:400,color:'var(--text)',marginBottom:8,lineHeight:1.2}}>
        How do you prefer to <GradText>learn?</GradText>
      </div>
      <div style={{fontSize:14,color:'var(--muted)',marginBottom:28}}>We'll adapt your content pace</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
        {paces.map(p=>{
          const sel=answers.pace===p.l;
          return <button key={p.l} onClick={()=>pick('pace',p.l)} style={{
            padding:'22px 14px',borderRadius:'var(--r)',border:`1.5px solid ${sel?'rgba(167,139,250,.6)':'rgba(255,255,255,.1)'}`,
            background:sel?'rgba(167,139,250,.15)':'rgba(255,255,255,.04)',
            backdropFilter:'blur(12px)',cursor:'pointer',fontFamily:'var(--font-b)',
            display:'flex',flexDirection:'column',alignItems:'center',gap:10,
            transition:'all 200ms var(--ease)',boxShadow:sel?'0 0 24px rgba(167,139,250,.2)':'none',
          }}>
            <span style={{fontSize:28}}>{p.i}</span>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:sel?'var(--violet)':'var(--text)'}}>{p.l}</div>
              <div style={{fontSize:11,color:'var(--faint)',marginTop:2}}>{p.d}</div>
            </div>
          </button>;
        })}
      </div>
    </div>,

    // Step 5: Duration
    <div key="duration">
      <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(22px,3vw,32px)',fontWeight:400,color:'var(--text)',marginBottom:8,lineHeight:1.2}}>
        Daily time <GradText>commitment?</GradText>
      </div>
      <div style={{fontSize:14,color:'var(--muted)',marginBottom:28}}>Even 2 minutes makes a difference</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
        {durations.map(d=>{
          const sel=answers.duration===d;
          return <button key={d} onClick={()=>pick('duration',d)} style={{
            padding:'22px 16px',borderRadius:'var(--r)',border:`1.5px solid ${sel?'rgba(45,212,191,.5)':'rgba(255,255,255,.1)'}`,
            background:sel?'rgba(45,212,191,.1)':'rgba(255,255,255,.04)',
            backdropFilter:'blur(12px)',cursor:'pointer',fontFamily:'var(--font-d)',
            fontSize:22,fontWeight:400,color:sel?'var(--teal)':'var(--text)',
            transition:'all 200ms var(--ease)',boxShadow:sel?'0 0 20px rgba(45,212,191,.15)':'none',
            letterSpacing:.3,
          }}>{d}</button>;
        })}
      </div>
    </div>,
  ];

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
      <BreathingOrb size={160} dur={3}/>
      <div style={{marginTop:40,width:300,textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-d)',fontSize:20,fontWeight:400,color:'var(--text)',marginBottom:20,letterSpacing:.3}}>
          {loadPct < 40 ? 'Analyzing your preferences…' : loadPct < 80 ? 'Creating your personal plan…' : 'Welcome! ✦'}
        </div>
        <div style={{height:4,background:'rgba(255,255,255,.08)',borderRadius:'var(--r-full)',overflow:'hidden'}}>
          <div style={{height:'100%',width:`${loadPct}%`,background:'linear-gradient(90deg,var(--violet),var(--teal))',borderRadius:'var(--r-full)',transition:'width .3s var(--ease)'}}/>
        </div>
        <div style={{fontSize:12,color:'var(--faint)',marginTop:10}}>{Math.round(loadPct)}%</div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'clamp(20px,4vw,60px) var(--pad)'}}>
      {/* Progress bar */}
      <div style={{maxWidth:520,width:'100%',margin:'0 auto 32px',paddingTop:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--faint)'}}>Step {step+1} of {TOTAL}</div>
          {step>0 && <button onClick={back} style={{fontSize:12,color:'var(--muted)',background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)',display:'flex',alignItems:'center',gap:4}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg> Back
          </button>}
        </div>
        <div className="ob-bar"><div className="ob-bar-fill" style={{width:`${((step+1)/TOTAL)*100}%`}}/></div>
      </div>

      {/* Step content */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'100%',maxWidth:520,animation:'fadeUp .35s var(--ease) both'}}>
          {steps[step]}
          <div style={{marginTop:32}}>
            <Btn variant="primary" size="lg" full onClick={next}>
              {step===TOTAL-1 ? 'Personalize my experience ✦' : 'Continue'}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── AUDIO PLAYER ─────────────────────────────────────────────────────────
const PlayerPage = ({ session, onBack, onNavigate }) => {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [vol, setVol] = React.useState(80);
  const [fav, setFav] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [postMood, setPostMood] = React.useState(null);
  const dur = 600; // 10 minutes in seconds

  React.useEffect(() => {
    if (!playing || done) return;
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= dur) { setDone(true); setPlaying(false); return dur; }
        return p + 1;
      });
    }, 100); // fast for demo
    return () => clearInterval(t);
  }, [playing, done]);

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  const pct = (progress/dur)*100;
  const grad = SESSION_GRADIENTS[session?.type] || SESSION_GRADIENTS.default;
  const moods = [{e:'😞',l:'Low'},{e:'😐',l:'Okay'},{e:'🙂',l:'Good'},{e:'😊',l:'Great'},{e:'🤩',l:'Amazing'}];

  if (done && !postMood) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32,textAlign:'center',animation:'fadeUp .4s var(--ease)'}}>
      <div style={{fontSize:64,marginBottom:20}}>✨</div>
      <div style={{fontFamily:'var(--font-d)',fontSize:28,fontWeight:400,color:'var(--text)',marginBottom:8,letterSpacing:.3}}>Excellent!</div>
      <div style={{fontSize:15,color:'var(--muted)',marginBottom:32}}>You completed <em style={{color:'var(--violet)',fontStyle:'italic'}}>{session?.title}</em>.</div>
      <div style={{fontFamily:'var(--font-d)',fontSize:18,fontWeight:400,color:'var(--text)',marginBottom:20}}>How do you feel now?</div>
      <div style={{display:'flex',gap:16,marginBottom:36}}>
        {moods.map(m=>(
          <button key={m.l} onClick={()=>setPostMood(m.l)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)',transition:'transform 180ms'}}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.15)'}
            onMouseLeave={e=>e.currentTarget.style.transform='none'}>
            <span style={{fontSize:32}}>{m.e}</span>
            <span style={{fontSize:11,color:'var(--muted)',fontWeight:600}}>{m.l}</span>
          </button>
        ))}
      </div>
      <Btn variant="ghost" onClick={()=>onNavigate&&onNavigate('home')}>Back to Home</Btn>
    </div>
  );

  if (done && postMood) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32,textAlign:'center',animation:'fadeUp .4s var(--ease)'}}>
      <BreathingOrb size={120} dur={6}/>
      <div style={{fontFamily:'var(--font-d)',fontSize:24,fontWeight:400,color:'var(--text)',marginTop:24,marginBottom:8}}>Wonderful progress</div>
      <div style={{fontSize:14,color:'var(--muted)',marginBottom:32}}>🔥 Streak updated to 15 days!</div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
        <Btn variant="primary" onClick={()=>onNavigate&&onNavigate('explore')}>Continue journey</Btn>
        <Btn variant="ghost" onClick={()=>onNavigate&&onNavigate('home')}>Home</Btn>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'var(--bg)',animation:'fadeIn .3s var(--ease)'}}>
      {/* Back button */}
      <div style={{padding:'16px var(--pad)'}}>
        <button onClick={onBack||(() => onNavigate&&onNavigate('explore'))} style={{display:'flex',alignItems:'center',gap:8,color:'var(--muted)',background:'none',border:'none',cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:'var(--font-b)'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
      </div>

      {/* Thumbnail */}
      <ImageSlot slot={`session-${session?.id||1}-player`} src={session?.imageUrl} gradient={grad}
        style={{margin:'0 var(--pad)',borderRadius:'var(--r-lg)',height:'clamp(200px,35vw,340px)',position:'relative',flexShrink:0}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(7,13,26,.8),rgba(7,13,26,.2) 50%,transparent)',borderRadius:'var(--r-lg)'}}/>
        <div style={{position:'absolute',bottom:20,left:24}}>
          <Badge color={session?.badgeColor||'violet'}>{session?.category||'Meditation'}</Badge>
        </div>
        <button onClick={()=>setFav(f=>!f)} style={{
          position:'absolute',top:16,right:16,
          width:38,height:38,borderRadius:'50%',
          background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.2)',
          display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',
          color:fav?'var(--rose)':'rgba(255,255,255,.6)',transition:'color 200ms',backdropFilter:'blur(8px)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav?'currentColor':'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </ImageSlot>

      {/* Info + controls */}
      <div style={{flex:1,display:'flex',flexDirection:'column',padding:'24px var(--pad)',gap:20,maxWidth:560,width:'100%',margin:'0 auto'}}>
        <div>
          <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(22px,2.5vw,28px)',fontWeight:400,color:'var(--text)',marginBottom:4,letterSpacing:.3}}>{session?.title||'Morning Clarity'}</div>
          <div style={{fontSize:14,color:'var(--muted)'}}>{session?.instructor||'Sofia M.'} · {session?.type||'Meditation'}</div>
        </div>

        {/* Scrubber */}
        <div>
          <input type="range" className="violet" min={0} max={dur} value={progress}
            onChange={e=>setProgress(Number(e.target.value))}
            style={{width:'100%',marginBottom:6}}/>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--faint)',fontWeight:600}}>
            <span>{fmt(progress)}</span><span>{fmt(dur)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:20}}>
          <button onClick={()=>setProgress(p=>Math.max(0,p-15))} style={{color:'var(--muted)',background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4,fontFamily:'var(--font-b)'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
            <span style={{fontSize:9,letterSpacing:.5}}>15s</span>
          </button>
          <button onClick={()=>setPlaying(p=>!p)} style={{
            width:68,height:68,borderRadius:'50%',
            background:'linear-gradient(135deg,var(--violet),var(--teal))',
            border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',
            boxShadow:'0 0 30px rgba(167,139,250,.4)',transition:'transform 180ms,box-shadow 180ms',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.06)';e.currentTarget.style.boxShadow='0 0 50px rgba(167,139,250,.6)';}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 0 30px rgba(167,139,250,.4)';}}>
            {playing
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="#070d1a"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="#070d1a"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
          </button>
          <button onClick={()=>setProgress(p=>Math.min(dur,p+15))} style={{color:'var(--muted)',background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4,fontFamily:'var(--font-b)'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
            <span style={{fontSize:9,letterSpacing:.5}}>15s</span>
          </button>
        </div>

        {/* Volume */}
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
          <input type="range" min={0} max={100} value={vol} onChange={e=>setVol(Number(e.target.value))} style={{flex:1}}/>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
        </div>
      </div>
    </div>
  );
};

// ─── BREATHING EXERCISE ───────────────────────────────────────────────────
const BreathingPage = ({ onBack, onNavigate }) => {
  const [technique, setTechnique] = React.useState(null);
  const [running, setRunning] = React.useState(false);
  const [phase, setPhase] = React.useState('inhale');
  const [phaseTime, setPhaseTime] = React.useState(0);
  const [round, setRound] = React.useState(0);

  const techniques = [
    { id:'box',  name:'Box Breathing',    desc:'4-4-4-4 pattern for focus and calm',       phases:[{l:'Inhale',d:4},{l:'Hold',d:4},{l:'Exhale',d:4},{l:'Hold',d:4}], color:'var(--violet)', rounds:4 },
    { id:'478',  name:'4-7-8 Breathing',  desc:'Powerful technique for sleep and anxiety', phases:[{l:'Inhale',d:4},{l:'Hold',d:7},{l:'Exhale',d:8}],                color:'var(--teal)',   rounds:4 },
    { id:'belly',name:'Deep Belly',        desc:'Activate your natural relaxation response',phases:[{l:'Inhale',d:4},{l:'Hold',d:1},{l:'Exhale',d:6}],                color:'var(--blue)',   rounds:5 },
    { id:'sos',  name:'SOS — Quick Relief',desc:'1-minute relief for acute stress',         phases:[{l:'Inhale',d:4},{l:'Hold',d:4},{l:'Exhale',d:4}],                color:'var(--rose)',   rounds:3 },
  ];

  const current = techniques.find(t=>t.id===technique);
  const phaseColors = { Inhale:'var(--teal)', Hold:'var(--amber)', Exhale:'var(--violet)', default:'var(--faint)' };

  React.useEffect(() => {
    if (!running || !current) return;
    let phaseIdx = 0, t = 0;
    const phases = current.phases;
    setPhase(phases[0].l); setPhaseTime(phases[0].d);

    const interval = setInterval(() => {
      t++;
      const curPhase = phases[phaseIdx];
      const remaining = curPhase.d - t;
      setPhaseTime(remaining);
      if (t >= curPhase.d) {
        t = 0;
        phaseIdx = (phaseIdx + 1) % phases.length;
        if (phaseIdx === 0) setRound(r => r + 1);
        setPhase(phases[phaseIdx].l);
        setPhaseTime(phases[phaseIdx].d);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running, technique]);

  const phaseColor = phaseColors[phase] || phaseColors.default;
  const orbDur = current ? current.phases.find(p=>p.l===phase)?.d || 4 : 4;

  if (!technique) return (
    <div style={{minHeight:'100vh',padding:'20px var(--pad)',display:'flex',flexDirection:'column'}}>
      <button onClick={()=>onNavigate&&onNavigate('home')} style={{display:'flex',alignItems:'center',gap:8,color:'var(--muted)',background:'none',border:'none',cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:'var(--font-b)',marginBottom:32}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg> Back
      </button>
      <div style={{maxWidth:520,margin:'0 auto',width:'100%'}}>
        <SectionLabel color="var(--teal)">Breathing Exercises</SectionLabel>
        <h1 style={{fontFamily:'var(--font-d)',fontSize:'clamp(26px,3.5vw,38px)',fontWeight:400,color:'var(--text)',marginBottom:8,letterSpacing:.5}}>
          Choose your <span style={{background:'linear-gradient(135deg,var(--teal),var(--blue))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>technique</span>
        </h1>
        <p style={{fontSize:14,color:'var(--muted)',marginBottom:32}}>Each technique targets a different state. Pick what you need right now.</p>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {techniques.map(t=>(
            <button key={t.id} onClick={()=>setTechnique(t.id)} style={{
              padding:'20px 22px',borderRadius:'var(--r)',border:'1px solid rgba(255,255,255,.1)',
              background:'rgba(255,255,255,.055)',backdropFilter:'blur(16px)',
              cursor:'pointer',fontFamily:'var(--font-b)',textAlign:'left',
              transition:'all 220ms var(--ease)',display:'flex',alignItems:'center',gap:16,
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.09)';e.currentTarget.style.transform='translateX(4px)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.055)';e.currentTarget.style.transform='none';}}>
              <div style={{width:4,height:48,borderRadius:2,background:t.color,flexShrink:0}}/>
              <div>
                <div style={{fontSize:16,fontWeight:700,color:'var(--text)',marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:13,color:'var(--muted)'}}>{t.desc}</div>
              </div>
              <div style={{marginLeft:'auto',color:'var(--faint)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',padding:'20px var(--pad) 40px',textAlign:'center'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <button onClick={()=>{setTechnique(null);setRunning(false);setRound(0);}} style={{display:'flex',alignItems:'center',gap:6,color:'var(--muted)',background:'none',border:'none',cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:'var(--font-b)'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg> Techniques
        </button>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:1.5,color:'var(--faint)',textTransform:'uppercase'}}>Round {round + 1} / {current?.rounds}</div>
      </div>

      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
        <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(18px,2.5vw,24px)',fontWeight:400,color:'var(--text)',letterSpacing:.5}}>{current?.name}</div>

        {/* Breathing visual */}
        <div style={{position:'relative',width:240,height:240,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {/* Rotating ring */}
          <div style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%',border:'1px solid rgba(255,255,255,.06)',animation:'spin-breath 12s linear infinite'}}/>
          <div style={{position:'absolute',width:'85%',height:'85%',borderRadius:'50%',border:`1px solid ${phaseColor}25`,animation:`breathe-ring ${orbDur}s ease-in-out infinite`}}/>
          {/* Core */}
          <div style={{
            width:'55%',height:'55%',borderRadius:'50%',
            background:`radial-gradient(circle at 35% 35%,${phaseColor},rgba(7,13,26,.4))`,
            animation:`breathe ${orbDur}s ease-in-out infinite`,
            boxShadow:`0 0 40px ${phaseColor}66,0 0 80px ${phaseColor}22`,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
          }}>
          </div>
          {/* Phase label in center */}
          <div style={{position:'absolute',textAlign:'center',pointerEvents:'none'}}>
            <div style={{fontFamily:'var(--font-d)',fontSize:22,fontWeight:400,color:'var(--text)',letterSpacing:.5}}>{running?phase:'Ready'}</div>
            {running && <div style={{fontSize:32,fontWeight:700,color:phaseColor,lineHeight:1,marginTop:4}}>{phaseTime}</div>}
          </div>
        </div>

        {/* Phase indicators */}
        {running && (
          <div style={{display:'flex',gap:8}}>
            {current?.phases.map(p=>(
              <div key={p.l} style={{
                padding:'4px 12px',borderRadius:'var(--r-full)',
                background:phase===p.l?`${phaseColors[p.l]}20`:'rgba(255,255,255,.04)',
                border:`1px solid ${phase===p.l?phaseColors[p.l]+'50':'rgba(255,255,255,.08)'}`,
                fontSize:11,fontWeight:700,color:phase===p.l?phaseColors[p.l]:'var(--faint)',
                letterSpacing:.5,
              }}>{p.l} {p.d}s</div>
            ))}
          </div>
        )}
      </div>

      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,width:'100%',maxWidth:300}}>
        <Btn variant="primary" size="lg" full onClick={()=>setRunning(r=>!r)}>
          {running ? 'Pause' : round > 0 ? 'Resume' : 'Start'}
        </Btn>
        {running && (
          <Btn variant="ghost" size="sm" onClick={()=>{setRunning(false);setRound(0);setPhase('inhale');setPhaseTime(0);}}>Stop</Btn>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { OnboardingPage, PlayerPage, BreathingPage });

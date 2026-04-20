// AppPages.jsx — Home, Explore, Learn, Progress, Profile (Midnight Bloom, responsive)

// ─── HOME ─────────────────────────────────────────────────────────────────
const HomePage = ({ onNavigate, onPlay }) => {
  const isMobile = useIsMobile();
  const [mood,setMood]=React.useState(null);
  const moods=[{l:'Low',e:'😞',v:1},{l:'Foggy',e:'😔',v:2},{l:'Okay',e:'😐',v:3},{l:'Bright',e:'🙂',v:4},{l:'Glowing',e:'😊',v:5}];
  const recommended = window.SESSIONS_DATA.slice(0,isMobile?2:3);
  const weekDays=['M','T','W','T','F','S','S'];
  const done=[0,1,2,3,5];
  const categories=[
    {l:'Meditation',g:'linear-gradient(135deg,#312e81,#7c3aed)',i:'🧘'},
    {l:'Breathing', g:'linear-gradient(135deg,#064e3b,#059669)',i:'💨'},
    {l:'Sleep',     g:'linear-gradient(135deg,#1e1b4b,#4338ca)',i:'🌙'},
    {l:'Focus',     g:'linear-gradient(135deg,#0c4a6e,#0284c7)',i:'🎯'},
    {l:'Learn',     g:'linear-gradient(135deg,#3b0764,#7e22ce)',i:'📖'},
    {l:'Motivate',  g:'linear-gradient(135deg,#7f1d1d,#dc2626)',i:'⚡'},
  ];

  return (
    <div style={{paddingBottom:`calc(var(--bb) + 24px)`}}>
      {/* Greeting */}
      <div style={{background:'linear-gradient(180deg,rgba(167,139,250,.06) 0%,transparent 100%)',borderBottom:'1px solid rgba(255,255,255,.06)',padding:`28px var(--pad) 24px`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12}}>
          <div>
            <h1 style={{fontFamily:'var(--font-d)',fontSize:`clamp(20px,3vw,32px)`,fontWeight:400,color:'var(--text)',lineHeight:1.2,letterSpacing:.5}}>
              Good morning,{' '}
              <span style={{background:'linear-gradient(135deg,var(--violet),var(--teal))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Ana</span>
            </h1>
            <p style={{fontSize:14,color:'var(--muted)',marginTop:5}}>Even 5 minutes can change your day.</p>
          </div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'var(--faint)',paddingTop:4}}>Sun, Apr 20</div>
        </div>
      </div>

      <div className="container" style={{paddingTop:24,display:'flex',flexDirection:'column',gap:24}}>
        {/* Streak + Mood */}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:14}}>
          <div style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',padding:18,backdropFilter:'blur(16px)'}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--amber)',marginBottom:10}}>🔥 Day Streak</div>
            <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:12}}>
              <span style={{fontFamily:'var(--font-d)',fontSize:42,fontWeight:400,color:'var(--text)',lineHeight:1}}>14</span>
              <span style={{fontSize:13,color:'var(--muted)'}}>days</span>
            </div>
            <div style={{display:'flex',gap:4}}>
              {weekDays.map((d,i)=>(
                <div key={i} style={{flex:1,textAlign:'center'}}>
                  <div style={{width:'100%',aspectRatio:'1',borderRadius:3,background:done.includes(i)?'linear-gradient(135deg,var(--violet),var(--teal))':'rgba(255,255,255,.07)',marginBottom:3,boxShadow:done.includes(i)?'0 0 8px rgba(167,139,250,.35)':'none'}}/>
                  <div style={{fontSize:8,color:'var(--faint)',fontWeight:700}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',padding:18,backdropFilter:'blur(16px)'}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--violet)',marginBottom:10}}>
              {mood?'Today you feel:':'How are you feeling?'}
            </div>
            {mood ? (
              <div style={{textAlign:'center',paddingTop:4}}>
                <div style={{fontSize:38}}>{moods.find(m=>m.v===mood)?.e}</div>
                <div style={{fontSize:14,fontWeight:700,color:'var(--text)',marginTop:6}}>{moods.find(m=>m.v===mood)?.l}</div>
                <button onClick={()=>setMood(null)} style={{fontSize:11,color:'var(--violet)',background:'none',border:'none',cursor:'pointer',marginTop:6,fontFamily:'var(--font-b)'}}>Change</button>
              </div>
            ) : (
              <div style={{display:'flex',justifyContent:'space-between',gap:2}}>
                {moods.map(m=>(
                  <button key={m.v} onClick={()=>setMood(m.v)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,background:'none',border:'none',cursor:'pointer',padding:'6px 2px',borderRadius:'var(--r-sm)',transition:'background 150ms',fontFamily:'var(--font-b)'}}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.07)'}
                    onMouseLeave={e=>e.currentTarget.style.background='none'}>
                    <span style={{fontSize:isMobile?20:22}}>{m.e}</span>
                    <span style={{fontSize:8,color:'var(--faint)',fontWeight:600}}>{m.l}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Moment of Day */}
        <div onClick={()=>onPlay&&onPlay(window.SESSIONS_DATA[0])} style={{
          background:'linear-gradient(135deg,rgba(124,159,255,.12),rgba(45,212,191,.08))',
          border:'1px solid rgba(124,159,255,.2)',borderRadius:'var(--r-lg)',padding:20,
          cursor:'pointer',backdropFilter:'blur(16px)',
          display:'flex',alignItems:'center',gap:isMobile?16:24,
          transition:'all 220ms var(--ease)',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background='linear-gradient(135deg,rgba(124,159,255,.18),rgba(45,212,191,.14))';e.currentTarget.style.transform='translateY(-2px)';}}
        onMouseLeave={e=>{e.currentTarget.style.background='linear-gradient(135deg,rgba(124,159,255,.12),rgba(45,212,191,.08))';e.currentTarget.style.transform='none';}}>
          <BreathingOrb size={isMobile?72:90} dur={5}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--teal)',marginBottom:6}}>Moment of the Day</div>
            <div style={{fontFamily:'var(--font-d)',fontSize:isMobile?17:20,fontWeight:400,color:'var(--text)',marginBottom:3,letterSpacing:.3}}>Morning Clarity</div>
            <div style={{fontSize:13,color:'var(--muted)'}}>Meditation · 10 min</div>
          </div>
          <div style={{width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(8px)',flexShrink:0}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>

        {/* Breathing shortcut */}
        <button onClick={()=>onNavigate('breathing')} style={{
          display:'flex',alignItems:'center',gap:14,
          background:'rgba(45,212,191,.07)',border:'1px solid rgba(45,212,191,.15)',
          borderRadius:'var(--r)',padding:'14px 18px',cursor:'pointer',
          fontFamily:'var(--font-b)',transition:'all 180ms var(--ease)',textAlign:'left',
        }}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(45,212,191,.12)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(45,212,191,.07)'}>
          <span style={{fontSize:28}}>💨</span>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:'var(--teal)'}}>Quick Breathing Exercise</div>
            <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>Box, 4-7-8, SOS relief — choose your technique</div>
          </div>
          <svg style={{marginLeft:'auto',flexShrink:0}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        {/* Recommended */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <SectionLabel>Recommended</SectionLabel>
            <button onClick={()=>onNavigate('explore')} style={{fontSize:11,color:'var(--violet)',fontWeight:700,background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)',letterSpacing:.5}}>SEE ALL</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${isMobile?2:3},1fr)`,gap:14}}>
            {recommended.map(s=><SessionCard key={s.id} session={s} compact onPlay={onPlay}/>)}
          </div>
        </div>

        {/* Categories */}
        <div>
          <SectionLabel color="var(--teal)">Your Categories</SectionLabel>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${isMobile?2:3},1fr)`,gap:10,marginTop:4}}>
            {categories.map((c,i)=>(
              <button key={i} onClick={()=>i===1?onNavigate('breathing'):onNavigate('explore')} style={{
                background:c.g,borderRadius:'var(--r)',padding:'14px 14px',
                border:'none',display:'flex',alignItems:'center',gap:10,
                cursor:'pointer',transition:'transform 180ms var(--ease)',
                boxShadow:'0 4px 16px rgba(0,0,0,.3)',fontFamily:'var(--font-b)',
              }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px) scale(1.02)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <span style={{fontSize:16}}>{c.i}</span>
                <span style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.9)',letterSpacing:.2}}>{c.l}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily phrase */}
        <div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'var(--r-lg)',padding:isMobile?'22px 20px':'28px 32px',textAlign:'center',backdropFilter:'blur(12px)'}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--violet)',marginBottom:14}}>✦ Phrase of the Day</div>
          <div style={{fontFamily:'var(--font-d)',fontSize:`clamp(15px,2vw,21px)`,fontWeight:400,fontStyle:'italic',color:'var(--text)',lineHeight:1.65,maxWidth:480,margin:'0 auto',letterSpacing:.3}}>
            "The present moment is the only moment available to us, and it is the door to all moments."
          </div>
          <div style={{fontSize:11,color:'var(--faint)',marginTop:14,fontWeight:700,letterSpacing:1}}>— THICH NHAT HANH</div>
        </div>
      </div>
    </div>
  );
};

// ─── EXPLORE ──────────────────────────────────────────────────────────────
const ExplorePage = ({ onNavigate, onPlay }) => {
  const isMobile = useIsMobile();
  const [search,setSearch]=React.useState('');
  const [activeType,setActiveType]=React.useState('All');
  const types=['All','Meditation','Breathing','Sleep','Soundscape','Focus','Motivational'];
  const filtered=window.SESSIONS_DATA.filter(s=>
    (activeType==='All'||s.type===activeType)&&
    (s.title.toLowerCase().includes(search.toLowerCase())||s.category.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{paddingBottom:`calc(var(--bb) + 24px)`}}>
      <div style={{background:'linear-gradient(180deg,rgba(45,212,191,.05) 0%,transparent 100%)',borderBottom:'1px solid rgba(255,255,255,.06)',padding:`24px var(--pad)`}}>
        <h1 style={{fontFamily:'var(--font-d)',fontSize:'clamp(24px,3.5vw,38px)',fontWeight:400,color:'var(--text)',letterSpacing:.5,marginBottom:14}}>
          <span style={{background:'linear-gradient(135deg,var(--teal),var(--blue))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Explore</span> sessions
        </h1>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search meditations, topics…"
          style={{width:'100%',maxWidth:460,padding:'10px 18px',fontSize:14,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'var(--r-full)',color:'var(--text)',outline:'none',fontFamily:'var(--font-b)',backdropFilter:'blur(8px)'}}/>
      </div>
      <div className="container" style={{paddingTop:20}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24,overflowX:'auto',paddingBottom:4}}>
          {types.map(t=><Chip key={t} active={activeType===t} onClick={()=>setActiveType(t)}>{t}</Chip>)}
        </div>
        {filtered.length>0 ? (
          <div style={{display:'grid',gridTemplateColumns:`repeat(auto-fill,minmax(${isMobile?'160px':'220px'},1fr))`,gap:16}}>
            {filtered.map(s=><SessionCard key={s.id} session={s} onPlay={onPlay}/>)}
          </div>
        ) : (
          <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted)',fontFamily:'var(--font-d)',fontSize:20,fontStyle:'italic'}}>No sessions found.</div>
        )}
      </div>
    </div>
  );
};

// ─── LEARN ────────────────────────────────────────────────────────────────
const LearnPage = ({ onNavigate }) => {
  const isMobile = useIsMobile();
  const [search,setSearch]=React.useState('');
  const [cat,setCat]=React.useState('All');
  const cats=['All','Science','Sleep','Habits','Focus'];
  const filtered=window.ARTICLES_DATA.filter(a=>
    (cat==='All'||a.category===cat)&&a.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{paddingBottom:`calc(var(--bb) + 24px)`}}>
      <div style={{background:'linear-gradient(180deg,rgba(124,159,255,.05) 0%,transparent 100%)',borderBottom:'1px solid rgba(255,255,255,.06)',padding:`24px var(--pad)`}}>
        <h1 style={{fontFamily:'var(--font-d)',fontSize:'clamp(24px,3.5vw,38px)',fontWeight:400,color:'var(--text)',letterSpacing:.5,marginBottom:6}}>
          <span style={{background:'linear-gradient(135deg,var(--blue),var(--violet))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Learn</span>
        </h1>
        <p style={{fontSize:14,color:'var(--muted)',marginBottom:14}}>Science-backed articles on stress, sleep, focus, and mindfulness.</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles…"
          style={{width:'100%',maxWidth:460,padding:'10px 18px',fontSize:14,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'var(--r-full)',color:'var(--text)',outline:'none',fontFamily:'var(--font-b)',backdropFilter:'blur(8px)'}}/>
      </div>
      <div className="container" style={{paddingTop:20}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
          {cats.map(c=><Chip key={c} active={cat===c} onClick={()=>setCat(c)}>{c}</Chip>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(auto-fill,minmax(300px,1fr))',gap:16}}>
          {filtered.map(a=><ArticleCard key={a.id} article={a}/>)}
        </div>
      </div>
    </div>
  );
};

// ─── PROGRESS ────────────────────────────────────────────────────────────
const ProgressPage = ({ onNavigate }) => {
  const isMobile = useIsMobile();
  const stats=[
    {l:'Total Sessions',v:'38',s:'sessions',color:'var(--violet)'},
    {l:'Total Time',v:'6.4',s:'hours',color:'var(--teal)'},
    {l:'Current Streak',v:'14',s:'days',color:'var(--amber)'},
    {l:'Longest Streak',v:'21',s:'days',color:'var(--rose)'},
  ];
  const moodData=[3,4,2,4,5,3,4];
  const days=['M','T','W','T','F','S','S'];
  const recent=[
    {title:'Morning Clarity',date:'Today, 7:32 AM',dur:'10 min',g:SESSION_GRADIENTS.Meditation},
    {title:'Box Breathing',date:'Yesterday, 9:00 PM',dur:'5 min',g:SESSION_GRADIENTS.Breathing},
    {title:'Ocean Drift',date:'Friday, 10:15 PM',dur:'20 min',g:SESSION_GRADIENTS.Sleep},
  ];
  return (
    <div style={{paddingBottom:`calc(var(--bb) + 24px)`}}>
      <div style={{background:'linear-gradient(180deg,rgba(251,191,36,.05) 0%,transparent 100%)',borderBottom:'1px solid rgba(255,255,255,.06)',padding:`24px var(--pad)`}}>
        <h1 style={{fontFamily:'var(--font-d)',fontSize:'clamp(24px,3.5vw,38px)',fontWeight:400,color:'var(--text)',letterSpacing:.5}}>
          Your <span style={{background:'linear-gradient(135deg,var(--amber),var(--rose))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>progress</span>
        </h1>
      </div>
      <div className="container" style={{paddingTop:22,display:'flex',flexDirection:'column',gap:20}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',padding:`18px ${isMobile?16:22}px`,backdropFilter:'blur(16px)'}}>
              <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:2,color:s.color,marginBottom:8}}>{s.l}</div>
              <div style={{display:'flex',alignItems:'baseline',gap:5}}>
                <span style={{fontFamily:'var(--font-d)',fontSize:isMobile?32:40,fontWeight:400,lineHeight:1,background:`linear-gradient(135deg,${s.color},white)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{s.v}</span>
                <span style={{fontSize:12,color:'var(--muted)'}}>{s.s}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',padding:'20px',backdropFilter:'blur(16px)'}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2,color:'var(--violet)',marginBottom:4}}>Mood History</div>
          <div style={{fontSize:12,color:'var(--faint)',marginBottom:16}}>Last 7 days</div>
          <div style={{display:'flex',alignItems:'flex-end',gap:8,height:90}}>
            {moodData.map((v,i)=>(
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
                <div style={{width:'100%',borderRadius:'4px 4px 0 0',background:'linear-gradient(to top,var(--violet),var(--blue))',height:`${v/5*72}px`,boxShadow:'0 0 10px rgba(167,139,250,.25)',transition:'height .5s var(--ease)'}}/>
                <div style={{fontSize:8,color:'var(--faint)',fontWeight:700}}>{days[i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--teal)',marginBottom:12}}>Recent Sessions</div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {recent.map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',padding:'12px 14px',backdropFilter:'blur(12px)'}}>
                <div style={{width:40,height:40,borderRadius:'var(--r-sm)',background:s.g,flexShrink:0,boxShadow:'0 4px 12px rgba(0,0,0,.4)'}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:'var(--font-d)',fontSize:14,fontWeight:400,color:'var(--text)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.title}</div>
                  <div style={{fontSize:11,color:'var(--faint)',marginTop:2}}>{s.date}</div>
                </div>
                <div style={{fontSize:11,fontWeight:700,color:'var(--muted)',flexShrink:0}}>{s.dur}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PROFILE ──────────────────────────────────────────────────────────────
const ProfilePage = ({ onNavigate }) => {
  const isMobile = useIsMobile();
  const [sel,setSel]=React.useState(0);
  const grads=['linear-gradient(135deg,#7c3aed,#2dd4bf)','linear-gradient(135deg,#dc2626,#f9a8d4)','linear-gradient(135deg,#d97706,#fbbf24)','linear-gradient(135deg,#0284c7,#7dd3fc)','linear-gradient(135deg,#059669,#34d399)'];
  const goals=['Reduce stress','Improve sleep','Increase focus','Improve mood'];
  return (
    <div style={{paddingBottom:`calc(var(--bb) + 24px)`}}>
      <div style={{background:'linear-gradient(180deg,rgba(167,139,250,.1) 0%,rgba(45,212,191,.03) 100%)',borderBottom:'1px solid rgba(255,255,255,.06)',padding:`28px var(--pad) 32px`}}>
        <div style={{display:'flex',alignItems:'center',gap:18}}>
          <div style={{width:isMobile?60:72,height:isMobile?60:72,borderRadius:'50%',background:grads[sel],border:'2px solid rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:isMobile?22:26,fontWeight:700,color:'rgba(255,255,255,.9)',boxShadow:'0 0 28px rgba(167,139,250,.3)',fontFamily:'var(--font-d)',flexShrink:0}}>A</div>
          <div>
            <div style={{fontFamily:'var(--font-d)',fontSize:isMobile?20:24,fontWeight:400,color:'var(--text)',letterSpacing:.5}}>Ana</div>
            <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>Member since January 2026</div>
            <div style={{fontSize:13,color:'var(--amber)',marginTop:2,fontWeight:700}}>🔥 14-day streak</div>
          </div>
        </div>
      </div>
      <div className="container" style={{paddingTop:18,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',padding:'18px 20px',backdropFilter:'blur(16px)'}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--violet)',marginBottom:12}}>Choose Avatar</div>
          <div style={{display:'flex',gap:10}}>
            {grads.map((g,i)=>(
              <button key={i} onClick={()=>setSel(i)} style={{width:40,height:40,borderRadius:'50%',background:g,border:`2.5px solid ${sel===i?'rgba(167,139,250,.8)':'transparent'}`,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontFamily:'var(--font-d)',color:'rgba(255,255,255,.9)',fontWeight:700,boxShadow:sel===i?'0 0 18px rgba(167,139,250,.4)':'none',transition:'all 180ms'}}>A</button>
            ))}
          </div>
        </div>
        <div style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',padding:'18px 20px',backdropFilter:'blur(16px)'}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--teal)',marginBottom:12}}>Your Goals</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {goals.map((g,i)=>(
              <span key={i} style={{padding:'6px 14px',background:'rgba(45,212,191,.1)',border:'1px solid rgba(45,212,191,.25)',borderRadius:'var(--r-full)',fontSize:13,fontWeight:600,color:'#5eead4'}}>{g}</span>
            ))}
          </div>
        </div>
        <div style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'var(--r)',backdropFilter:'blur(16px)',overflow:'hidden'}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:2.5,color:'var(--faint)',padding:'14px 20px 8px'}}>Account</div>
          {['Language','Notifications','Dark Mode'].map((l,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'13px 20px',borderTop:'1px solid rgba(255,255,255,.05)'}}>
              <span style={{fontSize:14,color:'var(--text)',fontWeight:500}}>{l}</span>
              <span style={{fontSize:12,color:'var(--muted)'}}>{l==='Language'?'English':l==='Notifications'?'On':'On'}</span>
            </div>
          ))}
          <div style={{borderTop:'1px solid rgba(255,255,255,.05)',padding:'13px 20px'}}>
            <button onClick={()=>onNavigate('auth')} style={{fontSize:14,color:'#f87171',fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-b)'}}>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { HomePage, ExplorePage, LearnPage, ProgressPage, ProfilePage });

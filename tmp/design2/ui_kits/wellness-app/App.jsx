// App.jsx — Root shell with full routing (Midnight Bloom)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#a78bfa",
  "secondaryColor": "#2dd4bf",
  "bgColor": "#070d1a"
}/*EDITMODE-END*/;

const App = () => {
  const savedPage = localStorage.getItem('wp_page') || 'landing';
  const [page, setPage] = React.useState(savedPage);
  const [currentSession, setCurrentSession] = React.useState(null);
  const [miniPlayer, setMiniPlayer] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [showTweaks, setShowTweaks] = React.useState(false);

  const authedPages = ['home','explore','learn','progress','profile','player','breathing'];
  const inApp = authedPages.includes(page);

  const navigate = (p, data) => {
    if (p === 'player' && data) { setCurrentSession(data); setMiniPlayer(false); }
    if (p === 'home' && page === 'player') setMiniPlayer(true);
    localStorage.setItem('wp_page', p);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const playSession = (session) => {
    setCurrentSession(session);
    setMiniPlayer(false);
    setPage('player');
    localStorage.setItem('wp_page', 'player');
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const applyTweak = (key, val) => {
    const updated = { ...tweaks, [key]: val };
    setTweaks(updated);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  // Apply CSS overrides
  React.useEffect(() => {
    document.documentElement.style.setProperty('--violet', tweaks.accentColor);
    document.documentElement.style.setProperty('--teal', tweaks.secondaryColor);
    document.documentElement.style.setProperty('--bg', tweaks.bgColor);
  }, [tweaks]);

  const showNavbar = page !== 'auth' && page !== 'onboarding' && page !== 'player' && page !== 'breathing';
  const showBottomBar = inApp && page !== 'player' && page !== 'breathing';
  const bottomBarPages = ['home','explore','learn','progress','profile'];

  return (
    <div id="app-shell" style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Navbars */}
      {showNavbar && !inApp && page !== 'landing' && null}
      {page === 'landing' && <NavbarPublic onNavigate={navigate}/>}
      {inApp && showNavbar && <NavbarAuth page={page} onNavigate={navigate}/>}

      {/* Mini player */}
      {miniPlayer && currentSession && (
        <MiniPlayer
          session={currentSession}
          onExpand={() => navigate('player')}
          onClose={() => setMiniPlayer(false)}/>
      )}

      {/* Page content */}
      <div key={page} className="page-in">
        {page === 'landing'    && <LandingPage   onNavigate={navigate}/>}
        {page === 'auth'       && <AuthPage       onNavigate={navigate}/>}
        {page === 'onboarding' && <OnboardingPage onNavigate={navigate}/>}
        {page === 'home'       && <HomePage       onNavigate={navigate} onPlay={playSession}/>}
        {page === 'explore'    && <ExplorePage    onNavigate={navigate} onPlay={playSession}/>}
        {page === 'learn'      && <LearnPage      onNavigate={navigate}/>}
        {page === 'progress'   && <ProgressPage   onNavigate={navigate}/>}
        {page === 'profile'    && <ProfilePage    onNavigate={navigate}/>}
        {page === 'player'     && <PlayerPage     session={currentSession} onBack={()=>navigate('explore')} onNavigate={navigate}/>}
        {page === 'breathing'  && <BreathingPage  onBack={()=>navigate('home')} onNavigate={navigate}/>}
      </div>

      {/* Bottom bar */}
      {showBottomBar && bottomBarPages.includes(page) && (
        <BottomBar page={page} onNavigate={navigate}/>
      )}

      {/* Tweaks panel */}
      {showTweaks && (
        <div style={{
          position:'fixed', bottom: showBottomBar ? 'calc(var(--bb) + 12px)' : 20,
          right:16, zIndex:9999,
          background:'rgba(7,13,26,.96)', backdropFilter:'blur(24px)',
          border:'1px solid rgba(167,139,250,.25)', borderRadius:'var(--r-lg)',
          padding:'18px 20px',
          boxShadow:'0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(167,139,250,.12)',
          width:256, fontFamily:'var(--font-b)',
        }}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--violet)',marginBottom:16}}>Tweaks</div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'var(--faint)',marginBottom:8}}>Accent Color</div>
              <div style={{display:'flex',gap:8}}>
                {['#a78bfa','#2dd4bf','#f9a8d4','#fbbf24','#7c9fff','#34d399'].map(c=>(
                  <button key={c} onClick={()=>applyTweak('accentColor',c)} style={{
                    width:26,height:26,borderRadius:'50%',background:c,cursor:'pointer',
                    border:`2.5px solid ${tweaks.accentColor===c?'white':'transparent'}`,
                    boxShadow:`0 0 ${tweaks.accentColor===c?'10px':'0'} ${c}`,
                    transition:'all 150ms',
                  }}/>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'var(--faint)',marginBottom:8}}>Navigate to</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                {['landing','auth','onboarding','home','explore','learn','progress','profile','player','breathing'].map(p=>(
                  <button key={p} onClick={()=>navigate(p)} style={{
                    padding:'4px 8px',borderRadius:4,
                    border:`1px solid ${page===p?'rgba(167,139,250,.5)':'rgba(255,255,255,.1)'}`,
                    background:page===p?'rgba(167,139,250,.15)':'rgba(255,255,255,.04)',
                    fontSize:10,fontWeight:600,
                    color:page===p?'var(--violet)':'var(--muted)',
                    cursor:'pointer',textTransform:'capitalize',fontFamily:'var(--font-b)',
                    transition:'all 120ms',
                  }}>{p}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'var(--faint)',marginBottom:6}}>Quick actions</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                <button onClick={()=>playSession(window.SESSIONS_DATA?.[0])} style={{padding:'5px 10px',borderRadius:4,background:'rgba(45,212,191,.1)',border:'1px solid rgba(45,212,191,.2)',fontSize:10,fontWeight:700,color:'var(--teal)',cursor:'pointer',fontFamily:'var(--font-b)'}}>▶ Demo Player</button>
                <button onClick={()=>navigate('breathing')} style={{padding:'5px 10px',borderRadius:4,background:'rgba(167,139,250,.1)',border:'1px solid rgba(167,139,250,.2)',fontSize:10,fontWeight:700,color:'var(--violet)',cursor:'pointer',fontFamily:'var(--font-b)'}}>💨 Breathing</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

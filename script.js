// VaultView demo: fictional sample data only; no bank connections or real transfers.
const app = document.querySelector('#app');
const state = {
  page: 'Overview', filter: 'All activity', frozen: false, modal: '', notice: '',
  transactions: [
    {id:1, merchant:'Blue Bottle Coffee', category:'Food & drink', date:'Today, 10:42 AM', amount:-1520, place:'San Francisco, CA', icon:'☕', risk:'Low', reason:'Usual amount and location'},
    {id:2, merchant:'Whole Foods Market', category:'Groceries', date:'Today, 9:18 AM', amount:-8643, place:'San Francisco, CA', icon:'◈', risk:'Low', reason:'Familiar merchant'},
    {id:3, merchant:'Spotify Premium', category:'Subscriptions', date:'Yesterday, 8:00 PM', amount:-119, place:'Online', icon:'♫', risk:'Low', reason:'Recurring payment'},
    {id:4, merchant:'Northstar Electronics', category:'Electronics', date:'Yesterday, 6:34 PM', amount:-82000, place:'Bucharest, RO', icon:'⌁', risk:'Critical', reason:'High amount + unusual location'},
    {id:5, merchant:'City Transit', category:'Transport', date:'Nov 15, 1:06 PM', amount:-625, place:'San Francisco, CA', icon:'▤', risk:'Low', reason:'Usual travel pattern'},
    {id:6, merchant:'Aster Design Studio', category:'Income', date:'Nov 15, 9:30 AM', amount:24500, place:'Direct deposit', icon:'↙', risk:'Low', reason:'Verified deposit'}
  ]
};
const fmt = n => `${n < 0 ? '−' : '+'}₹${Math.abs(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render() {
  const alerts = state.transactions.filter(t => t.risk !== 'Low');
  const rows = state.transactions.filter(t => state.filter === 'All activity' || t.risk === state.filter);
  app.innerHTML = `
  <div class="app-shell">
    <aside class="sidebar"><a class="brand" href="#"><span class="brand-mark">V</span><span>vault<span class="brand-light">view</span></span></a><div class="workspace-label">WORKSPACE</div>
      <nav class="nav-list" aria-label="Main navigation">${[['Overview','◫'],['Transactions','↕'],['Cards','▣'],['Security center','◇']].map(([n,i])=>`<button class="nav-item ${state.page===n?'active':''}" data-page="${n}"><span class="nav-icon">${i}</span>${n}${n==='Security center'&&alerts.length?`<span class="nav-count">${alerts.length}</span>`:''}</button>`).join('')}</nav>
      <div class="sidebar-bottom"><div class="help-card"><span class="help-icon">✳</span><strong>Here for you</strong><p>Questions about your account?</p><button data-action="help">Visit help center <span>↗</span></button></div><button class="profile"><span class="avatar">JD</span><span class="profile-text"><strong>Jordan Davis</strong><small>Personal account</small></span><span class="more">···</span></button></div>
    </aside>
    <main class="main-area"><header class="topbar"><div class="crumb">Personal account <span>/</span> <strong>${esc(state.page)}</strong></div><div class="top-actions"><span class="secure-label"><i></i> Secure session</span><button class="icon-button" aria-label="Notifications" data-page="Security center">♧${alerts.length?'<b class="notification-dot"></b>':''}</button><span class="avatar small-avatar">JD</span></div></header>
    <div class="content"><div class="welcome-row"><div><div class="eyebrow">MONDAY, NOVEMBER 17, 2026</div><h1>${state.page==='Overview'?'Good morning, Jordan':esc(state.page)}</h1><p class="subheading">Here’s what’s happening with your money today.</p></div><button class="primary-button" data-action="transfer"><span>＋</span> New transfer</button></div>
      <section class="balance-grid" aria-label="Account summary"><article class="balance-card primary-balance"><div class="card-top"><span>Total balance</span><button class="dots" aria-label="Balance options">···</button></div><div class="balance-value">₹1,24,580<span>.80</span></div><div class="balance-foot"><span class="trend">↗ 2.4%</span><span>vs. last month</span><span class="balance-divider"></span><span>Across 2 accounts</span></div><div class="balance-decoration"></div></article>
      <article class="balance-card"><div class="card-top"><span>Checking account</span><span class="account-icon checking">⌂</span></div><div class="balance-value small-balance">₹82,408<span>.80</span></div><div class="account-number">•••• 4829 <span class="account-status"><i></i> Active</span></div></article>
      <article class="balance-card"><div class="card-top"><span>Savings account</span><span class="account-icon savings">↗</span></div><div class="balance-value small-balance">₹42,172<span>.00</span></div><div class="account-number">•••• 9012 <span class="interest">4.25% APY</span></div></article></section>
      <section class="lower-grid"><div class="panel transactions-panel"><div class="panel-heading"><div><h2>${state.page==='Security center'?'Risk review':'Recent activity'}</h2><p>Your latest account transactions</p></div><button class="text-button" data-page="Transactions">View all <span>→</span></button></div>
        <div class="filter-row">${['All activity','Low','Moderate','Critical'].map(f=>`<button class="filter-chip ${state.filter===f?'selected':''}" data-filter="${f}">${f}${f==='Critical'&&alerts.some(a=>a.risk==='Critical')?`<span class="chip-count">${alerts.filter(a=>a.risk==='Critical').length}</span>`:''}</button>`).join('')}</div>
        <div class="transaction-table"><div class="table-head"><span>TRANSACTION</span><span>DATE</span><span>RISK</span><span class="align-right">AMOUNT</span></div>${rows.map(t=>`<div class="transaction-row"><div class="merchant-cell"><span class="merchant-icon ${t.category==='Income'?'income-icon':''}">${t.icon}</span><span class="merchant-copy"><strong>${esc(t.merchant)}</strong><small>${esc(t.category)} · ${esc(t.place)}</small></span></div><span class="date-cell">${esc(t.date)}</span><span><span class="risk-pill ${t.risk.toLowerCase()}"><i></i>${t.risk}</span></span><span class="amount-cell ${t.amount>0?'positive':''}">${fmt(t.amount)}</span><button class="row-dispute" data-review="${t.id}" aria-label="Review ${esc(t.merchant)}">···</button></div>`).join('')||'<div class="empty-state">No transactions at this risk level.</div>'}</div></div>
        <aside class="right-column"><section class="panel alert-panel"><div class="panel-heading compact"><div><h2>Security center</h2><p>We’re keeping an eye out</p></div><span class="shield">◇</span></div>${alerts.length?`<div class="alert-list">${alerts.slice(0,2).map(t=>`<div class="alert-item"><span class="alert-symbol">!</span><div><strong>${t.risk} risk activity</strong><p>${esc(t.merchant)} · ${esc(t.reason)}</p><button data-review="${t.id}">Review transaction <span>→</span></button></div></div>`).join('')}</div>`:'<div class="all-clear"><span>✓</span><div><strong>All clear</strong><p>No unusual activity detected.</p></div></div>'}<button class="security-link" data-page="Security center">Open security center <span>→</span></button></section>
        <section class="card-widget"><div class="widget-top"><span>YOUR CARD</span><span class="visa">VISA</span></div><div class="chip">▦</div><div class="card-digits">•••• &nbsp;•••• &nbsp;•••• &nbsp;4829</div><div class="card-widget-bottom"><span>JORDAN DAVIS</span><span>09/28</span></div><div class="card-widget-shine"></div><div class="freeze-control"><span><strong>${state.frozen?'Card frozen':'Card controls'}</strong><small>${state.frozen?'Payments are paused':'Lock your card instantly'}</small></span><button class="toggle ${state.frozen?'on':''}" aria-label="${state.frozen?'Unfreeze card':'Freeze card'}" data-action="freeze"><i></i></button></div></section></aside></section>
      <footer class="footer"><span>© 2026 VaultView Financial</span><span><i class="demo-dot"></i> Demo environment · Sample data only</span><span>Privacy&nbsp; · &nbsp;Help</span></footer>
    </div></main>
    ${state.modal==='transfer'?`<div class="modal-backdrop" data-close><form class="modal" id="transfer-form"><button type="button" class="modal-close" data-action="close">×</button><div class="modal-kicker">DEMO TRANSFER</div><h2>Send money</h2><p class="modal-description">Create a simulated transaction and see how VaultView responds.</p><label>Recipient<input name="recipient" required placeholder="Name or merchant" /></label><label>Amount (INR)<div class="amount-input"><span>₹</span><input name="amount" required type="number" min="0.01" step="0.01" placeholder="0.00" /></div></label><label class="check-label"><input name="foreign" type="checkbox" /> Simulate an unfamiliar international location</label><button class="primary-button submit-button" type="submit">Review demo transfer <span>→</span></button><div class="modal-note">Transfers are simulated and do not move real money.</div></form></div>`:''}
    ${state.modal==='review'?`<div class="modal-backdrop" data-close><section class="modal"><button class="modal-close" data-action="close">×</button><div class="modal-kicker">TRANSACTION REVIEW</div><h2>${state.review?.risk||''} risk activity</h2><p class="modal-description"><strong>${esc(state.review?.merchant||'')}</strong><br />${state.review?fmt(state.review.amount):''} · ${esc(state.review?.date||'')}<br />${esc(state.review?.reason||'')}</p><div class="review-note">This is a demo workflow. No actual dispute will be submitted.</div><div class="modal-actions"><button class="secondary-button" data-action="dismiss">Dismiss alert</button><button class="primary-button" data-action="dispute">Start a dispute</button></div></section></div>`:''}
    ${state.notice?`<div class="toast" role="status"><span>✓</span>${esc(state.notice)}</div>`:''}
  </div>`;
}
function notify(message){state.notice=message;render();setTimeout(()=>{state.notice='';render()},3000)}
app.addEventListener('click',e=>{
 const el=e.target.closest('button'); if(!el)return;
 if(el.dataset.page){state.page=el.dataset.page;render();return}
 if(el.dataset.filter){state.filter=el.dataset.filter;render();return}
 if(el.dataset.review){state.review=state.transactions.find(t=>t.id===Number(el.dataset.review));state.modal='review';render();return}
 if(el.dataset.action==='transfer'){state.modal='transfer';render();return}
 if(el.dataset.action==='close'||e.target.hasAttribute('data-close')){state.modal='';render();return}
 if(el.dataset.action==='freeze'){state.frozen=!state.frozen;render();notify(state.frozen?'Card frozen':'Card unlocked');return}
 if(el.dataset.action==='dismiss'){state.transactions=state.transactions.filter(t=>t.id!==state.review?.id);state.modal='';render();notify('Alert dismissed from the demo feed');return}
 if(el.dataset.action==='dispute'){state.modal='';render();notify('Demo dispute noted for review');return}
 if(el.dataset.action==='help')notify('A support specialist will be with you shortly.');
});
app.addEventListener('submit',e=>{
 if(e.target.id!=='transfer-form')return;e.preventDefault();const data=new FormData(e.target);const amount=Number(data.get('amount'));const foreign=data.get('foreign')==='on';const risk=amount>=50000||foreign?'Critical':amount>=1000?'Moderate':'Low';
 state.transactions.unshift({id:Date.now(),merchant:String(data.get('recipient')).trim(),category:'Transfer',date:'Just now',amount:-amount,place:foreign?'International':'Online',icon:'↗',risk,reason:risk==='Critical'?(foreign?'Unfamiliar destination':'Unusually high amount'):'Simulated transfer'});state.modal='';state.page='Overview';state.filter='All activity';render();notify(risk==='Critical'?'Critical risk detected. Review the new alert.':'Demo transfer added to activity.');
});
render();


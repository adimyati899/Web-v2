const root=document.documentElement;
const canvas=document.getElementById('ambient');
const ctx=canvas.getContext('2d',{alpha:true});
let W=0,H=0,dpr=Math.min(devicePixelRatio||1,1.6);
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
let mx=.5,my=.35,px=.5,py=.35;
function resize(){W=innerWidth;H=innerHeight;canvas.width=Math.floor(W*dpr);canvas.height=Math.floor(H*dpr);canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
resize();addEventListener('resize',resize,{passive:true});
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth;my=e.clientY/innerHeight});
const dots=Array.from({length:Math.min(90,Math.max(36,Math.floor(innerWidth/18)))},(_,i)=>({x:Math.random(),y:Math.random(),r:Math.random()*1.7+.4,s:Math.random()*.2+.05,p:Math.random()*Math.PI*2}));
function ambient(t){
  px+=(mx-px)*.035; py+=(my-py)*.035;
  ctx.clearRect(0,0,W,H);
  const g1=ctx.createRadialGradient(W*(.78+(.5-px)*.08),H*(.14+(.5-py)*.06),0,W*.78,H*.14,Math.max(W,H)*.45);
  g1.addColorStop(0,'rgba(118,89,255,.12)');g1.addColorStop(1,'rgba(118,89,255,0)');ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);
  const g2=ctx.createRadialGradient(W*(.16+(.5-px)*.05),H*(.74+(.5-py)*.08),0,W*.16,H*.74,Math.max(W,H)*.3);
  g2.addColorStop(0,'rgba(93,231,255,.055)');g2.addColorStop(1,'rgba(93,231,255,0)');ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);
  if(!reduce){
    dots.forEach(d=>{d.y+=d.s*0.0006;if(d.y>1.03)d.y=-.03;const x=d.x*W+(px-.5)*18,y=d.y*H+(py-.5)*12,alpha=.18+.12*Math.sin(t*.001+d.p);ctx.beginPath();ctx.arc(x,y,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,255,50,${alpha})`;ctx.fill()});
  }
  requestAnimationFrame(ambient);
}
requestAnimationFrame(ambient);

document.querySelectorAll('.reveal').forEach((el,i)=>el.style.transitionDelay=Math.min(i%7*45,240)+'ms');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-line i').style.width=(max>0?scrollY/max*100:0)+'%'},{passive:true});

if(fine&&!reduce){
 document.querySelectorAll('[data-tilt]').forEach(el=>{
  el.addEventListener('pointermove',e=>{const q=el.getBoundingClientRect();const x=e.clientX-q.left,qy=e.clientY-q.top;const rx=(.5-qy/q.height)*6,ry=(x/q.width-.5)*8;el.style.transform=`perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`});
  el.addEventListener('pointerleave',()=>el.style.transform='');
 });
 document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const q=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-q.left-q.width/2)*.06}px,${(e.clientY-q.top-q.height/2)*.06}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
}

// Vertical 9:16 showcase: only TWO video elements ever exist, preventing stacking/overlay bugs.
const verticalItems=[
 {src:'assets/videos/v4.mp4',meta:'AI VISUAL EXPERIMENT',title:'Motion in the City.'},
 {src:'assets/videos/v5.mp4',meta:'GIMI CAMPAIGN',title:'Wear the Idea.'},
 {src:'assets/videos/v6.mp4',meta:'VEED CREATOR WORK',title:'Designed to Move.'},
 {src:'assets/videos/v7.mp4',meta:'AI VISUAL EXPERIMENT',title:'One Image. Four Worlds.'},
 {src:'assets/videos/v9.mp4',meta:'GIMI CAMPAIGN',title:'Dinner After Dark.'},
 {src:'assets/videos/v10.mp4',meta:'AI FILM',title:'The Blue Dragon.'}
];
const vA=document.getElementById('vA'),vB=document.getElementById('vB'),vCounter=document.getElementById('verticalCounter'),vLabel=document.getElementById('verticalLabel'),vMeta=document.getElementById('verticalMeta'),vTitle=document.getElementById('verticalTitle'),soundBtn=document.getElementById('soundBtn'),verticalScroll=document.getElementById('verticalScroll');
let vActive=vA,vNext=vB,vIndex=-1,vMuted=true,vBusy=false;
function setText(i){const item=verticalItems[i];vCounter.textContent=String(i+1).padStart(2,'0')+' / '+String(verticalItems.length).padStart(2,'0');vLabel.textContent=item.meta;vMeta.textContent=item.meta;vTitle.textContent=item.title}
async function swapVertical(i){if(i===vIndex||vBusy||i<0||i>=verticalItems.length)return;vBusy=true;const item=verticalItems[i];vNext.src=item.src;vNext.muted=vMuted;vNext.currentTime=0;vNext.classList.remove('active','out');try{await vNext.play()}catch(_){ }vActive.classList.add('out');requestAnimationFrame(()=>vNext.classList.add('active'));setText(i);setTimeout(()=>{vActive.pause();vActive.removeAttribute('src');vActive.load();[vActive,vNext]=[vNext,vActive];vBusy=false},700);vIndex=i}
setText(0);swapVertical(0);
const vObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const rect=verticalScroll.getBoundingClientRect();const progress=Math.min(0.999,Math.max(0,(innerHeight*.42-rect.top)/Math.max(1,verticalScroll.offsetHeight-innerHeight*.55)));const idx=Math.min(verticalItems.length-1,Math.floor(progress*verticalItems.length));swapVertical(idx)}else if(e.boundingClientRect.top>innerHeight){vActive.pause();vNext.pause()}}),{threshold:[.2,.5,.8]});vObserver.observe(verticalScroll);
let lastV=-1;addEventListener('scroll',()=>{const r=verticalScroll.getBoundingClientRect();const denom=Math.max(1,verticalScroll.offsetHeight-innerHeight*.55);const progress=Math.min(.999,Math.max(0,(innerHeight*.42-r.top)/denom));const idx=Math.min(verticalItems.length-1,Math.floor(progress*verticalItems.length));if(idx!==lastV){lastV=idx;swapVertical(idx)}},{passive:true});
soundBtn.addEventListener('click',()=>{vMuted=!vMuted;vActive.muted=vMuted;vNext.muted=vMuted;soundBtn.classList.toggle('on',!vMuted);soundBtn.textContent=vMuted?'◒':'◉'});

// Widescreen 16:9 carousel: one video in one window, drag/swipe to change.
const wideItems=[
 {src:'assets/videos/h1.mp4',meta:'AI FILM',title:'Launch Sequence.'},
 {src:'assets/videos/h2.mp4',meta:'AI VISUAL',title:'Through the Frame.'},
 {src:'assets/videos/h3.mp4',meta:'AI VISUAL',title:'Godzilla × Kratos.'},
 {src:'assets/videos/h4.mp4',meta:'POLLO AI',title:'A World Beneath.'},
 {src:'assets/videos/h5.mp4',meta:'CREATIVE FILM',title:'The Next Frame.'},
 {src:'assets/videos/h6.mp4',meta:'POLLO AI',title:'Cinematic Motion.'},
 {src:'assets/videos/h7.mp4',meta:'CREATIVE FILM',title:'A Story in Motion.'}
];
const wideVideo=document.getElementById('wideVideo'),wideTitle=document.getElementById('wideTitle'),wideMeta=document.getElementById('wideMeta'),wideDots=document.getElementById('wideDots');let wIndex=0;
wideItems.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.className=i===0?'active':'';b.addEventListener('click',()=>setWide(i));wideDots.appendChild(b)});
function setWide(i){wIndex=(i+wideItems.length)%wideItems.length;const it=wideItems[wIndex];wideVideo.style.opacity='0';setTimeout(()=>{wideVideo.src=it.src;wideMeta.textContent=it.meta;wideTitle.textContent=it.title;wideVideo.load();wideVideo.play().catch(()=>{});wideVideo.style.opacity='1'},160);[...wideDots.children].forEach((d,n)=>d.classList.toggle('active',n===wIndex))}
setWide(0);document.getElementById('widePrev').addEventListener('click',()=>setWide(wIndex-1));document.getElementById('wideNext').addEventListener('click',()=>setWide(wIndex+1));
let sx=0,sy=0;document.getElementById('wideCarousel').addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;wideVideo.setPointerCapture?.(e.pointerId)});document.getElementById('wideCarousel').addEventListener('pointerup',e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.2)setWide(wIndex+(dx<0?1:-1))});

// Keep all ecosystem logos in consistent circular glass containers.
document.querySelectorAll('.logo-disc img').forEach(img=>{img.addEventListener('error',()=>{const t=document.createElement('span');t.textContent=(img.alt||'?').slice(0,1).toUpperCase();t.style.cssText='font:700 18px Space Grotesk;color:#e9ece9';img.replaceWith(t)},{once:true})});

// Pause videos off-screen for mobile performance.
const mediaObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.target===wideVideo)return;if(!e.isIntersecting)e.target.pause()}),{threshold:.05});document.querySelectorAll('video').forEach(v=>{v.muted=true;v.playsInline=true;if(v!==wideVideo&&!v.classList.contains('v-layer'))mediaObserver.observe(v)});

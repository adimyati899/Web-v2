const vertical = [
  ['v1.mp4','Atmosphere in Motion','AI Visual Experiment'],
  ['v2.mp4','The Night Has a Secret','AI Storytelling'],
  ['v3.mp4','Every Choice Creates a Story','Creative Experiment'],
  ['v4.mp4','Built for the Next Frame','Creator Campaign'],
  ['v5.mp4','Wear the Idea','GIMI Campaign'],
  ['v6.mp4','AI, Made Social','VEED Campaign'],
  ['v7.mp4','One Image. Four Worlds.','AI Visual Experiment'],
  ['v8.mp4','Locked In','Cinematic Short'],
  ['v9.mp4','Dinner After Dark','GIMI Campaign'],
  ['v10.mp4','The Blue Dragon','AI Film']
];
const horizontal = [
  ['h1.mp4','Launch Sequence','AI Film · 16:9'],
  ['h2.mp4','From Stills to Cinema','Visual Experiment · 16:9'],
  ['h3.mp4','Godzilla × Kratos','Pollo AI · 16:9'],
  ['h4.mp4','ViktorPower','AI Film · 16:9'],
  ['h5.mp4','Dark Fantasy','AI Video · 16:9'],
  ['h6.mp4','The Impossible Shot','AI Cinematic · 16:9'],
  ['h7_compressed_20mb.mp4','Luxury Motion','AI Cinematic · 16:9']
];

const groups = {
  social: [
    ['Instagram','Social / Creator','https://www.instagram.com/','instagram'],
    ['TikTok','Short-form video','https://www.tiktok.com/@gokuret777','tiktok'],
    ['X','Creator network','https://x.com/PredatorCuan','x']
  ],
  campaigns: [
    ['GIMI','Creator campaigns','https://www.gimi.co/','gimi'],
    ['VEED','Creator campaigns','https://www.veed.io/','veed'],
    ['Pollo AI','Creator profile','https://pollo.ai/profile/pubgkorea109983','pollo']
  ],
  tools: [
    ['Midjourney','AI image generation','https://www.midjourney.com/','midjourney'],
    ['InVideo','AI video creation','https://ai.invideo.io/','invideo'],
    ['CapCut','Video editing','https://www.capcut.com/','capcut'],
    ['PixelDojo','AI visual creation','https://pixeldojo.ai/','pixeldojo'],
    ['Midnight','Web3 ecosystem','https://midnight.network/','midnight']
  ]
};

const $ = (s,p=document)=>p.querySelector(s);
const $$ = (s,p=document)=>[...p.querySelectorAll(s)];
const allVideos=[];

function stopAll(except=null){
  allVideos.forEach(({v,button})=>{
    if(v!==except){
      v.pause();
      if(button){button.classList.remove('active'); button.textContent='▶';}
    }
  });
}
function wireVideo(v, button){
  allVideos.push({v,button});
  v.muted=false;
  button.addEventListener('click',e=>{
    e.stopPropagation();
    if(v.paused){ stopAll(v); v.play().then(()=>{button.textContent='❚❚';}).catch(()=>{}); }
    else { v.pause(); button.textContent='▶'; }
  });
  v.addEventListener('play',()=>{ stopAll(v); button.textContent='❚❚'; });
  v.addEventListener('pause',()=>{ button.textContent='▶'; });
  v.addEventListener('ended',()=>{ button.textContent='▶'; });
  v.addEventListener('error',()=>v.closest('.media-card')?.classList.add('media-error'));
}
function makeVertical(item,i){
  const host=$('#verticalCarousel'); if(!host)return;
  const el=document.createElement('article');
  el.className='media-card v-work-card reveal';
  el.innerHTML=`<div class="media-frame"><video src="${item[0]}" loop playsinline preload="metadata"></video><button class="media-play" aria-label="Play video">▶</button><div class="media-shine"></div></div><div class="media-copy"><small>${item[2]}</small><h3>${item[1]}</h3><p>${descriptionFor(item[1],item[2])}</p></div>`;
  host.appendChild(el);
  const v=$('video',el),b=$('.media-play',el); wireVideo(v,b);
}
function makeHorizontal(item){
  const host=$('#carousel'); if(!host)return;
  const el=document.createElement('article');
  el.className='h-card reveal';
  el.innerHTML=`<div class="media-frame"><video src="${item[0]}" loop playsinline preload="metadata"></video><button class="media-play" aria-label="Play video">▶</button><div class="media-shine"></div></div><div class="h-info"><div><h3>${item[1]}</h3><small>${item[2]}</small><p>${descriptionFor(item[1],item[2])}</p></div></div>`;
  host.appendChild(el);
  const v=$('video',el),b=$('.media-play',el); wireVideo(v,b);
}
function descriptionFor(title, meta){
  const map={
    'Atmosphere in Motion':'A cinematic visual study built around atmosphere, movement and AI-generated imagery.',
    'The Night Has a Secret':'A short-form visual story designed around mood, pacing and cinematic AI scenes.',
    'Every Choice Creates a Story':'A creative experiment exploring how a simple concept can become a moving narrative.',
    'Built for the Next Frame':'Campaign-oriented creator content shaped for social attention and fast visual impact.',
    'Wear the Idea':'A GIMI campaign piece translating a brand idea into a compact social-first visual.',
    'AI, Made Social':'A VEED campaign piece focused on AI video, motion and creator-friendly storytelling.',
    'One Image. Four Worlds.':'A visual experiment testing multiple worlds from a single creative starting point.',
    'Locked In':'A cinematic short built around tension, framing and a strong visual hook.',
    'Dinner After Dark':'A GIMI campaign visual combining atmosphere, character and short-form storytelling.',
    'The Blue Dragon':'An AI film experiment focused on cinematic creature design and world-building.',
    'Launch Sequence':'A wide-format cinematic sequence built around a strong opening and controlled motion.',
    'From Stills to Cinema':'A visual experiment turning still concepts into a continuous cinematic sequence.',
    'Godzilla × Kratos':'A character-driven AI film experiment created for Pollo AI.',
    'ViktorPower':'A cinematic AI character piece with a strong campaign-style visual treatment.',
    'Dark Fantasy':'A wide-format AI visual exploring darker cinematic environments and composition.',
    'The Impossible Shot':'A cinematic experiment built around a single impossible visual moment.',
    'Luxury Motion':'A polished AI cinematic focused on premium motion, lighting and visual texture.'
  };
  return map[title] || `A ${meta.toLowerCase()} piece developed as part of my AI creative workflow.`;
}

function makeLogo(item){
  const [name,role,href,brand]=item;
  const el=document.createElement('a');
  el.className='logo-item glass reveal tilt3d';
  el.href=href; el.target='_blank'; el.rel='noopener noreferrer';
  const icon = brand==='gimi'
    ? '<span class="brand-glyph brand-gimi" aria-hidden="true">GIMI</span>'
    : `<img src="https://cdn.simpleicons.org/${brand}/ffffff" alt="" aria-hidden="true" loading="lazy" referrerpolicy="no-referrer">`;
  el.innerHTML=`<span class="logo-left"><span class="logo-box brand-${brand}">${icon}</span><span class="logo-copy"><span class="logo-name">${name}</span><span class="logo-role">${role}</span></span></span><span class="logo-arrow">↗</span>`;
  const img=$('img',el);
  if(img){
    img.addEventListener('error',()=>{
      img.remove();
      const fallback=document.createElement('span');
      fallback.className='brand-glyph';
      fallback.textContent=name==='X'?'X':name==='TikTok'?'TK':name==='Instagram'?'IG':name==='VEED'?'V':name==='Pollo AI'?'P':name==='Midjourney'?'MJ':name==='InVideo'?'IV':name==='CapCut'?'CC':name==='PixelDojo'?'PD':name==='Midnight'?'M':'AI';
      el.querySelector('.logo-box').appendChild(fallback);
    });
  }
  return el;
}
function renderGroup(id,data){
  const host=$(`#${id}`); if(!host)return;
  data.forEach(item=>host.appendChild(makeLogo(item)));
}

if(document.body.dataset.page==='home'){
  renderGroup('socialStack',groups.social);
  renderGroup('campaignStack',groups.campaigns);
  renderGroup('toolsStack',groups.tools);
  const orb=$('#gimiOrb');
  if(orb && matchMedia('(pointer:fine)').matches){
    orb.addEventListener('mousemove',e=>{const r=orb.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;orb.style.setProperty('--rx',`${(-y*10).toFixed(2)}deg`);orb.style.setProperty('--ry',`${(x*12).toFixed(2)}deg`);orb.style.setProperty('--lift','-6px');});
    orb.addEventListener('mouseleave',()=>{orb.style.setProperty('--rx','0deg');orb.style.setProperty('--ry','0deg');orb.style.setProperty('--lift','0');});
  }
}
if(document.body.dataset.page==='work'){
  vertical.forEach(makeVertical); horizontal.forEach(makeHorizontal);
  const carousel=$('#carousel');
  if(carousel){
    $('.prev')?.addEventListener('click',()=>carousel.scrollBy({left:-Math.min(carousel.clientWidth*.92,900),behavior:'smooth'}));
    $('.next')?.addEventListener('click',()=>carousel.scrollBy({left:Math.min(carousel.clientWidth*.92,900),behavior:'smooth'}));
    let drag=false,startX=0,startScroll=0;
    carousel.addEventListener('pointerdown',e=>{drag=true;startX=e.clientX;startScroll=carousel.scrollLeft;carousel.setPointerCapture(e.pointerId);carousel.style.cursor='grabbing';});
    carousel.addEventListener('pointermove',e=>{if(drag)carousel.scrollLeft=startScroll-(e.clientX-startX)*1.1;});
    ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>carousel.addEventListener(ev,()=>{drag=false;carousel.style.cursor='grab';}));
  }
}

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
$$('.reveal').forEach(el=>revealObserver.observe(el));

if(matchMedia('(pointer:fine)').matches){
  $$('.tilt3d').forEach(el=>{el.addEventListener('mousemove',e=>{if(el.id==='gimiOrb')return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1100px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-4px)`;});el.addEventListener('mouseleave',()=>{if(el.id!=='gimiOrb')el.style.transform='';});});
  $$('.magnetic').forEach(el=>el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${((e.clientX-r.left-r.width/2)*.06).toFixed(1)}px,${((e.clientY-r.top-r.height/2)*.06).toFixed(1)}px)`;}));
  $$('.magnetic').forEach(el=>el.addEventListener('mouseleave',()=>el.style.transform=''));
}
const progress=$('.scroll-progress');
let scrollTick=false;
window.addEventListener('scroll',()=>{
  if(scrollTick)return;
  scrollTick=true;
  requestAnimationFrame(()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress)progress.style.width=(max>0?scrollY/max*100:0)+'%';
    scrollTick=false;
  });
},{passive:true});

// Prevent layout re-anchoring from making mobile scrolling jump.
if('scrollRestoration' in history) history.scrollRestoration='manual';

// Same-page navigation only. Never rewrite the URL while the user is scrolling.
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=$(a.getAttribute('href'));
  if(target){
    e.preventDefault();
    const top=target.getBoundingClientRect().top+window.scrollY-92;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
  }
}));

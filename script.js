const vertical=[
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

const horizontal=[
 ['h1.mp4','Launch Sequence','AI Film · 16:9'],
 ['h2.mp4','From Stills to Cinema','Visual Experiment · 16:9'],
 ['h3.mp4','Godzilla × Kratos','Pollo AI · 16:9'],
 ['h4.mp4','ViktorPower','AI Film · 16:9'],
 ['h5.mp4','Dark Fantasy','AI Video · 16:9'],
 ['h6.mp4','The Impossible Shot','AI Cinematic · 16:9'],
 ['h7.mp4','Luxury Motion','AI Cinematic · 16:9']
];

const logoData=[
 ['Instagram','https://www.instagram.com/','https://www.instagram.com/favicon.ico','IG','instagram.com'],
 ['TikTok','https://www.tiktok.com/','https://www.tiktok.com/favicon.ico','TK','tiktok.com'],
 ['X','https://x.com/','https://x.com/favicon.ico','X','x.com'],
 ['GIMI','https://www.gimi.co/','https://www.gimi.co/favicon.ico','G','gimi.co'],
 ['VEED','https://www.veed.io/','https://www.veed.io/favicon.ico','V','veed.io'],
 ['Pollo AI','https://pollo.ai/','https://pollo.ai/favicon.ico','P','pollo.ai'],
 ['Midnight','https://midnight.network/','https://midnight.network/favicon.ico','M','midnight.network'],
 ['InVideo','https://invideo.io/','https://invideo.io/favicon.ico','IV','invideo.io'],
 ['CapCut','https://www.capcut.com/','https://www.capcut.com/favicon.ico','C','capcut.com'],
 ['PixelDojo','https://pixeldojo.ai/','https://pixeldojo.ai/favicon.ico','PD','pixeldojo.ai']
];

const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const verticalStage=$('#verticalStage');
const carousel=$('#carousel');
const logoStack=$('#logoStack');
const allVideos=[];
let activeVertical=null;

function setButton(button, video){
  if(!button)return;
  if(video.paused){
    button.textContent='▶';
    button.classList.remove('active');
    button.setAttribute('aria-label','Play video');
  }else if(video.muted){
    button.textContent='🔇';
    button.classList.remove('active');
    button.setAttribute('aria-label','Turn sound on');
  }else{
    button.textContent='🔊';
    button.classList.add('active');
    button.setAttribute('aria-label','Turn sound off');
  }
}

function stopAll(except=null){
  allVideos.forEach(({v,button,card})=>{
    if(v!==except){
      v.pause();
      v.muted=true;
      card.classList.remove('is-active');
      setButton(button,v);
    }
  });
}

function playVideo(state, allowSound=false){
  const {v,card,button}=state;
  stopAll(v);
  v.muted=!allowSound;
  v.play().then(()=>{
    card.classList.add('is-active');
    setButton(button,v);
  }).catch(()=>setButton(button,v));
}

function makeVertical(item,i){
  const el=document.createElement('article');
  el.className='v-card reveal';
  el.dataset.index=i;
  el.innerHTML=`
    <video src="${item[0]}" muted loop playsinline preload="metadata" disablepictureinpicture></video>
    <button type="button" class="sound" aria-label="Play video" title="Play / sound">▶</button>
    <div class="v-info"><small>${item[2]}</small><h3>${item[1]}</h3></div>`;
  verticalStage.appendChild(el);
  const v=$('video',el), b=$('.sound',el);
  const state={v,card:el,button:b,type:'vertical'};
  allVideos.push(state);
  v.addEventListener('play',()=>setButton(b,v));
  v.addEventListener('pause',()=>setButton(b,v));
  b.addEventListener('click',e=>{
    e.preventDefault();e.stopPropagation();
    if(v.paused) playVideo(state,false);
    else { v.muted=!v.muted; setButton(b,v); }
  });
  v.addEventListener('click',e=>{
    e.preventDefault();e.stopPropagation();
    if(v.paused) playVideo(state,false);
    else { v.muted=!v.muted; setButton(b,v); }
  });
  v.addEventListener('error',()=>el.classList.add('media-error'));
  setButton(b,v);
}
vertical.forEach(makeVertical);

function makeHorizontal(item){
  const el=document.createElement('article');
  el.className='h-card reveal';
  el.innerHTML=`
    <video src="${item[0]}" muted loop playsinline preload="metadata" disablepictureinpicture></video>
    <div class="h-info">
      <div><h3>${item[1]}</h3><small>${item[2]}</small></div>
      <button type="button" class="h-sound" aria-label="Play video" title="Play / sound">▶</button>
    </div>`;
  carousel.appendChild(el);
  const v=$('video',el), b=$('.h-sound',el);
  const state={v,card:el,button:b,type:'horizontal'};
  allVideos.push(state);
  v.addEventListener('play',()=>setButton(b,v));
  v.addEventListener('pause',()=>setButton(b,v));
  b.addEventListener('click',e=>{
    e.preventDefault();e.stopPropagation();
    if(v.paused) playVideo(state,false);
    else { v.muted=!v.muted; setButton(b,v); }
  });
  v.addEventListener('click',e=>{
    e.preventDefault();e.stopPropagation();
    if(v.paused) playVideo(state,false);
    else { v.muted=!v.muted; setButton(b,v); }
  });
  v.addEventListener('error',()=>el.classList.add('media-error'));
  setButton(b,v);
}
horizontal.forEach(makeHorizontal);

logoData.forEach(([name,href,src,fallback,domain])=>{
  const el=document.createElement('a');
  el.className='logo-item glass reveal tilt3d';
  el.href=href;
  el.target='_blank';
  el.rel='noopener noreferrer';
  const proxy=`https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  el.innerHTML=`
    <span class="logo-left">
      <span class="logo-box">
        <img src="${src}" alt="${name} logo" loading="lazy" referrerpolicy="no-referrer">
        <span class="logo-fallback" hidden>${fallback}</span>
      </span>
      <span class="logo-name">${name}</span>
    </span>
    <span class="logo-arrow">↗</span>`;
  const img=$('img',el), fallbackEl=$('.logo-fallback',el);
  img.addEventListener('error',()=>{
    if(img.dataset.proxyTried!=='1'){
      img.dataset.proxyTried='1';
      img.src=proxy;
    }else{
      img.style.display='none';
      fallbackEl.hidden=false;
    }
  });
  logoStack.appendChild(el);
});

const prev=$('.prev'), next=$('.next');
prev?.addEventListener('click',e=>{
  e.preventDefault();
  carousel.scrollBy({left:-Math.min(carousel.clientWidth*.92,900),behavior:'smooth'});
});
next?.addEventListener('click',e=>{
  e.preventDefault();
  carousel.scrollBy({left:Math.min(carousel.clientWidth*.92,900),behavior:'smooth'});
});

let drag=false,startX=0,startScroll=0;
carousel.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'){
    drag=true;startX=e.clientX;startScroll=carousel.scrollLeft;
    carousel.setPointerCapture(e.pointerId);
    carousel.style.cursor='grabbing';
  }
});
carousel.addEventListener('pointermove',e=>{
  if(drag) carousel.scrollLeft=startScroll-(e.clientX-startX)*1.08;
});
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>carousel.addEventListener(ev,()=>{
  drag=false;carousel.style.cursor='grab';
}));

/* Vertical carousel: one card becomes active at a time. It starts muted for
   browser autoplay compatibility. Tap the speaker to restore audio. */
const verticalObserver=new IntersectionObserver(entries=>{
  let best=null;
  entries.forEach(entry=>{
    if(entry.isIntersecting && entry.intersectionRatio>.55){
      best=entry.target;
    }
  });
  if(best && best!==activeVertical){
    activeVertical=best;
    const state=allVideos.find(x=>x.card===best);
    if(state) playVideo(state,false);
  }
},{root:verticalStage,threshold:[.55,.75,.9]});
$$('.v-card').forEach(card=>verticalObserver.observe(card));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.06});
$$('.reveal').forEach(el=>revealObserver.observe(el));

if(matchMedia('(pointer:fine)').matches){
  $$('.tilt3d').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(1100px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg) translateY(-3px)`;
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
  $$('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      el.style.transform=`translate(${((e.clientX-r.left-r.width/2)*.05).toFixed(1)}px,${((e.clientY-r.top-r.height/2)*.05).toFixed(1)}px)`;
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

/* Anchor links never rely on the browser's default hash jump. */
$$('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const id=link.getAttribute('href');
    if(!id || id==='#')return;
    const target=$(id);
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth',block:'start'});
    history.replaceState(null,'',id);
  });
});

const progress=$('.scroll-progress');
function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  if(progress) progress.style.width=(max>0?(window.scrollY/max)*100:0)+'%';
}
window.addEventListener('scroll',updateProgress,{passive:true});
window.addEventListener('resize',updateProgress,{passive:true});
updateProgress();

window.addEventListener('load',()=>{
  setTimeout(()=>$$('.reveal').forEach((el,i)=>el.style.transitionDelay=`${Math.min(i*12,120)}ms`),50);
});

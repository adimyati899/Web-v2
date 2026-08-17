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
  ['Instagram','Social / Creator','https://www.instagram.com/','https://www.instagram.com/favicon.ico','IG'],
  ['TikTok','Short-form video','https://www.tiktok.com/','https://www.tiktok.com/favicon.ico','TK'],
  ['X','Creator network','https://x.com/','https://x.com/favicon.ico','X'],
  ['GIMI','Creator campaigns','https://www.gimi.co/','https://www.gimi.co/favicon.ico','G'],
  ['VEED','AI video platform','https://www.veed.io/','https://www.veed.io/favicon.ico','V'],
  ['Pollo AI','AI creator program','https://pollo.ai/','https://pollo.ai/favicon.ico','P'],
  ['Midnight','Web3 ecosystem','https://midnight.network/','https://midnight.network/favicon.ico','M'],
  ['InVideo','AI video creation','https://invideo.io/','https://invideo.io/favicon.ico','IV'],
  ['CapCut','Video editing','https://www.capcut.com/','https://www.capcut.com/favicon.ico','C'],
  ['PixelDojo','AI visual creation','https://pixeldojo.ai/','https://pixeldojo.ai/favicon.ico','PD']
];

const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const verticalStage=$('#verticalStage');
const carousel=$('#carousel');
const logoStack=$('#logoStack');
const allVideos=[];

function makeVertical(item,i){
  const el=document.createElement('article');
  el.className='v-card reveal';
  el.dataset.index=i;
  el.innerHTML=`
    <video src="${item[0]}" muted playsinline preload="metadata"></video>
    <button class="sound play" aria-label="Play video" title="Play video">▶</button>
    <div class="v-info"><small>${item[2]}</small><h3>${item[1]}</h3></div>
  `;
  verticalStage.appendChild(el);
  const v=$('video',el), b=$('.sound',el);
  allVideos.push({v,card:el,button:b,type:'vertical'});
  b.addEventListener('click',e=>{
    e.stopPropagation();
    if(v.paused){
      stopAll(v);
      v.muted=false;
      v.play().then(()=>{
        b.textContent='❚❚';
        b.classList.add('active');
        el.classList.add('is-playing');
      }).catch(()=>{ v.muted=true; v.play().catch(()=>{}); });
    }else{
      v.pause();
      b.textContent='▶';
      b.classList.remove('active');
      el.classList.remove('is-playing');
    }
  });
  v.addEventListener('ended',()=>{
    b.textContent='▶';
    b.classList.remove('active');
    el.classList.remove('is-playing');
  });
  v.addEventListener('error',()=>el.classList.add('media-error'));
}
vertical.forEach(makeVertical);

function makeHorizontal(item){
  const el=document.createElement('article');
  el.className='h-card reveal';
  el.innerHTML=`
    <video src="${item[0]}" muted playsinline preload="metadata"></video>
    <div class="h-info">
      <div><h3>${item[1]}</h3><small>${item[2]}</small></div>
      <button class="h-sound" aria-label="Play video" title="Play video">▶</button>
    </div>`;
  carousel.appendChild(el);
  const v=$('video',el), b=$('.h-sound',el);
  allVideos.push({v,card:el,button:b,type:'horizontal'});
  b.addEventListener('click',e=>{
    e.stopPropagation();
    if(v.paused){
      stopAll(v);
      v.muted=false;
      v.play().then(()=>{ b.textContent='❚❚'; b.classList.add('active'); }).catch(()=>{});
    }else{
      v.pause();
      b.textContent='▶';
      b.classList.remove('active');
    }
  });
  v.addEventListener('ended',()=>{
    b.textContent='▶';
    b.classList.remove('active');
  });
  v.addEventListener('error',()=>el.classList.add('media-error'));
}
horizontal.forEach(makeHorizontal);

logoData.forEach(([name,role,href,src,fallback])=>{
  const el=document.createElement('a');
  el.className='logo-item glass reveal tilt3d';
  el.href=href; el.target='_blank'; el.rel='noopener';
  el.innerHTML=`
    <span class="logo-left">
      <span class="logo-box">
        <img src="${src}" alt="${name} logo">
        <span class="logo-fallback" hidden>${fallback}</span>
      </span>
      <span>
        <span class="logo-name">${name}</span>
        <span class="logo-role">${role}</span>
      </span>
    </span>
    <span class="logo-arrow">↗</span>`;
  const img=$('img',el), fallbackEl=$('.logo-fallback',el);
  img.addEventListener('error',()=>{
    img.style.display='none';
    fallbackEl.hidden=false;
  });
  logoStack.appendChild(el);
});

function stopAll(except=null){
  allVideos.forEach(({v,button,card})=>{
    if(v!==except){
      v.pause();
      if(button){ button.textContent='▶'; button.classList.remove('active'); }
      card?.classList.remove('is-playing');
    }
  });
}

const verticalCards=[...verticalStage.querySelectorAll('.v-card')];

function layoutVerticalCards(){
  verticalCards.forEach((card,i)=>{
    card.style.position='absolute';
    card.style.left='50%';
    card.style.top='50%';
    card.style.margin='0';
    card.style.zIndex=String(100-i);
    card.style.willChange='transform,opacity,filter';
    card.style.transformOrigin='center center';
  });
}

function updateVerticalMotion(){
  if(!verticalStage || !verticalCards.length) return;
  const rect=verticalStage.getBoundingClientRect();
  const scrollable=Math.max(1,rect.height-innerHeight);
  const progress=Math.min(1,Math.max(0,(-rect.top)/scrollable));
  const target=progress*(verticalCards.length-1);

  verticalCards.forEach((card,i)=>{
    const d=i-target, abs=Math.abs(d);
    const x=d*58;
    const scale=Math.max(.68,1-abs*.10);
    const opacity=Math.max(0,1-abs*.55);
    const rotate=Math.max(-10,Math.min(10,d*5));
    const blur=Math.min(5,abs*2);

    card.style.transform=`translate(-50%,-50%) translateX(${x}vw) scale(${scale}) rotateY(${rotate}deg)`;
    card.style.opacity=String(opacity);
    card.style.filter=`blur(${blur}px)`;
    card.classList.toggle('is-current',abs<.5);
  });
}

layoutVerticalCards();
updateVerticalMotion();
window.addEventListener('resize',()=>{layoutVerticalCards();updateVerticalMotion();});
window.addEventListener('scroll',updateVerticalMotion,{passive:true});

$('.prev').addEventListener('click',()=>carousel.scrollBy({left:-Math.min(carousel.clientWidth*.9,900),behavior:'smooth'}));
$('.next').addEventListener('click',()=>carousel.scrollBy({left:Math.min(carousel.clientWidth*.9,900),behavior:'smooth'}));

let drag=false,startX=0,startScroll=0;
carousel.addEventListener('pointerdown',e=>{
  drag=true; startX=e.clientX; startScroll=carousel.scrollLeft;
  carousel.setPointerCapture(e.pointerId);
  carousel.style.cursor='grabbing';
});
carousel.addEventListener('pointermove',e=>{
  if(drag) carousel.scrollLeft=startScroll-(e.clientX-startX)*1.15;
});
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>
  carousel.addEventListener(ev,()=>{
    drag=false; carousel.style.cursor='grab';
  })
);

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }
}),{threshold:.08});
$$('.reveal').forEach(el=>revealObserver.observe(el));

if(matchMedia('(pointer:fine)').matches){
  $$('.tilt3d').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect(),
            x=(e.clientX-r.left)/r.width-.5,
            y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(1100px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

$$('.magnetic').forEach(el=>{
  if(!matchMedia('(pointer:fine)').matches) return;
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    el.style.transform=`translate(${((e.clientX-r.left-r.width/2)*.06).toFixed(1)}px,${((e.clientY-r.top-r.height/2)*.06).toFixed(1)}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

const progress=$('.scroll-progress');
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress) progress.style.width=(max>0?scrollY/max*100:0)+'%';
},{passive:true});

window.addEventListener('load',()=>{
  setTimeout(()=>$$('.reveal').forEach((el,i)=>el.style.transitionDelay=`${Math.min(i*25,250)}ms`),50);
});

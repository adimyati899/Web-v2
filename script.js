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
 ['Instagram','Social / Creator','https://www.instagram.com/','https://www.instagram.com/favicon.ico','IG','instagram.com'],
 ['TikTok','Short-form video','https://www.tiktok.com/','https://www.tiktok.com/favicon.ico','TK','tiktok.com'],
 ['X','Creator network','https://x.com/','https://x.com/favicon.ico','X','x.com'],
 ['GIMI','Creator campaigns','https://www.gimi.co/','https://www.gimi.co/favicon.ico','G','gimi.co'],
 ['VEED','AI video platform','https://www.veed.io/','https://www.veed.io/favicon.ico','V','veed.io'],
 ['Pollo AI','AI creator program','https://pollo.ai/','https://pollo.ai/favicon.ico','P','pollo.ai'],
 ['Midnight','Web3 ecosystem','https://midnight.network/','https://midnight.network/favicon.ico','M','midnight.network'],
 ['InVideo','AI video creation','https://invideo.io/','https://invideo.io/favicon.ico','IV','invideo.io'],
 ['CapCut','Video editing','https://www.capcut.com/','https://www.capcut.com/favicon.ico','C','capcut.com'],
 ['PixelDojo','AI visual creation','https://pixeldojo.ai/','https://pixeldojo.ai/favicon.ico','PD','pixeldojo.ai']
];

const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const verticalStage=$('#verticalStage');
const carousel=$('#carousel');
const logoStack=$('#logoStack');
const allVideos=[];

function stopAll(except=null){
  allVideos.forEach(({v,button,card})=>{
    if(v!==except){
      v.pause();
      v.muted=true;
      card.classList.remove('is-active');
      if(button){
        button.textContent='⌁';
        button.classList.remove('active');
      }
    }
  });
}

function makeVertical(item,i){
  const el=document.createElement('article');
  el.className='v-card reveal';
  el.dataset.index=i;
  el.innerHTML=`
    <video src="${item[0]}" muted loop playsinline preload="metadata" disablepictureinpicture></video>
    <button class="sound" aria-label="Play ${item[1]}" title="Play video">⌁</button>
    <div class="v-info"><small>${item[2]}</small><h3>${item[1]}</h3></div>`;
  verticalStage.appendChild(el);

  const v=$('video',el), b=$('.sound',el);
  const itemState={v,card:el,button:b};
  allVideos.push(itemState);

  const toggle=()=>{
    if(v.paused){
      stopAll(v);
      v.muted=true;
      v.play().then(()=>{
        el.classList.add('is-active');
        b.textContent='❚❚';
        b.classList.add('active');
      }).catch(()=>{});
    }else{
      v.pause();
      el.classList.remove('is-active');
      b.textContent='⌁';
      b.classList.remove('active');
    }
  };

  b.addEventListener('click',e=>{e.stopPropagation();toggle()});
  v.addEventListener('click',e=>{e.stopPropagation();toggle()});
  v.addEventListener('error',()=>el.classList.add('media-error'));
}
vertical.forEach(makeVertical);

function makeHorizontal(item){
  const el=document.createElement('article');
  el.className='h-card reveal';
  el.innerHTML=`
    <video src="${item[0]}" muted loop playsinline preload="metadata" disablepictureinpicture></video>
    <div class="h-info">
      <div><h3>${item[1]}</h3><small>${item[2]}</small></div>
      <button class="h-sound" aria-label="Play ${item[1]}" title="Play video">⌁</button>
    </div>`;
  carousel.appendChild(el);

  const v=$('video',el), b=$('.h-sound',el);
  allVideos.push({v,card:el,button:b});

  const toggle=()=>{
    if(v.paused){
      stopAll(v);
      v.muted=true;
      v.play().then(()=>{
        el.classList.add('is-active');
        b.textContent='❚❚';
        b.classList.add('active');
      }).catch(()=>{});
    }else{
      v.pause();
      el.classList.remove('is-active');
      b.textContent='⌁';
      b.classList.remove('active');
    }
  };
  b.addEventListener('click',e=>{e.stopPropagation();toggle()});
  v.addEventListener('click',e=>{e.stopPropagation();toggle()});
  v.addEventListener('error',()=>el.classList.add('media-error'));
}
horizontal.forEach(makeHorizontal);

logoData.forEach(([name,role,href,src,fallback,domain])=>{
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
      <span><span class="logo-name">${name}</span><span class="logo-role">${role}</span></span>
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
prev?.addEventListener('click',()=>carousel.scrollBy({left:-Math.min(carousel.clientWidth*.92,900),behavior:'smooth'}));
next?.addEventListener('click',()=>carousel.scrollBy({left:Math.min(carousel.clientWidth*.92,900),behavior:'smooth'}));

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
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>
  carousel.addEventListener(ev,()=>{drag=false;carousel.style.cursor='grab'})
);

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.08});
$$('.reveal').forEach(el=>revealObserver.observe(el));

if(matchMedia('(pointer:fine)').matches){
  $$('.tilt3d').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(1100px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

$$('.magnetic').forEach(el=>{
  if(!matchMedia('(pointer:fine)').matches)return;
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

/* Keep only the currently visible vertical card visually centered.
   No autoplay: scrolling never starts a video. */
const verticalObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const card=entry.target;
    if(entry.isIntersecting && entry.intersectionRatio>.55){
      card.classList.add('is-current');
    }else{
      card.classList.remove('is-current');
    }
  });
},{root:verticalStage,threshold:[.2,.55,.8]});
$$('.v-card').forEach(card=>verticalObserver.observe(card));

window.addEventListener('load',()=>{
  setTimeout(()=>$$('.reveal').forEach((el,i)=>el.style.transitionDelay=`${Math.min(i*18,180)}ms`),50);
});

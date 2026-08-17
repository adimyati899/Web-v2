const vertical=[
 ['v1.mp4','Atmosphere in Motion','Cinematic Visual'],
 ['v2.mp4','The Night Has a Secret','AI Storytelling'],
 ['v3.mp4','Every Choice Creates a Story','Creative Experiment'],
 ['v4.mp4','Built for the Next Frame','InVideo Campaign'],
 ['v5.mp4','Wear the Idea','GIMI Campaign'],
 ['v6.mp4','AI, Made Social','VEED Campaign'],
 ['v7.mp4','One Image. Four Worlds.','AI Visual Experiment'],
 ['v8.mp4','Locked In','Cinematic Short'],
 ['v9.mp4','Dinner After Dark','GIMI Campaign'],
 ['v10.mp4','The Blue Dragon','AI Film']
];
const horizontal=[
 ['h1.mp4','Launch Sequence','Pollo AI · AI Film'],
 ['h2.mp4','From Stills to Cinema','Pruna · Visual Experiment'],
 ['h3.mp4','Godzilla × Kratos','Pollo AI · AI Film'],
 ['h4.mp4','ViktorPower','Pollo AI · AI Film'],
 ['h5.mp4','Dark Fantasy','Pollo AI · AI Video'],
 ['h6.mp4','The Impossible Shot','AI Cinematic'],
 ['h7.mp4','Luxury Motion','AI Cinematic']
];
const logoData=[
 ['Instagram','Social / Creator','https://www.instagram.com/','https://www.instagram.com/favicon.ico','IG'],
 ['TikTok','Short-form video','https://www.tiktok.com/','https://www.tiktok.com/favicon.ico','TK'],
 ['X','Creator network','https://x.com/','https://x.com/favicon.ico','X'],
 ['GIMI','Creator campaigns','https://www.gimi.co/','https://www.gimi.co/favicon.ico','G'],
 ['VEED','AI video platform','https://www.veed.io/','https://www.veed.io/favicon.ico','V'],
 ['Pollo AI','AI creation platform','https://pollo.ai/','https://pollo.ai/favicon.ico','P'],
 ['Midnight','Web3 ecosystem','https://midnight.network/','https://midnight.network/favicon.ico','M'],
 ['InVideo','AI video creation','https://invideo.io/','https://invideo.io/favicon.ico','IV'],
 ['CapCut','Video editing','https://www.capcut.com/','https://www.capcut.com/favicon.ico','C'],
 ['PixelDojo','AI visual creation','https://pixeldojo.ai/','https://pixeldojo.ai/favicon.ico','PD']
];
const vs=document.getElementById('verticalStage');
vertical.forEach((item,i)=>{const el=document.createElement('article');el.className='v-card';el.style.zIndex=i+1;el.style.top=`${13+i*2}vh`;el.innerHTML=`<video src="assets/videos/${item[0]}" autoplay muted loop playsinline preload="metadata"></video><button class="sound" aria-label="Toggle sound">⌁</button><div class="v-info"><small>${item[2]}</small><h3>${item[1]}</h3></div>`;vs.appendChild(el);const v=el.querySelector('video'),b=el.querySelector('.sound');b.onclick=()=>{document.querySelectorAll('.v-card video').forEach(x=>{if(x!==v){x.muted=true}});v.muted=!v.muted;b.textContent=v.muted?'⌁':'🔊'};});
const car=document.getElementById('carousel');
horizontal.forEach(item=>{const el=document.createElement('article');el.className='h-card';el.innerHTML=`<video src="assets/videos/${item[0]}" autoplay muted loop playsinline preload="metadata"></video><div class="h-info"><h3>${item[1]}</h3><small>${item[2]}</small></div>`;car.appendChild(el)});
document.querySelector('.prev').onclick=()=>car.scrollBy({left:-car.clientWidth*.9,behavior:'smooth'});document.querySelector('.next').onclick=()=>car.scrollBy({left:car.clientWidth*.9,behavior:'smooth'});
let down=false,startX=0,scroll=0;car.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;scroll=car.scrollLeft;car.setPointerCapture(e.pointerId);car.style.cursor='grabbing'});car.addEventListener('pointermove',e=>{if(!down)return;car.scrollLeft=scroll-(e.clientX-startX)*1.15});['pointerup','pointercancel'].forEach(x=>car.addEventListener(x,()=>{down=false;car.style.cursor='grab'}));
const ls=document.getElementById('logoStack');logoData.forEach(([name,role,href,src,fallback])=>{const el=document.createElement('a');el.className='logo-item glass';el.href=href;el.target='_blank';el.rel='noopener';el.innerHTML=`<span class="logo-left"><span class="logo-box"><img src="${src}" alt="${name} logo" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="logo-fallback" style="display:none">${fallback}</span></span><span><span class="logo-name">${name}</span><span class="logo-role">${role}</span></span></span><span class="logo-arrow">↗</span>`;ls.appendChild(el)});
const cards=[...document.querySelectorAll('.v-card')];window.addEventListener('scroll',()=>{const y=window.scrollY;cards.forEach((c,i)=>{const r=c.getBoundingClientRect();const p=Math.max(-1,Math.min(1,(window.innerHeight/2-(r.top+r.height/2))/(window.innerHeight/2)));c.style.transform=`perspective(1100px) rotateY(${p*5}deg) rotateX(${p*-2}deg) translateY(${p*-7}px)`})},{passive:true});

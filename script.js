const photos = [
 {title:"Mountain Lake",cat:"nature",url:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=90"},
 {title:"Blush Petals",cat:"flowers",url:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=90"},
 {title:"Golden Friend",cat:"animals",url:"https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1400&q=90"},
 {title:"City Lights",cat:"cities",url:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=90"},
 {title:"Forest Falls",cat:"nature",url:"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1400&q=90"},
 {title:"Pastel Sunset",cat:"aesthetic",url:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90"},
 {title:"Slow Morning",cat:"art",url:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90"},
 {title:"Lavender Fields",cat:"flowers",url:"https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1400&q=90"},
 {title:"Curious Kitty",cat:"animals",url:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1400&q=90"},
 {title:"Old Town Charm",cat:"cities",url:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=90"},
 {title:"Butterfly Colors",cat:"art",url:"https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=1400&q=90"},
 {title:"Spring Bloom",cat:"nature",url:"https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1400&q=90"}
];
const grid=document.querySelector("#grid");
const lightbox=document.querySelector(".lightbox");
let shown=[], index=0;
if(grid){
  function render(filter="all"){
    shown=photos.filter(p=>filter==="all"||p.cat===filter);
    grid.innerHTML=shown.map((p,i)=>`<button class="photo" data-index="${i}" aria-label="Open ${p.title}"><img loading="lazy" src="${p.url.replace("w=1400","w=650")}" alt="${p.title}"><span>${p.title}</span></button>`).join("");
    grid.querySelectorAll(".photo").forEach((el,i)=>el.addEventListener("click",()=>openPhoto(i)));
  }
  render();
  document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");render(btn.dataset.filter);
  }));
  function openPhoto(i){index=i;updatePhoto();lightbox.hidden=false;document.body.style.overflow="hidden";}
  function updatePhoto(){const p=shown[index];lightbox.querySelector("img").src=p.url;lightbox.querySelector("img").alt=p.title;lightbox.querySelector("figcaption").textContent=p.title;lightbox.querySelector(".count").textContent=`${index+1} / ${shown.length}`;}
  function closePhoto(){lightbox.hidden=true;document.body.style.overflow="";}
  lightbox.querySelector(".close").addEventListener("click",closePhoto);
  lightbox.querySelector(".prev").addEventListener("click",()=>{index=(index-1+shown.length)%shown.length;updatePhoto();});
  lightbox.querySelector(".next").addEventListener("click",()=>{index=(index+1)%shown.length;updatePhoto();});
  lightbox.addEventListener("click",e=>{if(e.target===lightbox)closePhoto();});
  document.addEventListener("keydown",e=>{if(lightbox.hidden)return;if(e.key==="Escape")closePhoto();if(e.key==="ArrowLeft"){index=(index-1+shown.length)%shown.length;updatePhoto();}if(e.key==="ArrowRight"){index=(index+1)%shown.length;updatePhoto();}});
}
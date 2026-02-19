const toggleBackToTopButton=()=>{
  const b=document.getElementById('back-to-top');
  b&&b.classList.toggle('show',(document.body.scrollTop>20||document.documentElement.scrollTop>20))&&(b.style.transition='all .2s ease-out');
};
const scrollToTop=()=>{
  const b=document.getElementById('back-to-top');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(toggleBackToTopButton,1e3);
};
window.addEventListener('load',()=>{
  const l=document.getElementById('loading-screen');
  if(l){
    const t=Math.max(0,5e3-(Date.now()-window.loadStartTime));
    window.onbeforeunload=e=>e.preventDefault();
    setTimeout(()=>{
      l.style.opacity=0;
      setTimeout(()=>{l.remove();document.getElementById('loading-hide-scrollbar')?.remove();window.onbeforeunload=null},500);
    },t);
  }
  window.scrollTo(0,0);
});
const fetchHotList=(t,c,l=30)=>{
  fetch(`https://api.pearktrue.cn/api/dailyhot/?title=${encodeURIComponent(t)}`)
    .then(r=>r.ok?r.json():Promise.reject())
    .then(({data:d})=>{
      const e=document.getElementById(c);
      if(!e)return;
      e.innerHTML=d?.length?d.slice(0,l).map((m,i)=>`
        <div class=hot-item>
          <a href=${m.url} target=_blank class=hot-link>
            <div class="hot-rank ${i<3?'rank'+(i+1):''}">${i+1}</div>
            <div class=hot-title>${m.title}</div>
          </a>
        </div>`).join(''):(handleApiError(c),'');
    })
    .catch(()=>handleApiError(c));
};
const handleApiError=(c,m='加载失败！请稍后刷新页面！')=>{
  const e=document.getElementById(c);
  e&&(e.innerHTML=`<div class=error-message><div class=error-content><i class="fas fa-exclamation-triangle"></i><span>${m}</span></div></div>`);
};
const fetchWeather=()=>{
  const p='地点（Location）：中国 - 重庆 %0A天气（Weather）：%c%C%0A温度（Temperature）：%t%0A降水量（Precipitation）：%p%0A气压（Air Pressure）：%P%0A湿度（Humidity）：%h%0A风向风速（Wind Direction and Wind Speed）：%w%0AUV指数（UV Index）：%u%0A日出（Sunrise）：%S%0A日落（Sunset）：%s%0A月相（Moon Phase）：%m';
  fetch(`https://wttr.in/Chongqing?format=${p}&lang=zh`,{headers:{Accept:'text/plain'}})
    .then(r=>r.ok?r.text():Promise.reject())
    .then(d=>{const c=document.getElementById('weather-container');c&&(c.innerHTML=d.split('\n').map(l=>`<div class=weather-line>${l}</div>`).join(''));})
    .catch(()=>handleApiError('weather-container'));
};
const displayDaysRunning=()=>{
  const d=Math.floor((Date.now()-new Date('2015-11-11'))/864e5),e=document.getElementById('running-days');
  e&&(e.textContent=d);
};
const updateTime=()=>{
  const n=new Date(),d=document;
  const[D,T,G]=['current-date','current-time','greeting'].map(i=>d.getElementById(i));
  D&&(D.textContent=n.toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'}).replace('日','日 '));
  T&&(T.textContent=n.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}));
  if(G){
    const h=n.getHours();
    G.textContent=h<3?'夜深了，注意休息哦~':h<5?'凌晨好，早起的鸟儿有虫吃！':h<7?'清晨好，新的一天开始了！':h<9?'早上好，记得吃早餐~':h<11?'上午好，工作学习要加油！':h<13?'中午好，该吃午饭啦！':h<15?'午后好，适当休息一下吧~':h<17?'下午好，保持专注！':h<19?'傍晚好，今天过得如何？':h<22?'晚上好，放松一下吧~':'夜深了，早点休息哦~';
  }
  requestAnimationFrame(updateTime);
};
const updateYear=()=>{
  const s=2025,y=new Date().getFullYear(),e=document.getElementById('current-year');
  e&&(e.textContent=y===s?s:`${s} - ${y}`);
};
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('back-to-top')?.addEventListener('click',scrollToTop);
  ['scroll','resize'].forEach(e=>{window.addEventListener(e, toggleBackToTopButton, {passive:true});});
  toggleBackToTopButton();
  fetchHotList('百度','baidu-hotlist',50);
  fetchHotList('bilibili','bilibili-hotlist',100);
  fetchWeather();
  displayDaysRunning();
  updateTime();
  updateYear();
});
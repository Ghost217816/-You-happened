const audio = document.getElementById("audio");
const startScreen = document.getElementById("startScreen");
const scene = document.getElementById("scene");
const startBtn = document.getElementById("startBtn");
const headphoneScreen = document.getElementById("headphoneScreen");
const confirmHeadphonesBtn = document.getElementById("confirmHeadphonesBtn");
const restartBtn = document.getElementById("restartBtn");
const finalOutro = document.getElementById("finalOutro");
const lyrics = document.getElementById("lyrics");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const particles = document.getElementById("particles");

const lines = [
  [0.000, 1.000, "Быть с тобой", "top"],
  [1.000, 3.000, "Будто самый лучший сон", "left"],
  [3.000, 5.000, "Я не верю, что со мной, да", "right"],
  [5.000, 7.000, "Ты случилась", "bottom"],
  [7.000, 8.500, "Быть с тобой", "top"],
  [8.500, 10.000, "Но прощаться с головой", "left"],
  [10.000, 12.000, "Я не верил, что со мной", "right"],
  [12.000, 13.000, "Можешь ты случиться", "bottom"],
  [13.000, 15.000, "Всё в тебе нравится", "left"],
  [15.000, 17.000, "Я хочу в тебя вглядываться", "right"],
  [17.000, 19.000, "Каждый сантиметр тебя", "left"],
  [19.000, 21.000, "Заставляет плавиться", "right"],
  [21.000, 22.500, "Мне нету разницы", "left"],
  [22.500, 24.000, "Что судьбой мне достанется", "right"],
  [24.000, 26.000, "Мне уже прислали тебя", "left"],
  [26.000, 28.000, "С остальным справимся", "right"],
  [28.000, 29.500, "Знаешь, ты 100 из 100", "left"],
  [29.500, 31.000, "Только ты ещё прекрасней", "right"],
  [31.000, 32.500, "Ты звучишь как классика", "left"],
  [32.500, 34.000, "Среди современной массы", "right"],
  [34.000, 36.000, "Ты как лучшее кино", "left"],
  [36.000, 37.500, "Ты как красное вино", "right"],
  [37.500, 38.500, "Годы так быстро бегут", "left"],
  [38.500, 41.000, "Ты станешь лучше всё равно", "right"],
  [41.000, 42.000, "Быть с тобой", "top"],
  [42.000, 44.000, "Будто самый лучший сон", "left"],
  [44.000, 46.000, "Я не верю, что со мной, да", "right"],
  [46.000, 48.000, "Ты случилась", "bottom"],
  [48.000, 49.000, "Быть с тобой", "top"],
  [49.000, 51.000, "Но прощаться с головой", "left"],
  [51.000, 53.000, "Я не верил, что со мной", "right"],
  [53.000, 55.000, "Можешь ты случиться", "bottom"],
  [55.000, 57.500, "Аууууу", "top"],
  [57.500, 61.500, "Я кричу тебе на всю, помоги мне, я тону", "left"],
  [61.500, 64.500, "Ауууу", "top"],
  [64.500, 68.000, "Больше думать не могу, ни о чем кроме тебя, ууу", "right"],
  [74.500, 76.500, "Ты как картины в галерее", "left"],
  [76.500, 78.000, "Но мне не станет скучно", "right"],
  [78.500, 80.500, "Ты как снег в этом апреле", "left"],
  [80.500, 82.500, "Типа я не равнодушен", "right"],
  [82.500, 84.000, "Я оставлю все дела", "left"],
  [84.000, 86.000, "Отключу все телефоны", "right"],
  [86.000, 87.500, "Я смотрю лишь на тебя", "left"],
  [87.500, 89.500, "Как и все в нашем районе (Оу, да)", "right"],
  [90.000, 91.000, "Быть с тобой", "top"],
  [91.000, 92.000, "Будто самый лучший сон", "left"],
  [92.000, 94.000, "Я не верю, что со мной, да", "right"],
  [94.000, 95.000, "Ты случилась", "bottom"],
  [95.000, 97.000, "Быть с тобой", "top"],
  [97.000, 99.000, "Но прощаться с головой", "left"],
  [99.000, 101.000, "Я не верил, что со мной", "right"],
  [101.000, 103.000, "Можешь ты случиться", "bottom"],
  [103.000, 105.000, "Аууууу", "top"],
  [105.000, 110.000, "Я кричу тебе на всю, помоги мне, я тону", "left"],
  [110.000, 112.500, "Ауууу", "top"],
  [112.500, 117.000, "Больше думать не могу, ни о чем кроме тебя, ууу", "right"],
  [117.000, 120.000, "Аууууу", "top"],
  [120.000, 124.000, "Я кричу тебе на всю, помоги мне, я тону", "left"],
  [124.000, 127.000, "Аууu", "top"],
  [127.000, 131.000, "Больше думать не могу, ни о чем кроме тебя, уuu", "right"]
];

let lastLine = -1;
let started = false;
let ending = false;
let endTimer = null;
const TRACK_DURATION = 140.722; // exact uploaded MP3 duration
const BLOOM_DELAY = 7350;
const OUTRO_FADE_MS = 2600;     // повне затемнення
const FINAL_REVEAL_MS = 4500;   // поступова поява фінальної анімації

// Невелика корекція синхронізації. Змінюй у мілісекундах,
// якщо на твоєму браузері текст стабільно трохи випереджає/відстає.
const SYNC_OFFSET = 0.000;

function syncedTime() {
  return Math.max(0, audio.currentTime + SYNC_OFFSET);
}

function fmt(t){
  if(!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t/60);
  const s = Math.floor(t%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

function makeParticles(){
  // Старі м'які частинки
  for(let i=0;i<34;i++){
    const p=document.createElement("i");
    p.className="particle";
    p.style.left=(Math.random()*100)+"%";
    p.style.bottom=(-10-Math.random()*20)+"px";
    p.style.setProperty("--x", ((Math.random()-.5)*160)+"px");
    p.style.animationDuration=(5+Math.random()*8)+"s";
    p.style.animationDelay=(Math.random()*5)+"s";
    particles.appendChild(p);
  }

  // Нові яскраві червоні частинки по всьому задньому фону
  for(let i=0;i<70;i++){
    const p=document.createElement("i");
    p.className="red-particle" + (Math.random() > .82 ? " big" : "");
    p.style.left=(Math.random()*100)+"%";
    p.style.bottom=(-5-Math.random()*15)+"px";
    p.style.setProperty("--drift", ((Math.random()-.5)*240)+"px");
    p.style.setProperty("--duration", (4.5+Math.random()*7)+"s");
    p.style.setProperty("--delay", (-Math.random()*10)+"s");
    particles.appendChild(p);
  }
}
makeParticles();

function showLine(i){
  if(i===lastLine) return;
  lastLine=i;
  lyrics.innerHTML="";
  const [start,end,text,pos]=lines[i];
  const el=document.createElement("div");
  el.className="lyric "+pos;
  el.textContent=text;
  el.style.setProperty("--line-life", Math.max(.6, end-start)+"s");
  lyrics.appendChild(el);
  scene.classList.remove("lyric-pulse");
  void scene.offsetWidth;
  scene.classList.add("lyric-pulse");
}

function tick(){
  if(!started) return;
  const t=syncedTime();
  progressBar.style.width=(audio.duration ? Math.min(100, t/audio.duration*100) : 0)+"%";
  currentTimeEl.textContent=fmt(t);
  durationEl.textContent=fmt(audio.duration);

  let idx=-1;
  for(let i=0;i<lines.length;i++){
    if(t>=lines[i][0] && t<lines[i][1] && lines[i][0] < (audio.duration || Infinity)) { idx=i; break; }
  }
  if(idx>=0) showLine(idx);
  if(!audio.paused) requestAnimationFrame(tick);
}


function resetScene(){
  if(endTimer) clearTimeout(endTimer);
  endTimer = null;
  ending = false;
  started = false;

  audio.pause();
  audio.currentTime = 0;
  lastLine = -1;
  lyrics.innerHTML = "";
  progressBar.style.width = "0%";
  currentTimeEl.textContent = "0:00";

  scene.classList.remove("music-started", "ending", "fully-dark");
  finalOutro.classList.remove("show", "reveal");
  finalOutro.setAttribute("aria-hidden", "true");

  // Повертаємо троянду до стартового стану.
  scene.classList.remove("active");
  void scene.offsetWidth;
}

async function playAfterBloom(){
  setTimeout(async ()=>{
    if(ending) return;
    started = true;
    try{
      await audio.play();
    }catch(e){
      console.warn(e);
    }
    scene.classList.add("music-started");
    tick();
  }, BLOOM_DELAY);
}

function startExperience(){
  resetScene();

  startScreen.style.display = "none";
  headphoneScreen.style.display = "none";
  scene.classList.add("active");
  scene.setAttribute("aria-hidden","false");

  // Даємо основній троянді повністю вирости, і лише потім — музика + текст.
  playAfterBloom();
}

startBtn.addEventListener("click", ()=>{
  startScreen.style.display = "none";
  headphoneScreen.style.display = "grid";
  headphoneScreen.classList.add("visible");
  headphoneScreen.setAttribute("aria-hidden","false");
});

confirmHeadphonesBtn.addEventListener("click", ()=>{
  headphoneScreen.classList.remove("visible");
  setTimeout(()=>{
    startExperience();
  }, 180);
});

restartBtn.addEventListener("click", ()=>{
  // Кнопка "почати спочатку" знову веде через навушники.
  resetScene();
  scene.setAttribute("aria-hidden","true");
  headphoneScreen.style.display = "grid";
  headphoneScreen.classList.add("visible");
  headphoneScreen.setAttribute("aria-hidden","false");
});

function startEnding(){
  if(ending) return;
  ending = true;
  started = false;

  // Прибираємо текст/інтерфейс і починаємо повільне затемнення.
  lyrics.innerHTML = "";
  scene.classList.add("ending");

  // Після повного затемнення основна сцена ховається,
  // а фінальна троянда з'являється дуже повільно.
  endTimer = setTimeout(()=>{
    scene.classList.add("fully-dark");
    finalOutro.setAttribute("aria-hidden","false");

    setTimeout(()=>{
      finalOutro.classList.add("show");

      setTimeout(()=>{
        finalOutro.classList.add("reveal");
      }, 80);
    }, 150);
  }, OUTRO_FADE_MS);
}

audio.addEventListener("timeupdate", ()=>{
  if(audio.duration && audio.currentTime >= audio.duration - 0.08){
    startEnding();
  }
});

audio.addEventListener("ended", ()=>{
  progressBar.style.width="100%";
  startEnding();
});

audio.addEventListener("loadedmetadata", ()=>{
  durationEl.textContent=fmt(audio.duration || TRACK_DURATION);
});

// Якщо браузер відновив сторінку після кешу — стартуємо чисто.
window.addEventListener("pageshow", ()=>{
  startScreen.style.display = "grid";
  headphoneScreen.style.display = "none";
  headphoneScreen.classList.remove("visible");
  scene.classList.remove("active", "music-started", "ending", "fully-dark");
  finalOutro.classList.remove("show", "reveal");
  finalOutro.setAttribute("aria-hidden","true");
  audio.pause();
  audio.currentTime = 0;
});

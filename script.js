const $ = id => document.getElementById(id);
const sender=$("sender"), receiver=$("receiver");
function updateClock(){ $("clock").textContent=new Date().toLocaleString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}); }
updateClock(); setInterval(updateClock,1000);
$("editToggle").addEventListener("click",()=>{$("editor").hidden=false; $("senderEdit").value=sender.value; $("receiverEdit").value=receiver.value;});
$("closeEditor").addEventListener("click",()=>$("editor").hidden=true);
$("applyMessage").addEventListener("click",()=>{
  sender.value=$("senderEdit").value.trim()||"Jatashankar Yadav";
  receiver.value=$("receiverEdit").value.trim();
  const custom=$("customMessage").value.trim();
  $("messagePreview").textContent=custom||"मेरे प्यारे परिवार को दीपावली की हार्दिक शुभकामनाएँ।";
  const lines=$("familyLines").value.split(/\n/).map(x=>x.trim()).filter(Boolean);
  const list=$("familyList"); list.replaceChildren();
  lines.forEach(line=>{const li=document.createElement("li");li.textContent=line;list.appendChild(li);});
  $("familyCard").hidden=lines.length===0;
  $("editor").hidden=true;
  toast("आपका खास मैसेज तैयार है ❤️");
});
function toast(msg){const t=$("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2600);}
$("shareBtn").addEventListener("click",()=>{
  const family=$("familyList").innerText;
  const msg=`🪔 Happy Diwali / शुभ दीपावली 🪔\nFrom: ${sender.value}\nTo: ${receiver.value||"आप और आपका परिवार"}\n\n${$("messagePreview").textContent}${family?"\n\n"+family:""}\n\n— JATASHANKAR YADAV`;
  const url="https://wa.me/?text="+encodeURIComponent(msg);
  window.open(url,"_blank","noopener");
});

// Gentle instrumental-style melody generated locally; no spoken voice.
let audioCtx=null, musicTimer=null, musicOn=false, noteIndex=0;
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46];
function playNote(){
  if(!audioCtx)return;
  const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
  osc.type="sine"; osc.frequency.value=notes[noteIndex++%notes.length];
  gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.045,audioCtx.currentTime+.04);
  gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.48);
  osc.connect(gain);gain.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+.5);
}
$("musicBtn").addEventListener("click",async()=>{
  if(!musicOn){audioCtx=new (window.AudioContext||window.webkitAudioContext)();await audioCtx.resume();playNote();musicTimer=setInterval(playNote,520);musicOn=true;$("musicBtn").textContent="♫ Music: On";}
  else{clearInterval(musicTimer);audioCtx.close();audioCtx=null;musicOn=false;$("musicBtn").textContent="♫ Music: Off";}
});

// Small celebratory fireworks particles.
const canvas=$("fireworks"),ctx=canvas.getContext("2d");let particles=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
addEventListener("resize",resize);resize();
function burst(){const x=Math.random()*innerWidth,y=Math.random()*innerHeight*.55;for(let i=0;i<34;i++){const a=Math.PI*2*i/34,s=1+Math.random()*3;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:55+Math.random()*25,hue:Math.random()*55+25});}}
setInterval(burst,1700);
function animate(){ctx.clearRect(0,0,innerWidth,innerHeight);particles=particles.filter(p=>p.life>0);for(const p of particles){ctx.fillStyle=`hsla(${p.hue},100%,65%,${p.life/80})`;ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();p.x+=p.vx;p.y+=p.vy;p.vy+=.025;p.life--;}requestAnimationFrame(animate);}
animate();

(()=>{
const $=i=>document.getElementById(i),cv=$('c'),g=cv.getContext('2d');
const W=800,H=450,GY=380,SPD=230,JMP=540,GRAV=1500,NREC=14;

/* ===== Registros históricos (índice = id do colecionável) ===== */
const REC=[
['Quilombos','Quilombos eram comunidades formadas por pessoas que fugiram da escravidão, muitas vezes junto com indígenas e outros grupos. Plantavam, comerciavam e criavam formas próprias de organização em várias regiões do Brasil. Hoje, muitas comunidades quilombolas continuam vivas.'],
['Palmares','O Quilombo dos Palmares floresceu na Serra da Barriga, região que hoje pertence a Alagoas, ao longo do século XVII. Reuniu milhares de pessoas e é um dos maiores símbolos de liberdade da história brasileira.'],
['Zumbi dos Palmares','Zumbi foi um dos líderes de Palmares e é lembrado como símbolo de resistência. Sua morte, em 20 de novembro de 1695, deu origem à data em que celebramos o Dia da Consciência Negra.'],
['Dandara','Dandara é lembrada pela tradição como guerreira de Palmares e companheira de Zumbi. Existem poucos documentos sobre ela, por isso sua memória vem muito da tradição oral. Tornou-se símbolo da luta das mulheres negras por liberdade.'],
['Saberes africanos','Africanos e afrodescendentes trouxeram conhecimentos de agricultura, metalurgia, construção, medicina com plantas e organização comunitária que ajudaram a formar o Brasil.'],
['Carolina Maria de Jesus','Catadora de papel e moradora da favela do Canindé, em São Paulo, Carolina registrou o cotidiano em diários. "Quarto de Despejo" (1960) fez enorme sucesso e foi traduzido para vários idiomas.'],
['Machado de Assis','Machado de Assis (1839–1908), nascido no Rio de Janeiro, é um dos maiores nomes da literatura brasileira. Foi fundador e primeiro presidente da Academia Brasileira de Letras. "Dom Casmurro" é uma de suas obras mais lidas.'],
['Luiz Gama','Luiz Gama (1830–1882), nascido livre em Salvador, foi escravizado ilegalmente ainda criança. Tornou-se poeta, jornalista e advogado sem diploma (rábula), e atuou nos tribunais pela liberdade de centenas de pessoas.'],
['Conceição Evaristo','A mineira Conceição Evaristo é uma das vozes mais importantes da literatura afro-brasileira. Criou o conceito de "escrevivência": escrita que nasce da vivência de mulheres negras. É autora de "Ponciá Vicêncio".'],
['Lélia Gonzalez','Lélia Gonzalez (1935–1994) foi intelectual, professora e ativista. Ajudou a fundar o Movimento Negro Unificado, em 1978, e pensou a relação entre racismo e machismo na sociedade brasileira.'],
['Música afro-brasileira','Samba, capoeira, maracatu, jongo e muitos outros ritmos têm raízes afro-brasileiras. Atabaques, berimbaus e tambores ajudaram a moldar a identidade musical do país.'],
['Culinária','Dendê, quiabo e inhame se consolidaram na mesa brasileira pelas mãos de africanos e seus descendentes. Acarajé, vatapá e caruru mostram a força da culinária afro-brasileira, sobretudo na Bahia.'],
['Aleijadinho','Antônio Francisco Lisboa, o Aleijadinho (c. 1738–1814), filho de uma mulher africana escravizada e de um mestre de obras português, foi escultor e arquiteto do barroco mineiro, com obras em Ouro Preto e Congonhas.'],
['Palavras africanas','Centenas de palavras do português brasileiro vêm de línguas africanas, como o quimbundo e o iorubá. Caçula, quitanda, cafuné e dendê são alguns exemplos.']];

/* ===== Fases =====
 g: trechos de chão [x0,x1] | p: plataformas [x,y,w] | mv: móveis [x,y,w,vertical,alcance,velocidade]
 sp: espinhos [x,w] | en: obstáculos que patrulham [x,y,alcance] | it: registros [x,y,idRegistro] | cp: checkpoints | goal: chegada */
const LV=[
{n:'Fase 1 · Raízes e Resistência',m:'Na mata, pessoas construíram comunidades livres. Atravesse a floresta e descubra a história dos quilombos e de Palmares. Dica: há um registro escondido no alto.',th:0,w:3200,
 g:[[0,520],[620,1000],[1120,1500],[1640,1900],[2020,2500],[2600,3200]],
 p:[[700,300,100],[1200,300,110],[1260,215,70],[1760,300,90],[2250,300,90],[2800,310,80]],
 mv:[[1510,350,56,0,60,1.5]],sp:[[860,40],[1400,40],[2200,40]],
 en:[[1250,358,200],[1700,358,160],[2100,358,300]],
 it:[[350,340,0],[730,260,1],[1290,175,2],[1790,260,3],[2280,260,4]],cp:[1130,2030],goal:3080},
{n:'Fase 2 · Vozes que Transformam',m:'Entre ruas, livros e tribunais, vozes negras mudaram a literatura e a justiça. Reúna as palavras que atravessam o tempo.',th:1,w:3400,
 g:[[0,400],[520,800],[920,1150],[1300,1500],[1700,2000],[2150,2500],[2650,3000],[3100,3400]],
 p:[[600,300,90],[1000,290,100],[1060,200,80],[1190,335,70],[2040,335,70],[2300,300,100],[2760,300,90]],
 mv:[[1520,340,64,0,80,1.4],[2520,340,64,0,50,1.6]],sp:[[700,48],[2430,40],[3200,40]],
 en:[[1720,358,180],[2200,358,180],[2700,358,240]],
 it:[[240,340,5],[640,260,6],[1090,160,7],[2330,260,8],[2790,260,9]],cp:[930,1710,2660],goal:3300},
{n:'Fase 3 · Cultura e Futuro',m:'Música, sabores, arte e palavras: a cultura afro-brasileira está em tudo. Vença a travessia final até o Farol da Igualdade.',th:2,w:3700,
 g:[[0,350],[470,680],[800,1000],[1120,1300],[1650,1850],[1980,2200],[2330,2560],[3380,3700]],
 p:[[830,310,60],[930,240,70],[2790,300,60],[3050,300,60]],
 mv:[[1330,330,60,0,70,1.5],[1480,300,60,1,70,1.5],[2600,330,60,0,100,1.7],[2880,320,60,1,50,1.6],[3130,320,60,0,90,1.8]],
 sp:[[540,40],[2060,40],[2400,40],[3500,48]],
 en:[[1700,358,120],[2020,358,160],[2350,358,170],[3420,358,200]],
 it:[[600,340,10],[960,200,11],[2100,340,12],[2820,260,13]],cp:[1130,1990,2340,3390],goal:3600}];

const TH=[
{sky:['#2a7f8f','#4a9aa0','#7fb5a0','#c9cf93','#f6d38b'],sun:'#fff0b3',far:'#3f8f66',near:'#2c7550',gr:'#4a3222',top:'#3fae5f',pl:'#8a6a44',acc:'#3fae5f'},
{sky:['#2c1a52','#4b2c6f','#8a3f7a','#d1635f','#f09a5a'],sun:'#ffd27a',far:'#3a2559',near:'#2a1a45',gr:'#33233f',top:'#8a5a3c',pl:'#6a4a2e',acc:'#d1453b'},
{sky:['#5a2060','#7a2a62','#b03a5e','#e8663f','#ffb03b'],sun:'#ffe27a',far:'#7a2a62',near:'#4e1a50',gr:'#2e1a28',top:'#f2b632',pl:'#c87a2a',acc:'#2f9e63'}];

/* ===== Estado ===== */
const S={st:'menu',lv:0,lives:5,score:0,base:0,got:new Set(),snd:true};
let L,p,cam=0,time=0,parts=[],fts=[],AC;
const IN={l:0,r:0,j:0};let jb=0;
const hsh=n=>((n*2654435761)>>>0)%1000/1000;
const ov=$('ov');
function save(next){try{localStorage.setItem('slc',JSON.stringify({lv:next,score:S.score,got:[...S.got]}))}catch(e){}}
function load(){try{return JSON.parse(localStorage.getItem('slc'))}catch(e){return null}}

/* ===== Áudio ===== */
function tone(f,d,ty,v,sl){if(!S.snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),n=AC.createGain(),t=AC.currentTime;o.type=ty||'square';o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(sl,t+d);n.gain.setValueAtTime(v||.05,t);n.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(n);n.connect(AC.destination);o.start();o.stop(t+d)}catch(e){}}
const SFX={jump:()=>tone(300,.15,'square',.04,620),coin:()=>{tone(660,.1);setTimeout(()=>tone(990,.2),90)},hit:()=>tone(220,.3,'sawtooth',.07,60),cp:()=>{tone(520,.1);setTimeout(()=>tone(780,.15),100)},win:()=>[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.25,'triangle',.07),i*140))};

/* ===== Interface ===== */
const btn=(a,t,c,v)=>`<button class="b ${c||''}" data-a="${a}" ${v!=null?`data-v="${v}"`:''}>${t}</button>`;
const card=h=>`<div class="card">${h}</div>`;
function show(h){ov.innerHTML=card(h);ov.style.display='flex'}
function hide(){ov.style.display='none'}
function hud(){$('hl').textContent='♥'.repeat(S.lives)+'♡'.repeat(5-S.lives);$('hs').textContent='Pontos '+S.score;$('hc').textContent='Registros '+S.got.size+'/'+NREC;$('hn').textContent=L?'Fase '+(S.lv+1)+'/3':'';$('bm').textContent='Som: '+(S.snd?'ligado':'desligado')}
function menu(){S.st='menu';const s=load();show(`<h1>Salto para a Liberdade</h1><p>Uma jornada de plataforma pela história, pela cultura e pela força da população negra no Brasil.</p>${btn('play','Jogar')}${s?btn('cont','Continuar','s'):''}${btn('ctrl','Controles','s')}${fsOK&&matchMedia('(pointer:coarse)').matches?btn('fs','Tela cheia','s'):''}<small class="tip">Dica: no celular, o botão ⛶ coloca o jogo em tela cheia na horizontal.</small>`)}
function recList(){const a=[...S.got].sort((x,y)=>x-y).map(i=>`<p><b>${REC[i][0]}.</b> ${REC[i][1]}</p>`).join('');return a||'<p>Nenhum registro coletado ainda.</p>'}
function fade(cb){$('fade').style.opacity=1;setTimeout(()=>{cb();$('fade').style.opacity=0},470)}
function pause(){if(S.st!=='play')return;S.st='pause';show(`<h2>Pausa</h2>${btn('resume','Continuar')}${btn('restart','Reiniciar fase','s')}${btn('recs','Registros','s')}${btn('newgame','Reiniciar jogo','s')}${btn('menu','Menu','s')}`)}

const ACT={
play(){S.lives=5;S.score=0;S.base=0;S.got=new Set();begin(0)},
cont(){const s=load();if(!s)return;S.lives=5;S.score=S.base=s.score;S.got=new Set(s.got);begin(s.lv)},
ctrl(){show(`<h2>Controles</h2><p><b>A / D</b> ou <b>← →</b>: mover<br><b>Espaço</b>, <b>↑</b> ou <b>W</b>: pular (segure para saltar mais alto)<br><b>P</b> ou <b>Esc</b>: pausar<br>No celular, use os botões na tela.</p><p>Colete os pergaminhos dourados para ler registros históricos. As bandeiras são checkpoints. Cuidado com espinhos, buracos e os espíritos de fogo.</p>${btn('menu','Voltar')}`)},
menu(){L=null;hud();menu()},
resume(){hide();S.st='play'},
restart(){S.lives=5;begin(S.lv)},
newgame(){ACT.play()},
recs(){show(`<h2>Registros coletados</h2>${recList()}${btn('pback','Voltar')}`)},
pback(){S.st='play';pause()},
close(){hide();S.st='play'},
start(){hide();S.st='play'},
next(){S.lives=5;begin(S.lv+1)},
retry(){S.lives=5;begin(S.lv)}};
ov.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(a&&ACT[a])ACT[a](e.target.dataset.v)});
$('bp').onclick=()=>S.st==='play'?pause():S.st==='pause'&&ACT.resume();
$('bm').onclick=()=>{S.snd=!S.snd;hud()};

/* ===== Montagem da fase ===== */
function begin(i){fade(()=>{
 S.lv=i;const d=LV[i];
 d.it.forEach(t=>S.got.delete(t[2]));   // registros da fase voltam a aparecer ao reiniciá-la
 S.score=S.base;
 L={...d,solids:[],mv:d.mv.map(m=>({x:m[0],y:m[1],w:m[2],h:16,v:m[3],r:m[4],s:m[5],x0:m[0],y0:m[1],t:0,mv:1})),
  items:d.it.map(t=>({x:t[0],y:t[1],r:t[2],got:false})),cps:d.cp.map(x=>({x,on:false})),
  sps:d.sp.map(s=>({x:s[0],y:GY-16,w:s[1],h:16})),
  ens:d.en.map(e=>({x:e[0],y:e[1],r:e[2],x0:e[0],t:hsh(e[0])*6}))};
 L.solids=[...d.g.map(s=>({x:s[0],y:GY,w:s[1]-s[0],h:H-GY})),...d.p.map(s=>({x:s[0],y:s[1],w:s[2],h:16})),...L.mv];
 L.spawn={x:60,y:300};
 p={x:60,y:300,w:22,h:32,vx:0,vy:0,face:1,ground:false,on:null,coy:0,inv:0,t:0,cheer:0,sq:0};
 cam=0;parts=[];fts=[];hud();S.st='intro';
 show(`<h2>${d.n}</h2><p>${d.m}</p>${btn('start','Começar')}`);
},0)}
function respawn(){const s=L.spawn;p.x=s.x;p.y=s.y;p.vx=p.vy=0;p.inv=1.8}
function die(){shake=.35;SFX.hit();burst(p.x+11,p.y+16,'#ff6b5e',14);S.lives--;hud();
 if(S.lives<=0){S.st='over';show(`<h2>Fim de jogo</h2><p>Todo caminho tem tropeços. Respire e tente de novo!</p>${btn('retry','Tentar novamente')}${btn('menu','Menu','s')}`)}else respawn()}
function burst(x,y,c,n){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*260,vy:-Math.random()*240,l:.6+Math.random()*.4,c,r:1.6+Math.random()*2.2})}
function floatTxt(x,y,t){fts.push({x,y,t,l:1})}
function finishLevel(){S.st='trans';SFX.win();S.score+=500+S.lives*50;S.base=S.score;
 const last=S.lv===LV.length-1;save(last?0:S.lv+1);hud();
 setTimeout(()=>fade(()=>{
  if(!last)show(`<h2>Fase concluída!</h2><p>Pontos: <b>${S.score}</b> · Registros: <b>${S.got.size}/${NREC}</b></p>${btn('next','Próxima fase')}`);
  else{try{localStorage.removeItem('slc')}catch(e){}
   show(`<h1>Jornada concluída!</h1><p>Você chegou ao Farol da Igualdade com <b>${S.score}</b> pontos e <b>${S.got.size}/${NREC}</b> registros.</p><p>Conhecer a história e a cultura negra é parte de construir um país com mais igualdade, respeito e liberdade. Em 20 de novembro, o Brasil celebra a Consciência Negra, e a luta por valorização e justiça continua com cada um de nós.</p><details><summary>Seus registros</summary>${recList()}</details>${btn('play','Jogar de novo')}${btn('menu','Menu','s')}`)}
 }),900)}

/* ===== Física e lógica (passo fixo de 1/60 s) ===== */
const ov2=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
function step(dt){
 time+=dt;
 for(const m of L.mv){m.t+=dt*m.s;const o=(Math.sin(m.t)+1)/2*m.r,nx=m.v?m.x0:m.x0+o,ny=m.v?m.y0+o:m.y0,dx=nx-m.x,dy=ny-m.y;m.x=nx;m.y=ny;if(p.on===m){p.x+=dx;p.y+=dy}}
 for(const e of L.ens){e.t+=dt*1.2;e.x=e.x0+(Math.sin(e.t)+1)/2*e.r}
 const ax=IN.r-IN.l;if(ax)p.face=ax;
 p.vx+=(ax*SPD-p.vx)*Math.min(1,(ax?16:20)*dt);
 p.coy=p.ground?.1:p.coy-dt;jb-=dt;
 if(jb>0&&p.coy>0){p.vy=-JMP;jb=0;p.coy=0;SFX.jump()}
 if(!IN.j&&p.vy<-240)p.vy=-240;           // pulo variável: soltar a tecla encurta o salto
 p.vy=Math.min(p.vy+GRAV*dt,820);
 p.x+=p.vx*dt;
 for(const s of L.solids)if(ov2(p,s)){p.x=p.x+p.w/2<s.x+s.w/2?s.x-p.w:s.x+s.w;p.vx=0}
 const was=p.ground;p.ground=false;p.on=null;
 p.y+=p.vy*dt;
 for(const s of L.solids)if(ov2(p,s)){if(p.y+p.h/2<s.y+s.h/2){p.y=s.y-p.h;if(p.vy>0)p.vy=0;p.ground=true;if(s.mv)p.on=s}else{p.y=s.y+s.h;if(p.vy<0)p.vy=0}}
 if(p.ground&&!was){burst(p.x+11,p.y+32,'#fff3d6',4);p.sq=.22}
 if(p.ground&&Math.abs(p.vx)>150&&Math.random()<.12)burst(p.x+11,p.y+32,'rgba(255,243,214,.7)',1);
 if(p.x<0){p.x=0;p.vx=0}
 p.t+=Math.abs(p.vx)*dt;p.inv-=dt;p.cheer-=dt;p.sq=Math.max(0,p.sq-dt*1.6);shake=Math.max(0,shake-dt);
 // checkpoints
 for(const c of L.cps)if(!c.on&&p.x>c.x){c.on=true;L.spawn={x:c.x,y:340};SFX.cp();floatTxt(c.x,300,'Checkpoint!')}
 // registros
 for(const it of L.items)if(!it.got&&Math.abs(p.x+11-it.x)<22&&Math.abs(p.y+16-it.y)<28){it.got=true;S.got.add(it.r);S.score+=100;p.cheer=.5;SFX.coin();burst(it.x,it.y,'#f2b632',18);floatTxt(it.x,it.y-20,'+100');hud();
  S.st='read';show(`<small>Registro ${S.got.size}/${NREC}</small><h2>${REC[it.r][0]}</h2><p>${REC[it.r][1]}</p>${btn('close','Continuar')}`)}
 // perigos
 if(p.inv<=0){const b={x:p.x+4,y:p.y+4,w:p.w-8,h:p.h-4};
  for(const s of L.sps)if(ov2(b,s)){die();return}
  for(const e of L.ens)if(ov2(b,{x:e.x-9,y:e.y-9,w:18,h:18})){die();return}}
 if(p.y>560){die();return}
 if(p.x>L.goal){finishLevel();return}
 const tx=Math.max(0,Math.min(L.w-W,p.x-W*.4));cam+=(tx-cam)*Math.min(1,dt*6);
 for(const q of parts){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=900*dt;q.l-=dt}parts=parts.filter(q=>q.l>0);
 for(const f of fts){f.y-=30*dt;f.l-=dt}fts=fts.filter(f=>f.l>0);
}

/* ===== Desenho ===== */
const SC=2,mod=(v,m)=>((v%m)+m)%m;
if(!g.roundRect)g.roundRect=function(x,y,w,h){this.rect(x,y,w,h)};
const R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
const C=(x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill()};
const RR=(x,y,w,h,r,c)=>{g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()};
const GR=(x0,y0,x1,y1,st)=>{const q=g.createLinearGradient(x0,y0,x1,y1);st.forEach((c,i)=>q.addColorStop(i/(st.length-1),c));return q};
const glow=(x,y,r,rgb,a)=>{const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${rgb},${a})`);q.addColorStop(1,`rgba(${rgb},0)`);g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)};
const poly=(pts,c)=>{g.fillStyle=c;g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath();g.fill()};
let shake=0;
const VG=document.createElement('canvas');VG.width=160;VG.height=90;
{const v=VG.getContext('2d'),q=v.createRadialGradient(80,45,28,80,45,95);q.addColorStop(0,'rgba(10,4,24,0)');q.addColorStop(1,'rgba(10,4,24,.55)');v.fillStyle=q;v.fillRect(0,0,160,90)}

function ridge(f,fn,top,bot,mx){g.fillStyle=GR(0,H-mx,0,H,[top,bot]);g.beginPath();g.moveTo(-8,H);for(let x=-8;x<=W+8;x+=8)g.lineTo(x,H-fn(x+cam*f));g.lineTo(W+8,H);g.closePath();g.fill()}
function city(f,minH,varH,col,seed,lit){const o=cam*f,i0=Math.floor(o/56);
 for(let k=0;k<=W/56+1;k++){const i=i0+k,x=i*56-o,h=minH+hsh(i+seed)*varH;
  g.fillStyle=col;g.fillRect(x,H-h,54,h);
  if(lit)for(let r=0;r*14<h-26;r++)for(let c=0;c<4;c++)if(hsh(i*131+r*7+c)>.66){g.fillStyle=hsh(i*17+r+c)>.5?'rgba(255,210,122,.85)':'rgba(240,154,90,.8)';g.fillRect(x+6+c*12,H-h+8+r*14,6,8)}}}
function bunting(){const o=cam*.6,k0=Math.floor(o/160),cols=['#d1453b','#f2b632','#2f9e63','#fff3d6'];
 for(let k=0;k<=W/160+1;k++){const x=(k0+k)*160-o;g.strokeStyle='rgba(26,18,38,.7)';g.lineWidth=1.5;g.beginPath();g.moveTo(x,14);g.quadraticCurveTo(x+80,14+44,x+160,14);g.stroke();
  for(let j=0;j<8;j++){const tt=(j+.5)/8,px=x+160*tt,py=14+88*tt*(1-tt);const w=Math.sin(time*3+j+k)*1.5;poly([[px-6,py],[px+6,py],[px+w,py+15]],cols[((k0+k)*8+j)%4])}}}
function backdrop(th){const t=TH[th];
 g.fillStyle=GR(0,0,0,H,t.sky);g.fillRect(0,0,W,H);
 if(th>0){for(let i=0;i<46;i++){g.globalAlpha=Math.max(0,.35+.55*Math.sin(time*2+i*1.7))*(1-hsh(i+3)*.4);const s=i%5?1.5:2.5;R(hsh(i*3+1)*W,hsh(i*3+2)*H*.5,s,s,'#fff3d6')}g.globalAlpha=1}
 glow(620,120,170,'255,225,160',.55);C(620,120,44,t.sun);C(620,120,34,'rgba(255,255,255,.35)');
 if(th!==1)for(let i=0;i<6;i++){const x=mod(i*230+60-cam*.06-time*7,W+320)-160,y=40+hsh(i+9)*110,s=.8+hsh(i+4)*.7;g.fillStyle='rgba(255,243,214,.22)';for(const [dx,dy,r] of [[0,0,26],[28,6,20],[-28,8,18],[10,-12,18]]){g.beginPath();g.ellipse(x+dx*s,y+dy*s,r*s*1.3,r*s*.8,0,0,7);g.fill()}}
 if(th===0){
  for(let k=0;k<5;k++){const x=mod(k*200-cam*.1,W+300)-150;poly([[x,0],[x+30,0],[x+170,H],[x+110,H]],'rgba(255,240,180,.06)')}
  ridge(.12,x=>150+40*Math.sin(x*.005)+25*Math.sin(x*.013),'#5aa985','#2f7a63',240);
  ridge(.28,x=>110+32*Math.sin(x*.009+1)+14*Math.sin(x*.021),t.far,'#2a6e4f',160);
  ridge(.5,x=>70+26*Math.sin(x*.012+2),t.near,'#1f5a40',100)}
 else if(th===1){
  city(.12,130,150,'#4a3070',3,false);
  g.fillStyle=GR(0,H-190,0,H-30,['rgba(240,154,90,0)','rgba(240,154,90,.22)']);g.fillRect(0,H-190,W,160);
  city(.3,80,120,'#2a1a45',11,true)}
 else{
  ridge(.12,x=>110+(60-Math.abs(mod(x,120)-60))*1.3,'#a03a6a','#7a2a62',200);
  ridge(.32,x=>70+Math.abs(mod(x,80)-40)*1.2,'#7a2a62','#4e1a50',130);
  bunting()}}

/* --- cenário --- */
function tree(o,v){const s=.8+v*.5;g.save();g.translate(o,GY);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,.12)';g.beginPath();g.ellipse(0,0,26,5,0,0,7);g.fill();
 g.fillStyle=GR(-5,0,6,0,['#4a2f1b','#7a5230','#4a2f1b']);g.fillRect(-4,-66,9,66);
 C(0,-80,28,'#1f6e43');C(-16,-60,19,'#25804f');C(18,-58,19,'#25804f');C(0,-60,22,'#2a8c57');
 C(-6,-90,15,'rgba(150,220,120,.35)');C(-18,-66,8,'rgba(150,220,120,.3)');g.restore()}
function bush(o){C(o,GY-8,12,'#2a8c57');C(o+12,GY-6,9,'#25804f');C(o-11,GY-5,8,'#25804f');C(o-3,GY-12,5,'rgba(150,220,120,.3)');C(o-4,GY-12,2,'#f2b632');C(o+8,GY-10,2,'#d1453b')}
function house(o,v){const wc=['#c9784a','#d1a24b','#5a8fb0','#b85a7a'][Math.floor(v*4)%4],h=36;
 g.fillStyle='rgba(0,0,0,.14)';g.beginPath();g.ellipse(o,GY,32,4,0,0,7);g.fill();
 R(o-24,GY-h,48,h,wc);R(o-24,GY-h,48,3,'rgba(255,255,255,.2)');R(o+14,GY-h,10,h,'rgba(0,0,0,.14)');
 poly([[o-30,GY-h],[o,GY-h-20],[o+30,GY-h]],'#5a2f2a');poly([[o,GY-h-20],[o+30,GY-h],[o+6,GY-h]],'rgba(0,0,0,.18)');
 RR(o-4,GY-19,10,19,[5,5,0,0],'#3a1f10');
 for(const wx of [o-18,o+9]){glow(wx+4,GY-h+13,18,'255,210,122',.4);R(wx,GY-h+8,9,10,'#ffd27a');R(wx+4,GY-h+8,1,10,'#7a4a1a');R(wx,GY-h+12.5,9,1,'#7a4a1a')}}
function lamp(o){R(o,GY-76,3,76,'#1a1226');R(o-5,GY-4,13,4,'#1a1226');RR(o-6,GY-86,15,13,3,'#ffd27a');R(o-8,GY-88,19,3,'#1a1226');glow(o+1.5,GY-80,62,'255,210,122',.32+.06*Math.sin(time*3+o))}
function pole(o){R(o,GY-98,4,98,'#1a1226');C(o+2,GY-100,3.5,'#f2b632');const cs=['#d1453b','#f2b632','#2f9e63','#111'];
 cs.forEach((c,i)=>{const y=GY-94+i*12;g.fillStyle=c;g.beginPath();g.moveTo(o+4,y);for(let j=1;j<=6;j++)g.lineTo(o+4+j*5,y+Math.sin(time*5+j*.7+i*.4)*2.4*j/6);for(let j=6;j>=0;j--)g.lineTo(o+4+j*5,y+12+Math.sin(time*5+j*.7+i*.4)*2.4*j/6);g.closePath();g.fill()})}
function drum(o){g.fillStyle='rgba(0,0,0,.16)';g.beginPath();g.ellipse(o,GY,16,3.5,0,0,7);g.fill();
 RR(o-12,GY-26,24,26,4,GR(o-12,0,o+12,0,['#6a3a1f','#a2602f','#6a3a1f']));R(o-12,GY-19,24,3,'#d1453b');R(o-12,GY-9,24,3,'#2f9e63');
 g.fillStyle='#f6d38b';g.beginPath();g.ellipse(o,GY-26,12,4,0,0,7);g.fill();g.strokeStyle='#8a5a3c';g.lineWidth=1;g.stroke()}
function deco(cx){const inG=x=>L.g.some(s=>x>s[0]+30&&x<s[1]-30);
 for(let x=Math.floor(cx/160)*160-160;x<cx+W+200;x+=160){const k=x/160,o=(x+hsh(k)*110)|0,v=hsh(k+50);if(!inG(o))continue;
  if(L.th===0)v>.3?tree(o,v):bush(o);else if(L.th===1)v>.55?lamp(o):house(o,v);else v>.5?pole(o):drum(o)}}

/* --- chão, plataformas, perigos --- */
function ground(s,t,cx){const x0=Math.max(s.x,cx-8),x1=Math.min(s.x+s.w,cx+W+8);
 R(s.x,s.y,s.w,s.h,t.gr);
 g.fillStyle=GR(0,s.y,0,H,['rgba(255,255,255,.06)','rgba(0,0,0,.5)']);g.fillRect(s.x,s.y,s.w,s.h);
 for(let x=Math.floor(x0/26)*26;x<x1;x+=26){const h=hsh(x),w=6+h*8;g.fillStyle='rgba(0,0,0,.16)';g.beginPath();g.ellipse(x+h*16,s.y+22+hsh(x+5)*30,w,w*.55,0,0,7);g.fill()}
 R(s.x,s.y,s.w,9,t.top);
 if(L.th===2){for(let x=s.x+Math.max(0,Math.floor((x0-s.x)/16))*16;x<x1;x+=16)R(x,s.y,8,9,((x-s.x)/16)%2?'#d1453b':'#2f9e63')}
 else if(L.th===1){for(let x=Math.floor(x0/18)*18;x<x1;x+=18)if(x>=s.x)R(x,s.y,1.5,9,'rgba(0,0,0,.25)')}
 R(s.x,s.y,s.w,2.5,'rgba(255,255,255,.3)');R(s.x,s.y+9,s.w,2,'rgba(0,0,0,.28)');
 if(L.th===0)for(let x=Math.floor(x0/7)*7;x<x1;x+=7){if(x<s.x||x>s.x+s.w-4)continue;const h=3+hsh(x*1.3)*5;poly([[x,s.y+1],[x+2,s.y-h],[x+4,s.y+1]],t.top)}
 R(s.x,s.y,2,s.h,'rgba(0,0,0,.25)');R(s.x+s.w-2,s.y,2,s.h,'rgba(0,0,0,.25)')}
function plat(s,t){const m=!!s.mv,cx=s.x+s.w/2;
 g.fillStyle='rgba(0,0,0,.18)';g.fillRect(s.x+3,s.y+16,s.w-6,5);
 g.fillStyle=GR(0,s.y,0,s.y+16,m?['#ffe27a','#f2b632','#b8801a']:[t.pl,t.pl,'#3a2616']);g.beginPath();g.roundRect(s.x,s.y,s.w,16,3);g.fill();
 g.fillStyle=m?'#fff3b0':t.acc;g.beginPath();g.roundRect(s.x,s.y,s.w,5,[3,3,0,0]);g.fill();
 R(s.x+1,s.y+1,s.w-2,1.5,'rgba(255,255,255,.35)');
 if(!m)for(let x=s.x+14;x<s.x+s.w-4;x+=16)R(x,s.y+6,1.5,10,'rgba(0,0,0,.25)');
 if(m){C(s.x+6,s.y+10,1.8,'#7a5210');C(s.x+s.w-6,s.y+10,1.8,'#7a5210');const a='rgba(90,60,10,.7)';
  if(s.v){poly([[cx,s.y+3.5],[cx-4,s.y+8],[cx+4,s.y+8]],a);poly([[cx,s.y+14],[cx-4,s.y+10],[cx+4,s.y+10]],a)}
  else{poly([[cx-7,s.y+10],[cx-2,s.y+6.5],[cx-2,s.y+13.5]],a);poly([[cx+7,s.y+10],[cx+2,s.y+6.5],[cx+2,s.y+13.5]],a)}}}
function spikes(s){R(s.x,GY-3,s.w,3,'#2a1a45');
 for(let x=s.x;x<s.x+s.w;x+=12){poly([[x,GY-2],[x+6,GY-17],[x+12,GY-2]],GR(x,GY-17,x,GY,['#ffffff','#9a90b0']));poly([[x+6,GY-17],[x+12,GY-2],[x+6,GY-2]],'rgba(40,20,80,.28)')}}
function flag(c){const x=c.x,w=Math.sin(time*5)*3;
 if(c.on)glow(x+24,GY-42,46,'242,182,50',.45);
 g.fillStyle=GR(x+8,0,x+12,0,['#f2f2f2','#8f8f9a']);g.fillRect(x+8,GY-52,4,52);C(x+10,GY-54,4,c.on?'#ffe27a':'#aaa');
 g.fillStyle=c.on?'#f2b632':'#8a7f99';g.beginPath();g.moveTo(x+12,GY-50);g.quadraticCurveTo(x+24,GY-46+w,x+36,GY-42+w);g.quadraticCurveTo(x+24,GY-36+w*.6,x+12,GY-34);g.fill()}
function goal(gx){const cy=GY-147,mx=gx+18,wd=y=>30+14*((y-(GY-130))/130);
 glow(mx,cy,110,'255,226,122',.4);
 g.save();g.translate(mx,cy);g.rotate(time*1.1);for(let k=0;k<2;k++){g.fillStyle=GR(0,0,300,0,['rgba(255,226,122,.5)','rgba(255,226,122,0)']);g.beginPath();g.moveTo(0,-4);g.lineTo(300,-36);g.lineTo(300,36);g.lineTo(0,4);g.fill();g.rotate(Math.PI)}g.restore();
 for(let i=0;i<4;i++){const y0=GY-130+i*32.5,y1=y0+32.5;poly([[mx-wd(y0)/2,y0],[mx+wd(y0)/2,y0],[mx+wd(y1)/2,y1],[mx-wd(y1)/2,y1]],i%2?'#d1453b':'#fff3d6')}
 poly([[mx,GY-130],[mx+15,GY-130],[mx+22,GY],[mx,GY]],'rgba(40,20,80,.18)');
 RR(mx-6,GY-26,12,26,[6,6,0,0],'#3a1f10');glow(mx,GY-83,16,'255,226,122',.6);RR(mx-4,GY-90,8,14,4,'#ffe27a');
 R(gx-4,GY-134,44,6,'#2a1948');RR(gx+8,GY-160,20,26,3,'#ffe27a');R(gx+17,GY-160,2,26,'#7a5a1a');
 poly([[gx+4,GY-160],[mx,GY-174],[gx+32,GY-160]],'#d1453b');C(mx,GY-176,3,'#f2b632');glow(mx,cy,40,'255,240,180',.7)}
function scroll(it){const y=it.y+Math.sin(time*4+it.x)*4,x=it.x;
 glow(x,y,34,'255,210,90',.3+.15*Math.sin(time*5+x));
 RR(x-8,y-10,16,20,2,GR(x-8,0,x+8,0,['#e8d4a0','#fff3d6','#e8d4a0']));
 RR(x-11,y-13,22,5,2.5,'#f2b632');RR(x-11,y+8,22,5,2.5,'#d9971a');
 R(x-5,y-5,10,1.5,'#8a5a3c');R(x-5,y-1,10,1.5,'#8a5a3c');R(x-5,y+3,7,1.5,'#8a5a3c');
 const sp=Math.max(0,Math.sin(time*3+x));poly([[x+9,y-16-sp*3],[x+10.5,y-13],[x+14,y-12],[x+10.5,y-11],[x+9,y-8+sp*3],[x+7.5,y-11],[x+4,y-12],[x+7.5,y-13]],'rgba(255,255,255,'+sp+')')}
function fire(e){const f=Math.sin(time*13+e.x)*2,y=e.y,x=e.x;
 glow(x,y,40,'232,102,63',.4);
 for(let i=0;i<4;i++){const a=time*3+i*1.57;C(x+Math.cos(a)*15,y+Math.sin(a)*13,2.6,i%2?'#ffd27a':'#d1453b')}
 g.fillStyle=GR(0,y-22,0,y+12,['#ffb03b','#e8663f','#b02f2f']);g.beginPath();g.moveTo(x,y-22+f);g.bezierCurveTo(x+8,y-10,x+14,y-2,x+12,y+4);g.bezierCurveTo(x+10,y+12,x-10,y+12,x-12,y+4);g.bezierCurveTo(x-14,y-2,x-8,y-10,x,y-22+f);g.fill();
 g.fillStyle=GR(0,y-12,0,y+10,['#fff0b3','#ffd27a']);g.beginPath();g.moveTo(x,y-12+f*.6);g.bezierCurveTo(x+5,y-6,x+8,y,x+6,y+4);g.bezierCurveTo(x+4,y+9,x-4,y+9,x-6,y+4);g.bezierCurveTo(x-8,y,x-5,y-6,x,y-12+f*.6);g.fill();
 C(x-3,y+1,1.8,'#2a1948');C(x+3,y+1,1.8,'#2a1948');C(x-2.5,y+.4,.6,'#fff');C(x+3.5,y+.4,.6,'#fff')}

/* --- personagem --- */
function hero(){if(p.inv>0&&Math.floor(time*20)%2)return;
 const f=p.face,air=!p.ground,run=!air&&Math.abs(p.vx)>25,ox=p.x+11,oy=p.y+32,sq=p.sq||0,k=air?Math.min(.14,Math.abs(p.vy)/5000):0,sx=air?1-k*.7:1+sq*.7,sy=air?1+k:1-sq*.9;
 if(p.ground){g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(ox,oy+1,11,3,0,0,7);g.fill()}
 g.save();g.translate(ox,oy);g.scale(f*sx*.9,sy*.9);
 const sw=run?Math.sin(p.t*.2):0,ch=p.cheer>0,bob=run?Math.abs(Math.sin(p.t*.2))*1.5:0;
 g.translate(0,-bob);
 const leg=(a,c)=>{g.save();g.translate(0,-10);g.rotate(a);RR(-2.4,0,4.8,8,2,c);RR(-3,6.5,8,4.5,2,'#4a2f1b');g.restore()};
 const arm=(a,c)=>{g.save();g.translate(0,-20);g.rotate(a);RR(-2,-1,4,10,2,c);C(0,9.5,2.3,'#8a5a3c');g.restore()};
 leg(air?-.7:-sw*.9,'#1f1238');arm(ch?2.7:air?2.4:-sw*.9+.1,'#74492f');
 const w=Math.sin(time*9)*1.6-(run?2:0);g.fillStyle='#d1453b';g.beginPath();g.moveTo(-4,-22);g.quadraticCurveTo(-11,-24+w,-17,-20+w*1.4);g.lineTo(-16,-16+w*1.4);g.quadraticCurveTo(-10,-19+w,-4,-18.5);g.fill();
 RR(-6,-22,12,13,4,GR(0,-22,0,-9,['#ffd35c','#e6a21e']));R(-6,-13,12,2,'#2f9e63');R(-6,-11,12,1.2,'#d1453b');
 RR(-6.8,-23.5,13.6,4.5,2.2,'#d1453b');
 leg(air?.5:sw*.9,'#2a1948');arm(ch?-2.8:air?-2.4:sw*.9+.1,'#8a5a3c');
 C(0,-27,8.5,'#1b1226');
 g.fillStyle=GR(0,-33,0,-18,['#9a6642','#7a4c30']);g.beginPath();g.ellipse(2,-25.5,6,6.6,0,0,7);g.fill();
 C(-4,-33,4,'#1b1226');C(1.5,-34.5,4.5,'#1b1226');C(6.5,-32,3.8,'#1b1226');C(-8,-29,3.6,'#1b1226');
 g.fillStyle='#fff';g.beginPath();g.ellipse(4.6,-26,2,2.4,0,0,7);g.fill();C(5.3,-25.8,1.2,'#1b1226');
 g.strokeStyle='#3a1f10';g.lineWidth=1.1;g.lineCap='round';g.beginPath();g.arc(3.8,-23.2,2.6,.25,Math.PI-.7);g.stroke();
 g.restore()}

/* --- quadro --- */
function draw(){
 g.setTransform(SC,0,0,SC,0,0);g.globalAlpha=1;
 const t=TH[L.th],cx=Math.round(cam*SC)/SC,sh=shake>0?(Math.random()-.5)*shake*14:0;
 backdrop(L.th);
 g.save();g.translate(-cx+sh,sh*.6);
 g.fillStyle=GR(0,GY,0,H,['rgba(8,3,18,0)','rgba(8,3,18,.9)']);g.fillRect(cx-8,GY,W+16,H-GY);
 deco(cx);
 for(const s of L.solids){if(s.x>cx+W||s.x+s.w<cx)continue;if(s.h>20)ground(s,t,cx);else plat(s,t)}
 for(const s of L.sps)if(s.x<cx+W&&s.x+s.w>cx)spikes(s);
 for(const c of L.cps)flag(c);
 goal(L.goal);
 for(const it of L.items)if(!it.got)scroll(it);
 for(const e of L.ens)fire(e);
 hero();
 for(const q of parts){g.globalAlpha=Math.max(0,Math.min(1,q.l*2.2));g.fillStyle=q.c;g.beginPath();g.arc(q.x,q.y,q.r||2.2,0,7);g.fill()}
 g.globalAlpha=1;g.font='bold 20px Georgia';g.textAlign='center';g.lineWidth=4;g.lineJoin='round';g.strokeStyle='rgba(18,10,34,.8)';
 for(const f of fts){g.globalAlpha=Math.max(0,Math.min(1,f.l*1.5));g.strokeText(f.t,f.x,f.y);g.fillStyle='#fff3d6';g.fillText(f.t,f.x,f.y)}
 g.globalAlpha=1;g.restore();
 g.drawImage(VG,0,0,W,H)}
function drawMenuBg(){g.setTransform(SC,0,0,SC,0,0);g.globalAlpha=1;backdrop(1);
 g.fillStyle=GR(0,GY,0,H,['#33233f','#150c22']);g.fillRect(0,GY,W,H-GY);R(0,GY,W,9,'#8a5a3c');R(0,GY,W,2.5,'rgba(255,255,255,.3)');g.drawImage(VG,0,0,W,H)}

let last=0,acc=0;
function loop(ts){const dt=Math.min(.05,(ts-last)/1000||0);last=ts;
 if(S.st==='play'){acc+=dt;while(acc>=1/60){acc-=1/60;if(S.st==='play')step(1/60)}}else{acc=0;time+=dt}
 L?draw():(cam+=dt*16,drawMenuBg());requestAnimationFrame(loop)}

/* ===== Entrada ===== */
const K={ArrowLeft:'l',a:'l',A:'l',ArrowRight:'r',d:'r',D:'r',ArrowUp:'j',w:'j',W:'j',' ':'j'};
addEventListener('keydown',e=>{const k=K[e.key];
 if(k){if(S.st==='play')e.preventDefault();if(k==='j'&&!IN.j&&!e.repeat)jb=.1;IN[k]=1}
 if(e.key==='p'||e.key==='P'||e.key==='Escape'){S.st==='play'?pause():S.st==='pause'&&ACT.resume()}});
addEventListener('keyup',e=>{const k=K[e.key];if(k)IN[k]=0});
addEventListener('blur',()=>{IN.l=IN.r=IN.j=0});
[['tl','l'],['tr','r'],['tj','j']].forEach(([id,k])=>{const b=$(id);
 b.addEventListener('pointerdown',e=>{e.preventDefault();if(k==='j')jb=.1;IN[k]=1});
 ['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>IN[k]=0))});
/* ===== Tela cheia (trava em paisagem quando o aparelho permite) ===== */
const de=document.documentElement,fsOK=!!(de.requestFullscreen||de.webkitRequestFullscreen);
function toggleFS(){const d=document;
 if(d.fullscreenElement||d.webkitFullscreenElement){try{(d.exitFullscreen||d.webkitExitFullscreen).call(d)}catch(e){}try{screen.orientation.unlock()}catch(e){}return}
 try{const r=(de.requestFullscreen||de.webkitRequestFullscreen).call(de);Promise.resolve(r).then(()=>screen.orientation&&screen.orientation.lock?screen.orientation.lock('landscape'):0).catch(()=>{})}catch(e){}}
ACT.fs=toggleFS;$('bf').onclick=toggleFS;if(!fsOK)$('bf').style.display='none';
['bp','bm','bf'].forEach(i=>$(i).addEventListener('click',()=>$(i).blur()));
hud();menu();requestAnimationFrame(loop);
})();

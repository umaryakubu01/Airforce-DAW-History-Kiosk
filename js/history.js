(function(){'use strict';
const data=window.NAF_HISTORY,main=document.getElementById('history-main'),footer=document.getElementById('history-footer');
if(!data||!main)return;
const params=new URLSearchParams(location.search),isEras=location.pathname.endsWith('eras.html');
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(url,label)=>`<a class="btn" href="${esc(url)}">${esc(label)}</a>`;
const eraById=id=>data.eras.find(era=>era.id===id);
const sourceNote=`${esc(data.source.title)} · ${esc(data.source.asOf)}`;
function photo(image){return image?`<figure class="history-photo"><img src="${esc(image.src)}" alt="${esc(image.caption)}"><figcaption>${esc(image.caption)}</figcaption></figure>`:''}
function review(event){return event.review?`<aside class="review-note"><strong>Source review required</strong>${esc(event.review)}</aside>`:''}
function description(event){return `<p class="event-description">${esc(event.description||'No separate description is supplied in the reference document.')}</p>${review(event)}`}
function heading(label,title){return `<div class="history-heading"><div><div class="eb">${esc(label)}</div><h1>${esc(title)}</h1></div></div>`}
function bindImageFallbacks(){main.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;const figure=img.closest('figure');if(figure){const note=document.createElement('p');note.className='source-note';note.textContent='Photograph unavailable';figure.append(note)}},{once:true}))}
if(isEras){
 const selected=eraById(params.get('era'));
 if(!selected){
  document.title='Six eras · Nigerian Air Force history';
  main.innerHTML=heading('Nigerian Air Force · 1961–2026','Six eras of Nigerian airpower')+`<div class="era-grid">${data.eras.map((era,i)=>`<a class="gl era-card" href="eras.html?era=${era.id}" style="--reveal-delay:${i*65}ms" aria-label="${esc(era.period+' — '+era.title)}"><figure><img src="${esc(era.image.src)}" alt="${esc(era.image.caption)}"></figure><div class="era-period"><span>${era.period}</span><span class="era-open">Explore era ›</span></div><h2>${esc(era.title)}</h2><p class="era-summary">${esc(era.summary)}</p></a>`).join('')}</div>`;
  footer.innerHTML=link('index.html','Welcome')+'<span class="foot-note">Select an era to explore its history</span>'+link('timeline.html?section=department','Departmental history')+link('timeline.html','View Timeline');
 }else{
  const events=data.events.filter(event=>event.eraId===selected.id);
  document.title=selected.title+' · Nigerian Air Force history';
  main.innerHTML=heading(selected.period,selected.title)+`<div class="details-layout"><aside class="gl era-introduction"><p>${esc(selected.introduction)}</p>${photo(selected.image)}<div class="source-note">${events.length} documented events<br>${sourceNote}</div><div class="source-note">${esc(data.source.ordering)}</div></aside><section class="event-scroll" tabindex="0" aria-label="Chronological events">${events.map(event=>`<article class="gl event-entry" data-event-id="${event.id}"><div class="event-date">${esc(event.date)}</div><h2>${esc(event.title)}</h2>${description(event)}${photo(event.image)}</article>`).join('')}</section></div>`;
  footer.innerHTML=link('eras.html','Back to Eras')+`<span class="foot-note">${events.length} events · ${selected.period}</span>`+link('timeline.html?era='+selected.id,'View Timeline');
 }
 bindImageFallbacks();return;
}
// Old milestone bookmarks retain access to the original departmental brief.
if(params.has('m')&&!params.has('era')&&!params.has('event')&&!params.has('section')){location.replace('timeline-no-photo.html?m='+encodeURIComponent(params.get('m')));return}
const department=params.get('section')==='department',collection=department?data.department.events:data.events;
let era=department?'':(eraById(params.get('era'))?.id||''),category='',active=params.get('event');
const categories=[...new Set(collection.map(e=>e.category))];
main.innerHTML=heading(department?'AFCSC Jaji · Departmental history':'Nigerian Air Force · 1961–2026',department?'Department of Air Warfare':'Explore the timeline')+
 `<div class="history-toolbar">${department?'':`<label for="era-filter">Era<select id="era-filter"><option value="">All eras</option>${data.eras.map(e=>`<option value="${e.id}">${e.period} · ${esc(e.title)}</option>`).join('')}</select></label>`}<label for="category-filter">Category<select id="category-filter"><option value="">All categories</option>${categories.map(c=>`<option>${esc(c)}</option>`).join('')}</select></label><a class="scope-link" href="${department?'timeline.html':'timeline.html?section=department'}">${department?'Nigerian Air Force history':'Departmental history'} ›</a></div><div class="timeline-layout"><ol class="event-scroll event-list" aria-label="Historical events"></ol><section class="gl event-scroll timeline-detail" tabindex="0" aria-label="Selected historical event"></section></div>`;
footer.innerHTML=link('eras.html','Back to Eras')+`<button class="btn" id="history-previous">Previous</button><span class="foot-note" id="history-position" role="status"></span><button class="btn" id="history-next">Next</button>`+(department?link('overview.html','Departmental brief'):link('eras.html'+(era?'?era='+era:''),'Era details'));
const list=main.querySelector('.event-list'),detail=main.querySelector('.timeline-detail'),eraFilter=document.getElementById('era-filter'),categoryFilter=document.getElementById('category-filter');
let filtered=[];
function render(){
 filtered=collection.filter(e=>(!era||e.eraId===era)&&(!category||e.category===category));
 if(!filtered.some(e=>e.id===active))active=filtered[0]?.id;
 list.innerHTML=filtered.map(e=>`<li><button type="button" data-event-id="${e.id}" aria-pressed="${e.id===active}"><span>${esc(e.date)}</span>${esc(e.title)}</button></li>`).join('');
 list.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{active=button.dataset.eventId;select()}));
 select();list.querySelector('[aria-pressed=true]')?.scrollIntoView({block:'nearest'});
}
function select(){
 const event=filtered.find(e=>e.id===active),index=filtered.indexOf(event);
 list.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.eventId===active)));
 detail.innerHTML=event?`<div class="event-date">${esc(event.date)}</div><h2>${esc(event.title)}</h2>${description(event)}${photo(event.image)}${department?`<p class="source-note">${esc(data.department.introduction)}</p>`:''}<p class="source-note">${sourceNote}${event.location?' · '+esc(event.location):''}</p>`:'<p class="empty-state">No events match these filters. Select another category or era.</p>';
 detail.scrollTop=0;
 detail.classList.remove('content-refresh');requestAnimationFrame(()=>detail.classList.add('content-refresh'));
 document.getElementById('history-position').textContent=event?`EVENT ${index+1} / ${filtered.length}`:'No matching events';
 ['history-previous','history-next'].forEach(id=>document.getElementById(id).disabled=filtered.length<2);
 const query=new URLSearchParams();if(department)query.set('section','department');if(era)query.set('era',era);if(category)query.set('category',category);if(active)query.set('event',active);
 history.replaceState(null,'','timeline.html'+(query.size?'?'+query:''));
 if(!department){const a=footer.querySelector('a:last-child');a.href='eras.html'+(era?'?era='+era:'')}
 bindImageFallbacks();
}
function step(direction){if(!filtered.length)return;const index=filtered.findIndex(e=>e.id===active);active=filtered[(index+direction+filtered.length)%filtered.length].id;select();list.querySelector('[aria-pressed=true]')?.scrollIntoView({block:'nearest'})}
if(eraFilter){eraFilter.value=era;eraFilter.onchange=()=>{era=eraFilter.value;render()}}
category=categories.includes(params.get('category'))?params.get('category'):'';categoryFilter.value=category;categoryFilter.onchange=()=>{category=categoryFilter.value;render()};
document.getElementById('history-previous').onclick=()=>step(-1);document.getElementById('history-next').onclick=()=>step(1);
document.title=department?'Departmental history · Timeline':'Nigerian Air Force · Timeline';render();
})();

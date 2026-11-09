const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync('js/history-data.js','utf8'), context);
const data = context.window.NAF_HISTORY;
const expected = [
 ['1961–1971','Birth in a Time of War'],['1972–1982','Building the Force'],
 ['1983–1993','Jaguars and Expeditions'],['1994–2004','Peacekeeping and Renewal'],
 ['2005–2015','Rebuilding the Fleet'],['2016–2026','A Force Reborn']
];
assert.deepEqual(JSON.parse(JSON.stringify(data.eras.map(e=>[e.period,e.title]))),expected);
const ids = new Set();
for(const list of [data.events,data.department.events]){
 let previous=0;
 for(const event of list){
  assert(!ids.has(event.id));ids.add(event.id);
  assert(event.sortKey>=previous,'Chronological ordering: '+event.id);previous=event.sortKey;
  assert(event.sourceParagraphs.length>0);
  assert(event.title&&event.date);
  if(event.image)assert(fs.existsSync(event.image.src),event.image.src);
 }
}
for(const era of data.eras){
 assert(fs.existsSync(era.image.src));
 const events=data.events.filter(e=>e.eraId===era.id);
 assert(events.length>0);
 assert(events.every(e=>e.year>=era.start&&e.year<=era.end));
}
assert(data.department.events.every(e=>!e.eraId));
for(const year of [1977,1979,1999,2002,2026])assert(data.department.events.some(e=>e.year===year));
for(const term of ['L-39 replaces','Akin Dada','Femi John Femi','Oladayo Isiaka Amao'])assert(data.events.find(e=>e.title.includes(term)).review);
assert(data.events.find(e=>e.title==='Full Air Force rank structure adopted').description==='');
assert(data.events.some(e=>e.title==='First overseas combat deployment with ECOMOG'));
assert(data.events.some(e=>e.title==='ECOMOG air operations over Sierra Leone'));
console.log(`PASS: six exact eras; ${data.events.length} chronological NAF events; ${data.department.events.length} separate departmental events; source/review metadata and image paths.`);

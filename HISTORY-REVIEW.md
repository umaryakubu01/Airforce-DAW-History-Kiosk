# Historical source and review notes

Source: `NIGERIAN AIR FORCE HISTORY .docx`, internal title **NIGERIAN AIR FORCE HISTORY — REFERENCE CONTEXT**, November 2026. Read from the user’s Downloads folder. No web sources were used to overwrite it.

## Dataset and boundaries

- `js/history-data.js` is the shared source for the six NAF eras, their details, the NAF timeline and a separate departmental view.
- 116 NAF entries: 107 distinct main-timeline headings plus nine dated entries from the document’s leadership profiles and aircraft catalogue. Repeated identical headings are displayed once; the two distinct AFIT entries remain.
- Seven departmental entries are transcribed separately. The undated courses description is stored separately from the chronological entries.
- Original dates, event titles and descriptions are retained, including source spelling and outdated wording. Concise era-card summaries are editorial summaries of the reference.
- `sourceParagraphs` uses one-based numbering of non-empty Word paragraphs. `sourceSection` identifies supplementary entries.
- Sorting uses stated year, then stated month/day, without supplying missing dates. Year-only dates precede precise dates within that year; equal dates retain source order.
- The original ten-event departmental brief remains available through `overview.html` and `timeline-no-photo.html`. Old `timeline.html?m=…` bookmarks are forwarded there. Its data in `js/data.js` is unchanged.

## Photographs

Existing local aircraft photographs illustrate relevant aircraft types. Captions explicitly distinguish these from photographs of the dated events; no new images were generated or historical images invented. Many events have no event-specific photograph and therefore show the source text without an unrelated image. The supplied MiG-21 photograph is low resolution. The A-29 photograph is an aircraft-type reference rather than evidence of a Nigerian induction ceremony.

## Items requiring source review

- **1962 — Third batch of cadets train in India** (naf-46): The source dates this third batch to 1962, before its second batch in February 1963. Original dates retained; sequence needs review.
- **1962 — Fourth batch of cadets train in Germany** (naf-52): The source dates this fourth batch to 1962, before its second batch in February 1963. Original dates retained; sequence needs review.
- **June 1962 — First batch of cadets train in Ethiopia** (naf-42): The source lists the third and fourth cadet batches in 1962 but the second in February 1963. Original dates retained; batch sequence needs review.
- **1964 — The first-generation aircraft arrive** (naf-60): The timeline includes Nord Noratlas among the 1964 assets; the aircraft catalogue gives entry into service as 1965. Both source dates require review.
- **19 Jan 1966 — George T Kurubo, the first indigenous Commander** (naf-82): The narrative gives Kurubo’s departure as 12 August 1967; the leadership list gives 5 August 1967. Dates retained for review.
- **17 December 1969 — Brigadier Emmanuel E Ikwue appointed Fifth Commander** (naf-109): The timeline gives appointment on 17 December 1969 and departure on 28 July 1975; the leadership list gives 18 December 1969 and 29 July 1975.
- **15 January 1970 — The Civil War ends** (naf-111): The source refers to an equipment-damage inventory, but supplies no inventory in this entry.
- **1 April 1976 — Full Air Force rank structure adopted** (naf-126): The source repeats this heading and provides no separate description. It is displayed once.
- **1984 — L-39 replaces the L-29 Delfin** (naf-154): The source dates L-39 replacement of the L-29 to 1984, but also records purchase in December 1986. Both dates retained for review.
- **01 January 1984 — Air Marshal Ibrahim Mahmud Alfa appointed Eighth Chief of the Air Staff** (naf-145): The 1984 entry uses the rank Air Marshal; the source separately dates the first promotion to Air Marshal to 1 October 1987. Historical rank wording needs review.
- **December 1986 — MB-339AN trainers at Calabar; L-39 Albatros purchased** (naf-150): The source dates the L-39 purchase to December 1986 here, but records replacement of the L-29 in 1984. The aircraft catalogue says only “1980s”.
- **1990 — Air Marshal Nuraini Oladimeji Yussuff appointed Ninth Chief of the Air Staff** (naf-168): The narrative gives retirement on 30 January 1992; the leadership list gives 1 February 1992.
- **31 January 1992 — Air Marshal Akin Dada appointed Tenth Chief of the Air Staff** (naf-170): The timeline gives 31 January 1992–16 September 1993; the leadership list gives 1 February 1992–17 September 1992.
- **17 September 1993 — AVM Femi John Femi appointed Eleventh Chief of the Air Staff** (naf-175): The timeline gives appointment on 17 September 1993; the leadership list and profile give 17 September 1992. Departure is 29 March 1996 here and 30 March 1996 in the list.
- **29 May 1999 — Air Marshal Isaac Mohammed Alfa appointed Thirteenth Chief of the Air Staff** (naf-185): The narrative gives retirement on 23 April 2001; the leadership list gives 24 April 2001.
- **24 April 2001 — Air Marshal Jonah Domfa Wuyep appointed Fourteenth Chief of the Air Staff** (naf-190): The narrative gives retirement on 31 May 2006; the leadership list gives 1 June 2006.
- **2005 — $251 million approved for 15 Chengdu F-7 fighters** (naf-194): The source total is $251 million, while its stated $220 million and $32 million components sum to $252 million. Figures retained for review.
- **01 June 2006 — Air Marshal Paul Dike appointed Fifteenth Chief of the Air Staff** (naf-196): The narrative gives appointment as Chief of Defence Staff on 19 August 2008; the next entry and profile give 20 August 2008.
- **12 March 2008 — 320 TTG becomes the Air Force Institute of Technology** (naf-201): The reference has two distinct AFIT entries on 12 March 2008. Both descriptions are preserved.
- **12 March 2008 — AFIT is established** (naf-203): The reference has two distinct AFIT entries on 12 March 2008. Both descriptions are preserved.
- **20 August 2008 — Air Marshal Oluseyi Petinrin appointed Sixteenth Chief of the Air Staff** (naf-207): The narrative gives departure on 18 September 2010; the leadership list gives 8 September 2010.
- **19 September 2010 — Air Marshal MD Umar appointed Seventeenth Chief of the Air Staff** (naf-217): The timeline gives appointment on 19 September 2010 and retirement on 3 October 2012; the leadership list gives 8 September 2010–4 October 2012.
- **16 January 2014 — Air Marshal Adesola Nunayon Amosu appointed Nineteenth Chief of the Air Staff** (naf-226): The timeline gives appointment on 16 January 2014 and retirement on 12 July 2015; the leadership list gives 20 January 2014–21 July 2015.
- **13 July 2015 — Air Marshal Sadique Baba Abubakar appointed Twentieth Chief of the Air Staff** (naf-232): The timeline gives appointment on 13 July 2015 and retirement on 25 January 2021; the leadership list gives 21 July 2015–29 January 2021.
- **26 January 2021 — Air Marshal Oladayo Isiaka Amao appointed Twenty-first Chief of the Air Staff** (naf-269): The timeline gives appointment on 26 January 2021 and says “till date”; the leadership list gives 29 January 2021–22 June 2023. The quoted wording is outdated within this source.
- **26 February 1979 — The Air Faculty** (department-582): The reference heading says “The Air Faculty”; its description specifically concerns the Junior Course. The earlier departmental brief separately dates Air Faculty establishment to 16 March 1978.

These notes expose source differences; they do not resolve them. Date disagreements may reflect announcement versus tenure dates, but that interpretation is not silently assumed.

## Verification

- `node tests/history-data.test.cjs`: exact era titles/periods, chronological ordering, separate departmental entries, review flags and all image paths passed.
- `node --check js/history-data.js`, `node --check js/history.js`, `node --check js/app.js`: passed.
- Every transcribed main-timeline and departmental date, title and description was compared with the Word source paragraphs and matched exactly.
- Offline headless Chrome: all six era/detail/timeline journeys, combined filters and reload, original brief/bookmarks, keyboard/touch emulation, reduced motion, 1920×1080 layout and 1280×720 bounds passed. No card overflow, summary overflow, failed local requests or JavaScript errors were detected.
- Welcome silent autoplay/loop, film playback and gallery filtering/enlargement passed. Protected Welcome/Films/Archives HTML and existing data were confirmed unchanged by hashes.
- No package manifest or build step exists. Physical Windows/Edge kiosk validation and long-duration testing were not performed.

# languages — translations

## Purpose

One flat JSON object per language: `"key": "text"`. `en.json` is the English the game loads;
`English.json` is the reference copy.

## Ownership

Vendor files plus port-added `Hindi.json` (Hinglish) and `Bengali.json` (Banglish) — romanized,
chat-style text, not native script.

## Local Contracts

- No file may contain a key that `English.json` lacks.
- `en.json`, `English.json`, `Hindi.json`, `Bengali.json` are complete (all 1761 keys); keep them so.
  Many vendor files are partial (e.g. `Georgian.json` has 30 keys) — that is shipped state, not a bug to fix unasked.
- Keep `{placeholder}` tokens (e.g. `{day}`) and HTML tags exactly as in English.
- `Hindi.json` style: casual modern Hinglish (Roman letters, "aap"). Words Indians say in English stay
  English (Rent, Building, Computer, Employee, Salary, Cancel, Confirm); Hindi only for glue words
  (hai, ka, mein, nahi, karo). No formal/Sanskritised words (karmchari, kiraya, imarat, radd).
- `Bengali.json` style: same rule in casual Banglish ("tumi"); glue words only (ache, na, er, koro,
  hobe). No formal words (karmochari, bhara, bhaban, batil, nishchit koro, biniyogkari, obosor).
- File names are referenced by path from `Database.languages` in `../dest/game.min.js`; do not rename.
  A new file must also be added to that list in BOTH `../dest/game.min.js` and `../dest/worker.min.js`
  to appear in-game.
- UTF-8, 2-space indent, valid JSON (no trailing commas, no comments).

## Work Guidance

- Edit values only. Add or remove keys only together with the English source.

## Verification

```bash
cd resources/app && node -e 'const fs=require("fs");const e=Object.keys(JSON.parse(fs.readFileSync("languages/English.json")));for(const f of fs.readdirSync("languages").filter(f=>f.endsWith(".json"))){const k=new Set(Object.keys(JSON.parse(fs.readFileSync("languages/"+f))));const es=new Set(e),extra=[...k].filter(x=>!es.has(x)),miss=e.filter(x=>!k.has(x));if(extra.length||(["en.json","English.json","Hindi.json","Bengali.json"].includes(f)&&miss.length))console.log(f,"extra",extra.length,"missing",miss.length)}'
```

No output = pass. Then pick the language in-game and check the changed screen.

## Child DOX Index

None.

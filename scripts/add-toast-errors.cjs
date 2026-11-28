const fs = require('fs');
const path = require('path');

function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) r = r.concat(walk(p));
    else if (/\.(js|jsx|ts|tsx)$/.test(f)) r.push(p);
  }
  return r;
}

const files = walk('app');
let changed = 0;
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  if (!/catch\s*\([^)]*\)\s*\{[\s\S]*?console\.error/.test(c)) continue;
  if (/toast\.error\(/.test(c)) continue;

  if (!/from\s+["']sonner["']/.test(c)) {
    const lines = c.split(/\r?\n/);
    let idx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^import\s/.test(lines[i])) idx = i;
    }
    const imp = 'import { toast } from "sonner";';
    if (idx >= 0) lines.splice(idx + 1, 0, imp);
    else lines.unshift(imp);
    c = lines.join('\n');
  }

  c = c.replace(/catch\s*\(([^)]*)\)\s*\{([\s\S]*?)\}/g, (m, arg, body) => {
    if (!/console\.error/.test(body) || /toast\.error\(/.test(body)) return m;
    const errVar = arg.trim() || 'error';
    const msgExpr = `${errVar}?.response?.data?.message || ${errVar}?.response?.data?.error || ${errVar}?.message || "Something went wrong"`;
    const toastLine = `\n      toast.error(${msgExpr});`;
    if (/console\.error\([^\n]*\);?/.test(body)) {
      body = body.replace(/(console\.error\([^\n]*\);?)/, `$1${toastLine}`);
    } else {
      body = body + toastLine;
    }
    return `catch (${arg}) {${body}}`;
  });

  fs.writeFileSync(f, c, 'utf8');
  changed++;
  console.log(f);
}
console.log('changed', changed);

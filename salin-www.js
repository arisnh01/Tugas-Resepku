// Menyalin berkas web ke folder www/ (dibaca Capacitor saat membuat APK)
const fs = require('fs');
fs.rmSync('www', { recursive: true, force: true });
fs.mkdirSync('www');
for (const f of ['index.html','style.css','app.js','app-config.js','apple-touch-icon.png','manifest.webmanifest','sw.js','icons','img',...fs.readdirSync('.').filter(f => f.endsWith('.jpg'))]) {
  if (fs.existsSync(f)) fs.cpSync(f, 'www/' + f, { recursive: true });
}
console.log('Berkas web disalin ke www/');

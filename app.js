/* ResepKu - logika aplikasi (JavaScript murni, tanpa backend) */

/* ===== 1. DATA ===== */
const KAT = [['Nasi','🍚'],['Mie','🍜'],['Ayam','🍗'],['Daging','🥩'],['Sayur','🥦'],['Ikan','🐟'],['Telur','🥚'],['Camilan','🍘']];
const emo = k => (KAT.find(x => x[0] === k) || [0,'🍽️'])[1];

// Pembuat resep bawaan. Bahan & langkah dipisah dengan tanda |
const R = (id,nama,kat,jenis,waktu,porsi,rating,emoji,berkas,bahan,langkah,desk='',ko='') =>
  ({id,nama,kat,jenis,waktu,porsi,rating,emoji,foto:'./'+berkas+'.jpg',bahan:bahan.split('|'),langkah:langkah.split('|'),desk,ko:ko?ko.split('/'):[],bawaan:true});

// 8 resep bawaan (tidak bisa diedit/dihapus)
const BAWAAN = [
 R('b1','Nasi Goreng','Nasi','Makanan',20,2,4.8,'🍳','nasi-goreng','2 piring nasi putih|2 butir telur|3 siung bawang putih|2 sdm kecap manis|1 sdt garam|Minyak secukupnya','Panaskan minyak, tumis bawang putih hingga harum.|Masukkan telur, orak-arik hingga matang.|Tambahkan nasi, kecap manis, dan garam, lalu aduk rata.|Masak 3 menit lagi, sajikan selagi hangat.'),
 R('b2','Mie Goreng','Mie','Makanan',15,2,4.5,'🍜','mie-goreng','2 bungkus mie telur|3 siung bawang putih|1 ikat sawi hijau|2 sdm kecap manis|1 sdm saus tiram','Rebus mie hingga setengah matang, lalu tiriskan.|Tumis bawang putih hingga harum, masukkan sawi.|Masukkan mie, kecap manis, dan saus tiram.|Aduk rata hingga matang, lalu sajikan.'),
 R('b3','Ayam Geprek','Ayam','Makanan',30,2,4.8,'🍗','ayam-geprek','500 gr ayam potong|Tepung bumbu secukupnya|10 buah cabai rawit|3 siung bawang putih|1 sdt garam','Lumuri ayam dengan tepung bumbu.|Goreng ayam hingga keemasan dan renyah.|Ulek cabai, bawang putih, dan garam.|Geprek ayam di atas sambal, sajikan hangat.'),
 R('b4','Seblak','Camilan','Makanan',25,2,4.4,'🌶️','seblak','10 buah kerupuk mentah|3 buah cabai merah|2 siung bawang putih|1 butir telur|1 sdt kencur','Rendam kerupuk dalam air hangat hingga lunak.|Haluskan cabai, bawang putih, dan kencur, lalu tumis.|Tambahkan air dan telur, masak hingga mendidih.|Masukkan kerupuk, masak 3 menit, sajikan.'),
 R('b5','Telur Balado','Telur','Makanan',20,3,4.7,'🥚','telur-balado','4 butir telur rebus|8 buah cabai merah|4 siung bawang merah|2 siung bawang putih|1 sdt garam','Goreng telur rebus hingga kulitnya kecokelatan.|Haluskan cabai, bawang merah, dan bawang putih.|Tumis bumbu halus hingga harum, beri garam.|Masukkan telur, aduk rata, sajikan.'),
 R('b6','Capcay','Sayur','Makanan',20,3,4.5,'🥦','capcay','1 buah wortel|100 gr kembang kol|1 ikat sawi hijau|3 siung bawang putih|2 sdm saus tiram','Potong semua sayuran sesuai selera.|Tumis bawang putih hingga harum.|Masukkan wortel dan kembang kol, masak 3 menit.|Tambahkan sawi dan saus tiram, aduk sebentar.'),
 R('b7','Es Teh','Camilan','Minuman',5,2,4.6,'🧊','es-teh','2 kantong teh celup|500 ml air panas|3 sdm gula pasir|Es batu secukupnya','Seduh teh celup dengan air panas selama 3 menit.|Angkat teh celup, larutkan gula hingga rata.|Dinginkan sebentar.|Tuang ke gelas berisi es batu, sajikan.'),
 R('b8','Pisang Goreng','Camilan','Makanan',20,4,4.6,'🍌','pisang-goreng','5 buah pisang kepok|150 gr tepung terigu|50 gr tepung beras|1 sdm gula pasir|Minyak untuk menggoreng','Campur tepung terigu, tepung beras, gula, dan air hingga kental.|Celupkan pisang ke dalam adonan.|Goreng di minyak panas hingga keemasan.|Tiriskan dan sajikan hangat.'),
 // ---- Resep tambahan (revisi 1) ----
 R('b9','Rendang Daging','Daging','Makanan',120,4,4.9,'🥩','rendang','500 gr daging sapi|400 ml santan kental|6 siung bawang merah|4 siung bawang putih|5 buah cabai merah|2 lembar daun jeruk|1 batang serai|1 sdt garam','Haluskan bawang merah, bawang putih, dan cabai.|Tumis bumbu halus bersama serai dan daun jeruk hingga harum.|Masukkan daging, aduk hingga berubah warna.|Tuang santan, masak api kecil sambil sesekali diaduk.|Masak sekitar 2 jam hingga kuah menyusut dan daging empuk.','Daging sapi dimasak pelan dengan santan dan rempah hingga kering dan gurih.','Makanan Indonesia'),
 R('b10','Soto Ayam','Ayam','Makanan',45,4,4.7,'🍲','soto-ayam','500 gr ayam|1,5 liter air|4 siung bawang putih|1 sdt kunyit bubuk|2 lembar daun jeruk|2 butir telur rebus|Bawang goreng dan seledri','Rebus ayam hingga empuk, angkat dan suwir.|Tumis bawang putih dan kunyit, masukkan ke kaldu.|Tambahkan daun jeruk dan garam, didihkan.|Sajikan suwiran ayam dan telur dengan kuah, taburi bawang goreng.','Soto kuah kuning hangat dengan suwiran ayam dan telur rebus.','Makanan Indonesia/Berkuah'),
 R('b11','Nasi Uduk','Nasi','Makanan',40,3,4.6,'🍚','nasi-uduk','2 cup beras|400 ml santan encer|2 lembar daun salam|1 batang serai|1 sdt garam','Cuci beras dan tiriskan.|Campur beras, santan, salam, serai, dan garam.|Masak hingga santan terserap.|Kukus 20 menit, sajikan dengan telur dan bawang goreng.','Nasi gurih berbumbu santan, cocok untuk sarapan.','Makanan Indonesia'),
 R('b12','Martabak Telur','Telur','Makanan',30,3,4.6,'🥞','martabak-telur','3 butir telur|4 lembar kulit lumpia|100 gr daging cincang|2 batang daun bawang|1 sdt garam','Tumis daging cincang hingga matang.|Kocok telur bersama daun bawang, garam, dan daging.|Tuang ke atas kulit lumpia, lipat membentuk persegi.|Goreng hingga kedua sisi kecokelatan.','Camilan gurih berisi telur dan daging dalam kulit tipis renyah.','Camilan/Makanan Indonesia'),
 R('b13','Risol Mayo','Camilan','Makanan',40,6,4.6,'🥟','risol','6 lembar kulit risol|2 butir telur rebus|2 sdm mayones|50 gr asap daging|Tepung panir','Potong telur dan asap daging, campur dengan mayones.|Isi kulit risol, lipat rapat.|Gulingkan di tepung panir.|Goreng hingga keemasan.','Risol isi mayones dan telur dengan kulit renyah.','Camilan'),
 R('b14','Cireng','Camilan','Makanan',25,4,4.5,'🍡','cireng','150 gr tepung tapioka|2 sdm tepung terigu|2 siung bawang putih|1 batang daun bawang|1 sdt garam|Air panas secukupnya','Campur tapioka, terigu, bawang putih halus, daun bawang, dan garam.|Tuang air panas sedikit demi sedikit, uleni hingga kalis.|Bentuk bulat pipih.|Goreng hingga kuning keemasan.','Aci goreng kenyal dengan bumbu bawang putih.','Camilan'),
 R('b15','Sup Ayam Sederhana','Ayam','Makanan',35,3,4.5,'🍲','sup-ayam','300 gr ayam|1 buah wortel|1 buah kentang|2 siung bawang putih|1 liter air|1 sdt garam','Rebus ayam hingga kaldu keluar.|Tumis bawang putih, masukkan ke kaldu.|Masukkan wortel dan kentang, masak hingga empuk.|Beri garam dan lada, sajikan hangat.','Sup bening rumahan yang hangat dan mudah dibuat.','Berkuah/Rumahan'),
 R('b16','Tumis Kangkung','Sayur','Makanan',10,2,4.4,'🥬','tumis-kangkung','1 ikat kangkung|3 siung bawang putih|2 buah cabai merah|1 sdm saus tiram|1 sdt garam','Siangi kangkung dan potong-potong.|Tumis bawang putih dan cabai hingga harum.|Masukkan kangkung, saus tiram, dan garam.|Aduk cepat 2 menit, angkat.','Sayur tumis cepat dengan bahan murah dan mudah dicari.','Rumahan/Hemat Mahasiswa'),
 R('b17','Nasi Telur Kecap','Telur','Makanan',10,1,4.3,'🍳','nasi-telur-kecap','1 piring nasi putih|1 butir telur|1 sdm kecap manis|1 siung bawang putih|Minyak secukupnya','Goreng telur setengah matang.|Tumis bawang putih cincang sebentar.|Letakkan telur di atas nasi.|Siram kecap manis dan bawang putih.','Menu hemat mahasiswa, siap dalam 10 menit.','Hemat Mahasiswa/Rumahan'),
 R('b18','Es Jeruk','Camilan','Minuman',5,2,4.6,'🍊','es-jeruk','3 buah jeruk peras|3 sdm gula pasir|300 ml air dingin|Es batu secukupnya','Peras jeruk dan saring bijinya.|Larutkan gula dengan sedikit air hangat.|Campur air jeruk, sirup gula, dan air dingin.|Tuang ke gelas berisi es batu.','Minuman jeruk segar yang manis asam.','Minuman Dingin'),
 R('b19','Es Kopi Susu','Camilan','Minuman',5,1,4.8,'☕','es-kopi-susu','2 sdt kopi bubuk|50 ml air panas|150 ml susu cair dingin|1 sdm gula aren cair|Es batu secukupnya','Seduh kopi dengan air panas.|Masukkan gula aren ke gelas, aduk.|Tambahkan es batu dan susu.|Tuang kopi perlahan, aduk sebelum diminum.','Kopi susu gula aren yang creamy dan menyegarkan.','Minuman Dingin'),
 R('b20','Jus Alpukat','Camilan','Minuman',10,2,4.7,'🥑','jus-alpukat','1 buah alpukat matang|200 ml susu cair|2 sdm gula pasir|1 sdm susu kental manis|Es batu secukupnya','Belah alpukat dan ambil dagingnya.|Masukkan semua bahan ke blender.|Blender hingga halus.|Tuang ke gelas, sajikan dingin.','Jus alpukat kental dengan rasa manis dan lembut.','Minuman Dingin'),
 R('b21','Wedang Jahe','Camilan','Minuman',15,2,4.6,'🍵','wedang-jahe','3 ruas jahe|500 ml air|2 sdm gula merah|1 batang serai','Memarkan jahe dan serai.|Rebus bersama air hingga mendidih.|Masukkan gula merah, aduk hingga larut.|Saring dan sajikan hangat.','Minuman jahe hangat yang menenangkan badan.','Minuman Hangat'),
 R('b22','Teh Hangat','Camilan','Minuman',5,1,4.4,'🍵','teh-hangat','1 kantong teh celup|200 ml air panas|1 sdm gula pasir','Tuang air panas ke dalam gelas.|Celupkan teh selama 3 menit.|Angkat kantong teh.|Tambahkan gula, aduk, sajikan.','Teh manis hangat paling sederhana.','Minuman Hangat/Hemat Mahasiswa')
];

// Deskripsi dan koleksi untuk 8 resep awal
const KOLEKSI = ['Makanan Indonesia','Camilan','Berkuah','Rumahan','Minuman Dingin','Minuman Hangat','Hemat Mahasiswa'];
const EX = {
 b1:['Nasi goreng bumbu sederhana, favorit sepanjang masa.','Makanan Indonesia/Hemat Mahasiswa'],
 b2:['Mie goreng kecap yang cepat dan mengenyangkan.','Hemat Mahasiswa'],
 b3:['Ayam goreng tepung dengan sambal pedas yang digeprek.','Makanan Indonesia'],
 b4:['Kerupuk kenyal dengan kuah kencur yang pedas.','Camilan/Makanan Indonesia'],
 b5:['Telur rebus goreng dengan sambal balado pedas.','Makanan Indonesia/Rumahan'],
 b6:['Tumis aneka sayur segar dengan saus tiram.','Rumahan'],
 b7:['Teh manis dingin untuk menemani hari panas.','Minuman Dingin/Hemat Mahasiswa'],
 b8:['Pisang goreng tepung renyah di luar, lembut di dalam.','Camilan/Makanan Indonesia']
};
BAWAAN.forEach(r => { const e = EX[r.id]; if (e) { r.desk = e[0]; r.ko = e[1].split('/'); } });

/* ===== 2. PENYIMPANAN (localStorage) ===== */
const baca = (k,d) => { try { const v = JSON.parse(localStorage.getItem('resepku_'+k)); return v === null ? d : v; } catch(e) { return d; } };
const simpan = (k,v) => localStorage.setItem('resepku_'+k, JSON.stringify(v));
const akun = () => baca('akun', []);
const email = () => baca('sesi', null);
const aku = () => akun().find(a => a.email === email());
// Catatan: kata sandi disimpan apa adanya karena ini aplikasi belajar tanpa backend.
const milik = () => baca('resep_'+email(), []);       // resep buatan pengguna
const favs = () => baca('fav_'+email(), []);
const semua = () => BAWAAN.concat(milik());
const cariId = id => semua().find(r => r.id === id);
const isFav = id => favs().includes(id);

/* ===== 3. UTILITAS ===== */
const $ = id => document.getElementById(id);
const v = id => ($(id) ? $(id).value : '');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P = d => `<svg viewBox="0 0 24 24">${d}</svg>`;
const I = {
 home:P('<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'),
 search:P('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
 heart:P('<path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>'),
 user:P('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
 back:P('<path d="M19 12H5M12 19l-7-7 7-7"/>'),
 bell:P('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>'),
 clock:P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
 users:P('<circle cx="9" cy="8" r="3.5"/><path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1M17 4a3.5 3.5 0 0 1 0 7M22 21v-1a5 5 0 0 0-3-4.5"/>'),
 plus:P('<path d="M12 5v14M5 12h14"/>'),
 edit:P('<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
 trash:P('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>'),
 gear:P('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'),
 help:P('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>'),
 out:P('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'),
 doc:P('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h8"/>'),
 eye:P('<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'),
 hat:P('<path d="M7 14a4 4 0 1 1 1-7.7 4.5 4.5 0 0 1 8 0A4 4 0 1 1 17 14v6H7z"/>')
};

// Gambar pengganti (piring, garpu, pisau) bila foto belum ada atau gagal dimuat
const PH = '<svg class="phs" viewBox="0 0 64 64" aria-hidden="true"><circle cx="34" cy="34" r="17" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="34" cy="34" r="10" fill="none" stroke="currentColor" stroke-width="2" opacity=".6"/><path d="M6 10v15a4 4 0 0 0 4 4h0M14 10v15M10 10v44M58 10c-5 3-6 9-6 17h6v27" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const foto = (r,c) => `<div class="ph ${c}">${PH}${r.foto ? `<img src="${r.foto}" alt="${esc(r.nama)}" loading="lazy" onerror="this.remove()">` : ''}</div>`;
// Resep yang fotonya dipakai untuk tiap kategori dan untuk halaman pembuka
const KATFOTO = {Nasi:'b1', Mie:'b2', Ayam:'b3', Daging:'b9', Sayur:'b6', Telur:'b5', Camilan:'b8'};
const blobFoto = id => foto(cariId(id) || {nama:'',foto:''}, 'bl');
const kosong = (e,j,t) => `<div class="empty"><div>${e}</div><b>${j}</b>${t}</div>`;
const err = (id,m) => { if ($('e_'+id)) $('e_'+id).textContent = m || ''; return !!m; };

let tt;
function toast(t) {
  document.querySelectorAll('.toast').forEach(x => x.remove());
  const d = document.createElement('div'); d.className = 'toast'; d.textContent = t;
  $('app').appendChild(d); clearTimeout(tt); tt = setTimeout(() => d.remove(), 2200);
}
// Dialog: judul, teks, label tombol, fungsi bila dikonfirmasi
let aksi = null;
function dialog(j,t,ok,fn,merah) {
  aksi = fn;
  const d = document.createElement('div'); d.className = 'ov'; d.id = 'ov';
  d.innerHTML = `<div class="dlg"><h3>${j}</h3><p>${t}</p><div class="row"><button class="btn out" onclick="tutup()">Batal</button><button class="btn ${merah?'red':''}" onclick="const f=aksi;tutup();f&&f()">${ok}</button></div></div>`;
  $('app').appendChild(d);
}
const tutup = () => { if ($('ov')) $('ov').remove(); };

/* ===== 4. NAVIGASI ===== */
let S = {scr:'splash', p:null, hist:[], q:'', fk:'', fj:'', fo:'', fm:false, tab:'Semua', step:0};
const go = (scr,p) => { S.hist.push([S.scr,S.p]); S.scr = scr; S.p = p; draw(); };
const tab = scr => { S.hist = []; S.scr = scr; S.p = null; draw(); };
const back = () => { const h = S.hist.pop(); if (h) { S.scr = h[0]; S.p = h[1]; } else S.scr = 'home'; draw(); };
const NAV = [['home','Beranda','home'],['search','Cari','search'],['fav','Favorit','heart'],['profil','Profil','user']];
const AKTIF = {home:'home',kategori:'home',search:'search',fav:'fav',profil:'profil',resepsaya:'profil',pengaturan:'profil',bantuan:'profil'};
const PUBLIK = ['splash','onb1','onb2','login','daftar','lupa'];

function draw() {
  // Penjaga alur awal (status onboarding & sesi dibaca dari localStorage)
  if (S.scr !== 'splash') {
    const AWAL = ['onb1','onb2','login','daftar','lupa'];
    if (aku()) { if (AWAL.includes(S.scr)) { S.scr = 'home'; S.hist = []; } }          // sudah login: langsung Beranda
    else if (!baca('onb', 0)) { if (S.scr !== 'onb1' && S.scr !== 'onb2') { S.scr = 'onb1'; S.hist = []; } } // pengguna baru: onboarding dulu
    else if (!PUBLIK.includes(S.scr) || S.scr === 'onb1' || S.scr === 'onb2') { S.scr = 'login'; S.hist = []; } // onboarding selesai: login
  }
  tutup();
  const el = $('screen');
  el.className = ['splash','onb1','onb2','detail'].includes(S.scr) ? 'full' : '';
  el.dataset.s = S.scr; // dipakai CSS untuk menyesuaikan lebar tiap halaman
  el.innerHTML = HAL[S.scr]();
  el.scrollTop = 0;
  const a = AKTIF[S.scr];
  // Di desktop, navigasi samping tampil di semua halaman setelah login
  const lebar = typeof matchMedia === 'function' && matchMedia('(min-width:1024px)').matches;
  const tampil = a || (lebar && aku() && !PUBLIK.includes(S.scr));
  $('nav').innerHTML = tampil ? NAV.map(n => `<button class="${n[0]===a?'on':''}" onclick="tab('${n[0]}')">${I[n[2]]}${n[1]}</button>`).join('') : '';
  $('nav').style.display = tampil ? 'flex' : 'none';
  if (S.scr === 'search') hasilGambar();
}

/* ===== 5. KOMPONEN ===== */
const kartu = r => `<div class="item" onclick="go('detail','${r.id}')">${foto(r,'th')}<div class="inf"><b>${esc(r.nama)}</b><small>${I.clock} ${r.waktu} menit · <span class="star">★</span> ${r.rating}</small><small>${r.kat} · ${r.jenis}${r.bawaan ? '' : ' · <b class="star">Resep Saya</b>'}</small></div><button class="hb ${isFav(r.id)?'on':''}" onclick="toggleFav('${r.id}',event)">${I.heart}</button></div>`;
const atas = (j,aks='') => `<div class="top"><button class="ib" onclick="back()">${I.back}</button><h1>${j}</h1>${aks}</div>`;

function toggleFav(id,ev) {
  if (ev) ev.stopPropagation();
  let f = favs();
  if (f.includes(id)) { f = f.filter(x => x !== id); toast('Dihapus dari favorit'); }
  else { f.push(id); toast('Ditambahkan ke favorit'); }
  simpan('fav_'+email(), f);
  const y = $('screen').scrollTop; draw(); $('screen').scrollTop = y;
}

/* ===== 6. HALAMAN ===== */
const HAL = {
 splash: () => `<div class="cen splash"><div class="blob" style="background:none;font-size:80px;color:var(--o)">${I.hat.replace('<svg','<svg style="width:90px;height:90px"')}</div><div class="logo">Resep<b>Ku</b></div><p class="sub">Masak Jadi Mudah</p></div>`,

 onb1: () => onb(blobFoto('b1'),'Temukan Resep Favoritmu','Jelajahi berbagai resep masakan lezat dan mudah dibuat di rumah.',0,'onb2'),
 onb2: () => onb(blobFoto('b10'),'Simpan Resep Favoritmu','Jangan lupa simpan resep yang kamu suka agar mudah diakses kapan saja.',1,'login'),

 login: () => `<div class="top">${S.hist.length ? `<button class="ib" onclick="back()">${I.back}</button>` : '<div style="height:38px"></div>'}</div>
  <div style="text-align:center"><div style="color:var(--o);display:inline-block">${I.hat.replace('<svg','<svg style="width:44px;height:44px"')}</div><div class="logo" style="font-size:22px">Resep<b>Ku</b></div><p class="sub">Masak Jadi Mudah</p></div>
  <h1 style="font-size:18px;margin-top:18px">Selamat Datang Kembali</h1><p class="sub" style="margin-bottom:14px">Masuk untuk melanjutkan</p>
  <div class="fld"><input class="inp" id="em" placeholder="Email atau Nomor HP"><div class="er" id="e_em"></div></div>
  <div class="fld pw"><input class="inp" id="pw" type="password" placeholder="Kata sandi"><button onclick="lihat('pw')">${I.eye}</button><div class="er" id="e_pw"></div></div>
  <button class="btn" onclick="masuk()">Masuk</button>
  <button class="link" onclick="go('lupa')">Lupa kata sandi?</button>
  <p class="sub" style="text-align:center;margin-top:14px">Belum punya akun? <a href="#" class="link" style="display:inline;width:auto;padding:0;text-decoration:underline" onclick="go('daftar');return false">Daftar</a></p>`,

 lupa: () => `${atas('Lupa Kata Sandi')}<p class="sub" style="margin-bottom:14px">Pulihkan akun dengan email atau nomor HP dan nama lengkap yang kamu pakai saat mendaftar, lalu buat kata sandi baru.</p>
  <div class="fld"><label>Email atau Nomor HP</label><input class="inp" id="em" placeholder="contoh@email.com"><div class="er" id="e_em"></div></div>
  <div class="fld"><label>Nama lengkap</label><input class="inp" id="nm" placeholder="Nama saat mendaftar"><div class="er" id="e_nm"></div></div>
  <div class="fld pw"><label>Kata sandi baru</label><input class="inp" id="pw" type="password" placeholder="Minimal 6 karakter"><button style="top:30px" onclick="lihat('pw')">${I.eye}</button><div class="er" id="e_pw"></div></div>
  <div class="fld"><label>Ulangi kata sandi baru</label><input class="inp" id="pw2" type="password" placeholder="Ulangi kata sandi baru"><div class="er" id="e_pw2"></div></div>
  <button class="btn" onclick="resetSandi()">Atur Ulang Kata Sandi</button>
  <p class="sub" style="margin-top:12px;text-align:center">Pemulihan ini hanya berlaku di perangkat tempat akun dibuat.</p>`,

 daftar: () => `${atas('Buat Akun')}<p class="sub" style="margin-bottom:14px">Daftar untuk mulai menyimpan resepmu.</p>
  <div class="fld"><label>Nama lengkap</label><input class="inp" id="nm" placeholder="Nama lengkap"><div class="er" id="e_nm"></div></div>
  <div class="fld"><label>Email atau Nomor HP</label><input class="inp" id="em" placeholder="contoh@email.com"><div class="er" id="e_em"></div></div>
  <div class="fld pw"><label>Kata sandi</label><input class="inp" id="pw" type="password" placeholder="Minimal 6 karakter"><button style="top:30px" onclick="lihat('pw')">${I.eye}</button><div class="er" id="e_pw"></div></div>
  <div class="fld"><label>Ulangi kata sandi</label><input class="inp" id="pw2" type="password" placeholder="Ulangi kata sandi"><div class="er" id="e_pw2"></div></div>
  <button class="btn" onclick="daftar()">Daftar</button>`,

 home: () => {
  const l = semua(), pop = [...l].sort((a,b) => b.rating - a.rating).slice(0,5);
  return `<div class="top"><div style="flex:1"><h1 style="font-size:18px">Halo, ${esc(aku().nama.split(' ')[0])} 👋</h1><p class="sub">Mau masak apa hari ini?</p></div><button class="ib" onclick="notif()">${I.bell}</button></div>
  <div class="sbar" onclick="S.q='';tab('search')">${I.search}<span>Cari resep...</span></div>
  <h2 style="display:flex;justify-content:space-between">Kategori <button class="link" style="width:auto;padding:0" onclick="go('kategori')">Lihat Semua</button></h2>
  <div class="chips">${KAT.map(k => `<button class="chip" onclick="lihatKat('${k[0]}')">${k[0]}</button>`).join('')}</div>
  <h2>Koleksi</h2><div class="chips">${KOLEKSI.map(k => `<button class="chip" onclick="lihatKoleksi('${k}')">${k}</button>`).join('')}</div>
  <h2>Resep Populer</h2><div class="pop">${pop.map(r => `<div class="pc" onclick="go('detail','${r.id}')">${foto(r,'')}<div class="t">${esc(r.nama)}<small>${I.clock.replace('<svg','<svg style="width:12px;height:12px;vertical-align:-2px"')} ${r.waktu} mnt · <span class="star">★</span> ${r.rating}</small></div></div>`).join('')}</div>
  <h2>Semua Resep</h2><div class="lst">${l.map(kartu).join('')}</div>`;
 },

 search: () => `<div class="top"><h1>Cari Resep</h1><button class="ib" style="background:var(--o);color:#fff" onclick="go('form')" aria-label="Tambah resep">${I.plus}</button></div>
  <div class="sbar">${I.search}<input id="q" placeholder="Cari nama resep..." value="${esc(S.q)}" oninput="S.q=this.value;hasilGambar()"></div>
  <div class="chips" style="margin-top:10px">${['','Makanan','Minuman'].map(j => `<button class="chip ${S.fj===j?'on':''}" onclick="S.fj='${j}';draw()">${j||'Semua'}</button>`).join('')}<button class="chip ${S.fm?'on':''}" onclick="S.fm=!S.fm;draw()">Resep Saya</button></div>
  <div class="chips">${[''].concat(KAT.map(k => k[0])).map(k => `<button class="chip ${S.fk===k?'on':''}" onclick="S.fk='${k}';draw()">${k||'Semua Kategori'}</button>`).join('')}</div>
  <div class="chips">${[''].concat(KOLEKSI).map(k => `<button class="chip ${S.fo===k?'on':''}" onclick="S.fo='${k}';draw()">${k||'Semua Koleksi'}</button>`).join('')}</div>
  <div id="hasil" class="lst"></div>`,

 kategori: () => `${atas('Kategori')}<div class="grid">${KAT.map(k => `<div class="kt" onclick="lihatKat('${k[0]}')">${foto(cariId(KATFOTO[k[0]]) || {nama:k[0],foto:''}, '')}${k[0]}</div>`).join('')}</div>`,

 detail: () => {
  const r = cariId(S.p); if (!r) return kosong('😕','Resep tidak ditemukan','Resep ini mungkin sudah dihapus.') + '<button class="btn" onclick="back()">Kembali</button>';
  return `<div style="position:relative">${foto(r,'hero')}<div class="hbar"><button class="ib" onclick="back()">${I.back}</button><button class="ib hb ${isFav(r.id)?'on':''}" onclick="toggleFav('${r.id}',event)">${I.heart}</button></div></div>
  <div style="padding:16px 18px"><h1>${esc(r.nama)}</h1>
  <div class="meta"><span><b class="star">★</b> ${r.rating}</span><span>${I.clock} ${r.waktu} menit</span><span>${I.users} ${r.porsi} porsi</span></div>
  <p class="sub">${r.kat} · ${r.jenis}${(r.ko||[]).length ? ' · ' + r.ko.join(', ') : ''}</p>${r.desk ? `<p style="font-size:13px;margin-top:8px">${esc(r.desk)}</p>` : ''}
  <h2>Bahan-bahan</h2><ul class="bh">${r.bahan.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
  <h2>Cara Memasak</h2><ol class="lg">${r.langkah.map(l => `<li>${esc(l)}</li>`).join('')}</ol>
  <button class="btn" style="margin-top:16px" onclick="mulaiMasak('${r.id}')">▶ Mulai Memasak</button>
  ${r.bawaan ? '' : `<div class="row" style="margin-top:10px"><button class="btn out" onclick="go('form','${r.id}')">${I.edit} Edit</button><button class="btn out" style="color:#E53935;border-color:#E53935" onclick="hapus('${r.id}')">${I.trash} Hapus</button></div>`}</div>`;
 },

 cook: () => {
  const r = cariId(S.p), n = r.langkah.length, i = S.step;
  return `${atas('Mode Memasak')}<h2 style="text-align:center;margin-top:0">${esc(r.nama)}</h2>
  <p class="sub" style="text-align:center">Langkah ${i+1} dari ${n}</p><div class="prog"><i style="width:${(i+1)/n*100}%"></i></div>
  <div class="big">${i+1}</div><div class="stp">${esc(r.langkah[i])}</div>
  <div class="row"><button class="btn out" ${i===0?'disabled':''} onclick="S.step--;draw()">Sebelumnya</button>
  <button class="btn" onclick="${i===n-1?'selesaiMasak()':'S.step++;draw()'}">${i===n-1?'Selesai':'Selanjutnya'}</button></div>`;
 },

 fav: () => {
  const l = favs().map(cariId).filter(Boolean).filter(r => S.tab === 'Semua' || (S.tab === 'Makanan' ? r.jenis === 'Makanan' : r.jenis === 'Minuman'));
  return `<h1 style="margin-bottom:12px">Favorit</h1><div class="chips">${['Semua','Makanan','Minuman'].map(t => `<button class="chip ${S.tab===t?'on':''}" onclick="S.tab='${t}';draw()">${t}</button>`).join('')}</div>
  <div class="lst">${l.length ? l.map(kartu).join('') : kosong('💛','Belum ada favorit','Tekan ikon hati pada resep untuk menyimpannya di sini.')}</div>`;
 },

 profil: () => `<div style="text-align:center;margin-bottom:16px"><div class="av">${esc(aku().nama[0].toUpperCase())}</div><b>${esc(aku().nama)}</b><p class="sub">${esc(aku().email)}</p></div>
  <div class="card">${[['heart','Resep Favorit',"tab('fav')"],['doc','Resep Saya',"go('resepsaya')"],['gear','Pengaturan',"go('pengaturan')"],['help','Bantuan',"go('bantuan')"],['out','Keluar','keluar()']].map(m => `<button class="menu" onclick="${m[2]}">${I[m[0]]}${m[1]}</button>`).join('')}</div>
  <h2>Tema Aplikasi</h2><div class="row"><button class="btn ${baca('tema','terang')==='terang'?'':'out'}" onclick="setTema('terang')">☀️ Mode Terang</button><button class="btn ${baca('tema','terang')==='gelap'?'':'out'}" onclick="setTema('gelap')">🌙 Mode Gelap</button></div>
  <h2>Aplikasi</h2>${blokPasang()}`,

 resepsaya: () => { const l = milik(); return `${atas('Resep Saya',`<button class="ib" style="background:var(--o);color:#fff" onclick="go('form')">${I.plus}</button>`)}
  ${l.length ? l.map(r => `<div class="item" onclick="go('detail','${r.id}')">${foto(r,'th')}<div class="inf"><b>${esc(r.nama)}</b><small>${r.kat} · ${r.waktu} menit</small></div><div class="mini" onclick="event.stopPropagation()"><button onclick="go('form','${r.id}')">${I.edit}</button><button class="d" onclick="hapus('${r.id}')">${I.trash}</button></div></div>`).join('')
  : kosong('📝','Belum ada resep buatanmu','Tekan tombol + untuk menambah resep pertamamu.')}`; },

 form: () => {
  const r = S.p ? cariId(S.p) : null;
  S.fotoForm = r && r.foto ? r.foto : ''; // foto yang sedang dipilih di formulir
  return `${atas(r ? 'Edit Resep' : 'Tambah Resep')}
  <div class="fld"><label>Foto makanan atau minuman</label><input type="file" id="f_foto" accept="image/jpeg,image/png,image/webp" hidden onchange="pilihFoto(this)"><div id="fotoblok">${blokFoto()}</div><div class="er" id="e_f_foto"></div></div>
  <div class="fld"><label>Nama resep</label><input class="inp" id="f_nama" value="${r?esc(r.nama):''}" placeholder="Contoh: Soto Ayam"><div class="er" id="e_f_nama"></div></div>
  <div class="row"><div class="fld" style="flex:1"><label>Kategori</label><select class="inp" id="f_kat">${KAT.map(k => `<option ${r&&r.kat===k[0]?'selected':''}>${k[0]}</option>`).join('')}</select></div>
  <div class="fld" style="flex:1"><label>Jenis</label><select class="inp" id="f_jenis">${['Makanan','Minuman'].map(j => `<option ${r&&r.jenis===j?'selected':''}>${j}</option>`).join('')}</select></div></div>
  <div class="row"><div class="fld" style="flex:1"><label>Waktu (menit)</label><input class="inp" id="f_waktu" type="number" min="1" value="${r?r.waktu:''}"><div class="er" id="e_f_waktu"></div></div>
  <div class="fld" style="flex:1"><label>Porsi</label><input class="inp" id="f_porsi" type="number" min="1" value="${r?r.porsi:''}"><div class="er" id="e_f_porsi"></div></div></div>
  <div class="fld"><label>Bahan (satu bahan per baris)</label><textarea class="inp" id="f_bahan">${r?esc(r.bahan.join('\n')):''}</textarea><div class="er" id="e_f_bahan"></div></div>
  <div class="fld"><label>Langkah memasak (satu langkah per baris)</label><textarea class="inp" id="f_langkah">${r?esc(r.langkah.join('\n')):''}</textarea><div class="er" id="e_f_langkah"></div></div>
  <button class="btn" onclick="simpanResep()">Simpan Resep</button>`;
 },

 pengaturan: () => `${atas('Pengaturan')}<div class="card"><p class="sub">Akun</p><b>${esc(aku().nama)}</b><p class="sub">${esc(aku().email)}</p><hr style="border:0;border-top:1px solid var(--bd);margin:12px 0"><p class="sub">Bahasa</p><b>Bahasa Indonesia</b><hr style="border:0;border-top:1px solid var(--bd);margin:12px 0"><p class="sub">Versi aplikasi</p><b>1.0.0</b><hr style="border:0;border-top:1px solid var(--bd);margin:12px 0"><p class="sub">Data akun, favorit, dan resepmu disimpan di peramban perangkat ini (localStorage).</p></div>`,

 bantuan: () => `${atas('Bantuan')}${[['Bagaimana cara menambah resep?','Buka Profil › Resep Saya, lalu tekan tombol +.'],['Bagaimana menyimpan favorit?','Tekan ikon hati pada resep. Lihat semuanya di menu Favorit.'],['Apa itu Mode Memasak?','Mode yang menampilkan satu langkah per layar. Buka dari tombol Mulai Memasak.'],['Mengapa resep bawaan tidak bisa diedit?','Resep bawaan dikunci. Kamu hanya dapat mengubah resep buatanmu sendiri.']].map(f => `<div class="card" style="margin-bottom:10px"><b style="font-size:13px">${f[0]}</b><p class="sub" style="margin-top:4px">${f[1]}</p></div>`).join('')}`
};

function onb(e,j,t,i,next) {
  return `<div class="cen"><div class="blob">${e}</div><h1 style="font-size:20px">${j}</h1><p class="sub" style="margin-top:6px">${t}</p>
  <div class="dots"><i class="${i===0?'on':''}"></i><i class="${i===1?'on':''}"></i></div>
  <button class="btn" onclick="${next==='login'?"simpan('onb',1);":''}tab('${next}')">Lanjut ›</button>
  <button class="link" onclick="simpan('onb',1);tab('login')">Lewati</button></div>`;
}

/* ===== 7. AKSI ===== */
function lihat(id) { $(id).type = $(id).type === 'password' ? 'text' : 'password'; }
const emailOk = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) || /^[0-9+]{9,15}$/.test(s);

/* --- Kata sandi: disimpan sebagai hash SHA-256 + garam (tanpa backend) --- */
const garam = () => Array.from(crypto.getRandomValues(new Uint8Array(8))).map(x => x.toString(16).padStart(2,'0')).join('');
async function hash(p,g) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(g + p));
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join('');
}
async function cocok(a,p) {
  if (a.pw !== undefined) { // akun lama (teks biasa): cek lalu ubah ke hash
    if (a.pw !== p) return false;
    const l = akun(), t = l.find(x => x.email === a.email);
    t.garam = garam(); t.hash = await hash(p, t.garam); delete t.pw; simpan('akun', l);
    return true;
  }
  return a.hash === await hash(p, a.garam);
}
const PESAN_ENKRIPSI = 'Peramban tidak mendukung enkripsi. Buka lewat localhost atau https.';

async function masuk() {
  const e = v('em').trim().toLowerCase(), p = v('pw');
  const a = err('em', e ? '' : 'Email atau nomor HP wajib diisi'), b = err('pw', p ? '' : 'Kata sandi wajib diisi');
  if (a || b) return;
  try {
    const ak = akun().find(x => x.email === e);
    if (!ak || !(await cocok(ak, p))) return err('pw', 'Email/nomor HP atau kata sandi salah');
    simpan('sesi', e); S.hist = []; tab('home'); toast('Berhasil masuk');
  } catch (x) { err('pw', PESAN_ENKRIPSI); }
}
async function daftar() {
  const n = v('nm').trim(), e = v('em').trim().toLowerCase(), p = v('pw'), p2 = v('pw2');
  const x = [err('nm', n ? '' : 'Nama wajib diisi'),
    err('em', !e ? 'Email atau nomor HP wajib diisi' : !emailOk(e) ? 'Format email atau nomor HP tidak valid' : akun().some(a => a.email === e) ? 'Sudah terdaftar, silakan masuk' : ''),
    err('pw', p.length >= 6 ? '' : 'Kata sandi minimal 6 karakter'),
    err('pw2', p2 === p ? '' : 'Kata sandi tidak sama')];
  if (x.some(Boolean)) return;
  try {
    const g = garam(), l = akun(); l.push({nama:n, email:e, garam:g, hash:await hash(p, g)});
    simpan('akun', l); simpan('sesi', e); S.hist = []; tab('home'); toast('Akun berhasil dibuat');
  } catch (z) { err('em', PESAN_ENKRIPSI); }
}

// Lupa kata sandi tanpa email: akun dicocokkan dengan nama lengkap saat mendaftar
async function resetSandi() {
  const e = v('em').trim().toLowerCase(), n = v('nm').trim().toLowerCase(), p = v('pw'), p2 = v('pw2');
  const x = [err('em', e ? '' : 'Email atau nomor HP wajib diisi'), err('nm', n ? '' : 'Nama lengkap wajib diisi'),
    err('pw', p.length >= 6 ? '' : 'Kata sandi minimal 6 karakter'), err('pw2', p2 === p ? '' : 'Kata sandi tidak sama')];
  if (x.some(Boolean)) return;
  try {
    const l = akun(), a = l.find(z => z.email === e);
    if (!a || a.nama.trim().toLowerCase() !== n) return err('nm', 'Data tidak cocok dengan akun yang terdaftar di perangkat ini');
    a.garam = garam(); a.hash = await hash(p, a.garam); delete a.pw; simpan('akun', l);
    S.hist = []; tab('login'); toast('Kata sandi berhasil diubah. Silakan masuk');
  } catch (z) { err('em', PESAN_ENKRIPSI); }
}

/* --- Tema terang / gelap --- */
function terapkanTema() {
  const g = baca('tema','terang') === 'gelap';
  document.documentElement.dataset.theme = g ? 'dark' : 'light';
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = g ? '#1F1612' : '#FF8A3D';
}
function setTema(t) { simpan('tema', t); terapkanTema(); draw(); toast(t === 'gelap' ? 'Mode Gelap aktif' : 'Mode Terang aktif'); }
terapkanTema();

function keluar() {
  dialog('Keluar akun?','Kamu harus masuk lagi untuk memakai aplikasi.','Keluar',() => { simpan('sesi', null); S.hist = []; tab('login'); }, true);
}
const notif = () => dialog('Notifikasi','Belum ada notifikasi','Tutup',null);
function lihatKat(k) { S.fk = k; S.fj = ''; S.fo = ''; S.fm = false; S.q = ''; go('search'); }
function lihatKoleksi(k) { S.fo = k; S.fk = ''; S.fj = ''; S.fm = false; S.q = ''; go('search'); }
function hasilGambar() {
  const q = S.q.toLowerCase();
  const l = semua().filter(r => r.nama.toLowerCase().includes(q) && (!S.fk || r.kat === S.fk) && (!S.fj || r.jenis === S.fj) && (!S.fo || (r.ko || []).includes(S.fo)) && (!S.fm || !r.bawaan));
  $('hasil').innerHTML = l.length ? l.map(kartu).join('') : (S.fm && !milik().length ? kosong('📝','Belum ada resep buatanmu','Tekan tombol + di atas untuk menambah resepmu.') : kosong('🔍','Resep tidak ditemukan','Coba kata kunci atau filter lain.'));
}
function mulaiMasak(id) { S.step = 0; go('cook', id); }
function selesaiMasak() { toast('Selamat menikmati masakanmu! 🎉'); back(); }

function simpanResep() {
  const nama = v('f_nama').trim(), w = parseInt(v('f_waktu')), po = parseInt(v('f_porsi'));
  const bahan = v('f_bahan').split('\n').map(s => s.trim()).filter(Boolean);
  const lang = v('f_langkah').split('\n').map(s => s.trim()).filter(Boolean);
  const x = [err('f_nama', nama.length >= 3 ? '' : 'Nama resep minimal 3 karakter'),
    err('f_waktu', w > 0 ? '' : 'Isi waktu dengan angka lebih dari 0'),
    err('f_porsi', po > 0 ? '' : 'Isi porsi dengan angka lebih dari 0'),
    err('f_bahan', bahan.length ? '' : 'Isi minimal satu bahan'),
    err('f_langkah', lang.length ? '' : 'Isi minimal satu langkah')];
  if (x.some(Boolean)) return;
  const kat = v('f_kat'), l = milik(), lama = S.p && l.find(r => r.id === S.p);
  const baru = {id: lama ? lama.id : 'u' + Date.now(), nama, kat, jenis:v('f_jenis'), waktu:w, porsi:po, rating:lama ? lama.rating : 4.5, foto:S.fotoForm || '', bahan, langkah:lang};
  try { simpan('resep_'+email(), lama ? l.map(r => r.id === lama.id ? baru : r) : l.concat(baru)); }
  catch (e) { return toast('Penyimpanan penuh. Hapus foto atau resep lain, lalu coba lagi'); }
  toast(lama ? 'Resep berhasil diperbarui' : 'Resep berhasil ditambahkan');
  back();
}
function hapus(id) {
  const r = cariId(id);
  dialog('Hapus resep?',`Resep "${esc(r.nama)}" akan dihapus dan tidak bisa dikembalikan.`,'Hapus',() => {
    simpan('resep_'+email(), milik().filter(x => x.id !== id));
    simpan('fav_'+email(), favs().filter(x => x !== id));
    toast('Resep dihapus');
    S.scr === 'detail' ? back() : draw();
  }, true);
}

/* --- Pasang aplikasi (PWA) & unduh APK --- */
let tundaInstal = null; // peristiwa instal dari browser (Chrome/Edge/Android)
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); tundaInstal = e; if (S.scr === 'profil') draw(); });
  window.addEventListener('appinstalled', () => { tundaInstal = null; toast('ResepKu berhasil dipasang'); });
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
}
const mandiri = () => typeof matchMedia === 'function' && (matchMedia('(display-mode: standalone)').matches || navigator.standalone === true);
function blokPasang() {
  if (mandiri()) return '<p class="sub">ResepKu sudah berjalan sebagai aplikasi.</p>';
  const apk = typeof APK_URL !== 'undefined' && APK_URL; // tombol APK hanya tampil bila file APK sudah diisi
  return `<div class="card"><button class="btn" onclick="pasang()">${I.plus} Instal ResepKu</button>${apk ? `<a class="btn out" style="margin-top:10px;text-decoration:none" href="${esc(APK_URL)}" download>⬇ Download Aplikasi ResepKu (APK)</a>` : ''}</div>`;
}
async function pasang() {
  if (tundaInstal) { tundaInstal.prompt(); await tundaInstal.userChoice; tundaInstal = null; draw(); return; }
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  dialog('Pasang ResepKu', ios
    ? 'Di Safari, ketuk ikon Bagikan lalu pilih "Tambah ke Layar Utama".'
    : 'Buka menu ⋮ di browser lalu pilih "Instal aplikasi" atau "Tambahkan ke layar utama". Situs harus dibuka lewat https.', 'Mengerti', null);
}

/* --- Unggah foto resep dari galeri --- */
// Tampilan area foto: kosong (tombol pilih) atau berisi (pratinjau, ganti, hapus)
function blokFoto() {
  if (!S.fotoForm) return `<div class="fprev kos">${PH}<span>Belum ada foto</span></div><label class="btn out" for="f_foto">Pilih Foto dari Galeri</label><p class="sub" style="margin-top:6px">Opsional. Format JPG, PNG, atau WEBP, maksimal 5 MB. Tanpa foto, resep memakai gambar pengganti.</p>`;
  return `<div class="fprev"><img src="${S.fotoForm}" alt="Pratinjau foto resep"></div><div class="row"><label class="btn out" for="f_foto">Ganti Foto</label><button class="btn out" style="color:#E53935;border-color:#E53935" onclick="hapusFoto()">Hapus Foto</button></div>`;
}
function pilihFoto(inp) {
  const f = inp.files[0]; inp.value = ''; // dikosongkan agar foto yang sama bisa dipilih lagi
  if (!f) return;
  if (!['image/jpeg','image/png','image/webp'].includes(f.type)) return err('f_foto', 'Format harus JPG, JPEG, PNG, atau WEBP');
  if (f.size > 5 * 1024 * 1024) return err('f_foto', 'Ukuran foto maksimal 5 MB. Pilih foto yang lebih kecil');
  err('f_foto', '');
  const rd = new FileReader();
  rd.onerror = () => err('f_foto', 'Foto tidak dapat dibaca. Coba foto lain');
  rd.onload = () => {
    const im = new Image();
    im.onerror = () => err('f_foto', 'File ini bukan gambar yang valid');
    im.onload = () => { // perkecil ke maksimal 900 px lalu kompres agar hemat penyimpanan
      const k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      S.fotoForm = c.toDataURL('image/jpeg', 0.8);
      $('fotoblok').innerHTML = blokFoto();
    };
    im.src = rd.result;
  };
  rd.readAsDataURL(f);
}
function hapusFoto() { S.fotoForm = ''; err('f_foto', ''); $('fotoblok').innerHTML = blokFoto(); }

/* ===== 8. MULAI ===== */
// Sesi valid -> Beranda; belum login tapi sudah onboarding -> Login; pengguna baru -> Onboarding
const layarAwal = () => aku() ? 'home' : (baca('onb', 0) ? 'login' : 'onb1');
draw();
// Gambar ulang saat ukuran layar melewati batas desktop (mis. jendela diperbesar)
if (typeof matchMedia === 'function') matchMedia('(min-width:1024px)').addEventListener('change', () => draw());
setTimeout(() => {
  if (S.scr !== 'splash') return;
  tab(layarAwal());
}, 2000);

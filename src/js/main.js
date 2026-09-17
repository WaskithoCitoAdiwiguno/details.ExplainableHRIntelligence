(function () {
  'use strict';

  /* ---------- Screenshots slider data ---------- */
  var SLIDES = [
    {
      img: 'src/img/prediction-form.png',
      alt: { id: 'Antarmuka AI Employee Attrition Detector — dropbox CSV dan tombol prediksi', en: 'AI Employee Attrition Detector interface — CSV dropbox and predict button' },
      title: { id: 'Input & Pilih Karyawan', en: 'Input & Employee Picker' },
      desc: {
        id: 'Unggah CSV hasil cleaning dari Notebook A (kolom harus sama dengan data training), dan seluruh baris langsung ter-load ke dropbox "Pilih Karyawan" — lengkap dengan role, departemen, umur, dan masa kerja. Satu klik pada tombol oranye memulai prediksi.',
        en: 'Upload the cleaned CSV from Notebook A (columns must match training data) and every row is loaded into the "Pick Employee" dropdown — complete with role, department, age, and tenure. One click on the orange button starts the prediction.'
      }
    },
    {
      img: 'src/img/shap-waterfall.png',
      alt: { id: 'Grafik SHAP Waterfall — kontribusi tiap fitur terhadap prediksi', en: 'SHAP Waterfall chart — each feature contribution to the prediction' },
      title: { id: 'SHAP Waterfall — "Mengapa?"', en: 'SHAP Waterfall — the "Why?"' },
      desc: {
        id: 'Bukan sekadar angka probabilitas: waterfall SHAP menunjukkan perjalanan dari baseline E[f(X)] menuju prediksi akhir f(x). Batang merah (NumCompaniesWorked +0.95, OverTime +0.6) mendorong risiko naik, batang biru (JobSatisfaction −0.56) menahannya — per fitur, per karyawan.',
        en: 'More than a probability: the SHAP waterfall traces the path from baseline E[f(X)] to the final prediction f(x). Red bars (NumCompaniesWorked +0.95, OverTime +0.6) push risk up, blue bars (JobSatisfaction −0.56) hold it down — feature by feature, employee by employee.'
      }
    },
    {
      img: 'src/img/ai-narrative.png',
      alt: { id: 'Narasi HR dari LLM — ringkasan, faktor utama, dan rekomendasi', en: 'LLM-generated HR narrative — summary, key factors, and recommendations' },
      title: { id: 'Narasi HR dari LLM', en: 'LLM-Generated HR Narrative' },
      desc: {
        id: 'LLM via Groq menerjemahkan angka SHAP menjadi bahasa HR: ringkasan risiko 90.5% (kategori TINGGI), penjelasan faktor utama secara bisnis (mobilitas tinggi, lembur, work-life balance), dan tiga paket rekomendasi konkret — peninjauan beban kerja, jalur karier, hingga inisiatif kesejahteraan.',
        en: 'An LLM via Groq translates SHAP numbers into HR language: a 90.5% risk summary (HIGH tier), business-level explanation of the key drivers (job hopping, overtime, work-life balance), and three concrete intervention packages — workload review, career pathing, and wellbeing initiatives.'
      }
    }
  ];

  var AUTOPLAY_MS = 10000;

  var i18n = {
    id: {
      back: 'Kembali ke Profil',
      kicker: 'Proyek Unggulan · Explainable AI',
      lede: 'Sistem prediksi risiko resign karyawan yang dapat dijelaskan: model machine learning memperkirakan peluang karyawan resign, SHAP membuka "mengapa"-nya per fitur, dan LLM (Groq) menerjemahkan angka-angka itu menjadi ringkasan serta rekomendasi yang bisa dibaca HR tanpa latar belakang data science.',
      btnCode: 'Kode & Notebook',
      btnHow: 'Cara Kerja',
      stat1: 'ROC-AUC model terpilih',
      stat2: 'Recall kelas resign',
      stat3: 'Model dibandingkan',
      stat4: 'Baris data karyawan',
      flowTitle: 'Alur Pengguna',
      flowSub: 'Dari baris CSV menjadi keputusan HR yang bisa dijelaskan — empat langkah.',
      c1h: 'Unggah Data',
      c1b: 'Drop CSV hasil cleaning dari Notebook A — kolom wajib sama seperti data training, 1.470 baris dimuat dalam sekejap.',
      c2h: 'Pilih Karyawan',
      c2b: 'Setiap baris CSV ter-load sebagai opsi di dropbox "Pilih Karyawan" — lengkap dengan role, departemen, umur, dan tahun kerja.',
      c3h: 'Prediksi & SHAP',
      c3b: 'Satu tombol menghasilkan probabilitas resign plus waterfall SHAP: fitur mana yang mendorong naik, mana yang menahan.',
      c4h: 'Narasi HR (LLM)',
      c4b: 'LLM via Groq menerjemahkan angka SHAP menjadi ringkasan, faktor utama, dan rekomendasi intervensi berbahasa manusia.',
      galleryTitle: 'Tangkapan Layar',
      gallerySub: 'Geser otomatis setiap 10 detik — klik gambar untuk melihat lebih detail.',
      archTitle: 'Metodologi & Hasil Model',
      archSub: 'Baseline kompetitif dulu, baru pilih model berdasarkan metrik yang relevan untuk HR.',
      expTitle: 'Eksperimen Model',
      expNote: '10 algoritme diadu pada dataset IBM HR Attrition (1.470 baris, 31 kolom). Logistic Regression keluar sebagai pemenang — bukan karena paling rumit, tapi karena paling seimbang menangkap kelas minoritas "resign".',
      exp1: '<b>Logistic Regression</b> — ROC-AUC 0.799 · Recall 0.596 · F1 0.427 → dipilih',
      exp2: '<b>AdaBoost</b> — ROC-AUC 0.798 · Precision tertinggi 0.560',
      exp3: '<b>Gradient Boosting / Random Forest / LightGBM</b> — akurasi tinggi (0.84+) tapi recall rendah',
      exp4: '<b>Kesimpulan</b> — model "terbaik" bergantung pada biaya salah: untuk HR, melewatkan karyawan yang mau resign lebih mahal daripada false alarm',
      xaiTitle: 'Penjelasan & Narasi',
      xai1: '<b>SHAP Waterfall</b> — kontribusi tiap fitur dari baseline E[f(X)] menuju f(x) per karyawan',
      xai2: '<b>Risk tiering</b> — Rendah <30%, Sedang 30–60%, Tinggi >60%, mengikuti kerangka Pavithran & Vadivel (2026, Frontiers in Big Data)',
      xai3: '<b>Narasi LLM</b> — Groq menerjemahkan SHAP menjadi Ringkasan · Faktor Utama · Rekomendasi intervensi sesuai tier',
      xai4: '<b>Guardrail</b> — prediksi & SHAP tetap jalan meski kunci LLM tidak tersedia; narasi hanya gagal sendirinya',
      techTitle: 'Teknologi yang Digunakan',
      techSub: 'Stack yang menopang seluruh sistem.',
      glanceTitle: 'Sekilas',
      glanceSub: 'Poin-poin yang membuat sistem ini berguna bagi HR.',
      hl1Big: 'XAI Native',
      hl1Lbl: 'Bukan black box — setiap prediksi datang dengan alasan per fitur',
      hl2Big: 'Bahasa HR',
      hl2Lbl: 'Angka SHAP diterjemahkan LLM jadi ringkasan & rekomendasi yang bisa dibaca manajemen',
      hl3Lbl: 'Algoritme dibandingkan secara adil, model dipilih dari metrik — bukan selera',
      ctaTitle: 'Jelajahi Kode & Notebook',
      ctaSub: 'Seluruh eksperimen, notebook, dan kode sistem tersedia di GitHub — termasuk detail alur data dari CSV hingga narasi.',
      ctaBtn1: 'GitHub ↗',
      ctaBtn2: 'Proyek lain: DHCIP ↗'
    },
    en: {
      back: 'Back to Profile',
      kicker: 'Featured Project · Explainable AI',
      lede: 'An explainable employee attrition-risk system: a machine learning model estimates the chance an employee resigns, SHAP reveals the "why" feature by feature, and an LLM (Groq) translates those numbers into a summary and recommendations any HR reader can act on.',
      btnCode: 'Code & Notebook',
      btnHow: 'How It Works',
      stat1: 'ROC-AUC of chosen model',
      stat2: 'Recall on resign class',
      stat3: 'Models compared',
      stat4: 'Employee data rows',
      flowTitle: 'User Flow',
      flowSub: 'From a CSV row to an explainable HR decision — four steps.',
      c1h: 'Upload Data',
      c1b: 'Drop the cleaned CSV from Notebook A — columns must match training data; 1,470 rows load in a snap.',
      c2h: 'Pick an Employee',
      c2b: 'Every CSV row appears in the "Pick Employee" dropdown — with role, department, age, and years of service.',
      c3h: 'Predict & Explain',
      c3b: 'One button yields the resignation probability plus a SHAP waterfall: which features push risk up, which hold it back.',
      c4h: 'HR Narrative (LLM)',
      c4b: 'An LLM via Groq turns SHAP numbers into a plain-language summary, key factors, and intervention recommendations.',
      galleryTitle: 'Screenshots',
      gallerySub: 'Auto-advances every 10 seconds — click an image to view it in full size.',
      archTitle: 'Methodology & Model Results',
      archSub: 'Compete fairly first, then pick the model on the metric that matters for HR.',
      expTitle: 'Model Experiment',
      expNote: '10 algorithms competed on the IBM HR Attrition dataset (1,470 rows, 31 columns). Logistic Regression won — not because it is the fanciest, but because it balances the minority "resign" class best.',
      exp1: '<b>Logistic Regression</b> — ROC-AUC 0.799 · Recall 0.596 · F1 0.427 → chosen',
      exp2: '<b>AdaBoost</b> — ROC-AUC 0.798 · highest precision 0.560',
      exp3: '<b>Gradient Boosting / Random Forest / LightGBM</b> — high accuracy (0.84+) but low recall',
      exp4: '<b>Takeaway</b> — the "best" model depends on error costs: for HR, missing a would-be leaver costs more than a false alarm',
      xaiTitle: 'Explanation & Narrative',
      xai1: '<b>SHAP Waterfall</b> — per-feature contributions from baseline E[f(X)] to f(x) for each employee',
      xai2: '<b>Risk tiering</b> — Low <30%, Medium 30–60%, High >60%, following Pavithran & Vadivel (2026, Frontiers in Big Data)',
      xai3: '<b>LLM Narrative</b> — Groq renders SHAP into Summary · Key Factors · tier-matched intervention recommendations',
      xai4: '<b>Guardrail</b> — prediction & SHAP keep working even without an LLM key; only the narrative degrades',
      techTitle: 'Technologies Used',
      techSub: 'The stack powering the entire system.',
      glanceTitle: 'At a Glance',
      glanceSub: 'What makes this system useful for HR.',
      hl1Big: 'XAI Native',
      hl1Lbl: 'Not a black box — every prediction ships with per-feature reasons',
      hl2Big: 'HR Language',
      hl2Lbl: 'SHAP numbers become summaries & recommendations management can actually read',
      hl3Lbl: 'Algorithms compared fairly; the model was picked on metrics — not taste',
      ctaTitle: 'Explore the Code & Notebook',
      ctaSub: 'All experiments, notebooks, and system code are on GitHub — including the full data flow from CSV to narrative.',
      ctaBtn1: 'GitHub ↗',
      ctaBtn2: 'Another project: DHCIP ↗'
    }
  };

  var STORE_KEY = 'ehri-lang';

  function currentLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'id';
  }

  /* ---------- Slider ---------- */
  var slider = document.getElementById('slider');
  var slidesWrap = document.getElementById('slides');
  var dotsWrap = document.getElementById('slide-dots');
  var progressBar = document.getElementById('slide-progress-bar');
  var current = 0;
  var timer = null;
  var hovering = false;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function renderSlides() {
    if (!slidesWrap || !dotsWrap) return;
    var lang = currentLang();
    var html = '';
    for (var i = 0; i < SLIDES.length; i++) {
      var s = SLIDES[i];
      html += '<figure class="slide" data-index="' + i + '">'
        + '<div class="slide-inner">'
        + '<div class="slide-img" data-lightbox>'
        + '<img src="' + s.img + '" alt="' + s.alt[lang] + '" data-full="' + s.img + '" />'
        + '</div>'
        + '<figcaption class="slide-info">'
        + '<span class="num">' + pad(i + 1) + ' / ' + pad(SLIDES.length) + '</span>'
        + '<h3>' + s.title[lang] + '</h3>'
        + '<p class="desc">' + s.desc[lang] + '</p>'
        + '</figcaption>'
        + '</div>'
        + '</figure>';
    }
    slidesWrap.innerHTML = html;

    var dotsHtml = '';
    for (var j = 0; j < SLIDES.length; j++) {
      dotsHtml += '<button type="button" data-go="' + j + '" aria-label="Slide ' + (j + 1) + '"></button>';
    }
    dotsWrap.innerHTML = dotsHtml;
  }

  function restartProgress() {
    if (!progressBar) return;
    progressBar.classList.remove('run');
    void progressBar.offsetWidth; /* reflow to restart the CSS animation */
    progressBar.classList.add('run');
  }

  function show(index) {
    if (!slidesWrap) return;
    var total = SLIDES.length;
    current = ((index % total) + total) % total;

    var slides = slidesWrap.children;
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.toggle('active', i === current);
    }

    var dots = dotsWrap.children;
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle('active', d === current);
    }
    restartProgress();
  }

  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(function () {
      if (!hovering) show(current + 1);
    }, AUTOPLAY_MS);
  }

  if (slider) {
    document.getElementById('slide-prev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('slide-next').addEventListener('click', function () { show(current + 1); });

    dotsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-go]');
      if (btn) show(parseInt(btn.getAttribute('data-go'), 10));
    });

    /* Pause while hovering (timer skips ticks); fresh 10s cycle on leave */
    slider.addEventListener('mouseenter', function () { hovering = true; });
    slider.addEventListener('mouseleave', function () { hovering = false; show(current); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- Lightbox (delegation: works for hero + re-rendered slides) ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCap = document.getElementById('lightbox-cap');
  var closeBtn = document.getElementById('lightbox-close');

  function openLightbox(fig) {
    if (!lightbox) return;
    var img = fig.querySelector('img');
    if (!img) return;
    var cap = fig.querySelector('figcaption');
    if (!cap) {
      var host = fig.closest('figure');
      cap = host ? host.querySelector('.slide-info h3') : null;
    }
    lightboxImg.src = img.getAttribute('data-full') || img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = cap ? cap.textContent : '';
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
  }

  document.addEventListener('click', function (e) {
    var fig = e.target.closest('[data-lightbox]');
    if (fig) openLightbox(fig);
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lightboxImg || e.target === lightboxCap) closeLightbox();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- i18n ---------- */
  function setLang(lang) {
    var dict = i18n[lang] || i18n.id;
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (dict[key] !== undefined) nodes[i].innerHTML = dict[key];
    }

    var buttons = document.querySelectorAll('.lang-toggle button');
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.toggle('active', buttons[j].getAttribute('data-lang') === lang);
    }

    renderSlides();
    show(current);

    try { localStorage.setItem(STORE_KEY, lang); } catch (err) { /* private mode */ }
  }

  var toggle = document.querySelectorAll('.lang-toggle button');
  for (var k = 0; k < toggle.length; k++) {
    toggle[k].addEventListener('click', function () {
      setLang(this.getAttribute('data-lang'));
    });
  }

  /* ---------- Init ---------- */
  var saved = 'id';
  try { saved = localStorage.getItem(STORE_KEY) || 'id'; } catch (err) { /* private mode */ }
  setLang(saved);
  show(0);
  startAuto();
})();

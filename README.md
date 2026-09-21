# details.ExplainableHRIntelligence

Halaman detail proyek **Explainable Human Capital Intelligence Framework — AI Employee Attrition Detector**, di-host di GitHub Pages dari repositori ini. Halaman ini ditautkan dari kartu proyek pada [profil GitHub saya](https://github.com/WaskithoCitoAdiwiguno).

## Tentang Proyek

Sistem prediksi risiko resign karyawan yang dapat dijelaskan (explainable):

- **Model** — Logistic Regression (terpilih dari perbandingan 10 algoritme; ROC-AUC 0.799, Recall 0.596 pada dataset IBM HR Attrition, 1.470 baris)
- **Explainability** — SHAP Waterfall per karyawan: fitur mana yang mendorong risiko naik/turun
- **Narasi HR** — LLM via Groq menerjemahkan angka SHAP menjadi Ringkasan · Faktor Utama · Rekomendasi intervensi, dengan risk tiering Rendah <30% / Sedang 30–60% / Tinggi >60% (kerangka Pavithran & Vadivel, 2026)
- **Antarmuka** — Gradio: unggah CSV → pilih karyawan dari dropbox → prediksi → SHAP → narasi

## Isi

- `index.html` — halaman detail (markup; styling dan script terpisah)
- `src/css/style.css` — styling tema indigo + media queries (breakpoint 900px / 560px / 420px)
- `src/js/main.js` — slider tangkapan layar (autoplay 10 detik), lightbox, toggle bahasa ID/ENG
- `src/img/` — tangkapan layar antarmuka Gradio (form prediksi, SHAP waterfall, narasi AI)
- `src/data/employee_attrition_clean.csv` — dataset demo yang diunggah saat penggunaan
- `src/system/Employee_Attriction_AI_(1_0).ipynb` — notebook sumber: EDA, eksperimen 10 model, SHAP, prompt LLM, dan UI Gradio
- `README.md` — file ini

## Cara Deploy ke GitHub Pages

1. Push seluruh isi folder ini ke root branch `main` repositori `details.ExplainableHRIntelligence`.
2. Buka **Settings → Pages** di repositori tersebut.
3. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1–2 menit, halaman akan tersedia di:

   **https://waskithocitoadiwiguno.github.io/details.ExplainableHRIntelligence/**

## Catatan

- `index.html` memuat asset dari `src/` — pastikan folder `src/` ikut ter-push.
- Notebook di `src/system/` tidak menyimpan API key apa pun (BYOK — masukkan kunci Groq sendiri saat menjalankan).
- Dataset `employee_attrition_clean.csv` adalah dataset publik IBM HR Attrition yang telah dibersihkan — bukan data karyawan asli.
- Halaman responsif: tata letak menyesuaikan ponsel (grid 1 kolom, tombol full-width, slider dengan panah kecil).

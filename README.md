# details.ExplainableHRIntelligence

Halaman detail proyek **Explainable Human Capital Intelligence Framework — AI Employee Attrition Detector**, di-host di GitHub Pages dari repositori ini. Halaman ini ditautkan dari kartu proyek pada [profil GitHub saya](https://github.com/WaskithoCitoAdiwiguno).

## Tentang Proyek

Sistem prediksi risiko resign karyawan yang dapat dijelaskan (explainable):

- **Model** — Logistic Regression (terpilih dari 10 algoritme via RandomizedSearchCV; ROC-AUC 0.799, Recall 0.596 pada dataset IBM HR Attrition, 1.470 baris / 35 atribut), dikalibrasi Platt scaling (Brier 0.1578 → 0.1049) dan divalidasi Repeated Stratified K-Fold
- **Explainability** — SHAP Waterfall per karyawan: fitur mana yang mendorong risiko naik/turun
- **Narasi HR** — Llama-3.3-70B via Groq menerjemahkan angka SHAP menjadi Ringkasan · Faktor Utama · Rekomendasi intervensi yang terkondisi tier
- **Risk tiering** — berbasis persentil (Rendah · Sedang · Tinggi), bukan ambang absolut, agar adil pada data tidak seimbang (kerangka Pavithran & Vadivel, 2026)
- **Prescriptive** — modul simulasi what-if untuk menguji dampak intervensi terhadap risiko
- **Antarmuka** — Gradio: unggah CSV → pilih karyawan dari dropbox → prediksi → SHAP → narasi

## Publikasi

Framework ini dikembangkan sebagai Tugas Akhir (D-IV Teknik Informatika, ULBI, 2026) dan ditulis sebagai jurnal *"An Explainable Human Capital Intelligence Framework: Integrating SHAP and Large Language Models for Predictive and Prescriptive Employee Attrition Analytics"* (Waskitho Cito Adiwiguno, Roni Andarsyah, Mohamad Nurkamal Fauzan) — diajukan ke **JANAPATI** (Jurnal Ilmu Komputer dan Informatika, Universitas Pendidikan Ganesha).

## Isi

- `index.html` — halaman detail (markup; styling dan script terpisah)
- `src/css/style.css` — styling tema indigo + media queries (breakpoint 900px / 560px / 420px)
- `src/js/main.js` — slider tangkapan layar (autoplay 10 detik), lightbox, toggle bahasa ID/ENG
- `src/img/` — tangkapan layar antarmuka Gradio (form prediksi, SHAP waterfall, narasi AI)
- `src/data/employee_attrition_clean.csv` — dataset demo yang diunggah saat penggunaan
- `Employee_Attriction_AI_(1_0).ipynb` — notebook sumber: EDA, eksperimen 10 model, kalibrasi, SHAP, simulasi what-if, prompt LLM, dan UI Gradio
- `requirements.txt` — dependensi Python untuk menjalankan notebook (lihat di bawah)
- `README.md` — file ini

## Menjalankan Notebook

Notebook memuat seluruh eksperimen framework — dari CSV mentah hingga dashboard Gradio.

```bash
# 1. (Opsional tapi disarankan) buat virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS / Linux

# 2. Install semua dependensi
pip install -r requirements.txt

# 3. Jalankan Jupyter
pip install notebook
jupyter notebook "Employee_Attriction_AI_(1_0).ipynb"
```

Alternatif tanpa instalasi apa pun: upload notebook ke [Google Colab](https://colab.research.google.com/) — semua dependensi bisa di-install dari sel `!pip install` yang sudah tersedia di dalamnya.

**API key (BYOK):** di sel LLM, ganti placeholder `GROQ_API_KEY_ANDA` dengan key Groq milikmu sendiri — buat gratis di [console.groq.com/keys](https://console.groq.com/keys). Key hanya hidup di sesi runtime-mu, tidak pernah tersimpan di repo.

## Cara Deploy ke GitHub Pages

1. Push seluruh isi folder ini ke root branch `main` repositori `details.ExplainableHRIntelligence`.
2. Buka **Settings → Pages** di repositori tersebut.
3. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1–2 menit, halaman akan tersedia di:

   **https://waskithocitoadiwiguno.github.io/details.ExplainableHRIntelligence/**

## Catatan

- `index.html` memuat asset dari `src/` — pastikan folder `src/` ikut ter-push.
- Notebook tidak menyimpan API key apa pun (BYOK — masukkan kunci Groq sendiri saat menjalankan, lihat bagian **Menjalankan Notebook**).
- Dataset `employee_attrition_clean.csv` adalah dataset publik IBM HR Attrition yang telah dibersihkan — bukan data karyawan asli.
- Halaman responsif: tata letak menyesuaikan ponsel (grid 1 kolom, tombol full-width, slider dengan panah kecil).

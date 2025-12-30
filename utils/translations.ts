
export type Language = 'id' | 'en';

export const translations = {
  id: {
    appTitle: "Kuis Matematika",
    subTitle: "Petualangan Angka!",
    meta: {
      title: "Kuis Matematika: Game Edukasi Anak & SD",
      description: "Game matematika #1 di Indonesia karya Febri Suryanto. Belajar berhitung jadi seru bersama Kuis Matematika. Download sekarang!",
      keywords: "kuis matematika, game edukasi anak, belajar matematika sd, math games indonesia, febri suryanto"
    },
    shop: {
      title: "Pilih Karakter",
      coins: "Koin:",
      buy: "BELI",
      select: "PAKAI",
      selected: "DIPAKAI",
      locked: "TERKUNCI",
      price: "Harga:",
      notEnough: "Koin Kurang!",
      success: "Berhasil!",
      confirm: "Beli karakter ini?"
    },
    nameInput: {
      title: "Siapa Namamu?",
      subtitle: "Pilih karakter dan mulai!",
      placeholder: "Ketik nama...",
      button: "MULAI MAIN",
      chooseAvatar: "Pilih Jagoanmu",
      abilityLabel: "Kekuatan Khusus:",
      heroName: "NAMA PAHLAWAN",
      startQuest: "MULAI PETUALANGAN",
      tapToShop: "KETUK UNTUK BELANJA"
    },
    settings: {
      title: "PENGATURAN",
      language: "BAHASA",
      music: "MUSIK BGM",
      sfx: "EFEK SUARA",
      info: "INFO"
    },
    about: {
      title: "Informasi Game",
      sectionGame: "Tentang Game",
      sectionDev: "Pengembang",
      sectionChangelog: "Riwayat Update",
      sectionCredits: "Kredit & Aset",
      gameDescription: "MathQuest adalah game edukasi interaktif yang dirancang untuk anak usia 6-12 tahun. Bertujuan melatih kemampuan berhitung (tambah, kurang, kali, bagi) dengan cara yang menyenangkan melalui sistem level dan koleksi avatar.",
      developerName: "Febri Suryanto",
      developerTitle: "Senior Frontend Engineer & UI/UX Specialist",
      developerBio: "Seorang pengembang web yang berdedikasi menciptakan pengalaman digital edukatif yang menyenangkan bagi anak-anak Indonesia. Fokus pada performa dan estetika visual.",
      developerLocation: "Serang Banten, Indonesia",
      visit: "Kunjungi Website",
      socialFollow: "Ikuti Saya:",
      versionLabel: "Versi Saat Ini",
      close: "Tutup",
      madeWith: "DIBUAT DENGAN",
      inLocation: "DI SERANG BANTEN",
      fromBanten: "Dibuat dengan cinta dari Serang Banten",
      changes: [
        "v0.8: Lokasi Pengembang diperbarui ke Serang Banten & Copyright Dinamis.",
        "v0.7: Perbaikan translasi 100% & Manual Toggle Bahasa.",
        "v0.6: Bahasa Indonesia Default & Deteksi Otomatis, Lokasi Dev Terkini.",
        "v0.5: Perbaikan UI Responsif, Optimasi Font, Popup Info 3D Solid Candy.",
        "v0.4: Fitur PWA (Install App di Semua OS), Mode Offline Penuh, Notifikasi Update.",
        "v0.3: Sistem Toko (Shop), Mata Uang Koin, Leaderboard Global, Skill Khusus Avatar.",
        "v0.2: Pemilihan Kategori Usia (4-12 Tahun), Level Adaptif (1-10), Integrasi Musik & SFX.",
        "v0.1: Rilis Alpha (Mekanik Dasar Kuis, Visual Awal).",
      ],
      assets: [
        "Framework: React & Tailwind CSS",
        "Icons: Lucide React",
        "Backend: Supabase Realtime",
        "Audio: Web Audio API (Generated)"
      ]
    },
    ageSelect: {
      title: "Halo Teman!",
      subtitle: "Berapa usiamu?",
      years: "Th"
    },
    menu: {
      age: "Usia",
      locked: "Terkunci",
      rankStats: "PERINGKAT & STATS"
    },
    game: {
      score: "SKOR",
      loading: "Memuat...",
      correct: "BENAR!",
      scorePopup: "poin",
      oops: "OOPS!",
      correctAnswerIs: "JAWABAN BENAR ADALAH:",
      finish: "SELESAI"
    },
    result: {
      amazing: "Luar Biasa!",
      good: "Bagus Sekali!",
      oops: "Oops!",
      levelComplete: "Level Selesai!",
      tryAgain: "Ayo coba lagi!",
      score: "Skor",
      earnedCoins: "Koin Didapat",
      totalCoins: "Total Koin",
      target: "Target",
      next: "Lanjut",
      retry: "Ulangi",
      menu: "Menu"
    },
    stats: {
      title: "Pencapaian",
      score: "Skor",
      accuracy: "Akurasi",
      winRate: "Menang",
      chartTitle: "PROGRES LEVEL",
      leaderboardTitle: "PAPAN PERINGKAT",
      emptyLeaderboard: "Belum ada juara. Jadilah yang pertama!",
      ranks: {
        beginner: "Murid Pemula",
        adventurer: "Petualang Angka",
        expert: "Ahli Matematika",
        master: "Master Kuis"
      }
    },
    ui: {
      shopHeader: "TOKO KARAKTER",
      close: "TUTUP",
      select: "PILIH",
      buyFor: "BELI SEHARGA"
    },
    abilities: {
      robot: "Skor +5% (Cerdas)",
      angel: "Waktu +5 Detik (Pelindung)",
      fairy: "Bonus Streak Besar (Ajaib)",
      wizard: "Waktu +2 Detik (Penyihir)",
      royal: "Skor +25% (Raja)",
      hero: "Skor +15% (Pemberani)",
      cat: "Mulai dengan Combo x1 (Lincah)",
      bunny: "Waktu +5 Detik (Cepat)",
      bear: "Waktu +3 Detik (Kuat)",
      dino: "Bonus Streak Raksasa (Ganas)",
      ninja: "Mulai dengan Combo x2 (Senyap)",
      alien: "Waktu +4 Detik (Antariksa)"
    }
  },
  en: {
    appTitle: "Math Quiz",
    subTitle: "Number Adventure!",
    meta: {
      title: "Math Quiz: Kids Educational Game",
      description: "The #1 Math Game for Kids created by Febri Suryanto. Learn counting, addition, multiplication with fun avatars. Play Math Quiz now!",
      keywords: "math quiz, kids math games, educational games, learn math, elementary math, febri suryanto"
    },
    shop: {
      title: "Choose Character",
      coins: "Coins:",
      buy: "BUY",
      select: "SELECT",
      selected: "SELECTED",
      locked: "LOCKED",
      price: "Price:",
      notEnough: "Need more coins!",
      success: "Purchased!",
      confirm: "Buy this character?"
    },
    nameInput: {
      title: "What's Your Name?",
      subtitle: "Choose a hero and start!",
      placeholder: "Type name...",
      button: "START GAME",
      chooseAvatar: "Choose Hero",
      abilityLabel: "Special Power:",
      heroName: "HERO NAME",
      startQuest: "START QUEST",
      tapToShop: "TAP TO SHOP"
    },
    settings: {
      title: "SETTINGS",
      language: "LANGUAGE",
      music: "BGM MUSIC",
      sfx: "SOUND FX",
      info: "INFO"
    },
    about: {
      title: "Game Information",
      sectionGame: "About Game",
      sectionDev: "Developer",
      sectionChangelog: "Update History",
      sectionCredits: "Credits & Assets",
      gameDescription: "MathQuest is an interactive educational game designed for children aged 6-12. It aims to train math skills (addition, subtraction, multiplication, division) in a fun way through a leveling system and avatar collection.",
      developerName: "Febri Suryanto",
      developerTitle: "Senior Frontend Engineer & UI/UX Specialist",
      developerBio: "A dedicated web developer creating fun educational digital experiences for children. Focused on performance and visual aesthetics.",
      developerLocation: "Serang Banten, Indonesia",
      visit: "Visit Website",
      socialFollow: "Follow Me:",
      versionLabel: "Current Version",
      close: "Close",
      madeWith: "MADE WITH",
      inLocation: "IN SERANG BANTEN",
      fromBanten: "Built with love from Serang Banten",
      changes: [
        "v0.8: Developer location updated to Serang Banten & Dynamic Copyright.",
        "v0.7: 100% Translation Fix & Manual Language Toggle.",
        "v0.6: Default Indonesian & Auto Detection, Latest Dev Location.",
        "v0.5: Responsive UI Fix, Font Polish, 3D Solid Candy Info Popup.",
        "v0.4: PWA Support (Install App on any OS), Full Offline Mode, Update Notifications.",
        "v0.3: Shop System, Coins, Global Leaderboard, Avatar Unique Skills.",
        "v0.2: Age Selection (4-12 Yo), Adaptive Levels (1-10), Music & SFX Integration.",
        "v0.1: Alpha Release (Basic Quiz Mechanics, Initial Visuals).",
      ],
      assets: [
        "Framework: React & Tailwind CSS",
        "Icons: Lucide React",
        "Backend: Supabase Realtime",
        "Audio: Web Audio API (Generated)"
      ]
    },
    ageSelect: {
      title: "Hello Friend!",
      subtitle: "How old are you?",
      years: "Yo"
    },
    menu: {
      age: "Age",
      locked: "Locked",
      rankStats: "RANK & STATS"
    },
    game: {
      score: "SCORE",
      loading: "Loading...",
      correct: "CORRECT!",
      scorePopup: "pts",
      oops: "OOPS!",
      correctAnswerIs: "CORRECT ANSWER IS:",
      finish: "FINISH"
    },
    result: {
      amazing: "Amazing!",
      good: "Great Job!",
      oops: "Oops!",
      levelComplete: "Level Complete!",
      tryAgain: "Let's try again!",
      score: "Score",
      earnedCoins: "Coins Earned",
      totalCoins: "Total Coins",
      target: "Target",
      next: "Next",
      retry: "Retry",
      menu: "Menu"
    },
    stats: {
      title: "Achievements",
      score: "Score",
      accuracy: "Accuracy",
      winRate: "Win Rate",
      chartTitle: "LEVEL PROGRESS",
      leaderboardTitle: "LEADERBOARD",
      emptyLeaderboard: "No champions yet. Be the first!",
      ranks: {
        beginner: "Beginner Student",
        adventurer: "Number Adventurer",
        expert: "Math Expert",
        master: "Quiz Master"
      }
    },
    ui: {
      shopHeader: "CHARACTER SHOP",
      close: "CLOSE",
      select: "SELECT",
      buyFor: "BUY FOR"
    },
    abilities: {
      robot: "Score +5% (Smart)",
      angel: "Time +5 Seconds (Guardian)",
      fairy: "Huge Streak Bonus (Magic)",
      wizard: "Time +2 Seconds (Wizardry)",
      royal: "Score +25% (King)",
      hero: "Score +15% (Brave)",
      cat: "Start with Combo x1 (Agile)",
      bunny: "Time +5 Seconds (Fast)",
      bear: "Time +3 Seconds (Strong)",
      dino: "Giant Streak Bonus (Fierce)",
      ninja: "Start with Combo x2 (Stealth)",
      alien: "Time +4 Seconds (Space)"
    }
  }
};

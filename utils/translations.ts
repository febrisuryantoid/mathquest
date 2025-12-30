
export type Language = 'id' | 'en';

export const translations = {
  id: {
    appTitle: "KUIS MATEMATIKA",
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
      abilityLabel: "Kekuatan:",
      heroName: "NAMA HERO",
      startQuest: "MULAI",
      tapToShop: "KE TOKO",
      leaderboardBtn: "PERINGKAT"
    },
    settings: {
      title: "PENGATURAN",
      language: "BAHASA",
      music: "MUSIK",
      sfx: "EFEK SUARA",
      info: "INFO",
      theme: "TEMA",
      darkMode: "MODE GELAP"
    },
    about: {
      title: "Info Game",
      sectionGame: "Tentang",
      sectionDev: "Pengembang",
      sectionChangelog: "Update",
      sectionCredits: "Kredit",
      gameDescription: "MathQuest adalah game edukasi interaktif untuk anak usia 6-12 tahun. Melatih berhitung (tambah, kurang, kali, bagi) dengan cara seru.",
      developerName: "Febri Suryanto",
      developerTitle: "Frontend Engineer",
      developerBio: "Pengembang web yang berdedikasi menciptakan pengalaman digital edukatif bagi anak Indonesia.",
      developerLocation: "Serang Banten, Indonesia",
      visit: "Website",
      socialFollow: "Ikuti:",
      versionLabel: "Versi",
      close: "Tutup",
      madeWith: "DIBUAT DENGAN",
      inLocation: "DI SERANG BANTEN",
      fromBanten: "Dibuat dengan cinta dari Serang Banten",
      copyright: "Hak Cipta",
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
      subtitle: "Usiamu?",
      years: "Th"
    },
    menu: {
      age: "Usia",
      locked: "Terkunci",
      rankStats: "STATS"
    },
    game: {
      score: "SKOR",
      loading: "Memuat...",
      correct: "BENAR!",
      scorePopup: "poin",
      oops: "UPS!",
      correctAnswerIs: "JAWABANNYA:",
      finish: "SELESAI",
      progress: "Soal"
    },
    result: {
      amazing: "Luar Biasa!",
      good: "Bagus!",
      oops: "Ups!",
      levelComplete: "Selesai!",
      tryAgain: "Coba Lagi!",
      score: "Skor",
      earnedCoins: "Dapat Koin",
      totalCoins: "Total Koin",
      target: "Target",
      next: "Lanjut",
      retry: "Ulang",
      menu: "Menu"
    },
    stats: {
      title: "Prestasi",
      score: "Skor",
      accuracy: "Akurasi",
      winRate: "Menang",
      chartTitle: "PROGRES",
      leaderboardTitle: "PERINGKAT",
      emptyLeaderboard: "Belum ada juara.",
      ranks: {
        beginner: "Pemula",
        adventurer: "Petualang",
        expert: "Ahli",
        master: "Master"
      }
    },
    ui: {
      shopHeader: "TOKO",
      close: "TUTUP",
      select: "PILIH",
      buyFor: "BELI"
    },
    abilities: {
      robot: "Skor +5% (Cerdas)",
      angel: "Waktu +5s (Pelindung)",
      fairy: "Bonus Streak (Ajaib)",
      wizard: "Waktu +2s (Penyihir)",
      royal: "Skor +25% (Raja)",
      hero: "Skor +15% (Pemberani)",
      cat: "Combo Awal x1 (Lincah)",
      bunny: "Waktu +5s (Cepat)",
      bear: "Waktu +3s (Kuat)",
      dino: "Bonus Streak (Ganas)",
      ninja: "Combo Awal x2 (Senyap)",
      alien: "Waktu +4s (Antariksa)"
    }
  },
  en: {
    appTitle: "MATH QUEST",
    subTitle: "Number Adventure!",
    meta: {
      title: "Math Quiz: Kids Educational Game",
      description: "The #1 Math Game for Kids created by Febri Suryanto. Learn counting, addition, multiplication with fun avatars. Play Math Quiz now!",
      keywords: "math quiz, kids math games, educational games, learn math, elementary math, febri suryanto"
    },
    shop: {
      title: "Choose Hero",
      coins: "Coins:",
      buy: "BUY",
      select: "SELECT",
      selected: "CHOSEN",
      locked: "LOCKED",
      price: "Price:",
      notEnough: "Need Coins!",
      success: "Got it!",
      confirm: "Buy this hero?"
    },
    nameInput: {
      title: "Your Name?",
      subtitle: "Pick a hero & start!",
      placeholder: "Type name...",
      button: "START",
      chooseAvatar: "Pick Hero",
      abilityLabel: "Power:",
      heroName: "HERO NAME",
      startQuest: "START",
      tapToShop: "GO SHOP",
      leaderboardBtn: "RANKS"
    },
    settings: {
      title: "SETTINGS",
      language: "LANG",
      music: "MUSIC",
      sfx: "SOUND",
      info: "INFO",
      theme: "THEME",
      darkMode: "DARK MODE"
    },
    about: {
      title: "Game Info",
      sectionGame: "About",
      sectionDev: "Dev",
      sectionChangelog: "Updates",
      sectionCredits: "Credits",
      gameDescription: "MathQuest is a fun educational game for kids 6-12. Practice math skills with avatars and levels.",
      developerName: "Febri Suryanto",
      developerTitle: "Frontend Engineer",
      developerBio: "Dedicated web developer creating fun educational digital experiences for children.",
      developerLocation: "Serang Banten, Indonesia",
      visit: "Website",
      socialFollow: "Follow:",
      versionLabel: "Ver",
      close: "Close",
      madeWith: "MADE WITH",
      inLocation: "IN SERANG BANTEN",
      fromBanten: "Built with love from Serang Banten",
      copyright: "Copyright",
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
      title: "Hi Friend!",
      subtitle: "Age?",
      years: "Yo"
    },
    menu: {
      age: "Age",
      locked: "Locked",
      rankStats: "STATS"
    },
    game: {
      score: "SCORE",
      loading: "Loading...",
      correct: "CORRECT!",
      scorePopup: "pts",
      oops: "OOPS!",
      correctAnswerIs: "ANSWER:",
      finish: "FINISH",
      progress: "Quest"
    },
    result: {
      amazing: "Amazing!",
      good: "Great!",
      oops: "Oops!",
      levelComplete: "Done!",
      tryAgain: "Retry!",
      score: "Score",
      earnedCoins: "Coins",
      totalCoins: "Total",
      target: "Target",
      next: "Next",
      retry: "Retry",
      menu: "Menu"
    },
    stats: {
      title: "Stats",
      score: "Score",
      accuracy: "Accuracy",
      winRate: "Win Rate",
      chartTitle: "PROGRESS",
      leaderboardTitle: "RANKS",
      emptyLeaderboard: "No champions yet.",
      ranks: {
        beginner: "Beginner",
        adventurer: "Adventurer",
        expert: "Expert",
        master: "Master"
      }
    },
    ui: {
      shopHeader: "SHOP",
      close: "CLOSE",
      select: "PICK",
      buyFor: "BUY"
    },
    abilities: {
      robot: "Score +5% (Smart)",
      angel: "Time +5s (Guardian)",
      fairy: "Big Streak (Magic)",
      wizard: "Time +2s (Wizardry)",
      royal: "Score +25% (King)",
      hero: "Score +15% (Brave)",
      cat: "Combo Start x1 (Agile)",
      bunny: "Time +5s (Fast)",
      bear: "Time +3s (Strong)",
      dino: "Giant Streak (Fierce)",
      ninja: "Combo Start x2 (Stealth)",
      alien: "Time +4s (Space)"
    }
  }
};

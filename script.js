const config = {
  serverName: "Stellar",
  serverType: "CloneWars RP",
  serverDescription:
    "Plongez dans l'univers de Star Wars: The Clone Wars. Choisissez votre camp, combattez pour la République ou pour la CSI, et façonnez le destin de la galaxie !",
  alternateDescriptions: [
    "Affrontez vos adversaires dans des batailles épiques sur des planètes emblématiques de la galaxie.",
    "Devenez un héros de la République ou un leader redoutable de la Confédération des Systèmes Indépendants.",
    "Vivez des aventures palpitantes, formez des alliances et participez à des missions secrètes.",
    "Explorez un vaste univers Star Wars rempli de personnages iconiques et de technologies futuristes.",
    "Prenez part à des combats stratégiques, pilotez des vaisseaux légendaires et changez le cours de la guerre.",
  ],
  announceMessages: [
    { text: "Pour la République !", icon: "flag" },
    { text: "Que la Force soit avec vous, soldats.", icon: "jedi" },
    { text: "Restez vigilants, les droïdes ne sont jamais loin.", icon: "eye" },
    { text: "L'honneur guide nos actions.", icon: "shield-alt" },
    { text: "Ensemble, nous vaincrons les Séparatistes.", icon: "users" },
    { text: "La victoire est notre seule option.", icon: "trophy" },
    { text: "Protégez la galaxie, protégez vos frères.", icon: "globe" },
    { text: "Un clone, une mission, un but : la paix.", icon: "user-astronaut" },
    { text: "La République compte sur nous !", icon: "flag" },
    { text: "Votre entraînement vous a préparé à ce moment.", icon: "graduation-cap" },
    { text: "Chaque bataille nous rapproche de la fin de la guerre.", icon: "clock" },
    { text: "Restez en formation, restez en vie.", icon: "user-friends" },
  ],
  carouselInterval: 7000,
  announcementInterval: 5000,
  backgroundImages: [
    "images/tmp_wallpaper1.jpg",
    "images/tmp_wallpaper2.jpg",
    "images/tmp_wallpaper3.png",
    "images/tmp_wallpaper4.jpg",
  ],
  timeBasedMessages: {
    early: "Vous êtes bien matinal, soldat. La guerre n'attend pas !",
    normal: "Prêt pour le briefing, trooper ?",
    late: "Les droïdes n'attendent pas, soldat. En position !",
  },
  timeRanges: {
    early: { start: 0, end: 6 },
    normal: { start: 6, end: 22 },
    late: { start: 22, end: 24 },
  },
}

// Background Carousel
function setupBackgroundCarousel() {
  const carousel = document.getElementById("background-carousel")
  let currentImageIndex = 0

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  async function showNextImage() {
    const nextIndex = (currentImageIndex + 1) % config.backgroundImages.length
    const nextImage = await loadImage(config.backgroundImages[nextIndex])

    nextImage.style.opacity = "0"
    carousel.appendChild(nextImage)

    setTimeout(() => {
      nextImage.style.opacity = "1"
      if (carousel.children.length > 1) {
        carousel.children[0].style.opacity = "0"
        setTimeout(() => {
          carousel.removeChild(carousel.children[0])
        }, 1000)
      }
      currentImageIndex = nextIndex
    }, 50)
  }

  showNextImage()
  setInterval(showNextImage, config.carouselInterval)
}

// Server Description
function setupServerDescription() {
  const descriptionElement = document.getElementById("server-description")
  let currentIndex = 0

  function updateDescription() {
    const newDescription = config.alternateDescriptions[currentIndex]
    descriptionElement.classList.add("fade-out")

    setTimeout(() => {
      descriptionElement.textContent = newDescription
      descriptionElement.classList.remove("fade-out")
      descriptionElement.classList.add("fade-in")
      setTimeout(() => {
        descriptionElement.classList.remove("fade-in")
      }, 500)
    }, 500)

    currentIndex = (currentIndex + 1) % config.alternateDescriptions.length
  }

  descriptionElement.textContent = config.serverDescription
  setInterval(updateDescription, 10000)
}

// Server Info
function updateServerInfo() {
  const playerCount = document.getElementById("player-count")
  const currentMap = document.getElementById("current-map")
  const maps = ["Coruscant", "Geonosis", "Kamino", "Naboo", "Felucia"]

  setInterval(() => {
    playerCount.textContent = Math.floor(Math.random() * 50) + 1
    currentMap.textContent = maps[Math.floor(Math.random() * maps.length)]
  }, 5000)
}

// Loading Bar
function setupLoadingBar() {
  const progressFill = document.getElementById("progress-fill")
  const progressText = document.getElementById("progress-text")
  let progress = 0

  function updateProgress() {
    if (progress < 100) {
      progress += Math.floor(Math.random() * 5) + 1
      progressFill.style.width = `${progress}%`
      progressText.textContent = `${progress}%`
    }
  }

  const interval = setInterval(updateProgress, 200)
  setTimeout(() => clearInterval(interval), 20000)
}

// Announcements
function setupAnnouncements() {
  const announcementElement = document.getElementById("announcement")
  let currentIndex = 0

  function updateAnnouncement() {
    const newAnnouncement = config.announceMessages[currentIndex]
    announcementElement.classList.add("fade-out")

    setTimeout(() => {
      announcementElement.innerHTML = `<i class="fas fa-${newAnnouncement.icon}"></i> ${newAnnouncement.text}`
      announcementElement.classList.remove("fade-out")
      announcementElement.classList.add("fade-in")
      setTimeout(() => {
        announcementElement.classList.remove("fade-in")
      }, 500)
    }, 500)

    currentIndex = (currentIndex + 1) % config.announceMessages.length
  }

  updateAnnouncement()
  setInterval(updateAnnouncement, config.announcementInterval)
}

// Time-based Messages
function setupTimeBasedMessages() {
  const messageElement = document.getElementById("time-based-message")

  function updateTimeBasedMessage() {
    const now = new Date()
    const hour = now.getHours()
    let message

    if (hour >= config.timeRanges.early.start && hour < config.timeRanges.early.end) {
      message = config.timeBasedMessages.early
    } else if (hour >= config.timeRanges.normal.start && hour < config.timeRanges.normal.end) {
      message = config.timeBasedMessages.normal
    } else {
      message = config.timeBasedMessages.late
    }

    messageElement.textContent = message
  }

  updateTimeBasedMessage()
  setInterval(updateTimeBasedMessage, 60000)
}

// Background Music
function setupBackgroundMusic() {
  const musicToggle = document.getElementById("music-toggle")
  const backgroundMusic = document.getElementById("background-music")

  musicToggle.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play()
      musicToggle.textContent = "🔊"
    } else {
      backgroundMusic.pause()
      musicToggle.textContent = "🔇"
    }
  })
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  setupBackgroundCarousel()
  setupServerDescription()
  updateServerInfo()
  setupLoadingBar()
  setupAnnouncements()
  setupTimeBasedMessages()
  setupBackgroundMusic()
})


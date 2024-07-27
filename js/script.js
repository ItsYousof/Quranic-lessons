// Translations object
const translations = {
    en: {
        home: "Home",
        lessons: "Lessons",
        login: "Login",
        quranLearning: "Quran Learning",
        learnMeaning: "Learn the meaning of Quran.",
        start: "Start"
    },
    ar: {
        home: "الرئيسية",
        lessons: "الدروس",
        login: "تسجيل الدخول",
        quranLearning: "تعلم القرآن",
        learnMeaning: "تعلم معاني القرآن.",
        start: "ابدأ"
    }
};

// Set default language if not set
if (localStorage.getItem("language") === null) {
    localStorage.setItem("language", "en");
    localStorage.setItem("english", "true");
    localStorage.setItem("arabic", "false");
}

document.addEventListener('DOMContentLoaded', () => {
    let language = localStorage.getItem("language");
    let english = localStorage.getItem("english") === "true";
    let arabic = localStorage.getItem("arabic") === "true";

    // Set document language
    document.documentElement.lang = language;
    applyTranslations(language);

    if (english) {
        en.classList.add('flag');
        ar.classList.remove('flag');
    } else if (arabic) {
        ar.classList.add('flag');
        en.classList.remove('flag');
    }
    console.log(language, english, arabic);
});

ar.onclick = () => {
    localStorage.setItem("language", "ar");
    localStorage.setItem("english", "false");
    localStorage.setItem("arabic", "true");
    ar.classList.add('flag');
    en.classList.remove('flag');
    document.documentElement.lang = "ar";
    applyTranslations("ar");
}

en.onclick = () => {
    localStorage.setItem("language", "en");
    localStorage.setItem("english", "true");
    localStorage.setItem("arabic", "false");
    en.classList.add('flag');
    ar.classList.remove('flag');
    document.documentElement.lang = "en";
    applyTranslations("en");
}

// Function to apply translations
function applyTranslations(language) {
    document.getElementById('homeBtn').textContent = translations[language].home;
    document.getElementById('lessonBtn').textContent = translations[language].lessons;
    document.getElementById('loginBtn').textContent = translations[language].login;
    document.getElementById('type_text').textContent = translations[language].quranLearning;
    document.querySelector('.showcase_text p').textContent = translations[language].learnMeaning;
    document.getElementById('startBtn').textContent = translations[language].start;
}

function showLogin() {
    document.getElementById('loading-wrapper').style.display = 'block';
    let delay = setTimeout(() => {
        document.getElementById('loading-wrapper').style.display = 'none';
        document.getElementById('home').style.display = 'none';
        document.getElementById('lessons').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        clearTimeout(delay);
    }, 1000);
}

function showHome() {
    document.getElementById('loading-wrapper').style.display = 'block';
    let delay = setTimeout(() => {
        document.getElementById('loading-wrapper').style.display = 'none';
        document.getElementById('home').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('lessons').style.display = 'none';
        clearTimeout(delay);
    }, 1000);
}

function showLessons() {
    if (sessionStorage.getItem('Authenticated') === 'true') {
        document.getElementById('loading-wrapper').style.display = 'block';
        let delay = setTimeout(() => {
            document.getElementById('loading-wrapper').style.display = 'none';
            document.getElementById('home').style.display = 'none';
            document.getElementById('login').style.display = 'none';
            document.getElementById('lessons').style.display = 'block';
            loadVideos();
            clearTimeout(delay);
        }, 1000);
    } else {
        showLogin();
    }
}

function checkLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('../data/logins.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].username === username && data[i].password === password) {
                    document.getElementById('loading-wrapper').style.display = 'block';
                    let delay = setTimeout(() => {
                        document.getElementById('loading-wrapper').style.display = 'none';
                        showHome();
                        sessionStorage.setItem('Authenticated', 'true');
                        clearTimeout(delay);
                    }, 2000);
                    break;
                } else {

                }
            }
        })
}

function loadVideos() {
    fetch('../data/videos.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let video = data[i];
                let title = video.title;
                let thumbnail = video.image;
                let videoPlayer = video.video;

                let videoContainer = document.getElementById('lessons');
                let videoDiv = document.createElement('div');
                videoDiv.classList.add('video');
                videoDiv.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                    <p>${title}</p>
                    <p>من المعلمه: هنادي منكو</p>
                `;

                videoDiv.addEventListener('click', () => {
                    document.getElementById('loading-wrapper').style.display = 'block';
                    let delay = setTimeout(() => {
                        document.getElementById('loading-wrapper').style.display = 'none';
                        document.getElementById('video-player').style.display = 'block';
                        document.getElementById('video_player').src = videoPlayer;
                        clearTimeout(delay);
                    }, 1000);
                });
                videoContainer.appendChild(videoDiv);
            }
        })
}

function closeVideo() {
    document.getElementById('video-player').style.display = 'none';
    document.getElementById('video_player').src = '';
}
// 다크모드
const userColorTheme = localStorage.getItem('color-theme');
const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
const darkModeButton = document.querySelector('.btn-dark-mode');

const getUserTheme = () => (userColorTheme ? userColorTheme : osColorTheme);

window.addEventListener('load', () => {
    if (getUserTheme() === 'dark') {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        darkModeButton.classList.add('active');
        darkModeButton.setAttribute('name', '다크모드 OFF');
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        darkModeButton.classList.remove('active');
        darkModeButton.setAttribute('name', '다크모드 ON');
    }
});

darkModeButton.addEventListener('click', () => {
    if (darkModeButton.classList.contains('active')) {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        darkModeButton.classList.remove('active');
        darkModeButton.setAttribute('name', '다크모드 ON');
    } else {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        darkModeButton.classList.add('active');
        darkModeButton.setAttribute('name', '다크모드 OFF');
    }
});

// notice 닫기
const notice = document.querySelector('.main-notice');
const noticeCloseButton = document.querySelector('.notice-close');
const noticeValue =
    localStorage.getItem('notice-close') &&
    localStorage.getItem('notice-close');

window.addEventListener('load', () => {
    if (noticeValue === 'true') {
        notice.classList.remove('show');
    } else {
        notice.classList.add('show');
    }
});

noticeCloseButton.addEventListener('click', () => {
    if (notice.classList.contains('show')) {
        localStorage.setItem('notice-close', 'true');
        notice.classList.remove('show');
    } else {
        localStorage.setItem('notice-close', 'false');
        notice.classList.add('show');
    }
});

// 이전 서비스 이동 드롭다운 박스 여닫기
const previousButton = document.querySelector('.btn-previous');

previousButton.addEventListener('click', () => {
    previousButton.classList.toggle('active');
});

window.addEventListener('click', (e) => {
    if (!previousButton.contains(e.target)) {
        previousButton.classList.toggle('active');
    }
});

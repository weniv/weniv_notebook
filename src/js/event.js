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
        darkModeButton.dataset.tooltip = 'Dark mode OFF';
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        darkModeButton.classList.remove('active');
        darkModeButton.dataset.tooltip = 'Dark mode ON';
    }
});

darkModeButton.addEventListener('click', () => {
    if (darkModeButton.classList.contains('active')) {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        darkModeButton.classList.remove('active');
        darkModeButton.dataset.tooltip = 'Dark mode ON';
    } else {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        darkModeButton.classList.add('active');

        darkModeButton.dataset.tooltip = 'Dark mode OFF';
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
const previousDropdown = document.querySelector('.previous-dropdown');
const previousButton = document.querySelector('.btn-previous');

previousDropdown.addEventListener('click', (e) => {
    if (e.target == previousButton) {
        previousButton.classList.toggle('active');
    }
});

window.addEventListener('click', (e) => {
    if (e.target == previousDropdown || !previousDropdown.contains(e.target)) {
        previousButton.classList.contains('active') &&
            previousButton.classList.remove('active');
    }
});

// 툴팁 표시
const tooltipTargetElement = document.querySelectorAll('.show-tooltip');

const createTooltip = (textContent) => {
    const tooltipElement = document.createElement('div');
    tooltipElement.setAttribute('class', 'tooltip');
    tooltipElement.innerHTML = textContent;

    return tooltipElement;
};

const addTooltip = (target) => {
    const textContent = target.dataset.tooltip;

    if (textContent) {
        const targetHeight = target.clientHeight;
        const tooltip = createTooltip(textContent);
        tooltip.style.top = `${targetHeight + 10}px`;

        target.append(tooltip);
    }
};

const removeTooltip = (target) => {
    const tooltip = target.querySelector('.tooltip');
    tooltip && tooltip.remove();
};

const addTooltipEvent = (target) => {
    target.addEventListener(
        'mouseenter',
        () => {
            addTooltip(target);
        },
        false,
    );

    target.addEventListener(
        'mouseleave',
        () => {
            removeTooltip(target);
        },
        false,
    );

    target.addEventListener('click', () => {
        removeTooltip(target);
    });
};

tooltipTargetElement.forEach((target) => {
    addTooltipEvent(target);
});

// 위니브 사업자 정보 버튼 토글
const infoToggleButton = document.querySelector('.info-toggle-btn');

infoToggleButton.addEventListener('click', () => {
    infoToggleButton.classList.toggle('active');
});

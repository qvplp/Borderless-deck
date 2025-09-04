/**
 * イーサリアムサイトクローン - メインJavaScript
 * パフォーマンス最適化、エラーハンドリング、アクセシビリティ対応
 */

// グローバルエラーハンドリング
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    // 本番環境ではエラー追跡サービスに送信
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    event.preventDefault();
});

// DOM要素の取得（エラーハンドリング付き）
const getElement = (selector, required = true) => {
    const element = document.querySelector(selector);
    if (required && !element) {
        console.warn(`Required element not found: ${selector}`);
    }
    return element;
};

const navToggle = getElement('.nav-toggle');
const navMenu = getElement('.nav-menu');
const header = getElement('.header');
const themeToggle = getElement('.theme-toggle');

// パフォーマンス最適化: デバウンス関数
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// モバイルメニューのトグル（アクセシビリティ対応）
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // アクセシビリティ属性の更新
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.setAttribute('aria-label', !isExpanded ? 'メニューを閉じる' : 'メニューを開く');
        
        // フォーカス管理
        if (!isExpanded) {
            const firstMenuItem = navMenu.querySelector('a');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'メニューを開く');
            navToggle.focus();
        }
    });
}

// テーマ切り替え
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ヘッダーのスクロール効果（パフォーマンス最適化）
const handleScroll = debounce(() => {
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

// パフォーマンス監視
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['navigation'] });
}

// アニメーション用のIntersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// アニメーション対象要素の監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.use-case-card, .stat-item, .example-card, .topic-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// 統計数値のカウントアップアニメーション
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// 統計セクションが表示されたときにカウントアップを開始
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                if (number) {
                    stat.textContent = '0';
                    animateCounter(stat, number, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const activitySection = document.querySelector('.activity');
if (activitySection) {
    statsObserver.observe(activitySection);
}

// パーティクル効果（イーサリアムシンボル）
function createParticle() {
    const particle = document.createElement('div');
    particle.innerHTML = 'Ξ';
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-50px';
    particle.style.color = '#627eea';
    particle.style.fontSize = '20px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.opacity = '0.7';
    particle.style.animation = 'floatDown 8s linear forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// パーティクルアニメーションのCSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatDown {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// パーティクル効果の開始（5秒間隔）
setInterval(createParticle, 5000);

// ホバー効果の強化
document.querySelectorAll('.use-case-card, .example-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ボタンのリップル効果
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// リップル効果のCSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// スクロール進行度の表示
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #627eea, #764ba2);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// テーマ切り替え機能（ダークモード）
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// 保存されたテーマの適用
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }
    
    // アニメーション要素の監視を開始
    const animateElements = document.querySelectorAll('.use-case-card, .stat-item, .example-card, .topic-card, .action-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ダークテーマのCSS
const darkThemeStyle = document.createElement('style');
darkThemeStyle.textContent = `
    .dark-theme {
        background-color: #1a1a1a;
        color: #e0e0e0;
    }
    
    .dark-theme .header {
        background: rgba(26, 26, 26, 0.95);
        border-bottom-color: #333;
    }
    
    .dark-theme .use-case-card,
    .dark-theme .topic-card,
    .dark-theme .example-card {
        background: #2a2a2a;
        border-color: #333;
        color: #e0e0e0;
    }
    
    .dark-theme .footer {
        background: #0a0a0a;
    }
`;
document.head.appendChild(darkThemeStyle);

console.log('イーサリアムサイトが読み込まれました！🚀');

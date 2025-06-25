window.onload = function () {
    const loader = document.getElementById('loading');
    const content = document.getElementById('main');

    if (loader && content) {
        setTimeout(() => {
            loader.classList.add('hidden');
            content.classList.add('active');
            document.body.style.overflow = 'auto';
        }, 1500);
    } else {
        document.body.style.overflow = 'auto';
    }
};

async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Không thể tải ${file}`);
        const content = await response.text();
        document.getElementById(id).innerHTML = content;
    } catch (error) {
        console.error('Lỗi khi tải component:', error);
    }
}

function setupNavResponsive() {
    const overlay = document.getElementById('overlay');
    const sideNav = document.getElementById('sideNav');
    const menuBtn = document.getElementById('menu-btn-sidenav');
    const closeBtn = document.getElementById('close-btn-sidenav');

    if (!menuBtn || !sideNav || !overlay || !closeBtn) {
        console.error('Không tìm thấy một hoặc nhiều phần tử:', { menuBtn, sideNav, overlay, closeBtn });
        return;
    }

    menuBtn.addEventListener('click', () => {
        sideNav.classList.add('active');
        overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        sideNav.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        sideNav.classList.remove('active');
        overlay.classList.remove('active');    
    });
}

function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.error('Không tìm thấy nút scrollToTopBtn');
    }
}

async function initPage() {
    await Promise.all([
        loadComponent('header-id', 'header.html'),
        loadComponent('footer-id', 'footer.html')
    ]);

    setupNavResponsive();
    setupScrollToTop();
}

document.addEventListener('DOMContentLoaded', initPage);
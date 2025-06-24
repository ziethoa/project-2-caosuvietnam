// trang loading
window.onload = function () {
    const loader = document.getElementById('loading');
    const content = document.getElementById('main');

    // Ẩn loader sau khi trang tải xong
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1000);
    

    // Hiện nội dung chính
    setTimeout(() => {
        content.classList.add('active');
    }, 1000); 
    // Thời gian transition
};

 // load header footer
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

    // Kiểm tra xem các phần tử có tồn tại không
    if (!menuBtn || !sideNav || !overlay || !closeBtn) {
        console.error('Không tìm thấy một hoặc nhiều phần tử:', { menuBtn, sideNav, overlay, closeBtn });
        return;
    }

    // Sự kiện mở sidebar
    menuBtn.addEventListener('click', () => {
        sideNav.classList.add('active');
        overlay.classList.add('active');
    });

    // Sự kiện đóng sidebar
    closeBtn.addEventListener('click', () => {
        sideNav.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Đóng sidebar khi nhấn vào overlay
    overlay.addEventListener('click', () => {
        sideNav.classList.remove('active');
        overlay.classList.remove('active');    
    });
}

async function initPage() {
    // Tải header và footer
    await Promise.all([
        loadComponent('header-id', 'header.html'),
        loadComponent('footer-id', 'footer.html')
    ]);

    // Thiết lập sự kiện cho sidebar sau khi header được tải
    setupNavResponsive();
}

// Gắn sự kiện khi DOM được tải
document.addEventListener('DOMContentLoaded', initPage);
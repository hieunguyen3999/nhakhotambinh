// --- LOGIC SLIDER TRANG CHỦ ---
const heroImages = [
    'travis-scott-4k.jpg',
    'travis4k.jpg', 
    'travis-scott-live-3840x2765-12444.jpeg'
];
let currentBannerIndex = 0;
const heroBanner = document.getElementById('hero-banner');
let isChanging = false; // Thêm biến cờ để tránh thay đổi khi đang chuyển

function changeBanner() {
    if (heroBanner && !isChanging) {
        isChanging = true;
        // Đặt hình ảnh tiếp theo làm nền cho pseudo-element ::before
        const nextBannerIndex = (currentBannerIndex + 1) % heroImages.length;
        heroBanner.style.setProperty('--next-bg-image', `url('${heroImages[nextBannerIndex]}')`);

        // Thêm class để bắt đầu hiệu ứng fade
        heroBanner.classList.add('fading');

        currentBannerIndex = (currentBannerIndex + 1) % heroImages.length;

        // Sau khi hiệu ứng kết thúc, cập nhật lại banner chính và reset
        setTimeout(() => {
            heroBanner.style.backgroundImage = `url('${heroImages[currentBannerIndex]}')`;
            heroBanner.classList.remove('fading');
            isChanging = false;
        }, 1000); // Thời gian này phải khớp với thời gian transition trong CSS
    }
}
setInterval(changeBanner, 5000);

// OUNTDOWN
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
    // Đặt ngày kết thúc sale (3 ngày )
    const countDownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}
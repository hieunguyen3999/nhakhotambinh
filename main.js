document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dotsContainer = document.getElementById('slider-dots');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Tạo các dấu chấm (dots)
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        currentIndex = index;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Xử lý sự kiện click nút
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Tự động chuyển slide sau mỗi 5 giây
    let autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    // Dừng tự động chuyển khi người dùng tương tác
    wrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    wrapper.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });

    // Khởi tạo slide đầu tiên
    goToSlide(0);
});
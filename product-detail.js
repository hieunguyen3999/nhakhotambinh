document.addEventListener('DOMContentLoaded', function() {
    // Chức năng thư viện ảnh trên trang chi tiết sản phẩm
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumb-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;

    // Kiểm tra xem các phần tử có tồn tại không trước khi thêm sự kiện
    if (mainImage && thumbnails.length > 0 && prevBtn && nextBtn) {
        
        function updateGallery(index) {
            // Lấy ảnh từ thumbnail tương ứng với index
            const newImageSrc = thumbnails[index].querySelector('img').getAttribute('src');
            
            // Cập nhật ảnh chính
            mainImage.setAttribute('src', newImageSrc);

            // Cập nhật lớp 'active' cho thumbnail
            thumbnails.forEach(item => item.classList.remove('active'));
            thumbnails[index].classList.add('active');

            // Cập nhật index hiện tại
            currentImageIndex = index;
        }

        // Sự kiện click cho các ảnh nhỏ
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                updateGallery(index);
            });
        });

        // Sự kiện click cho nút "Next"
        nextBtn.addEventListener('click', function() {
            let nextIndex = (currentImageIndex + 1) % thumbnails.length;
            updateGallery(nextIndex);
        });

        // Sự kiện click cho nút "Previous"
        prevBtn.addEventListener('click', function() {
            let prevIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
            updateGallery(prevIndex);
        });
    }

    // Chức năng chọn kích thước sản phẩm
    const sizeButtons = document.querySelectorAll('.option-buttons button');

    if (sizeButtons.length > 0) {
        sizeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Bỏ lớp 'active' khỏi tất cả các nút kích thước
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                
                // Thêm lớp 'active' cho nút vừa được nhấp
                this.classList.add('active');
            });
        });
    }

    // Chức năng tăng/giảm số lượng sản phẩm
    const quantityInput = document.getElementById('quantity-input');
    const minusBtn = document.getElementById('quantity-minus');
    const plusBtn = document.getElementById('quantity-plus');

    if (quantityInput && minusBtn && plusBtn) {
        plusBtn.addEventListener('click', function() {
            // Chuyển giá trị của input sang số nguyên và cộng thêm 1
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });

        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            // Chỉ giảm số lượng nếu giá trị hiện tại lớn hơn 1
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
});


// GIỎ HÀNG (ADD TO CART) ---
const addToCartBtn = document.querySelector('.btn-add-to-cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        // Lấy thông tin sản phẩm từ HTML
        const product = {
            name: document.querySelector('.product-title-detail').innerText,
            price: document.querySelector('.product-price-detail').innerText.replace(/[^\d]/g, ''), // Chỉ lấy số
            image: document.getElementById('main-product-image').src,
            quantity: parseInt(document.getElementById('quantity-input').value)
        };

        // Lấy giỏ hàng cũ từ localStorage hoặc tạo mảng rỗng
        let cart = JSON.parse(localStorage.getItem('hustleCart')) || [];
        
        // Kiểm tra xem sản phẩm đã có chưa để cộng dồn
        let existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        // Lưu ngược lại vào localStorage
        localStorage.setItem('hustleCart', JSON.stringify(cart));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    });
}
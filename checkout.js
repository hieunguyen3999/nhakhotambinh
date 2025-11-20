document.addEventListener('DOMContentLoaded', function() {
    // --- Lấy các phần tử DOM ---
    const orderItemsContainer = document.getElementById('order-summary-items');
    const orderSummaryTitle = document.getElementById('order-summary-title');
    const subtotalPriceElement = document.getElementById('checkout-subtotal-price');
    const totalPriceElement = document.getElementById('checkout-total-price');
    const checkoutForm = document.getElementById('checkoutForm');
    const completeOrderBtn = document.querySelector('.btn-complete-order');

    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('hustleCart')) || [];

    /**
     * Hiển thị các sản phẩm trong giỏ hàng ra khu vực tóm tắt đơn hàng.
     */
    function renderOrderSummary() {
        if (!orderItemsContainer) return;

        const totals = cart.reduce((acc, item) => {
            acc.totalAmount += parseInt(item.price) * parseInt(item.quantity);
            acc.totalItems += parseInt(item.quantity);
            return acc;
        }, { totalAmount: 0, totalItems: 0 });

        // Dùng map và join để tối ưu hiệu suất, tránh innerHTML += trong vòng lặp
        const itemsHTML = cart.map(item => {
            const itemTotal = parseInt(item.price) * parseInt(item.quantity);
            return `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="order-item-info">
                        <span class="order-item-name">${item.name}</span>
                        <span class="order-item-quantity">Số lượng: ${item.quantity}</span>
                    </div>
                    <span class="order-item-price">${itemTotal.toLocaleString()}đ</span>
                </div>
            `;
        }).join('');

        orderItemsContainer.innerHTML = itemsHTML;

        // Cập nhật tiêu đề, tạm tính và tổng cộng
        if (orderSummaryTitle) {
            orderSummaryTitle.innerText = `Đơn hàng của bạn (${totals.totalItems} sản phẩm)`;
        }
        if (subtotalPriceElement) {
            subtotalPriceElement.innerText = totals.totalAmount.toLocaleString() + 'đ';
        }
        if (totalPriceElement) {
            totalPriceElement.innerText = totals.totalAmount.toLocaleString() + 'đ';
        }
    }

    /**
     * Xử lý giao diện khi giỏ hàng rỗng.
     */
    function handleEmptyCart() {
        if (orderItemsContainer) {
            orderItemsContainer.innerHTML = '<p style="text-align: center; color: #777;">Không có sản phẩm nào để thanh toán.</p>';
        }
        if (completeOrderBtn) {
            completeOrderBtn.disabled = true; // Vô hiệu hóa nút
            completeOrderBtn.style.cursor = 'not-allowed';
            completeOrderBtn.style.backgroundColor = '#ccc';
        }
    }

    /**
     * Thiết lập và xử lý validation cho form thanh toán.
     */
    function setupFormValidation() {
        if (!checkoutForm) return;

        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Chặn form gửi đi để kiểm tra

            const formData = {
                email: this.querySelector('input[name="email"]').value.trim(),
                fullname: this.querySelector('input[name="fullname"]').value.trim(),
                address: this.querySelector('input[name="address"]').value.trim(),
                phone: this.querySelector('input[name="phone"]').value.trim(),
                city: this.querySelector('select[name="city"]').value,
            };

            const validationRules = [
                { check: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email), message: 'Email không hợp lệ.' },
                { check: formData.fullname === '', message: 'Vui lòng nhập họ và tên.' },
                { check: formData.address === '', message: 'Vui lòng nhập địa chỉ.' },
                { check: !/^(0[3|5|7|8|9])\d{8}$/.test(formData.phone), message: 'Số điện thoại không hợp lệ.' },
                { check: formData.city === 'Chọn Tỉnh/Thành phố', message: 'Vui lòng chọn Tỉnh/Thành phố.' }
            ];

            for (const rule of validationRules) {
                if (rule.check) {
                    alert(rule.message);
                    return; // Dừng lại ngay khi gặp lỗi đầu tiên
                }
            }

            // Nếu tất cả đều hợp lệ
            handleSuccessfulOrder();
        });
    }

    function handleSuccessfulOrder() {
        alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
        localStorage.removeItem('hustleCart');
        window.location.href = 'index.html';
    }

    // --- KHỞI CHẠY LOGIC ---
    if (cart.length > 0) {
        renderOrderSummary();
        setupFormValidation();
    } else {
        handleEmptyCart();
    }
});
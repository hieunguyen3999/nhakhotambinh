// --- LOGIC HIỂN THỊ GIỎ HÀNG (LOAD CART) ---
const cartContainer = document.getElementById('cart-items-container');
const cartSubtotalElement = document.getElementById('cart-subtotal-price'); // Lấy phần tử tạm tính
const cartTotalElement = document.getElementById('cart-total-price');

if (cartContainer) {
    let cart = JSON.parse(localStorage.getItem('hustleCart')) || [];
    let totalAmount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    } else {
        cartContainer.innerHTML = ""; // Xóa nội dung cũ
        
        cart.forEach((item, index) => {
            // Tính thành tiền
            let itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            // Tạo HTML cho từng sản phẩm
            let itemHTML = `
                <div class="cart-item">
                    <div class="cart-product-info">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <span class="cart-product-name">${item.name}</span>
                            <button class="cart-remove-btn" onclick="removeCartItem(${index})">Xóa</button>
                        </div>
                    </div>
                    <div class="cart-product-price">${parseInt(item.price).toLocaleString()}đ</div>
                    <div class="cart-product-quantity">
                        <span>${item.quantity}</span>
                    </div>
                    <div class="cart-product-total">${itemTotal.toLocaleString()}đ</div>
                </div>
            `;
            cartContainer.innerHTML += itemHTML;
        });
    }

    // Cập nhật tổng tiền
    if(cartSubtotalElement) {
        cartSubtotalElement.innerText = totalAmount.toLocaleString() + "đ";
    }
    if(cartTotalElement) {
        cartTotalElement.innerText = totalAmount.toLocaleString() + "đ";
    }
}

// Hàm xóa sản phẩm (cần để ra ngoài scope để HTML gọi được)
window.removeCartItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('hustleCart')) || [];
    cart.splice(index, 1); // Xóa phần tử tại index
    localStorage.setItem('hustleCart', JSON.stringify(cart));
    location.reload(); // Tải lại trang để cập nhật
};
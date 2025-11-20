document.addEventListener('DOMContentLoaded', function() {
    // --- VALIDATION FORM ĐĂNG KÝ ---
    const registerForm = document.getElementById('registerForm'); // Bây giờ sẽ trỏ đúng vào thẻ <form>
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Chặn form gửi đi để kiểm tra

            // Lấy giá trị từ các ô input
            const usernameInput = registerForm.querySelector('input[name="username"]');
            const emailInput = registerForm.querySelector('input[name="email"]');
            const passwordInput = registerForm.querySelector('input[name="password"]');
            const confirmPasswordInput = registerForm.querySelector('input[name="confirm-password"]');

            // Kiểm tra xem các input có tồn tại không trước khi lấy value
            const username = usernameInput ? usernameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

            let isValid = true;
            let errorMessage = '';

            // 1. Kiểm tra họ tên
            if (username === '') {
                errorMessage = "Vui lòng nhập tên đăng nhập của bạn.";
                isValid = false;
            }
            // 2. Kiểm tra email hợp lệ
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errorMessage = "Email không hợp lệ. Vui lòng kiểm tra lại.";
                isValid = false;
            }
            // 3. Kiểm tra độ dài mật khẩu
            else if (password.length < 3) {
                errorMessage = "Mật khẩu phải có ít nhất 3 ký tự.";
                isValid = false;
            }
            // 4. Kiểm tra mật khẩu xác nhận
            else if (password !== confirmPassword) {
                errorMessage = "Mật khẩu xác nhận không khớp. Vui lòng nhập lại.";
                isValid = false;
            }

            if (isValid) {
                alert("Đăng ký tài khoản thành công!");
                registerForm.reset(); // Xóa các trường trong form sau khi đăng ký thành công
                // Tại đây chuyển hướng người dùng hoặc thực hiện hành động khác
            } else {
                alert(errorMessage); // Hiển thị thông báo lỗi đầu tiên gặp phải
            }
        });
    }
});
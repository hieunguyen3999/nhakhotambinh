// --- VALIDATION FORM LIÊN HỆ ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Chặn gửi form để kiểm tra trước
        
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        let isValid = true;

        // Kiểm tra email , biểu thức chính quy regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // tìm một chuỗi có 1 or N kí tư
        if (!emailPattern.test(email)) {
            alert("Email không hợp lệ! Vui lòng nhập lại.");
            isValid = false;
        }

        // Kiểm tra nội dung
        if (message.length < 5) {
            alert("Nội dung tin nhắn phải dài hơn 5 ký tự.");
            isValid = false;
        }

        if (isValid) {
            alert("Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm.");
            contactForm.reset();
            // Ở đây có thể submit thật nếu muốn
        }
    });
}
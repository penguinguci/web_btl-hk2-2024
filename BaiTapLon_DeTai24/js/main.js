function getUsername() {
    const username = localStorage.getItem('username');
    return username ? username : null; // Trả về username nếu tồn tại, nguọc lại trả về null
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true'; // Trả về true nếu isLoggedIn === 'true', ngược lại trả về false
}


// Đăng ký
function registerAccount() {
    event.preventDefault();

    var hoTen = document.getElementById('hoTen').value;
    var sdt = document.getElementById('sdt').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    var passXN = document.getElementById('passXN').value;
    var maGT = document.getElementById('maGT').value;

    // Kiểm tra dữ liệu nhập
    if (!hoTen || !sdt || !pass || !passXN) {
        document.getElementById('registerMessage').textContent = 'Vui lòng nhập đầy đủ thông tin bắt buộc (*)';
        document.getElementById('registerMessage').style.display = 'block';
        return;
    }

    // kiểm tra định dạng email 
    var regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email && !regEmail.test(email)) {
        document.getElementById('registerMessage').textContent = 'Email không hợp lệ';
        document.getElementById('registerMessage').style.display = 'block';
        return;
    }

    // Kiểm tra định dạng số điện thoại
    var regPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (sdt && !regPhone.test(sdt)) {
        document.getElementById('registerMessage').textContent = 'Số điện thoại không hợp lệ';
        document.getElementById('registerMessage').style.display = 'block';
        return;
    }

    // Kiểm tra định dạng mật khẩu
    var regPass = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    if (pass.length < 6 || !regPass.test(pass)) {
        document.getElementById('registerMessage').textContent = 'Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm chữ cái và số';
        document.getElementById('registerMessage').style.display = 'block';
        return;
    }

    //  Kiểm tra mật khẩu nhập lại
    if (pass != passXN) {
        document.getElementById('registerMessage').textContent = 'Mật khẩu xác nhận không khớp';
        document.getElementById('registerMessage').style.display = 'block';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.email === email || user.sdt === sdt);

    if (userExists) {
        document.getElementById('registerMessage').textContent = 'Người dùng đã tồn tại. Hãy đăng nhập hoặc sử dụng email/số điện thoại khác';
        document.getElementById('registerMessage').style.display = 'block';
        return;
    }

    // Lấy ngày hiện tại
    var currentDate = new Date();

    // Format ngày thành chuỗi "dd/mm/yyyy"
    var formattedDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();

    // Thêm ngày đăng ký vào đối tượng người dùng
    const newUser = { hoTen, sdt, email, pass, passXN, maGT, ngayDangKy: formattedDate };

    // Thêm người dùng mới vào mảng users
    users.push(newUser);

    // Lưu mảng users vào localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị thông báo thành công
    document.getElementById('registerMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    // Đặt thời gian tự động ẩn thông báo sau 5 giây
    setTimeout(function() {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);

    // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng ký thành công
    setTimeout(function() {
        location.href = "../html/dangnhap.html";
    }, 2000);
}

// Hàm cập nhật ngày tham gia là ngày đăng ký
function updateNgayThamGia() {
    // Lấy thông tin người dùng đã đăng ký từ localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Kiểm tra xem người dùng đã đăng ký hay chưa
    if (loggedInUser) {
        // Truy xuất ngày đăng ký từ đối tượng người dùng
        const ngayDangKy = loggedInUser.ngayDangKy;

        // Gán giá trị ngày đăng ký vào phần tử HTML
        document.getElementById('valueNgayThamGia').textContent = ngayDangKy;
    }
}

// đăng nhập
function loginAccount() {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy giá trị từ các trường input trong form đăng nhập
    var sdtEmail = document.getElementById('SDT_Email').value; // Số điện thoại hoặc email
    var password = document.getElementById('password').value;

    // Kiểm tra xem người dùng đã nhập thông tin hay chưa
    if (!sdtEmail || !password) {
        document.getElementById('loginMessage').innerHTML = 'Vui lòng nhập đầy đủ thông tin đăng nhập.';
        document.getElementById('loginMessage').classList.remove('success');
        document.getElementById('loginMessage').classList.add('error');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Tìm kiếm người dùng trong mảng
    const user = users.find(user => (user.sdt === sdtEmail || user.email === sdtEmail) && user.pass === password);

    if (user) {
        document.getElementById('loginMessage').innerHTML = 'Đăng nhập thành công!';
        document.getElementById('loginMessage').classList.remove('error');
        document.getElementById('loginMessage').classList.add('success');

        // Lưu thông tin đăng nhập vào localStorage mới
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Chuyển hướng người dùng sau khi đăng nhập thành công
        setTimeout(function() {
            location.href = "../html/index.html";
            updateLoginButton();
        }, 2000);

    } else {
        document.getElementById('loginMessage').innerHTML = 'Số điện thoại/email hoặc mật khẩu không chính xác. Vui lòng thử lại.';
        document.getElementById('loginMessage').classList.remove('success');
        document.getElementById('loginMessage').classList.add('error');
    }
}

// Hàm cập nhật nút "Đăng nhập" thành tên người dùng đã đăng nhập
function updateLoginButton() {
    replaceModalWithPopover();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        const userName = loggedInUser.hoTen;
        const loginButton = document.getElementById('loginButton');
        loginButton.innerHTML = `
            <img class="img mb-2" src="../images/personlogin.png" alt="" width="20">
            <p style="color:white; position: relative; bottom: 9px;">${userName}</p>
        `;
    }
}

// Kiểm tra xem người dùng đã đăng nhập hay chưa và cập nhật nội dung của nút "Đăng nhập"
window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        updateLoginButton(loggedInUser);
    }
}



function replaceModalWithPopover() {
    // Tạo popover content với button "Đóng" ở footer
    const popoverContent = `
    <div class="text-center p-5">
        <img class="mb-4 ms-5 me-5" src="../images/no-task.png" alt="">
        <p class="mb-4" style="font-weight: 700; font-size: 18px;">
           Ở đây hơi trống trải.
        </p>
        <div class="d-grid gap-3">
            <a id="closePopoverButton" class="btn btn-secondary">Đóng</a>
        </div>
    </div>
    `;

    // Lấy thẻ button đăng nhập
    const loginButton = document.getElementById('loginButton');

    // Biến để lưu trạng thái của popover
    let isPopoverShown = false;
    let popoverInstance = null;

    // Gắn sự kiện click vào button đăng nhập
    loginButton.addEventListener('click', function() {
        if (isPopoverShown && popoverInstance) {
            // Nếu popover đã được hiển thị và tồn tại instance của nó
            popoverInstance.hide(); // Ẩn popover
            isPopoverShown = false; // Cập nhật trạng thái popover
        } else {
            // Tạo popover từ button đăng nhập
            const popover = new bootstrap.Popover(loginButton, {
                placement: 'bottom',
                title: `
                <div class="text-center mb-4">
                    <a href="../html/profile.html" class="btn btn-outline-danger">Xem thông tin cá nhân</a>
                </div>
                <span>Thông báo</span>
            `,
                content: popoverContent,
                html: true
            });

            // Hiển thị popover
            popover.show();

            // Lưu instance của popover
            popoverInstance = popover;

            // Cập nhật trạng thái popover
            isPopoverShown = true;

            // Gắn sự kiện cho nút đóng popover
            const closePopoverButton = document.getElementById('closePopoverButton');
            closePopoverButton.addEventListener('click', function() {
                popover.hide(); // Ẩn popover khi nút đóng được click
                isPopoverShown = false; // Cập nhật trạng thái popover
            });
        }
    });

    // Xóa modal
    const modal = document.getElementById('smember');
    modal.parentNode.removeChild(modal);
}





// Hàm đăng xuất
function logout() {
    localStorage.removeItem('loggedInUser');

    // Chuyển trang sau khi đăng xuất
    location.href = "../html/index.html";

    // Cập nhật nút "Đăng nhập" sau khi chuyển trang
    setTimeout(function() {
        const loginButton = document.getElementById('loginButton');
        loginButton.innerHTML = `
            <img class="img mb-2" src="../images/personlogin.png" alt="" width="20">
            <p style="color:white; position: relative; bottom: 9px;">Đăng nhập</p>
        `;

        // Thêm lại modal smember
        const modal = `
            <div class="modal fade" id="smember" tabindex="-1" aria-labelledby="ModalSmember" aria-hidden="true">
                <div class="modal-dialog login">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button style="float: right;" class="modal-close rounded-circle" type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 style="text-align: center;font-size: 25px; color: #d70018; font-weight: bold;margin-left: 20px; ">Smember</h4>
                            <img src="../images/smember.png" alt="">
                            <div class="text">
                                <p style="text-align: center; font-weight: 700; font-size: 15px;">Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ dàng hơn.</p>
                            </div>
                            <div class="group-login-btn">
                                <a href="../html/dangky.html" class="register-btn"> Đăng ký </a>
                                <a href="../html/dangnhap.html" class="login-btn">Đăng nhập</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);

        // Xóa popover
        const loginButton2 = document.getElementById('loginButton');
        const popover = bootstrap.Popover.getInstance(loginButton2);
        if (popover) {
            popover.dispose();
        }
    });
}





document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll('.nav-link');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activeP = document.querySelector('.item_text.active');
            if (activeP) {
                activeP.classList.remove('active');
            }
            const p = this.querySelector('.item_text');
            p.classList.add('active');
        });
    });
});

function updateUser1() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        const userName = loggedInUser.hoTen;
        const hoTen = document.getElementById('hoTen');
        hoTen.innerHTML = `
            <p style="position: relative; top: -20px;" id="hoTen">${userName}</p>
        `;
    }
}

function updateUser2() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        const userName = loggedInUser.hoTen;
        const hoTen = document.getElementById('hoTen1');
        hoTen.innerHTML = `
             <p class="hoTen" id="hoTen">${userName}</p>
        `;
    }
}

// Cập nhật thông tin cá nhân
function updatePersonalInfo() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('hoTen2').value = loggedInUser.hoTen || '';
        document.getElementById('email').value = loggedInUser.email || '';
        document.getElementById('gioiTinh').value = loggedInUser.gioiTinh || '';
        document.getElementById('sdt').value = loggedInUser.sdt || '';
        document.getElementById('sinhNhat').value = loggedInUser.sinhNhat || '';
        document.getElementById('ngayThamGia').value = loggedInUser.ngayDangKy || '';
        document.getElementById('diaChi').value = loggedInUser.diaChi || '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.product-infor-container.product-item');

    productItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Lấy dữ liệu sản phẩm từ các phần tử con của item
            const productName = item.querySelector('.product-name h3').textContent;
            const giaCu = item.querySelector('.product-price-through').textContent;
            const giaMoi = item.querySelector('.product-price-show').textContent;
            const productImage = item.querySelector('.product-image img').getAttribute('src');

            // Chuyển hướng đến trang chi tiết sản phẩm và truyền dữ liệu qua query parameters
            window.location.href = `product.html?productName=${encodeURIComponent(productName)}&giaCu=${encodeURIComponent(giaCu)}&giaMoi=${encodeURIComponent(giaMoi)}&productImage=${encodeURIComponent(productImage)}`;
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.swiper-slide');

    productItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Lấy dữ liệu sản phẩm từ các phần tử con của item
            const productName1 = item.querySelector('.product_name h3').textContent;
            const giaCu1 = item.querySelector('.product_price--through').textContent;
            const giaMoi1 = item.querySelector('.product_price--show').textContent;
            const productImage1 = item.querySelector('.product_image img').getAttribute('src');

            // Chuyển hướng đến trang chi tiết sản phẩm và truyền dữ liệu qua query parameters
            window.location.href = `product.html?productName=${encodeURIComponent(productName1)}&giaCu=${encodeURIComponent(giaCu1)}&giaMoi=${encodeURIComponent(giaMoi1)}&productImage=${encodeURIComponent(productImage1)}`;
        });
    });
});

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng và hiển thị trên trang
function updateCartItemCount() {
    // Lấy danh sách sản phẩm từ localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItemsNew')) || [];

    // Cập nhật số lượng sản phẩm
    document.getElementById('countSLSP').textContent = cartItems.length;
}
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('productName');
    const giaCu = urlParams.get('giaCu');
    const giaMoi = urlParams.get('giaMoi');
    const productImage = urlParams.get('productImage');

    // Hiển thị dữ liệu sản phẩm trên trang chi tiết
    document.getElementById('pageTitle').textContent = productName;
    document.getElementById('breadcrumbItem').textContent = productName;
    document.getElementById('productName').textContent = productName;
    document.getElementById('productName2').textContent = productName;
    document.getElementById('giaCu').textContent = giaCu;
    document.getElementById('giaMoi').textContent = giaMoi;
    document.getElementById('giaMoi1').textContent = giaMoi;
    document.getElementById('product-image').setAttribute('src', productImage);

    let loaiSP = '';
    let loaiSP_href = '';

    // Kiểm tra tên sản phẩm và cập nhật loại sản phẩm và href
    if (productName.startsWith('Tai nghe')) {
        loaiSP = 'Tai nghe';
        loaiSP_href = 'tainghe.html';
    } else if (productName.startsWith('Loa')) {
        loaiSP = 'Loa';
        loaiSP_href = 'loa.html';
    } else if (productName.startsWith('Micro thu âm')) {
        loaiSP = 'Micro thu âm';
        loaiSP_href = 'microthuam.html';
    } else if (productName.startsWith('Mic')) {
        loaiSP = 'Mic Karaoke';
        loaiSP_href = 'mickaraoke.html';
    }

    // Cập nhật nội dung và href của thẻ <a> có id là 'loaisp'
    const loaiSP_element = document.getElementById('loaisp');
    loaiSP_element.textContent = loaiSP;
    loaiSP_element.setAttribute('href', '../html/' + loaiSP_href);
});



function addToCart() {
    // Lấy thông tin sản phẩm
    const productImage = document.getElementById('product-image').getAttribute('src');
    const productName = document.getElementById('productName').textContent;
    const giaMoi = document.getElementById('giaMoi').textContent;
    const giaCu = document.getElementById('giaCu').textContent;

    // Tạo đối tượng chứa thông tin sản phẩm
    const product = {
        image: productImage,
        name: productName,
        giaMoi: giaMoi,
        giaCu: giaCu
    };

    // Lấy danh sách sản phẩm đã có trong localStorage
    let cartItemsNew = JSON.parse(localStorage.getItem('cartItemsNew')) || [];

    // Thêm sản phẩm vào danh sách
    cartItemsNew.push(product);

    // Lưu lại danh sách sản phẩm vào localStorage
    localStorage.setItem('cartItemsNew', JSON.stringify(cartItemsNew));

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    document.getElementById('countSLSP').textContent = cartItemsNew.length;

    // Hiển thị thông báo
    const notification = document.getElementById('notification');
    notification.textContent = 'Thêm vào giỏ hàng thành công';
    notification.classList.add('show-notification');

    // Biến mất thông báo sau 3 giây
    setTimeout(function() {
        notification.classList.remove('show-notification');
    }, 3000);
}
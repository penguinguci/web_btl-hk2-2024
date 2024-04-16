document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchSP');
    var searchSuggestions = document.getElementById('searchSuggestions');

    // Dummy product data for demonstration
    var products = [{
            imgSrc: '../images/tai-nghe-bluetooth-edifier-wh700_8__1.webp',
            productName: 'Tai nghe Bluetooth',
            productLink: '../html/tainghe.html'
        },
        {
            imgSrc: '../images/loa-bluetooth-harman-kardon-aura-studio-4-01-2024.webp',
            productName: 'Loa Bluetooth',
            productLink: '../html/loa.html'
        },
        {
            imgSrc: '../images/mic-thu-am-dien-thoai_1.webp',
            productName: 'Mic thu âm điện thoại',
            productLink: '../html/micthuam.html'
        },
        {
            imgSrc: '../images/mic-karaoke-alpha-work-a1_4_.webp',
            productName: 'Mic Karaoke',
            productLink: '../html/mickaraoke.html'
        }
    ];

    // Other product data for additional suggestions
    var productsOther = [{
            imgSrc: '../images/tai-nghe-khong-day-huawei-freeclip-0.webp',
            productName: 'Tai nghe Bluetooth True Wireless HUAWEI FreeClip',
            giaCu: '4.990.000đ',
            giaMoi: '3.990.000đ'
        },
        {
            imgSrc: '../images/apple-airpods-pro-2-usb-c_1_.webp',
            productName: 'Tai nghe Bluetooth Apple AirPods Pro 2 2023 USB-C | Chính hãng Apple Việt Nam',
            giaCu: '6.190.000₫',
            giaMoi: '5.790.000₫'
        },
        {
            imgSrc: '../images/group_211.webp',
            productName: 'Loa Bluetooth JBL Charge 5',
            giaCu: '4.990.000₫',
            giaMoi: '4.490.000₫'
        },
        {
            imgSrc: '../images/mic-khong-day-boya-link_12_.webp',
            productName: 'Mic thu âm điện thoại Boya BY-M2',
            giaCu: '1.200.000₫',
            giaMoi: '1.090.000₫'
        },
        {
            imgSrc: '../images/taiNgheSony.webp',
            productName: 'Tai nghe Bluetooth chụp tai Sony WH-1000XM5',
            giaCu: '7.900.000₫',
            giaMoi: '6.290.000₫'
        },
        {
            imgSrc: '../images/group_211_1__1.webp',
            productName: 'Loa Bluetooth JBL Flip 6',
            giaCu: '2.990.000₫',
            giaMoi: '2.840.000₫'
        },
        {
            imgSrc: '../images/tronsmart_t7_mini.webp',
            productName: 'Loa Bluetooth Tronsmart T7 Mini',
            giaCu: '730.000₫',
            giaMoi: '490.000₫'
        }
    ];

    function showProductSuggestions(productsToShow) {
        searchSuggestions.innerHTML = '';
        productsToShow.forEach(function(product) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            var image = document.createElement('img');
            image.src = product.imgSrc;
            image.alt = product.productName;

            // Xác định loại sản phẩm và thay đổi href tương ứng
            if (product.productLink) {
                // Nếu sản phẩm có thuộc tính productLink (trong danh sách products)
                link.href = product.productLink;
            } else {
                // Nếu sản phẩm không có thuộc tính productLink (trong danh sách productsOther)
                link.href = 'product.html?productName=' + encodeURIComponent(product.productName) + '&giaCu=' + encodeURIComponent(product.giaCu) + '&giaMoi=' + encodeURIComponent(product.giaMoi) + '&productImage=' + encodeURIComponent(product.imgSrc);
            }

            link.appendChild(image);
            var productName = document.createTextNode(product.productName);
            link.appendChild(productName);
            listItem.appendChild(link);
            searchSuggestions.appendChild(listItem);
        });
        searchSuggestions.style.display = 'block';
    }



    // Function to hide product suggestions
    function hideProductSuggestions() {
        searchSuggestions.style.display = 'none';
    }

    // Event listener for input
    searchInput.addEventListener('input', function() {
        var keyword = this.value.trim().toLowerCase();
        if (keyword !== '') {
            var matchedProducts = products.filter(function(product) {
                return product.productName.toLowerCase().includes(keyword);
            });
            var matchedOtherProducts = productsOther.filter(function(product) {
                return product.productName.toLowerCase().includes(keyword);
            });
            var matchedProductsToShow = matchedProducts.concat(matchedOtherProducts); // Kết hợp sản phẩm từ cả hai mảng
            if (matchedProductsToShow.length > 0) {
                showProductSuggestions(matchedProductsToShow); // Hiển thị gợi ý cho các sản phẩm tìm được
            } else {
                hideProductSuggestions();
            }
        } else {
            hideProductSuggestions();
        }
    });



    // Event listener for click
    searchInput.addEventListener('click', function() {
        var keyword = this.value.trim().toLowerCase();
        if (keyword === '') {
            showProductSuggestions(products);
        }
    });

    // Event listener to hide suggestions when clicking outside the input
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target)) {
            hideProductSuggestions();
        }
    });

    // Event listener for Enter key to navigate to the selected product
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && searchSuggestions.style.display === 'block') {
            var selectedProduct = searchSuggestions.querySelector('li:first-child a');
            if (selectedProduct) {
                window.location.href = selectedProduct.href;
            }
        }
    });

});
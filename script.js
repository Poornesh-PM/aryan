//scroll for the anchor links to my web page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// navigation links based on scroll position to my page
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + section.clientHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Show hidden products in my page
document.querySelector('.view-all-btn').addEventListener('click', () => {
    document.querySelectorAll('.product-item.hidden').forEach(item => {
        item.classList.remove('hidden');
    });
    document.querySelector('.view-all-btn').style.display = 'none';
});

// Product details modal for my page
const productModal = document.getElementById('product-modal');
const closeProductModalButton = productModal.querySelector('.close-btn');

document.querySelector('.product-grid').addEventListener('click', (event) => {
    if (event.target.classList.contains('view-details-btn')) {
        const productElement = event.target.closest('.product-item');
        const productInfo = JSON.parse(productElement.dataset.product);
        const modalContent = productModal.querySelector('.modal-product-details');

        modalContent.innerHTML = `
            <h2>${productInfo.name}</h2>
            <p>Price: ${productInfo.price}</p>
            <img src="${productInfo.image}" alt="${productInfo.name}" style="width: 100%; height: auto;">
        `;

        productModal.style.display = 'block';
    }
});

closeProductModalButton.addEventListener('click', () => {
    productModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === productModal) {
        productModal.style.display = 'none';
    }
});

// Login modal
const loginModal = document.getElementById('login-modal');
const closeLoginModalButton = loginModal.querySelector('.close-btn');

document.querySelector('.login-btn').addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeLoginModalButton.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Contact form validation and submission to my page
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[placeholder="Name"]').value.trim();
    const email = this.querySelector('input[placeholder="Email"]').value.trim();
    const phone = this.querySelector('input[placeholder="Phone"]').value.trim();
    const message = this.querySelector('textarea').value.trim();

    if (!name || !email || !phone || !message) {
        alert('All fields are required!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Thank you for your message!');
    this.reset(); 
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// CTA button scroll to contact-us section
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#contact-us').scrollIntoView({ behavior: 'smooth' });
});

// Cart button click
const cartBtn = document.getElementById('cart');
const cartModal = document.getElementById('cart-modal');

cartBtn.addEventListener('click', () => {
    renderCartItems(); // to check cart modal is up-to-date
    cartModal.style.display = 'block';
});

// Close cart modal
document.querySelector('.close-cart-btn').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

let cart = [];

// Function to render cart items in the cart modal
function renderCartItems() {
    const cartModalContent = document.querySelector('.cart-modal-content');
    cartModalContent.innerHTML = '';

    if (cart.length === 0) {
        cartModalContent.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: auto;">
                <button class="remove-from-cart-btn" data-index="${index}">Remove</button>
            `;
            cartModalContent.appendChild(cartItemElement);
        });
    }
}

// Handle "Buy Now" button click
document.querySelector('.product-grid').addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-now-btn')) {
        const productElement = event.target.closest('.product-item');
        const productInfo = JSON.parse(productElement.dataset.product);

        cart.push(productInfo);
        alert(`${productInfo.name} has been added to your cart!`);

        renderCartItems();        // Optionally, you can render cart items right after adding them
    }
});
// Remove item from cart
document.querySelector('.cart-modal-content').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        renderCartItems(); 
    }
});

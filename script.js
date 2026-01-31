let cart = [];
const cartCount = document.getElementById('cart-count');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutLink = document.getElementById('checkout-link');

// Add item to cart
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

// Update cart UI
function updateCartUI() {
  cartCount.textContent = cart.length;
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(li);
    total += item.price;
  });
  cartTotalSpan.textContent = total;

  // Update mailto link for checkout
  const subject = encodeURIComponent("Innocent Clothing Order");
  const body = encodeURIComponent(
    `Order Details:\n${cart.map(i=>i.name+" - $"+i.price).join("\n")}\nTotal: $${total}`
  );
  checkoutLink.href = `mailto:davenanother@gmail.com?subject=${subject}&body=${body}`;
}

// Toggle cart dropdown
document.getElementById('cart-icon').addEventListener('click', () => {
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

// Settings panel toggle
const settingsPanel = document.getElementById('settings-panel');
document.getElementById('settings-icon').addEventListener('click', () => {
  settingsPanel.style.right = '20px';
});
document.getElementById('close-settings').addEventListener('click', () => {
  settingsPanel.style.right = '-300px';
});

// Cookies banner
const cookiesBanner = document.getElementById('cookies-banner');
document.getElementById('accept-cookies').addEventListener('click', () => {
  cookiesBanner.style.display = 'none';
});

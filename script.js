// -----------------------
// ELEMENTS
// -----------------------
const settingsIcon = document.getElementById('settings-icon');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');

const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');

const cookiesBanner = document.getElementById('cookies-banner');
const acceptCookies = document.getElementById('accept-cookies');

const themeSelect = document.getElementById('theme-select');
const primaryColorInput = document.getElementById('primary-color');
const secondaryColorInput = document.getElementById('secondary-color');
const animationsToggle = document.getElementById('animations-toggle');

const checkoutLink = document.getElementById('checkout-link');

let cart = [];

// -----------------------
// SETTINGS PANEL
// -----------------------
settingsIcon.addEventListener('click', () => {
  settingsPanel.classList.add('open');
});
closeSettings.addEventListener('click', () => {
  settingsPanel.classList.remove('open');
});

// -----------------------
// CART DROPDOWN
// -----------------------
cartIcon.addEventListener('click', () => {
  cartDropdown.classList.toggle('open');
});

// -----------------------
// COOKIES BANNER
// -----------------------
window.addEventListener('load', () => {
  setTimeout(() => cookiesBanner.classList.add('show'), 500);
});

acceptCookies.addEventListener('click', () => {
  cookiesBanner.classList.remove('show');
});

// -----------------------
// THEME / COLORS
// -----------------------
themeSelect.addEventListener('change', (e) => {
  document.body.className = e.target.value + (animationsToggle.value === 'on' ? ' animations-on' : '');
});

primaryColorInput.addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--primary-color', e.target.value);
});
secondaryColorInput.addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--secondary-color', e.target.value);
});

animationsToggle.addEventListener('change', (e) => {
  if (e.target.value === 'on') document.body.classList.add('animations-on');
  else document.body.classList.remove('animations-on');
});

// -----------------------
// ADD TO CART
// -----------------------
function addToCart(name, price, sizeSelectId) {
  const sizeSelect = document.getElementById(sizeSelectId);
  const size = sizeSelect.value;
  cart.push({ name, price, size });
  updateCartUI();
}

// -----------------------
// UPDATE CART UI
// -----------------------
function updateCartUI() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (${item.size}) - $${item.price}`;
    cartItemsList.appendChild(li);
    total += item.price;
  });
  cartTotalSpan.textContent = total.toFixed(2);

  document.getElementById('cart-count').textContent = cart.length;

  // Update checkout mailto link
  checkoutLink.href = generateMailto();
}

// -----------------------
// GENERATE MAILTO LINK
// -----------------------
function generateMailto() {
  const name = document.getElementById('customer-name').value || 'Customer';
  const email = document.getElementById('customer-email').value || 'email@example.com';
  const address = document.getElementById('customer-address').value || 'N/A';
  const card = document.getElementById('customer-card').value || 'XXXX-XXXX-XXXX-XXXX';
  const exp = document.getElementById('customer-exp').value || 'MM/YY';
  const cvc = document.getElementById('customer-cvc').value || 'CVC';

  const items = cart.map(i => `${i.name} (${i.size}) - $${i.price}`).join('%0D%0A');
  const total = cart.reduce((sum, i) => sum + i.price, 0).toFixed(2);

  return `mailto:davenanother@gmail.com?subject=New Order from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AAddress: ${address}%0D%0ACard: ${card}%0D%0AExpiry: ${exp}%0D%0ACVC: ${cvc}%0D%0A%0D%0AOrder Items:%0D%0A${items}%0D%0ATotal: $${total}`;
}

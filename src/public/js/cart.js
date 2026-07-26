// =============================
// HMTechStore - Cart Manager
// =============================

const CART_KEY = "hmtechstore_cart";

const cartCount = document.getElementById("cartCount");
const cartLink = document.getElementById("cartLink");
const addToCartBtn = document.getElementById("addToCartBtn");
const clearCartBtn = document.getElementById("clearCart");

let cartId = localStorage.getItem(CART_KEY);

// =============================
// Crear carrito
// =============================

async function createCart() {
  const response = await fetch("/api/carts", {
    method: "POST",
  });

  const cart = await response.json();

  localStorage.setItem(CART_KEY, cart._id);

  cartId = cart._id;

  return cartId;
}

// =============================
// Obtener carrito
// =============================

async function getCart() {
  if (!cartId) {
    cartId = await createCart();
  }

  const response = await fetch(`/api/carts/${cartId}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el carrito.");
  }

  return await response.json();
}

// =============================
// Actualizar contador
// =============================

async function updateCartCounter() {
  if (!cartCount) return;

  if (!cartId) {
    cartCount.textContent = "0";
    return;
  }

  try {
    const cart = await getCart();

    const total = cart.products.reduce((acc, item) => acc + item.quantity, 0);

    cartCount.textContent = total;
  } catch (error) {
    console.error(error);
  }
}

// =============================
// Agregar producto
// =============================

async function addProduct(productId) {
  try {
    if (!cartId) {
      cartId = await createCart();
    }

    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("No fue posible agregar el producto.");
    }

    await updateCartCounter();

    alert("✅ Producto agregado al carrito");
  } catch (error) {
    console.error(error);

    alert("Error al agregar el producto.");
  }
}

// =============================
// Eliminar producto
// =============================

async function removeProduct(productId) {
  const confirmDelete = confirm("¿Deseas eliminar este producto del carrito?");

  if (!confirmDelete) return;

  try {
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("No fue posible eliminar el producto.");
    }

    await updateCartCounter();

    location.reload();
  } catch (error) {
    console.error(error);

    alert("Error eliminando el producto.");
  }
}

// =============================
// Vaciar carrito
// =============================

async function clearCart() {
  const confirmClear = confirm("¿Deseas vaciar completamente el carrito?");

  if (!confirmClear) return;

  try {
    const response = await fetch(`/api/carts/${cartId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("No fue posible vaciar el carrito.");
    }

    await updateCartCounter();

    location.reload();
  } catch (error) {
    console.error(error);

    alert("Error al vaciar el carrito.");
  }
}

// =============================
// Abrir carrito
// =============================

if (cartLink) {
  cartLink.addEventListener("click", (e) => {
    e.preventDefault();

    if (!cartId) {
      alert("Tu carrito está vacío.");
      return;
    }

    window.location.href = `/carts/${cartId}`;
  });
}

// =============================
// Agregar producto
// =============================

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    addProduct(addToCartBtn.dataset.productId);
  });
}

// =============================
// Vaciar carrito
// =============================

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

// =============================
// Botones eliminar
// =============================

document.querySelectorAll(".removeProduct").forEach((button) => {
  button.addEventListener("click", () => {
    removeProduct(button.dataset.productId);
  });
});

// =============================
// Inicio
// =============================

updateCartCounter();

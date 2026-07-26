const socket = io();

const container = document.getElementById("productsContainer");

async function loadProducts() {
  try {
    const response = await fetch("/api/products?limit=100");

    const data = await response.json();

    renderProducts(data.payload);
  } catch (error) {
    console.error(error);
  }
}

socket.on("productsUpdated", (products) => {
  renderProducts(products);
});

function renderProducts(products) {
  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = `

        <div class="col-span-full text-center py-20">

            <h2 class="text-3xl font-bold">

                No existen productos.

            </h2>

        </div>

        `;

    return;
  }

  products.forEach((product) => {
    const image =
      product.thumbnails && product.thumbnails.length
        ? `/images/products/${product.thumbnails[0]}`
        : null;

    const card = document.createElement("div");

    card.className = "bg-zinc-900 rounded-2xl overflow-hidden shadow-lg";

    card.innerHTML = `

            <div class="h-56 bg-zinc-800 flex items-center justify-center">

                ${
                  image
                    ? `<img src="${image}" class="max-h-40 object-contain">`
                    : `<span class="text-7xl">🖥️</span>`
                }

            </div>

            <div class="p-6">

                <h2 class="text-2xl font-bold mb-3">

                    ${product.title}

                </h2>

                <p class="text-zinc-400 mb-5">

                    ${product.description}

                </p>

                <div class="space-y-2">

                    <p>

                        <strong>Precio:</strong>

                        $${product.price}

                    </p>

                    <p>

                        <strong>Stock:</strong>

                        ${product.stock}

                    </p>

                    <p>

                        <strong>Categoría:</strong>

                        ${product.category}

                    </p>

                </div>

            </div>

        `;

    container.appendChild(card);
  });
}

loadProducts();


let carrito = [];
const productos = [
  { id: 1, nombre: "Corte de cabello", precio: 25 },
  { id: 2, nombre: "Peinados para ocasiones especiales", precio: 40 },
  { id: 3, nombre: "Coloración y mechas", precio: 50 },
  { id: 4, nombre: "Tratamientos capilares", precio: 30 }
];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    console.log(`Se agregó al carrito: ${producto.nombre}`);
  } else {
    console.log("Producto no encontrado");
  }
}

function vaciarCarrito() {
  carrito = [];
  console.log("Se vació el carrito");
}

function obtenerProductos() {
  return fetch("https://api.example.com/productos")
    .then(response => response.json())
    .then(data => {
      return data.productos;
    })
    .catch(error => {
      console.log("Error al obtener los productos:", error);
      return [];
    });
}

function generarProductosDOM(productos) {
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";

  productos.forEach(producto => {
    const productoElement = document.createElement("div");
    productoElement.classList.add("producto");
    productoElement.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;

    productosContainer.appendChild(productoElement);
  });
}

function inicializarPagina() {
  obtenerProductos()
    .then(productos => {
      generarProductosDOM(productos);
    })
    .catch(error => {
      console.log("Error al obtener los productos:", error);
    });
}

window.addEventListener("DOMContentLoaded", inicializarPagina);

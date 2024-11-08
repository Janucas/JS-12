// Obtener los endpoints y mostrar la lista de productos
document.getElementById("endpointForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const url = document.getElementById("url").value;
    const showAllEndpoint = document.getElementById("showAll").value;
    const addEndpoint = document.getElementById("add").value;
    const updateEndpoint = document.getElementById("update").value;
    const deleteEndpoint = document.getElementById("delete").value;

    // Mostrar el formulario de inserción
    document.getElementById("insertForm").style.display = "block";

    // Cargar y mostrar productos
    fetch(`${url}${showAllEndpoint}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data, url, deleteEndpoint, updateEndpoint);
        })
        .catch(error => console.error("Error al obtener productos:", error));
});

// Función para mostrar los productos en una tabla
function displayProducts(products, baseUrl, deleteEndpoint, updateEndpoint) {
    document.getElementById("productTable").style.display = "block";
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.productPrice}</td>
            <td>
                <button onclick="editProduct('${product.productId}', '${product.productName}', '${product.productPrice}', '${updateEndpoint}')">Editar</button>
                <button onclick="deleteProduct('${baseUrl}${deleteEndpoint}', '${product.productId}')">Borrar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para insertar un nuevo producto
document.getElementById("insertBtn").addEventListener("click", function(event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const url = document.getElementById("url").value;
    const addEndpoint = document.getElementById("add").value;

    fetch(`${url}${addEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productPrice })
    })
    .then(response => {
        if (response.ok) {
            alert("Producto insertado correctamente");
            location.reload(); // Recarga para mostrar el producto insertado
        } else {
            alert("Error al insertar el producto");
        }
    })
    .catch(error => console.error("Error al insertar producto:", error));
});

// Función para borrar un producto
function deleteProduct(deleteUrl, productId) {
    fetch(deleteUrl.replace("{id}", productId), { method: "DELETE" })
        .then(() => {
            alert("Producto borrado correctamente");
            location.reload();
        })
        .catch(error => console.error("Error al borrar producto:", error));
}

// Función para iniciar la edición de un producto
function editProduct(productId, productName, productPrice, updateEndpoint) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("editProductName").value = productName;
    document.getElementById("editProductPrice").value = productPrice;
    document.getElementById("updateBtn").onclick = function() {
        updateProduct(productId, updateEndpoint);
    };
}

// Función para actualizar un producto
function updateProduct(productId, updateEndpoint) {
    const productName = document.getElementById("editProductName").value;
    const productPrice = document.getElementById("editProductPrice").value;
    const url = document.getElementById("url").value;

    fetch(`${url}${updateEndpoint.replace("{id}", productId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productPrice })
    })
    .then(response => {
        if (response.ok) {
            alert("Producto actualizado correctamente");
            location.reload();
        } else {
            alert("Error al actualizar el producto");
        }
    })
    .catch(error => console.error("Error al actualizar producto:", error));
}

const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const allProducts = await res.json();
    displayProducts(allProducts);
};

const loadProducts = () => {
    document.getElementById('contentChange').classList.add('hidden');
    document.getElementById('productApi').classList.remove('hidden');
};

const loadHome = () => {
    document.getElementById('contentChange').classList.remove('hidden');
    document.getElementById('productApi').classList.add('hidden');
};

const loadCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const allCategories = await res.json();
    displayCategories(allCategories);
};

const displayCategories = (categories) => {
    const cat = document.getElementById('categories');

    const displayAll = document.createElement('button');
    displayAll.className = 'btn btn-outline btn-sm';
    displayAll.textContent = 'All';
    displayAll.onclick = () => loadAllProducts();
    cat.appendChild(displayAll);

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline btn-sm';
        btn.textContent = category;
        btn.onclick = () => loadCategoryProducts(category);
        cat.appendChild(btn);
    });
};




const loadAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    displayProducts(products);
};

const loadCategoryProducts = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const products = await res.json();
    displayProducts(products);
};

const displayProducts = (products) => {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow';
        card.innerHTML = `
            <figure class="px-4 pt-4 h-64 bg-gray-100">
                <img src="${product.image}" alt="${product.title}" class="h-full object-contain" />
            </figure>
            <div class="card-body">
                <div class="flex justify-between">  
                    <div class="badge badge-outline mb-2 bg-blue-300">${product.category}</div>
                    <div class="flex items-center gap-2 mb-2">
                        <div class="rating rating-sm">
                            <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
                        </div>
                        <span class="text-sm text-gray-600">${product.rating.rate} (${product.rating.count})</span>
                    </div>
                </div>
                <h3 class="card-title text-lg line-clamp-2">${product.title}</h3>
                <p class="text-2xl font-bold text-primary">$${product.price}</p>
                <div class="card-actions justify-between mt-4">
                    <button class="btn btn-outline btn-sm" onclick="loadProductDetails(${product.id})"><i class="fa-solid fa-eye"></i> Details</button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart mr-2"></i>Add
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
};

const loadProductDetails = async (productId) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();
    showDetails(data);
};

const showDetails = (productData) => {
    const modalBox = document.getElementById('modal-content');
    modalBox.innerHTML = ``;
    modalBox.innerHTML = `
        <div class="max-w-[668px] p-2 flex flex-col">
            <img class=" rounded-lg bg-gray-100 p-4" src="${productData.image}">
            <h2 class="text-2xl font-bold mt-4">${productData.title}</h2>
            <div class="badge  w-fit mt-2 bg-blue-300">${productData.category}</div>
            
            <div class="grid grid-rows-2 grid-cols-2 gap-2 mt-4">
                <div class="flex items-center gap-2">
                    <i class="fas fa-star text-orange-400 text-sm"></i>
                    <p class="text-slate-500 text-sm">Rating: ${productData.rating.rate} (${productData.rating.count} reviews)</p>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-tag text-sm"></i>
                    <p class="text-slate-500 text-sm">Price: $${productData.price}</p>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="flex flex-col gap-2">
                <h2 class="text-xl font-bold">Details Information</h2>
                <p class="text-slate-400 text-sm">${productData.description}</p>
            </div>
            
            <div class="modal-action justify-between mt-6">
                
                <button class="btn btn-primary" onclick="addToCart(${productData.id})">
                    <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `;
    document.getElementById("my_modal_6").checked = true;
};
``
loadCategories();
loadAllProducts();
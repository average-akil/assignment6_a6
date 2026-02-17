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
                    <button class="btn btn-outline btn-sm" onclick="showDetails(${product.id})"><i class="fa-solid fa-eye"></i> Details</button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart mr-2"></i>Add
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
};

loadCategories();
loadAllProducts();
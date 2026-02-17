 const fetchProducts = async () => {

     const response = await fetch('https://fakestoreapi.com/products');
     allProducts = await response.json();
     displayProducts(allProducts);


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
                    <button class="btn btn-outline btn-sm" onclick="showDetails(${product.id})"> <i class="fa-solid fa-eye"></i> Details</button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart mr-2"></i>Add
                    </button>
                </div>
            </div>
        `;
         grid.appendChild(card);
     });
 };



 fetchProducts();
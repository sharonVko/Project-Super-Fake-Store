console.log("fakestore");

const URLStoreLink = "https://fakestoreapi.com/products"

const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
const selectSort = document.querySelector('#selectSort') as HTMLSelectElement;
const electronicBtn = document.querySelector('#electronicBtn') as HTMLButtonElement;
const jewelleryBtn = document.querySelector('#jewelleryBtn') as HTMLButtonElement;
const mensClothingBtn = document.querySelector('#mensClothingBtn') as HTMLButtonElement;
const womensClothingBtn = document.querySelector('#womensClothingBtn') as HTMLButtonElement;
/* const cardOutput = document.querySelector('#cardOutput') as HTMLDivElement; */
const productCards = document.querySelector('#productCards') as HTMLElement;

console.log(searchInput, selectSort,electronicBtn,jewelleryBtn,mensClothingBtn,womensClothingBtn);


type TProduct = {
    id: number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string
}

fetch(URLStoreLink).then((response:Response) => {
    console.log(response);
    if(!response.ok){
        throw new Error("request failed")
    }
    return response.json()
    
}).then((product: TProduct[]) => {
    console.log(product);
    renderProducts(product)
    
}).catch((err: Error) => {
    console.error("fetching products failed",err)
})


const renderProducts = (products: TProduct[]):void => {
    if(!productCards) return;
    productCards.innerHTML = " ";
    products.forEach((product: TProduct) => {
        const singleCardOutput = document.createElement('div');
        singleCardOutput.className = "single-card"; // class to style product cards in css
            singleCardOutput.innerHTML = `
            <img src= "${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <h2>€ ${product.price.toFixed(2)}</h2>
            <button>Add to Cart</button>
            `;
            productCards.appendChild(singleCardOutput)    
    })
}

// filter categories

const filterByCategory = (category: string):void => {
    fetch(URLStoreLink)
    .then(response => response.json())
    .then(products => {
     const filteredProducts = products.filter((product: TProduct) => product.category === category);  
     renderProducts(filteredProducts);
    }).catch(err => console.error("fetching products failed", err));
};

// matching buttons for filter options

electronicBtn?.addEventListener('click', () => filterByCategory('electronics'));
jewelleryBtn?.addEventListener('click', () => filterByCategory('jewelery'));
mensClothingBtn?.addEventListener('click', () => filterByCategory("men's clothing"));
womensClothingBtn?.addEventListener('click', () => filterByCategory("women's clothing"));





/* .then((product: TProduct) => {
    console.log(product);
    const productImg = document.createElement('img')
    productImg.src = product.image
    cardOutput.appendChild(productImg)
    const productTitle = document.createElement('h3')
    
}) */
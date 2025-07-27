const products = [
    {
      id: "1",
      name: "Naruto Keychain",
      desc: "High quality Naruto keychain(Naruto,minato,itachi,sasuke,madara,kakashi).",
      images: ["Meesho/ms_5yin5_512_391779167.jpg", "placeholder2.jpg"],
      price1: 199,
      price2: 349,
      discount: 40
    },
    {
      id: "2",
      name: "Gojo Figurine",
      desc: "Premium Gojo Satoru figure collectible.",
      images: ["placeholder1.jpg"],
      price1: 499,
      price2: 799,
      discount: 30
    }
  ];
  
  const container = document.getElementById("product-list");
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><span class="badge">${p.discount}% OFF</span> ₹${p.price1}</p>
      <a href="product.html?id=${p.id}" class="buy-btn">Buy Now</a>
    `;
    container.appendChild(card);
  });
  
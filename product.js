(function(){
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const p = products.find(x => x.id === id);
    if (!p) return alert("Product not found");
  
    document.getElementById("prodName").textContent = p.name;
    document.getElementById("prodDesc").textContent = p.desc;
    document.getElementById("prodDiscount").textContent = p.discount + "% OFF";
  
    // images slider
    const slider = document.getElementById("slider");
    p.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      slider.appendChild(img);
    });
  
    // price options
    const po = document.getElementById("priceOptions");
    [ {label: "Buy One", price: p.price1},
      {label: "Buy Combo", price: p.price2} 
    ].forEach(opt => {
      const idf = `op${opt.price}`;
      po.innerHTML += `
        <label class="price-option">
          <input type="radio" name="priceOption" value="${opt.price}" id="${idf}" onclick="document.getElementById('fieldPrice').value='${opt.price}'" ${opt.price===p.price1 ? "checked" : ""}>
          ${opt.label} – ₹${opt.price}
        </label>`;
    });
  
    document.getElementById("fieldProdName").value = p.name;
    document.getElementById("fieldPrice").value = p.price1;
  
    document.getElementById("orderForm").addEventListener("submit", function(e) {
      e.preventDefault();
  
      const data = {};
      new FormData(e.target).forEach((v,k) => data[k] = v);
  
      fetch("https://script.google.com/macros/s/AKfycbzz1zg0DUKLPQ5umWX5d2R0rWywbkDwWnb2y10U_L1FNuSGD55HPRlCjjOOfaqPx2M8IA/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      })
      .then(resp => {
        if (resp.ok) window.location.href = "thankyou.html";
        else alert("Submission failed");
      }).catch(err => alert("Error submitting order"));
    });
  })();
  
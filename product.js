(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const p = products.find(x => x.id === id);
  if (!p) return alert("Product not found");

  // Populate product info
  document.getElementById("prodName").textContent = p.name;
  document.getElementById("prodDesc").textContent = p.desc;
  document.getElementById("prodDiscount").textContent = p.discount + "% OFF";

  // Slider
  const slider = document.getElementById("slider");
  p.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    slider.appendChild(img);
  });

  // Price options
  const po = document.getElementById("priceOptions");
  [
    { label: "Buy One at", price: p.price1 },
    { label: "Buy Two at", price: p.price2 }
  ].forEach(opt => {
    const idf = `op${opt.price}`;
    po.innerHTML += `
      <label class="price-option">
        <input type="radio" name="priceOption" value="${opt.price}" id="${idf}" onclick="document.getElementById('fieldPrice').value='${opt.price}'" ${opt.price === p.price1 ? "checked" : ""}>
        ${opt.label} – ₹${opt.price}
      </label>`;
  });

  document.getElementById("fieldProdName").value = p.name;
  document.getElementById("fieldPrice").value = p.price1;

  // Form submission
  const form = document.getElementById("orderForm");
  const submitBtn = form.querySelector("button[type='submit']");
  const loadingText = document.createElement("span");

  loadingText.textContent = "Submitting...";
  loadingText.style.marginLeft = "10px";
  loadingText.style.display = "none";
  submitBtn.parentNode.appendChild(loadingText);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic Validation
    const name = form.customerName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();

    if (!name || !email || !phone || !address) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    // Prepare and send
    const formData = new FormData(form);
    submitBtn.disabled = true;
    loadingText.style.display = "inline-block";

    fetch("https://script.google.com/macros/s/AKfycbySoYvwE3rrJSZLAV9CYNsLXrSChzsMs_XXxOfLN_-DrIERE6xDM8mMGbwn9xILZ8ZvOA/exec", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(msg => {
      if (msg.includes("Success")) {
        window.location.href = "thankyou.html";
      } else {
        alert("Submission failed: " + msg);
      }
    })
    .catch(err => {
      alert("Error submitting order: " + err.message);
    })
    .finally(() => {
      submitBtn.disabled = false;
      loadingText.style.display = "none";
    });
  });
})();

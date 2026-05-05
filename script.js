const counter = document.getElementById("games-available");
if (counter) {
  let target = 2500,
    current = 0,
    speed = 10,
    increament = target / 100;
  function updateCounter() {
    if (target > current) {
      current += increament;
      counter.innerText = Math.floor(current);
      setTimeout(updateCounter, speed);
    } else {
      counter.innerText = target;
    }
  }
  updateCounter();
}

const playercounter = document.getElementById("active-player");
if (playercounter) {
  let target2 = 5000000,
    current2 = 0,
    speed2 = 10,
    increament2 = target2 / 100;
  function updateCounter2() {
    if (target2 > current2) {
      current2 += increament2;
      playercounter.innerText = Math.floor(current2);
      setTimeout(updateCounter2, speed2);
    } else {
      playercounter.innerText = target2;
    }
  }
  updateCounter2();
}

const btn = document.getElementById("theme-toggle");
if (btn) {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
  }
  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-theme") ? "light" : "dark",
    );
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
    alert("Login Successful! Welcome " + username);
    window.location.href = "games.html";
  });
}

const regForm = document.querySelector(".register-form");
if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Account created successfully!");
    window.location.href = "login.html";
  });
}

const form1 = document.getElementById("contactForm");
if (form1) {
  form1.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message sent successfully! 🚀");
    form1.reset();
  });
}

window.addEventListener("DOMContentLoaded", function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let currentUser = localStorage.getItem("currentUser");
  let userProfile = document.getElementById("user-profile");
  let displayUsername = document.getElementById("display-username");

  if (isLoggedIn === "true" && currentUser) {
    if (userProfile) {
      userProfile.style.display = "flex";
    }
    if (displayUsername) {
      displayUsername.textContent = currentUser;
    }
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  }
});

document.addEventListener("mousemove", (e) => {
  const blobs = document.querySelectorAll(".blob");
  if (blobs.length > 0) {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    blobs.forEach((blob) => {
      blob.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});

function togglecart(id, name, price, image, btnElement) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let exists = cart.some((item) => item.id === id);

  if (exists) {
    cart = cart.filter((item) => item.id !== id);
    btnElement.innerText = "Add to cart";
    btnElement.style.background = "";
  } else {
    cart.push({ id: id, name: name, price: price, image: image });
    btnElement.innerText = "Added ✓";
    btnElement.style.background = "#ff4b4b";
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showcart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-container");
  if (!container) return;

  container.innerHTML = "";
  if (cart.length == 0) {
    container.innerHTML = "<h3>Your cart is empty</h3>";
  } else {
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      container.innerHTML += `<div class="card">  
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>`;
    }
  }
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  showcart();
}

window.onload = function () {
  showcart();
};

function filterGames() {
  let input = document.getElementById("gameSearch").value.toLowerCase();
  let cards = document.querySelectorAll("#games-page-content .card");
  cards.forEach((card) => {
    let gameName = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = gameName.includes(input) ? "block" : "none";
  });
}

function logGame(gameName) {
  let btnElement = event.target;
  let gameCard = btnElement.closest(".game-item");
  let gameImg = gameCard.querySelector("img").src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let exists = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === gameName) {
      exists = true;
      break;
    }
  }

  if (exists) {
    cart = cart.filter((item) => item.name !== gameName);
    btnElement.innerText = "Add to Cart";
    btnElement.style.background = "";
  } else {
    cart.push({
      id: "free-" + gameName,
      name: gameName,
      price: 0,
      image: gameImg,
    });
    btnElement.innerText = "Added ✓";
    btnElement.style.background = "#ff4b4b";
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let buttons = document.querySelectorAll(".play-btn");

  if (buttons.length > 0) {
    for (let i = 0; i < buttons.length; i++) {
      let gameName = buttons[i].getAttribute("onclick").match(/'([^']+)'/)[1];
      let isAdded = cart.some((item) => item.name === gameName);

      if (isAdded) {
        buttons[i].innerText = "Added ✓";
        buttons[i].style.background = "#ff4b4b";
      }
    }
  }
});

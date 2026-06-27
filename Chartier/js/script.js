const prix = [
  {
    "titre": "Coupe Signature",
    "prix": 68,
    "description": "Coupe de cheveux personnalisée avec consultation et conseils de style."
  },
  {
    "titre": "Coupe & Forme",
    "prix": 55,
    "description": "Coupe de cheveux avec mise en forme et finition."
  },
  {
    "titre": "Atelier Couleur",
    "prix": 95,
    "description": "Coloration, mèches ou balayage avec consultation et conseils de couleur."
  },
  {
    "titre": "Soin",
    "prix": 35,
    "description": "Soin capillaire nourrissant et revitalisant pour des cheveux sains et brillants."
  },
  {
    "titre": "Coiffage événementiel",
    "prix": 55,
    "description": "Coiffure spéciale pour événements, mariages ou occasions spéciales."
  }
]

const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const bookingForm = document.querySelector("#booking-form");
const formMessage = document.querySelector("#form-message");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.classList.toggle("menu-open", !isOpen);
  mobileMenu?.classList.toggle("hidden", isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.classList.remove("menu-open");
    mobileMenu.classList.add("hidden");
  });
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formMessage) return;

  formMessage.textContent = "Merci. Votre demande est prête à être connectée à un service de réservation.";
  formMessage.classList.remove("hidden");
  bookingForm.reset();
});

// Populate pricing list
const container = document.getElementById("pricing-list");
container.innerHTML = prix.map((item) => `<div class="price-row">
  <p>${item.titre}</p>
  <small>${item.description}</small>
  <span>À partir de ${item.prix} EUR</span>
</div>`).join("");

// Populate booking service select options
const select = document.getElementById("booking-service");
select.innerHTML = `<option value="">Choisir un service</option>` + prix.map((item) => `<option value="${item.titre}">${item.titre} - à partir de ${item.prix} €</option>`).join("");


// Set minimum date for booking date input to tomorrow
const dateInput = document.getElementById("booking-date");
const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

const year = tomorrow.getFullYear();
const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
const day = String(tomorrow.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;
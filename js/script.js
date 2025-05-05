import { GameDetails } from "./details.js";

class GameApp {
  constructor() {
    this.rowContainer = document.querySelector(".row");
    this.categoryLinks = document.querySelectorAll(".nav-link");
    this.navbarContainer = document.querySelector(".navbar-container");
    this.loader = document.querySelector(".loader");
    this.fetchGames();
    this.GetApiWithCategory();
    this.fixedNavbar();
  }

  GetApiWithCategory() {
    this.categoryLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedCategory = link.textContent.toLowerCase();
        this.categoryLinks.forEach((link) => {
          if (link.classList.contains("active")) {
            link.classList.remove("active");
          }
        });
        link.classList.add("active");
        this.fetchGames(selectedCategory);
      });
    });
  }

  async fetchGames(category = "mmorpg") {
    this.loader.classList.remove("d-none");
    this.apiOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d183614a3cmsh6d454e8aeda7c18p180e28jsn2cf3b52e5f1e",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const request = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      this.apiOptions
    );
    this.loader.classList.add("d-none");
    if (!request.ok) {
      console.error("Error fetching games:", request.statusText);
      return;
    }

    const response = await request.json();
    this.displayGames(response);
    this.GetID();
  }

  displayGames(response) {
    this.rowContainer.innerHTML = response
      .map(
        (response) => `
      <div class="col-md-3" data-id="${response.id}">
        <div class="parent p-0 h-100 d-flex flex-column rounded text-white">
          <div class="image p-2 w-100">
            <img src="${response.thumbnail}" alt="${
          response.title
        }" class="w-100 img rounded-top" />
          </div>
          <div class="cont1 mt-1 p-2">
            <div class="d-flex justify-content-between align-items-center ">
              <div class="name">${response.title}</div>
              <div>
                <button class="btn btn-primary pe-4 ps-4 pt-1 pb-1">free</button>
              </div>
            </div>
            <p class="short-disc text-center mt-2 opacity-50 ">
              ${
                response.short_description.split(" ").slice(0, 10).join(" ") +
                "..."
              }
            </p>
          </div>
          <div class="cont3 p-2 text-white mt-auto d-flex justify-content-between align-items-center ">
            <span class="lastDiv ">${response.genre}</span>
            <span class="lastDiv">${response.platform}</span>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  GetID() {
    const cards = document.querySelectorAll(".col-md-3");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const gameId = card.getAttribute("data-id");
        const game = new GameDetails(gameId);
        game.fetch();
      });
    });
  }

  fixedNavbar() {
    const navbar = this.navbarContainer;
    const landingSection = document.querySelector(".landing");

    const landingHeight = landingSection.offsetHeight - 30;

    window.addEventListener("scroll", () => {
      if (window.scrollY > landingHeight) {
        if (!navbar.classList.contains("fixed-nav")) {
          navbar.classList.add("fixed-nav");
        }
      } else {
        if (navbar.classList.contains("fixed-nav")) {
          navbar.classList.remove("fixed-nav");
        }
      }
    });
  }
}

new GameApp();

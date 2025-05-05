export class GameDetails {
  constructor(id) {
    this.id = id;
    this.loader = document.querySelector(".loader");
    this.apiOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d183614a3cmsh6d454e8aeda7c18p180e28jsn2cf3b52e5f1e",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
  }

  async fetch() {
    this.loader.classList.remove("d-none");
    const res = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,
      this.apiOptions
    );
    this.details = await res.json();
    this.loader.classList.add("d-none");
    this.showPopup();
  }

  showPopup() {
    const game = this.details;
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
      <div class="popup-content bg-dark text-white p-4 position-relative rounded" style="width: 100%; height: 100vh; overflow-y: auto;">
        <div class="container">
          <button class="close-btn btn text-white position-absolute top-0 end-0 me-5 m-3">X</button>
          <div class="row">
            <div class="col-md-4">
              <h2 class="mb-3 nerko">Details Game</h2>
              <img src="${game.thumbnail}" class="img-fluid mb-3" />
            </div>
            <div class="col-md-7 mt-5">
              <h2 class="mb-3">Title:<span class="nerko">${game.title}</span> </h2>
              <p><strong>Category:</strong><small style="font-weight: 500;" class="span33 text-black  ms-2 bg-info rounded-2 ">${game.genre}</small> </p>
              <p><strong>Platform:</strong><small style="font-weight: 500;" class="span33 text-black  ms-2 bg-info rounded-2 ">${game.platform}</small> </p>
              <p><strong>Status:</strong><small style="font-weight: 500;" class="span33 text-black  ms-2 bg-info rounded-2 ">${game.status}</small> </p>
              <p><strong>Description:</strong><span class="span33 des">${game.description}</span> </p>
              <a href="${game.game_url}" class="btn btn-primary mt-3" target="_blank">Show Game</a>
            </div>
          </div>
        </div>
      </div>
    `;

    popup.style.position = "fixed";
    popup.style.top = "0";
    popup.style.left = "0";
    popup.style.width = "100vw";
    popup.style.height = "100vh";
    popup.style.backgroundColor = "rgba(0,0,0,0.9)";
    popup.style.display = "flex";
    popup.style.justifyContent = "center";
    popup.style.alignItems = "center";
    popup.style.zIndex = "9999";

    document.body.appendChild(popup);

    popup.querySelector(".close-btn").addEventListener("click", () => {
      popup.remove();
    });
  }
}

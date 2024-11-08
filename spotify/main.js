const musicsElm = document.getElementById("musics");
const pageListen = document.getElementById("pageListen");

const baseAPI = "https://zing-mp3-api.vercel.app/api";

async function getMusicNews() {
  try {
    const res = await fetch(`${baseAPI}/chart/home`);

    const dataRes = await res.json();

    const newRelease = dataRes.data.newRelease;

    return newRelease;
  } catch (error) {
    console.log(error);
  }
}

async function initMusics() {
  const musics = await getMusicNews();

  for (const music of musics) {
    const musicCardElm = document.createElement("div");
    musicCardElm.className = "card card--column";

    musicCardElm.innerHTML = `
        <img
            src="${music.thumbnailM}"
            alt=""
        />
        <div class="card-title">${music.title}</div>
        <div class="card-desc">${music.artistsNames}</div>
     `;

    musicCardElm.addEventListener("click", async function () {
      const linkSong = await getSong(music.encodeId);

      pageListen.innerHTML = `
        <h1>${music.title}</h1>
        <audio controls>
            <source
                src="${linkSong}"
            />
        </audio>
      `;
    });

    musicsElm.appendChild(musicCardElm);
  }
}

async function getSong(encodeId) {
  try {
    const res = await fetch(`${baseAPI}/song/${encodeId}`);

    const dataRes = await res.json();

    const linkSong = dataRes["data"]["128"];

    return linkSong;
  } catch (error) {
    console.log(error);
  }
}

initMusics();

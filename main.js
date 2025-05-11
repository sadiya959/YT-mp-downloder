document.querySelector("#search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.querySelector("#search").value;

  const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f29a6326cdmsh8a5915d6f082155p13baeajsn7d3d1c2a405a",
      "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    displayvidoes(result.data);
    console.log(data);
  } catch (error) {
    console.error("error fetching searching result:", error);
  }
});

function displayvidoes(data) {
  const vidoesLists = document.querySelector(".videos");

  vidoesLists.innerHTML = "";

  data.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video");
    vidoesLists.appendChild(videoItem);

    videoItem.innerHTML = `
     <img
          src=${video.thumbnail[0].url}
          alt="video thumbnail"
        />
        <div class="video-info">
          <img
            class="channel-image"
            src=${video.channelThumbnail[0].url}
            alt="channel Thumbnail"
          />
          <div>
            <h2>${video.title}</h2>
            <h3>${video.channelTitle}</h3>
            <span>${video.viewCount} views</span>
            <span>.</span>
            <span>${video.publishedText}</span>
          </div>
        </div>
    `;

    videoItem.addEventListener("click", () => showModal(video.videoId));
  });
}

function showModal(videoId) {
  const modal = document.querySelector(".modal");
  const videoPlayer = document.querySelector("#video-player");

  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  videoPlayer.src = videoUrl;
  modal.style.display = "flex";

  const downloadMp3 = document.querySelector("#download-mp3");

  downloadMp3.addEventListener("click", async function () {
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f29a6326cdmsh8a5915d6f082155p13baeajsn7d3d1c2a405a",
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.status === "ok") {
        window.location.href = result.link;
      } else {
        alert("error downloading MP3");
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
}

const closeModal = document.querySelector(".close-modal");

closeModal.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const videoPlayer = document.querySelector("#video-player");

  modal.style.display = "none";
  videoPlayer.src = "";
});

window.onclick = function (e) {
  const modal = document.querySelector(".modal");
  const videoPlayer = document.querySelector("#video-player");

  if (e.target === modal) {
    modal.style.display = "none";
    videoPlayer.src = "";
  }
};

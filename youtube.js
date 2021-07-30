async function searchVideos() {
  let inp = document.getElementById("inp").value;

  // for view count ---->  GET https://youtube.googleapis.com/youtube/v3/search?order=viewCount&key=[YOUR_API_KEY] HTTP/1.1

  //GET https://youtube.googleapis.com/youtube/v3/search?order=viewCount&regionCode=India&key=[YOUR_API_KEY] HTTP/1.1

  //https://youtube.googleapis.com/youtube/v3/search?maxResults=20&order=viewCount&regionCode=India&key=[YOUR_API_KEY] HTTP/1.1

  let res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?q=${inp}&key=AIzaSyAzSFwOn8khT5oQLEeNPL9rPwot2eKTfYg&maxResults=20`
  );
  let data = await res.json();

  let videos_div = document.getElementById("videos1");
  let videos_div1 = document.getElementById("videos");
  videos_div1.innerHTML = "";
  videos_div.innerHTML = "";
  let { items } = data;

  items = items.filter((el) => {
    return el.id.videoId != undefined;
  });

  items.forEach(({ id: { videoId } }) => {
    let div = document.createElement("div");
    //<iframe width="560" height="315" src="https://www.youtube.com/embed/BNdPAEBEhQU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    div.style.marginTop = "20px";
    div.style.float = "left";
    div.style.marginLeft = "60px";
    div.innerHTML = `<iframe width="320" height="180" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    videos_div.appendChild(div);
  });
  console.log(data);
}

async function defaultVideos() {
  //GET https://youtube.googleapis.com/youtube/v3/videos?regionCode=India&key=[YOUR_API_KEY] HTTP/1.1

  //GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=India&key=[YOUR_API_KEY] HTTP/1.1

  try {
    let res1 = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=In&key=AIzaSyAzSFwOn8khT5oQLEeNPL9rPwot2eKTfYg&maxResults=20`
    );
    let data1 = await res1.json();

    let videos_div = document.getElementById("videos");

    let { items } = data1;

    items = items.filter((el) => {
      return el.id != undefined;
    });
    console.log(data1);
    items.forEach(({ id }) => {
      let div = document.createElement("div");

      div.style.marginTop = "20px";
      div.style.float = "left";
      div.style.marginLeft = "60px";
      div.innerHTML = `<iframe width="320" height="180" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      videos_div.appendChild(div);
    });
  } catch (err) {
    console.log("err:", err);
  }
}
defaultVideos();

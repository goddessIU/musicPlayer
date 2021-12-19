// PlayerCoverBackMode("recommend", lastRecommendId);

import { getAudioInfo, getAudioLyric } from "../service/ajax.js";
import { reactive } from "../util/reactive.js";
import { blur, formatSongLyric } from "../util/util.js";

// const src =
//   " https://tse1-mm.cn.bing.net/th?id=OIP.M2dHJdmuNPhuODWuMLIK_gHaEo&w=170&h=106&c=8&rs=1&qlt=90&dpr=1.25&pid=3.1&rm=2 ";
// const imgBox = document.querySelector(".player-background-image");
// blur(imgBox, src);

const music = {
  data: [],
  lyric: []
};

const musicDataProxy = reactive(
  {
    musicId: 1813926556,
  },
  initPlayer
)

export async function playerPage({params: id = ''}) {
  document.querySelector("#app").innerHTML = "playerPage加载中";
  changePlayerMusicId(id);
}



export async function changePlayerMusicId(musicId) {
  const id = musicId;
  const musicData = await getAudioInfo(id);
  const musicLyric = await getAudioLyric(id);
  music.data = musicData;
  //初始化播放器歌词
  music.lyric = formatSongLyric(musicLyric.lrc.lyric);
  musicDataProxy.musicId = id;
}

async function initPlayer() {
  let songInfo = music.data.songs[0];
  document.querySelector("#app").innerHTML = `
  <div class="player-background-image">
                
  <div class="player-content display-flex w">
      <div class="player-album-cover display-flex">
          <div class="album">
              <div class="cover running">
                  <img src="${songInfo.al.picUrl}"
                  alt="">
              </div>
          </div>
      </div>
      <div class="player-lyric display-flex flex-column   justify-content-start   align-items-start">
          <h3>${songInfo.name}</h3>
          <div class="info">
              <span class='label'>专辑：</span><span class='tag'>${songInfo.al.name}</span>
              <span class='label'>歌手：</span><span class='tag'>${songInfo.ar[0].name}</span>
              <span class='label'>专辑：</span><span class='tag'>${songInfo.al.name}</span>
          </div>
          <div class="lyric-wrap">
          ${initLyric(music.lyric)}
          </div>
      </div>
  </div>
</div>
  `;
}

function initLyric(lyricData) {
  if (lyricData.length == 0) return "";
  let tempStr = "";
  lyricData.forEach((item) => {
    tempStr += `
        <p class="song-lyric-item" data-time='${item.time}'>${
      Object.keys(item).length > 0 ? item.lyric : ""
    }</p>
        `;
  });
  return tempStr;
}
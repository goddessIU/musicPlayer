import { getAudioInfo, getAudioSrc } from "../service/ajax.js";

export async function initPlayerControl() {
    let musicId = Number(window.localStorage.getItem('musicId'));

    const musicSrc = await getAudioSrc(musicId);
    const musicData = await getAudioInfo(musicId);

    if (musicId = '1813926556') {
        const myAudio = document.querySelector("#myAudio");
        // myAudio.muted = true;
        myAudio.src = musicSrc;
        let songInfo;
        musicData && (songInfo = musicData.songs[0]);
        playerControlRender(songInfo);
        PlayerCoverBackMode("player", musicId);
    }
    
}

function playerControlRender(songInfo) {
    //修改播放器控制栏的视图
    // console.log(songInfo.al.picUrl)
    document.querySelector(".song-name").innerText = songInfo.name;
    document.querySelector(".singer-name").innerText = songInfo.ar[0].name;
    
    // document.querySelector(".total-time").innerText = formatSongTime(songInfo.dt);

    const as = document.querySelectorAll(".player-control-songInfo  .img");
    for (const m of as) {
        m.innerHTML = `<img src="${songInfo.al.picUrl}" alt='' >`;
    }
    document.querySelector(".player-control-unit #player-control").innerHTML = `
      <use xlink:href="#icon-bofangzhong"></use>
      `;
  }

  import { reactive } from "../util/reactive.js";

  const isPlayProxy = reactive(
      {
          isPlay: false,
      },
      playPauseKeyRender
  );

  const musicIdProxy = reactive(
      {
          musicId: 1813926556,
      },
      initPlayerControl
  )


function playPauseKeyRender() {
    const myAudio = document.querySelector("#myAudio");
  const playerControl = document.querySelector(
    ".player-control-unit #player-control"
  );
//   console.log(myAudio.src)
//   console.log(playerControl)
    isPlayProxy.isPlay ? (myAudio.play()) : (myAudio.pause());
    isPlayProxy.isPlay
    ? (playerControl.innerHTML = `<use xlink:href="#icon-zanting"></use>`)
    : (playerControl.innerHTML = `<use xlink:href="#icon-bofangzhong"></use>`);
}

export function initPlayerEvent() {
    const playerControl = document.querySelector(".player-control-unit #player-control");
    playerControl.addEventListener('click', () => {
        isPlayProxy.isPlay = !isPlayProxy.isPlay;
    });
}

export function PlayerCoverBackMode(page, id) {
    if (page=== 'player') {
        //前往player利用playercover
        const playerCover = document.querySelector('#playerCover');
        playerCover.setAttribute('href', `#/player/:${id}`);
        document.querySelector("#playerCoverBack").classList.add("display-none");
        document.querySelector("#playerCover").classList.remove("display-none");
    } else if (page === 'recommend') {
        document
      .querySelector("#playerCoverBack")
      .setAttribute("href", `#/recommendList/:${id}`);
    document.querySelector("#playerCover").classList.add("display-none");
    document.querySelector("#playerCoverBack").classList.remove("display-none");
    }
}
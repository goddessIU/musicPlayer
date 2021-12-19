import { getRecommendList } from "../service/ajax.js";
import { formatCreateTime  } from "../util/util.js";
import { PlayerCoverBackMode } from "../home/control.js";
import { initPlayerControl, initPlayerEvent } from "../home/control.js";
const recommendDetail = {
    detail: {},
    playlist: []
  };
  

export async function recommendListPage({params = ''}) {
    document.querySelector('#app').innerHTML = '加载中';
    const result = await getRecommendList(params);
    if (result.code === 404) {
        document.querySelector('#app').innerHTML = '加载失败';
    } else {
        recommendDetail.detail = result.playlist;
        recommendDetail.playlist = result.playlist.tracks;
        initRecommendListPage();
        initRecommendTable();
    }
};

function initRecommendListPage() {
    let tagsTemplate = ``;
    recommendDetail.detail.tags.forEach((tag, index) => {
        index == recommendDetail.detail.tags.length - 1
          ? (tagsTemplate += `<span class="tag">${tag}  </span>`)
          : (tagsTemplate += `<span class="tag">${tag} / </span>`);
      });
    let time = formatCreateTime(recommendDetail.detail.createTime);
    document.querySelector("#app").innerHTML = `
    <div class="w">
              <!-- 此处为推荐页，内容主要包括两个部分：歌单介绍和歌单列表 -->
              <div class="recommend-header">
                <a href="#home">首页</a>/
                <span>推荐歌单页</span>
              </div>
              <div class="recommend-wrapper">
                <!-- 此处为推荐页，内容主要包括两个部分：歌单介绍和歌单列表 -->
                <div class="recommend-describe display-flex ">
                  <!-- 歌单介绍 -->
                  <div class="recommend-cover">
                    <img
                    src="${recommendDetail.detail.coverImgUrl}" alt=""
                  />
                  </div>
                  <div class="recommend-content display-flex flex-column justify-content-start align-items-start">
                      <h3>${recommendDetail.detail.name}</h3>
                      <div class="creat">
                        <img
                        class="avatar"
                        src="${recommendDetail.detail.creator.avatarUrl}"
                        alt=""
                      />
                          <span>${recommendDetail.detail.creator.detailDescription}</span>
                           <span>${time}</span>
                        </div>
                      <div class="playAll-add">
                          <span class="playAll">播放全部</span>
                          <span class="add">+</span>
                      </div>
                      <div class="recommend-info">
                          <div class="info">
                          ${recommendDetail.detail.description}
                          </div>
                          <div class="info">
                            <span class="label">歌曲：</span>
                            <span class="label-info">${recommendDetail.detail.trackCount}</span>
                            <span class="label">播放：</span>
                            <span class="label-info">${recommendDetail.detail.playCount}</span>
                          </div>
                          <div class="info">
                            <span class="label">简介：</span>
                            <span class="label-info">${recommendDetail.detail.description}</span>
                          </div>
                      </div>
                  </div>
                </div>
                <div class="recommend-list">
                  <!-- 歌单列表  -->
                  <h4>歌曲列表</h4>
                  <ul class="table-head display-flex justify-content-start">
                      <li class='song'>歌曲</li>
                      <li class='singer'>歌手</li>
                      <li class='album'>专辑</li>
                      <li class='songtime'>时长</li>
                  </ul>
                  <ul class="table-body"></ul>
                </div>
              </div>
            </div>
    `
}


function initRecommendTable() {
    let template = ``;
    recommendDetail.playlist.forEach((item, index) => {
        const minute = Math.floor(item.dt/1000/60);
        const oddOrEven = (index % 2) ? 'odd' : 'even';
        const second = Math.round((item.dt-minute * 60 * 1000)/1000);
        template += `
        <li class="songlist-item ${oddOrEven} display-flex justify-content-start" data-index=${item.id}>
        <div class="songlist-number font-color">
          <span class="index">${index + 1}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangzhong"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangzhong"></use>
          </svg>
        </div>
        <div class="songlist-songname">${item.name}</div>
        <div class="songlist-artist font-color">${item.ar[0].name}</div>
        <div class="songlist-album font-color">${item.al.name}</div>
        <div class="songlist-time font-color">${Math.floor(minute)}:${second >= 10 ? second : '0' + second}</div>
      </li>
        `
    })
    document.querySelector(".table-body").innerHTML = template;



    //制作音频播放
    const songListWrap = document.querySelector('.wrapper');
    songListWrap.addEventListener('click', 
    async (e) => {
        const targetName = e.target.nodeName.toLocaleLowerCase();
        if (targetName === 'div') {
            const id = e.target.parentNode.getAttribute('data-index');
            window.localStorage.setItem('musicId', id);
            initPlayerControl();
            PlayerCoverBackMode('player', id);
        } else if (targetName === 'li') {
            const id = e.target.getAttribute('data-index');
            window.localStorage.setItem('musicId', id);
            initPlayerControl();
            PlayerCoverBackMode('player', id);
        }
    })
}




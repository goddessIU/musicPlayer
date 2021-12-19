const BASE_URL = 'http://localhost:3000';

export function Ajax({
    method = 'GET',
    url,
    data = {}
}) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + url);
        xhr.onload = function() {
            resolve(JSON.parse(xhr.response));
        }
        xhr.onerror = function() {
            if (xhr.onerror == 0) {

            }
        }
        xhr.send(JSON.stringify(data));
    })
}


export async function getBannerList() {
    const result = Ajax({
      url: `/homepage/block/page`,
    });
    return result;
  }

export async function getRecommendList(musicId) {
    const result = Ajax({
        url: `/playlist/detail?id=${musicId}`
    });
    return result;
}

export async function getAudioSrc(musicId) {
    const result = `https://music.163.com/song/media/outer/url?id=${musicId}`;
    return result;
}

export async function getAudioInfo(musicId) {
    const result = Ajax({
        url: `/song/detail?ids=${musicId}`
    });
    return result;
}

export async function getAudioLyric(musicId) {
    const result = Ajax({
      url: `/lyric?id=${musicId}`,
    });
    return result;
  }
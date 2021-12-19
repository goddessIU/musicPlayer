export function debounce(fn, times, isImmediately = true) {
    let cb, 
        timer = null;
    if (isImmediately) {
        cb = function(...args) {
            timer && clearTimeout(timer);
            let isDone = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, times);
            isDone && fn.apply(this, args);
        }

    } else {
        cb = function(...args) {
            timer && clearTimeout(timer);
            const content = this;
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, times);
        }
    }
    return cb;
}

//将hash值拆解并返回，为转换页面服务
export function getRouterOptions(hash) {
    const options = {
      //路由配置选项
      name: "",
      params: "",
      query: "",
    };
    if (!hash || hash == "#home") {
      options.name = "home";
    } else {
      // 提取name params query信息
      //         0   1   2
      //<a href='#/name/:params?query1=value1?query2=value2'></a>
      try {
        const routerArr = hash.slice(1).split("/");
        options.name = routerArr[1];
        const paramsArr = routerArr[2].split("?");
        options.params = paramsArr[0].slice(1);
        options.query = paramsArr.slice(1);
      } catch (error) {
        options.name = "404";
      }
    }
    return options;
  }

  export function formatCreateTime(time) {
    let now = new Date(time);
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    return `${year}-${month}-${day}`;
  }

//绘制播放器界面背景图
//实现高斯模糊的函数
function gaussBlur(imgData) {
  var pixes = imgData.data;
  var width = imgData.width;
  var height = imgData.height;
  var gaussMatrix = [],
    gaussSum = 0,
    x,
    y,
    r,
    g,
    b,
    a,
    i,
    j,
    k,
    len;

  var radius = 10;
  var sigma = 5; //标准差σ，σ描述正态分布资料数据分布的离散程度，σ越大，数据分布越分散，σ越小，数据分布越集中

  a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
  b = -1 / (2 * sigma * sigma);
  //生成高斯矩阵
  for (i = 0, x = -radius; x <= radius; x++, i++) {
    g = a * Math.exp(b * x * x); //标准正态分布函数，正态分布记作N(μ,σ2)，其中μ = 0 ，σ2 = 5
    gaussMatrix[i] = g;
    gaussSum += g;
  }
  //归一化, 保证高斯矩阵的值在[0,1]之间
  for (i = 0, len = gaussMatrix.length; i < len; i++) {
    gaussMatrix[i] /= gaussSum;
  }
  //x 方向一维高斯运算
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = x + j;
        if (k >= 0 && k < width) {
          //确保 k 没超出 x 的范围
          //r,g,b,a 四个一组
          i = (y * width + k) * 4;
          r += pixes[i] * gaussMatrix[j + radius];
          g += pixes[i + 1] * gaussMatrix[j + radius];
          b += pixes[i + 2] * gaussMatrix[j + radius];
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
      // console.log(gaussSum)
      pixes[i] = r / gaussSum;
      pixes[i + 1] = g / gaussSum;
      pixes[i + 2] = b / gaussSum;
      // pixes[i + 3] = a ;
    }
  }
  //y 方向一维高斯运算
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = y + j;
        if (k >= 0 && k < height) {
          //确保 k 没超出 y 的范围
          i = (k * width + x) * 4;
          r += pixes[i] * gaussMatrix[j + radius];
          g += pixes[i + 1] * gaussMatrix[j + radius];
          b += pixes[i + 2] * gaussMatrix[j + radius];
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      pixes[i] = r / gaussSum;
      pixes[i + 1] = g / gaussSum;
      pixes[i + 2] = b / gaussSum;
    }
  }
  //end
  return imgData;
}






  export function blur(ele, src) {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    
    const ctx = canvas.getContext("2d");
    
    const img = new Image();
    img.src = src;
    img.setAttribute('crossorigin', 'anonymous');

    img.onload = function() {
      const {width, height} = canvas;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      let imgData = ctx.getImageData(0, 0, width, height);
      let gauseData = gaussBlur(imgData);
      ctx.putImageData(gauseData, 0, 0);
      const imgSrc = canvas.toDataURL();
      ele.style.backgroundImage = 'url(' + imgSrc + ')';
    }
  }

  export function formatSongLyric(lyricStr) {
    if (typeof lyricStr != "string") return "歌词加载失败";
    const tempArr = lyricStr.split("\n");
    const lyric = tempArr.map((v, i) => {
      let reg = /^\[(\w*:\w*.?\w*)\](.*)/g;
      let lyricObj = {};
      if (reg.test(v)) {
        let timeStr = RegExp.$1;
        let second = timeStr
          .split(":")
          .reduce(
            (accumulator, curValue) => 60 * Number(accumulator) + Number(curValue)
          )
          .toFixed(2);
        lyricObj.time = Number(second);
        lyricObj.lyric = RegExp.$2;
      }
      return lyricObj;
    });
    return lyric;
  }
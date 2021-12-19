import {page1} from "./page1.js";
import {page2} from "./page2.js";
window.addEventListener('hashchange', () => {
  let hash = window.location.hash.slice(1);
  if (hash === 'page1') {
    page1();
  } else if (hash === 'page2') {
    page2();
  }
})
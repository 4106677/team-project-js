var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},o=e.parcelRequired7e4;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in a){var o=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){a[e]=t},e.parcelRequired7e4=o),o("37v9V");var r=o("1yx98");o("kwMPQ");var l=o("4CfrK"),n=o("25RCP");var i={apiKey:"AIzaSyD8Xe_Nj5r_CTsQ1IiUWTLdW_hWsbx85Eg",authDomain:"filmoteka-6051d.firebaseapp.com",databaseURL:"https://filmoteka-6051d-default-rtdb.europe-west1.firebasedatabase.app",projectId:"filmoteka-6051d",storageBucket:"filmoteka-6051d.appspot.com",messagingSenderId:"7192088333",appId:"1:7192088333:web:7a18c384db98030289ea44"},d=o("fQ3Fn"),c=o("f8GeO"),u=o("b6Bjj");if(o("4S0r6"),localStorage.getItem("genres")||getAllgenres(),localStorage.getItem("userEmail")){document.querySelector("#logout").addEventListener("click",(()=>{localStorage.removeItem("userEmail"),localStorage.removeItem("uid"),document.location.reload()}))}else location.href="./index.html";l.teamModalService.eventListenerCreator();const s=document.querySelector(".movies-popular-list"),f=document.querySelector("#watched"),p=document.querySelector("#queue");f.addEventListener("change",(function(){g(m,"watched")})),p.addEventListener("change",(function(){g(m,"queue")}));let m=localStorage.getItem("uid");function g(e,t){const a=(0,n.initializeApp)(i),o=(0,d.getDatabase)(a),r=(0,d.query)((0,d.ref)(o,"films/"+e+"/"+t));(0,d.onValue)(r,(e=>{const t=Object.values(e.val());s.innerHTML=(0,c.default)(t)}))}localStorage.getItem("uid")&&(0,r.setDataToLocalStorage)(m),m?g(m,"watched"):s.innerHTML="<p> В списке пока еще нет фильмов</p>",(0,u.default)();
//# sourceMappingURL=library.13d302ee.js.map
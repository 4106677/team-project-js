var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},o=e.parcelRequired7e4;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in a){var o=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},e.parcelRequired7e4=o),o("1yx98"),o("kwMPQ");var n=o("4CfrK"),r=o("25RCP");var i={apiKey:"AIzaSyD8Xe_Nj5r_CTsQ1IiUWTLdW_hWsbx85Eg",authDomain:"filmoteka-6051d.firebaseapp.com",databaseURL:"https://filmoteka-6051d-default-rtdb.europe-west1.firebasedatabase.app",projectId:"filmoteka-6051d",storageBucket:"filmoteka-6051d.appspot.com",messagingSenderId:"7192088333",appId:"1:7192088333:web:7a18c384db98030289ea44"},d=o("fQ3Fn"),l=o("f8GeO");n.teamModalService.eventListenerCreator();const s=document.querySelector(".movies-popular-list"),u=document.querySelector("#watched"),c=document.querySelector("#queue");u.addEventListener("change",(function(){p(f,"watched")})),c.addEventListener("change",(function(){p(f,"queue")}));let f=localStorage.getItem("uid");function p(e,t){const a=(0,r.initializeApp)(i),o=(0,d.getDatabase)(a),n=(0,d.query)((0,d.ref)(o,"films/"+e+"/"+t));console.log(n),(0,d.onValue)(n,(e=>{const t=Object.values(e.val());s.innerHTML=(0,l.default)(t)}))}f?p(f,"watched"):s.innerHTML="<p> В списке пока еще нет фильмов</p>",console.dir(u);
//# sourceMappingURL=library.ddc6cb6a.js.map

!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=e.parcelRequired7e4;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var r=a[e];delete a[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){a[e]=t},e.parcelRequired7e4=r),r("cDXQO");var o=r("6HAUt");r("389cz");var n=r("a9oGP"),i=r("6Urw1"),d={apiKey:"AIzaSyD8Xe_Nj5r_CTsQ1IiUWTLdW_hWsbx85Eg",authDomain:"filmoteka-6051d.firebaseapp.com",databaseURL:"https://filmoteka-6051d-default-rtdb.europe-west1.firebasedatabase.app",projectId:"filmoteka-6051d",storageBucket:"filmoteka-6051d.appspot.com",messagingSenderId:"7192088333",appId:"1:7192088333:web:7a18c384db98030289ea44"},l=r("6Nu6u"),u=r("gRtPP"),c=r("cALHK");r("9VC5X"),localStorage.getItem("genres")||getAllgenres(),n.teamModalService.eventListenerCreator();var s=document.querySelector(".movies-popular-list"),f=document.querySelector("#watched"),p=document.querySelector("#queue");f.addEventListener("change",(function(){m(g,"watched")})),p.addEventListener("change",(function(){m(g,"queue")}));var g=localStorage.getItem("uid");function m(e,t){var a=(0,i.initializeApp)(d),r=(0,l.getDatabase)(a),o=(0,l.query)((0,l.ref)(r,"films/"+e+"/"+t));(0,l.onValue)(o,(function(e){var t=Object.values(e.val());s.innerHTML=(0,u.default)(t)}))}localStorage.getItem("uid")&&(0,o.setDataToLocalStorage)(g),g?m(g,"watched"):s.innerHTML="<p> В списке пока еще нет фильмов</p>",(0,c.default)()}();
//# sourceMappingURL=library.eddabe36.js.map

(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const i=document.querySelector(".top-banner form"),a=document.querySelector(".top-banner input"),f=document.querySelector(".tarjeta-section .cities"),p="f307a515194902e4f177a9cff13e799d";i.addEventListener("submit",l);function l(n){n.preventDefault();const t=document.querySelector(".top-banner form input").value;if(t===""){u("Por favor esribe una ciudad correcta..."),a.focus();return}m(t)}function u(n){const t=document.createElement("p");t.textContent=n,document.querySelector(".top-banner form .msg").appendChild(t),setTimeout(()=>{t.remove()},3e3),i.reset(),a.focus()}function m(n){const t=`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=${p}&units=metric`;fetch(t).then(o=>o.json()).then(o=>{if(o.cod==="404"){u("Ciudad no encontrada...😩"),i.reset(),a.focus();return}y(o)})}function y(n){const{main:t,name:o,sys:s,weather:e}=n,r=`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${e[0].icon}.svg`,c=document.createElement("li");c.classList.add("city");const d=`
        <h2 class="city-name" data-name="${o},${s.country}">
          <span>${o}</span>
          <sup>${s.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(t.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${r}" alt="${e[0].description}">
          <figcaption>${e[0].description}</figcaption>
        </figure>
      `;c.innerHTML=d,f.appendChild(c),i.reset(),a.focus()}

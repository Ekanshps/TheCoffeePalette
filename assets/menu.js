(() => {
'use strict';
const items = [
 {name:'Four Seasons Pizza',cat:'pizza-pasta',desc:'A veggie-packed pizza with colourful peppers, mushroom and baby corn.',tag:'Popular pick',tone:'orange',icon:'utensils',search:'four seasons veg pizza pizza pasta',veggie:true},
 {name:'Paneer Tikka Pizza',cat:'pizza-pasta',desc:'Roasted paneer on a pizza base. Ask about size and available toppings.',tag:'Vegetarian',tone:'',icon:'utensils',search:'paneer tikka pizza veg cheese',veggie:true},
 {name:'Margherita Pizza',cat:'pizza-pasta',desc:'A classic cheese-and-tomato choice from the publicly listed menu.',tag:'Classic',tone:'',icon:'utensils',search:'margherita pizza veg tomato cheese',veggie:true},
 {name:'Veg Lasagna',cat:'pizza-pasta',desc:'A comforting baked pasta option mentioned in guest reviews.',tag:'Guest mention',tone:'orange',icon:'utensils',search:'veg lasagna pasta',veggie:true},
 {name:'Pink Sauce Pasta',cat:'pizza-pasta',desc:'A creamy tomato-style pasta option. Confirm available variations with the café.',tag:'Pasta pick',tone:'',icon:'utensils',search:'pink sauce pasta veg non veg',veggie:null},
 {name:'White Sauce Pasta',cat:'pizza-pasta',desc:'A familiar creamy pasta choice for a relaxed café meal.',tag:'Pasta pick',tone:'',icon:'utensils',search:'white sauce pasta veg non veg',veggie:null},
 {name:'Paneer Chilli',cat:'chinese',desc:'A popular Indo-Chinese option for sharing around the table.',tag:'Vegetarian',tone:'',icon:'utensils',search:'chilli paneer chinese starter veg',veggie:true},
 {name:'Honey Chilli Potato',cat:'chinese',desc:'A sweet-and-spicy snack listed among the café’s Chinese starters.',tag:'Snackable',tone:'orange',icon:'utensils',search:'honey chilli potato chinese veg',veggie:true},
 {name:'Veg Manchurian',cat:'chinese',desc:'A familiar Indo-Chinese favourite. Ask about dry or gravy options.',tag:'Vegetarian',tone:'',icon:'utensils',search:'veg manchurian chinese veg',veggie:true},
 {name:'Chicken Chilli Garlic Noodles',cat:'chinese',desc:'A savoury noodle dish from the public menu listing.',tag:'Non-veg',tone:'orange',icon:'utensils',search:'chicken chilli garlic noodles chinese',veggie:false},
 {name:'American Corn Chilli',cat:'snacks',desc:'A corn-based snack noted among items guests recommend trying.',tag:'Guest mention',tone:'',icon:'sparkles',search:'american corn chilli snacks starter veg',veggie:true},
 {name:'Veg Cheese Burger',cat:'snacks',desc:'A simple, satisfying burger option listed on the menu.',tag:'Vegetarian',tone:'',icon:'utensils',search:'veg cheese burger burger sandwich snacks',veggie:true},
 {name:'Veg Momos',cat:'snacks',desc:'A shareable snack option. Check the currently available fillings and styles.',tag:'Vegetarian option',tone:'',icon:'utensils',search:'veg momos dumpling snacks',veggie:true},
 {name:'Cold Coffee',cat:'beverages',desc:'A guest-mentioned pick for an easy coffee break.',tag:'Guest mention',tone:'orange',icon:'coffee',search:'cold coffee iced coffee beverage',veggie:true},
 {name:'Green Apple Mocktail',cat:'beverages',desc:'A refreshing mocktail mentioned in public customer reviews.',tag:'Cool & fresh',tone:'',icon:'coffee',search:'green apple mocktail beverage drinks',veggie:true},
 {name:'Grilled Basil Chicken',cat:'snacks',desc:'A grilled chicken dish listed among the café’s chef specials.',tag:'Non-veg',tone:'orange',icon:'utensils',search:'grilled basil chicken starter chef special',veggie:false},
 {name:'Golden Crispy Prawns',cat:'snacks',desc:'A crispy seafood dish listed among the café’s chef specials.',tag:'Non-veg',tone:'orange',icon:'utensils',search:'golden crispy prawns seafood snack',veggie:false},
 {name:'Ask about today’s desserts',cat:'desserts',desc:'Dessert options can change. Ask the café what is available today.',tag:'Availability varies',tone:'',icon:'sparkles',search:'dessert sweet brownie cake',veggie:null}
];
const icons = {
  'utensils':'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7a4 4 0 0 0 4 4h1V2M6 2v20M20 2v20M20 2c-4 2-5 6-5 10h5"/></svg>',
  'coffee':'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z"/><path d="M17 10h2a2 2 0 0 1 0 4h-2M7 3l1 2M12 3l1 2"/></svg>',
  'sparkles':'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/></svg>'
};
const $ = s => document.querySelector(s); const grid=$('#menu-grid'); const search=$('#menu-search'); const filters=[...document.querySelectorAll('[data-filter]')];
const selected=new Set(); let active='all';
function render(){ const q=(search.value||'').trim().toLowerCase(); const visible=items.filter(item=>(active==='all'||item.cat===active)&&(!q||(item.name+' '+item.desc+' '+item.search).toLowerCase().includes(q))); $('#menu-count').textContent=`Showing ${visible.length} ${visible.length===1?'pick':'picks'}`;
  if(!visible.length){grid.innerHTML='<div class="menu-empty"><strong>No match just yet.</strong>Try another dish or switch to a different category.</div>';return;}
  grid.innerHTML=visible.map(item=>{const chosen=selected.has(item.name);return `<article class="menu-item"><div class="menu-item-top"><span class="menu-art">${icons[item.icon]||icons.utensils}</span><span class="menu-tag ${item.tone}">${item.tag}</span></div><h3>${item.name}</h3><p>${item.desc}</p><div class="menu-item-bottom"><span>${item.veggie===true?'Veg option':item.veggie===false?'Non-veg':'Ask about options'} · Price on enquiry</span><button class="add-pick" type="button" data-pick="${encodeURIComponent(item.name)}" aria-pressed="${chosen}">${chosen?'✓ Added':'＋ Add to my picks'}</button></div></article>`}).join('');
  grid.querySelectorAll('[data-pick]').forEach(btn=>btn.addEventListener('click',()=>{const name=decodeURIComponent(btn.dataset.pick);if(selected.has(name))selected.delete(name);else selected.add(name);render();updateBar();}));
}
function updateBar(){const bar=$('#pick-bar');$('#pick-count').textContent=String(selected.size);bar.classList.toggle('visible',selected.size>0);bar.setAttribute('aria-hidden',String(selected.size===0));}
filters.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filter;filters.forEach(f=>{const is=f===btn;f.classList.toggle('active',is);f.setAttribute('aria-pressed',String(is));});render();}));
search.addEventListener('input',render);
$('#clear-picks').addEventListener('click',()=>{selected.clear();render();updateBar();});
$('#ask-picks').addEventListener('click',()=>{const number=document.body.dataset.whatsapp||'918090753057';const lines=['Hello The Coffee Palette! I am planning a visit and wanted to ask about these menu picks:',...Array.from(selected).map(n=>'• '+n),'Could you please confirm current availability, options and prices?'];window.open('https://wa.me/'+number+'?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener,noreferrer');});
const params=new URLSearchParams(window.location.search);if(params.has('category')){const desired=params.get('category');const btn=filters.find(b=>b.dataset.filter===desired);if(btn){active=desired;filters.forEach(f=>{const is=f===btn;f.classList.toggle('active',is);f.setAttribute('aria-pressed',String(is));});}}render();updateBar();
})();

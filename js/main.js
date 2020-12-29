const meals = document.getElementById('meals');
const favouriteContaner = document.getElementById('fav-meals');
const mobileContainer = document.getElementById('mobile-container');
const searchBtn = document.getElementById('searchBtn');
const inputvalue = document.getElementById('search');
const SEARCHAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

getRandomMeal();
fetchFavMeals();

async function getRandomMeal(){
   const resp = await  fetch('https://www.themealdb.com/api/json/v1/1/random.php');
   const respData = await resp.json();
   const randomMeal = respData.meals[0];
   console.log(randomMeal);
   addMeal(randomMeal, true);
}
async function getMealById(id){
   const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
   const respData = await resp.json();
   const randomMeal = respData.meals[0];
   return randomMeal;
   
}
async function getMealBySearch(term){
   const meals =  await fetch(term);
      const mealsD = await meals.json();
      console.log(mealsD.meals);
      showRecipes(mealsD.meals);
      
}


function showRecipes(mealsData){
   meals.innerHTML = '';
   mealsData.forEach((mealEl) =>{
   const meal = document.createElement('div');
   document.body.style.background = `url('${mealEl.strMealThumb}') no-repeat center center/cover`;
   meal.classList.add('meal');
   meal.innerHTML = `
            <div class="meal-header">
           
                
                <img src='${mealEl.strMealThumb}' alt="${mealEl.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealEl.strMeal}</h4>
                <a class="youtube-link" href="${mealEl.strYoutube}" >Click to watch on Youtube</a>
                <button class="fa-btn" ><i class="fa fa-heart"></i></button>
            
           </div>
   `;
   meal.querySelector('.meal-body .fa-btn').addEventListener('click', (e) =>{
      if(e.target.classList.contains('active')){
         removeMealFromLS(mealEl.idMeal);
        e.target.classList.remove('active');
      }
      else{
         addMealToLS(mealEl.idMeal);
        e.target.classList.add('active');
      }
      favouriteContaner.innerHTML = '';
      fetchFavMeals();
   });
   meals.appendChild(meal);
});
};
function addMeal(mealData, random = false){
   const meal = document.createElement('div');
   document.body.style.background = `url('${mealData.strMealThumb}') no-repeat center center/cover`;
   meal.classList.add('meal');
   meal.innerHTML = `
            <div class="meal-header">
            ${random ? `<span class="random">
            Random Recipe
        </span>` : ''}
                
                <img src='${mealData.strMealThumb}' alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                
                <a class="youtube-link" href="${mealData.strYoutube}" >Click to watch on Youtube</a>
                <button class="fa-btn" ><i class="fa fa-heart"></i></button>
            
           </div>
   `;
   meal.querySelector('.meal-body .fa-btn').addEventListener('click', (e) =>{
      if(e.target.classList.contains('active')){
         removeMealFromLS(mealData.idMeal);
        e.target.classList.remove('active');
      }
      else{
         addMealToLS(mealData.idMeal);
        e.target.classList.add('active');
      }
      favouriteContaner.innerHTML = '';
      fetchFavMeals();
   });
   meals.appendChild(meal);
}


function addMealToLS(mealId){
   const mealIds = getMealFromLS();
   localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}


function removeMealFromLS(mealId){

   const mealIds = getMealFromLS();
   localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !==  mealId)));
}


function getMealFromLS(){
const mealIds = JSON.parse(localStorage.getItem('mealIds'));
return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals(){
const mealIds = getMealFromLS();
const meals = [];
for(let i = 0; i<mealIds.length; i++){
   const mealId = mealIds[i];
  meal = await getMealById(mealId);
  addMealToFav(meal);
}
}

function addMealToFav(mealData){
   const favMeal = document.createElement('li');
   
   favMeal.innerHTML = `
  
   <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
   <span>${mealData.strMeal}</span>

   `;
   
   favouriteContaner.appendChild(favMeal);
}
searchBtn.addEventListener('click', (e) =>{
   const inputvalue = document.getElementById('search');
   const inputTerm = inputvalue.value;
   e.preventDefault();
   if(inputTerm){
      const apinew = SEARCHAPI + inputTerm;
      getMealBySearch(apinew);
      
      inputvalue.value='';
   }
});
// fetchFavMeals();
// async function getRandomMeal(){
//   const resp = await  fetch('https://www.themealdb.com/api/json/v1/1/random.php');
//   const respData = await resp.json();
//   const randomMeal = await respData.meals[0];
// //   console.log(randomMeal);
//   addMeal(randomMeal, true);
// }
// getRandomMeal();
// async function getMealById(id){

//    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
//       const respData = await resp.json();
//       const randomMeal = respData.meals[0];
//       return meal;

// }
// async function getMealBySearch(term){
//    const meals =  await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
// }


// function addMeal(mealData, random = false) {
//     const meal = document.createElement('div');
//     meal.classList.add('meal');
//    meal.innerHTML = `
           
//    `
//    meals.appendChild(meal);


//       meal.querySelector('.meal-body .fa-btn').addEventListener('click', (e)=>{
//          if(e.target.classList.contains('active')){
//             removeMealFromJS(mealData.idMeal);
//             btn.classList.remove('active');
//          }
//          else{
//             addMealToJS(mealData.idMeal);
//             btn.classList.add('active');
//          }
//             e.target.classList.toggle("active");
//       })

// }
// addMeal();

// function addMealToLS(mealId){
//    const mealsIds = getMealsFromLS();
//    localStorage.setItem('mealIds', JSON.stringify([...mealsIds, mealId]));
// }
// function removeMealFromJS(mealId){
//    const mealIds = getMealsFromLS();
//    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
// }
// function getMealsFromLS(){
//    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
//    return mealIds;
// }

// async function fetchFavMeals() {
//    const mealIds = getMealsFromLS();
//    const meals =[];
//    for(let i = 0; i< mealIds.length; i++){
//       const mealId = mealIds[i];
    
//         meal = await getMealById(mealId);
//         meals.push(meal);
//         addMealToFav(meals);
//    }
// }
// function addMealToFav(mealData) {
//    const FavMeal = document.createElement('li');
  
//   FavMeal.innerHTML = `
//   <img src="${mealData.strMealThumb}" alt=""><span>${mealData.strMeal}</span>
//   `
//  favoriteContainer.appendChild(FavMeal);


  
// }
// addMealToFav();
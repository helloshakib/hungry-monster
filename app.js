// Search Button Handler

document.getElementById('search-btn').addEventListener('click', function(){
    const foodName = document.getElementById('input-food').value;
    if(foodName == ""){
        alert('Please Enter Your Favourite Food Name!');
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(res => res.json())
    .then(data =>{
        displayMeals(data.meals);
    })
    .catch(error => {
        const displayFoods = document.getElementById('display-foods');
        displayFoods.innerHTML = "";
        document.getElementById('display-meal-details').innerHTML = ' ';
        const notFoundFood = document.getElementById('notFound-error');
        const notFound = document.createElement('h2')
        notFound.innerHTML = `Sorry! This item is not available...Please Try again!`;
        notFoundFood.appendChild(notFound);
    })



    document.getElementById('input-food').value = "";
    }
    
})

// Display Search Item
const displayMeals = data =>{
    const displayFoods = document.getElementById('display-foods');
    displayFoods.innerHTML = "";
    document.getElementById('display-meal-details').innerHTML =" ";
    document.getElementById('notFound-error').innerHTML =" ";
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'single-item';
        itemDiv.innerHTML = `
            <div onclick="displayFoodDetails('${item.idMeal}')">
                <img src="${item.strMealThumb}">
                <h2 class="item-title">${item.strMeal}</h2>
            </div>
        `;
        displayFoods.appendChild(itemDiv);
    });  
}

// API Load Food Details
const displayFoodDetails = itemID =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemID}`
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        renderFoodDetail(data.meals[0]);
    })
}

// Display Food Details
const renderFoodDetail = meal =>{
    const displayMealDetails = document.getElementById('display-meal-details');
    const ingredients =[]; // ingredient handle
    for (let i = 1; i < 20; i++) {
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);     
        }
        else{
            break;
        }
    }
    displayMealDetails.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h2 class="meal-title">${meal.strMeal}</h2>
        <h3 class="ingr">Ingredient</h3>
        <ul>
            ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
        </ul>
    `;
    displayMealDetails.scrollIntoView(); // visible in the browser window
}
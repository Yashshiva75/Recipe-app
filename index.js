const searchbx = document.querySelector('.searchbox')
const btn = document.querySelector('.btn')
const recipecont = document.querySelector('.recipe')
const recipeDetail = document.querySelector('.recipe-detail-content');
const recipeContent = document.querySelector('.recipe-detail')
const recipecloseBtn = document.querySelector('.recipe-close-Btn')

const fetchrecipe = async(query) => {
    recipecont.innerHTML = "<h2>Fetching recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipecont.innerHTML = "";
    response.meals.forEach(elem => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipecrd');
        recipediv.innerHTML = `<img src='${elem.strMealThumb}'>
        <h3>${elem.strMeal}</h3>
        <h3><span>${elem.strArea}</span>Dish</h3>
        <h3>Belongs to this <span>${elem.strCategory}</span></h3>`
        recipecont.appendChild(recipediv);

        const button = document.createElement('button');
        button.textContent = "View recipe";
        recipediv.appendChild(button)

        button.addEventListener('click', () => {
            openRecipePopup(elem);
        })
        recipecont.appendChild(recipediv)
    });
}
const fetchingingreidient = (elem) => {
    let Ingredientlist = "";
    for (let i = 1; i <= 20; i++) {
        const Ingredient = elem[`strIngredient${i}`];
        if (Ingredient) {
            const measure = elem[`strMeasure${i}`];
            Ingredientlist += `<li>${measure} ${Ingredient}</li>`
        } else {
            break;
        }

    }
    return Ingredientlist;
}
const openRecipePopup = (elem) => {
    recipeDetail.innerHTML = `<h2 class="recipeName">${elem.strMeal}</h2>
    <h3 class="ing">Ingredients:</h3>
    <ul class="ingridientlist">${fetchingingreidient(elem)}</ul>
    <div><h3>Instruction</h3>
    <p class="recipeinstruction">${elem.strInstructions}</p>
    </div>`
    recipeDetail.parentElement.style.display = "block";
}

recipecloseBtn.addEventListener("click", () => {
    recipeDetail.parentElement.style.display = 'none'
})

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbx.value.trim();
    fetchrecipe(searchinput);
})
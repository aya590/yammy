/// <reference types="../@types/jquery" />

const datacontainer = document.querySelector(".datacontainer") ;
const searchccontainer = document.querySelector(".searchccontainer");
const contactcontainer = document.querySelector(".contactcontainer");
const searchInput = document.getElementById("#searchInput");

const linkswidth =$(".links").outerWidth();

$(".sidebar").animate({left: `-${linkswidth}px`});

let linksstatue = false;

$(".open").on("click", function () {
   
    if(linksstatue===false ){
        $(".sidebar").animate({left: `0px`});
        $(".open").removeClass("fa-bars ").addClass("fa-xmark");
        $(".links ul").slideDown(200, function () {
            $(".links ul li").each(function (index) {
                $(this)
                    .css({ position: 'relative', bottom: '-20px', opacity: 0 }) 
                    .delay(index *150) 
                    .animate({ bottom: '0px', opacity: 1 }, 250); 
            });
        });
        linksstatue = true;
         
    }else{
        $(".sidebar").animate({left: `-${linkswidth}px`});
        $(".open").removeClass(" fa-xmark").addClass("fa-bars");
        $(".links ul").slideUp(200, function () {
            $(".links ul li").css({ bottom: '-20px', opacity: 0 }); 
        });
        linksstatue = false;
    }
 
});


// &home
async function getdata(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let data = await response.json()
    console.log(data) ;
    displaydata ( data.meals);

}
getdata()

function displaydata(arr){
    datacontainer.innerHTML = '';
    for (let i=0 ;i < arr.length; i++ ){
        datacontainer.innerHTML += ` 
        <div  class=" col-md-3 ">
<div class="meal position-relative"onclick="categoridmeals('${arr[i].idMeal}')">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="">
  <div class="layer ps-3 pt-5 fs-4 fw-bold">
    <p class="pt-5">${arr[i].strMeal}</p>
</div>
</div>
 </div>
        `
    }
}




// &search
$("#Search").on("click",function(){
    datacontainer.innerHTML = "";
    contactcontainer.innerHTML="";
    searchccontainer.innerHTML= `
    <form class=" pt-5">
                <div class="row   ">
                    <div class="col-md-6">
                        <input onkeyup="Searchbyname(this.value)" id="searchInput" placeholder="Search By Name" class="form-control bg-transparent  text-white" type="text"/> 
                    </div>
                    
                    <div class="col-md-6">
                        <input onkeyup="Searchbyfirstletter(this.value)"  placeholder="Search by first letter name" class="form-control bg-transparent text-white " type="text"/> 
                    </div>
                </div>
            </form> `

            $(".sidebar").animate({left: `-${linkswidth}px`});
            $(".open").removeClass(" fa-xmark").addClass("fa-bars");
})

// &Search by name
async function Searchbyname(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
   response = await response.json();
console.log(response)
displaydata ( response.meals);
}

// &Search by first letter name
async function Searchbyfirstletter(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
   response = await response.json();
console.log(response)
displaydata ( response.meals);
}
// &Categories
$("#Categories").on("click", async function () {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response = await response.json();
    console.log(response.categories); // 'categories' should be lowercase
    displayCategories(response.categories); // update here as well

    $(".sidebar").animate({left: `-${linkswidth}px`});
    $(".open").removeClass(" fa-xmark").addClass("fa-bars");
});

function displayCategories(arr) {
    datacontainer.innerHTML = ""; 
    searchccontainer.innerHTML="";
    for (let i = 0; i < arr.length; i++) {
        datacontainer.innerHTML += `
            <div class="col-md-3">
                <div   onclick="categormeals('${arr[i].strCategory}')"  class="meal   text-black position-relative">
                    <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
                    <div class="layer ps-3   ">
                        <h3 class="">${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `;
    } 
}

// &Categories meals
async function categormeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
   response = await response.json();

    
    displayMeals(response.meals)  
}

// Function to display meals
function displayMeals(arr) {
    datacontainer.innerHTML = "";
    searchccontainer.innerHTML = "";

    for (let i = 0; i <20 && i < arr.length; i++) {
        datacontainer.innerHTML += `
            <div class="col-md-3">
                <div  onclick="categoridmeals('${arr[i].idMeal}')" class="meal text-black position-relative text-center">
                    <img src="${arr[i].strMealThumb}" class="w-100" alt="">
                    <div class="layer ps-3">
                        <h3 class= "fs-4 mt-2">${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
}

// &Categories meals id
async function categoridmeals(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   response = await response.json();
    console.log(response);
    displayid(response.meals)
}


function displayid(arr) {
    datacontainer.innerHTML = "";
    searchccontainer.innerHTML = "";

    for (let i = 0; i <20 && i < arr.length; i++) {
        datacontainer.innerHTML += `
        <div class="col-md-4">
        <div class="img-idmeal">
            <img class="w-100" src="${arr[i].strMealThumb}" alt="">
        </div>
        <h2 class="text-white">${arr[i].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <div class="text-idmeal text-white">
       <h2>Instructions</h2>
       <p>${arr[i].strInstructions}</p>
        </div>
        <h3 class="text-white">Area : ${arr[i].strArea}</h3>
        <h3 class="text-white">Category : ${arr[i].strCategory}</h3>
        <h3 class="text-white">Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure1}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure2}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure3}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure4}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure5}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure6}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure7}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure8}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure9}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure10}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure11}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure12}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure13}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure14}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure15}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure16}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure17}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure18}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure19}</li>
            <li class="alert alert-info m-2 p-1">${arr[i].strMeasure20}</li>
        </ul>
        <h3 class="text-white">Tags :</h3>
        <a target="_blank" href="${arr[i].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="https://www.youtube.com/watch?v=9ytR28QK6I8" class="btn btn-danger">Youtube</a>
    </div>
 `;     
    }
}


//& Area

$("#Area").on("click", async function () {

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response = await response.json();
    console.log(response.meals); // 'categories' should be lowercase
    displayarea(response.meals); // update here as well
    $(".sidebar").animate({left: `-${linkswidth}px`});
    $(".open").removeClass(" fa-xmark").addClass("fa-bars");
});

function displayarea(arr) {
    datacontainer.innerHTML = "";
    searchccontainer.innerHTML="";
    for (let i = 0; i < arr.length; i++) {
        datacontainer.innerHTML += `
            <div class="col-md-3">
                <div  onclick="areameals('${arr[i].strArea}')" class="meal  text-white position-relative">
                <i class="fa-solid fa-house-laptop"></i>
                <h3 class="">${arr[i].strArea}</h3>
                </div>
               
            </div>
        `;
    }
}
 //& Area meals &id
 async function areameals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`);
   response = await response.json();
    displayMeals(response.meals)  
}


//& Ingredients

$("#Ingredients").on("click", async function () {
    
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        response = await response.json();
        console.log(response.meals); // 'categories' should be lowercase
        displayIngredients(response.meals); 
      
        $(".sidebar").animate({left: `-${linkswidth}px`});
        $(".open").removeClass(" fa-xmark").addClass("fa-bars");
    });
    
    function displayIngredients(arr) {
        datacontainer.innerHTML = ""; 
        searchccontainer.innerHTML="";
        for (let i = 0; i <20 && i < arr.length; i++) {
            const description = (arr[i].strDescription || "").split(" ").slice(0, 20).join(" ");
            datacontainer.innerHTML += `
                <div class="col-md-3 text-center">
                    <div  onclick="Ingredientsameals('${arr[i].strIngredient}')" class="meal  text-white position-relative">
                    <i class="fa-solid Ingredients fa-drumstick-bite fa-4x"></i>
                    <h3 class="">${arr[i].strIngredient}</h3>
                    <p> ${description}...</p>
                    </div>
                   
                </div>
            `;
        }
    }
    //& Ingredients meals &id
    async function Ingredientsameals(category) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`);
       response = await response.json();
        displayMeals(response.meals)  
    }
    //  & contact


    $("#Contact").on("click", function () {
        datacontainer.innerHTML = "";
        searchccontainer.innerHTML="";
        contactcontainer.innerHTML = `
            <form id="contactForm">
                <div class="row gy-4 ">
                    <div class="col-md-6">
                        <input id="name" placeholder="Enter Your Name" class="form-control bg-white text-black" type="text" required/>
                        <small class="text-danger"></small>
                        </div>
                    <div class="col-md-6">
                        <input id="email" placeholder="Enter Your Email" class="form-control bg-white text-black" type="email" required/>
                    </div>
                    <div class="col-md-6">
                        <input id="phone" placeholder="Enter Your Phone" class="form-control bg-white text-black" type="number" required/>
                    </div>
                    <div class="col-md-6">
                        <input id="age" placeholder="Enter Your Age" class="form-control bg-white text-black" type="number" required/>
                    </div>
                    <div class="col-md-6">
                        <input id="password" placeholder="Enter Your Password" class="form-control bg-white text-black" type="password" required/>
                    </div>
                    <div class="col-md-6">
                        <input id="repassword" placeholder="Enter Your Repassword" class="form-control bg-white text-black" type="password" required/>
                    </div>
                </div>
                <button id="submitBtn" class="btn mt-3 btn-outline-danger" type="button">Submit</button>
            </form>
        `;
        $(".sidebar").animate({ left: `-${linkswidth}px` });
        $(".open").removeClass(" fa-xmark").addClass("fa-bars");
    })
       
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submitButton");
    const form = document.getElementById("contactForm");

    const fields = {
        name: { input: document.getElementById("name"), regex: /^[A-Za-z\s]+$/, errorMsg: "Special characters and numbers are not allowed." },
        email: { input: document.getElementById("email"), regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMsg: "Email not valid *example@yyy.zzz" },
        phone: { input: document.getElementById("phone"), regex: /^\d{10,15}$/, errorMsg: "Enter a valid phone number." },
        age: { input: document.getElementById("age"), regex: /^(1[89]|[2-9]\d)$/, errorMsg: "Enter a valid age." },
        password: { input: document.getElementById("password"), regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, errorMsg: "Minimum eight characters, at least one letter and one number." },
        repassword: { input: document.getElementById("repassword"), errorMsg: "Passwords do not match." }
    };

    function validateField(field, value) {
        if (field.regex) {
            return field.regex.test(value);
        } else if (field.input.id === "repassword") {
            return value === fields.password.input.value;
        }
        return true;
    }

    function updateValidation() {
        let allValid = true;
        
        for (const key in fields) {
            const field = fields[key];
            const value = field.input.value;
            const isValid = validateField(field, value);
            const errorElement = field.input.nextElementSibling;

            if (!isValid) {
                errorElement.textContent = field.errorMsg;
                allValid = false;
            } else {
                errorElement.textContent = "";
            }
        }

        // Enable submit button only if all fields are valid
        submitButton.disabled = !allValid;
    }

    // Add input event listener to each field
    Object.values(fields).forEach(field => {
        field.input.addEventListener("input", updateValidation);
    });
});

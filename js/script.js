/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*   search bar   */


const searchBar = document.createElement('div');
searchBar.innerHTML = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button" id="search-btn"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

document.querySelector("header").append(searchBar);

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");


const handleSearch =  () => {
   let searchValue = searchInput.value.toLowerCase();
   const newData = [];
   for (i = 0; i < data.length; i++) {
      const fullName = `${data[i].name.first} ${data[i].name.last}`.toLowerCase();
      if (fullName.includes(searchValue)) {
         newData.push(data[i]);
      }
   }
   showPage(newData, 1);
   addPagination(newData);
}

/*  showPage function  */

const showPage = (list, page) => {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   const ul = document.querySelector('.student-list');
   ul.innerHTML = "";

   for (i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const li = document.createElement("li");
         li.innerHTML = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`;

         ul.insertAdjacentHTML("beforeend", li.innerHTML)
      }
   }
}


/*   addPagination function   */


const linkList = document.querySelector(".link-list");

const addPagination = (list) => {
   const neededBtns = Math.ceil(list.length / 9);
   
   linkList.innerHTML = "";

   for (i = 1; i <= neededBtns; i++) {
      const li = document.createElement("li");
      li.innerHTML = `
         <li>
            <button type="button" id="btn-${i}">${i}</button>
         </li>`;
      linkList.insertAdjacentHTML("beforeend", li.innerHTML);
   }

   document.querySelector("#btn-1").classList.add("active");
    
}

/*   eventListeners   */


linkList.addEventListener('click', e => {
   if (e.target.type === "button") {
      document.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");

      showPage(data, e.target.textContent);
   }

})


searchInput.addEventListener("keyup", () => {
   handleSearch();
});

searchBtn.addEventListener("click", () => {
   handleSearch();
   console.log('ciao')
});


// Call functions


showPage(data, 1);
addPagination(data);
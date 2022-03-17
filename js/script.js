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


/*   declarations   */

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector(".link-list");


/*    search functionality    */


let newData = [];                    // new array to hold search results

const handleNoResults = () => {

   const noResults = document.createElement("li");
   noResults.innerHTML = "<li><h3 class='no-results'>No results found</h3></li>";
   
   while (studentList.firstChild) {                            // deletes every child in the stusent-list section
      studentList.removeChild(studentList.firstChild);
   }

   while (linkList.firstChild) {                               // deletes every child in the link-list section
      linkList.removeChild(linkList.firstChild);
   }

   studentList.insertAdjacentHTML("beforeend", noResults.innerHTML);       // append the noResults content
   
}

const handleSearch =  () => {

   newData = [];                                                   //  reset array on every search
   let searchValue = searchInput.value.toLowerCase();

   for (let i = 0; i < data.length; i++) {
      const fullName = `${data[i].name.first} ${data[i].name.last}`.toLowerCase();
      if (fullName.includes(searchValue)) {
         newData.push(data[i]);                             // pushes every match found in the newData array
      }
   }

   if (newData.length === 0) {
      handleNoResults();
   } else {
      showPage(newData, 1);                        
      addPagination(newData);
   }
}

/*  showPage function  */


const showPage = (list, page) => {                          

   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   studentList.innerHTML = "";

   for (i = 0; i < list.length; i++) {                                     // creates li for every element in the given array
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

         studentList.insertAdjacentHTML("beforeend", li.innerHTML)
      }
   }
}


/*   addPagination function   */




const addPagination = (list) => {

   const neededBtns = Math.ceil(list.length / 9);
   
   linkList.innerHTML = "";

   if (neededBtns > 1) {
      for (i = 1; i <= neededBtns; i++) {
         const li = document.createElement("li");                             // creates the pagination buttons
         li.innerHTML = `
            <li>
               <button type="button" id="btn-${i}">${i}</button>
            </li>`;
         linkList.insertAdjacentHTML("beforeend", li.innerHTML);
      }
      document.querySelector("#btn-1").classList.add("active");
   }
}

/*   eventListeners   */


linkList.addEventListener('click', e => {
   if (e.target.type === "button") {
      document.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");
      if (newData.length === 0) {
         showPage(data, e.target.textContent);
      } else {
         showPage(newData, e.target.textContent);
      }
   }
})


searchInput.addEventListener("keyup", () => {               
   handleSearch();
})

searchBtn.addEventListener("click", () => {
   handleSearch();
})


// Call functions


showPage(data, 1);
addPagination(data);

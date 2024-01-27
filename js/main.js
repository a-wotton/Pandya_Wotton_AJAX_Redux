(() => {
const baseUrl = `https://swapi.dev/api/`;
const characters = [];
const characterList = document.querySelector("#character-con");
const spinner = document.querySelector("#spinner");

function getpage1() {
    fetch(`${baseUrl}people/`)
    .then(response => response.json())
    .then(function(response) {
       //console.log(page1);
       const page1 = response.results;
       characters.push(page1[0], page1[1], page1[2], page1[3], page1[4], page1[9]);
       getpage2();
    })
    .catch(error => {
        console.log(error)
        //send message to user in DOM
    });
}
    getpage1();
    
    function getpage2() {
    fetch(`${baseUrl}people/?page=2`)
    .then(response => response.json())
    .then(function(response) {
       const page2 = response.results;
       console.log(page2);
       characters.push(page2[0], page2[2], page2[3], page2[8]);

const ul = document.createElement("ul");

console.log(characters);
characters.forEach(character => {
console.log(character);
const li = document.createElement("li");
const a = document.createElement("a");
a.textContent = character.name;
li.appendChild(a);
ul.appendChild(li);
spinner.classList.add("hidden");
})

characterList.appendChild(ul);

    })
    .catch(error => {
        console.log(error)
        //send message to user in DOM
    });
}
})();
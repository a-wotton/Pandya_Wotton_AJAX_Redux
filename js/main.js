(() => {
const baseUrl = `https://swapi.dev/api/`

function getCharacters() {
    fetch(`${baseUrl}people`)
    .then(response => response.json())
    .then(function(response) {
        console.log(response);
    })
    .catch(error => {
        console.log(error)
        //send message to user in DOM
    });
}
getCharacters();


})();
(() => {
    const baseUrl = `https://swapi.dev/api/`;
    const characters = [];
    const characterList = document.querySelector("#character-con");
    const characterDetailsContainer = document.querySelector("#character-details");
    const spinner = document.querySelector("#spinner");

    function getpage1() {
        fetch(`${baseUrl}people/`)
            .then(response => response.json())
            .then(function (response) {
                const page1 = response.results;
                characters.push(...page1);
                displayCharacters();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function displayCharacters() {
        const ul = document.createElement("ul");
        characters.forEach(character => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = character.name;

            a.addEventListener("click", () => {
                displayCharacterDetails(character);
            });

            li.appendChild(a);
            ul.appendChild(li);
        });
        characterList.appendChild(ul);
        spinner.classList.add("hidden");
    }

    function displayCharacterDetails(character) {
        const characterInfoDiv = document.createElement("div");
        characterInfoDiv.classList.add("character-info");

        const nameHeader = document.createElement("h2");
        nameHeader.textContent = character.name;
        characterInfoDiv.appendChild(nameHeader);

        const birthYearParagraph = document.createElement("p");
        birthYearParagraph.textContent = `Birth Year: ${character.birth_year}`;
        characterInfoDiv.appendChild(birthYearParagraph);

        const heightParagraph = document.createElement("p");
        heightParagraph.textContent = `Height: ${character.height} cm`;
        characterInfoDiv.appendChild(heightParagraph);


        
        characterDetailsContainer.innerHTML = "";
        characterDetailsContainer.appendChild(characterInfoDiv);

        const moviesDiv = document.createElement("div");
        moviesDiv.classList.add("movie-details-container");

        character.films.forEach((filmUrl, index) => {
            fetch(filmUrl)
                .then(response => response.json())
                .then(movie => {
                    if (movie.characters.includes(character.url)) {
                        const movieDiv = document.createElement("div");
                        movieDiv.classList.add("movie-details");

                        const titleHeader = document.createElement("h3");
                        titleHeader.textContent = movie.title;
                        movieDiv.appendChild(titleHeader);

                        const episodeImageUrl = `images/episode${movie.episode_id}.jpg`;
                        const episodeImage = document.createElement("img");
                        episodeImage.src = episodeImageUrl;
                        episodeImage.alt = movie.episode_id + " episode image";
                        movieDiv.appendChild(episodeImage);

                        moviesDiv.appendChild(movieDiv);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });

        characterInfoDiv.appendChild(moviesDiv);
        characterDetailsContainer.appendChild(characterInfoDiv);
    }

    getpage1();

    const myText = document.querySelector("#myText");

    const tl = gsap.timeline();
    tl.from(myText, { opacity: 0, duration: 1 });

    tl.to(myText, {
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.out",
        textShadow: "0 0 30px white",
        onStart: function () {
            gsap.to(myText, { duration: 1, textShadow: "0 0 10px white", ease: "power2.out" });
        },
        onComplete: function () {
            gsap.to(myText, { duration: 1, textShadow: "none", ease: "power2.out" });
        },
    });


})();

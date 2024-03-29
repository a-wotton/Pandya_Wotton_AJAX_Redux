(() => {
    gsap.registerPlugin(SplitText, ScrambleTextPlugin);
    const descriptionBox = document.querySelector("#movie-description-box");
    const baseUrl = `https://swapi.dev/api/`;
    const characters = [];
    const characterList = document.querySelector("#character-list");
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

            li.addEventListener("click", function() {
                displayCharacterDetails(character);
            });

            li.appendChild(a);
            ul.appendChild(li);
        });
        characterList.appendChild(ul);
        spinner.classList.add("hidden");
    }

    function displayCharacterDetails(character) {
        descriptionBox.innerHTML = "";
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

                        episodeImage.addEventListener("click", function() {
                            displayMovieDescription(movie);
                        });

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

    
    const myTextHeaders = document.querySelectorAll(".myText");

    myTextHeaders.forEach(header => {
        animateText(header);
        scrambleText(header);
    });

    function scrambleText(element) {
        gsap.to(element, {
            duration: 3,
            scrambleText: { text: element.textContent, chars: "lowercase", revealDelay: 0.09 },
            ease: "power4.out"
        });
    }

    function animateText(element) {
        const split = new SplitText(element, { type: 'words,chars' });
        gsap.timeline().from(split.words, { duration: 0.01, autoAlpha: 0, stagger: { each: 0.01 } });
        gsap.timeline().from(split.chars, { duration: 0.01, autoAlpha: 0, stagger: { each: 0.01 } });
    }

    
    function displayMovieDescription(movie) {
        descriptionBox.innerHTML = "";

        const titleHeader = document.createElement("h2");
        titleHeader.textContent = movie.title;
        descriptionBox.appendChild(titleHeader);

        const descriptionParagraph = document.createElement("p");
        descriptionParagraph.textContent = movie.opening_crawl;
        descriptionBox.appendChild(descriptionParagraph);

        const tl = animateText(descriptionParagraph);

        descriptionBox.classList.add("active");
        descriptionBox.classList.remove("hidden")

     }

    getpage1();
})();

const list = document.getElementById('lista');

// fetch the filme list
function getFilme() {
    fetch('http://localhost:3000/filme')
        .then(function(response) {
            response.json().then(function (filme) {
                appendFilmeToDom(filme);
            });
        });
};

// post filme
function postFilme(t, a, d, g, n, l, d) {
    // create post object
    const postFilme = {
        nume: t,
        an: a,
        durata: d,
        gen: g,
        nota: n,
        poster: l,
        descriere: d
    }

    // post film
    fetch('http://localhost:3000/filme', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postFilme)
    }).then(function () {
        // Get the new filme list
        getFilme();
        
    });
}


// delete film
function deleteFilm(id) {
    // delete film
    fetch(`http://localhost:3000/filme/${id}`, {
        method: 'DELETE',
    }).then(function() {
        // Get the new filme list
        getFilme();
    });
}


// update film
function updateFilm(ob, val) {
    // create put object
    const putObject = {
        nota: val,
        nume: ob.nume,
        an: ob.an,
        durata: ob.durata,
        gen: ob.gen,
        poster: ob.poster,
        descriere: ob.descriere
    }
    // update film
    fetch(`http://localhost:3000/filme/${ob.id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {

        //Get the new filme list
        getFilme();

    });
}


// Create and append img DOM tag
function appendFilmeToDom(filme) {
    //remove film list if exist
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // create and append tags
    for(let i = 0; i < filme.length; i++) {
        
        // create object
        chenar = document.createElement('div');
        chenar.className = "chenar";

        // create image
        image = document.createElement('img');
        image.src = filme[i].poster;
        image.style.height = "350px";
        image.style.width = "251px";
        image.style.padding = "30px";
        image.style.float = "left";

        // create title
        title = document.createElement('h1');
        title.textContent = filme[i].nume;
        title.style.marginLeft = "330px";
        title.style.color = "#FF0B56";

        // create info
        info = document.createElement('p');
        info.textContent = "An: " + filme[i].an + " | Durata: " + filme[i].durata + " | Gen: " + filme[i].gen;
        info.style.fontSize = "15px";
        info.style.color = "grey"; 
        info.style.marginLeft = "330px";
        info.style.marginTop = "10px";

        // create rating
        rating = document.createElement('h2');
        rating.textContent = "Nota: " + filme[i].nota + "/10";
        rating.style.marginLeft = "330px";

        // create description
        descriere = document.createElement('p');
        descriere.textContent = filme[i].descriere;
        descriere.color = "white";
        descriere.style.marginLeft = "330px";
        descriere.style.paddingRight = "30px";

        // create input for rating
        input = document.createElement('input');
        input.setAttribute("type", "number");
        input.className = "input1";
        input.id = "notaFilm";

        // create button for changing the elements of the list
        buton = document.createElement('button');
        buton.innerText = "OK";
        buton.className = "buton";
        buton.id = "butonNota";

        // add event to OK button
        buton.addEventListener('click', function () {
            var valoare = document.getElementById('notaFilm').value;
            if(valoare >= 5) {

                updateFilm(filme[i], valoare);
            }   
            else {
                deleteFilm(filme[i].id);
            }
        });
     
        // append elements
        chenar.appendChild(image);
        chenar.appendChild(title);
        chenar.appendChild(info);
        chenar.appendChild(rating);
        chenar.appendChild(descriere);
        chenar.appendChild(input);
        chenar.appendChild(buton);

        // append image to DOM (list image)
        list.appendChild(chenar);       

    }
}

// get filme
getFilme();

// get info from input
function adaugare() {
    const titlu1 = document.getElementById('addfilm1').value;
    const an1 = document.getElementById('addfilm2').value;
    const durata1 = document.getElementById('addfilm3').value;
    const gen1 = document.getElementById('addfilm4').value;
    const nota1 = document.getElementById('addfilm5').value;
    const link1 = document.getElementById('addfilm6').value;
    const descriere1 = document.getElementById('addfilm7').value;
    postFilme(titlu1, an1, durata1, gen1, nota1, link1, descriere1);
}
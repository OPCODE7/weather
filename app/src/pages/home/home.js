

const d = document;
const $citiesListComponent = d.querySelector(".cities-list");
const $searcher = d.querySelector(".search-button"), $fragment = d.createDocumentFragment();



d.addEventListener("click", e => {
    if (e.target === $searcher) {
        $citiesListComponent.querySelectorAll("li").forEach(el => $citiesListComponent.removeChild(el));
        let value = d.querySelector("#search").value;
        let cities;
        let regExp = new RegExp("" + value + "", "gi");
        if (value.trim().length > 0) {
            $citiesListComponent.classList.remove("d-none");
            fetch("app/src/utils/city_list.json")
                .then(response => response.json())
                .then(data  => {
                    cities = data.filter(el => regExp.test(el.name));
                    if (cities.length > 0) {
                        cities.forEach(city => {
                            const $li = document.createElement("li"), $a = document.createElement("a");
                            $a.href = "#";
                            $li.append($a);
                            $a.textContent = `${city.name}- ${city.country}`;
                            $fragment.appendChild($li);
                        });
                    } else {
                        const $li = document.createElement("li"), $a = document.createElement("a");
                        $a.href = "#";
                        $a.id= "city-data";
                        $li.append($a);
                        $a.textContent = `No se encontraron resultados`;
                        $fragment.appendChild($li);
                    }

                    if ($fragment.querySelectorAll("li").length > 0)
                        $citiesListComponent.appendChild($fragment);

                })
                .catch(err => alert('Solicitud fallida', err));
        }

    }

});
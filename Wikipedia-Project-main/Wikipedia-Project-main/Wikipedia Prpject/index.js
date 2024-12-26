let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //1.result-item-container
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //2.result-ttle-anchor
    let itemEl = document.createElement("a");
    itemEl.textContent = title;
    itemEl.href = link;
    itemEl.target = "_blank";
    itemEl.classList.add("result-title");
    resultItemEl.appendChild(itemEl);

    //3.break Element
    titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //4.link-anchor Element
    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    //5.break element 
    urlBrealEl = document.createElement("br");
    resultItemEl.appendChild(urlBrealEl);

    //6.description element 
    descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

}

function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);
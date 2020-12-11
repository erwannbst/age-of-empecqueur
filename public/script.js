 // client-side js, loaded by index.html
// run by the browser each time the page is loaded


const batimentsList = document.getElementById("batiments");
const batimentsForm = document.querySelector("form");

console.log(batimentsList);

function appendNewItemOnMap(item) {
  const newListItem = document.createElement("li");
  newListItem.innerText = item;
  batimentsList.appendChild(newListItem);
}

fetch("/map")
  .then(response => response.json()) // parse the JSON from the server
  .then(map => {
    // remove the loading text
    batimentsList.firstElementChild.remove();
  
    // get first player map
    let player1map = map.player1;
    appendNewItemOnMap(JSON.stringify(player1map));
    
    batimentsForm.addEventListener("submit", event => {
        // stop our form submission from refreshing the page
        event.preventDefault();

        // get dream value and add it to the list
        let newBatiment = batimentsForm.elements.batiment.value
        
                                  
        //map.push(newBatiment);
        appendNewItemOnMap(newBatiment);

        // reset form
        batimentsForm.reset();
        batimentsForm.elements.batiment.focus();
      });
  });

/*

// define variables that reference elements on our page
const dreamsList = document.getElementById("dreams");
const dreamsForm = document.querySelector("form");

// a helper function that creates a list item for a given dream
function appendNewDream(dream) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
}

// fetch the initial list of dreams
fetch("/map")
  .then(response => response.json()) // parse the JSON from the server
  .then(dreams => {
    // remove the loading text
    dreamsList.firstElementChild.remove();
  
    // iterate through every dream and add it to our page
    dreams.forEach(appendNewDream);
  
    // listen for the form to be submitted and add a new dream when it is
    dreamsForm.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();

      // get dream value and add it to the list
      let newDream = dreamsForm.elements.dream.value;
      dreams.push(newDream);
      appendNewDream(newDream);

      // reset form
      dreamsForm.reset();
      dreamsForm.elements.dream.focus();
    });
  });
*/
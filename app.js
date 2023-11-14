
document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById("hero_form");
    

    
    form.addEventListener('submit', async (event) => {
       
        event.preventDefault();

        // Create a FormData (set of key/value pairs representing form fields and their values) object to get form data
        const Form_info = new FormData(form);
        // Regular expression to filter unwanted characters
        const filter = /[a-zA-Z\s]+/g;

        // Filter unwanted characters from the "name" input
        const name = Form_info.get("name") ? Form_info.get("name").match(filter).join('') : "";
        
        // Make a fetch request to superheroes.php with the search query
        const results = await fetch(`superheroes.php?query=${name}`);

        
        const result_contain = document.getElementById("result");

        // Handle errors if the fetch request is not successful
        if (!results.ok) {
            result_contain.innerHTML = "Superhero not found";
            return;
        }

               const info = await results.json();

        // Display the result in the result container
        result_contain.innerHTML = name !== "" ?
            info.map(entry => `<h2>${entry.name} </h2> <h3>A.K.A ${entry.alias}</h3> <article><p>${entry.biography}</p></article> `).join("") :
            (`<ul>    ${info.map(entry => `<li>${entry.alias}</li>`).join("")} </ul> `);
    });
});

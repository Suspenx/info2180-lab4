// document.addEventListener("DOMContentLoaded",() => {
//     const srchBtn= document.getElementById("SearchButton")

//     if (!srchBtn){
//         console.error("Search Button not found")
//         return;
//     }

//     srchBtn.addEventListener('click', async ()=> {
//         try {
//             const response = await fetch("superheroes.php");

//             if (!response.ok){
//                 throw new Error ("Http error!");
//             }

//             const avengers = await response.text();
//             alert(avengers);
//         } catch (error) {
//             console.error("An error has occured :", error);
//         }
        
        
//     })
// })

document.addEventListener("DOMContentLoaded", () => {
    // Get the form element by its ID
    const form = document.getElementById("hero_form");
    
    // Check if the form element exists
    if (!form) return;

    // Add a submit event listener to the form
    form.addEventListener('submit', async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Create a FormData object to get form data
        const data = new FormData(form);
        // Regular expression to filter unwanted characters
        const DATA_REGEX = /[a-zA-Z\s]+/g;

        // Filter unwanted characters from the "name" input
        const name = data.get("name") ? data.get("name").match(DATA_REGEX).join('') : "";
        
        // Make a fetch request to superheroes.php with the search query
        const response = await fetch(`superheroes.php?query=${name}`);

        // Get the result container element by its ID
        const resultDiv = document.getElementById("result");

        // Check if the result container element exists
        if (!resultDiv) return;

        // Handle errors if the fetch request is not successful
        if (!response.ok) {
            resultDiv.innerHTML = "<p class=\"error-msg\">Superhero not found</p>";
            return;
        }

        // Parse the JSON response
        const fetchedData = await response.json();

        // Display the result in the result container
        resultDiv.innerHTML = name !== "" ?
            fetchedData.map(entry => `
                <h2>${entry.name}</h2>
                <h3>A.K.A ${entry.alias}</h3>
                <article><p>${entry.biography}</p></article>
            `).join("") :
            (`
                <ul>
                    ${fetchedData.map(entry => `<li>${entry.alias}</li>`).join("")}
                </ul>
            `);
    });
});

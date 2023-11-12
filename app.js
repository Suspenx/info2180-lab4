document.addEventListener("DOMContentLoaded",() => {
    const srchBtn= document.getElementById("SearchButton")

    if (!srchBtn){
        console.error("Search Button not found")
        return;
    }

    srchBtn.addEventListener('click',async ()=> {
        try {
            const response = await fetch("superheroes.php");

            if (!response.ok){
                throw new Error ("Http error!");
            }

            const avengers = await response.text();
            alert(avengers)
        } catch (error) {
            console.error("An error has occured :", error);
        }
        
        
    })
})
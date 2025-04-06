document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("getData").addEventListener("click", () => {
        const attributes = document.getElementById("attributes").value;  
        const id = document.getElementById("id").value;

        const url = `https://swapi.py4e.com/api/${attributes}/${id}/`;
        console.log("URL запроса:", url);

        document.getElementById("loading").style.display = "block";
        document.getElementById("result").style.display = "none";
        document.getElementById("error").style.display = "none";

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(`Ошибка: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                document.getElementById("loading").style.display = "none";
                document.getElementById("result").style.display = "block";
                
                const formattedData = formatData(data);
                document.getElementById("result").innerHTML = 
                    `<h3>Результаты:</h3>
                    <div>${formattedData}</div>`;
            })
            .catch(error => {
                document.getElementById("loading").style.display = "none";
                document.getElementById("error").style.display = "block";
                document.getElementById("error").innerText = `Ошибка запроса: ${error}`;
            })
            .finally(() => {
                document.getElementById("loading").style.display = "none";
            });
    });

    function formatData(data) {
        let result = "<ul>";
        const toDisplay = ["name", "films", "starships"];
        toDisplay.forEach(key => {
            if (data[key] !== undefined) {
                result += `<li><strong>${key}:</strong> ${data[key]}</li>`;}
        });
        result += "</ul>";
        return result;
    }
});

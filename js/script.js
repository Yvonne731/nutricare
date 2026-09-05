function reply() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let output = "";

    if (input.includes("calorie")) {
        output = "An average student needs around 2000 kcal daily.";
    } 
    else if (input.includes("water")) {
        output = "Drink at least 8 glasses of water.";
    } 
    else if (input.includes("healthy")) {
        output = "Eat fruits, vegetables, and balanced meals.";
    } 
    else {
        output = "Sorry, I don't understand.";
    }

    document.getElementById("botReply").innerText = output;
}
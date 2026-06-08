async function predictSpam() {

    const message = document.getElementById("message").value.trim();
    const resultBox = document.getElementById("result");

    if (message === "") {

        resultBox.style.display = "block";
        resultBox.className = "result-spam";
        resultBox.innerHTML = "Please enter a message to analyze.";

        return;
    }

    try {

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        resultBox.style.visibility = "visible";
        if (data.prediction === "Spam") {

            resultBox.className = "result-spam";

            resultBox.innerHTML =
                "Result: This message is likely classified as Spam.";

        } else {

            resultBox.className = "result-safe";

            resultBox.innerHTML =
                "Result: This message appears to be Not Spam.";
        }

    } catch (error) {

        resultBox.style.display = "block";
        resultBox.className = "result-spam";

        resultBox.innerHTML =
            "Unable to process the request. Please try again.";
    }
}
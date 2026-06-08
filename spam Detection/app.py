from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__)

model = joblib.load("spam_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")


@app.route("/")
def home():
    return render_template("index.html")


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    message = data['message']

    vector = vectorizer.transform([message])

    prediction = model.predict(vector)[0]

    result = "Spam" if prediction == 1 else "Legitimate"

    return jsonify({
        "prediction": result
    })

if __name__ == "__main__":
    app.run(debug=True)
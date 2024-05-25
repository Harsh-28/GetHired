from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/receiveData', methods=['POST'])
@cross_origin()  # This will enable CORS for this specific route
def receive_data():
    data = request.json
    print("Data received from frontend:", data)
    return jsonify({"status": "success", "received_data": data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

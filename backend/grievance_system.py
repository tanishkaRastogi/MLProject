from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from frontend

GRIEVANCE_FILE = 'grievances.json'

# existing lodge route
@app.route('/lodge', methods=['POST'])
def lodge():
    data = request.get_json()
    grievance = {
        "name": data.get("name"),
        "email": data.get("email"),
        "message": data.get("message")
    }

    if not os.path.exists(GRIEVANCE_FILE):
        with open(GRIEVANCE_FILE, 'w') as f:
            json.dump([], f)

    with open(GRIEVANCE_FILE, 'r+') as f:
        grievances = json.load(f)
        grievances.append(grievance)
        f.seek(0)
        json.dump(grievances, f, indent=4)

    return jsonify({"message": "Grievance submitted successfully!"})

# ✅ new route for dashboard
@app.route('/grievances', methods=['GET'])
def get_grievances():
    if not os.path.exists(GRIEVANCE_FILE):
        return jsonify([])

    with open(GRIEVANCE_FILE, 'r') as f:
        grievances = json.load(f)

    return jsonify(grievances)

if __name__ == '__main__':
    app.run(debug=True)
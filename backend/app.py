from flask import Flask, request, jsonify
import json
import os
import uuid
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_FILE = 'grievances.json'

# Helper function to load grievances
def load_grievances():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

# Helper function to save grievances
def save_grievances(grievances):
    with open(DATA_FILE, 'w') as f:
        json.dump(grievances, f, indent=2)

# Route to lodge a new grievance
@app.route('/lodge', methods=['POST'])
def lodge_grievance():
    data = request.json
    grievance = {
        "id": str(uuid.uuid4()),
        "name": data.get('name'),
        "email": data.get('email'),
        "message": data.get('message'),
        "status": "Pending"
    }
    grievances = load_grievances()
    grievances.append(grievance)
    save_grievances(grievances)
    return jsonify({"message": "Grievance submitted successfully!"}), 200

# Route to get all grievances
@app.route('/grievances', methods=['GET'])
def get_grievances():
    grievances = load_grievances()
    return jsonify(grievances)

# Route to update status of a grievance
@app.route('/update_status', methods=['POST'])
def update_status():
    data = request.json
    grievance_id = data.get('id')
    new_status = data.get('status')

    grievances = load_grievances()
    updated = False
    for grievance in grievances:
        if grievance['id'] == grievance_id:
            grievance['status'] = new_status
            updated = True
            break

    if updated:
        save_grievances(grievances)
        return jsonify({"message": "Status updated successfully!"})
    else:
        return jsonify({"error": "Grievance ID not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
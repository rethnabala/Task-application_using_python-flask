from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory storage for tasks
tasks = []
task_id_counter = 1

# Fetch all tasks (GET)
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Add a new task (POST)
@app.route('/tasks', methods=['POST'])
def add_task():
    global task_id_counter
    data = request.json
    task = {'id': task_id_counter, 'description': data['description']}
    tasks.append(task)
    task_id_counter += 1
    return jsonify(task), 201

# Delete a task (DELETE)
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)

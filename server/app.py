from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sys

# Add the server directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api_endpoints.courses.handler import CoursesHandler, CourseDetailHandler
from api_endpoints.students.handler import StudentProgressHandler
from api_endpoints.predictions.handler import CreatePredictionHandler

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Health check endpoint
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "service": "AI Academy API"})

# Course endpoints
@app.route("/api/courses", methods=["GET"])
def get_courses():
    return CoursesHandler(request)

@app.route("/api/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    return CourseDetailHandler(request, course_id)

@app.route("/api/courses/<int:course_id>/enroll", methods=["POST"])
def enroll_in_course(course_id):
    # TODO: Implement enrollment logic
    return jsonify({"message": "Enrollment functionality coming soon"})

# Student endpoints
@app.route("/api/students/<int:student_id>/progress", methods=["GET"])
def get_student_progress(student_id):
    return StudentProgressHandler(request, student_id)

# AI/ML prediction endpoint
@app.route("/api/predict", methods=["POST"])
def predict():
    return CreatePredictionHandler(request)

# Serve static files (for production deployment)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
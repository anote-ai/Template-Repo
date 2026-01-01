import { API_ENDPOINTS } from '../constants/RouteConstants';

const API_BASE_URL = API_ENDPOINTS.BASE_URL;

// Generic API request helper
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Health check
export async function checkHealth() {
  return apiRequest('/health');
}

// Course APIs
export async function getCourses() {
  return apiRequest('/api/courses');
}

export async function getCourse(courseId) {
  return apiRequest(`/api/courses/${courseId}`);
}

// Student APIs
export async function getStudentProgress(studentId) {
  return apiRequest(`/api/students/${studentId}/progress`);
}

// Prediction API (AI functionality)
export async function predict(inputData) {
  return apiRequest('/api/predict', {
    method: 'POST',
    body: JSON.stringify(inputData),
  });
}

// Course enrollment
export async function enrollInCourse(courseId, studentData) {
  return apiRequest(`/api/courses/${courseId}/enroll`, {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
}
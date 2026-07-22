const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Helper error handler for API responses.
 */
async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
}

/**
 * Creates a new generated poster.
 * @param {FormData} formData
 */
export async function createPoster(formData) {
  const response = await fetch(`${API_BASE}/posters`, {
    method: "POST",
    body: formData
  });
  return handleResponse(response);
}

/**
 * Saves a draft poster.
 * @param {FormData} formData
 */
export async function saveDraftPoster(formData) {
  // If status is not appended, set it to draft
  if (!formData.has("status")) {
    formData.append("status", "Draft");
  }
  const response = await fetch(`${API_BASE}/posters/draft`, {
    method: "POST",
    body: formData
  }).catch(async () => {
    // Fallback to /posters if /posters/draft endpoint is handled generically by status payload
    return fetch(`${API_BASE}/posters`, {
      method: "POST",
      body: formData
    });
  });
  return handleResponse(response);
}

/**
 * Fetches all saved poster records.
 */
export async function getPosters() {
  const response = await fetch(`${API_BASE}/posters`, {
    method: "GET"
  });
  return handleResponse(response);
}

/**
 * Fetches a single poster record by ID.
 * @param {string} id
 */
export async function getPosterById(id) {
  const response = await fetch(`${API_BASE}/posters/${id}`, {
    method: "GET"
  });
  return handleResponse(response);
}

/**
 * Updates an existing poster record.
 * @param {string} id
 * @param {FormData} formData
 */
export async function updatePoster(id, formData) {
  const response = await fetch(`${API_BASE}/posters/${id}`, {
    method: "PUT",
    body: formData
  });
  return handleResponse(response);
}

/**
 * Deletes a poster record by ID.
 * @param {string} id
 */
export async function deletePoster(id) {
  const response = await fetch(`${API_BASE}/posters/${id}`, {
    method: "DELETE"
  });
  return handleResponse(response);
}

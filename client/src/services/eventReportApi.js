const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong. Please try again.");
  }

  return result;
};

export const createEventReport = async (reportData) => {
  const response = await fetch(`${API_BASE_URL}/event-reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reportData)
  });

  return handleResponse(response);
};

export const saveDraftEventReport = async (reportData) => {
  const response = await fetch(`${API_BASE_URL}/event-reports/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reportData)
  });

  return handleResponse(response);
};

export const getEventReports = async () => {
  const response = await fetch(`${API_BASE_URL}/event-reports`);

  return handleResponse(response);
};

export const getEventReportById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/event-reports/${id}`);

  return handleResponse(response);
};

export const updateEventReport = async (id, reportData) => {
  const response = await fetch(`${API_BASE_URL}/event-reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reportData)
  });

  return handleResponse(response);
};

export const deleteEventReport = async (id) => {
  const response = await fetch(`${API_BASE_URL}/event-reports/${id}`, {
    method: "DELETE"
  });

  return handleResponse(response);
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong. Please try again.");
  }

  return result;
};

export const createCertificate = async (certificateData) => {
  const response = await fetch(`${API_BASE_URL}/certificates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(certificateData)
  });

  return handleResponse(response);
};

export const bulkCreateCertificates = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/certificates/bulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return handleResponse(response);
};

export const saveDraftCertificate = async (certificateData) => {
  const response = await fetch(`${API_BASE_URL}/certificates/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(certificateData)
  });

  return handleResponse(response);
};

export const getCertificates = async () => {
  const response = await fetch(`${API_BASE_URL}/certificates`);

  return handleResponse(response);
};

export const getCertificateById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/certificates/${id}`);

  return handleResponse(response);
};

export const updateCertificate = async (id, certificateData) => {
  const response = await fetch(`${API_BASE_URL}/certificates/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(certificateData)
  });

  return handleResponse(response);
};

export const deleteCertificate = async (id) => {
  const response = await fetch(`${API_BASE_URL}/certificates/${id}`, {
    method: "DELETE"
  });

  return handleResponse(response);
};

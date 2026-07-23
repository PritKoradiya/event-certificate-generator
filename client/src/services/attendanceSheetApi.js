import { getStudents } from "./attendanceStudentApi.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const LOCAL_SHEETS_KEY = "attendance_sheets_records";

const getLocalSheets = () => {
  try {
    const raw = localStorage.getItem(LOCAL_SHEETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalSheets = (sheets) => {
  try {
    localStorage.setItem(LOCAL_SHEETS_KEY, JSON.stringify(sheets));
  } catch (e) {
    console.error("Failed to save attendance sheets to localStorage", e);
  }
};

export const getAttendanceSheets = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/attendance/sheets${query ? `?${query}` : ""}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback to localStorage
  }

  let list = getLocalSheets();
  if (params.department && params.department !== "All") {
    list = list.filter((s) => s.department.toLowerCase() === params.department.toLowerCase());
  }
  if (params.className && params.className !== "All") {
    list = list.filter((s) => s.className.toLowerCase() === params.className.toLowerCase());
  }
  if (params.status && params.status !== "All") {
    list = list.filter((s) => s.status.toLowerCase() === params.status.toLowerCase());
  }

  return { success: true, data: list, total: list.length };
};

export const getAttendanceSheetById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/sheets/${id}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback
  }

  const list = getLocalSheets();
  const found = list.find((s) => s.id === id);
  if (!found) {
    throw new Error("Attendance sheet record not found.");
  }
  return { success: true, data: found };
};

export const createAttendanceSheet = async (sheetData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/sheets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetData)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback
  }

  const list = getLocalSheets();
  const studentCount = (sheetData.students || []).length;
  const pageCount = Math.ceil(studentCount / 39) || 1;

  const newSheet = {
    id: `att_sheet_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    schoolName: "School of Engineering, PPSU",
    department: sheetData.department,
    heading: sheetData.heading,
    className: sheetData.className,
    date: sheetData.date,
    eventCoordinatorName: sheetData.eventCoordinatorName,
    students: sheetData.students || [],
    studentCount,
    pageCount,
    status: "Generated",
    createdAt: new Date().toISOString()
  };

  list.unshift(newSheet);
  saveLocalSheets(list);
  return { success: true, data: newSheet, message: "Attendance sheet generated successfully." };
};

export const saveDraftAttendanceSheet = async (sheetData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/sheets/draft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetData)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback
  }

  const list = getLocalSheets();
  const studentCount = (sheetData.students || []).length;
  const pageCount = Math.ceil(studentCount / 39) || 1;

  const draftSheet = {
    id: `att_draft_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    schoolName: "School of Engineering, PPSU",
    department: sheetData.department || "",
    heading: sheetData.heading || "",
    className: sheetData.className || "",
    date: sheetData.date || "",
    eventCoordinatorName: sheetData.eventCoordinatorName || "",
    students: sheetData.students || [],
    studentCount,
    pageCount,
    status: "Draft",
    createdAt: new Date().toISOString()
  };

  list.unshift(draftSheet);
  saveLocalSheets(list);
  return { success: true, data: draftSheet, message: "Draft attendance sheet saved." };
};

export const regenerateAttendanceSheet = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance-sheets/${id}/regenerate`, {
      method: "POST"
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback
  }

  const list = getLocalSheets();
  const index = list.findIndex((s) => s.id === id);
  if (index === -1) {
    throw new Error("Attendance sheet record not found.");
  }

  const currentSheet = list[index];
  const activeStudentsRes = await getStudents({
    department: currentSheet.department,
    className: currentSheet.className
  });
  const activeStudents = activeStudentsRes.data || [];

  const studentCount = activeStudents.length;
  const pageCount = Math.ceil(studentCount / 39) || 1;

  list[index] = {
    ...currentSheet,
    students: activeStudents,
    studentCount,
    pageCount,
    updatedAt: new Date().toISOString()
  };

  saveLocalSheets(list);
  return {
    success: true,
    data: list[index],
    message: "Attendance sheet regenerated with current active student roster."
  };
};

export const duplicateAttendanceSheet = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance-sheets/${id}/duplicate`, {
      method: "POST"
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback
  }

  const list = getLocalSheets();
  const original = list.find((s) => s.id === id);
  if (!original) {
    throw new Error("Attendance sheet record not found.");
  }

  const duplicateSheet = {
    ...original,
    id: `att_sheet_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    heading: `${original.heading} (Copy)`,
    status: "Draft",
    createdAt: new Date().toISOString()
  };

  list.unshift(duplicateSheet);
  saveLocalSheets(list);
  return {
    success: true,
    data: duplicateSheet,
    message: "Attendance sheet duplicated as draft."
  };
};

export const updateAttendanceSheet = async (id, sheetData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/sheets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetData)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback
  }

  const list = getLocalSheets();
  const index = list.findIndex((s) => s.id === id);
  if (index === -1) {
    throw new Error("Attendance sheet not found.");
  }

  const studentCount = (sheetData.students || list[index].students || []).length;
  const pageCount = Math.ceil(studentCount / 39) || 1;

  list[index] = {
    ...list[index],
    ...sheetData,
    studentCount,
    pageCount,
    updatedAt: new Date().toISOString()
  };

  saveLocalSheets(list);
  return { success: true, data: list[index], message: "Attendance sheet updated." };
};

export const deleteAttendanceSheet = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/sheets/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Fallback
  }

  const list = getLocalSheets().filter((s) => s.id !== id);
  saveLocalSheets(list);
  return { success: true, message: "Attendance sheet record deleted." };
};

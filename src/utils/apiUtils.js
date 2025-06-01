import axios from "axios";

const BASE_URL = "https://notes-api.dicoding.dev/v1";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// AUTHENTICATION INTERCEPTOR : Request Interceptor - Auto Token Injection
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // 1. Ambil token dari localStorage : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 3. Tambah header Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    return config; // 4. Return config yang sudah dimodifikasi
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function login({ email, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    if (response.data.status !== "success") {
      alert(response.data.message);
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
    return { error: true, data: null };
  }
}

async function register({ name, email, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
      email,
      password,
    });

    if (response.data.status !== "success") {
      alert(response.data.message);
      return { error: true };
    }

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
    return { error: true };
  }
}

async function getUserLogged() {
  try {
    const response = await api.get("/users/me");

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to fetch user data");
    return { error: true, data: null };
  }
}

async function addNote({ title, body }) {
  try {
    const response = await api.post("/notes", {
      title,
      body,
    });

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to add note");
    return { error: true, data: null };
  }
}

async function getActiveNotes() {
  try {
    const response = await api.get("/notes");

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to fetch active notes");
    return { error: true, data: null };
  }
}

async function getArchivedNotes() {
  try {
    const response = await api.get("/notes/archived");

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to fetch archived notes");
    return { error: true, data: null };
  }
}

async function getNote(id) {
  try {
    const response = await api.get(`/notes/${id}`);

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to fetch note");
    return { error: true, data: null };
  }
}

async function archiveNote(id) {
  try {
    const response = await api.post(`/notes/${id}/archive`);

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to archive note");
    return { error: true, data: null };
  }
}

async function unarchiveNote(id) {
  try {
    const response = await api.post(`/notes/${id}/unarchive`);

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to unarchive note");
    return { error: true, data: null };
  }
}

async function deleteNote(id) {
  try {
    const response = await api.delete(`/notes/${id}`);

    if (response.data.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete note");
    return { error: true, data: null };
  }
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};

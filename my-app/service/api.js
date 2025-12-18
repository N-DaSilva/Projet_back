import { API_HOST } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

class APIHandler {
  async removeToken() {
    try {
      console.log('remove token')
    } catch (error) {
      console.error("Error removing token:", error);
    }
  }

  async getHeaders() {
    const currentToken = await AsyncStorage.getItem('token');
    
    return {
      "Content-Type": "application/json",
      Authorization: currentToken ? `Bearer ${currentToken}` : "",
      Accept: "application/json"
    };
  }

  async post(endpoint, data, options = {}) {
    try {
      console.log(`[API] POST ${API_HOST}${endpoint}`);
      const headers = await this.getHeaders()
      const response = await fetch(`${API_HOST}${endpoint}`, {
        method: "POST",
        headers: {
          ...headers,
          ...options.headers,
        },
        signal: options.signal,
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.status === 401) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      const res = await response.json();
      return { ...res, status: response.status };
    } catch (error) {
      if (error.message.includes("NetworkError")) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    try {
      console.log(`[API] GET ${API_HOST}${endpoint}`);
      const headers = await this.getHeaders()
      const response = await fetch(`${API_HOST}${endpoint}`, {
        method: "GET",
        headers: {
          ...headers,
          ...options.headers,
        },
        credentials: "include",
      });
      if (response.status === 401) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      const res = await response.json();
      return { ...res, status: response.status };
    } catch (error) {
      if (error.message.includes("NetworkError")) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      throw error;
    }
  }

  async put(endpoint, data, options = {}) {
    console.log('check2:',data);
    const headers = await this.getHeaders()
    try {
      console.log(`[API] PUT ${API_HOST}${endpoint}`);
      const response = await fetch(`${API_HOST}${endpoint}`, {
        method: "PUT",
        headers: {
          ...headers,
          ...options.headers,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.status === 401) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      const res = await response.json();
      return { ...res, status: response.status };
    } catch (error) {
      if (error.message.includes("NetworkError")) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      throw error;
    }
  }

  async delete(endpoint, data, options = {}) {
    try {
      console.log(`[API] DELETE ${API_HOST}${endpoint}`);
      const headers = await this.getHeaders()
      const response = await fetch(`${API_HOST}${endpoint}`, {
        method: "DELETE",
        headers: {
          ...headers,
          ...options.headers,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (response.status === 401) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      const res = await response.json();
      return { ...res, status: response.status };
    } catch (error) {
      if (error.message.includes("NetworkError")) {
        await this.removeToken();
        return { ok: false, status: 401, error: "Unauthorized" };
      }
      throw error;
    }
  }
}
const api = new APIHandler();
export default api;
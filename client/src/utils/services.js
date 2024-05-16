import { useCallback } from "react"

export const baseUrl = "http://localhost:5000/api"

export const postRequest = async (path, body) => {
    try {
        console.log("body : ", body);
        const response = await fetch(`${path}`, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            let message;
            if (data?.message) {
                message = data.message;
            } else {
                message = data;
            }
            return { error: true, message };
        }
        return data;
    } catch (error) {
        return { error: true, error };
    }
}

export const getRequest = async (path) => {
    try {
        const response = await fetch(`${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            let message;
            if (data?.message) {
                message = data.message;
            } else {
                message = data;
            }
            return { error: true, message };
        }
        return data;
    } catch (error) {
        return { error: true, error };
    }
}
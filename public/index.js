let activeDiv = null;
export const setDiv = (newDiv) => {
    if (newDiv != activeDiv) {
        if (activeDiv) {
            activeDiv.style.display = "none";
        }
        newDiv.style.display = "block";
        activeDiv = newDiv;
    }
};

export let inputEnabled = true;
export const enableInput = (state) => {
    inputEnabled = state;
};
let token = null;

export const setToken = (value) => {
    token = value;
    if (value) {
        localStorage.setItem("token", value);
    } else {
        localStorage.removeItem("token");
    }
};
export const getToken = () => {
    if (!token) {
        token = localStorage.getItem("token");
    }
    return token;
};

export let message = null;

import { showServices, handleServices } from "./services.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleAddEdit } from "./addEdit.js";
import { handleRegister } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
    message = document.getElementById("message");
    handleLoginRegister();
    handleLogin();
    handleServices();
    handleRegister();
    handleAddEdit();
    if (getToken()) {
        showServices();
    } else {
        showLoginRegister();
    }
});
import {
    inputEnabled,
    setDiv,
    message,
    enableInput,
    setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showServices } from "./services.js";

let registerDiv = null;
let name = null;
let email1 = null;
let password1 = null;
let password2 = null;

const BASE_URL = "http://localhost:3000"

export const handleRegister = () => {
    registerDiv = document.getElementById("register-div");
    name = document.getElementById("name");
    email1 = document.getElementById("email1");
    password1 = document.getElementById("password1");
    password2 = document.getElementById("password2");
    const registerButton = document.getElementById("register-button");
    const registerCancel = document.getElementById("register-cancel");

    registerButton.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === registerButton) {
                if (password1.value != password2.value) {
                    message.textContent = "The passwords entered do not match.";
                } else {
                    enableInput(false);

                    try {
                        const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: name.value,
                                email: email1.value,
                                password: password1.value,
                            }),
                        });

                        const data = await response.json();
                        if (response.status === 201) {
                            message.textContent = `Registration successful.  Welcome ${data.user.name}`;
                            setToken(data.token);

                            name.value = "";
                            email1.value = "";
                            password1.value = "";
                            password2.value = "";

                            showServices();
                        } else {
                            message.textContent = data.msg;
                        }
                    } catch (err) {

                        message.textContent = "A communications error occurred.";
                    }

                    enableInput(true);
                }
            } registerCancel.addEventListener("click", (e) => {
                name.value = "";
                email1.value = "";
                password1.value = "";
                password2.value = "";
                showLoginRegister();
            })
        }
    });
};

export const showRegister = () => {
    email1.value = "";
    password1.value = "";
    password2.value = "";
    setDiv(registerDiv);
};
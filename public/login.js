import {
    inputEnabled,
    setDiv,
    message,
    enableInput,
    setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showServices } from "./services.js";

let loginDiv = null;
let email = null;
let password = null;

const BASE_URL = "http://localhost:3000"

export const handleLogin = () => {
    loginDiv = document.getElementById("logon-div");
    email = document.getElementById("email");
    password = document.getElementById("password");
    const logonButton = document.getElementById("logon-button");
    const logonCancel = document.getElementById("logon-cancel");

    logonButton.addEventListener("click", async () => {
        if (!inputEnabled) return;
        console.log("inputEnabled = true");
        console.log("Email:", email.value);
        console.log("Password:", password.value);
        enableInput(false);

        try {
            const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            });

            const data = await response.json();
            console.log("Ответ сервера:", data);

            if (response.status === 200) {
                message.textContent = `Logon successful. Welcome ${data.user.name}`;
                setToken(data.token);

                email.value = "";
                password.value = "";

                await showServices();
            } else {
                message.textContent = data.msg || "Login failed.";
            }
        } catch (err) {
            console.error(err);
            message.textContent = "A communications error occurred.";
        }

        enableInput(true);
    });

    logonCancel.addEventListener("click", () => {
        email.value = "";
        password.value = "";
        showLoginRegister();
    });
};

export const showLogin = () => {
    email = document.getElementById("email");
    password = document.getElementById("password");

    email.value = "";
    password.value = "";

    setDiv(document.getElementById("logon-div"));
};

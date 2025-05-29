import { inputEnabled, setDiv } from "./index.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

let loginRegisterDiv = null;

export const handleLoginRegister = () => {
   loginRegisterDiv = document.getElementById("logon-register");
    const logon = document.getElementById("logon");
    const register = document.getElementById("register");

    loginRegisterDiv.addEventListener("click", (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === logon) {
                showLogin();
            } else if (e.target === register) {
                showRegister();
            }
        }
    });
};

export const showLoginRegister = () => {
    if (loginRegisterDiv) {
        setDiv(loginRegisterDiv);
    } else {
        loginRegisterDiv = document.getElementById("logon-register");
        if (loginRegisterDiv) setDiv(loginRegisterDiv);
    }
};
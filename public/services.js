import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    token,
    enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let servicesDiv = null;
let servicesTable = null;
let servicesTableHeader = null;

export const handleServices = () => {
    servicesDivs = document.getElementById("services");
    const logoff = document.getElementById("logoff");
    const addService = document.getElementById("add-service");
    servicesTables = document.getElementById("services-table");
    servicesTableHeader = document.getElementById("services-table-header");

    servicesDiv.addEventListener("click", (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === addJob) {
                showAddEdit(null);
            } else if (e.target === logoff) {
                setToken(null);

                message.textContent = "You have been logged off.";

                servicesTable.replaceChildren([servicesTableHeader]);

                showLoginRegister();
            }
        }
    });
};

export const showServices = async () => {
    setDiv(servicesDiv);
};
import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    getToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";


let servicesDiv = null;
let servicesTable = null;
let servicesTableHeader = null;
const BASE_URL = "http://localhost:3000";

export const handleServices = () => {
    servicesDiv = document.getElementById("services");
    const logoff = document.getElementById("logoff");
    const addService = document.getElementById("add-service");
    servicesTable = document.getElementById("services-table");
    servicesTableHeader = document.getElementById("services-table-header");

    servicesDiv.addEventListener("click", (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === addService) {
                showAddEdit(null);
            } else if (e.target === logoff) {
                setToken(null);

                message.textContent = "You have been logged off.";

                showLoginRegister();
            }
        }
    });
};

export const showServices = async () => {
    setDiv(servicesDiv);
    try {
        const token = getToken();
        const response = await fetch(`${BASE_URL}/api/v1/services`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",

            },
        });
        console.log("Token for request:", token);



        const data = await response.json();

        if (response.status === 200) {
            message.textContent = "Services loaded.";
            renderServices(data.services);
        } else {
            message.textContent = data.msg || "Could not load services.";
        }
    } catch (err) {
        console.error(err);
        message.textContent = "A communication error occurred.";
    }
};

function renderServices(services) {
    const tbody = document.getElementById("services-table-body");
    tbody.innerHTML = "";

    services.forEach(service => {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${service.company || ''}</td>
      <td>${service.serviceName || ''}</td>
      <td>${service.status || ''}</td>
      <td>${service.location || ''}</td>
      <td>${service.description || ''}</td>
      <td><button>Edit</button></td>
            <td><button>Delete</button></td>
    `;

        tbody.appendChild(row);
    });
}
import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    getToken,
} from "./index.js";
import {showLoginRegister} from "./loginRegister.js";
import {showAddEdit} from "./addEdit.js";


let servicesDiv = null;
let servicesTable = null;
let servicesTableHeader = null;
const BASE_URL = "http://localhost:3000";

let servicesList = [];
export const handleServices = () => {
    servicesDiv = document.getElementById("services");
    const logoff = document.getElementById("logoff");
    const addService = document.getElementById("add-service");
    servicesTable = document.getElementById("services-table");
    servicesTableHeader = document.getElementById("services-table-header");

    servicesDiv.addEventListener("click", (e) => {
        if (!inputEnabled || e.target.nodeName !== "BUTTON") return;
        e.preventDefault();

        if (e.target === addService) {
            showAddEdit(null);
            return
        }
        if (e.target === logoff) {
            setToken(null);
            message.textContent = "You have been logged off.";
            showLoginRegister();
            return;
        }

        if (e.target.classList.contains('edit-btn')) {
            const idx = e.target.getAttribute('data-idx');
            const service = servicesList[idx];
            if (service) showAddEdit(service);
            return;
        }

        if (e.target.classList.contains('delete-btn')) {
            const idx = e.target.getAttribute('data-idx');
            const service = servicesList[idx];
            if (service && confirm("Delete this service?")) {
                deleteService(service._id);
            }
            return;
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
async function deleteService(serviceId) {
    const token = getToken();
    try {
        const response = await fetch(`${BASE_URL}/api/v1/services/${serviceId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            message.textContent = "Service deleted.";
            await showServices();
        } else {
            const data = await response.json();
            message.textContent = data.msg || "Could not delete service.";
        }
    } catch (err) {
        console.error(err);
        message.textContent = "A communication error occurred.";
    }
}

function renderServices(services) {
    servicesList = services;
    const tbody = document.getElementById("services-table-body");
    tbody.innerHTML = "";

    services.forEach((service, idx) => {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${service.company || ''}</td>
      <td>${service.serviceName || ''}</td>
      <td>${service.status || ''}</td>
      <td>${service.location || ''}</td>
      <td>${service.description || ''}</td>
      <td><button class="edit-btn" data-idx="${idx}" type="button">Edit</button></td>
          <td><button class="delete-btn" data-idx="${idx}" type="button">Delete</button></td>
    `;

        tbody.appendChild(row);
    });
}
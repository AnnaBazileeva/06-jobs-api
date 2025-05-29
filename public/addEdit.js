import { enableInput, inputEnabled, message, setDiv,getToken } from "./index.js";
import {showServices} from "./services.js";

let addEditDiv = null;
let company = null;
let location = null;
let status = null;
let addingService = null;
let serviceName = null;
let description = null;

const BASE_URL = "http://localhost:3000"

export const handleAddEdit = () => {
    addEditDiv = document.getElementById("edit-service");
    company = document.getElementById("company");
    serviceName = document.getElementById("serviceName");
    description = document.getElementById("description");
    location = document.getElementById("location");
    status = document.getElementById("status");
    addingService = document.getElementById("adding-service");
    const editCancel = document.getElementById("edit-cancel");

    addEditDiv.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === addingService) {
                enableInput(false);

                let method = "POST";
                let url = `${BASE_URL}/api/v1/services`;
                console.log("fetching:", url);
                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${getToken()}`,
                        },
                        body: JSON.stringify({
                            company: company.value,
                            location: location.value,
                            status: status.value,
                            serviceName: serviceName.value,
                            description: description.value,
                        }),
                    });

                    const data = await response.json();
                    if (response.status === 201) {

                        message.textContent = "The service entry was created.";

                        company.value = "";
                        location.value = "";
                        status.value = "available";

                        showServices();
                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.log(err);
                    message.textContent = "A communication error occurred.";
                }

                enableInput(true);
            } else if (e.target === editCancel) {
                message.textContent = "";
                showServices();
            }
        }
    });
}

export const showAddEdit = (service) => {
    setDiv(addEditDiv);

    if (service) {
        company.value = service.company || "";
        location.value = service.location || "";
        status.value = service.status || "available";
    } else {
        company.value = "";
        location.value = "";
        status.value = "available";
    }
};
let myleads = JSON.parse(localStorage.getItem("myleads")) || [];

let input = document.querySelector("input");
let btn = document.querySelector(".save-inp");
let ul = document.querySelector(".ul");
let delbtn = document.querySelector(".delete");
let tbtn = document.querySelector(".save-tab");

// Function to render leads
function renderLeads() {
    ul.innerHTML = ""; // Clear previous list
    myleads.forEach((lead, index) => {
        let item = document.createElement("li");
        item.innerHTML = `
            <a href="${lead}" target="_blank"><u>${lead}</u></a>
            <span class="delete-btn" data-index="${index}">❌</span>
        `;
        ul.appendChild(item);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", deleteLead);
    });
}


// Function to delete a specific lead
function deleteLead(event) {
    let index = event.target.getAttribute("data-index"); // Get lead index
    myleads.splice(index, 1); // Remove from array
    localStorage.setItem("myleads", JSON.stringify(myleads)); // Update storage
    renderLeads(); // Re-render list
}

// Initial render of stored leads
renderLeads();

delbtn.addEventListener("dblclick", () => {
    localStorage.removeItem("myleads");
    myleads = [];
    renderLeads();
});

tbtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let tabURL = tabs[0].url;
        if (tabURL) {
            myleads.push(tabURL);
            localStorage.setItem("myleads", JSON.stringify(myleads));
            renderLeads();
        }
    });
});

btn.addEventListener("click", () => {
    let lead = input.value.trim();
    if (lead) {
        myleads.push(lead);
        localStorage.setItem("myleads", JSON.stringify(myleads));
        renderLeads();
        input.value = "";
    }
});


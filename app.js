let myleads = JSON.parse(localStorage.getItem("myleads")) || []; // Retrieve stored leads

let input = document.querySelector("input");
let btn = document.querySelector(".save-inp");
let ul = document.querySelector(".ul");
let delbtn = document.querySelector(".delete");
let tbtn = document.querySelector(".save-tab");

// Function to render leads
function renderLeads() {
    ul.innerHTML = ""; // Clear the list before rendering
    myleads.forEach(lead => {
        let item = document.createElement("li");
        item.innerHTML = `<a href="${lead}" target="_blank"><u>${lead}</u></a>`;
        ul.appendChild(item);
    });
}

// Initial rendering of stored leads
renderLeads();

delbtn.addEventListener("dblclick", () => {
    localStorage.removeItem("myleads");
    myleads = [];
    ul.innerHTML = "";
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
    if (lead) {  // Ensure it's not empty
        myleads.push(lead);
        localStorage.setItem("myleads", JSON.stringify(myleads));
        renderLeads();
        input.value = ""; // Clear input field
    }
});

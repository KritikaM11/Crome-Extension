// local storage only stores strings (so here we have to convert
//  arr to string using json methods)

let myLeads = [];
const inp = document.querySelector("input");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");
const deletebtn = document.querySelector("#DELETE-btn");
const tabbtn = document.querySelector("#tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// console.log(leadsFromLocalStorage);

if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabbtn.addEventListener("click", ()=>{
  
})

//function that takes anyleads form array and render it out
function render(leads){
  let listItems = "";
  for(let mylead of leads){
    listItems += `<li> <a href="${leads} target="_blank"> ${leads} </a> </li>`
  }
  ul.innerHTML = listItems;
}

deletebtn.addEventListener("dblclick" , ()=>{
  console.log("DELETED")
  localStorage.clear();
  myLeads=[];
  render( myLeads);  //to clear the DOM
})


btn.addEventListener("click", ()=>{
    myLeads.push(inp.value);
    inp.value = "";
    
    //storing the information in local storage
     localStorage.setItem("myLeads", JSON.stringify(myLeads));
     console.log(localStorage.getItem("myLeads"));
     render( myLeads);
})




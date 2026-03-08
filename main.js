let issues = [];

const api = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
.then(res => res.json())
.then(data  =>{
    issues = data.data
    display(data.data)} )
}

const display  = (text) =>{ 
        const containerBox = document.getElementById("container")
        containerBox.innerHTML = ""

        text.forEach((element) => {
            
            const card = document.createElement("div")
            let borderColor = '';
            if(element.status === "open"){
                borderColor = "border-green-500"
            }
            else{
                borderColor = "border-purple-500"
            }
        card.innerHTML = `
        <div onclick="openModel(${element.id})" class="h-[260px] bg-gray-50 p-[30px] shadow-md border-t-4 ${borderColor} rounded-lg">
        <div class="flex justify-between items-center mb-3">
        <span class="text-green-500">●</span>
        <span class="text-sm font-semibold">${element.priority.toUpperCase()}</span>
    </div>

    <h3 class="text-[15px] font-semibold  mb-2">
        ${element.title}
    </h3>

    <p class="text-gray-500 text-sm mb-3 line-clamp-2">
        ${element.description}
    </p>

    <div class="flex gap-2  mb-3">
       ${(element.labels).map((label,index) => {

    
    if(index === 0){
  color = "bg-red-50 text-red-500"
  img = "assets/BugDroid.png"
}
  else{
  color = "bg-yellow-100 text-yellow-700"
  img = "assets/Lifebuoy.png"
}
    return `
   <span class="inline-flex items-center gap-1 ${color} text-[12px] font-medium px-3 py-[3px] rounded-full whitespace-nowrap">
   <img src="${img}" class="w-3 h-3">${label}</span>
    `
}).join("")}
    </div>

    <div class="text-sm text-gray-400">
        #${element.id} by ${element.author}
    </div>

    <div class="text-sm text-gray-400">
        ${new Date(element.createdAt).toLocaleDateString()}
    </div>
        </div>
        `
        containerBox.append(card)
    });
        
}
api()

const allBtn = document.getElementById("all-btn")
const openBtn = document.getElementById("open-btn")
const closedBtn = document.getElementById("closed-btn")
allBtn.addEventListener('click' , function(){
    allBtn.classList.remove( "bg-blue-600" , "text-white" );
allBtn.classList.add("bg-gray-200");
})


function openModel(id){

const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

fetch(url)
.then(res => res.json())
.then(data => {

const issue = data.data
const modalsection = document.getElementById("model")

modalsection.innerHTML = `
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
<div class="modal-box">

<h3 class="text-[24px] font-bold">${issue.title}</h3>

<div class="flex gap-1 mt-2.5">
<div class="bg-green-400 rounded-full pt-1 px-4 mt-0.5 "><p class=" mb-[5px] text-white ">${issue.status}</p></div> <span class="w-2 h-2  mt-[5px] text-[#64748B] ">&bull;</span> 
<p class="mt-[5px] text-[#64748B] ">${issue.status} by <span>${issue.author}</span></p>
 <div class="text-sm  mt-[6px] text-[#64748B] "> <span class="w-2 h-2  text-[#64748B]  ">  &bull;</span> 
        ${new Date(issue.createdAt).toLocaleDateString()}
    </div>
</div>

<p class="py-4">${issue.description}</p>

<div class="flex justify-around max-w-11/12 shadow-lg bg-gray-100 p-2">

<div>
<p class="text-[#64748B] " >Assignee:</p>
<h3 class=" text-[16px]" >${issue.author.toUpperCase()}</h3>
</div>

<div>
<p class="text-[#64748B] " >Assignee:</p>
<div class="bg-red-400 rounded-full text-white px-3 py-1">
${issue.priority}
</div>
</div>

</div>

<div class="modal-action">
<form method="dialog">
<button class="w-[76px] h-11 bg-blue-600 text-white">
Close
</button>
</form>
</div>

</div>
</dialog>
`

document.getElementById("my_modal_5").showModal()

})

}

function loadIssus(type){
    if (type === "all"){
        display(issues)
    }
    if(type === "open"){
        const openissues = issues.filter(item => item.status === "open")
        display(openissues)
    }
    if(type === "closed"){
        const Closedissues = issues.filter(item => item.status === "closed")
        display(Closedissues)
    }
}

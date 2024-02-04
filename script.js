
const btn = document.getElementById("btn");
const todoBody = document.getElementById("todo-body");
const  progressBody = document.getElementById("progress-body");
const  doneBody = document.getElementById("done-body");
const todoH = document.getElementById("todo-h");
const progressH = document.getElementById("progress-h");
const doneH = document.getElementById("done-h");
const text = document.getElementById("text");
const date = document.getElementById("date");
const search = document.getElementById("search");
const add=document.getElementById("add");
const form=document.getElementById("form");
const ram=document.getElementById("ram");
const close=document.getElementById("close");


//Add button
add.addEventListener("click",funs);

function funs(){
    add.classList.add("hide");
    form.classList.remove("hide");
    text.focus();
    close.addEventListener("click",()=>{
        form.classList.add("hide");
    })
    btn.addEventListener("click", fun);
}

 
let todoCount = 0;
let progressCount = 0;
let doneCount = 0;
 
function fun(event) {
    event.preventDefault();
    const text = document.getElementById("text").value;
    const date = document.getElementById("date").value;
    const priority=document.getElementById("priority").value;
    const maindiv = document.createElement("div");
    maindiv.className = "maindiv";
    maindiv.draggable=true;
   
    //delete ,Edit ,save button
    const edit = document.createElement("button");
    edit.innerText = "edit";
    edit.className = "Edit material-icons ";

    const delet = document.createElement("button");
    delet.innerText = "delete";
    delet.className = "delete material-icons";

    const save = document.createElement("button");
    save.innerText = "save";
    save.className = "Save";
    save.style.display = "none";

    // if text is not filled then give alert
    if (text === "") {
        alert("Fill the form");
        return;
    }
    
     //count
     todoCount++;
     ram.innerText = todoCount;
    //text ,date,priority
    const T = document.createElement("text");
    T.textContent = text;
    T.className = "text";
    
    const D = document.createElement("date");
    D.innerText= date;
    D.className = "date";

    // const P=document.createElement("B");
    // P.innerText=priority;
    // P.className="priority";


    const P = document.createElement("B");
    P.innerText = priority;
    P.className = "priority";


    //div for priority and date
    const DP=document.createElement("div");
    DP.className="DP";
    DP.append(D,P);
    //div for text,priority and date
    const content=document.createElement("div");
    content.className="containt";
    content.append(T,DP);
    //div for all button
    const button=document.createElement("div");
    button.className="button";
    button.append(edit, delet, save);
    

    maindiv.append(content,button);
    todoBody.appendChild(maindiv);
     
    //form hide and reset
    form.classList.add("hide");
    add.classList.remove("hide");
    document.getElementById("form").reset();
    //notification hide
    const emptyTodo=document.getElementById("emptyTodo");
    const emptyProcess=document.getElementById("emptyProcess"); 
    const emptyDone=document.getElementById("emptyDone"); 

   
    emptyTodo.classList.add("hide");

    // delete
    delet.addEventListener("click", Delete);

    function Delete() {
        if (confirm("You really want to delete")) {
            var div = this.closest("#todo-body .maindiv");
            if (div) {
                div.parentNode.removeChild(div);
                todoCount--;
                ram.innerText = todoCount;
                return;
            }
    
            div = this.closest("#progress-body .maindiv");
            if (div) {
                div.parentNode.removeChild(div);
                progressCount--;
                shiya.innerText = progressCount;
                return;
            }
    
            div = this.closest("#done-body .maindiv");
            if (div) {
                div.parentNode.removeChild(div);
                doneCount--;
                lakchhmad.innerText = doneCount;
            }
        }
    }
    
     const textEdit=document.querySelector(".text");
    // edit
    edit.addEventListener("click", Edit);

    function Edit() {
        T.contentEditable = true;
        D.contentEditable = true;
        P.contentEditable=true; 
        edit.style.display = "none";
        delet.style.display = "none";
        save.style.display = "inline-block";
        textEdit.focus();

    }
    // save
    save.addEventListener("click", Save);

    function Save() {
        T.contentEditable = false;
        D.contentEditable = false;
        P.contentEditable=false;
        
        edit.style.display = "inline-block";
        delet.style.display = "inline-block";
        save.style.display = "none";
    }


    //Drag and drop
    
        maindiv.addEventListener("dragstart",function(e){
            //item selected
            let selectedItem=e.target;
            if (todoBody.contains(selectedItem)) {
                todoCount--;
                ram.innerText = todoCount;
            } else if (progressBody.contains(selectedItem)) {
                progressCount--;
                shiya.innerText = progressCount;
            } else if (doneBody.contains(selectedItem)) {
                doneCount--;
                lakchhmad.innerText = doneCount;
            }
           
          
        //drag in progress
        progressBody.addEventListener("dragover",function(e){
            e.preventDefault();
        }) 
        progressBody.addEventListener("drop",function(){        
            progressBody.appendChild(selectedItem);
                selectedItem=null;
               
                progressCount++;
                shiya.innerText = progressCount;
                emptyProcess.classList.add("hide");     
        }) 

        //drag in done
        doneBody.addEventListener("dragover",function(e){
            e.preventDefault();
        }) 
        doneBody.addEventListener("drop",function(){   
            doneBody.appendChild(selectedItem);
                selectedItem=null;
                doneCount++;
                lakchhmad.innerText = doneCount;
                emptyDone.classList.add("hide");
          
        }) 
        //drag in todo
        todoBody.addEventListener("dragover",function(e){
            e.preventDefault();
        }) 
        todoBody.addEventListener("drop",function(){        
            todoBody.appendChild(selectedItem);
                selectedItem=null;
                todoCount++;
                ram.innerText = todoCount;
          
        }) 
        })


        // Search the main div 

        search.addEventListener("input",searchmaindiv)

        function searchmaindiv(){
            if(todoBody.childElementCount===0){
                alert("there is no Tasks present to Search");
                return;
            }
            let filter=search.value.toLowerCase();

            if(
                maindiv.querySelector(".text").innerText.toLowerCase().includes(filter) ||
                maindiv.querySelector(".date").innerText.toLowerCase().includes(filter) ||
                maindiv.querySelector(".priority").innerText.toLowerCase().includes(filter)
            ){
                maindiv.style.display='';
            }else{
                maindiv.style.display='none';
            }
        }

        // priority filter
        const TP=document.getElementById("TP");
        const PP=document.getElementById("PP");
        const DPi=document.getElementById("DP");
  
 // Add an event listener for the change event on the priority filter
TP.addEventListener("change", filterByPriorityTP);
PP.addEventListener("change", filterByPriorityPP);
DPi.addEventListener("change", filterByPriorityDPi);



function filterByPriorityTP() {
    // Get the selected priority filter value
    let selectedPriority = TP.value;

    // Get all maindiv elements
    let maindivs = document.querySelectorAll(".maindiv");

    // Iterate through each maindiv and check the priority
    maindivs.forEach(maindiv => {
        let priorityElement = maindiv.querySelector(".priority");
        let priority = priorityElement.innerText;

        // Check if the priority matches the selected filter
        if (selectedPriority === "All" || priority === selectedPriority) {
            maindiv.style.display = '';
        } else {
            maindiv.style.display = 'none';
        }
    });
}
 

function filterByPriorityPP() {
    // Get the selected priority filter value
    let selectedPriority = PP.value;

    // Get all maindiv elements
    let maindivs = document.querySelectorAll(".maindiv");

    // Iterate through each maindiv and check the priority
    maindivs.forEach(maindiv => {
        let priorityElement = maindiv.querySelector(".priority");
        let priority = priorityElement.innerText;

        // Check if the priority matches the selected filter
        if (selectedPriority === "All" || priority === selectedPriority) {
            maindiv.style.display = '';
        } else {
            maindiv.style.display = 'none';
        }
    });
}


function filterByPriorityDPi() {
    // Get the selected priority filter value
    let selectedPriority = DPi.value;

    // Get all maindiv elements
    let maindivs = document.querySelectorAll(".maindiv");

    // Iterate through each maindiv and check the priority
    maindivs.forEach(maindiv => {
        let priorityElement = maindiv.querySelector(".priority");
        let priority = priorityElement.innerText;

        // Check if the priority matches the selected filter
        if (selectedPriority === "All" || priority === selectedPriority) {
            maindiv.style.display = '';
        } else {
            maindiv.style.display = 'none';
        }
    });
}


}


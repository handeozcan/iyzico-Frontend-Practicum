 //Tüm itemleri kapsayacak ul tagını seçildi
const allList = document.getElementById("list");                        

// LocalStorage'da olan itemleri sayfa yenilenince oluşturma fonksiyonu
const getItemsfromLocalStorage = function () {
    const todos = JSON.parse(localStorage.getItem("todos")); 
    // eğer localde henüz hiç todo yoksa todos listesi yoksa boş bir array olarak todos listesi oluştur
    if (!todos) {                                                           
        localStorage.setItem("todos", JSON.stringify([]))                   
    } else {
        
        for (let i = 0; i < todos.length; i++) {                           
            function newItemforLocalStorage() {
                 // local'deki her bir todo item'ı için yeni bir li oluştur
                let newLi = document.createElement("li");                  
                let inputValue = todos[i].text;                            
                let text = document.createTextNode(inputValue);   
                newLi.appendChild(text);                           


                let span = document.createElement("span");                 
                let icon = document.createTextNode("x");               
                span.className = "close";                                 
                span.appendChild(icon);                                
                newLi.appendChild(span);                                   
                allList.appendChild(newLi);                     

                if (todos[i].isChecked == true) {
                    newLi.classList.add("checked")
                } else {
                    newLi.classList.remove("checked")
                }
            };
            newItemforLocalStorage();                                           
        }
    }
}
getItemsfromLocalStorage();



// Tüm li elementleri için değişken
let listItems = document.getElementsByTagName("li");

// List item oluşturma
for (let i = 0; i < listItems.length; i++) {                         
    let span = document.createElement("span");                       
    let icon = document.createTextNode("x");                       
    span.className = "close";                                        
    span.appendChild(icon);                                         
    listItems[i].appendChild(span);                                 
}

// class'ı close olan itemler
let close = document.getElementsByClassName("close");

// Close'a tıklayınca item kaybolsun
for (let i = 0; i < close.length; i++) {                                            
    close[i].onclick = function () {                                               
        let div = this.parentElement;                                              
        div.style.display = "none";                                                

        //Item'ı localstorage'dan silme
        const contentText = div.textContent;                                        
        const contentTextWithSlice = contentText.slice(0, contentText.length - 2);   

        let todos = JSON.parse(localStorage.getItem("todos"));                      
        todos = todos.filter(item => item.text != contentTextWithSlice);             
        localStorage.setItem("todos", JSON.stringify(todos))                     
    }
}

// Yeni element ekleme 
function newElement() {
    let newLi = document.createElement("li");                                   
    let inputValue = document.getElementById("task").value;                         
    let text = document.createTextNode(inputValue);                          
    newLi.appendChild(text);                                                
    if (inputValue != "" && inputValue.trim(" ").length != 0) { 
      $(".success").toast("show");                                               
        allList.appendChild(newLi);  
        let span = document.createElement("span");                                      
    let icon = document.createTextNode("x");                                      
    span.className = "close";                                                       
    span.appendChild(icon);                                                        
    newLi.appendChild(span);  
                                                       
    } else {
      $(".error").toast("show");                                          
    }
    document.getElementById("task").value = "";                                     


    // close'a tıklayınca item kaybolsun
    for (let i = 0; i < close.length; i++) {                                       
        close[i].onclick = function () {                                           
            let div = this.parentElement;                                           
            div.style.display = "none";                                            
        }
    }

    const todo = {
        text: inputValue,
        isChecked: false
    }
    // Yeni eklene item'ı localstorage'a ekleme 
    const todos = JSON.parse(localStorage.getItem("todos"));                       
    if(todo.text.length != 0){
      todos.push(todo); 
    }
                                                                 
    localStorage.setItem("todos", JSON.stringify(todos));    
                         
}

//Yeni item ekleme 
var input = document.getElementById("task");                                

input.addEventListener("keyup", function (event) {                          
    if (event.key === 'Enter') {                                                                                               
        event.preventDefault();                                            
        document.getElementById("liveToastBtn").click();                    
    }
});

//Checked yapma 
allList.addEventListener(
    "click",                                                                
    function (event) {                                                      
        if (event.target.tagName === "LI") {                                
            event.target.classList.toggle("checked");                    

            const contentText = event.target.textContent;                                   
            const contentTextWithSlice = contentText.slice(0, contentText.length - 2);       


            // Item checked olduğunda localdeki item'ı da checked yapma
            if (event.target.classList.contains("checked") == true) {
                const todos = JSON.parse(localStorage.getItem("todos"));
                todos.forEach(element => {
                    if (element.text == contentTextWithSlice) {
                        element.isChecked = true;
                    };
                    
                });
                localStorage.setItem("todos", JSON.stringify(todos));
            }else if(event.target.classList.contains("checked") == false){
                const todos = JSON.parse(localStorage.getItem("todos"));
                todos.forEach(element => {
                    if (element.text == contentTextWithSlice) {
                        element.isChecked = false;
                    };
                    
                });
                localStorage.setItem("todos", JSON.stringify(todos));
            }
        }
    },
    false                                                                               
);
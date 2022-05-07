console.log("is this woking???");

// class of book 
class Book{

    constructor(givenBookName,givenAuthorName,givenType){
        this.name=givenBookName;
        this.author=givenAuthorName;
        this.type=givenType;
        this.issuedTo="None";
    }

}

class Display{

    add(newBook){
        // console.log('add function running');
        let storedFiles=localStorage.getItem("files");
        let bookArrayObj=[];
        if(storedFiles===null){
            bookArrayObj=[];
        }
        else{
            bookArrayObj=JSON.parse(storedFiles);
        }
        bookArrayObj.push(newBook);
        localStorage.setItem("files",JSON.stringify(bookArrayObj));
        this.displayAll();
        this.show("success", "Your Book Was Successfully Added!!!");
        this.clear();
    }

    clear(){
        // console.log("clear running");
        let libraryForm=document.getElementById("mainForm");
        libraryForm.reset();
    }

    validate(newBook){
        if(newBook.name.length>2 && newBook.author.length>2){
            return true;
        }
        return false;
    }

    show(messageType,messageContent){
        let message = document.getElementById('message');
        let boldText;
        if(messageType==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${messageType} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${messageContent}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = '';
        }, 5000);
    }

    static displayAll(){
        // console.log("in display all");
        let storedFiles=localStorage.getItem("files");
        let bookArrayObj=[];
        if(storedFiles===null){
            bookArrayObj=[];
        }
        else{
            bookArrayObj=JSON.parse(storedFiles);
        }
        let html="";
        bookArrayObj.forEach(function(element,index){
            html+=`<tr>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" id="${index}" onclick="deleteBook(this.id)" class="btn btn-danger">DELETE</button>
                            </div>
                        </td>
                    </tr>`;
        });
        let mainTableBody=document.getElementById("mainTableBody");
        if(bookArrayObj.length===0){
            mainTableBody.innerHTML=`No Book Added Yet`;
        }
        else{
            mainTableBody.innerHTML=html;
        }
    }
}

Display.displayAll();

let libraryFormSubmit=document.getElementById("mainForm");
libraryFormSubmit.addEventListener("submit",libraryFormSubmitFunction);

function libraryFormSubmitFunction(e) {
    let name=document.getElementById("bookName").value;
    let author=document.getElementById("author").value;
    let fiction=document.getElementById("fiction");
    let science=document.getElementById("science");
    let math=document.getElementById("math");
    let type;
    if(fiction.checked){
        type=fiction.value;
    }
    else if(science.checked){
        type=science.value;
    }
    else{
        type=math.value;
    }
    let newBook= new Book(name,author,type);
    let newDisplay= new Display();
    // newDisplay.add(newBook);
    if(newDisplay.validate(newBook)){
        newDisplay.add(newBook);
    }
    else{
        newDisplay.show("danger", "Sorry You Cannot Add This Book!!!");
    }
    e.preventDefault();
}


function deleteBook(index) {
    let storedFiles=localStorage.getItem("files");
    let bookArrayObj = JSON.parse(storedFiles);
    bookArrayObj.splice(index,1);
    localStorage.setItem("files",JSON.stringify(bookArrayObj));
    Display.displayAll();
}
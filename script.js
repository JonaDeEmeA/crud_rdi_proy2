//let row = null;
let labels = ["N°Ficha", "Especialidad", "Descripcion", "Responsable", "Estado"];
let $tBody = document.getElementById("dataRdi");



function addRDI() {

  let inputData = retriveData();
  let readData = readDataLocalStorage(inputData);
  addInTable(readData);
  editarEntrada();
  
  
  
  
  
  
  
  let $Formulario = document.querySelector("#Modal");
  $Formulario.reset();

}

let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", (e)=>{
  let $Formulario = document.querySelector("#Modal");
  $Formulario.reset();
})

let btnGuardar = document.getElementById("btn.add");
btnGuardar.addEventListener("click", addRDI);


let dato = editarEntrada();
let btnActualizar = document.getElementById("btn.act");
btnActualizar.addEventListener("click", ()=>actualizarEntrada(dato));


function retriveIds(collecion) {

  let arrIds0 = Array.from(collecion);

  let arrIds1 = arrIds0.map((e) => {
    return e.getAttribute("id");
  })

  return arrIds1;
}


// CREACION
// Se crea un arr de los ids de cada Label del modal
let $lstLabelAdd = document.getElementsByName("Agregar");
let lstIdsLabel = retriveIds($lstLabelAdd);

let $lstLabelEdit = document.getElementsByName("edit");
let arrIdsLabelEdit = retriveIds($lstLabelEdit);



//Devuelve un arr con los datos ingresados en el modal
function retriveData() {

  let arrInputId = lstIdsLabel.map((e) => {
    return document.getElementById(e).value;
  })

  return arrInputId;

}


//---LECTURA
function readDataLocalStorage(inputData) {



  let arrInputDevueltoDB = [];

  for (let i = 0; i < inputData.length; i++) {
    localStorage.setItem(labels[i], inputData[i]);
  }

  for (let i = 0; i < inputData.length; i++) {
    let getDatoDB = localStorage.getItem(labels[i]);
    arrInputDevueltoDB.push(getDatoDB);
  }
  return arrInputDevueltoDB;

}

function creaBtn() {



  let newBtnEdit = document.createElement("button");
  let $lstInput = document.querySelectorAll("tbody > tr");


  //se crean los botones con atributos a la ultima celda creada
  newBtnEdit.innerText = "Editar"
  newBtnEdit.setAttribute("class", "btn btn-secondary col-6 ")
  newBtnEdit.setAttribute("type", "button")
  newBtnEdit.setAttribute("data-bs-target", "#contenedor-editar");
  newBtnEdit.setAttribute("data-bs-toggle", "modal");
  newBtnEdit.setAttribute("id", `btnEditar${$lstInput.length}`);


  let newBtnDel = document.createElement("button");
  newBtnDel.innerText = "Eliminar"
  newBtnDel.setAttribute("class", "btn btn-warning col-6")
  newBtnDel.setAttribute("onClick", "deleteData(this)")
  
  let lstBtn = [newBtnEdit, newBtnDel]
  return lstBtn;



}


let $lstInput = document.querySelectorAll("tbody > tr");

// INSERTAR EN TABLA
function addInTable(readData) {

  let $tableref = document.getElementById("dataRdi");
  let newRow = $tableref.insertRow();

  //Se genera el dato N°RDI dinamicamente en la celda 0
  let $lstInput = document.querySelectorAll("tbody > tr");
  newRow.insertCell(0).innerHTML = $lstInput.length;





  //Se agrega los datos de localDB a la tabla
  for (let i = 0; i < readData.length; i++) {

    newRow.insertCell(i + 1).innerHTML = readData[i];

  }

  // se agrega una celda individual para alojar a los botones
  let newCell = newRow.insertCell(6);


  let newBtns = creaBtn();
  newCell.appendChild(newBtns[0]);
  newCell.setAttribute("class", "row justify-content-center m-0");


  newCell.appendChild(newBtns[1]);

 

}



//---EDITAR


function editarEntrada() {

  let $lstNewBtn = document.querySelectorAll("button.btn-secondary");
  let arrIdsNewbtn = retriveIds($lstNewBtn);
  
  
  
   for (let j = 0; j < $lstNewBtn.length; j++) {
    
    

      //celda almacena las celdas de la row indicada
      let celda = $tBody.rows[j].cells;
      $lstNewBtn[j].addEventListener("click", ( e )=>{

          
        
        
        
        for (let i = 0; i < arrIdsLabelEdit.length; i++) {

          document.getElementById(arrIdsLabelEdit[i]).value = celda[i + 1].innerText;        
        }

        
      })

    
  }
   
  
  
   
  
}


/*function getRowIndex(){

  let $lstNewBtn = document.querySelectorAll("button.btn-secondary");
  for (let j = 0; j < $lstNewBtn.length; j++) {
    
    
    $lstNewBtn[j].addEventListener("click", ( e )=>{

        
      let eltr = e.currentTarget.parentElement.parentElement.rowIndex;
      console.log(eltr);

      
    })

  return eltr;
}

}*/




function actualizarEntrada(index) {
  let $lstNewBtn = document.querySelectorAll("button.btn-secondary");
  let arrIdsNewbtn = retriveIds($lstNewBtn);   

      //se row2 almacena las celdas de la row indicada
      
      
        let celda = $tBody.rows[index-1].cells;

        for (let i = 0; i < arrIdsLabelEdit.length; i++) {
          
           
          celda[i + 1].innerText = document.getElementById(arrIdsLabelEdit[i]).value;
          
        }
      
        console.log("paso");
}


function deleteData(btnDel){
  
  btnDel.parentElement.parentElement.remove();
};

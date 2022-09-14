//let row = null;

function addRDI() {

  let inputData = retriveData();
  let readData = readDataLocalStorage(inputData);
  addInTable(readData);
  
  


}




// CREACION
// Se recupera los datos del formulario
function retriveData() {

  let $lstLabel = document.querySelectorAll("input.form-control, textarea.form-control");

  let arrIds0 = Array.from($lstLabel);

  let arrIds1 = arrIds0.map((e) => {
    return e.getAttribute("id");
  })

  let arrInputId = arrIds1.map((e) => {
    return document.getElementById(e).value;
  })

  return arrInputId;
}



//---LECTURA
function readDataLocalStorage(inputData) {

  let labels = ["N°RDI", "N°Ficha", "Especialidad","Descripcion", "Responsable", "Estado" ]

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


// INSERTAR EN TABLA
function addInTable(readData){

  let tableref = document.getElementById("Tabla");
  let newRow =  tableref.insertRow();

  for (let i = 0; i < readData.length; i++) {
    
      newRow.insertCell(i).innerHTML= readData[i];
    
  }

  let newCell = newRow.insertCell(6);
  
  let newBtnEdit = document.createElement("button");
  newBtnEdit.innerText = "Editar"
  newBtnEdit.setAttribute("class", "btn btn-secondary col-6 ")
  newCell.appendChild(newBtnEdit);
  newCell.setAttribute("class", "row justify-content-center m-0");

  let newBtnDel = document.createElement("button");
  newBtnDel.innerText = "Eliminar"
  newBtnDel.setAttribute("class", "btn btn-warning col-6")
  newCell.appendChild(newBtnDel);

  
  newBtnEdit.addEventListener("click", editarEntrada);

  
}

  l
//---EDITAR
function editarEntrada(){
  alert("test click")
}

//let row = null;
let labels = ["N°Ficha", "Especialidad", "Descripcion", "Responsable", "Estado"];



function addRDI() {

  let inputData = retriveData();
  let readData = readDataLocalStorage(inputData);
  addInTable(readData);


  let $Formulario = document.querySelector("#Modal");
  $Formulario.reset();


}

let btnGuardar = document.getElementById("btn.add");
btnGuardar.addEventListener("click", addRDI);


function retriveIds(collecion) {

  let arrIds0 = Array.from(collecion);

  let arrIds1 = arrIds0.map((e) => {
    return e.getAttribute("id");
  })

  return arrIds1;
}


// CREACION
// Se crea un arr de los ids de cada Label del modal
let $lstLabel = document.querySelectorAll("input.form-control, textarea.form-control");
let lstIdsLabel = retriveIds($lstLabel);



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
  newBtnEdit.setAttribute("data-bs-target", "#contenedor-modal");
  newBtnEdit.setAttribute("data-bs-toggle", "modal");
  newBtnEdit.setAttribute("id", `btnEditar${$lstInput.length}`);


  let newBtnDel = document.createElement("button");
  newBtnDel.innerText = "Eliminar"
  newBtnDel.setAttribute("class", "btn btn-warning col-6")
  //newBtnEdit.addEventListener("click", editarEntrada());
  let lstBtn = [newBtnEdit, newBtnDel]
  return lstBtn;



}


let $lstInput = document.querySelectorAll("tbody > tr");

// INSERTAR EN TABLA
function addInTable(readData) {

  let tableref = document.getElementById("dataRdi");
  let newRow = tableref.insertRow();

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

  newBtns[0].addEventListener("click", editarEntrada);

}






//---EDITAR
function editarEntrada() {

  let $lstNewBtn = document.querySelectorAll("button.btn-secondary");
  let lstIdsNewbtn = retriveIds($lstNewBtn);

  let row = document.getElementById("dataRdi");
  

  for (let j = 0; j < $lstNewBtn.length; j++) {
    
    if (lstIdsNewbtn[j].endsWith(j+1) ) {

      console.log(lstIdsNewbtn[0]);

      for (let i = 0; i < lstIdsLabel.length; i++) {
        let row2 = row.rows[i].cells;
        document.getElementById(lstIdsLabel[i]).value = row2[i + 1].innerText;

      }
    }else{console.log("no paso")}


  }














}



function Actualizar() {

  for (let i = 0; i < labels.length; i++) {
    row.cells[i].innerHTML = document.getElementById([i]).value;

  }

}
//metodo que realiza consumo al api get
let drawTable = () => {
    fetch('http://localhost:3000/api/hotel', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            renderTable(data)
        })
}

drawTable();


let renderTable = (data) => {
    const table = document.querySelector('.table')
    
    var bodytable = document.createElement('tbody');
    bodytable.className = "tbody"
    table.appendChild(bodytable);

    for (var i = 1; i < data.length; i++) {

        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5= document.createElement('td');
       

        var text1 = document.createTextNode(data[i].nombre);
        var text2 = document.createTextNode(data[i].clase);
        var text3 = document.createTextNode(data[i].hospedaje);
        var text4 = document.createTextNode(data[i].habitacion);
        var text5= document.createTextNode(data[i].incluye);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);
       
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
       

        bodytable.appendChild(tr);
    }

}



let createItem = () => {

    const nombre = document.querySelector('#nombre').value
    const clase = document.querySelector('#clase').value
    const hospedaje = document.querySelector('#hospedaje').value
    const habitacion= document.querySelector('#habitacion').value
    const incluye = document.querySelector('#incluye').value


    let newhotel = {
        "nombre": nombre,
        "clase": clase,
        "hospedaje":hospedaje,
        "habitacion": habitacion,
        "incluye":incluye

    }

    fetch('http://localhost:3000/api/hotel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newhotel)
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            
            renderResult(true)
        })
        .catch((err) => {
            
            renderResult(false)
        })
}

let renderResult = (result) => {
    const textResult = document.querySelector('#resultado')
    if (result) {
        textResult.textContent = 'Guardado exitosamente'
    } else {
        textResult.textContent = 'Ocurrio un error al guardar'
    }
    
    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    
    const tableBody = document.querySelector('.tbody')
    tableBody.remove();
    
    drawTable();
}

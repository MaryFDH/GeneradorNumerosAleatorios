function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

function exportReportToExcel(tableID, filename) {
    let table = document.getElementById(tableID); 
    TableToExcel.convert(table, { 
      name: filename+`.xlsx`, 
      sheet: {
        name: 'Num.Alea-'+filename // sheetName
      }
    });
  }

let numberOfTestsPassedGenMixto = 0;
let numberOfTestsPassedGenMulti = 0;

function playTest(testNumber, idIcon, gen){
    icon = document.getElementById(idIcon);
    icon.src = "assets/checked.png";

    if(gen == 1){
        numberOfTestsPassedGenMulti++;
        if(numberOfTestsPassedGenMulti >= 3){
            document.getElementById('exportarMulti').disabled = false;
        }
    }else if(gen == 0){
        numberOfTestsPassedGenMixto++;
        if(numberOfTestsPassedGenMixto >= 3){
            document.getElementById('exportarMixto').disabled = false;
        }
    }
}

function generar(tipoGenerador,idX,idA,idC,idM,tableId){
    let gen = tipoGenerador;
    let x = parseInt(document.getElementById(idX).value);
    let a = parseInt(document.getElementById(idA).value);
    let c = document.getElementById(idC)?.value ? parseInt(document.getElementById(idC)?.value): -1;
    let m = parseInt(document.getElementById(idM).value);
    if(!gen||!x||!a||!c||!m){
        alert("Deben ser llenados todos los campos!");
        return;
    }
    console.log(gen,x,a,c,m);
    crearTabla(tableId);
}

function crearTabla(tableId){
    let tabla = document.getElementById(tableId);
    for(let i=0; i<20; i++){
        var hilera = document.createElement("tr");
        var celda = document.createElement("td");
        var numeroCelda = document.createTextNode(i/22);
        celda.appendChild(numeroCelda);
        hilera.appendChild(celda);
        tabla.appendChild(hilera);
    }
}
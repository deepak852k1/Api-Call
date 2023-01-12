async function fillTable(url, table) {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    const data = await response.json();
    //console.log(Object.values(data[0]));
    // clear table
    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    // putting headers
    for (const headerText in data[0]) {
        const headerElement = document.createElement("th");
        headerElement.textContent = headerText.charAt(0).toUpperCase() + headerText.slice(1);
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    // adding contents
    for (let i = 0; i < data.length; i++) {
        const obj = Object.values(data[i]);
        const rowElement = document.createElement("tr");
        for (const cellText of obj) {
            if (typeof (cellText) === 'object') {
                const cellElement = document.createElement("td");
                cellElement.textContent = Object.values(cellText);
                rowElement.appendChild(cellElement);
            } else {
                const cellElement = document.createElement("td");
                cellElement.textContent = cellText;
                rowElement.appendChild(cellElement);
            }
        }
        tableBody.appendChild(rowElement);
    }

}

const searchFun = () => {
    let filter = document.querySelector('#myInput').value.toUpperCase();
    let myTable = document.querySelector("table");
    let tr = myTable.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];

        if (td) {
            let textVal = td.textContent || td.innerHTML;
            if (textVal.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }

    }
}


fillTable('https://api.spacexdata.com/latest/history', document.querySelector("table"));
/* eslint-disable no-undef */
function isHTML(str) {
    var doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}

const diffAOA = JSON.parse(document.querySelector("#spread-diff-patch-data").dataset.rawDiffaoa)

const app = document.querySelector('#spread-diff-patch');
const gridElement = document.createElement('div');
gridElement.id = "diff-grid"
const grid = canvasDatagrid({
    parentNode: gridElement,
    editable: false,
});

app.append(gridElement);

grid.style.height = '100%';
grid.style.width = '100%';
grid.data = diffAOA

grid.addEventListener('afterrendercell', function (e) {
    if (isHTML(e.cell.value))
        e.cell.innerHTML = e.cell.value
});
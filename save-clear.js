$("#save").click(function () {
    console.log("save");
    var boxesStored = [];
    var boxConnectionsStored = [];
    allboxs.forEach(box => {
        boxesStored.push(box.ExportBox());
        boxConnectionsStored = boxConnectionsStored.concat(box.ExportConnections());
    });
    console.log({boxes: boxesStored, connection: boxConnectionsStored})
})
$("#clear").click(function () {
    console.log("clear");
    for (var i = allboxs.length - 1; i >= 0; i--) {
        allboxs[i].Delete()
    }
})
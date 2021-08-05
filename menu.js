
async function Data(url = '', method = 'GET') {
    const response = await fetch(url, {
      method: method,
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
    });
    return response.json(); 
}
var allMenuItems = [];
var allboxs = [];
Data("api.php").then(modules => {
    console.log(modules);
    modules.moduler.forEach(module => {
        allMenuItems.push(new MenuItem(module));
    });
    Load(JSON.parse(modules.load));
});
var objectThatIsDragging = null;

function MenuItem(setting) {
    this.setting = setting;
    this.el = $('<div class="drag-drawflow" draggable="true"><span>'+ setting.Name +'</span></div>')
    var that = this;
    this.el.on("dragstart", function (ev) {
        console.log("ondragstart");
        objectThatIsDragging = that;
    });
    $(this.el).appendTo('.col'); 
}
$("#flow").on("drop", function (ev) {
    console.log("ondrop");
    ev.originalEvent.preventDefault();
    console.log(objectThatIsDragging.setting);
    CreateBox(objectThatIsDragging.setting, {x: ev.pageX - 301, y: ev.pageY})
    
})
$("#flow").on("dragover", function (ev) {
    ev.originalEvent.preventDefault();
})

function CreateBox(setting, pos, preloadData = null) {
    allboxs.push(new box(setting, pos, preloadData));
}
function Load(data) {
    //first load all boxes
    data.boxes.forEach(box => {
        var menuItem = GetMenuItem(box.ID);
        if(menuItem != null){
            CreateBox(menuItem.setting, {x: box.x, y: box.y}, {RealId: box.RealId, fields: box.fields});
        }else{
            console.log("noget gik galt, ID:" + box.ID)
        }
    });
    data.connection.forEach(connection => {
        /*connection.FromID
        connection.FromRealId
        connection.ToID
        connection.ToRealId*/
        var fromBox = GetBox(connection.FromRealId);
        if(fromBox != null){
            var toBox = GetBox(connection.ToRealId);
            if(toBox != null){
                var output = fromBox.GetOutput(connection.FromID);
                if(output != null){
                    var input = toBox.GetInput(connection.ToID);
                    if(input != null){
                        input.AddConnection(output);
                        console.log("Done loaded");
        
                    }else{
                        console.log("noget gik galt, 'connection-to-output' ID:" + connection.FromRealId+ " ID: "+ connection.FromRealId);
                    }  
    
                }else{
                    console.log("noget gik galt, 'connection-to-input' ID:" + connection.FromRealId+ " ID: "+ connection.FromRealId);
                }

            }else{
                console.log("noget gik galt, 'connection-to' ID:" + connection.FromRealId);
            }
        }else{
            console.log("noget gik galt, 'connection-from' ID:" + connection.FromRealId);
        }
    });
}
function GetMenuItem(id) {
    var returnValue = null;
    allMenuItems.forEach(menuItem => {
        if(menuItem.setting.ID == id){
            returnValue = menuItem;
            return;
        }
    });
    return returnValue;
}
function GetBox(realId) {
    var returnValue = null;
    allboxs.forEach(box => {
        if(box.preloadId == realId){
            returnValue = box;
            return;
        }
    });
    return returnValue;
}
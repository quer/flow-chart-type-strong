var activeOutput = null;

var unitNumber = 0;

function box(settings, poss, preloadData = null) {
    ++unitNumber;
    this.id = unitNumber;
    if(preloadData != null){ // if preload is not null, then it was added by the import
        this.preloadId = preloadData.RealId;
    }
    this.input = [];
    this.output = [];
    this.field = [];
    this.settings = settings;
    if(this.settings.input){
        for (let i = 0; i < this.settings.input.length; i++) {
            const inputSetting = this.settings.input[i];
            this.input.push(new Input(inputSetting, this))
        }
    }
    if(this.settings.output){
        for (let i = 0; i < this.settings.output.length; i++) {
            const outputSetting = this.settings.output[i];
            this.output.push(new Output(outputSetting, this))
        }
    }
    if(this.settings.field){
        for (let i = 0; i < this.settings.field.length; i++) {
            const fieldSetting = this.settings.field[i];
            var fieldPreLoadData = null;
            if(preloadData && preloadData.fields){
                var preloadDataStored =  preloadData.fields.filter(x => x.fieldID == fieldSetting.ID);
                if(preloadDataStored.length > 0){ // shoud never be more then 1.
                    fieldPreLoadData = preloadDataStored[0];
                }
            }
            this.field.push(new Field(fieldSetting, this, fieldPreLoadData))
        }
    }
    this.el = $(`<div class="draggable flowBox" id="${ this.settings.ID }_${ this.id }"><div class="flow_content_node"><div>
        <div class="title-box">${ this.settings.Name }</div>
        <div class="box box-connection">
        <div class="inputs"></div>
        </div>
        <div class="box box-normal">
            ${ this.settings.Name }
        </div>
        <div class="box box-normal">
            <div class="fields"></div>
        </div>
        <div class="box box-connection">
            <div class="outputs"></div>
        </div>
    </div></div>
    <div class="delete"><div class="mdiv">
        <div class="md"></div>
    </div></div>
    </div>`);
    this.el.css({'left': poss.x, 'top': poss.y})
    if(this.settings.width){
        this.el.css({ 'width': this.settings.width })
    }
    var that = this;
    this.input.forEach(input => {
        $(input.el).appendTo(that.el.find(".inputs")[0]);
    });
    this.output.forEach(output => {
        $(output.el).appendTo(that.el.find(".outputs")[0]);
    });
    this.field.forEach(field => {
        $(field.el).appendTo(that.el.find(".fields")[0]);
    });


    this.el.find(".delete").click(function() {
        console.log("delete");
        that.Delete();
    });

    $(this.el).appendTo('#flow');   
    $(this.el).draggable(
        { drag: function() {
            that.input.forEach(input => {
                if(input.line != null){
                    input.line.position()
                }
            });
            that.output.forEach(output => {
                if(output.line != null){
                    output.line.position()
                }
            });
        }
    });

    this.ExportBox = function () {
        var fieldsExports = [];
        this.field.forEach(field => {
            var fieldExport = field.Export();
            if(fieldExport != null){
                fieldsExports.push(fieldExport);
            }
        });
        return {
            'ID': this.settings.ID,
            'RealId': this.id,
            'x': this.el.css('left'),
            'y': this.el.css('top'),
            'fields': fieldsExports
        }
    }
    this.Delete = function () {
        that.input.forEach(input => {
            input.DeleteConnection();
        });
        that.output.forEach(output => {
            output.DeleteConnection();
        });
        that.el.remove();
        for (let i = 0; i < allboxs.length; i++) {
            const box = allboxs[i];
            if(box.id == that.id){
                allboxs.splice(i, 1);
                break;
            }
        }
    }
    this.ExportConnections = function () {
        var connections = [];
        this.output.forEach(output => {
            if(output.connectedTo != null){
                var obj = {
                    'FromID': output.setting.ID,
                    'FromRealId': output.parentBox.id,
                    'ToID': output.connectedTo.setting.ID,
                    'ToRealId': output.connectedTo.parentBox.id,
                }
                connections.push(obj);
            }
        });
        return connections;
    }
    this.GetInput = function(id) {
        var returnValue = null;
        this.input.forEach(input => {
            if(input.setting.ID == id){
                returnValue = input;
                return;
            }
        });
        return returnValue;
    }
    this.GetOutput = function(id) {
        var returnValue = null;
        this.output.forEach(output => {
            if(output.setting.ID == id){
                returnValue = output;
                return;
            }
        });
        return returnValue;
    }
}

function Input(setting, parentBox) {
    ++unitNumber;
    this.id = unitNumber;
    this.setting = setting;
    this.parentBox = parentBox;
    this.el = $('<div class="input_box"><div class="input" id="'+this.setting.ID+'_'+this.id+'"></div><div class="input_text">'+this.setting.Name+'</div></div>');
    this.allow = this.setting.type;
    this.connectedTo = null;
    this.line = null;
    var that = this;
    this.el.find(".input").click(function() {
        that.AddConnection(activeOutput);
    });
    this.AddConnection = function (output) {
        if(output != null){
            if(output.parentBox != that.parentBox){
                if(that.connectedTo == null){
                    if(output.type == that.allow){
                        that.DeleteConnection()
                        that.connectedTo = output;
                        that.line = new LeaderLine(
                            $("#" + output.setting.ID + "_" + output.id)[0],
                            $("#" + that.setting.ID + "_" + that.id)[0],
                            {startSocket: 'right', endSocket: 'left'}
                        );
                        that.line.position();
                        output.connectedTo = that;
                        output.line = that.line;
                        output.RemoveActiveColor();
                        output = null;
                    }else{
                        alert("Wrong type");
                    }
                }else{
                    alert("allready connected");
                }
            }else{
                alert("can not be connect to it self");
            }
        }else{
            alert("intet output valgt");
        }
    }
    this.DeleteConnection = function () {
        if(that.connectedTo != null){
            var oldConection = that.connectedTo;
            oldConection.connectedTo = null;
            that.connectedTo = null;
            that.line.remove();
            that.line = null;
            oldConection.line = null;
        }
        
    }
}
function Output(setting, parentBox) {
    ++unitNumber;
    this.id = unitNumber;
    this.setting = setting;
    this.parentBox = parentBox;
    this.el = $('<div class="output_box"><div class="output" id="'+this.setting.ID+'_'+this.id+'"></div><div class="output_text">'+this.setting.Name+'</div></div>');
    this.type = this.setting.type;
    this.connectedTo = null;
    this.line = null;
    var that = this;
    this.el.find(".output").click(function() {
        if(activeOutput != null){
            activeOutput.RemoveActiveColor();
        }
        if(activeOutput != that)
        {
            activeOutput = that;
            activeOutput.SetActiveColor();   
        }else {
            that.DeleteConnection();
        }
    });
    this.DeleteConnection = function () {
        if(that.connectedTo != null){
            var oldConection = that.connectedTo;
            oldConection.connectedTo = null;
            that.connectedTo = null;
            that.line.remove();
            that.line = null;
            oldConection.line = null;
            activeOutput = null;
        }
    }
    this.SetActiveColor = function () {
        this.el.find(".output").css({'background-color': 'red'});
    }
    this.RemoveActiveColor = function () {
        this.el.find(".output").css({'background-color': ''});
        
    }
}


function Field(setting, parentBox, preLoadData = null) {
    ++unitNumber;
    this.id = unitNumber;
    this.setting = setting;
    this.parentBox = parentBox;
    this.elId = this.setting.ID+'_'+this.id;
    this.el = $('<div class="field_box" id="'+this.elId+'"></div>');
    this.fieldEl = null;
    if(this.setting.type == "checkbox"){
        this.fieldEl = new Field_checkbox(this.setting, preLoadData);
    }else if(this.setting.type == "input"){
        this.fieldEl = new Field_input(this.setting, preLoadData);
    }else if(this.setting.type == "radio"){
        this.fieldEl = new Field_radio(this.setting, preLoadData);
    }

    if(this.fieldEl != null){
        $(this.fieldEl.el).appendTo(this.el);
    }

    this.Export = function () {
        if(this.fieldEl != null)
            return this.fieldEl.Export();
        return null;
    }
}
function Field_radio(setting, preLoadData = null) {
    this.setting = setting;
    var inputHtml = `${this.setting.text}<br>`;
    for (let i = 0; i < this.setting.values.length; i++) {
        const checkboxValue = this.setting.values[i];
        var preloadHtml = "";
        if(preLoadData && preLoadData.checked == i){
            preloadHtml = ` checked="checked"`;
        }
        inputHtml += `<input type="radio" id="${this.setting.ID}_${i}" name="${this.setting.ID}" value="${i}" ${preloadHtml}>
        <label for="${this.setting.ID}_${i}">${checkboxValue}</label><br>`;
    }

    this.el = $(`<div>${inputHtml}</div>`);

    this.Export = function () {
        for (let i = 0; i < this.setting.values.length; i++) {
            var radioGui = this.el.find(`#${this.setting.ID}_${i}`);
            if(radioGui.is(':checked')){
                return {'fieldID': this.setting.ID, 'checked': i};
            }
        }
        return null;
    }
}
function Field_input(setting, preLoadData = null) {
    this.setting = setting;
    var preloadHtml = "";
    if(preLoadData && preLoadData.value != ""){
        preloadHtml = ` value="${preLoadData.value}"`;
    }
    var inputHtml = `<label for="${this.setting.ID}">${this.setting.text}</label>
        <input type="text" id="${this.setting.ID}" ${preloadHtml}><br>`;

    this.el = $(`<div>${inputHtml}</div>`);

    this.Export = function () {
        var inputGui = this.el.find(`#${this.setting.ID}`);
        if(inputGui.val() != ""){
            return {'fieldID': this.setting.ID, 'value': inputGui.val()};
        }
        return null;
    }
}
function Field_checkbox(setting, preLoadData = null) {
    this.setting = setting;
    var inputHtml = `${this.setting.text}<br>`;
    for (let i = 0; i < this.setting.values.length; i++) {
        const checkboxValue = this.setting.values[i];
        var preloadHtml = "";
        if(preLoadData && preLoadData.checked.includes(i)){
            preloadHtml = ` checked`;
        }
        inputHtml += `<input type="checkbox" id="${this.setting.ID}_${i}" value="${i}" ${preloadHtml}>
        <label for="${this.setting.ID}_${i}">${checkboxValue}</label><br>`;
    }

    this.el = $(`<div>${inputHtml}</div>`);
    
    this.Export = function () {
        var checkedList = [];
        for (let i = 0; i < this.setting.values.length; i++) {
            var checkBoxGui = this.el.find(`#${this.setting.ID}_${i}`);
            if(checkBoxGui.is(':checked')){
                checkedList.push(i)
            }
        }
        if(checkedList.length > 0){
            return {'fieldID': this.setting.ID, 'checked': checkedList};
        }
        return null;
    }
}
var activeOutput = null;

var unitNumber = 0;

function box(settings, poss, preloadId = null) {
    ++unitNumber;
    this.id = unitNumber;
    if(preloadId != null){ // if preload is not null, then it was added by the import
        this.preloadId = preloadId;
    }
    this.input = [];
    this.output = [];
    this.settings = settings;
    if(this.settings.input){
        for (let i = 0; i < this.settings.input.length; i++) {
            const input = this.settings.input[i];
            this.input.push(new Input(input, this))
        }
    }
    if(this.settings.output){
        for (let i = 0; i < this.settings.output.length; i++) {
            const output = this.settings.output[i];
            this.output.push(new Output(output, this))
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
        <div class="box box-connection">
            <div class="outputs"></div>
        </div>
    </div></div>
    <div class="delete"><div class="mdiv">
        <div class="md"></div>
    </div></div>
    </div>`);
    this.el.css({'left': poss.x, 'top': poss.y})
    var that = this;
    this.input.forEach(input => {
        $(input.el).appendTo(that.el.find(".inputs")[0]);
    });
    this.output.forEach(output => {
        $(output.el).appendTo(that.el.find(".outputs")[0]);
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
        return {
            'ID': this.settings.ID,
            'RealId': this.id,
            'x': this.el.css('left'),
            'y': this.el.css('top')
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
        activeOutput = null;
    });
    this.AddConnection = function (output) {
        if(output != null){
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
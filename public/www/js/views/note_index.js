(function () {
  "use strict";
  APP.NoteIndexView = Backbone.View.extend({
    // the constructor
    initialize: function (options) {
      // model is passed through
      this.notes = options.notes;
      this.notes.bind('reset', this.addAll, this);
    },

    // populate the html to the dom
    render: function () {
      this.$el.html($('#indexTemplate').html());
      this.addAll();
      return this;
    },

    addAll: function () {
      // clear out the container each time you render index
      this.$el.find('tbody').children().remove();
      _.each(this.notes.models, $.proxy(this, 'addOne'));
    },

    addOne: function (note) {



require(["jquery","underscore","backbone","ufi.core", "ufi.frameGen","ufi.xml","ufi.validate",], function($, _, backbone,uficore,ufiframegen,ufixml,ufivalidate) {

       
      try
      {



        var CurrNoteJson=note.toJSON();
     
      var resourceJson= note.get("resourceJson")  ;
    var recSch=CurrNoteJson.schemaJson;

    var rec=CurrNoteJson.dfltJson;
    
 

    var listValJson =CurrNoteJson.listValJson;
    var us= new ufiframegen.FG();
    var func="N";

var commonHeader="";
   commonHeader="require([\"jquery\",\"ufi.core\", \"ufi.frameGen\",\"ufi.xml\",\"ufi.validate\"], function($,uficore,ufiframegen,ufixml,ufivalidate) { var us = new ufiframegen.FG(); var USSContainer0 =    us.USSCreateContainer(); var USSHeader    = ''";
        

        
     var vcommonFrameGen =us.frameGeneration(eval("listValJson[0]."+ recSch[0].name) 
                                              ,eval("resourceJson[0]."+ recSch[0].name)
                                              ,eval("rec[0]."+recSch[0].name) 
                                              ,recSch[0].childs
                                              ,recSch[0]
                                              ,0
                                              ,func
                                              ,0
                                          );
        
        
var commonTailer=" document.getElementById('FrameId').appendChild(USSContainer0);  \n } );"
//commonTailer+="\n document.getElementById('FrameId').appendChild(USSContainer0); });";

//var vcommonFrameGen="require([\"jquery\",\"ufi.core\", \"ufi.frameGen\",\"ufi.xml\",\"ufi.validate\"], function($,uficore,ufiframegen,ufixml,ufivalidate) { $(function() { alert('test');})} );"

var script=document.createElement("script");
//scr.appendChild(commonHeader + vcommonFrameGen + commonTailer);
script.type='text/javascript';

script.text=commonHeader + vcommonFrameGen + commonTailer;
document.getElementById('FrameId').appendChild(script);
//this.$el.find("tbody").append(script);
}
catch (e)
{
  alert("index" +e);
}

});
     var view = new APP.NoteRowView({notes: this.notes, note: note});
      this.$el.find("tbody").append(view.render().el);


    }
  });
}());

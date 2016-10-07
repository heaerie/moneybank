(function () {
  "use strict";
  window.APP = window.APP || {};
  APP.NoteRouter = Backbone.Router.extend({
    routes: {
      "note/new": "create",
      "notes/index": "index",
      "notes/delete": "delete",
      "notes/USSEdit": "USSEdit",
      "note/:id/view": "show"
    },

    initialize: function (options) {
      this.notes = options.notes;
      // this is debug only to demonstrate how the backbone collection / models work
      this.notes.bind('reset', this.updateDebug, this);
      this.notes.bind('add', this.updateDebug, this);
      this.notes.bind('remove', this.updateDebug, this);
      this.index();
    },

    updateDebug: function () {
      $('#output').text(JSON.stringify(this.notes.toJSON(), null, 4));
    },

    create: function () {
      this.currentView = new APP.NoteNewView({
        notes: this.notes, note: new APP.NoteModel()
      });

      $('#primary-content').html(this.currentView.render().el);
    },

    edit: function (id) {
      var note = this.notes.get(id);
      this.currentView = new APP.NoteEditView({note: note});
      $('#primary-content').html(this.currentView.render().el);
    },

    show: function (id) {
      var note = this.notes.get(id);
      this.currentView = new APP.NoteShowView({
        note: note
      });
      $('#primary-content').html(this.currentView.render().el);
    },


      delete: function()
      {
    //    alert("delete");
       $('#primary-content').html("<div id=\"FrameId\"> </div>");

      }
      ,
      USSEdit:function()
      {

  alert("edit");
         this.ussTable = document.createElement("div");
  this.ussTable.id = 'FrameId';
  this.ussTable.className = 'container';
  this.ussTable.border=0;

        $('#primary-content').html(this.ussTable);

      
//USSNoteEditView
this.currentView = new APP.USSNoteEditView({
        notes: this.notes
      });
      //$('#primary-content').html(this.currentView.render().el);


       // alert("edit");
     //  $('#primary-content').html("edit");
       //window.location.hash = "notes/index";

      }
      ,
    index: function () {
      this.currentView = new APP.NoteIndexView({
        notes: this.notes
      });
      $('#primary-content').html(this.currentView.render().el);
      // we would call to the index with
      // this.notes.fetch()
      // to pull down the index json response to populate our collection initially
    }
  });
}());

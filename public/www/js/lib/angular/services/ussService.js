define([],function($rootScope){

  var ussInstance=function()
  {
  	
  };
  // factory function body that constructs shinyNewServiceInstance

 ussInstance.USSField_=function()
{

this.group      = 'USS', /*it has been chabged by durai on 02-Feb-2010*/
this.name       = '',
this.label      = '',
this.task       = 'NONE',
this.desc       = '',
this.htmlType   = 'text', /* newly introduced in USS05*/
this.entitle    = 'READONLY'; // Editable /Readonly
this.enttlname  = ''; //Entitle name to db
this.mndf       = 'N',
this.dataType   = 'VARCHAR',  // NUMBER/VARCHAR/DATE/EMAIL/AMOUNT/LIST/DIV/
this.cclass     = 'ctable',   //
this.parent     = '',
this.validate   = '',
this.dflt       = '',
this.min        = '0',
this.max        = '60',
this.tips       = '',
this.onkeyup    = 'onKeyUp(this);',
this.onchange   = 'onChange(this);',
this.onkeydown  = 'onKeyDown(this);',
this.onkeypress = 'onKeyPress(this);',
this.onclick    = 'onClick(this);',
this.onblure    = 'onBlure(this);',
this.listVal    = '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
this.help       = 'N',
this.helpLink   = 'helpload',
this.xml        = 'Y',
this.xmlname    = '',
this.Xpath      = '/'
	
}


  return ussInstance;
}
);
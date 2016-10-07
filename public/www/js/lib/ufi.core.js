define(function(require, exports, module) {
"use strict";

console.log("require");
console.log(require);
console.log(exports);
console.log(module);
var glUserId="";
var glGroupId="";
var USS=function ()
{
//	alert("USS");

	this.count=0;
	this.version="";
	this.USSScript="";
  this.ContinerCount=1;
	//this.USSBrowserDetail_()
//include system level javascripts
//	this.USSIncludeLinks_("xml.js")
	//this.USSField_()
	this.resourcesPath="";
}

USS.prototype.USSGetScript_= function(script)
{
  USS.version += script;
}

USS.prototype.initCapWord=function (s)
{
    return s[0].toUpperCase() + s.slice(1); //need to fix  thru excpection ####
    return s;
}
USS.prototype.initCap=function (s)
{

	 var new_str = s.split(' '),
        i,
        arr = [];
    for (i = 0; i < new_str.length; i++) {
        arr +=this.initCapWord(new_str[i]);
    }
    return arr;
	
   // return s[0].toUpperCase() + s.slice(1);
}



USS.prototype.USSSetScript_= function()
{
return  USS.version;
}

USS.prototype.USSBrowserDetail_= function()
{
  this.browserIE     = false;
  this.rowserFirefox = false;
  this.browserSafari = false;
  this.location =  ""+  window.location;


	//alert(navigator.userAgent);

  if (navigator.userAgent.indexOf("MSIE") > -1) {
    this.browserIE = true;
  } else if ((navigator.userAgent.indexOf("Firefox/") > -1)) {
    this.browserFirefox = true;
    if ((navigator.userAgent.indexOf("Firefox/1.0.") > -1)) {
      this.browserFirefox10 = true;
    } else {
      this.browserFirefox10 = false;
    }
  } else if (navigator.userAgent.indexOf("Safari") > -1) {
    this.browserSafari = true;
    if (navigator.userAgent.indexOf("Version/") > -1) {
      this.browserSafari3OrHigher = true;
    }
  }
	
}
USS.prototype.USSIncludeScript_=function(filename)
{
//	alert("Include 001");
	try
	{
		if(arguments.length< 1)
		{
			alert('SYS:USSIncludeScript_:Argument is must for this function');
			return false;
		}
		else if (filename.length== 0)
		{
			alert('SYS:USSIncludeScript_: filename is can be null');
		}

		var el = document.createElement('script');
	//	el.src = this.resourcesPath + "/javascript/" + filename;
		el.src =  "../javascript/" + filename;
		//el.href = filename;
	//	alert(" filename= <" +  filename + ">");
		el.type = 'javascrupt';
	//	el.rel = 'stylesheet';
		document.getElementsByTagName('head').item(0).appendChild(el);
	}
	catch(e)
	{
		alert("APPUINLException:"+ e);
	}

//	alert("Include 002");
}


USS.prototype.USSIncludeLinks_=function(filename)
{
//	alert("Include 001");
	try
	{
		if(arguments.length< 1)
		{
			alert('SYS:USSIncludeLinks_:Argument is must for this function');
			return false;
		}
		else if (filename.length== 0)
		{
			alert('SYS:USSIncludeLinks_: filename is can be null');
		}

		var el = document.createElement('link');
		//el.href = this.resourcesPath + "styles/" + filename;
		el.href = filename;
		//alert(" filename= <" +  filename + ">");
		el.type = 'text/css';
		el.rel = 'stylesheet';
		document.getElementsByTagName('head').item(0).appendChild(el);
	}
	catch(e)
	{
		alert("APPUINLException:"+ e);
	}

	//alert("Include 002");
}

USS.prototype.USSField_=function()
{

this.group      = 'USS', /*it has been changed by author on 02-Feb-2010*/
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
this.parentHtmlType     = '',
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
this.Xpath      = '/' ,
this.maxCol     = '1',
this.col        = '0'
	
}
USS.prototype.USSCreareTab_=function()
{
	
  this.searchResultsEl                = document.createElement("div");
  this.searchResultsEl.id             = 'searchAsYouTypeResults1';
  this.searchResultsEl.className      = 'searchResults';
 // this.searchResultsEl.style.display  = 'none'; 
 //this.searchResultsEl.style.position = 'absolute'; 
 //this.searchResultsEl.onclick        = 'event.cancelBubble = true;';
  this.searchResultsEl.tabIndex       = -1;

	
}



USS.prototype.USSCreateContainer=function()
{
	//alert('In USSCreateContainer ');
  this.El                = document.createElement("div");
  this.El.id             = '';
  this.El.className      = 'bcontainer';
 // this.El.style.display  = 'none'; 
 // this.El.style.position = 'absolute'; 
 // this.El.onclick        = 'event.cancelBubble = true;';
  this.El.tabIndex       = -1;
  return this.El;
	
}


USS.prototype.USSCreateHeader=function(title)
{
	
  this.El                = document.createElement("div");
  this.El.id             = '';
  this.El.className      = 'bheader';
//this.El.style.display  = 'none'; 
//this.El.style.position = 'absolute'; 
//this.El.onclick        = 'event.cancelBubble = true;';
  this.El.tabIndex       = -1;
  this.ElA               = document.createElement("a");
  this.newContent = document.createTextNode(title);
  this.ElA.appendChild(this.newContent );
  this.El.appendChild(this.ElA );
  return this.El;
	
}


USS.prototype.USSCreateHeader=function(title, action,name)
{
	
  this.El                = document.createElement("div");
  this.El.id             = '';
  this.El.className      = 'bheader';
//this.El.style.display  = 'none'; 
//this.El.style.position = 'absolute'; 
//this.El.onclick        = 'event.cancelBubble = true;';
  this.El.tabIndex       = -1;
  this.ElA               = document.createElement("a");
  this.newContent = document.createTextNode(title);
  this.ElA.appendChild(this.newContent );
  
  if(action.indexOf("E")!= -1)
  {


   this.ElEditButtonE                 = document.createElement("a");
   this.ElEditButtonE.className       = "bheaderButton";
   this.ElEditButtonE.value           = "EDIT" ;
   this.ButtonLabelE 				  = document.createTextNode("EDIT");
   //this.ElEditButtonE.setAttribute("href","#notes/USSEdit");
  // this.ElEditButtonE.setAttribute("href","#"+name +"/USSEdit");
   this.ElEditButtonE.setAttribute("ng-click","basicDetEditSave()");
   
  // this.ElEditButtonE.setAttribute("href","#notes/USSEdit");
   this.ElEditButtonE.appendChild(this.ButtonLabelE);
   this.El.appendChild(this.ElEditButtonE );
}


if(action.indexOf("A")!=-1)
  {

//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("a");
   this.ElEditButton.className       = "bheaderButton btn ";
   this.ElEditButton.value          = "DELETE" ;
  // this.ElEditButton.setAttribute("href","#notes/delete");
   this.ElEditButton.setAttribute("href","#"+name +"/USSAdd");
   this.ButtonLabel 				= document.createTextNode("ADD");
   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );
}
 



//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("a");
   this.ElEditButton.className       = "bheaderButton btn ";
   this.ElEditButton.value          = "CANCEL" ;
  // this.ElEditButton.setAttribute("href","#notes/delete");
   this.ElEditButton.setAttribute("href","#/dashboard/");
   this.ButtonLabel 				= document.createTextNode("CANCEL");

   this.fontawesome = document.createElement('i');
   this.fontawesome.className       = "fa fa-repeat";
  
   this.ElEditButton.appendChild(this.fontawesome);
   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );


  this.El.appendChild(this.ElA );
  
  return this.El;
	
}

USS.prototype.USSCheckMode=function(mode, inpMode)
{


if ( mode === undefined)
{

}
else
{
  var modeArr= mode.split('|');
  for(var i=0; i<modeArr.length; i++ )
  {
    if( modeArr[i]== inpMode)
    {
      return true;
    }
  }
}

  return false;
}


USS.prototype.USSCreateHeader=function(title, action,name, mode)
{
	
  this.El                = document.createElement("div");
  this.El.id             = '';
  this.El.className      = 'bheader';
//this.El.style.display  = 'none'; 
//this.El.style.position = 'absolute'; 
//this.El.onclick        = 'event.cancelBubble = true;';
  this.El.tabIndex       = -1;
  this.ElA               = document.createElement("a");
  this.newContent = document.createTextNode(title);
  this.ElA.appendChild(this.newContent );

  if( this.USSCheckMode(mode ,"EDIT")  || this.USSCheckMode(mode , "FULL"))
  {
  
  	if(action.indexOf("E")!= -1)
  	{


   this.ElEditButtonE                 = document.createElement("button");
   this.ElEditButtonE.className       = "bheaderButton btn";
   this.ElEditButtonE.value           = "EDIT" ;
   this.ButtonLabelE 				  = document.createTextNode("EDIT");
   //this.ElEditButtonE.setAttribute("href","#notes/USSEdit");
  // this.ElEditButtonE.setAttribute("href","#"+name +"/USSSave");
   this.ElEditButtonE.setAttribute("ng-click","goUrl('"+name +"USSSave')");
   
  // this.ElEditButtonE.setAttribute("href","#notes/USSEdit");
   
this.fontawesome = document.createElement('i');
   this.fontawesome.className       = "fa fa-pencil-square-o";
  
   this.ElEditButtonE.appendChild(this.fontawesome);
   this.ElEditButtonE.appendChild(this.ButtonLabelE);
   this.El.appendChild(this.ElEditButtonE );
}

}


 if(  this.USSCheckMode(mode , "SAVE") )
  {
  
  	if(action.indexOf("E")!= -1)
  	{


   this.ElEditButtonE                 = document.createElement("a");
   this.ElEditButtonE.className       = "btn bheaderButton";
   this.ElEditButtonE.value          = "SAVE" ;
   this.ButtonLabelE 				= document.createTextNode("SAVE");
    //this.ElEditButtonE.setAttribute("href","#notes/USSEdit");
  // this.ElEditButtonE.setAttribute("href","#"+name +"/USSEdit");

  this.ElEditButtonE.setAttribute('ng-click', name+'EditSave()');
   this.fontawesome = document.createElement('i');
   this.fontawesome.className       = "fa fa-floppy-o";
  
   this.ElEditButtonE.appendChild(this.fontawesome);
   this.ElEditButtonE.appendChild(this.ButtonLabelE);
   

   this.El.appendChild(this.ElEditButtonE );
}

}

if( this.USSCheckMode(mode , "ADD") )
{

if(action.indexOf("A")!=-1)
  {

//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("button");
   this.ElEditButton.className       = "bheaderButton btn ";
   this.ElEditButton.value          = "DELETE" ;
 	//this.ElEditButton.setAttribute("href","#");
   //this.ElEditButton.setAttribute("ng-click","goUrl('"+name +"USSAdd')");
   this.ElEditButton.setAttribute("ng-click",""+name +"USSAdd()");
   this.ButtonLabel 				= document.createTextNode("ADD");

   this.fontawesome = document.createElement('i');
   this.fontawesome.className       = "fa fa-plus-square-o";
  
   this.ElEditButton.appendChild(this.fontawesome);
   

   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );
}
 
 }

if(this.USSCheckMode(mode , "NEW") || this.USSCheckMode(mode ,  "FULL"))
{

if(action.indexOf("A")!=-1)
  {

//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("button");
   this.ElEditButton.className       = "bheaderButton btn ";
   this.ElEditButton.value          = "DELETE" ;
 	//this.ElEditButton.setAttribute("href","#");
   this.ElEditButton.setAttribute("ng-click","goUrl('"+name +"USSAdd')");
   this.ButtonLabel 				= document.createTextNode("NEW");

   this.fontawesome = document.createElement('i');
   this.fontawesome.className       = "fa fa-plus-square-o";
  
   this.ElEditButton.appendChild(this.fontawesome);
   

   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );
}
 
 }

if( this.USSCheckMode(mode , "ADD") || this.USSCheckMode(mode , "EDIT")   ||this.USSCheckMode(mode , "SAVE") )
{

//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("button");
   this.ElEditButton.className       = "bheaderButton btn";
   this.ElEditButton.value           = "CANCEL" ;
  // this.ElEditButton.setAttribute("href","#notes/delete");
  // this.ElEditButton.setAttribute("href","#/dashboard/");
   this.ElEditButton.setAttribute("ng-click","goUrl('"+name +"USSView')");
   this.ButtonLabel 				= document.createTextNode("CANCEL");

    this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa fa-chevron-left";
  
   this.ElEditButton.appendChild(this.fontawesome);
   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );
}



if( this.USSCheckMode(mode , "REGISTER")  )
{

//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("button");
   this.ElEditButton.className       = "bheaderButton btn";
   this.ElEditButton.value           = "Register" ;
  // this.ElEditButton.setAttribute("href","#notes/delete");
  // this.ElEditButton.setAttribute("href","#/dashboard/");
   this.ElEditButton.setAttribute("ng-click","RegisterUser()");
   this.ButtonLabel         = document.createTextNode("REGISTER");

    this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa fa fa-plus-circle";
  
   this.ElEditButton.appendChild(this.fontawesome);
   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );
}


if( this.USSCheckMode(mode , "SUBMIT")  )
{

//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("button");
   this.ElEditButton.className       = "bheaderButton btn";
   this.ElEditButton.value           = "SUBMIT" ;
  // this.ElEditButton.setAttribute("href","#notes/delete");
  // this.ElEditButton.setAttribute("href","#/dashboard/");
   this.ElEditButton.setAttribute("ng-click","Submit()");
   this.ButtonLabel         = document.createTextNode("SUBMIT");

    this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa fa-hand-pointer-o";
  
   this.ElEditButton.appendChild(this.fontawesome);
   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );
}

if(this.USSCheckMode(mode , "BACK" ) )
{

//<a href="#" class="delete btn btn-danger btn-small">delete</a>
   this.ElEditButton                 = document.createElement("button");
   this.ElEditButton.className       = "bheaderButton btn";
   this.ElEditButton.value           = "Register" ;
  // this.ElEditButton.setAttribute("href","#notes/delete");
  // this.ElEditButton.setAttribute("href","#/dashboard/");
   this.ElEditButton.setAttribute("ng-click","callBack()");
   this.ButtonLabel         = document.createTextNode("BACK");

    this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa fa-chevron-left";
  
   this.ElEditButton.appendChild(this.fontawesome);
   this.ElEditButton.appendChild(this.ButtonLabel);
   this.El.appendChild(this.ElEditButton );
}




  this.El.appendChild(this.ElA );
 

  return this.El;
	
}


USS.prototype.USSCreateSession =function()
{
	
  this.El                = document.createElement("div");
  this.El.id             = '';
  this.El.className      = 'bsession';
  //this.El.style.display  = 'none'; 
  //this.El.style.position = 'absolute'; 
  //this.El.onclick        = 'event.cancelBubble = true;';
  this.El.tabIndex       = -1;
  
  return this.El;
	
}




//alert("import USS end");

USS.prototype.USSCreateTable_=function()
{
	
  this.ussTable = document.createElement("div");
  this.ussTable.id = 'mainTable';
  this.ussTable.className = 'container';
  this.ussTable.border=0;
 // this.ussTable.style.display  = 'none'; 
 // this.ussTable.style.position = 'absolute'; 
 // this.ussTable.onclick = 'event.cancelBubble = true;';
 // this.ussTable.tabIndex = -1;

return this.ussTable;
	
}


USS.prototype.USSAppendTableRow=function(USSTableRow,USSTable)
{

USSTable.appendChild(USSTableRow);

return USSTable;
	
}

USS.prototype.USSAppendTableField=function(USSTableRow,USSTable)
{

USSTable.appendChild(USSTableRow);

return USSTable;
	
}



USS.prototype.USSCreateTableRow_=function()
{
	
  this.ussTableRow = document.createElement("div");
  this.ussTableRow.className = 'row tableRow';
  this.ussTableRow.border=1;
  this.ussTableRow.setAttribute("style","margin-left: 0px;margin-right: 0px;");
 // this.ussTableRow.onclick = 'event.cancelBubble = true;';
  this.ussTableRow.tabIndex = -1;

return this.ussTableRow;
	
}

//accordion

USS.prototype.USSCreateAccordion=function(id)
{

this.ussTableAccordion    = document.createElement("div");
this.ussTableAccordion.id = "accordion" + id;
return this.ussTableAccordion;
	
}


USS.prototype.USSAccordionCreateDflt=function()
{
	this.ussTableAccordionD= document.createElement("div");
	this.ussTableAccordionD.className ="panel panel-default" ;

	return this.ussTableAccordionD;
}


USS.prototype.USSAppendAccordionDflt=function(obj,dflt)
{
	this.ussTableAccordion=obj;
	this.ussTableAccordion.appendChild(dflt);

	return this.ussTableAccordion;
	
}


USS.prototype.USSAppendAccordionHeader=function(obj,title)
{
this.ussTableAccordion=obj; 
this.ussTableAccordionH= document.createElement("div");
this.ussTableAccordionH.className ="panel-heading" ;
this.ussTableAccordionH4= document.createElement("H4");
this.ussTableAccordionH4.className ="panel-title" ;
this.ussTableAccordionH4.border=1;
this.ussTableAccordionA= document.createElement("a");
//this.ussTableAccordionA.setAttribute("data-toggle", "collapse" ); -- collapse
this.ussTableAccordionA.setAttribute("href", "#collapse1" );
this.newContent = document.createTextNode(title);
this.ussTableAccordionA.appendChild(this.newContent);
//this.ussTableAccordionA.setAttribute("data-toggle","collapse");
this.ussTableAccordionA.setAttribute("data-parent","container1");
this.ussTableAccordionH4.appendChild(this.ussTableAccordionA);
this.ussTableAccordionH.appendChild(this.ussTableAccordionH4);
this.ussTableAccordion.appendChild(this.ussTableAccordionH);
return this.ussTableAccordion;
}

USS.prototype.USSAppendAccordionHeader=function(obj,title,pid,cid)
{
this.ussTableAccordion=obj; 
this.ussTableAccordionH= document.createElement("div");
this.ussTableAccordionH.className ="panel-heading" ;
this.ussTableAccordionH4= document.createElement("H4");
this.ussTableAccordionH4.className ="panel-title" ;
this.ussTableAccordionH4.border=1;
this.ussTableAccordionA= document.createElement("a");
//this.ussTableAccordionA.setAttribute("data-toggle", "collapse" );
this.ussTableAccordionA.setAttribute("href", "#collapse"+cid );
this.newContent = document.createTextNode(title);
this.ussTableAccordionA.appendChild(this.newContent);
//this.ussTableAccordionA.setAttribute("data-toggle","collapse");
this.ussTableAccordionA.setAttribute("data-parent","#accordion"+pid);
this.ussTableAccordionH4.appendChild(this.ussTableAccordionA);
this.ussTableAccordionH.appendChild(this.ussTableAccordionH4);
this.ussTableAccordion.appendChild(this.ussTableAccordionH);
return this.ussTableAccordion;
}

USS.prototype.USSAppendAccordionSection=function(obj ,table)
{

this.ussTableAccordion= obj; //document.createElement("div");
this.ussTableAccordionDiv=document.createElement("div");
//this.ussTableAccordionDiv.className ="panel-collapse collapse" ;
this.ussTableAccordionDiv.id="collapse1";
this.ussTableAccordionBody=document.createElement("div");
this.ussTableAccordionBody.className ="panel-body" ;
this.ussTableAccordionBody.innerHTML=table.outerHTML;
this.ussTableAccordionDiv.appendChild(this.ussTableAccordionBody);
this.ussTableAccordion.appendChild(this.ussTableAccordionDiv);

return this.ussTableAccordion;
}


USS.prototype.USSAppendAccordionSection=function(obj ,table,pid,cid)
{

this.ussTableAccordion= obj; //document.createElement("div");
this.ussTableAccordionDiv=document.createElement("div");
//this.ussTableAccordionDiv.className ="panel-collapse collapse" ;
this.ussTableAccordionDiv.id="collapse"+cid;
this.ussTableAccordionBody=document.createElement("div");
this.ussTableAccordionBody.className ="panel-body" ;
this.ussTableAccordionBody.innerHTML=table.outerHTML;
this.ussTableAccordionDiv.appendChild(this.ussTableAccordionBody);
this.ussTableAccordion.appendChild(this.ussTableAccordionDiv);

return this.ussTableAccordion;
}

USS.prototype.USSAppendAccordion=function(obj,title,table)
{
	

  this.ussTableAccordion=obj;  
this.ussTableAccordionH= document.createElement("div");


 this.ussTableAccordionH.className ="headline" ;


this.ussTableAccordionSpan= document.createElement("span");
 this.newContent = document.createTextNode(title);
 this.ussTableAccordionDiv=document.createElement("div");
this.ussTableAccordionDiv.className ="section" ;
 

this.ussTableAccordionDiv.innerHTML=table.outerHTML;

this.ussTableAccordionH.appendChild(this.ussTableAccordionSpan);
this.ussTableAccordionH.appendChild(this.newContent);

this.ussTableAccordion.appendChild(this.ussTableAccordionH);
this.ussTableAccordion.appendChild(this.ussTableAccordionDiv);



return this.ussTableAccordion;
	
}
USS.prototype.USSAppendAccordionExapnd=function(obj)
{
	

this.ussTableAccordion=obj;  // --document.createElement("div");
this.ussTableAccordionExpand= document.createElement("div");
this.ussTableAccordionExpand.id="expand";
this.ussTableAccordionExpand.appendChild(document.createTextNode("Collapse All"));

this.ussTableAccordion.appendChild(this.ussTableAccordionExpand);

return this.ussTableAccordion;

}




USS.prototype.ceil =function (  inp)
{
  var rtVal=0;
  var intVal=parseInt(inp)*1000000000000; // it will remove the decimel point
  var floatVal=inp*1000000000000; // it has the decimel point

      //  alert("intVal " +intVal);
        //alert("floatVal" +floatVal);
  if( intVal  <floatVal)
  {
    rtVal=parseInt(inp)+1;  
  }
  else
  {
    rtVal=parseInt(inp);  
  }
  

  return rtVal;
}

USS.prototype.isContainer=function(fieldObj)
{

	if(fieldObj.dataType=="CONTAINER")
	{
		return true;
	}
	else
	{
		return false;
	}
}


USS.prototype.hasChild=function(fieldObj)
{
	//console.log(fieldObj);

	if( Array.isArray(fieldObj.childs))
	{

		if( fieldObj.childs.length == 0 )
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}

	
}
USS.prototype.CreateField=function (fieldObj,USSTableRow)
{
	var rtString = "";
	var fldStr="";	
	var jsfunc="";

//alert('CreateField : 001');
try
{
pre_cust_CreateField(fieldObj,USSTableRow)
}
catch(e)
{
}
 
	//try
	{
		if (fieldObj.htmlType == "" )
		{
			alert("[" +fieldObj.name +"] " + FLDFCF00001);
	
			return false;
		}
		else if (fieldObj.dataType == "" ) 
		{
			alert(FLDFCF00002);
			return false;
	
		}
		else  if  (fieldObj.groupId == "" ) 
		{
			alert(FLDFCF00003);
			return false;
	
		}
		else 
		{

		

      this.tableBodyElmntDesc=document.createElement("span");
      this.tableBodyElmntScript=document.createElement("script");
      this.tableBodyTr=document.createElement("div");
      this.tableBodyTr.className="row tableRow";
                          
			/*	this.tableBodyTd1=document.createElement("div");
				this.tableBodyTd1.id="td";
				this.tableBodyTd1.className = 'col-sm-' + this.ceil( 12/(fieldObj.maxCol * 2 ) ) +' ' + 'col-xs-' + this.ceil(12/(fieldObj.maxCol*1) );

				this.tableBodyTd2=document.createElement("div");
				this.tableBodyTd2.id ="td";
				this.tableBodyTd2.className = 'col-sm-'+ this.ceil(12/(fieldObj.maxCol * 1)) +' ' + 'col-xs-' + this.ceil(12/(fieldObj.maxCol*1)) ;
		
    */
        if( fieldObj.parentHtmlType == 'HEADER'  || fieldObj.parentHtmlType == 'TABLE' )
        {
       this.tableBodyTd1=document.createElement("div");
        this.tableBodyTd1.id="td";
       // this.tableBodyTd1.className = 'col-sm-' + this.ceil( 12/(fieldObj.maxCol * 1 ) ) +' ' + 'col-xs-' + this.ceil(12/(fieldObj.maxCol*1) );
        //this.tableBodyTd1.className = 'col-sm-' + this.ceil( 12/(fieldObj.maxCol * 1 ) ) +' ' + 'col-xs-' + this.ceil(12/(fieldObj.maxCol*1) );
        this.tableBodyTd1.className = 'col-sm-' + this.ceil( 12/(fieldObj.maxCol * 1 ) ) +' ' + 'col-md-' + this.ceil( 12/(fieldObj.maxCol * 1 ) ) +' col-xs-12 ';

        this.tableBodyTd2=document.createElement("div");
        this.tableBodyTd2.id ="td";
        this.tableBodyTd2.className = 'col-sm-'+ this.ceil(12/(fieldObj.maxCol * 1)) +' ' + 'col-xs-12  col-md-' + + this.ceil(12/(fieldObj.maxCol * 1))  ;
    }
    else
    {
       this.tableBodyTd1=document.createElement("div");
        this.tableBodyTd1.id="td";
        this.tableBodyTd1.className = 'col-md-'+ parseInt(12/(fieldObj.maxCol * 2)) +' col-sm-' + parseInt( 12/(fieldObj.maxCol * 2 ) ) +' ' + 'col-xs-12';

        this.tableBodyTd2=document.createElement("div");
        this.tableBodyTd2.id ="td";
        this.tableBodyTd2.className = 'col-md-'+ parseInt(12/(fieldObj.maxCol * 2)) +' col-sm-'+ parseInt(12/(fieldObj.maxCol * 2)) +' ' + 'col-xs-12' ;
    
    }
				if((fieldObj.dataType =='HIDDEN')||(fieldObj.dataType == 'XMLCONTAINER')||(fieldObj.dataType =='BUTTON'))
				{
				//don't include the lable for hidden
					;
				}
				else
				{


					this.tableBodyLabel=document.createElement("label");
          if(fieldObj.parentHtmlType == 'TABLE')
          {
					 this.tableBodyLabel.className = 'cclabel';
					}
          else
          {
            this.tableBodyLabel.className = 'chlabel';
          }
          this.tableBodyLabel.setAttribute("for",fieldObj.name);
//					this.tableBodyLabelContent = document.createTextNode(fieldObj.label.toLowerCase());

					this.tableBodyLabelContent = document.createTextNode(fieldObj.label);
					this.tableBodyMndf=document.createElement("span");
					this.tableBodyMndf.id="mndf";
					this.tableBodyMndf.className = 'mandatory';
					this.tableBodyLabelContentMndf = document.createTextNode("*");
					this.tableBodyMndf.appendChild(this.tableBodyLabelContentMndf);
					this.tableBodyLabel.appendChild( this.tableBodyLabelContent);
					if ( fieldObj.mndf == 'Y' )
					{
						this.tableBodyLabel.appendChild(this.tableBodyMndf);
					}
			
				}
				if (fieldObj.htmlType == 'LIST') 
				{

					this.tableBodySelect=document.createElement("select");
					this.tableBodySelect.className = 'clabel';
					this.tableBodySelect.name=fieldObj.name ;
					this.tableBodySelect.for = fieldObj.name; 
					var inpStrArr= fieldObj.listVal.split('|');
					for(var i=0 ; i< inpStrArr.length;i+=2)
					{
						if( fieldObj.dflt == inpStrArr[i])
						{
							this.tableBodyOption=document.createElement("option");
							this.tableBodyOption.value=inpStrArr[i];
							this.tableBodyOption.setAttribute('selected', 'true');
							this.tableBodyOption.appendChild(document.createTextNode(inpStrArr[i+1]));
							this.tableBodyOption.id="option";
			
						}
						else
						{
							this.tableBodyOption=document.createElement("option");
							this.tableBodyOption.value=inpStrArr[i];
							this.tableBodyOption.appendChild(document.createTextNode(inpStrArr[i+1]));
							this.tableBodyOption.id="option";

						}
						this.tableBodySelect.appendChild(this.tableBodyOption);

					}
					this.tableBodyElmnt=this.tableBodySelect;

				}
				else if(fieldObj.htmlType =='DIV')
				{
					this.tableBodyElmnt=document.createElement("div");
					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = '';
				//<img src="../img/loading.gif">
					this.tableBodyElmntImg=document.createElement("img");
					this.tableBodyElmntImg.src="../img/loading.gif";
					this.tableBodyElmnt.appendChild(this.tableBodyElmntImg);
				}
				else if(fieldObj.htmlType =='BUTTON')
				{
					this.tableBodyElmnt=document.createElement("button");
					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
					this.tableBodyElmnt.appendChild(document.createTextNode(fieldObj.dflt));
				}		
				else if(fieldObj.htmlType =='LOB')
				{
					this.tableBodyElmnt=document.createElement("textarea");
					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else if(fieldObj.htmlType =='HIDDEN')
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="hidden";
					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else if(fieldObj.htmlType =='LABEL')
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="text";
					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = 'clabel';
					this.tableBodyElmnt.readonly=true;
					this.tableBodyElmnt.setAttribute('readonly','true');
				}
				else if(fieldObj.htmlType =='PASSWORD')
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="password";
					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else if (fieldObj.htmlType == 'OPTION') 
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="hidden";
					this.tableBodyElmnt.setAttribute("readonly","true");

					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
					var inpStrArr= fieldObj.listVal.split('|');
					var fldStr="";
					var rtString="";
					for(var i=0 ; i< inpStrArr.length;i+=2)
					{
						if (fieldObj.entitle == 'READONLY') 
						{
							if (fieldObj.dflt ==inpStrArr[i] ) 
							{
							
								fldStr='<div class="col-sm-6" > <input disabled="true" type="radio" checked=true dataType="'+fieldObj.dataType+'" htmlType="'+fieldObj.htmlType+'"    xmlname="'+fieldObj.name+'" name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  > <label class="clabel" >'+ inpStrArr[i+1]  + '</label > </div>';
							}
							else
							{
								fldStr='<div class="col-sm-6" >  <input disabled="true"   type="radio" dataType="'+fieldObj.dataType+'"   xmlname="'+fieldObj.name+'" htmlType="'+fieldObj.htmlType+'"   name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  >  <label class="clabel" >'+ inpStrArr[i+1]  + '</label >  </div>' ;
							}
						}
						else
						{
							if (fieldObj.dflt ==inpStrArr[i] ) 
							{
							
								fldStr=' <div class="col-sm-6" >  <input  type="radio" checked=true dataType="'+fieldObj.dataType+'" htmlType="'+fieldObj.htmlType+'"    xmlname="'+fieldObj.name+'" name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"   >  <label class="clabel" >'+ inpStrArr[i+1]  + '</label >  </div>';
							}
							else
							{
								fldStr='<div class="col-sm-6" >  <input  type="radio" dataType="'+fieldObj.dataType+'"   xmlname="'+fieldObj.name+'" htmlType="'+fieldObj.htmlType+'"              name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  >  <label class="clabel" >'+ inpStrArr[i+1]  + '</label >  </div>';
							}

						}
						
						rtString+=fldStr;
						}
						this.tableBodyElmntRadio=document.createElement("div");
						this.tableBodyElmntRadio.innerHTML=rtString;
					}
				else if (fieldObj.htmlType == 'CONTAINER' ||fieldObj.htmlType == 'PAGE'  ||  fieldObj.htmlType == 'hidden' ) 
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="hidden";
					this.tableBodyElmnt.name=fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else if(fieldObj.htmlType == 'FILE')
        {
          this.tableBodyElmnt=document.createElement("input");
          this.tableBodyElmnt.type="FILE";
          this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
          this.tableBodyElmnt.className = 'ctext';
          var fldStr="";
          var rtString="";
          if(fieldObj.help=='Y')
          {
            fldStr='<a id=link   HREF="javascript:onClickLink(\''+fieldObj.name+'\',\'' +this.helpLink+' \',\'calender\');"> <img src="../img/'+this.helpLink+'.png" width="20px" height="20px" />  </a>';
            rtString+=fldStr;
          }
          if(fieldObj.desc=='Y')
          {
            fldStr='<input type="text"  readonly class="label" name="'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  >';
            rtString+=fldStr;
          }
          this.tableBodyElmntDesc.innerHTML=rtString;
        }
        else
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="TEXT";
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctext';
					var fldStr="";
					var rtString="";
					if(fieldObj.help=='Y')
					{
						fldStr='<a id=link   HREF="javascript:onClickLink(\''+fieldObj.name+'\',\'' +this.helpLink+' \',\'calender\');"> <img src="../img/'+this.helpLink+'.png" width="20px" height="20px" />  </a>';
						rtString+=fldStr;
					}
					if(fieldObj.desc=='Y')
					{
						fldStr='<input type="text"  readonly class="label" name="'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  >';
						rtString+=fldStr;
					}
					this.tableBodyElmntDesc.innerHTML=rtString;
				}


				
			}
	}
	/*catch(e)
	{
			alert("CFCException :" +e);
	}
  */
  this.clearfix=document.createElement("div");
  this.clearfix.className="clearfix visible-xs-block"	;
  this.clearfix.innerHTML ="";
  this.tableErrorBox=document.createElement("div");
	this.tableErrorBox.id= fieldObj.name +"ErrorBox";

	//this.tableErrorBox.className="ui-state-highlight";
//	this.tableErrorBox.appendChild(document.createTextNode(""));

  	//this.tableBodyElmnt.className = 'ctext';  ### fixd for div tag on 27/dec/2014

	if( fieldObj.htmlType != 'DIV' )
	{
		this.tableBodyElmnt.className = 'ctext';  
	}
	this.tableBodyElmnt.setAttribute("xml",fieldObj.xml);
	this.tableBodyElmnt.setAttribute("mndf",fieldObj.mndf);
	this.tableBodyElmnt.setAttribute("dataType",fieldObj.dataType);
	this.tableBodyElmnt.setAttribute("htmlType",fieldObj.htmlType);

	if  ( fieldObj.dataType == 'DATE' )
	{
		this.tableBodyElmnt.setAttribute("placeholder","DD-MON-YYYY");
	}
	else if ( fieldObj.dataType == 'AMOUNT' )
	{
		this.tableBodyElmnt.setAttribute("placeholder","999999999999999.99");
	}

	this.tableBodyElmnt.id  =fieldObj.name;
  if(this.tableBodyElmnt.type!="hidden")
  {
	 this.tableBodyElmnt.setAttribute( "ng-model" ,fieldObj.Xpath); // added for angular js
	}
  this.tableBodyElmnt.setAttribute( "maxlength" ,fieldObj.max);
	this.tableBodyElmnt.setAttribute("min" , fieldObj.min);
  console.log("this.tableBodyElmnt");
  console.log(this.tableBodyElmnt);
  console.log(fieldObj);

  if(fieldObj.htmlType != 'FILE')
	this.tableBodyElmnt.value=fieldObj.dflt;
	
  if(fieldObj.mndf  == 'Y' )
  {
    this.tableBodyElmnt.setAttribute("required"   ,"" );
  }	

  this.tableBodyElmnt.setAttribute("value"   ,fieldObj.dflt);
	this.tableBodyElmnt.setAttribute("maxCol"  ,fieldObj.maxCol);
	this.tableBodyElmnt.setAttribute("col"     ,fieldObj.col);
	this.tableBodyElmnt.setAttribute("dflt"    ,fieldObj.dflt);
	this.tableBodyElmnt.setAttribute("ErrorBox",fieldObj.name +"ErrorBox");
	this.tableBodyElmnt.setAttribute("label"   ,fieldObj.label);
	this.tableBodyElmnt.setAttribute("title"   ,fieldObj.tips);
	this.tableBodyElmnt.setAttribute("Xpath"   ,fieldObj.Xpath);
	this.tableBodyElmnt.onchange=fieldObj.onchange;
	this.tableBodyElmnt.setAttribute("onclick",fieldObj.onclick);
	this.tableBodyElmnt.setAttribute("onblure",fieldObj.onblure);
	this.tableBodyElmnt.setAttribute("onkeydown",fieldObj.onkeydown);
	this.tableBodyElmnt.setAttribute("onkeyup",fieldObj.onkeyup);
  this.tableBodyElmnt.setAttribute("onkeypress",fieldObj.onkeypress); 	
  this.tableBodyElmnt.setAttribute("onchange",fieldObj.onchange); 



	this.tableBodyElmnt.setAttribute("task",fieldObj.task);
	if (fieldObj.dataType == 'PAGE')
	{
		this.tableBodyElmnt.setAttribute("parent","/");
		//this.tableBodyElmnt.setAttribute("type","hidden");
	}
	else
	{
		this.tableBodyElmnt.setAttribute("parent",fieldObj.parent);
	}

	this.tableBodyElmnt.setAttribute("xmlname",fieldObj.name);


	
	if (fieldObj.dataType == 'CONTAINER' || fieldObj.dataType == 'PAGE' || fieldObj.dataType == 'TAP' ||fieldObj.dataType == 'COLLECTION'  )
	{
		this.tableBodyElmnt.setAttribute("container","Y");
	}
	else
	{
		this.tableBodyElmnt.setAttribute("container","N");
	}

	if (fieldObj.entitle == 'READONLY') 
	{
		this.tableBodyElmnt.className = 'clabel';
		this.tableBodyElmnt.setAttribute('readonly','true');
		if (fieldObj.htmlType == 'LIST') 
		{
			this.tableBodyElmnt.setAttribute('disabled','true');
			
		}

	}

	if((fieldObj.dataType =='PAGE')||(fieldObj.dataType =='HIDDEN')||(fieldObj.dataType == 'XMLCONTAINER')||(fieldObj.dataType =='BUTTON')||(fieldObj.parentHtmlType =='TABLE'))
	{
	}
	else
	{
	this.tableBodyTd1.appendChild(this.tableBodyLabel);
	
	}


	

	if ( fieldObj.htmlType == 'OPTION' )
	{
		this.tableBodyTd2.appendChild(this.tableBodyElmntRadio);
	}

	this.tableBodyTd2.appendChild(this.tableErrorBox);

	if( fieldObj.htmlType == 'DIV')
	{


jsfunc =  "	 div='" + fieldObj.name +"';";
//jsfunc += "	 url='getMotherTongue.php';";
// str.substring(0,1).toUpperCase() + str.substring(1,str.length).toLowerCase(); 
//jsfunc += "	 url='get"+ fieldObj.name.substring(0,1)+ fieldObj.name.substring(1,fieldObj.name.length) +".php';";
jsfunc += "	 url='../service/"+ fieldObj.name.substring(0,1).toUpperCase() + fieldObj.name.substring(1,fieldObj.name.length) +"';";
//jsfunc += "	 json={USRID:glUserId, GROUPID:glGroupId ,class:'ctext' ,name:'Religion'  ,class:'ctext' ,xml:'N' ,mndf:'N' ,datatype:'VARCHAR' ,htmltype:'DIV' ,id : 'religion' ,errorbox :'religionErrorBox' ,label : 'Religion' ,title :'' ,onchange :'onChange(this)' ,onclick :'onClick(this)' ,onblure :'onBlure(this)' ,onkeydown : 'onKeyDown(this)' ,onkeyup :'onKeyUp(this)' ,onkeypress :'onKeyPress(this)' ,task : 'NONE' };";

var jsonObj= {
USRID      :glUserId, 
GROUPID    :glGroupId 
,name      :fieldObj.name        
,label     :fieldObj.label       
,task      :fieldObj.task        
,desc      :fieldObj.desc        
,htmlType  :fieldObj.htmlType    
,entitle   :fieldObj.entitle     
,enttlname :fieldObj.enttlname   
,mndf      :fieldObj.mndf        
,dataType  :fieldObj.dataType    
,cclass    :fieldObj.cclass      
,parent    :fieldObj.parent      
,validate  :fieldObj.validate    
,dflt      :fieldObj.dflt        
,min       :fieldObj.min         
,max       :fieldObj.max         
,tips      :fieldObj.tips        
,onkeyup   :fieldObj.onkeyup     
,onchange  :fieldObj.onchange    
,onkeydown :fieldObj.onkeydown   
,onkeypress:fieldObj.onkeypress  
,onclick   :fieldObj.onclick     
,listVal   :fieldObj.listVal     
,help      :fieldObj.help        
,helpLink  :fieldObj.helpLink    
,xml       :fieldObj.xml         
,xmlname   :fieldObj.xmlname 
,Xpath     :fieldObj.Xpath 
};

jsfunc += "json =" +JSON.stringify(jsonObj) +";";
jsfunc += "	onPostReq(url,json,div,'DIV');";



//this.USSScript +=  jsfunc;
//var scriptElmnt= document.createElement("script");



//scriptElmnt.appendChild(document.createTextNode(jsfunc));

//USS.USSSetScript_(jsfunc);

//document.getElementById('middleid').appendChild(scriptElmnt);
/*[
this.jsfunc =  " div='" + fieldObj.name+"';";
//url='get"+ fieldObj.name.substring(0,1)+ fieldObj.name.substring(1,str.length).toLowerCase() +".php';

//this.jsfunc+="url='get" +  fieldObj.name + ".php;";
this.jsfunc+="url='../service/" +  fieldObj.name + ";";
this.jsfunc+="json={USRID:glUserId, GROUPID:glGroupId }; onPostReq(url,json,div,'DIV');";

		this.tableBodyElmntScript.appendChild( document.createTextNode(this.jsfunc) );
//	document.header.
*/
	}

	this.tableBodyElmntScript.text=jsfunc;
USSTableRow.appendChild(this.clearfix);
if( fieldObj.parentHtmlType != 'TABLE')
{



USSTableRow.appendChild(this.tableBodyTd1);
}
if( fieldObj.parentHtmlType != 'HEADER')
{

  this.tableBodyTd2.appendChild(this.tableBodyElmnt);
  this.tableBodyTd2.appendChild(this.tableBodyElmntDesc);
	this.tableBodyTd2.appendChild(this.tableBodyElmntScript);
	USSTableRow.appendChild(this.tableBodyTd2);
}

try
{
post_cust_CreateField(fieldObj,USSTableRow);
}
catch(e)
{
}

	return USSTableRow;
}




USS.prototype.GenSJson=function(parentId)
{

 var fieldObj    = new this.USSField_();

var elementCount=0;


  var returnJson ="[";

    
  var form=document.dynForm;
  var elmnts= form.elements;
  //returnJson.childs=new Array();


  for(var i=0;i<elmnts.length;i++)
  {
    if(  elmnts[i].getAttribute("parentid") == parentId )
    {


      if( elmnts[i].id.indexOf( "IdParentNameId") > 0 )
      {
        
        if( elmnts[i].value == parentId)
        {
          



               fieldObj    = new this.USSField_();
              var baseid =elmnts[i].getAttribute("baseid") ;
              //alert("elmnts[i].id=" + baseid);
          var  IdName       = document.getElementById(baseid  + "IdName"     + "Id");
          var  HtmlTypeId   = document.getElementById(baseid  + "HtmlType"   + "Id");
          var  DataTypeId   = document.getElementById(baseid  + "DataType"   + "Id");
          var  NameId       = document.getElementById(baseid  + "Name"       + "Id");
          var  LabelId      = document.getElementById(baseid  + "Label"      + "Id");
          var  ListValId    = document.getElementById(baseid  + "ListVal"    + "Id");
          var  TaskId    = document.getElementById(baseid  + "Task"    + "Id");
          var  MndfId       = document.getElementById(baseid  + "Mndf"       + "Id");
          var  EntitleId    = document.getElementById(baseid  + "Entitle"    + "Id");
          var  DfltId       = document.getElementById(baseid  + "Dflt"       + "Id");
          var  MaxId        = document.getElementById(baseid  + "Max"        + "Id");
          var  MinId        = document.getElementById(baseid  + "Min"        + "Id");
          var  TipsId       = document.getElementById(baseid  + "Tips"       + "Id");
          var  XmlId        = document.getElementById(baseid  + "Xml"       + "Id");
          var  MaxColId        = document.getElementById(baseid  + "MaxCol"       + "Id");
            

            

            fieldObj.name       = NameId.value;
            fieldObj.label      = LabelId.value;
            fieldObj.htmlType   = HtmlTypeId.value;
            fieldObj.dataType   = DataTypeId.value;
            fieldObj.listVal    = ListValId.value;
            fieldObj.task       = TaskId.value;
            fieldObj.mndf       = MndfId.value;
            fieldObj.dflt       = DfltId.value;
            fieldObj.max        = MaxId.value;
            fieldObj.min        = MinId.value;
            fieldObj.tips       = TipsId.value;
            fieldObj.entitle    = EntitleId.value;
            fieldObj.xml        = XmlId.value;
            fieldObj.maxCol       = MaxColId.value;
            
            

            
            if ( HtmlTypeId.value == "CONTAINER" || HtmlTypeId.value == "PAGE") 
            {

              //fieldObj.task ="ES";// need to fix
                
              fieldObj.childs  = new Array();
              var childsJson=this.GenSJson(IdName.value)
              for (var c=0;c< childsJson.length ; c++ )
              {
                fieldObj.childs.push ( childsJson[c]);
              }
              
              
            }
            else
            {
              fieldObj.childs  = new Array();
            }
            if ( elementCount==0)
            {
                 returnJson += "" + JSON.stringify(fieldObj);
            }
            else
            {

              
                 returnJson += "," + JSON.stringify(fieldObj);
            }
            elementCount=+1;
            
        //  alert("Need to start"); //to do durai
 //           //var fieldObj=eval( "{" + elmnts.Id  +":" +  elmnts.name +"}");
            //returnJson.push(fieldObj);
        }
            
      }
    
    }


  }

  returnJson+="]";

  //alert(returnJson);
  console.log("\n \n");
  console.log(returnJson);

  return eval(returnJson);

}


USS.prototype.Preview=function(obj)
{



    var baseid   =obj.getAttribute("baseid");
    var PreviewId    = document.getElementById(baseid + "Preview"    + "Id");
    var LabelId      = document.getElementById(baseid + "Label"      + "Id");
    var EntitleId    = document.getElementById(baseid + "Entitle"      + "Id");
    var ListValId    = document.getElementById(baseid + "ListVal"    + "Id");
    var MndfId       = document.getElementById(baseid + "Mndf"       + "Id");
    var DataTypeId   = document.getElementById(baseid + "DataType"   + "Id");
    var HtmlTypeId   = document.getElementById(baseid + "HtmlType"   + "Id");
    var DfltId       = document.getElementById(baseid + "Dflt"       + "Id");
    var MaxId        = document.getElementById(baseid + "Max"        + "Id");
    var MinId        = document.getElementById(baseid + "Min"        + "Id");
    var TipsId       = document.getElementById(baseid + "Tips"       + "Id"); 
    var MaxColId       = document.getElementById(baseid + "MaxCol"       + "Id");
    var TaskId       = document.getElementById(baseid + "Task"       + "Id");
    var EntitleId       = document.getElementById(baseid + "Entitle"       + "Id");

    //EntitleId       = document.getElementById(baseid + "Entitle"       + "Id");

    //alert(PreviewId.innerHTML);
    PreviewId.innerHTML= "<div> </div>";
    var fieldObj= new  this.USSField_();  

    fieldObj.label     = LabelId.value;
    fieldObj.listVal   = ListValId.value;
    fieldObj.dataType  = DataTypeId.value;
    fieldObj.htmlType  = HtmlTypeId.value;
    fieldObj.dflt      = DfltId.value;
    fieldObj.mndf      = MndfId.value;
    fieldObj.max       = MaxId.value;
    fieldObj.min       = MinId.value;
    fieldObj.tips      = TipsId.value;
    fieldObj.entitle   = EntitleId.value;
    fieldObj.maxCol    = MaxColId.value;
    fieldObj.task      = TaskId.value;
    fieldObj.entitle   = EntitleId.value;
//task fix
    
    //fieldObj.task     = "ES"; bnmnnnnnnnnnnhvfhjm,;kiu/jk ,./\ m

  // fieldObj.entitle  = "NOREADONLY";

    this.CreateField( fieldObj,PreviewId);   


}




USS.prototype.NewSibling=function(obj)
{

  var fieldObj= new this.USSField_();
  var parentObj = document.getElementById(obj.getAttribute("parentid"));



var baseid =obj.getAttribute("baseid") ;

//alert(baseid);              
           var IdName      = document.getElementById(baseid + "IdName" +"Id");
           var HtmlTypeId  = document.getElementById(baseid + "HtmlType" +"Id");
           var DataTypeId  = document.getElementById(baseid + "DataType" +"Id");
           var NameId      = document.getElementById(baseid  + "Name" +"Id");
           var LabelId     = document.getElementById(baseid  + "Label" +"Id");
           var ListValId   = document.getElementById(baseid  + "ListVal" +"Id");
           var TaskId      = document.getElementById(baseid  + "Task" +"Id");
           var MndfId      = document.getElementById(baseid  + "Mndf" +"Id");
           var EntitleId    = document.getElementById(baseid + "Entitle"      + "Id");
           var DfltId       = document.getElementById(baseid + "Dflt"       + "Id");
           var MaxId        = document.getElementById(baseid + "Max"        + "Id");
           var MinId        = document.getElementById(baseid + "Min"        + "Id");
           var TipsId       = document.getElementById(baseid + "Tips"       + "Id");
           var XmlId       = document.getElementById(baseid + "Xml"       + "Id");
            var MaxColId       = document.getElementById(baseid + "MaxCol"       + "Id");


            fieldObj.fieldObj       = "Y";
            fieldObj.name       = NameId.value;
            fieldObj.label      = LabelId.value;
            fieldObj.htmlType   = HtmlTypeId.value;
            fieldObj.dataType   = DataTypeId.value;
            fieldObj.listVal    = ListValId.value;
            fieldObj.task       = TaskId.value;
            fieldObj.mndf       = MndfId.value;
            fieldObj.dflt       = DfltId.value;
            fieldObj.max        = MaxId.value;
            fieldObj.min        = MinId.value;
            fieldObj.tips       = TipsId.value;
            fieldObj.entitle    = EntitleId.value;
            fieldObj.xml        = XmlId.value;
            fieldObj.maxCol     = MaxColId.value;

  var child=this.AddSubling(fieldObj,obj.getAttribute("parentid"));

  parentObj.appendChild(child);


}

USS.prototype.NewChild=function(obj)
{

  var fieldObj= new this.USSField_();
  var parentObj = document.getElementById(obj.getAttribute("baseid"));

  //fieldObj.htmlType="CONTAINER";


  var HtmlTypeId  = document.getElementById(obj.getAttribute("baseid") + "HtmlType" +"Id");

  if (HtmlTypeId.value == "PAGE" )
  {
    fieldObj.htmlType="CONTAINER";
    fieldObj.dataType="CONTAINER";
  }
  var child=this.AddSubling(fieldObj,obj.getAttribute("baseid"));

  parentObj.appendChild(child);


}
USS.prototype.createLabelElement=function(parentId,childId,LabelId,value)
{
var divCurrDivName=document.createElement("div");
  divCurrDivName.setAttribute("parentid"         ,parentId);
  divCurrDivName.setAttribute("attribute"        ,"name");
  divCurrDivName.setAttribute("id"               ,childId+ LabelId+"Label" + "Id"  );
  divCurrDivName.setAttribute("baseid"           ,childId );
  divCurrDivName.setAttribute("mndf"             ,"Y");
  divCurrDivName.setAttribute("childCount"       ,"0");
  divCurrDivName.setAttribute("class","properityLabelBox");
  //divCurrDivName.setAttribute("type"             ,"hidden");
  divCurrDivName.setAttribute("placeholder"      ,"name");
  divCurrDivName.setAttribute("title"            ,"Id");

  divCurrDivName.appendChild(document.createTextNode(value));
 // divCurrDivName.setAttribute("onChange", "javascript:document.getElementById('"+childDiv.id +"ProperityWindow"+"Div"+"Id"+ "').innerHTML = this.value")

return divCurrDivName;
}
USS.prototype.genRowElement=function( fieldObj)
{
  return  this.createRowElement(this.createLabelElement(fieldObj.getAttribute("parentid"),fieldObj.getAttribute("baseid"),fieldObj.id, fieldObj.getAttribute("placeholder") ) ,fieldObj);
}


USS.prototype.createRowElement=function( labelObj, fieldObj)
{
  this.retObj=document.createElement("div");
  this.retObj.className="row properityWindow";
  this.retRow1=document.createElement("div");
  this.retRow1.appendChild(labelObj);
  this.retRow1.className="col-sm-6 ";
  this.retRow2=document.createElement("div");
  this.retRow2.appendChild(fieldObj);
  this.retRow2.className="col-sm-6";
  this.retObj.appendChild(this.retRow1);
  this.retObj.appendChild(this.retRow2);

  return this.retObj;
}
USS.prototype.AddSubling = function(fieldObj,parentid)
{


  var childDiv= document.createElement('div');

    childDiv.id = "Container" + this.ContinerCount++||1;



  var childHideDiv= document.createElement('div');

    childHideDiv.id = "ContainerHide" + childDiv.id ;
     childHideDiv.className ="ContainerHide";

  var childShowDiv= document.createElement('div');

    childShowDiv.id = "ContainerShow" + childDiv.id ;
    childShowDiv.className ="ContainerShow";


    //childDiv.class="bfield";
    
parentid=parentid;

var divCurrDivName=document.createElement("input");
  divCurrDivName.setAttribute("parentid"         ,parentid);
  divCurrDivName.setAttribute("attribute"        ,"name");
  divCurrDivName.setAttribute("id"               ,childDiv.id+ "Name" + "Id"  );
  divCurrDivName.setAttribute("baseid"           ,childDiv.id );
  divCurrDivName.setAttribute("mndf"             ,"Y");
  divCurrDivName.setAttribute("childCount"       ,"0");
  //divCurrDivName.setAttribute("type"             ,"hidden");
  divCurrDivName.setAttribute("placeholder"      ,"name");
  divCurrDivName.setAttribute("value"            ,fieldObj.name);
  divCurrDivName.setAttribute("title"            ,"Id");
  divCurrDivName.setAttribute("onChange", "javascript:document.getElementById('"+childDiv.id +"ProperityWindow"+"Div"+"Id"+ "').innerHTML = this.value")


var divCurrDivIdName=document.createElement("input");
  divCurrDivIdName.setAttribute("parentid"        ,parentid);
  divCurrDivIdName.setAttribute("baseid"        ,childDiv.id );
  divCurrDivIdName.setAttribute("id"               ,childDiv.id+ "IdName" + "Id"  );
  divCurrDivIdName.setAttribute("mndf"             ,"Y");
  divCurrDivIdName.setAttribute("childCount"       ,"0");
  divCurrDivIdName.setAttribute("readonly"             ,"true");
  divCurrDivIdName.setAttribute("type"             ,"hidden");
  divCurrDivIdName.setAttribute("placeholder"             ,"name");
  divCurrDivIdName.setAttribute("value"             ,childDiv.id);
  divCurrDivIdName.setAttribute("title","Curent Id");


var divCurrDivIdParentName=document.createElement("input");
  divCurrDivIdParentName.setAttribute("parentid"        ,parentid);
  divCurrDivIdParentName.setAttribute("baseid"        ,childDiv.id );
  divCurrDivIdParentName.setAttribute("id"               ,childDiv.id+ "IdParentName" + "Id"  );
  divCurrDivIdParentName.setAttribute("mndf"             ,"Y");
  divCurrDivIdParentName.setAttribute("childCount"       ,"0");
  divCurrDivIdParentName.setAttribute("readonly"             ,"true");
  divCurrDivIdParentName.setAttribute("type"             ,"hidden");
  divCurrDivIdParentName.setAttribute("placeholder"             ,"name");
  divCurrDivIdParentName.setAttribute("value"             ,parentid);
  divCurrDivIdParentName.setAttribute("title","Parent Id");



var divCurrDivMax=document.createElement("input");
  divCurrDivMax.setAttribute("parentid"        ,parentid);
  divCurrDivMax.setAttribute("baseid"        ,childDiv.id );
  divCurrDivMax.setAttribute("attribute"        ,"Max");
  divCurrDivMax.setAttribute("id"               ,childDiv.id +"Max"+"Id");
  divCurrDivMax.setAttribute("mndf"             ,"Y");
  divCurrDivMax.setAttribute("childCount"       ,"0");
  divCurrDivMax.setAttribute("size"          ,"3");

  divCurrDivMax.setAttribute("type"             ,"container");
  divCurrDivMax.setAttribute("placeholder"      ,"Max");
  divCurrDivMax.setAttribute("value"             ,fieldObj.max);
    divCurrDivMax.setAttribute("title","Max");


var divCurrDivMin=document.createElement("input");
  divCurrDivMin.setAttribute("parentid"        ,parentid);
  divCurrDivMin.setAttribute("attribute"        ,"Min");
  divCurrDivMin.setAttribute("id"               ,childDiv.id +"Min"+"Id");
  divCurrDivMin.setAttribute("mndf"             ,"Y");
  divCurrDivMin.setAttribute("childCount"       ,"0");
  divCurrDivMin.setAttribute("type"             ,"container");
  divCurrDivMin.setAttribute("placeholder"             ,"Min");
  divCurrDivMin.setAttribute("value"             ,fieldObj.min);
   divCurrDivMax.setAttribute("size"          ,"3");
    divCurrDivMin.setAttribute("title","Min");

var divCurrDivTips=document.createElement("input");
  divCurrDivTips.setAttribute("parentid"        ,parentid);
  divCurrDivTips.setAttribute("baseid"          ,childDiv.id );
  divCurrDivTips.setAttribute("attribute"        ,"Tips");
  divCurrDivTips.setAttribute("id"               ,childDiv.id +"Tips"+"Id");
  divCurrDivTips.setAttribute("mndf"             ,"Y");
  divCurrDivTips.setAttribute("childCount"       ,"0");
  divCurrDivTips.setAttribute("type"             ,"container");
  divCurrDivTips.setAttribute("placeholder"             ,"Tips");
  divCurrDivTips.setAttribute("value"             ,fieldObj.tips);
    divCurrDivTips.setAttribute("title","Tips");


var divCurrDivMaxCol=document.createElement("input");
  divCurrDivMaxCol.setAttribute("parentid"        ,parentid);
  divCurrDivMaxCol.setAttribute("baseid"          ,childDiv.id );
  divCurrDivMaxCol.setAttribute("attribute"        ,"MaxCol");
  divCurrDivMaxCol.setAttribute("id"               ,childDiv.id +"MaxCol"+"Id");
  divCurrDivMaxCol.setAttribute("mndf"             ,"Y");
  divCurrDivMaxCol.setAttribute("childCount"       ,"0");
  divCurrDivMaxCol.setAttribute("type"             ,"container");
  divCurrDivMaxCol.setAttribute("placeholder"             ,"MaxCol");
  divCurrDivMaxCol.setAttribute("value"             ,fieldObj.maxCol);
    divCurrDivMaxCol.setAttribute("title","MaxCol");



var divCurrDivLabel=document.createElement("input");
  divCurrDivLabel.setAttribute("parentid"        ,parentid);
  divCurrDivLabel.setAttribute("baseid"          ,childDiv.id );
  divCurrDivLabel.setAttribute("attribute"        ,"Label");
  divCurrDivLabel.setAttribute("id"               ,childDiv.id +"Label"+"Id");
  divCurrDivLabel.setAttribute("mndf"             ,"Y");
  divCurrDivLabel.setAttribute("childCount"       ,"0");
  divCurrDivLabel.setAttribute("type"             ,"container");
  divCurrDivLabel.setAttribute("placeholder"             ,"label");
  divCurrDivLabel.setAttribute("value"             ,fieldObj.label);
  divCurrDivLabel.setAttribute("title","Label");



var divCurrDivMndf=document.createElement("select");
  divCurrDivMndf.setAttribute("parentid"        ,parentid);
  divCurrDivMndf.setAttribute("baseid"          ,childDiv.id );
  divCurrDivMndf.setAttribute("attribute"        ,"Mndf");
  divCurrDivMndf.setAttribute("id"               ,childDiv.id +"Mndf"+"Id");
  divCurrDivMndf.setAttribute("mndf"             ,"Y");
  divCurrDivMndf.setAttribute("childCount"       , "0");
  divCurrDivMndf.setAttribute("type"             ,"container");
  divCurrDivMndf.setAttribute("placeholder"             ,"label");
  divCurrDivMndf.setAttribute("value"             ,fieldObj.mndf);
  divCurrDivMndf.setAttribute("class", "bmandatory");

    divCurrDivMndf.setAttribute("title","mndf");


var inpStrArr= "Y|YES|N|NO".split('|');
var divCurrDivMndfOption="";

  //alert(fieldObj.htmlType );
          for(var i=0 ; i< inpStrArr.length;i+=2)
          {

              divCurrDivMndfOption=document.createElement("option");
              
              
              divCurrDivMndfOption.value=inpStrArr[i];
              divCurrDivMndfOption.appendChild(document.createTextNode(inpStrArr[i+1]));
              divCurrDivMndfOption.id="option";


              if( inpStrArr[i] == fieldObj.mndf )
              {
                divCurrDivMndfOption.setAttribute('selected', 'true');
              }
                divCurrDivMndf.appendChild(divCurrDivMndfOption);

          }







var divCurrDivHtmlType=document.createElement("select");
  divCurrDivHtmlType.setAttribute("parentid"         ,parentid);
  divCurrDivHtmlType.setAttribute("baseid"           ,childDiv.id );
  divCurrDivHtmlType.setAttribute("attribute"        ,"HtmlType");
  divCurrDivHtmlType.setAttribute("id"               ,childDiv.id +"HtmlType"+"Id");
  divCurrDivHtmlType.setAttribute("mndf"             ,"Y");
  divCurrDivHtmlType.setAttribute("childCount"       ,"0");
  divCurrDivHtmlType.setAttribute("type"             ,"container");
  divCurrDivHtmlType.setAttribute("placeholder"             ,"HtmlType");
  divCurrDivHtmlType.setAttribute("value"             ,fieldObj.htmlType);
    divCurrDivHtmlType.setAttribute("title","HtmlType");
    divCurrDivHtmlType.setAttribute("class", "bmandatory");


 var inpStrArr= "||PAGE|PAGE|TAP|TAP|CONTAINER|CONTAINER|FILE|FILE|TEXT|TEXT|LIST|LIST|OPTION|OPTION|DIV|DIV|INPUT|INPUT|DATE|DATE".split('|');
var divCurrDivHtmlTypeOption="";

  //alert(fieldObj.htmlType );
          for(var i=0 ; i< inpStrArr.length;i+=2)
          {

              divCurrDivHtmlTypeOption=document.createElement("option");
              
              
              divCurrDivHtmlTypeOption.value=inpStrArr[i];
              divCurrDivHtmlTypeOption.appendChild(document.createTextNode(inpStrArr[i+1]));
              divCurrDivHtmlTypeOption.id="option";


              if( inpStrArr[i] == fieldObj.htmlType )
              {
                divCurrDivHtmlTypeOption.setAttribute('selected', 'true');
              }
                divCurrDivHtmlType.appendChild(divCurrDivHtmlTypeOption);

          }




var divCurrDivPreView=document.createElement("div");
  divCurrDivPreView.setAttribute("parentid"        ,parentid);
  divCurrDivPreView.setAttribute("baseid"          ,childDiv.id );

  divCurrDivPreView.setAttribute("id"               ,childDiv.id +"Preview"+"Id");
  divCurrDivPreView.setAttribute("mndf"             ,"Y");
  divCurrDivPreView.setAttribute("childCount"       ,"0");
  divCurrDivPreView.setAttribute("type"             ,"container");
  divCurrDivPreView.setAttribute("placeholder"             ,"label");
  divCurrDivPreView.setAttribute("value"             ,fieldObj.label);

divCurrDivPreView.setAttribute("title","Preview");
//divCurrDivPreView.setAttribute("class", "bmandatory");



var divCurrDivListVal=document.createElement("input");
  divCurrDivListVal.setAttribute("parentid"        ,parentid);
  divCurrDivListVal.setAttribute("baseid"        ,childDiv.id );
  divCurrDivListVal.setAttribute("id"               ,childDiv.id +"ListVal"+"Id");
  divCurrDivListVal.setAttribute("mndf"             ,"Y");
  divCurrDivListVal.setAttribute("childCount"       ,"0");
  divCurrDivListVal.setAttribute("type"             ,"container");
  divCurrDivListVal.setAttribute("placeholder"             ,"List Val");
  divCurrDivListVal.setAttribute("value"             ,fieldObj.listVal);
    divCurrDivListVal.setAttribute("title","ListVal");
//task
var divCurrDivTask=document.createElement("input");
    divCurrDivTask.setAttribute("parentid"        ,parentid);
    divCurrDivTask.setAttribute("baseid"        ,childDiv.id );
    divCurrDivTask.setAttribute("id"               ,childDiv.id +"Task"+"Id");
    divCurrDivTask.setAttribute("mndf"             ,"Y");
    divCurrDivTask.setAttribute("childCount"       ,"0");
    divCurrDivTask.setAttribute("type"             ,"container");
    divCurrDivTask.setAttribute("placeholder"             ,"Task");
    divCurrDivTask.setAttribute("value"             ,fieldObj.task);
    divCurrDivTask.setAttribute("title","Task");

// Entitle

var divCurrDivEntitle=document.createElement("select");
  divCurrDivEntitle.setAttribute("parentid"        ,parentid);
  divCurrDivEntitle.setAttribute("baseid"        ,childDiv.id );
  divCurrDivEntitle.setAttribute("id"               ,childDiv.id +"Entitle"+"Id");
  divCurrDivEntitle.setAttribute("mndf"             ,"Y");
  divCurrDivEntitle.setAttribute("childCount"       ,"0");
  divCurrDivEntitle.setAttribute("type"             ,"container");
  divCurrDivEntitle.setAttribute("placeholder"             ,"Entitle");
  divCurrDivEntitle.setAttribute("value"             ,fieldObj.entitle);
  divCurrDivEntitle.setAttribute("title","editable ");




 inpStrArr= "NONREADONLY|YES|READONLY|NO".split('|');
var divCurrDivEntitleOption="";

  //alert(fieldObj.htmlType );
          for(var i=0 ; i< inpStrArr.length;i+=2)
          {

              divCurrDivEntitleOption=document.createElement("option");
              
              
              divCurrDivEntitleOption.value=inpStrArr[i];
              divCurrDivEntitleOption.appendChild(document.createTextNode(inpStrArr[i+1]));
              divCurrDivEntitleOption.id="option";


              if( inpStrArr[i] == fieldObj.entitle )
              {
                divCurrDivEntitleOption.setAttribute('selected', 'true');
              }
                divCurrDivEntitle.appendChild(divCurrDivEntitleOption);

          }



var divCurrDivXml=document.createElement("select");
  divCurrDivXml.setAttribute("parentid"        ,parentid);
  divCurrDivXml.setAttribute("baseid"        ,childDiv.id );
  divCurrDivXml.setAttribute("id"               ,childDiv.id +"Xml"+"Id");
  divCurrDivXml.setAttribute("mndf"             ,"Y");
  divCurrDivXml.setAttribute("childCount"       ,"0");
  divCurrDivXml.setAttribute("type"             ,"container");
  divCurrDivXml.setAttribute("placeholder"             ,"Xml");
  divCurrDivXml.setAttribute("value"             ,fieldObj.xml);
    divCurrDivXml.setAttribute("title","Xml");



 inpStrArr= "Y|YES|N|NO".split('|');
var divCurrDivEntitleOption="";

  //alert(fieldObj.htmlType );
          for(var i=0 ; i< inpStrArr.length;i+=2)
          {

              divCurrDivEntitleOption=document.createElement("option");
              
              
              divCurrDivEntitleOption.value=inpStrArr[i];
              divCurrDivEntitleOption.appendChild(document.createTextNode(inpStrArr[i+1]));
              divCurrDivEntitleOption.id="option";


              if( inpStrArr[i] == fieldObj.xml )
              {
                divCurrDivEntitleOption.setAttribute('selected', 'true');
              }
                divCurrDivXml.appendChild(divCurrDivEntitleOption);

          }


   var properityWindowLabel=document.createElement("div");       
 properityWindowLabel.setAttribute("parentid"         ,parentid);
  properityWindowLabel.setAttribute("baseid"           ,childDiv.id );
  properityWindowLabel.setAttribute("id"               ,childDiv.id +"ProperityWindow"+"Label"+"Id");

var properityWindowDiv =document.createElement("div");
  properityWindowDiv.className="TreeContainer";
 properityWindowDiv.setAttribute("id"               ,childDiv.id +"ProperityWindow"+"Div"+"Id");
properityWindowDiv.innerHTML=fieldObj.name;
properityWindowLabel.appendChild(properityWindowDiv);
properityWindowLabel.className= "bmargin";


var divCurrDivDataTypeLabel=document.createElement("div");
  divCurrDivDataTypeLabel.setAttribute("parentid"         ,parentid);
  divCurrDivDataTypeLabel.setAttribute("baseid"           ,childDiv.id );
  divCurrDivDataTypeLabel.setAttribute("id"               ,childDiv.id +"DataType"+"Label"+"Id");
  divCurrDivDataTypeLabel.setAttribute("mndf"             ,"Y");
  divCurrDivDataTypeLabel.setAttribute("childCount"       ,"0");
  divCurrDivDataTypeLabel.setAttribute("type"             ,"container");
  divCurrDivDataTypeLabel.setAttribute("placeholder"             ,"Data Type");
  divCurrDivDataTypeLabel.setAttribute("value"             ,fieldObj.dataType);
  divCurrDivDataTypeLabel.setAttribute("title","dataType");

var divCurrDivDataType=document.createElement("select");
  divCurrDivDataType.setAttribute("parentid"         ,parentid);
  divCurrDivDataType.setAttribute("baseid"           ,childDiv.id );
  divCurrDivDataType.setAttribute("id"               ,childDiv.id +"DataType"+"Id");
  divCurrDivDataType.setAttribute("mndf"             ,"Y");
  divCurrDivDataType.setAttribute("childCount"       ,"0");
  divCurrDivDataType.setAttribute("type"             ,"container");
  divCurrDivDataType.setAttribute("placeholder"             ,"Data Type");
  divCurrDivDataType.setAttribute("value"             ,fieldObj.dataType);
    divCurrDivDataType.setAttribute("title","dataType");




 inpStrArr= "||PAGE|PAGE|TAP|TAP|CONTAINER|CONTAINER|TEXT|TEXT|LIST|LIST|OPTION|OPTION|DIV|DIV|INPUT|INPUT|DATE|DATE|VARCHAR|VARCHAR|AMOUNT|AMOUNT|NUMBER|NUMBER".split('|');
var divCurrDivDataTypeOption="";

  //alert(fieldObj.htmlType );
          for(var i=0 ; i< inpStrArr.length;i+=2)
          {

              divCurrDivDataTypeOption=document.createElement("option");
              
              
              divCurrDivDataTypeOption.value=inpStrArr[i];
              divCurrDivDataTypeOption.appendChild(document.createTextNode(inpStrArr[i+1]));
              divCurrDivDataTypeOption.id="option";


              if( inpStrArr[i] == fieldObj.dataType )
              {
                divCurrDivDataTypeOption.setAttribute('selected', 'true');
              }
                divCurrDivDataType.appendChild(divCurrDivDataTypeOption);

          }


var divCurrDivDflt=document.createElement("input");
  divCurrDivDflt.setAttribute("parentid"         ,parentid);
  divCurrDivDflt.setAttribute("baseid"           ,childDiv.id );
  divCurrDivDflt.setAttribute("id"               ,childDiv.id +"Dflt"+"Id");
  divCurrDivDflt.setAttribute("mndf"             ,"Y");
  divCurrDivDflt.setAttribute("childCount"       ,"0");
  divCurrDivDflt.setAttribute("type"             ,"container");
  divCurrDivDflt.setAttribute("placeholder"       ,"Dflt");
  divCurrDivDflt.setAttribute("value"             ,fieldObj.dflt);
    divCurrDivDflt.setAttribute("title","Dflt");


var divButton=document.createElement("button");
  divButton.setAttribute("parentid"        ,parentid );
  divButton.setAttribute("baseid"         ,childDiv.id  );
  //divButton.setAttribute();
  divButton.type ="button";
  divButton.setAttribute("mndf"             ,"Y");
  
  divButton.setAttribute("childCount"       ,"0");
  divButton.setAttribute("value"       ,"onclick");
  divButton.setAttribute("type"             ,"button");
 // divButton.textContent = "Add Sibling";
    divButton.setAttribute("onclick" ,"NewSibling(this)");


 this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa fa-clone";
  
   divButton.appendChild(this.fontawesome);



var divButtonDelete=document.createElement("button");
  divButtonDelete.setAttribute("parentid"        ,parentid );
  divButtonDelete.setAttribute("baseid"         ,childDiv.id  );
  divButtonDelete.type ="button";
  divButtonDelete.setAttribute("mndf"             ,"N");
  divButtonDelete.setAttribute("childCount"       ,"0");
  divButtonDelete.setAttribute("value"       ,"onclick");
  divButtonDelete.setAttribute("type"             ,"button");
 // divButtonDelete.textContent = "Delete";
    divButtonDelete.setAttribute("onclick" ,"DeleteThis(this)");
this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa fa-minus-circle";
  
   divButtonDelete.appendChild(this.fontawesome);


var divButtonHide=document.createElement("button");
  divButtonHide.setAttribute("parentid"        ,parentid );
  divButtonHide.setAttribute("baseid"         ,childDiv.id  );
  divButtonHide.type ="button";
  divButtonHide.setAttribute("mndf"             ,"N");
  divButtonHide.setAttribute("childCount"       ,"0");
  divButtonHide.setAttribute("value"       ,"onclick");
  divButtonHide.setAttribute("type"             ,"button");
 // divButtonDelete.textContent = "Delete";
    divButtonHide.setAttribute("onclick" ,"HideThis(this)");
this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   //<i class="fa fa-eye-slash" aria-hidden="true"></i>
   this.fontawesome.className       = "fa fa-eye-slash";
  
   divButtonHide.appendChild(this.fontawesome);




var divButtonAddChild=document.createElement("button");
  divButtonAddChild.setAttribute("parentid"        ,parentid );
  divButtonAddChild.setAttribute("baseid"         ,childDiv.id  );
  divButtonAddChild.type ="button";
  divButtonAddChild.setAttribute("childCount"       ,"0");
  divButtonAddChild.setAttribute("value"       ,"onclick");
  divButtonAddChild.setAttribute("type"             ,"button");
 // divButtonAddChild.textContent = "AddChild";
    divButtonAddChild.setAttribute("onclick" ,"NewChild(this)");
    this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa  fa-child";
  
   divButtonAddChild.appendChild(this.fontawesome);




var divButtonPreview=document.createElement("button");
  divButtonPreview.setAttribute("parentid"        ,parentid );
  divButtonPreview.setAttribute("baseid"          ,childDiv.id );
  divButtonPreview.type ="button";
  divButtonPreview.setAttribute("mndf"             ,"Y");
  divButtonPreview.setAttribute("childCount"       ,"0");
  divButtonPreview.setAttribute("value"       ,"onclick");
  divButtonPreview.setAttribute("type"             ,"button");
//  divButtonPreview.textContent = "Preview";
    divButtonPreview.setAttribute("onclick" ,"PreView(this)");

   this.fontawesome = document.createElement('i');
   //this.fontawesome.className       = "fa fa-repeat";
   this.fontawesome.className       = "fa  fa-television";
  
   divButtonPreview.appendChild(this.fontawesome);


var divCurrDivPreViewSession=document.createElement("div");
  divCurrDivPreViewSession.setAttribute("parentid"        ,parentid);
  divCurrDivPreViewSession.setAttribute("baseid"        ,childDiv.id );
  divCurrDivPreViewSession.setAttribute("id"               ,childDiv.id +"Preview"+"Id"  );
  divCurrDivPreViewSession.setAttribute("mndf"             ,"Y");
  divCurrDivPreViewSession.setAttribute("childCount"       ,"0");
  divCurrDivPreViewSession.setAttribute("type"             ,"container");
  divCurrDivPreViewSession.setAttribute("placeholder"             ,"name");
  divCurrDivPreViewSession.setAttribute("class"             ,"bsession row");
 


var divCurrDivPreViewHeader=document.createElement("div");
  divCurrDivPreViewHeader.setAttribute("parentid"         ,parentid);
  divCurrDivPreViewHeader.setAttribute("baseid"           ,childDiv.id );
  divCurrDivPreViewHeader.setAttribute("id"               ,childDiv.id +"PreViewHeader"+ "Id" );
  divCurrDivPreViewHeader.setAttribute("mndf"             ,"Y");
  divCurrDivPreViewHeader.setAttribute("childCount"       ,"0");
  divCurrDivPreViewHeader.setAttribute("type"             ,"container");
  divCurrDivPreViewHeader.setAttribute("placeholder"             ,"name");
  //divCurrDivPreViewHeader.setAttribute("class"             ,"bheader row");
  divCurrDivPreViewHeader.setAttribute("class"             ,"TreeContainerSchema");


var divCurrDivPreViewSession=this.CreateField(fieldObj,divCurrDivPreViewSession);




if ( fieldObj.htmlType =="CONTAINER" || fieldObj.htmlType =="PAGE"  )
{
  childDiv.setAttribute("class","bTreeContainer");
}
else
{
  //childDiv.setAttribute("class","bTreefield");
  childDiv.className = "bmargin";
}

              childHideDiv.appendChild(divCurrDivIdName);
              childHideDiv.appendChild(divCurrDivIdParentName);
              childHideDiv.appendChild(divCurrDivName);

              
              //properityWindowLabel.appendChild(this.genRowElement(divCurrDivDataTypeLabel));
               
                properityWindowLabel.appendChild(this.createRowElement( divButtonPreview, divButtonDelete));
               // properityWindowLabel.appendChild(divButtonDelete);
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivLabel));
            

              properityWindowLabel.appendChild(this.genRowElement(divCurrDivTask));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivXml));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivMaxCol));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivEntitle));
              
             // properityWindowLabel.appendChild(divCurrDivEntitle);
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivTips));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivMndf));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivMin));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivMax));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivDflt));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivDataType));
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivHtmlType));
             
              
              properityWindowLabel.appendChild(this.genRowElement(divCurrDivListVal));
              if(fieldObj.htmlType !="PAGE"  )
              {
                
                childHideDiv.appendChild(divButton);
              

              }

              
              childHideDiv.appendChild(divButtonDelete);
              childHideDiv.appendChild(divButtonHide);


              if(fieldObj.htmlType=="CONTAINER" || fieldObj.htmlType =="PAGE"  )
              {
                childHideDiv.appendChild(divButtonAddChild);
              
              

              }


              childHideDiv.appendChild(divButtonPreview);

              this.fontawesome = document.createElement('i');
              this.fontawesome.className       = "fa fa-eraser";

             // this.divDeletePreview=


             this.divClosePreview=document.createElement("div");
              this.divClosePreview.setAttribute("onclick","DeletePreview('"+childShowDiv.id+"');");
  
              this.divClosePreview.appendChild(this.fontawesome);
              childShowDiv.appendChild(this.divClosePreview);
              divCurrDivPreViewHeader.appendChild(childHideDiv);

             
  
              
              properityWindowLabel.appendChild(divCurrDivPreViewSession);
              divCurrDivPreViewHeader.appendChild(properityWindowLabel);


              childShowDiv.appendChild(properityWindowLabel);


              document.getElementById("properityWindow").appendChild(childShowDiv);

            //  document.getElementById("properityWindow").innerHTML
              
         // alert(     document.getElementById("properityWindow").innerHTML );

              childDiv.appendChild(divCurrDivPreViewHeader);
             // childDiv.appendChild(divCurrDivPreViewSession);


  return childDiv;

}

  


USS.prototype.ProcessSJson=function(SchemaJson,parentId)
{

  var ParentObj=document.createElement("div");

  //alert("GenSJson");
  //alert(SchemaJson);
  //var SchemaJsonTextId = document.getElementById("SchemaJsonTextId");
  var child=document.createElement("div");

  for( var i =0 ; i <  SchemaJson.length ; i++)
  {
    if (this.hasChild(SchemaJson[i]) )
    {
      
      child=this.AddSubling(SchemaJson[i],parentId);
      var childs=this.ProcessSJson(SchemaJson[i].childs ,child.id);

      child.appendChild(childs);

    }
    else
    {

      child=this.AddSubling(SchemaJson[i],parentId);
    }

    ParentObj.appendChild(child);

  }

  return ParentObj;
}



USS.prototype.DeleteThis=function(obj)
{



    var baseid   =obj.getAttribute("baseid");
    
    var curObj    = document.getElementById(baseid );


curObj.parentNode.removeChild(curObj);
    //Container2IdParentNameId

  

 


}

USS.prototype.DeletePreview=function(objId)
{

//Container1ProperityWindowLabelId
    
    var curObj    = document.getElementById(objId );


curObj.parentNode.removeChild(curObj);
    //Container2IdParentNameId

  

 


}



USS.prototype.onClickLink=function (objId,Link,title)
{
//  alert("onClickLink");
  
  try
  {
    var url="../helpWin/";
    url+=Link; 
    url+="?helpWin.sysDate=" +document.getElementById(objId).value;
    
      window.showModalDialog(url,title); 
  }
  catch(e)
  {
      alert("OCLExceprion:"+e);
  }
    
}


USS.prototype.HideThis=function(obj)
{

   //alert("hide");

    var baseid   =obj.getAttribute("baseid");
    
    var curObj    = document.getElementById("ContainerShow" + baseid );

    console.log(curObj.style.display);

    if( curObj.style.display != 'block')
    {
       curObj.style.display = 'block';
    }
    else
    {
      curObj.style.display = 'none'
    }
    /*
    if ( document.getElementById("properityWindow").innerHTML == "NONE" )
    {
      document.getElementById("properityWindow").innerHTML=curObj.innerHTML;
   // curObj.style.display = 'none';
    }
    else
    {
    //  curObj.style.display = 'block';
    document.getElementById("properityWindow").innerHTML="NONE";
    }
    */

   // obj.style.display = 'block';
    //setAttribute("display" ,"none");
//curObj.parentNode.removeChild(curObj);
    //Container2IdParentNameId

  

 


}







USS.prototype.AddChild = function(parentObj,fieldObj)
{


  var childDiv= document.createElement('div');

    childDiv.id = "Container" + ContinerCount++;
 

  return childDiv;


}
/*
USS.prototype.debug= function(obj)
{
	console.log("this is debug");
}
*/

//var ussObj=new USS();
exports.USS = USS;
/*
exports.USS.USSSetScript_				=ussObj.USSSetScript_				;
exports.USS.USSBrowserDetail_			=ussObj.USSBrowserDetail_			;
exports.USS.USSIncludeScript_			=ussObj.USSIncludeScript_			;
exports.USS.USSIncludeLinks_			=ussObj.USSIncludeLinks_			;
exports.USS.USSField_					=ussObj.USSField_					;
exports.USS.USSCreareTab_				=ussObj.USSCreareTab_				;
exports.USS.USSCreateContainer			=ussObj.USSCreateContainer			;
exports.USS.USSCreateHeader				=ussObj.USSCreateHeader			;
exports.USS.USSCreateSession 			=ussObj.USSCreateSession 			;
exports.USS.USSCreateTableRow_			=ussObj.USSCreateTableRow_			;
exports.USS.USSAppendTableRow			=ussObj.USSAppendTableRow			;
exports.USS.USSAppendTableField			=ussObj.USSAppendTableField		;
exports.USS.USSCreateTableRow_			=ussObj.USSCreateTableRow_			;
exports.USS.USSCreateAccordion			=ussObj.USSCreateAccordion			;
exports.USS.USSAccordionCreateDflt		=ussObj.USSAccordionCreateDflt		;
exports.USS.USSAppendAccordionDflt		=ussObj.USSAppendAccordionDflt		;
exports.USS.USSAppendAccordionHeader	=ussObj.USSAppendAccordionHeader	;
exports.USS.USSAppendAccordionHeader	=ussObj.USSAppendAccordionHeader	;
exports.USS.USSAppendAccordionSection	=ussObj.USSAppendAccordionSection	;
exports.USS.USSAppendAccordionSection	=ussObj.USSAppendAccordionSection	;
exports.USS.USSAppendAccordion          =ussObj.USSAppendAccordion         ;
exports.USS.USSAppendAccordionExapnd    =ussObj.USSAppendAccordionExapnd   ;
exports.USS.isContainer					=ussObj.isContainer				;
exports.USS.hasChild					=ussObj.hasChild					;
exports.USS.CreateField 		        =ussObj.CreateField 	
//exports.USS.debug 		                =ussObj.debug 		        ;

*/

});
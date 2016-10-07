/*
 2013 copyright Heaerie Global Solutions Ltd. Vellore.
  USS()
 @constructor

*/
//alert("import USS start");
function USS()
{
//	alert("USS");

	this.count=0;
	this.version="";
	this.USSScript="";
	this.USSBrowserDetail_()
//include system level javascripts
//	this.USSIncludeLinks_("xml.js")
	this.USSField_()
}

USS.prototype.USSGetScript_= function(script)
{
  USS.version += script;
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
this.validate   = '',
this.dflt       = '',
this.min        = '0',
this.max        = '60',
this.tips       = '',
this.onkeyup    = 'onKeyUp(this);',
this.onchange   = 'onChange(this);',
this.onkeydown  = 'onKeyDown(this);',
this.onkeypress = 'onKeyPress(this);',
this.onclick    = '(this);',
this.listVal    = '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
this.help       = 'N',
this.helpLink   = 'helpload',
this.xml        = 'N',
this.Xpath      = '/'
	
}
USS.prototype.USSCreareTab_=function()
{
	
  this.searchResultsEl = document.createElement("div");
  this.searchResultsEl.id = 'searchAsYouTypeResults1';
  this.searchResultsEl.className = 'searchResults';
  this.searchResultsEl.style.display = 'none'; 
  this.searchResultsEl.style.position = 'absolute'; 
  this.searchResultsEl.onclick = 'event.cancelBubble = true;';
  this.searchResultsEl.tabIndex = -1;

	
}
//alert("import USS end");

USS.prototype.USSCreateTable_=function()
{
	
  this.ussTable = document.createElement("table");
  this.ussTable.id = 'mainTable';
  this.ussTable.className = 'ctable';
  this.ussTable.border=0;
 // this.ussTable.style.display  = 'none'; 
 // this.ussTable.style.position = 'absolute'; 
  this.ussTable.onclick = 'event.cancelBubble = true;';
  this.ussTable.tabIndex = -1;

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
	
  this.ussTableRow = document.createElement("tr");
  this.ussTableRow.className = 'ctablerow';
  this.ussTableRow.border=1;
  this.ussTableRow.onclick = 'event.cancelBubble = true;';
  this.ussTableRow.tabIndex = -1;

return this.ussTableRow;
	
}

//accordion

USS.prototype.USSCreateAccordion=function(id)
{

this.ussTableAccordion= document.createElement("div");
this.ussTableAccordion.id= "container"+id;
return this.ussTableAccordion;
	
}


USS.prototype.USSAppendAccordionHeader=function(obj,title)
{

this.ussTableAccordion=obj; 
this.ussTableAccordionH= document.createElement("div");
this.ussTableAccordionH.className ="headline" ;
this.ussTableAccordionSpan= document.createElement("span");
this.ussTableAccordionSpan.border=1;
this.newContent = document.createTextNode(title);
this.ussTableAccordionH.appendChild(this.newContent);
this.ussTableAccordion.appendChild(this.ussTableAccordionH);
return this.ussTableAccordion;
	
}


USS.prototype.USSAppendAccordionSection=function(obj ,table)
{

this.ussTableAccordion= obj; //document.createElement("div");
this.ussTableAccordionDiv=document.createElement("div");
this.ussTableAccordionDiv.className ="section" ;
this.ussTableAccordion.border=1;
this.ussTableAccordionDiv.innerHTML=table.outerHTML;
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

USS.prototype.CreateField=function (fieldObj,USSTableRow)
{
	var rtString = "";
	var fldStr="";	

try
{
pre_cust_CreateField(fieldObj,USSTableRow)
}
catch(e)
{
}
 
	try
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
                                this.tableBodyTr=document.createElement("tr");
				this.tableBodyTd=document.createElement("td");
				this.tableBodyTd.id="td";
				this.tableBodyTd.className = 'ctext';

				this.tableBodyTd2=document.createElement("td");
				this.tableBodyTd2.className = 'ctext';
		
				if((fieldObj.dataType =='HIDDEN')||(fieldObj.dataType == 'XMLCONTAINER')||(fieldObj.dataType =='BUTTON'))
				{
				//don't include the lable for hidden
					;
				}
				else
				{


					this.tableBodyLabel=document.createElement("label");
					this.tableBodyLabel.className = 'clabel';
					this.tableBodyLabel.setAttribute("for",fieldObj.name);
					this.tableBodyLabelContent = document.createTextNode(fieldObj.label.toLowerCase());
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
					this.tableBodySelect.for = fieldObj.name; 
					var inpStrArr= fieldObj.listVal.split('|');
					for(var i=0 ; i< inpStrArr.length;i+=2)
					{
						if( fieldObj.dflt == inpStrArr[i])
						{
							this.tableBodyOption=document.createElement("option");
							this.tableBodyOption.value=inpStrArr[i];
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
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = '';
				//<img src="../img/loading.gif">
					this.tableBodyElmntImg=document.createElement("img");
					this.tableBodyElmntImg.src="../img/loading.gif";
					this.tableBodyElmnt.appendChild(this.tableBodyElmntImg);
				}
				else if(fieldObj.htmlType =='BUTTON')
				{
					this.tableBodyElmnt=document.createElement("button");
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
					this.tableBodyElmnt.appendChild(document.createTextNode(fieldObj.dflt));
				}		
				else if(fieldObj.htmlType =='LOB')
				{
					this.tableBodyElmnt=document.createElement("textarea");
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else if(fieldObj.htmlType =='HIDDEN')
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="hidden";
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else if(fieldObj.htmlType =='LABEL')
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="text";
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctext';
					this.tableBodyElmnt.readonly=true;
				}
				else if(fieldObj.htmlType =='PASSWORD')
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="password";
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else if (fieldObj.htmlType == 'OPTION') 
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="hidden";
					this.tableBodyElmnt.setAttribute("readonly","true");

					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
					var inpStrArr= fieldObj.listVal.split('|');
					var fldStr="";
					var rtString="";
					for(var i=0 ; i< inpStrArr.length;i+=2)
					{
						if (fieldObj.dflt ==inpStrArr[i] ) 
						{
						
							fldStr='<input  type="radio" checked=true dataType="'+fieldObj.dataType+'" htmlType="'+fieldObj.htmlType+'"    xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" > '+ inpStrArr[i+1] ;
						}
						else
						{
							fldStr='<input  type="radio" dataType="'+fieldObj.dataType+'"   xmlname="'+fieldObj.name+'" htmlType="'+fieldObj.htmlType+'"   name="'+fieldObj.group+'_'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" > '+ inpStrArr[i+1] ;
						}
					rtString+=fldStr;
					}
					this.tableBodyElmntRadio=document.createElement("div");
					this.tableBodyElmntRadio.innerHTML=rtString;
				}
				else if (fieldObj.htmlType == 'XMLCONTAINER') 
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="hidden";
					this.tableBodyElmnt.name=fieldObj.group+'_'+fieldObj.name ;
					this.tableBodyElmnt.className = 'ctable';
				}
				else
				{
					this.tableBodyElmnt=document.createElement("input");
					this.tableBodyElmnt.type="input";
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
						fldStr='<input type="text"  readonly class="label" name="'+fieldObj.group+'_'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'" >';
						rtString+=fldStr;
					}
					this.tableBodyElmntDesc.innerHTML=rtString;
				}
			}
	}
	catch(e)
	{
			alert("CFCException :" +e);
	}
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
	this.tableBodyElmnt.max =fieldObj.max;
	this.tableBodyElmnt.min =fieldObj.min;
	this.tableBodyElmnt.value=fieldObj.dflt;
	
	this.tableBodyElmnt.setAttribute("value",fieldObj.dflt);
	this.tableBodyElmnt.setAttribute("dflt",fieldObj.dflt);
	this.tableBodyElmnt.setAttribute("ErrorBox",fieldObj.name +"ErrorBox");
	this.tableBodyElmnt.setAttribute("label",fieldObj.label);
	this.tableBodyElmnt.setAttribute("title",fieldObj.tips);
	this.tableBodyElmnt.setAttribute("onchange",fieldObj.onchange);
	this.tableBodyElmnt.setAttribute("onclick",fieldObj.onclick);
	this.tableBodyElmnt.setAttribute("onblure",fieldObj.onblure);
	this.tableBodyElmnt.setAttribute("onkeydown",fieldObj.onkeydown);
	this.tableBodyElmnt.setAttribute("onkeyup",fieldObj.onkeyup);
	this.tableBodyElmnt.setAttribute("onkeypress",fieldObj.onkeypress);
	this.tableBodyElmnt.setAttribute("task",fieldObj.task);

	if((fieldObj.dataType =='HIDDEN')||(fieldObj.dataType == 'XMLCONTAINER')||(fieldObj.dataType =='BUTTON'))
	{
	}
	else
	{
	this.tableBodyTd.appendChild(this.tableBodyLabel);
	USSTableRow.appendChild(this.tableBodyTd);
	}
	this.tableBodyTd2.appendChild(this.tableBodyElmnt);
	this.tableBodyTd2.appendChild(this.tableBodyElmntDesc);

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
//jsfunc += "	 url='get"+ fieldObj.name.substring(0,1).toUpperCase() + fieldObj.name.substring(1,fieldObj.name.length) +".php';";
jsfunc += "	 url='../service/"+ fieldObj.name.substring(0,1).toUpperCase() + fieldObj.name.substring(1,fieldObj.name.length) +"';";
jsfunc += "	 json={USRID:glUserId, GROUPID:glGroupId ,class:'ctext' ,name:'Religion'  ,class:'ctext' ,xml:'N' ,mndf:'N' ,datatype:'VARCHAR' ,htmltype:'DIV' ,id : 'religion' ,errorbox :'religionErrorBox' ,label : 'Religion' ,title :'' ,onchange :'onChange(this)' ,onclick :'onClick(this)' ,onblure :'undefined' ,onkeydown : 'onKeyDown(this)' ,onkeyup :'onKeyUp(this)' ,onkeypress :'onKeyPress(this)' ,task : 'NONE' };";
jsfunc += "	onPostReq(url,json,div,'DIV');";



this.USSScript +=  jsfunc;
//var scriptElmnt= document.createElement("script");



//scriptElmnt.appendChild(document.createTextNode(jsfunc));

//USS.USSSetScript_(jsfunc);

//document.getElementById('middleid').appendChild(scriptElmnt);
/*[
this.jsfunc =  " div='" + fieldObj.name+"';";
//url='get"+ fieldObj.name.substring(0,1).toUpperCase() + fieldObj.name.substring(1,str.length).toLowerCase() +".php';

//this.jsfunc+="url='get" +  fieldObj.name + ".php;";
this.jsfunc+="url='../service/" +  fieldObj.name + ";";
this.jsfunc+="json={USRID:glUserId, GROUPID:glGroupId }; onPostReq(url,json,div,'DIV');";

		this.tableBodyElmntScript.appendChild( document.createTextNode(this.jsfunc) );
//	document.header.
*/
	}

	this.tableBodyTd2.appendChild(this.tableBodyElmntScript);


	USSTableRow.appendChild(this.tableBodyTd2);

try
{
post_cust_CreateField(fieldObj,USSTableRow);
}
catch(e)
{
}

	return USSTableRow;
}

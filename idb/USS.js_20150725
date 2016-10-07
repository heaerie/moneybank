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
	this.USSField_()
	this.resourcesPath="";
}

USS.prototype.USSGetScript_= function(script)
{
  USS.version += script;
}

USS.prototype.initCapWord=function (s)
{
    //return s[0].toUpperCase() + s.slice(1); //need to fix  thru excpection ####
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
  this.ussTableRow.className = 'row';
  this.ussTableRow.border=1;
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
                                this.tableBodyTr=document.createElement("div");
                                this.tableBodyTr.className="row";
				this.tableBodyTd=document.createElement("div");
				this.tableBodyTd.id="td";
				this.tableBodyTd.className = 'col-sm-6';

				this.tableBodyTd2=document.createElement("div");
				this.tableBodyTd2.className = 'col-sm-6';
		
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
							
								fldStr='<div class="col-sm-6" > <input disabled="true" type="radio" checked=true dataType="'+fieldObj.dataType+'" htmlType="'+fieldObj.htmlType+'"    xmlname="'+fieldObj.name+'" name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" > <label class="clabel" >'+ inpStrArr[i+1]  + '</label > </div>';
							}
							else
							{
								fldStr='<div class="col-sm-6" >  <input disabled="true"   type="radio" dataType="'+fieldObj.dataType+'"   xmlname="'+fieldObj.name+'" htmlType="'+fieldObj.htmlType+'"   name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" >  <label class="clabel" >'+ inpStrArr[i+1]  + '</label >  </div>' ;
							}
						}
						else
						{
							if (fieldObj.dflt ==inpStrArr[i] ) 
							{
							
								fldStr=' <div class="col-sm-6" >  <input  type="radio" checked=true dataType="'+fieldObj.dataType+'" htmlType="'+fieldObj.htmlType+'"    xmlname="'+fieldObj.name+'" name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" >  <label class="clabel" >'+ inpStrArr[i+1]  + '</label >  </div>';
							}
							else
							{
								fldStr='<div class="col-sm-6" >  <input  type="radio" dataType="'+fieldObj.dataType+'"   xmlname="'+fieldObj.name+'" htmlType="'+fieldObj.htmlType+'"              name="'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" >  <label class="clabel" >'+ inpStrArr[i+1]  + '</label >  </div>';
							}

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
					this.tableBodyElmnt.name=fieldObj.name ;
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
						fldStr='<input type="text"  readonly class="label" name="'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'" >';
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
	this.tableBodyElmnt.setAttribute( "maxlength" ,fieldObj.max);
	this.tableBodyElmnt.setAttribute("min" , fieldObj.min);
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
	if (fieldObj.dataType == 'PAGE')
	{
		this.tableBodyElmnt.setAttribute("parent","/");
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


	}

	this.tableBodyElmntScript.text=jsfunc;

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
//alert("import USS");


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

	var data={};


	
	USS.prototype.commFrameGen=  function (rec,recSch,func)
	{
		var commonHeader="var us = new USS(); var USSContainer0 =    us.USSCreateContainer(); var USSHeader    = ''";
		

		
		var vcommonFrameGen = this.frameGenerationJson(recSch,
	{
 name       : 'Dashboard'
,label      : 'Dashboard'
,task       : 'NONE'
,desc       : ''
,htmlType   : 'PARENT' 
,entitle    : 'READONLY' 
,enttlname  : ''
,mndf       : 'N'
,dataType   : 'CONTAINER'
,cclass     : 'ctable'
,validate   : ''
,parent     : 'Dashboard_0_0'
,dflt       : ''
,min        : '0'
,max        : '20'
,tips       : ''
,onkeyup    : 'onKeyUp(this);'
,onchange   : 'onChange(this);'
,onkeydown  : 'onKeyDown(this);'
,onkeypress : 'onKeyPress(this);'
,onclick    : 'onClick(this);'
,listVal    : '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY'
,help       : 'N'
,helpLink   : 'helpload'
,xml        : 'Y'
,Xpath      : '/'
,childs     : recSch
} 
);
		

		
		
var commonTailer=""
commonTailer+="\n document.getElementById('middleid').appendChild(USSContainer0); ";

//USSAccordion2=new us.USSAppendAccordion(USSAccordion1,"Actions", USSTable);
		
		
		return commonHeader + vcommonFrameGen + commonTailer;
		
		
	}
	
	
	USS.prototype.sprint= function (str)
	{
		console.log(" " + str + " ");
		return "\n " + str + " ";
	}
	
	
	USS.prototype.debug= function (str)
	{
		//document.write("\n <!--### " + str + "-->");
		console.log("<!--### " + str + "--> ");
	}
	


USS.prototype.commFrameGen=  function (rec,recSch,func,pageNameId,pageNameLabel)
	{
		var commonHeader="var us = new USS(); var USSContainer0 =    us.USSCreateContainer(); var USSHeader    = ''";
		

		
		var vcommonFrameGen = this.frameGenerationJson(recSch,
	{
 name       : pageNameId
,label      : pageNameLabel
,task       : 'NONE'
,desc       : ''
,htmlType   : 'PARENT' 
,entitle    : 'READONLY' 
,enttlname  : ''
,mndf       : 'N'
,dataType   : 'CONTAINER'
,cclass     : 'ctable'
,validate   : ''
,parent     : 'Dashboard_0_0'
,dflt       : ''
,min        : '0'
,max        : '20'
,tips       : ''
,onkeyup    : 'onKeyUp(this);'
,onchange   : 'onChange(this);'
,onkeydown  : 'onKeyDown(this);'
,onkeypress : 'onKeyPress(this);'
,onclick    : 'onClick(this);'
,listVal    : '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY'
,help       : 'N'
,helpLink   : 'helpload'
,xml        : 'Y'
,Xpath      : '/'
,childs     : recSch
} 
);
		

		
		
var commonTailer=""
commonTailer+="\n document.getElementById('middleid').appendChild(USSContainer0); ";

//USSAccordion2=new us.USSAppendAccordion(USSAccordion1,"Actions", USSTable);
		
		
		return commonHeader + vcommonFrameGen + commonTailer;
		
		
	}
	
	
	USS.prototype.sprint= function (str)
	{
		console.log(" " + str + " ");
		return "\n " + str + " ";
	}
	
	
	USS.prototype.debug= function (str)
	{
		//document.write("\n <!--### " + str + "-->");
		console.log("<!--### " + str + "--> ");
	}



USS.prototype.frameGenerationJson = function (
 recSch
,parent
)
{   var lv_str ="";	
	var lv_rtStr="";
 	var objEvalStr ="";
	var ReturnArray = ""
	
	ReturnArray += parent.name +":[  {"
	try
	{

		

	if( parent.dataType == "CONTAINER" ||   parent.dataType == "PAGE"  )
	{
	
		
		
		for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)

		{
			
			
		
			if( this.hasChild(recSch[recSchCnt]))
			{



			var ArrayRetn  = this.frameGenerationJson(recSch[recSchCnt].childs,recSch[recSchCnt]);
				
					//ReturnArray.push( eval( "{" + parent.name +":" + ArrayRetn +"}") );
			if(recSchCnt == 0)
			{
				ReturnArray += ""
			}
			else
			{
				ReturnArray += "},{"
			}
				ReturnArray +=  ArrayRetn ;
			
//				ReturnArray
				
			
			}
			else 
			{	
			if(recSchCnt != 0)
			{
				ReturnArray += ","
			}
					//console.log("col");
				//	console.log(eval( "{" + recSch[recSchCnt].name +":" + recSch[recSchCnt].name+ recSchCnt +"}" ));
					
				 ReturnArray += recSch[recSchCnt].name +":'" + recSch[recSchCnt].dflt +"'";

				
			}
		
		
		}
		
	//	ReturnArray +="]"
 	
	}
	else if(parent.dataType == "COLLECTION" )
	{


		for(var recCnt=0 ; recCnt < (( parent.max == "unlimited" ) ? 1 : parent.max  ) ; recCnt++)
		{

		for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)

		{
			if(recSchCnt != 0)
			{
				ReturnArray += ","
			}
			
		
			if( this.hasChild(recSch[recSchCnt]))
			{
			var ArrayRetn  = this.frameGenerationJson(recSch[recSchCnt].childs,recSch[recSchCnt]);
				
					//ReturnArray.push( eval( "{" + parent.name +":" + ArrayRetn +"}") );
				
				ReturnArray +=  ArrayRetn ;
//				ReturnArray
				
			
			}
			else 
			{	
			
					//console.log("col");
				//	console.log(eval( "{" + recSch[recSchCnt].name +":" + recSch[recSchCnt].name+ recSchCnt +"}" ));
					
				 ReturnArray += recSch[recSchCnt].name +":'" + recSch[recSchCnt].dflt +"'";

				
			}
		}
		
		}

	}

	
	
}
catch(e)
{
	alert("Exception" + e);
}


	
	ReturnArray +="}]";

	//alert(ReturnArray);

	return ReturnArray;
}



USS.prototype.frameGenerationResoure= function (
 recSch
,parent
)
{   var lv_str ="";	
	var lv_rtStr="";
 	var objEvalStr ="";
	var ReturnArray = ""

	
	ReturnArray += parent.name +":[ \n {"
	try
	{

		

	if( parent.dataType == "CONTAINER" || parent.dataType == "PAGE" )
	{
	
		
		
		for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)

		{
			
			
		
			if( this.hasChild(recSch[recSchCnt]))
			{



			var ArrayRetn  = this.frameGenerationResoure(recSch[recSchCnt].childs,recSch[recSchCnt]);
				
					//ReturnArray.push( eval( "{" + parent.name +":" + ArrayRetn +"}") );
			if(recSchCnt == 0)
			{
				ReturnArray += ""
			}
			else
			{
				ReturnArray += "},\n{\n"
			}
				ReturnArray +=  ArrayRetn ;
			
//				ReturnArray
				
			
			}
			else 
			{	
			if(recSchCnt != 0)
			{
				ReturnArray += ",\n"
			}
					//console.log("col");
				//	console.log(eval( "{" + recSch[recSchCnt].name +":" + recSch[recSchCnt].name+ recSchCnt +"}" ));
					
				 ReturnArray += recSch[recSchCnt].name +":'" + recSch[recSchCnt].label +"'";

				
			}
		
		
		}
		
	//	ReturnArray +="]"
 	
	}
	else if(parent.dataType == "COLLECTION" )
	{


		for(var recCnt=0 ; recCnt < (( parent.max == "unlimited" ) ? 1 : parent.max  ) ; recCnt++)
		{

			for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)

		{
			
			
		
			if( this.hasChild(recSch[recSchCnt]))
			{



			var ArrayRetn  = this.frameGenerationResoure(recSch[recSchCnt].childs,recSch[recSchCnt]);
				
					//ReturnArray.push( eval( "{" + parent.name +":" + ArrayRetn +"}") );
			if(recSchCnt == 0)
			{
				ReturnArray += ""
			}
			else
			{
				ReturnArray += "},\n{\n"
			}
				ReturnArray +=  ArrayRetn ;
			
//				ReturnArray
				
			
			}
			else 
			{	
			if(recSchCnt != 0)
			{
				ReturnArray += "\n,"
			}
					//console.log("col");
				//	console.log(eval( "{" + recSch[recSchCnt].name +":" + recSch[recSchCnt].name+ recSchCnt +"}" ));
					
				 ReturnArray += recSch[recSchCnt].name +":'" + recSch[recSchCnt].label +"'";

				
			}
		
		
		}
		}

	}

	
	
}
catch(e)
{
	alert("Exception" + e);
}


	
	ReturnArray +="\n} \n]";

	//alert(ReturnArray);

	return ReturnArray;
}





USS.prototype.frameGenerationListVal=function (
 recSch
,parent
)
{   var lv_str ="";	
	var lv_rtStr="";
 	var objEvalStr ="";
	var ReturnArray = ""
	
	ReturnArray += parent.name +":[ \n {"
	try
	{

		

	if( parent.dataType == "CONTAINER" ||   parent.dataType == "PAGE"  )
	{
	
		
		
		for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)

		{
			
			
		
			if( this.hasChild(recSch[recSchCnt]))
			{



			var ArrayRetn  = this.frameGenerationListVal(recSch[recSchCnt].childs,recSch[recSchCnt]);
				
					//ReturnArray.push( eval( "{" + parent.name +":" + ArrayRetn +"}") );
			if(recSchCnt == 0)
			{
				ReturnArray += ""
			}
			else
			{
				ReturnArray += "},\n{\n"
			}
				ReturnArray +=  ArrayRetn ;
			
//				ReturnArray
				
			
			}
			else 
			{	
			if(recSchCnt != 0)
			{
				ReturnArray += ",\n"
			}
					//console.log("col");
				//	console.log(eval( "{" + recSch[recSchCnt].name +":" + recSch[recSchCnt].name+ recSchCnt +"}" ));
					
				// ReturnArray += recSch[recSchCnt].name +":'" + recSch[recSchCnt].listVal +"'";

				 //start list
				 var   listValArr= recSch[recSchCnt].listVal.split('|');

				 	var tmpStr= "{"
					for(var i=0 ; i< listValArr.length;i+=2)
					{
						if(listValArr[i]  == '')
						{
							if( i == 0)
							{
								tmpStr += " NONE: '" + listValArr[i+1] + "'";
							}
							else
							{
								tmpStr += ",NONE: '" + listValArr[i+1] + "'";
							}
						}
						else
						{
							if( i == 0)
							{
								tmpStr += " "+ listValArr[i]  +": '" + listValArr[i+1] + "'";
							}
							else
							{
								tmpStr += ","+ listValArr[i]  +": '" + listValArr[i+1] + "'";
							}

						}
 
					}
					tmpStr+= "}";

					ReturnArray += recSch[recSchCnt].name +":[" + tmpStr +"]";

				//	ReturnArray += recSch[recSchCnt].name +":['" + listValArr+"']";
				// end list
				
			}
		
		
		}
		
	//	ReturnArray +="]"
 	
	}
	else if(parent.dataType == "COLLECTION" )
	{


		for(var recCnt=0 ; recCnt < (( parent.max == "unlimited" ) ? 1 : parent.max  ) ; recCnt++)
		{

			for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)

		{
			
			
		
			if( this.hasChild(recSch[recSchCnt]))
			{



			var ArrayRetn  = this.frameGenerationListVal(recSch[recSchCnt].childs,recSch[recSchCnt]);
				
					//ReturnArray.push( eval( "{" + parent.name +":" + ArrayRetn +"}") );
			if(recSchCnt == 0)
			{
				ReturnArray += ""
			}
			else
			{
				ReturnArray += "},\n{\n"
			}
				ReturnArray +=  ArrayRetn ;
			
//				ReturnArray
				
			
			}
			else 
			{	
			if(recSchCnt != 0)
			{
				ReturnArray += "\n,"
			}
					//console.log("col");
				//	console.log(eval( "{" + recSch[recSchCnt].name +":" + recSch[recSchCnt].name+ recSchCnt +"}" ));
					
				 ReturnArray += recSch[recSchCnt].name +":'" + recSch[recSchCnt].label +"'";

				
			}
		
		
		}
		}

	}

	
	
}
catch(e)
{
	alert("Exception" + e);
}


	
	ReturnArray +="\n} \n]";

	//alert(ReturnArray);

	return ReturnArray;
}

USS.prototype.jsonToListVal= function (list,obj)
{
	var listArr=list.split('|');
	var returnStr="";
	try
	{

		for(var i= 0; i< listArr.length ; i+=2)
	{
		if( i==0)
		{
			returnStr+=  listArr[i]      +"|" +  eval( "obj[0]." + listArr[i])  ;
		}
		else
		{
			returnStr+=   "|" + listArr[i]  +"|" +  eval( "obj[0]." + listArr[i]) ;
		}

	}
	}
	catch(e)
	{
		//alert("jsonToListVal" + list  );
		console.log("jsonToListVal:Exception" +e);
	}
	
	return returnStr


}
	
USS.prototype.frameField=function (recSch,varStrVal,varLabelStrVal,varStrListVal,func)
{
	var lv_str="";
	if ( varStrVal === undefined)
	varStrVal=="";


	lv_str  += "\n USSTableRow = us.USSCreateTableRow_();	";
	lv_str  += "\n USSField    = new us.USSField_(); ";
	lv_str  += "\n USSField" + "." + "group"      + "=" + "'" + recSch.group      + "'" + ";"
	lv_str  += "\n USSField" + "." + "name"       + "=" + "'" + recSch.name       + "'" + ";"
	lv_str  += "\n USSField" + "." + "label"      + "=" + "'" + varLabelStrVal    + "'" + ";"
	lv_str  += "\n USSField" + "." + "task"       + "=" + "'" + recSch.task       + "'" + ";"
	lv_str  += "\n USSField" + "." + "desc"       + "=" + "'" + recSch.desc       + "'" + ";"
	lv_str  += "\n USSField" + "." + "htmlType"   + "=" + "'" + recSch.htmlType   + "'" + ";"


	if ( func == "Y" )
	{
		lv_str  += "\n USSField" + "." + "entitle"    + "=" + "'" + recSch.entitle    + "'" + ";"
	}
	else
	{
		lv_str  += "\n USSField" + "." + "entitle"    + "=" + "'READONLY'" + ";"
	}
	lv_str  += "\n USSField" + "." + "enttlname"  + "=" + "'" + recSch.enttlname  + "'" + ";"
	lv_str  += "\n USSField" + "." + "mndf"       + "=" + "'" + recSch.mndf       + "'" + ";"
	lv_str  += "\n USSField" + "." + "dataType"   + "=" + "'" + recSch.dataType   + "'" + ";"
	lv_str  += "\n USSField" + "." + "cclass"     + "=" + "'" + recSch.cclass     + "'" + ";"
	lv_str  += "\n USSField" + "." + "validate"   + "=" + "'" + recSch.validate   + "'" + ";"
	lv_str  += "\n USSField" + "." + "parent"     + "=" + "'" + recSch.parent     + "'" + ";"
	lv_str  += "\n USSField" + "." + "dflt"       + "=" + "'" + varStrVal         + "'" + ";"
	lv_str  += "\n USSField" + "." + "min"        + "=" + "'" + recSch.min        + "'" + ";"
	lv_str  += "\n USSField" + "." + "max"        + "=" + "'" + recSch.max        + "'" + ";"
	lv_str  += "\n USSField" + "." + "tips"       + "=" + "'" + recSch.tips       + "'" + ";"
	lv_str  += "\n USSField" + "." + "onkeyup"    + "=" + "'" + recSch.onkeyup    + "'" + ";"
	lv_str  += "\n USSField" + "." + "onchange"   + "=" + "'" + recSch.onchange   + "'" + ";"
	lv_str  += "\n USSField" + "." + "onkeydown"  + "=" + "'" + recSch.onkeydown  + "'" + ";"
	lv_str  += "\n USSField" + "." + "onkeypress" + "=" + "'" + recSch.onkeypress + "'" + ";"
	lv_str  += "\n USSField" + "." + "onclick"    + "=" + "'" + recSch.onclick    + "'" + ";"

	if(recSch.htmlType  == 'LIST'  || recSch.htmlType  == 'OPTION' )
	{
		lv_str  += "\n USSField" + "." + "listVal"    + "=" + "'" + this.jsonToListVal(recSch.listVal,varStrListVal)   + "'" + ";"
	}
	else
	{
		lv_str  += "\n USSField" + "." + "listVal"    + "=" + "'" + recSch.listVal    + "'" + ";"

	}
	lv_str  += "\n USSField" + "." + "help"       + "=" + "'" + recSch.help       + "'" + ";"
	lv_str  += "\n USSField" + "." + "helpLink"   + "=" + "'" + recSch.helpLink   + "'" + ";"
	lv_str  += "\n USSField" + "." + "xml"        + "=" + "'" + recSch.xml        + "'" + ";"
	lv_str  += "\n USSField" + "." + "xmlname"        + "=" + "'" + recSch.xmlname        + "'" + ";"
	lv_str  += "\n USSField" + "." + "Xpath"      + "=" + "'" + recSch.Xpath      + "'" + ";"
	lv_str  += "\n USSTableRow=us.CreateField(USSField,USSTableRow);";

return lv_str;

}


USS.prototype.frameGeneration=  function (
listVal
,recLabel
,rec
,recSch
,parent
,level
,func
,parentCnt
)
{   var lv_str ="";	
	var lv_rtStr="";
	



//	try
//	{

lv_str += this.sprint( "USSContainer"+level+"   =   us.USSCreateContainer();");

parent.htmlType="hidden";
	
	if( parent.dataType == "CONTAINER" ||   parent.dataType == "PAGE"  )
	{
	
	
		
		lv_str += this.sprint('USSTable'  +  level +'     =   new us.USSCreateTable_();');
		lv_str += this.sprint('USSHeader' +  level +'     =   us.USSCreateHeader("'+ parent.label+'");');
		lv_str += this.sprint('USSSession'+  level +'     =   us.USSCreateSession();' );
		
				parent.name = parent.name + "_"+level + "_"+ 0;

				lv_rtStr=this.frameField(parent,'','','',func,parent.name);
				lv_str += this.sprint(lv_rtStr);
				lv_str += this.sprint('USSSession'+  level +'.appendChild(USSTableRow);' );


		
		for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)
		{
		
		recSch[recSchCnt].parent=parent.name;


			//alert("recSchCnt=<"  + recSchCnt + "> recSch.length  =<" + recSch.length  + ">recSch["+recSchCnt+"].dataType " + recSch[recSchCnt].dataType  );
			//alert("recSchCnt="  + recSchCnt);

			
			
			if( this.hasChild(recSch[recSchCnt]))
			{

				console.log(rec);
				var evalStr="rec["+recSchCnt+"]." +recSch[recSchCnt].name;
				var labelEvalStr="recLabel["+recSchCnt+"]." +recSch[recSchCnt].name;
				var listValEvalStr="listVal["+recSchCnt+"]." +recSch[recSchCnt].name;
			this.debug(" evalStr =["+ evalStr+"]");
			var  objEvalStr=eval(evalStr);

			console.log(recLabel);
			
			this.debug(" labelEvalStr =["+ labelEvalStr+"]");
			var  labelObjEvalStr=eval(labelEvalStr);
			var  listValObjEvalStr=eval(listValEvalStr);

			


				lv_rtStr  = this.frameGeneration(listValObjEvalStr,labelObjEvalStr,objEvalStr,recSch[recSchCnt].childs,recSch[recSchCnt],level+1,func,recSchCnt);
				lv_str+= this.sprint(lv_rtStr);

				lv_str += this.sprint("USSSession"+level+".appendChild(USSContainer"+(level+1)+");");
			
			}
			else 
			{


				var evalStr="rec["+0+"]." +recSch[recSchCnt].name;
				var labelEvalStr="recLabel["+0+"]." +recSch[recSchCnt].name;
				var listValEvalStr="listVal["+0+"]." +recSch[recSchCnt].name;
				this.debug(" evalStr =["+ evalStr+"]");
			var  objEvalStr=eval(evalStr);


			
			this.debug(" labelEvalStr =["+ labelEvalStr+"]");
			var  labelObjEvalStr=eval(labelEvalStr);
			var  listValObjEvalStr=eval(listValEvalStr);

					//alert("objEvalStr=" + objEvalStr);
					if( objEvalStr === undefined)
					{
						objEvalStr='';
					}

					if( labelObjEvalStr === undefined)
					{
						labelObjEvalStr='';
					}

					

				lv_rtStr= this.frameField(recSch[recSchCnt],objEvalStr,labelObjEvalStr,listValObjEvalStr,func,level,recSchCnt);
				lv_str += this.sprint(lv_rtStr);
				lv_str += this.sprint('USSSession'+  level +'.appendChild(USSTableRow);' );
			}
		
		
		}
 		
lv_str += this.sprint( "USSContainer"+level+".appendChild(USSHeader" +  level +" );");
	lv_str += this.sprint( "USSContainer"+level+".appendChild(USSSession" +  level +" );");
		

		//lv_str+= this.sprint("USSAccordion"+level+"           =new us.USSAppendAccordionDflt(USSAccordion"+level+",USSAppendAccordionDflt"+(level)+" ) ;");

		
					
	
	}
	if( parent.dataType == "COLLECTION")
	{



		
//alert("parent.max" + parent.max);
		var MaxRecCount=0;
		if(parent.max =="unlimited")
		{

			MaxRecCount=rec.length;
		}
		else
		{
			MaxRecCount=parent.max;
		}
		for(var recCnt= 0; recCnt < MaxRecCount; recCnt++)
		{		
			lv_str += this.sprint('USSTable'  +  level +'     =   new us.USSCreateTable_();');
			lv_str += this.sprint('USSHeader' +  level +'     =   us.USSCreateHeader("'+ parent.label+'");');
			lv_str += this.sprint('USSSession'+  level +'     =   us.USSCreateSession();' );

			lv_rtStr=this.frameField(parent,'','','',func,level,recCnt,parent.name);
				lv_str += this.sprint(lv_rtStr);
				lv_str += this.sprint('USSSession'+  level +'.appendChild(USSTableRow);' );
			
			for (var recSchCnt=0;recSchCnt < recSch.length ; recSchCnt++)
			{
			
			


				//alert("recSchCnt=<"  + recSchCnt + "> recSch.length  =<" + recSch.length  + ">recSch["+recSchCnt+"].dataType " + recSch[recSchCnt].dataType  );
				//alert("recSchCnt="  + recSchCnt);

				var evalStr="rec["+recCnt+"]." +recSch[recSchCnt].name;
				this.debug(" evalStr =["+ evalStr+"]");
				var  objEvalStr="";


			var labelEvalStr   ="rec["+recCnt+"]." +recSch[recSchCnt].name;
			var listValEvalStr ="listVal["+recCnt+"]." +recSch[recSchCnt].name;
			this.debug(" labelEvalStr =["+ labelEvalStr+"]");
			var  labelObjEvalStr=eval(labelEvalStr);
			var  listValObjEvalStr=eval(listValEvalStr);

				try
				{
				  objEvalStr=eval(evalStr);
				}
				catch(e)
				{
					//alert("OES Exception " +e);
					objEvalStr="";
				}
				
				if( uss.hasChild(recSch[recSchCnt]))
				{
					lv_rtStr  = this.frameGeneration(listValObjEvalStr,labelEvalStr,objEvalStr,recSch[recSchCnt].childs,recSch[recSchCnt],level+1,func,recSchCnt);
					lv_str+= this.sprint(lv_rtStr);

					lv_str += this.sprint("USSSession"+level+".appendChild(USSContainer"+(level+1)+");");
				
				}
				else 
				{
					//alert("objEvalStr=" + objEvalStr);
					if( objEvalStr === undefined)
					{
						objEvalStr='';
					}
					lv_rtStr= this.frameField(lrecSch[recSchCnt],objEvalStr,labelObjEvalStr,listValObjEvalStr,func,level,recCnt,parent.name);
					lv_str += this.sprint(lv_rtStr);
					lv_str += this.sprint('USSSession'+  level +'.appendChild(USSTableRow);' );
				}
		
		
			}
			lv_str += this.sprint( "USSContainer"+level+".appendChild(USSHeader" +  level +" );");
			lv_str += this.sprint( "USSContainer"+level+".appendChild(USSSession" +  level +" );");
		}
		//alert("recCnt=" + recCnt);
	
	}

	
	
//}
//catch(e)
//{
//	alert("Exception" + e);
//}


	this.debug( level + "_" + parentCnt +" end ##### frameGeneration ###### " );
	

	return lv_str;
}


USS.prototype.valWithSch= 	function (rec,recSch)
	{
		//alert( recSch.name +" : " +recSch.dataType);
		//alert(rec);
		/*[
		if ( recSch.dataType != "CONTAINER" || recSch.dataType != "SCHEMA"   )
		{
				//alert( recSch.name + "="+ eval('rec.'+recSch.name) );
				
				value= eval('rec.'+recSch.name);
				
				//alert(value );
				
				if (value           === undefined) {
					value='';
				}
				if (recSch.childs   === undefined) {
					recSch.childs=new Array();
				}
				if (recSch.htmlType === undefined) {
					recSch.htmlType='';
				}
				if (recSch.dataType === undefined) {
					recSch.dataType='';
				}
				if (recSch.groupId  === undefined) {
				recSch.groupId='';
				}
				
				
		
		
		  switch ( recSch.dataType )
		  {
		    case "DATE" : 
		  		re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
				if(value != '' && !value.match(re)) {
     			 alert("Invalid date format: " + value);
      			 return false;
      			 }
      			 break;
    		case "TIME" :
    			// regular expression to match required time format
    			re = /^\d{1,2}:\d{2}([ap]m)?$/;
				if(value != '' && !value.match(re)) {
     			 alert("Invalid time format: " + value);
     			 return false;
    			}
    			break;
		
			case "VARCHAR" :
				// regular expression to match required time format
    			re = /^[A-Za-z0-9_]{3,20}$/;
				if(value != '' && !value.match(re)) {
     			 alert("Invalid time format: " + value);
     			 return false;
     			 }
    		 
		}
		 
		}
		
			//alert(" type of " + typeof recSch.childs );
	
				for  ( var i=0; i <recSch.childs.length ; i++ )
				{ 
				
					var recList=eval( 'rec.' + recSch.name ) ;
					alert(recList.length);
					for  ( var j=0; j <recList.length ; j++ )
					{
						valWithSch(recList[j],recSch.childs[i]);
					}
				}
				*/
				
				
		for ( var r=0; r<rec.length; r++)
		//for ( var s =0; s <recSch.length; s++)
		{
			 //alert (recSch[s]);
			 for ( var s =0; s <recSch.length; s++)
			 //for ( var r=0; r<rec.length; r++)
			 {
			 
			 var varStr='rec['+ r + '].' + recSch[s].name;
			 var varStrVal= eval(varStr);
			 
			if ( recSch[s].dataType != "CONTAINER" || recSch[s].dataType != "PAGE" )
			{
			// alert(recSch[s].dataType);
			 
			 
			 value= varStrVal;
				
				//alert(value );
				
				if (value           === undefined) {
					value='';
				}
				if (recSch[s].childs   === undefined) {
					recSch[s].childs=new Array();
				}
				if (recSch[s].htmlType === undefined) {
					recSch[s].htmlType='';
				}
				if (recSch[s].dataType === undefined) {
					recSch[s].dataType='';
				}
				if (recSch[s].groupId  === undefined) {
				recSch[s].groupId='';
				}
				
				
		
		
		  switch ( recSch[s].dataType )
		  {
		    case "DATE" : 
		  		re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
				if(value != '' && !value.match(re)) {
     			 alert(recSch[s].name + "Invalid date format: " + value);
      			 return false;
      			 }
      			 break;
    		case "TIME" :
    			// regular expression to match required time format
    			re = /^\d{1,2}:\d{2}([ap]m)?$/;
				if(value != '' && !value.match(re)) {
     			 alert(recSch[s].name +  "Invalid time format: " + value);
     			 return false;
    			}
    			break;
		    case "NUMBER" :
    			if (recSch[s].max != "unlimited" )
				{
				re = RegExp("^[0-9.]{"+ recSch[s].min + "," + recSch[s].max + "}$");
					//if(value != '' && !value.match(re))
					if(value != '' && !re.test(value)) 
					{
						 alert( recSch[s].name + " Exceed  limit " + recSch[s].min + " to " + recSch[s].max );
						 return false;
					 }
    			}
    			else
    			{
					re =/^[A-Za-z0-9_]$/;
					if(value != '' && !value.match(re)) 
					{
						 alert( recSch[s].name + " Invalid time format: " + value);
						 return false;
					}
     			 
    			}
    			break;
			case "VARCHAR" :
				// regular expression to match required time format
				if (recSch[s].max != "unlimited" )
				{
					//re = /^[A-Za-z0-9_]{0,20}$/
					re = RegExp("^[A-Za-z0-9_]{"+ recSch[s].min + "," + recSch[s].max + "}$");
					if(value != '' && !value.match(re)) 
					{
						 alert(recSch[s].name +"Exceed  limit " + recSch[s].min + " to " + recSch[s].max +"[ " + value + "]" );
						 return false;
					 }
    			}
    			else
    			{
					re =/^[A-Za-z0-9_]$/;
					if(value != '' && !value.match(re)) 
					{
						 alert(recSch[s].name + "Invalid time format: " + value);
						 return false;
					}
     			 
    			} 
    			break;
    		case "LIST" :
    		case "OPTION" :
				// regular expression to match required time format
				 recSch[s].listVal	
				 if ( value != '' )
				 {
				 var inpStrArr= recSch[s].listVal.split('|');
				 	var chk=0;
					for(var i=0 ; i< inpStrArr.length;i+=2)
					{
						if( value == inpStrArr[i])
						{
						chk=1;
						}
					}
					if  ( chk!=1 )
					{
						alert( recSch[s].name + " Invalid time format: " + value);
						return false;
					}
				}
				
				 	 
			}
			 
			}
			
			  if (recSch[s].childs   === undefined) 
			  {
					recSch[s].childs=new Array();
			  }
			  valWithSch(varStrVal,recSch[s].childs);
			 
			 } 
			 
		}
		
	}
		
		var PersonalInfo =[ 
			{
			psnlInfo:[ 
				{
					BasicDet:[
					{
					name:"durai"

					},
					{
					name:"Akbar"

					}
					]
			}
				]
								}
					];
			
	
			var PersonalInfoSch = [
									{
	group:'ussms',
	name:'psnlInfo',
	label:'Personal Information ',
	task:'NONE',
	desc:'VARCHAR',
	htmlType:'TAP',
	entitle:'N',
	enttlname:'',
	mndf:'N',
	dataType:'CONTAINER',
	cclass:'ctext',
	validate:'',
	dflt:'',
	min:'0',
	max:'60',
	tips:'',
	onkeyup:'',
	onchange:'',
	onkeydown:'',
	onkeypress:'',
	onclick:'',
	listVal:'""',
	help:'N',
	helpLink:'',
	xml:'N',
	Xpath:'N' ,
	childs:[ 
			{
				group:'ussms',
			name:'BasicDet',
			label:'Basic Details',
			task:'NONE',
			desc:'VARCHAR',
			htmlType:'CONTAINER',
			entitle:'N',
			enttlname:'',
			mndf:'N',
			dataType:'COLLECTION',
			cclass:'ctext',
			validate:'',
			dflt:'',
			min:'0',
			max:'2',
			tips:'',
			onkeyup:'',
			onchange:'',
			onkeydown:'',
			onkeypress:'',
			onclick:'',
			listVal:'',
			help:'N',
			helpLink:'',
			xml:'N',
			Xpath:'N' ,
			childs:[
			{group:'ussms',
			name:'name',
			label:'Name ',
			task:'NONE',
			desc:'VARCHAR',
			htmlType:'TEXT',
			entitle:'N',
			enttlname:'',
			mndf:'N',
			dataType:'VARCHAR',
			cclass:'ctext',
			validate:'',
			dflt:'',
			min:'0',
			max:'2',
			tips:'',
			onkeyup:'',
			onchange:'',
			onkeydown:'',
			onkeypress:'',
			onclick:'',
			listVal:'',
			help:'N',
			helpLink:'',
			xml:'N',
			Xpath:'N' ,
			childs:'N' }
		
						]
				}
					]
	}
	]
;			
			//valWithSch(PersonalInfo,PersonalInfoSch);	
									

var ussModule= new USS();

module.exports.uss=ussModule;
module.exports.initCapWord                   =ussModule.initCapWord      ;
module.exports.initCap                       =ussModule.initCap;
module.exports.USSField_                     =ussModule.USSField_;
module.exports.sprint                        =ussModule.sprint;
module.exports.frameGenerationJson           =ussModule.frameGenerationJson ;
module.exports.frameGenerationResoure        =ussModule.frameGenerationResoure;
module.exports.frameGenerationListVal        =ussModule.frameGenerationListVal;
module.exports.jsonToListVal                 =ussModule.jsonToListVal;
module.exports.frameField                    =ussModule.frameField;
module.exports.frameGeneration               =ussModule.frameGeneration         ;
module.exports.hasChild                      =ussModule.hasChild         ;
module.exports.debug                      =ussModule.debug         ;


//alert("import USS");


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
									

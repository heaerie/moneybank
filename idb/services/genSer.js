var fs = require('fs');
var serviceJs="/*----Do not change  ---*/";
serviceJs+= "\n ";
serviceJs+= "";
serviceJs+= "";
serviceJs+= "";
serviceJs+= "";

function USS()
{
//	alert("USS");

	this.count=0;
	this.version="";
	
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

alert = function(inpStr)
{
console.log(inpStr);
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

var objUss= new USS();

var schemaJson =[{"group":"USS","name":"basicDetPage","label":"Basic Details Page","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"tips","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"basicDetCont","label":"basic Det Container","task":"NONE","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"FirstName","label":"Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]}];
//var  schemaJson =  eval(schemaJsonStr);

//console.log(schemaJson[0])	;		

serviceJs+=objUss.frameGenerationJson(schemaJson[0].childs, schemaJson[0]);

fs.writeFile("Services.js", serviceJs, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

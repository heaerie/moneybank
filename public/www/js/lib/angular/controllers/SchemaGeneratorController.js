define([],
function()
{

	return [ '$scope' , 'toaster','SchemaGeneratorService','$state',function($scope,toaster,SchemaGeneratorService,$state){

	var ufiuss = require('ufi.core');
	var ufiframegen = require('ufi.frameGen');
	var ufixml = require('ufi.xml');
	var us = new ufiuss.USS();

var $newdiv1 = $( "<div id='object1'/> Dynamic body</div>" )
var  newdiv2 = document.createElement( "div" );
 
newdiv2.id="middleid";
//alert("main1");


$scope.GenJsonB= function (obj)
{

//alert('GenJsonB');//SchemaJsonInputId/SchemaJsonInputId
obj=this;
    var SchemaJsonInputId=document.getElementById("SchemaJsonInputId");
    var OutJsonTextId=document.getElementById("OutJsonTextId");
    var MultiLang=document.getElementById("MultiLang"); 

  var PageNameId=document.getElementById("PageNameId"); 
  var PageNameIdLabel=document.getElementById("PageNameIdLabel"); 
try
{
    schemaJson=eval(SchemaJsonInputId.value);


 var  ufiframegen= require('ufi.frameGen');
var us= new ufiframegen.FG();

OutJsonTextId.value=    JSON.stringify(eval("[{" +us.frameGenerationJson(schemaJson[0].childs,
  schemaJson[0]
) +"}]") , null, 4);

}
catch(e)
{
    alert("GenJson Exep:" +e);
}


}

$scope.GenFrameB =function (obj) {


obj=this;
var SchemaJsonInputId=document.getElementById("SchemaJsonInputId");
var OutJsonTextId=document.getElementById("OutJsonTextId");
var readOnlyFlgId=document.getElementById("readOnlyFlgId");
var LangResoureId=document.getElementById("LangResoureId");
var ListValId=document.getElementById("ListValId");
var us = new ufiframegen.FG(); 
var PageNameId=document.getElementById("PageNameId"); 
var PageNameIdLabel=document.getElementById("PageNameIdLabel"); 
var func =readOnlyFlgId.value;
try
{

    resourceJson= eval(LangResoureId.value);
    recSch=eval(SchemaJsonInputId.value);

    rec=eval(OutJsonTextId.value);
    
    listValJson =eval(ListValId.value);

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
        
        
var commonTailer=" document.getElementById('middleid').appendChild(USSContainer0);  \n } );"
//commonTailer+="\n document.getElementById('FrameId').appendChild(USSContainer0); });";

//var vcommonFrameGen="require([\"jquery\",\"ufi.core\", \"ufi.frameGen\",\"ufi.xml\",\"ufi.validate\"], function($,uficore,ufiframegen,ufixml,ufivalidate) { $(function() { alert('test');})} );"

var script=document.createElement("script");
//scr.appendChild(commonHeader + vcommonFrameGen + commonTailer);
script.type='text/javascript';

script.text=commonHeader + vcommonFrameGen + commonTailer;
document.getElementById('middleid').appendChild(script);


 
        

}
catch(e)
{
    alert("GenJson Exep:" +e);
}


}

$scope.genResourceB=function ()
{
    //alert("Gen Resource");
var us = new ufiframegen.FG(); 

    var SchemaJsonInputId=document.getElementById("SchemaJsonInputId");
    var LangResoureId=document.getElementById("LangResoureId");
    var MultiLang=document.getElementById("MultiLang"); 
    var PageNameId=document.getElementById("PageNameId"); 

try
{
    schemaJson=eval(SchemaJsonInputId.value);





LangResoureId.value=  JSON.stringify(eval(    "[{" +us.frameGenerationResoure(schemaJson[0].childs,
  schemaJson[0]
)  +"}]" ), null, 4);

}
catch(e)
{
    alert("GenJson Exep:" +e);
}
}
//alert(commFrameGen(PersonalInfo,PersonalInfoSch,"Y"));

$scope.GenXmlB =function ()
{
    var xml=new ufixml.XML();
    parentId=document.getElementById("parentId"); 
    XMLTextId=document.getElementById("XMLTextId"); 
    XMLTextId.value= xml.genChilTag(parentId.value);

}

$scope.GenXmlJsonB =function ()
{
    var xml=new ufixml.XML();
    parentId=document.getElementById("parentId"); 
    XMLJsonId=document.getElementById("XMLJsonId"); 
    XMLJsonId.value=  JSON.stringify(eval( xml.genChilTagJson(parentId.value)), null, 4);

}

$scope.GenListValJsonB=function ()
{
    
    var SchemaJsonInputId=document.getElementById("SchemaJsonInputId");
    var ListValId=document.getElementById("ListValId");
  var MultiLang=document.getElementById("MultiLang"); 
  var PageNameId=document.getElementById("PageNameId"); 
    var PageNameIdLabel=document.getElementById("PageNameIdLabel"); 
 var us = new ufiframegen.FG();
try
{
    schemaJson=eval(SchemaJsonInputId.value);





ListValId.value=    "[{"+us.frameGenerationListVal(schemaJson[0].childs,
    schemaJson[0]
)  + "}]"; 

}
catch(e)
{
    alert("GenJson Exep:" +e);
}

}




    ///schema Generator
	
		$scope.basicDetEditSave=function()
    	{


       // console.log($scope);

    			
    	//	alert('basicDetEditSave :name =' + $scope.name);

        SchemaGeneratorService.save({     "grantType"     : "password" 
          /*loginService.authorizeSSO({     "grantType"     : "password" */
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'username'    : $scope.email
                      ,'password'    : $scope.password
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
          // body...
          //console.log($state);
         // $state.go('dashboard');


          //console.log(resp);
          toaster.pop('success','this', JSON.stringify(resp));

          //alert('resp');
        });


          //SchemaGeneratorService.save()
    		

    		//alert("I am in uss_submit");
    	};


  

  var ContinerCount=1;
 $scope.getDataType=function(tag)
 {
  var tagLib={
  ﻿      "C1"     :   ﻿"ascii"
,      "C2"     :   ﻿"ascii"
,      "C3"     :   ﻿"ascii"
,      "C4"     :   ﻿"ascii"
,      "C5"     :   ﻿"ascii"
,      "C6"     :   ﻿"ascii"
,      "C7"     :   ﻿"ascii"
,      "C8"     :   ﻿"ascii"
,      "C9"     :   ﻿"ascii"
,      "CA"   :   ﻿"ascii"
,      "CB"   :   ﻿"ascii"
,      "CC"   :   ﻿"ascii"
,      "CD"   :   ﻿"ascii"
,      "CF"   :   ﻿"ascii"
,      "DF01"   :   ﻿"ascii"
,      "DF02"   :   ﻿"ascii"
,      "DF03"   :   ﻿"ascii"
,      "DF04"   :   ﻿"ascii"
,      "DF05"   :   ﻿"ascii"
,      "DF06"   :   ﻿"ascii"
,      "DF07"   :   ﻿"ascii"
,      "DF08"   :   ﻿"ascii"
,      "DF09"   :   ﻿"ascii"
,      "DF0A"   :   ﻿"ascii"
,      "DF0B"   :   ﻿"ascii"
,      "DF0C"   :   ﻿"ascii"
,      "DF0D"   :   ﻿"ascii"
,      "DF0E"   :   ﻿"ascii"
,      "DF0F"   :   ﻿"ascii"
,      "DF11"   :   ﻿"ascii"
,      "DF12"   :   ﻿"ascii"
,      "DF13"   :   ﻿"ascii"
,      "DF14"   : "ascii"
,      "DF15"   : "ascii"
,      "DF16"   : "ascii"
,      "DF17"   : "ascii"
,      "DF18"   : "ascii"
,      "E1"   :   ﻿"ascii"
  };

  return tagLib[tag.toUpperCase()]; 
 }

 $scope.getTagDescr=function(tag)
 {
  var tagLib={
  ﻿      "C1"     :   "group"
,      "C2"     :   "name"
,      "C3"     :   "label"
,      "C4"     :   "task"
,      "C5"     :   "desc"
,      "C6"     :   "htmlType"
,      "C7"     :   "entitle"
,      "C8"     :   "enttlname"
,      "C9"     :   "mndf"
,      "CA"   :   "dataType"
,      "CB"   :   "cclass"
,      "CC"   :   "parent"
,      "CD"   :   "parentHtmlType"
,      "CF"   :   "validate"
,      "DF01"   :   "dflt"
,      "DF02"   :   "min"
,      "DF03"   :   "max"
,      "DF04"   :   "tips"
,      "DF05"   :   "onkeyup"
,      "DF06"   :   "onchange"
,      "DF07"   :   "onkeydown"
,      "DF08"   :   "onkeypress"
,      "DF09"   :   "onclick"
,      "DF0A"   :   "onblure"
,      "DF0B"   :   "listVal"
,      "DF0C"   :   "help"
,      "DF0D"   :   "helpLink"
,      "DF0E"   :   "xml"
,      "DF0F"   :   "xmlname"   
,      "DF11"   : "Xpath"
,      "DF12"   : "maxCol"
,      "DF13"   : "col"
,      "DF14"   : "dimensions"
,      "DF15"   : "dataCategory"
,      "DF16"   : "camelCase"
,      "DF17"   : "dimensionMin"
,      "DF18"   : "dimensionMax"
,      "E1"   : "childs"
  };

  return  tagLib[tag.toUpperCase()]; 
 }



 $scope.getTag =function(tag)
 {
  var tagLib={
        "group" : ﻿      "C1"   
,   "name"  :      "C2"   
,   "label" :      "C3"   
,   "task"  :      "C4"   
,   "desc"  :      "C5"   
,   "htmlType"  :      "C6"   
,   "entitle" :      "C7"   
,   "enttlname" :      "C8"   
,   "mndf"  :      "C9"   
,   "dataType"  :      "CA"  
,   "cclass"  :      "CB"  
,   "parent"  :      "CC"  
,   "parentHtmlType"  :      "CD"  
,   "validate"  :      "CF"  
,   "dflt"  :      "DF01"  
,   "min" :      "DF02"  
,   "max" :      "DF03"  
,   "tips"  :      "DF04"  
,   "onkeyup" :      "DF05"  
,   "onchange"  :      "DF06"  
,   "onkeydown" :      "DF07"  
,   "onkeypress"  :      "DF08"  
,   "onclick" :      "DF09"  
,   "onblure" :      "DF0A"  
,   "listVal" :      "DF0B"  
,   "help"  :      "DF0C"  
,   "helpLink"  :      "DF0D"  
,   "xml" :      "DF0E"  
,   "xmlname"     :      "DF0F"  
,   "Xpath" :      "DF11"  
,   "maxCol"  :      "DF12"  
,   "col" :      "DF13"  
,   "dimensions"     : "DF14"   
,   "dataCategory"   : "DF15"   
,   "camelCase"      : "DF16"   
,   "dimensionMin"   : "DF17"   
,   "dimensionMax"   : "DF18"   
, "childs"  :      "E1"                          
  }

  return tagLib[tag]; 
 }

$scope.encodeSchemaToTvl=function(schemaJson)
{

  var Tag="";
  var Value="";
  var valueHex="";

  var rtStr="";


  var Len=0;
  for(var i=0; i< schemaJson.length; i++)
  {

//$scope.getTag
   for( key in schemaJson[i])
    {
        if ( key == "childs")
        {
          if(schemaJson[i].childs.length !=0)
          {
          var value1=$scope.encodeSchemaToTvl(schemaJson[i].childs);
          //rtStr += "E1" +  $scope.intToHexString(value1.length/2) + value1;
          rtStr +=  value1;


          }
        }
        else
        {
          Tag       =$scope.getTag(key);
          Value     =schemaJson[i][key];
          valueHex  =$scope.stringToHexStr(Value);
          Len       =valueHex.length/2;
          tagLen    = $scope.intToHexString(Len);

          rtStr += Tag + tagLen + valueHex;
        
        }
    }
    
  }

return  "E1" +$scope.intToHexString(rtStr.length/2) + rtStr;
}

$scope.intToHexString=function(inValue)
{

  var outHexStr="";
  var intValue=parseInt(inValue);
var h1=0x0; var h2= 0x0; h3=0x0; h4= 0x0 ,h5=0x0 ,h6=0x0;

  if( intValue <= 0x7F)
  {
      h1 = intValue & 0x000F;
      h2 = intValue & 0x00F0;
      h2 = h2>>4;
      outHexStr+=$scope.intToHexChar(h2);
      outHexStr+=$scope.intToHexChar(h1);
     
  }
  else if(  intValue <= 0x7FFF )
  {

      h1 = intValue & 0x000F;
      h2 = intValue & 0x0070;
      h2 = h2>>4;
      h3 = intValue & 0x0780;
      h3 = h3>>7;
      h4 = intValue & 0x7800;
      h4 = h4>>11;
      h4 = h4 |0x8;
      outHexStr+=$scope.intToHexChar(h4);
      outHexStr+=$scope.intToHexChar(h3);
      outHexStr+=$scope.intToHexChar(h2);
      outHexStr+=$scope.intToHexChar(h1);


  }
  else if( intValue <= 0x7FFFFF  )
  {

      h1 = intValue & 0x000F;
      h2 = intValue & 0x0070;
      h2 = h2>>4;
      h3 = intValue & 0x0780;
      h3 = h3>>7;
      h4 = intValue & 0x7800;
      h4 = h4>>11;
      h4 = h4 |0x8;

      h5 = intValue & 0x078000;//->   1000 0000 0000 0000
      h5 = h5>>15;
      h6 = intValue & 0x780000;
      h6 = h6>>19;
      h6 = h6 |0x8;

      outHexStr+=$scope.intToHexChar(h6);
      outHexStr+=$scope.intToHexChar(h5);
      outHexStr+=$scope.intToHexChar(h4);
      outHexStr+=$scope.intToHexChar(h3);
      outHexStr+=$scope.intToHexChar(h2);
      outHexStr+=$scope.intToHexChar(h1);
  }

  
  return outHexStr;
}
$scope.intToHexChar= function(inp)
{
  var lib=
  {
     0:'0'
    ,1:'1'
    ,2:'2'
    ,3:'3'
    ,4:'4'
    ,5:'5'
    ,6:'6'
    ,7:'7'
    ,8:'8'
    ,8:'8'
    ,9:'9'
    ,10:'A'
    ,11:'B'
    ,12:'C'
    ,13:'D'
    ,14:'E'
    ,15:'F'
  }

  return lib[inp];
}
$scope.stringToHexStr=function(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

 $scope.AddContainerField=function(obj,field)
{
  var FrameId=document.getElementById('FrameId');



  var parentId=obj.getAttribute("parentid");

  if ( parentId == null)
  {
      parentObj =obj;
  }
  else
  {
    parentObj=document.getElementById(parentId);
  }

  var div=document.createElement("div");
  div.setAttribute("parentid"        ,parentObj.id);
  //div.setAttribute("id"               ,obj.id);
  div.setAttribute("mndf"             ,"Y");
  div.setAttribute("childCount"       ,"0");
  div.setAttribute("type"             ,"container");
  div.id  = "container" + us.ContinerCount++;



//us.CreateField();



  var divName=document.createElement("input");
  divName.setAttribute("parentid"        ,parentObj.id);
  divName.setAttribute("id"               ,div.id );
  divName.setAttribute("mndf"             ,"Y");
  divName.setAttribute("childCount"       ,"0");
  divName.setAttribute("type"             ,"container");
  divName.setAttribute("placeholder"             ,"name");
  divName.setAttribute("placeholder"             ,"name");

  var divName=document.createElement("input");
  divName.setAttribute("parentid"        ,parentObj.id);
  divName.setAttribute("id"               ,div.id );
  divName.setAttribute("mndf"             ,"Y");
  divName.setAttribute("childCount"       ,"0");
  divName.setAttribute("type"             ,"container");
  divName.setAttribute("placeholder"             ,"name");
  
  divName.setAttribute("onChange"             ,"onChange(this)");

var  divParent=document.createElement("input");
   divParent.setAttribute("parentid"        ,parentObj.id);
   divParent.setAttribute("id"               ,div.id );
   divParent.setAttribute("mndf"             ,"Y");
   divParent.setAttribute("childCount"       ,"0");
   divParent.setAttribute("value"             ,   parentObj.id);
   divParent.setAttribute("type"             ,"container");



var  divParentName=document.createElement("input");
   divParentName.setAttribute("parentid"        ,parentObj.id);
   divParentName.setAttribute("id"               ,div.id );
   divParentName.setAttribute("mndf"             ,"Y");
   divParentName.setAttribute("childCount"       ,"0");
   divParentName.setAttribute("dataType"       ,"PARENT");
   divParentName.setAttribute("value"             ,   parentObj.id);
   divParentName.setAttribute("type"             ,"container");



var  divLabel=document.createElement("input");
   divLabel.setAttribute("parentid"        ,parentObj.id);
   divLabel.setAttribute("id"               ,div.id );
   divLabel.setAttribute("mndf"             ,"Y");
   divLabel.setAttribute("childCount"       ,"0");
   divLabel.setAttribute("dataType"       ,"LABEL");
   divLabel.setAttribute("value"             ,   "");
   divLabel.setAttribute("type"             ,"container");

divLabel.setAttribute("placeholder"             ,"label");


var  divMandatory=document.createElement("select");
   divMandatory.setAttribute("parentid"        ,parentObj.id);
   divMandatory.setAttribute("id"               ,div.id );
   divMandatory.setAttribute("mndf"             ,"Y");
   divMandatory.setAttribute("childCount"       ,"0");
   divMandatory.setAttribute("dataType"       ,"mndf");
   divMandatory.setAttribute("value"             ,   parentObj.id);
   divMandatory.setAttribute("type"             ,"container");




var  divMandatoryOption=document.createElement("option");
   divMandatoryOption.value="Y";
   divMandatoryOption.setAttribute('selected', 'true');
   divMandatoryOption.appendChild(document.createTextNode("YES"));
   divMandatoryOption.id="option";
divMandatory.appendChild(divMandatoryOption);

divMandatoryOption=document.createElement("option");
   divMandatoryOption.value="N";
  //divMandatoryOption.setAttribute('selected', 'true');
   divMandatoryOption.appendChild(document.createTextNode("NO"));
   divMandatoryOption.id="option";
divMandatory.appendChild(divMandatoryOption);


     var divButton=document.createElement("button");
  divButton.setAttribute("parentid"        ,parentObj.id );
  //divButton.setAttribute();
  divButton.type ="button";
  divButton.setAttribute("mndf"             ,"Y");
  divButton.setAttribute("childCount"       ,"0");
  divButton.setAttribute("value"       ,"onclick");
  divButton.setAttribute("type"             ,"button");
  divButton.textContent = "Add Sibling";
    divButton.setAttribute("onclick" ,"AddContainer(this)");




     var divButtonChild=document.createElement("button");
  divButtonChild.setAttribute("parentid"        ,div.id );
  //divButton.setAttribute();
  divButtonChild.type ="button";
  divButtonChild.setAttribute("mndf"             ,"Y");
  divButtonChild.setAttribute("childCount"       ,"0");
  divButtonChild.setAttribute("value"       ,"onclick");
  divButtonChild.setAttribute("type"             ,"button");
  divButtonChild.textContent = "Add Container1";
    divButtonChild.setAttribute("onclick" ,"AddContainer(this)");




tdivDataType=document.createElement("select");
          //tdivDataType.className = 'clabel';
          //tdivDataType.name=  ;
          //tdivDataType.for = fieldObj.name; 
          var inpStrArr= "VARCHAR|VARCHAR|LIST|LIST".split('|');
          for(var i=0 ; i< inpStrArr.length;i+=2)
          {
            
              divFataTypeOption=document.createElement("option");
              divFataTypeOption.value=inpStrArr[i];
              divFataTypeOption.appendChild(document.createTextNode(inpStrArr[i+1]));
              divFataTypeOption.id="option";
                tdivDataType.appendChild(divFataTypeOption);

          }
          //ttableBodyElmnt=tdivDataType;




  div.appendChild(divName);
  div.appendChild(divLabel);
  
  div.appendChild(divParent);
  div.appendChild(divParentName);
  div.appendChild(divMandatory);
  div.appendChild(tdivDataType);
  div.appendChild(divButton);

    div.appendChild(divButtonChild);
try
{
  parentObj.appendChild(div);
}
catch(e)
{
  console.log('Exception' + e);
}



}

 $scope.AddContainer=function(obj)
{
  var FrameId=document.getElementById('FrameId');

  //var us = new ufiuss.USS();

  var parentId=obj.getAttribute("parentid");

  if ( parentId == null)
  {
      parentObj =obj;
  }
  else
  {
    parentObj=document.getElementById(parentId);
  }

  var div=document.createElement("div");
  div.setAttribute("parentid"        ,parentObj.id);
  //div.setAttribute("id"               ,obj.id);
  div.setAttribute("mndf"             ,"Y");
  div.setAttribute("childCount"       ,"0");
  div.setAttribute("type"             ,"container");
  div.setAttribute("class","col-sm-6");
  div.id  = "container" + us.ContinerCount++;



//us.CreateField();



  var divName=document.createElement("input");
  divName.setAttribute("parentid"        ,parentObj.id);
  divName.setAttribute("id"               ,div.id );
  divName.setAttribute("mndf"             ,"Y");
  divName.setAttribute("childCount"       ,"0");
  divName.setAttribute("type"             ,"container");
  divName.setAttribute("placeholder"             ,"name");
  divName.setAttribute("placeholder"             ,"name");

  var divName=document.createElement("input");
  divName.setAttribute("parentid"        ,parentObj.id);
  divName.setAttribute("id"               ,div.id );
  divName.setAttribute("mndf"             ,"Y");
  divName.setAttribute("childCount"       ,"0");
  divName.setAttribute("type"             ,"container");
  divName.setAttribute("placeholder"             ,"name");
  
  divName.setAttribute("onChange"             ,"onChange(this)");

var  divParent=document.createElement("input");
   divParent.setAttribute("parentid"        ,parentObj.id);
   divParent.setAttribute("id"               ,div.id );
   divParent.setAttribute("mndf"             ,"Y");
   divParent.setAttribute("childCount"       ,"0");
   divParent.setAttribute("value"             ,   parentObj.id);
   divParent.setAttribute("type"             ,"container");



var  divParentName=document.createElement("input");
   divParentName.setAttribute("parentid"        ,parentObj.id);
   divParentName.setAttribute("id"               ,div.id );
   divParentName.setAttribute("mndf"             ,"Y");
   divParentName.setAttribute("childCount"       ,"0");
   divParentName.setAttribute("dataType"       ,"PARENT");
   divParentName.setAttribute("value"             ,   parentObj.id);
   divParentName.setAttribute("type"             ,"container");



var  divLabel=document.createElement("input");
   divLabel.setAttribute("parentid"        ,parentObj.id);
   divLabel.setAttribute("id"               ,div.id );
   divLabel.setAttribute("mndf"             ,"Y");
   divLabel.setAttribute("childCount"       ,"0");
   divLabel.setAttribute("dataType"       ,"LABEL");
   divLabel.setAttribute("value"             ,   "");
   divLabel.setAttribute("type"             ,"container");

divLabel.setAttribute("placeholder"             ,"label");


var  divMandatory=document.createElement("select");
   divMandatory.setAttribute("parentid"        ,parentObj.id);
   divMandatory.setAttribute("id"               ,div.id );
   divMandatory.setAttribute("mndf"             ,"Y");
   divMandatory.setAttribute("childCount"       ,"0");
   divMandatory.setAttribute("dataType"       ,"mndf");
   divMandatory.setAttribute("value"             ,   parentObj.id);
   divMandatory.setAttribute("type"             ,"bcontainer");




var  divMandatoryOption=document.createElement("option");
   divMandatoryOption.value="Y";
   divMandatoryOption.setAttribute('selected', 'true');
   divMandatoryOption.appendChild(document.createTextNode("YES"));
   divMandatoryOption.id="option";
divMandatory.appendChild(divMandatoryOption);

divMandatoryOption=document.createElement("option");
   divMandatoryOption.value="N";
  //divMandatoryOption.setAttribute('selected', 'true');
   divMandatoryOption.appendChild(document.createTextNode("NO"));
   divMandatoryOption.id="option";
divMandatory.appendChild(divMandatoryOption);


     var divButton=document.createElement("button");
  divButton.setAttribute("parentid"        ,parentObj.id );
  //divButton.setAttribute();
  divButton.type ="button";
  divButton.setAttribute("mndf"             ,"Y");
  divButton.setAttribute("childCount"       ,"0");
  divButton.setAttribute("value"       ,"onclick");
  divButton.setAttribute("type"             ,"button");
  divButton.textContent = "Add Sibling";
    divButton.setAttribute("onclick" ,"AddContainer(this)");




     var divButtonChild=document.createElement("button");
  divButtonChild.setAttribute("parentid"        ,div.id );
  //divButton.setAttribute();
  divButtonChild.type ="button";
  divButtonChild.setAttribute("mndf"             ,"Y");
  divButtonChild.setAttribute("childCount"       ,"0");
  divButtonChild.setAttribute("value"       ,"onclick");
  divButtonChild.setAttribute("type"             ,"button");
  divButtonChild.textContent = "Add Container1";
    divButtonChild.setAttribute("onclick" ,"AddContainer(this)");




tdivDataType=document.createElement("select");
          //tdivDataType.className = 'clabel';
          //tdivDataType.name=  ;
          //tdivDataType.for = fieldObj.name; 
          var inpStrArr= "VARCHAR|VARCHAR|LIST|LIST".split('|');
          for(var i=0 ; i< inpStrArr.length;i+=2)
          {
            
              divFataTypeOption=document.createElement("option");
              divFataTypeOption.value=inpStrArr[i];
              divFataTypeOption.appendChild(document.createTextNode(inpStrArr[i+1]));
              divFataTypeOption.id="option";
                tdivDataType.appendChild(divFataTypeOption);

          }
          //ttableBodyElmnt=tdivDataType;




  div.appendChild(divName);
  div.appendChild(divLabel);
  
  div.appendChild(divParent);
  div.appendChild(divParentName);
  div.appendChild(divMandatory);
  div.appendChild(tdivDataType);
  div.appendChild(divButton);

    div.appendChild(divButtonChild);
try
{
  parentObj.appendChild(div);
}
catch(e)
{
  console.log('Exception' + e);
}



}


var Sibling=0;

 NewSibling=function(obj)
{

  //alert('in Sibling');
  //var us= new ufiuss.USS();

  us.NewSibling(obj);
}

 ProcessSJson=function()
{
 // var us= new USS();

  var parentObj=document.getElementById('container0');
  var SchemaJsonInputId=document.getElementById('SchemaJsonDfltId');

  var SchemaJson = eval(SchemaJsonInputId.value);
  parentObj.appendChild( us.ProcessSJson(SchemaJson , parentObj.id));


}


NewChild=function(obj)
{

//  alert('NewChild');
 // var us= new ufiuss.USS();

  us.NewChild(obj);
}

DeleteThis=function(obj)
{

 // alert('DeleteThis');
 // var us=new ufiuss.USS();
  us.DeleteThis(obj);
}

DeletePreview=function(obj)
{

 //alert('DeleteThis');
 // var us=new ufiuss.USS();
  us.DeletePreview(obj);
}



HideThis=function(obj)
{

 // alert('DeleteThis');
 // var us=new ufiuss.USS();
  us.HideThis(obj);
}




GenSJson=function (obj)
{
 // var us= new USS();

  var parentObj=document.getElementById('container0');
  var SchemaJsonInputId=document.getElementById('SchemaJsonDfltId');
  var SchemaJsonOuputId=document.getElementById('SchemaJsonOutputId');
  var SchemaJsonInputId=document.getElementById('SchemaJsonInputId');
  var TvlId=document.getElementById('TvlId');

  var SchemaJson = eval(SchemaJsonInputId.value);
  

    var  outPut =us.GenSJson(parentObj.id);
    console.log(outPut);
    var jsonOutPut=JSON.stringify(  outPut, null, 4 );

    //alert(jsonOutPut);
       SchemaJsonOuputId.value =jsonOutPut;
       SchemaJsonInputId.value =jsonOutPut;
       $scope.genResourceB();
       $scope.GenJsonB();
       $scope.GenListValJsonB();
       $scope.GenFrameB();


     TvlId.value = JSON.stringify( $scope.encodeSchemaToTvl(outPut), null, 4);
}



PreView=function(obj)
{
//alert('Preview 0');
//var us = new ufiuss.USS();
us.Preview(obj);

}




    
	}];
	
});

/*[

 toasterService.pop('success', "title", "text");
      var url = "/authorize"; 
      var config =  { 
          headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjYwbXMifQ.G37Yj8ljUjbOf-kSyc4j3-YAlbseb1KET9CMBgbJfaE"
           ,'Authorization': 'Basic dGVzdDp0ZXN0'
            ,      'Content-Type': 'application/x-www-form-urlencoded'
            ,'Access-Control-Allow-Origin': false

            
        }
      };
      var dataJson = 
      {
        "email" : "durai145@live.in"
        ,"password" : "1qaz2wsx"
        ,"grantType": "password"
            ,"clientId" : "CLIENTSP"
            ,"scope" : "GSA"
            ,"redirectURI" :"http://localhost:5000"
      };

    /*
    $.post(url , dataJson , function (resp,status,xhr){

        alert("resp" + status);

    },dataType);


  $http.post(url,dataJson,config).then(function (response) 
    { 
     // alert("resp");
      console.log(response);
      alert(JSON.stringify(response));
    },function(data){

      if(data.status == 302)
      {

        alert("Invalid request");
      }
     });
    };

]*/


onPostReq=function (url,json,id,type)
  {
  //  alert("onPostReq");
       var rtVal="";
     //  sleep(10);


//alert("Call Post");



             $.post( 
             url,
             json,
             function(data) 
    {

  //  alert(data);
    try
    {
    if(type == 'DIV')
    {

    $("#"+id).html(data);
    
    
    }
    else if( type == 'OBJ')
    {
    document.getElementById(id).value= data;

    }
} 
catch(e)
{
  alert("PostReqExp:<"+ id+">" +e);
}

    }
          );

  }
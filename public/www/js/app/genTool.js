define(["jquery","underscore","backbone","ufi.core", "ufi.frameGen","ufi.xml","ufi.validate",], function($, _, backbone,uficore,ufiframegen,ufixml,ufivalidate) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {

var $newdiv1 = $( "<div id='object1'/> Dynamic body</div>" )
var  newdiv2 = document.createElement( "div" );
 
newdiv2.id="middleid";
//alert("main1");


document.getElementById( "GenJsonB").onclick = function (obj)
{

obj=this;
    var SchemaJsonTextId=document.getElementById("SchemaJsonTextId");
    var OutJsonTextId=document.getElementById("OutJsonTextId");
    var MultiLang=document.getElementById("MultiLang"); 

  var PageNameId=document.getElementById("PageNameId"); 
  var PageNameIdLabel=document.getElementById("PageNameIdLabel"); 
try
{
    schemaJson=eval(SchemaJsonTextId.value);

var us= new ufiframegen.FG();

OutJsonTextId.value=    JSON.stringify(eval( "[{" +us.frameGenerationJson(schemaJson[0].childs,
  schemaJson[0]
) +"}]"));

}
catch(e)
{
    alert("GenJson Exep:" +e);
}


}


document.getElementById( "GenFrameB").onclick =function (obj)
{


obj=this;
var SchemaJsonTextId=document.getElementById("SchemaJsonTextId");
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
    recSch=eval(SchemaJsonTextId.value);

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
        
        
var commonTailer=" document.getElementById('FrameId').appendChild(USSContainer0);  \n } );"
//commonTailer+="\n document.getElementById('FrameId').appendChild(USSContainer0); });";

//var vcommonFrameGen="require([\"jquery\",\"ufi.core\", \"ufi.frameGen\",\"ufi.xml\",\"ufi.validate\"], function($,uficore,ufiframegen,ufixml,ufivalidate) { $(function() { alert('test');})} );"

var script=document.createElement("script");
//scr.appendChild(commonHeader + vcommonFrameGen + commonTailer);
script.type='text/javascript';

script.text=commonHeader + vcommonFrameGen + commonTailer;
document.getElementById('FrameId').appendChild(script);


}
catch(e)
{
    alert("GenJson Exep:" +e);
}


}

document.getElementById( "genResourceB").onclick=function ()
{
    //alert("Gen Resource");
var us = new ufiframegen.FG(); 

    var SchemaJsonTextId=document.getElementById("SchemaJsonTextId");
    var LangResoureId=document.getElementById("LangResoureId");
    var MultiLang=document.getElementById("MultiLang"); 
    var PageNameId=document.getElementById("PageNameId"); 

try
{
    schemaJson=eval(SchemaJsonTextId.value);





LangResoureId.value=  JSON.stringify(eval(    "[{" +us.frameGenerationResoure(schemaJson[0].childs,
  schemaJson[0]
)  +"}]" ));

}
catch(e)
{
    alert("GenJson Exep:" +e);
}
}
//alert(commFrameGen(PersonalInfo,PersonalInfoSch,"Y"));

document.getElementById( "GenXmlB").onclick =function ()
{
    var xml=new ufixml.XML();
    parentId=document.getElementById("parentId"); 
    XMLTextId=document.getElementById("XMLTextId"); 
    XMLTextId.value= xml.genChilTag(parentId.value);

}

document.getElementById( "GenXmlJsonB").onclick =function ()
{
    var xml=new ufixml.XML();
    parentId=document.getElementById("parentId"); 
    XMLJsonId=document.getElementById("XMLJsonId"); 
    XMLJsonId.value=  JSON.stringify(eval( xml.genChilTagJson(parentId.value)));

}

document.getElementById( "GenListValJsonB").onclick =function ()
{
    
    var SchemaJsonTextId=document.getElementById("SchemaJsonTextId");
    var ListValId=document.getElementById("ListValId");
  var MultiLang=document.getElementById("MultiLang"); 
  var PageNameId=document.getElementById("PageNameId"); 
    var PageNameIdLabel=document.getElementById("PageNameIdLabel"); 
 var us = new ufiframegen.FG();
try
{
    schemaJson=eval(SchemaJsonTextId.value);





ListValId.value=    "[{"+us.frameGenerationListVal(schemaJson[0].childs,
    schemaJson[0]
)  + "}]"; 

}
catch(e)
{
    alert("GenJson Exep:" +e);
}
}

$( "body" ).append( $newdiv1, [ newdiv2 ] );



       // var objFg= new ufiframegen.FG()



    });
});

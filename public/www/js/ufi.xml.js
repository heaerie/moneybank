<!--
define(function(require, exports, module) {
"use strict";

//alert("Import xml");

var USS=require("ufi.core").USS;
var XML=USS;
var form=document.forms[0];

XML.prototype.genXml=function ()
{

try
{
	//alert("xml:G:001");
	var rtXml="";
	//alert("xml:G:002");
	var form=document.forms[0];
	
	var	elmnts= form.elements;
	//alert("xml:G:003");
	//alert("elmnts="+elmnts.length);
	//alert("xml:G:004");
	rtXml+=genChilTag(form.getAttribute('xmlname'));
	//alert("xml:G:005");
	document.forms[0].rlt.value=rtXml;
	//alert("xml:G:006");

}
catch(e)
{

}
}

XML.prototype.genChilTag=function (parantName)
{
	var rtXml="";
	var form=document.forms[0];
	var	elmnts= form.elements;
	//alert("xml:GC:006");
	//alert("parantName =<"+parantName+">");
	rtXml+="<"+parantName+">";
	for(var i=0;i<elmnts.length;i++)
	{
		//alert(" elmnts[i].xml "+elmnts[i].xml+" elmnts[i].name " +elmnts[i].xmlname + "parantName " + parantName  + " == " +elmnts[i].getAttribute("parent") );
		if(elmnts[i].getAttribute('xml') == "Y")
		{
			if(	(elmnts[i].getAttribute('container') =="Y" )&&( elmnts[i].getAttribute('parent') == parantName) )
			{
				elmnts[i].setAttribute('container',"N");		
				rtXml+=genChilTag(elmnts[i].getAttribute('xmlname'));
			}
			else
			{
				if(elmnts[i].getAttribute('parent') == parantName)
				{
					rtXml+="<"+elmnts[i].getAttribute('xmlname')+">" ;
				}
							
				if(	(elmnts[i].getAttribute('container') !="Y" )&& (elmnts[i].getAttribute('parent') == parantName))
				{
					rtXml+=elmnts[i].value;
				}
				
				if(elmnts[i].getAttribute('parent') == parantName)
				{
					rtXml+="</"+elmnts[i].getAttribute('xmlname')+">" ;
				}
			}
		}
	}
	//alert("xml:GC:008");
	rtXml+="</"+parantName+">";
	//alert(" rtXml =<"+ rtXml +">");
	return rtXml;
}


XML.prototype.genXmLJson= function ()
{

try
{
	//alert("xml:G:001");
	var rtXml="";
	//alert("xml:G:002");
	var form=document.forms[0];
	
	var	elmnts= form.elements;
	//alert("xml:G:003");
	//alert("elmnts="+elmnts.length);
	//alert("xml:G:004");
	rtXml+=genChilTag(form.getAttribute('xmlname'));
	//alert("xml:G:005");
	document.forms[0].rlt.value=rtXml;
	//alert("xml:G:006");

}
catch(e)
{

}
}
XML.prototype.base=function (str)
{
	var arrayStr=str.split("_");

	return arrayStr[0];
}

XML.prototype.genChilTagJson=  function (parantName)
{
	var rtXml="";
	var form=document.forms[0];
	var	elmnts= form.elements;
	//alert("xml:GC:006");
	//alert("parantName =<"+parantName+">");

	var elementsXMLCount=0;
	var elementsXMLChildCount=0;
	if( parantName != "/") 
	{	
		rtXml+=""+base(parantName)+":[";
	}
	else
	{
		rtXml+="[";
	}
	for(var i=0;i<elmnts.length;i++)
	{

		
		//alert(" elmnts[i].xml "+elmnts[i].xml+" elmnts[i].name " +elmnts[i].xmlname + "parantName " + parantName  + " == " +elmnts[i].getAttribute("parent") );
		if(elmnts[i].getAttribute('xml') == "Y")
		{
			elmnts[i].setAttribute("disabled",true);
			if(	(elmnts[i].getAttribute('container') =="Y" )&&( elmnts[i].getAttribute('parent') == parantName) )
			{
				elmnts[i].setAttribute('container',"N");	
				if( elementsXMLChildCount == 0)
				{
					rtXml+= "{" + genChilTagJson(elmnts[i].getAttribute('xmlname')) + "}";
					elementsXMLChildCount=1;
				}
				else
				{
					rtXml+= ",{" + genChilTagJson(elmnts[i].getAttribute('xmlname')) + "}";
				}
				

			}
			else
			{


				if(elmnts[i].getAttribute('parent') == parantName)
				{
					if(elementsXMLCount == 0 )
					{
						rtXml+="{"
						elementsXMLCount=1;
					}
					else
					{
							
							rtXml+=","
					}
					
						rtXml+=" "+elmnts[i].getAttribute('xmlname')+" :" ;
					
								
					if(	(elmnts[i].getAttribute('container') !="Y" )&& (elmnts[i].getAttribute('parent') == parantName))
					{
						rtXml+=  "'" +  elmnts[i].value + "'";

						elmnts[i].value ="";


					}
					
					if(elmnts[i].getAttribute('parent') == parantName)
					{
						
					}

				}


			}
		}

	}
	if( elementsXMLCount == 1)
		{
			rtXml+="}"
		}
	//alert("xml:GC:008");
	rtXml+="]";
	//alert(" rtXml =<"+ rtXml +">");
	return rtXml;
}

exports.XML=XML;

});
-->

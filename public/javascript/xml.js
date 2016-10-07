<!--

//alert("Import xml");
var form=document.forms[0];

function genXml()
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

function genChilTag(parantName)
{
	var rtXml="";
	var form=document.forms[0];
	var	elmnts= form.elements;
	//alert("xml:GC:006");
	//alert("parantName =<"+parantName+">");
	rtXml+="<"+parantName+">";
	for(var i=0;i<elmnts.length;i++)
	{
		//alert(" elmnts[i].xml "+elmnts[i].xml+" elmnts[i].name " +elmnts[i].xmlname + "parantName " + parantName  + " == " +elmnts[i].parent );
		if(elmnts[i].getAttribute('xml') == "Y")
		{
			if(	(elmnts[i].getAttribute('container') =="Y" )&&( elmnts[i].getAttribute('parent') == parantName) )
			{
				elmnts[i].getAttribute('container')="N";		
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
-->

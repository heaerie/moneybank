<!--

alert('import fields.01');
/*
*************
Do
*************
    1.Need to add key maping and body Level key events
*************
NEWFRAM
NEWROW
LABEL      - Fields desc
NAME       - name of the fields
DATATYPE   - LIST,
             OPTION,
             DATE,
             NUMBER,
             VARCHAR, 
             AMOUNT,
             CCY
             XMLCONTAINER -> hidden xml=y and parent tags are important
CLASS      - css class
DFLT       - default value

DESC       - Requireds Description fields

MNDF       -  Mandatory Field or not
width      -    
hight      -
TYPE       -  
ONBLUR     -
ONCHANGE   -
ONCLICK    -
ONKEYUP    -
ONKEYDOUWN -
help       - window Required
helpLink   - 
TAB        - it is usefull in multitab 
xml        - Y  ->need to populate in xml
parent     - parent tag of xml
container  - This flag for the group the field by the child tag in xml

*/
var field= {
group     : 'heaerie',
name      : '',
label     : '',
desc      : '',
type      : '',
mndf      : 'N',
dataType  : 'VARCHAR',
cclass    : 'ctable',
dflt      : '',
onkeyup   : 'onKeyUp(this);',
onchange  : 'onChange(this);',
onkeydown : 'onKeyDown(this);',
onkeypress: 'onKeyPress(this);',
listVal   : '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
help      : '',
helpLink  : ''
};

//alert("###F:003:in fields..");
function createField(field)
{

    var rtString = "";
	with(document)
	{
			
		if((field.dataType =='HIDDEN')||(field.dataType == 'XMLCONTAINER'))
		{
		//don't include the lable for hidden
			;
		}
		else
		{
		    write('<td>');
		    rtString='<td>';
		    write('<label>');
		    rtString+='<label>';
		    write(field.label);
		    rtString+=field.label;
		    if(field.mndf== 'Y')
		    {
		        write(    '<span class="mandatory">');
			    rtString+='<span class="mandatory">';
		        write(    '*');
			    rtString+='*';
		        write(    '</span>');
			    rtString+='</span>';
		    }
		    write(    '</label>');
		    rtString+='</label>';
		    write(    '</td>');
		    rtString+='</td>';
		    write(    '<td>');
		    rtString+='<td>';
		}
		if (field.dataType == 'LIST') 
		{
			var inpStrArr= field.listVal.split('|');
			write(    '<SELECT dataType="'+field.dataType+'" name="'+field.group+'.'+field.name+'"  xmlname="'+field.name+'"   id="'+field.name+'" xml="'+field.xml+'"   parent="'+field.parent+'"   class="ctext"  value="'+field.dflt+'" mndf="'+field.mndf+'"  label="'+field.label+'"   >');
			rtString+='<SELECT dataType="'+field.dataType+'" name="'+field.group+'.'+field.name+'"  xmlname="'+field.name+'"   id="'+field.name+'" xml="'+field.xml+'"   parent="'+field.parent+'"   class="ctext"  value="'+field.dflt+'" mndf="'+field.mndf+'"  label="'+field.label+'"   >';
			for(var i=0 ; i< inpStrArr.length;i+=2)
			{
				if( field.dflt == inpStrArr[i])
				{
			        write(    '<OPTION  selected value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
					rtString+='<OPTION  selected value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
				}
				else
				{
			        write(    '<OPTION  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
					rtString+='<OPTION  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
				}
			}
			write('</SELECT>');
			rtString+='</SELECT>';
		}
		else if(field.dataType =='HIDDEN')
		{
			write (   '<input type="hidden"   name="'+field.group+'.'+field.name+'"  id="'+field.name+'"  xml="'+field.xml+'" xmlname="'+field.name+'"  parent="'+field.parent+'"  dataType="'+field.dataType+'" >');
			rtString+='<input type="hidden"   name="'+field.group+'.'+field.name+'"  id="'+field.name+'"  xml="'+field.xml+'" xmlname="'+field.name+'"  parent="'+field.parent+'"  dataType="'+field.dataType+'" >';
		
		}
		else if(field.dataType =='PASSWORD')
		{
			write(    '<input type="password"  class="ctext"     name="'+field.group+'.'+field.name+'"  mndf="'+field.mndf+'"  label="'+field.label+'"   xml="'+field.xml+'" xmlname="'+field.name+'"  parent="'+field.parent+'"  dataType="'+field.dataType+'" >');
			rtString+='<input type="password"  class="ctext"     name="'+field.group+'.'+field.name+'"   mndf="'+field.mndf+'"  label="'+field.label+'"   xml="'+field.xml+'" xmlname="'+field.name+'"  parent="'+field.parent+'"  dataType="'+field.dataType+'" >';
		
		}

		else if (field.dataType == 'OPTION') 
		{
			
			var inpStrArr= field.listVal.split('|');
			for(var i=0 ; i< inpStrArr.length;i+=2)
			{
			    write(    '<input  type="radio" mndf="'+field.mndf+'"  xmlname="'+field.name+'" name="'+field.group+'.'+field.name+'" xml="'+field.xml+'"  parent="'+field.parent+'" id="'+field.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
				rtString+='<input  type="radio" mndf="'+field.mndf+'"  xmlname="'+field.name+'" name="'+field.group+'.'+field.name+'" xml="'+field.xml+'"  parent="'+field.parent+'" id="'+field.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
				
			}
		}
		else if (field.dataType == 'XMLCONTAINER') 
		{
			write(    '<input type="hidden"    name="'+field.name+'" xmlname="'+field.name+'"  dataType="'+field.dataType+'"  container="Y" parent="'+field.parent+'"  xml="Y" >');
		    rtString+='<input type="hidden"    name="'+field.name+'" xmlname="'+field.name+'"  dataType="'+field.dataType+'"  container="Y" parent="'+field.parent+'"  xml="Y" >';
		    
		}
		else
		{
			write(    '<input type="text"  class="ctext"  name="'+field.group+'.'+field.name+'" xmlname="'+field.name+'" id="'+field.name+'" mndf="'+field.mndf+'" dataType="'+field.dataType+'"  xml="'+field.xml+'"  parent="'+field.parent+'" value="'+field.dflt+'"  label="'+field.label+'"  onchange="javascript:'+ field.onchange+'"    onkeydown="javascript:'+ field.onkeydown +'" onkeypress="javascript:'+ field.onkeypress+'"  onkeyup="javascript:'+ field.onkeyup+'"   >');
			rtString+='<input type="text"  class="ctext"  name="'+field.group+'.'+field.name+'" xmlname="'+field.name+'" id="'+field.name+'" mndf="'+field.mndf+'" dataType="'+field.dataType+'"  xml="'+field.xml+'"  parent="'+field.parent+'" value="'+field.dflt+'"  label="'+field.label+'"  onchange="javascript:'+ field.onchange+'"    onkeydown="javascript:'+ field.onkeydown +'" onkeypress="javascript:'+ field.onkeypress+'"  onkeyup="javascript:'+ field.onkeyup+'"   >';
			if(field.desc=='Y')
			{
			    write(    '<input type="text"  readonly class="label" name="'+field.group+'.'+field.name+'Desc"     xmlname="'+field.name+'Desc" id="'+field.name+'Desc" xml="'+field.xml+'"  parent="'+field.parent+'" dataType="LABEL" value=""  label="'+field.label+'"  onchange="javascript:'+ field.onchange+'" >');
			    rtString+='<input type="text"  readonly class="label" name="'+field.group+'.'+field.name+'Desc"     xmlname="'+field.name+'Desc" id="'+field.name+'Desc" xml="'+field.xml+'"  parent="'+field.parent+'" dataType="LABEL" value=""  label="'+field.label+'"  onchange="javascript:'+ field.onchange+'" >';
			}
			if(field.help=='Y')
			{
			
			
//				<A  id=link   HREF="javascript:onClickLink('');"> <img src="../img/cal.jpg" width="25px" height="25px" />  </a>

				write('<a id=link   HREF="javascript:onClickLink(\''+field.name+'\',\'cal.jsp\',\'calender\' );"> <img src="../img/cal.jpg" width="25px" height="25px" />  </a>'); 
			}
			
		}
		

		write(    '</td>');
		rtString+='</td>';
		
		//alert(rtString);
		//document.wirte(rtString);
		
	}
	return rtString;

}

function createRow()
{
    var rtString="";
	with(document)
	{
		write('<tr class="ctable" >');	
		rtString+='<tr class="ctable" >';
		write('</tr>');	
		rtString+='</tr>';
		//write(rtString);
	}
	return rtString;
}

function creatNewTbl()
{
    var rtString='<table border=0 class="ctable"> <tr>';
	document.write(rtString);
	return rtString;
}
alert('import fields done');
-->

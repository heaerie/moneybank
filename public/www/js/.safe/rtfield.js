<!--

alert('import fields');
/*

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
CLASS      - css class
DFLT       - default value

DESC       - Requireds Description fields

MNDF       -  Mandatory Field or not
width        -    
hight         -
TYPE        -  
ONBLUR     -
ONCHANGE   -
ONCLICK    -
ONKEYUP    -
ONKEYDOUWN -
help          - window Required
helpLink  - 


*/
alert("F:001:in fields..");
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
onchange  : 'onChange(this);',
onkeydown : 'onKeyDown(this);',
onkeypress: 'onKeyPress(this);',
onkeyup   : 'onKeyUp(this);',
listVal   : '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
help      : '',
helpLink  : ''
};

alert("F:003:in fields..");
function rtCreateField(field)
{

var rtStr="";
	
		
	rtStr +='<td  >';
	rtStr +='<label >';
	rtStr +=field.label;
	rtStr +='</label >';
	rtStr +='</td>';
	rtStr +='<td>';
	if (field.dataType == 'LIST') 
	{
		var inpStrArr= field.listVal.split('|');
		rtStr +='<SELECT dataType="'+field.dataType+'"  class="ctext"  value="'+field.dflt+'"     mndf="'+field.mndf+'"       label="'+field.label+'"   >';
		for(var i=0 ; i< inpStrArr.length;i+=2)
		{
			if( field.dflt == inpStrArr[i])
			{
				rtStr +='<OPTION  selected value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
			}
			else
			{
				rtStr +='<OPTION  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
			}
		}
		rtStr +='</SELECT>';
	}
	else if (field.dataType == 'OPTION') 
	{
		//alert('dataType is list');
		var inpStrArr= field.listVal.split('|');
		for(var i=0 ; i< inpStrArr.length;i+=2)
		{
			rtStr +='<input  type="radio"  name="'+field.group+'.'+field.name+'" id="'+field.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
			
		}
	}
	else
	{
		rtStr +='<input type="text"  class="ctext"  name="'+field.group+'.'+field.name+'" id="'+field.name+'"    dataType="'+field.dataType+'"   value="'+field.dflt+'"   label="'+field.label+'"  onchange="javascript:'+ field.onchange+'" >';
		if(field.desc=='Y')
		rtStr +='<input type="text"  readonly class="label" name="'+field.group+'.'+field.name+'Desc" id="'+field.name+'Desc"   dataType="LABEL"  value=""   label="'+field.label+'"  onchange="javascript:'+ field.onchange+'" >';
		
	}
	

	rtStr +='</td>';

}

function createRow()
{
	var rtStr="";
	rtStr +='<tr class="ctable" >';	
	rtStr +='</tr>'	
	return rtStr;
}

function creatNewTbl()
{
	var rtStr="";
	rtStr+='<table border=0 class="ctable"> <tr>';
}
alert('import fields done';
-->
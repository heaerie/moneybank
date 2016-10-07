<!--

//alert('import fields.02');
/*
*************
Do
*************
    1.Need to add key maping and body Level key events
    2. Need to include the group name in field level by durai 20121207, at FL
    2. Need to include the  db level name for field  by durai 20121209, at FL
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

function fieldClass()
{
this.group     = 'USS', /*it has been chabged by durai on 02-Feb-2010*/
this.name      = '',
this.label     = '',
this.desc      = '',
this.htmlType  = 'text', /* newly introduced in USS05*/
this.mndf      = 'N',
this.dataType  = 'VARCHAR',
this.cclass    = 'ctable',
this.dflt      = '',
this.onkeyup   = 'onKeyUp(this);',
this.onchange  = 'onChange(this);',
this.onkeydown = 'onKeyDown(this);',
this.onkeypress= 'onKeyPress(this);',
this.listVal   = '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
this.help      = '',
this.helpLink  = '',
this.xml       = '',
	this.Xpath = ''
};
function heaerie()
{
	this.field= new fieldClass();
}

function fnCreateField(fieldObj)
{
	var rtString = "";
	var fldStr="";	

	//alert("NEW FCF"+ fieldObj.name);
	try
	{
		
		//if ((fieldObj.htmlType.length==0 ) || (fieldObj.htmlType == "" ) )
		if (fieldObj.htmlType == "" )
		{
			alert(FLDFCF00001);
	
			return false;
		}
		//else  if ((fieldObj.dataType.length==0 ) || (fieldObj.dataType == "" ) )
		else if (fieldObj.dataType == "" ) 
		{
			alert(FLDFCF00002);
			return false;
	
		}
	//	else  if ((fieldObj.groupId.length==0 ) || (fieldObj.groupId == "" ) )
		else  if  (fieldObj.groupId == "" ) 
		{
			alert(FLDFCF00003);
			return false;
	
		}
		else 
		{
			
			///###alert("!!!Proceed with field creation ?");
			with(document)
			{		
					if((fieldObj.dataType =='HIDDEN')||(fieldObj.dataType == 'XMLCONTAINER'))
					{
					//don't include the lable for hidden
						;
					}
					else
					{
						write('<td>');
						fldStr='<td>';
						rtString+=fldStr;
						write('<label  class="clabel"  for="'+fieldObj.name+'">');
						fldStr='<label>';
						rtString+=fldStr;
						write(fieldObj.label);
						fldStr=fieldObj.label;
						rtString+=fldStr;
						
						if(fieldObj.mndf == 'Y')
						{
							
							write('<span class="mandatory">');
							fldStr='<span class="mandatory">';
							rtString+=fldStr;
							write('*');
							fldStr='*';
							rtString+=fldStr;
							write('</span>');
							fldStr='</span>';
							rtString+=fldStr;
						}
						write('</label>');
						fldStr='</label>';
						rtString+=fldStr;
						write('</td>');
						fldStr='</td>';
						rtString+=fldStr;
						write('<td>');
						fldStr='<td>';
						rtString+=fldStr;
					}
					if (fieldObj.dataType == 'LIST') 
					{
						var inpStrArr= fieldObj.listVal.split('|');
						write( '<SELECT dataType="'+fieldObj.dataType+'" name="'+fieldObj.group+'_'+fieldObj.name+'"  xmlname="'+fieldObj.name+'"   id="'+fieldObj.name+'" xml="'+fieldObj.xml+'"   parent="'+fieldObj.parent+'"   class="ctext"  value="'+fieldObj.dflt+'" mndf="'+fieldObj.mndf+'"  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'"    onkeydown="javascript:'+ fieldObj.onkeydown +'" onkeypress="javascript:'+ fieldObj.onkeypress+'"  onkeyup="javascript:'+ fieldObj.onkeyup+'"     >');
						fldStr='<SELECT dataType="'+fieldObj.dataType+'" name="'+fieldObj.group+'_'+fieldObj.name+'"  xmlname="'+fieldObj.name+'"   id="'+fieldObj.name+'" xml="'+fieldObj.xml+'"   parent="'+fieldObj.parent+'"   class="ctext"  value="'+fieldObj.dflt+'" mndf="'+fieldObj.mndf+'"  label="'+fieldObj.label+'"   onchange="javascript:'+ fieldObj.onchange+'"    onkeydown="javascript:'+ fieldObj.onkeydown +'" onkeypress="javascript:'+ fieldObj.onkeypress+'"  onkeyup="javascript:'+ fieldObj.onkeyup+'"    >';
						rtString+=fldStr;
						for(var i=0 ; i< inpStrArr.length;i+=2)
						{
							if( fieldObj.dflt == inpStrArr[i])
							{
								write('<OPTION  selected value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
								fldStr='<OPTION  selected value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
								rtString+=fldStr;
							}
							else
							{
								write('<OPTION  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
								fldStr='<OPTION  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
								rtString+=fldStr;
							}
						}
						write('</SELECT>');
						fldStr='</SELECT>';
						rtString+=fldStr;
					}
					else if(fieldObj.dataType =='DIV')
					{
						write ('<div    name="'+fieldObj.group+'_'+fieldObj.name+'Div"  id="'+fieldObj.name+'Div"  xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" > <img src="../img/loading.gif"></div>');
						fldStr='<div   name="'+fieldObj.group+'_'+fieldObj.name+'"  id="'+fieldObj.name+'"  xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" > DIVTEST </div>';
						rtString+=fldStr;
					
					}	
					else if(fieldObj.dataType =='LOB')
					{
						write ('<textarea    name="'+fieldObj.group+'_'+fieldObj.name+'"  id="'+fieldObj.name+'"  xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" >' +fieldObj.dflt +'</textarea>');
						fldStr='<textarea   name="'+fieldObj.group+'_'+fieldObj.name+'"  id="'+fieldObj.name+'"  xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" >' +fieldObj.dflt +'</textarea>';
						rtString+=fldStr;
					
					}



					else if(fieldObj.dataType =='HIDDEN')
					{
						write ('<input type="hidden"   name="'+fieldObj.group+'_'+fieldObj.name+'"  id="'+fieldObj.name+'"  xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" >');
						fldStr='<input type="hidden"   name="'+fieldObj.group+'_'+fieldObj.name+'"  id="'+fieldObj.name+'"  xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" >';
						rtString+=fldStr;
					
					}
					else if(fieldObj.dataType =='LABEL')
					{
						write('<input type="text"   readonly class="label"   name="'+fieldObj.group+'_'+fieldObj.name+'" xmlname="'+fieldObj.name+'" id="'+fieldObj.name+'" mndf="'+fieldObj.mndf+'"   desc="'+fieldObj.desc+'" dataType="'+fieldObj.dataType+'"  xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" value="'+fieldObj.dflt+'"  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'"    onkeydown="javascript:'+ fieldObj.onkeydown +'" onkeypress="javascript:'+ fieldObj.onkeypress+'"  onkeyup="javascript:'+ fieldObj.onkeyup+'"   >');
						fldStr='<input type="text"  readonly class="label"  name="'+fieldObj.group+'_'+fieldObj.name+'" xmlname="'+fieldObj.name+'" id="'+fieldObj.name+'" mndf="'+fieldObj.mndf+'"  desc="'+fieldObj.desc+'" dataType="'+fieldObj.dataType+'"  xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" value="'+fieldObj.dflt+'"  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'"    onkeydown="javascript:'+ fieldObj.onkeydown +'" onkeypress="javascript:'+ fieldObj.onkeypress+'"  onkeyup="javascript:'+ fieldObj.onkeyup+'"   >';
						rtString+=fldStr;
						if(fieldObj.help=='Y')
						{
						
						
			//				<A  id=link   HREF="javascript:onClickLink('');"> <img src="../img/cal.jpg" width="25px" height="25px" />  </a>
	
							write('<a id=link   HREF="javascript:onClickLink(\''+fieldObj.name+'\',\'cal.jsp\',\'calender\');"> <img src="../img/calendar.gif" width="25px" height="25px" />  </a>');
							fldStr='<a id=link   HREF="javascript:onClickLink(\''+fieldObj.name+'\',\'cal.jsp\',\'calender\');"> <img src="../img/calendar.gif" width="25px" height="25px" />  </a>';
							rtString+=fldStr;
						}
						if(fieldObj.desc=='Y')
						{
							write('<input type="text"  readonly class="label" name="'+fieldObj.group+'_'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'" >');
							fldStr='<input type="text"  readonly class="label" name="'+fieldObj.group+'_'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'" >';
							rtString+=fldStr;
						}
	
					}
					else if(fieldObj.dataType =='PASSWORD')
					{
						write('<input type="password"  class="ctext"     name="'+fieldObj.group+'_'+fieldObj.name+'"  mndf="'+fieldObj.mndf+'"  label="'+fieldObj.label+'"   xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" >');
						fldStr='<input type="password"  class="ctext"     name="'+fieldObj.group+'_'+fieldObj.name+'"   mndf="'+fieldObj.mndf+'"  label="'+fieldObj.label+'"   xml="'+fieldObj.xml+'" xmlname="'+fieldObj.name+'"  parent="'+fieldObj.parent+'"  dataType="'+fieldObj.dataType+'" >';
						rtString+=fldStr;
					
					}
	
					else if (fieldObj.dataType == 'OPTION') 
					{
						
						var inpStrArr= fieldObj.listVal.split('|');
						for(var i=0 ; i< inpStrArr.length;i+=2)
						{
						/*[
							write('<input  type="radio" mndf="'+fieldObj.mndf+'"  xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
							fldStr='<input  type="radio" mndf="'+fieldObj.mndf+'"  xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
						]*/	
						
						if( i==0)
						{
					//	write('<input  type="hidden" mndf="'+fieldObj.mndf+'"  dataType="'+fieldObj.dataType+'" label="'+fieldObj.label+'" xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] );
						write('<input  type="text" mndf="'+fieldObj.mndf+'"  dataType="'+fieldObj.dataType+'" label="'+fieldObj.label+'" xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"> '  );
						//fldStr='<input  type="hidden" mndf="'+fieldObj.mndf+'" dataType="'+fieldObj.dataType+'" label="'+fieldObj.label+'" xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1];
						fldStr='<input  type="hidden" mndf="'+fieldObj.mndf+'" dataType="'+fieldObj.dataType+'" label="'+fieldObj.label+'" xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"> ';
						rtString+=fldStr;
						}
						write('<input  type="radio"  dataType="'+fieldObj.dataType+'"    xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" > '+ inpStrArr[i+1] );
						fldStr='<input  type="radio" dataType="'+fieldObj.dataType+'"   xmlname="'+fieldObj.name+'" name="'+fieldObj.group+'_'+fieldObj.name+'"  parent="'+fieldObj.parent+'" id="'+fieldObj.name+'"  value="'+inpStrArr[i]+'"  onchange="javascript:'+ fieldObj.onchange+'" > '+ inpStrArr[i+1] ;
						rtString+=fldStr;
					
								
						}
					}
					else if (fieldObj.dataType == 'XMLCONTAINER') 
					{
						write('<input type="hidden"    name="'+fieldObj.name+'" xmlname="'+fieldObj.name+'"  dataType="'+fieldObj.dataType+'"  container="Y" parent="'+fieldObj.parent+'"  xml="Y" >');
						fldStr='<input type="hidden"    name="'+fieldObj.name+'" xmlname="'+fieldObj.name+'"  dataType="'+fieldObj.dataType+'"  container="Y" parent="'+fieldObj.parent+'"  xml="Y" >';
						rtString+=fldStr;
						
					}
					else
					{
						write('<input type="text"  class="ctext"  name="'+fieldObj.group+'_'+fieldObj.name+'" xmlname="'+fieldObj.name+'" id="'+fieldObj.name+'" mndf="'+fieldObj.mndf+'"   desc="'+fieldObj.desc+'" dataType="'+fieldObj.dataType+'"  xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" value="'+fieldObj.dflt+'"  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'"    onkeydown="javascript:'+ fieldObj.onkeydown +'" onkeypress="javascript:'+ fieldObj.onkeypress+'"  onkeyup="javascript:'+ fieldObj.onkeyup+'"   >');
						fldStr='<input type="text"  class="ctext"  name="'+fieldObj.group+'_'+fieldObj.name+'" xmlname="'+fieldObj.name+'" id="'+fieldObj.name+'" mndf="'+fieldObj.mndf+'"  desc="'+fieldObj.desc+'" dataType="'+fieldObj.dataType+'"  xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" value="'+fieldObj.dflt+'"  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'"    onkeydown="javascript:'+ fieldObj.onkeydown +'" onkeypress="javascript:'+ fieldObj.onkeypress+'"  onkeyup="javascript:'+ fieldObj.onkeyup+'"   >';
						rtString+=fldStr;
						if(fieldObj.help=='Y')
						{
						
						
			//				<A  id=link   HREF="javascript:onClickLink('');"> <img src="../img/cal.jpg" width="25px" height="25px" />  </a>
	
							write('<a id=link   HREF="javascript:onClickLink(\''+fieldObj.name+'\',\'cal.jsp\',\'calender\');"> <img src="../img/calendar.gif" width="25px" height="25px" />  </a>');
							fldStr='<a id=link   HREF="javascript:onClickLink(\''+fieldObj.name+'\',\'cal.jsp\',\'calender\');"> <img src="../img/calendar.gif" width="25px" height="25px" />  </a>';
							rtString+=fldStr;
						}
						if(fieldObj.desc=='Y')
						{
							write('<input type="text"  readonly class="label" name="'+fieldObj.group+'_'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'" >');
							fldStr='<input type="text"  readonly class="label" name="'+fieldObj.group+'_'+fieldObj.name+'Desc"     xmlname="'+fieldObj.name+'Desc" id="'+fieldObj.name+'Desc" xml="'+fieldObj.xml+'"  parent="'+fieldObj.parent+'" dataType="LABEL" value=""  label="'+fieldObj.label+'"  onchange="javascript:'+ fieldObj.onchange+'" >';
							rtString+=fldStr;
						}
						//alert("fieldObj.help=" + fieldObj.help);
				
						
					}
					
	
					write(    '</td>');
					fldStr='</td>';
					rtString+=fldStr;
					
					
					//alert(" b4 Return  " + rtString);
				
					
				}
				
		}
	}
	catch(e)
	{
			alert("CFCException :" +e);
	}
	return rtString;
}
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
			write(    '<SELECT dataType="'+field.dataType+'" name="'+field.group+'.'+field.name+'"  xmlname="'+field.name+'"   id="'+field.name+'" xml="'+field.xml+'"   parent="'+field.parent+'"   class="ctext"  value="'+field.dflt+'" mndf="'+field.mndf+'"  label="'+field.label+'"   onchange="javascript:'+ field.onchange+'"    onkeydown="javascript:'+ field.onkeydown +'" onkeypress="javascript:'+ field.onkeypress+'"  onkeyup="javascript:'+ field.onkeyup+'"    >');
			rtString+='<SELECT dataType="'+field.dataType+'" name="'+field.group+'.'+field.name+'"  xmlname="'+field.name+'"   id="'+field.name+'" xml="'+field.xml+'"   parent="'+field.parent+'"   class="ctext"  value="'+field.dflt+'" mndf="'+field.mndf+'"  label="'+field.label+'"    onchange="javascript:'+ field.onchange+'"    onkeydown="javascript:'+ field.onkeydown +'" onkeypress="javascript:'+ field.onkeypress+'"  onkeyup="javascript:'+ field.onkeyup+'"   >';
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
				if( i == 0)
				{
					rtString+='<input  type="hidden" mndf="'+field.mndf+'" label="'+field.label+'"   xmlname="'+field.name+'" name="'+field.group+'.'+field.name+'" xml="'+field.xml+'"  parent="'+field.parent+'" id="'+field.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
					write(    '<input  type="hidden" mndf="'+field.mndf+'" label="'+field.label+'"   xmlname="'+field.name+'" name="'+field.group+'.'+field.name+'" xml="'+field.xml+'"  parent="'+field.parent+'" id="'+field.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
				}
				
				{
					write(    '<input  type="radio" label="'+field.label+'"  parent="'+field.parent+'" id="'+field.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>');
					rtString+='<input  type="radio" label="'+field.label+'"  parent="'+field.parent+'" id="'+field.name+'"  value="'+inpStrArr[i]+'"> '+ inpStrArr[i+1] +'</OPTION>';
				}
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

				write('<a id=link   HREF="javascript:onClickLink(\''+field.name+'\',\'cal.jsp\',\'calender\' );"><img src="../img/calendar.gif" width="25px" height="25px" /></a>'); 
			}
			
		}
		

		write(    '</td>');
		rtString+='</td>';
		
		//alert(rtString);
		//document.wirte(rtString);
		
	}
	return rtString;

}

function rtCreateRow()
{
    var rtString="";
		rtString+='<tr class="ctable" >';
		rtString+='</tr>';
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

function endNewTbl()
{
    var rtString='</tr></table>';
	document.write(rtString);
	return rtString;
}

function fnCreateCaption(caption)
{
	var rtString='<td class="ccaption" colspan=10>' + caption +  '</td>';
	document.write(rtString);
	return rtString;

}


//alert('import fields done');
-->

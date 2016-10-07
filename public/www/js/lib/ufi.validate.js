define(function(require, exports, module) {
"use strict";


var USS=require("ufi.core").USS;
var XML =  require("ufi.xml").XML;
var xmlObj = new XML();

//alert("import validate");


var DownKeyCode=0,PressKeyCode=0,UpKeyCode=0;
var prcDate=new Date();
var bizDate=new Date();
var sysDate=new Date();


  var VAL=USS;

VAL.prototype.ErrorBox=function ( param) {
 	//var param=params[0];
 	
 //	alert(param.obj.id);
 //	alert(param.errMsg);
       $("#"+ param.obj.getAttribute("ErrorBox"))
         .text( param.errMsg )
         .addClass( "ui-state-highlight" );
 
       setTimeout(function() {
 //	alert("1");
         $("#"+ param.obj.getAttribute("ErrorBox")).text("").removeClass( "ui-state-highlight",1500);
 	//$("#"+ obj.getAttribute("ErrorBox")).text("");
       }, 100*120 );
     }

VAL.prototype.onKeyUp=function(obj)
{
    
	//alert("KeyUp");

	try
	{
    cust_pre_onKeyUp(obj);
	}
	catch(e)
	{

	}
    var event;
    
    if (window.event)
	{
			event = window.event;
	}
    UpKeyCode=event.keyCode;
    
   // alert( "PressKeyCode= " +PressKeyCode + "|DownKeyCode = " + DownKeyCode + "|UpKeyCode=" +UpKeyCode);
    
    /* 
     * Need to test the key code combination  in windows /Unix
     * Need to check all browsers are compatible with opera/safri/chrome
     * 
     * 
     * */
    if( (PressKeyCode ==  0 || PressKeyCode ==  223   )&& DownKeyCode == 83 && UpKeyCode == 83 )//Alt+s 	
    {
    
        if( obj.getAttribute('dataType') =='DATE' )
        {
                obj.value= sysDate;
                obj.onchange();
        }
        else
        {
                alert( VLDOKU00001);
             
        }
        
    }
    if( (PressKeyCode ==  0 || PressKeyCode == 8747)  && DownKeyCode == 66 && UpKeyCode == 66 ) //alt +b
    {
        if( obj.getAttribute('dataType') =='DATE' )
        {
                obj.value= bizDate;
                obj.onchange();
        }
        else
        {
                alert(VLDOKU00001);
             
        }
        
    }
    if( (PressKeyCode ==  0 || PressKeyCode == 960) && DownKeyCode == 80 && UpKeyCode == 80 ) //alt + p
    {
        if( obj.getAttribute('dataType') =='DATE' )
        {
                obj.value=prcDate;
                obj.onchange();
        }
        else
        {
                alert(VLDOKU00001);
             
        }
        
    }
    try
    {
    cust_post_onKeyUp(obj);
}
catch(e)
{

}
    DownKeyCode=0;
    PressKeyCode=0;
    UpKeyCode=0;
    
}

VAL.prototype.onKeyDown= function (obj)
{

	try
	{
     cust_pre_onKeyDown(obj);
     }
catch(e)
{
	
}
     var event;
     if (window.event)
	{
			event = window.event;
	}
     DownKeyCode=event.keyCode;
    
    try
	{
     cust_post_onKeyDown(obj);
     }
catch(e)
{
	
}
}

VAL.prototype.onKeyPress=  function (obj)
{
	 try
	{
    cust_pre_onKeyPress(obj);
     }
catch(e)
{
	
}
    var event;
    if (window.event)
	{
			var event = window.event;
	}
    PressKeyCode=event.keyCode;
     try
	{
    cust_post_onKeyPress(obj);
     }
catch(e)
{
	
}
}

VAL.prototype.onChange= function onChange(obj)
{
	try
	{
    cust_pre_onChange(obj);    
      }
catch(e)
{
	
}

$("#"+ obj.getAttribute("ErrorBox")).text("").removeClass( "ui-state-highlight",15);

	if(obj.getAttribute('dataType') =="DATE")
	{
		this.onChangeVal(obj);
	}
	if(obj.getAttribute('dataType')=="NUMBER")
	{
		this.valNumber(obj);
	}
	if(obj.getAttribute('dataType')=="AMOUNT")
	{
		
		this.valAmount(obj);
	}
	if(obj.getAttribute('dataType')=="OPTION")
	{
		
		//alert("id "+ obj.id +" value "+obj.value);
		var radioButtons=  document.forms[0].elements[obj.id];
		for(var i=0; i< radioButtons.length; i++)
		{
			if(i==0 )
			radioButtons[i].value = obj.value;
			//alert("value =["+i+"] "+radioButtons[i].value );
		}
		
	}
//alert("onChange <" + obj.value +">" );

try
{
	cust_post_onChange(obj);

	  }
catch(e)
{
	
}
}
VAL.prototype.valAmount=  function (obj)
{
	if(IsFloate(obj.value)== false)
	{
		//alert(obj.getAttribute('label') + VLDOKU00004);

		ErrorBox({"obj":obj,"errMsg": obj.getAttribute('label') + VLDOKU00004});
		obj.value="";
		obj.focus();
	}
	
}

VAL.prototype.valNumber=   function (obj)
{
	if(IsPositiveNumber(obj.value)== false)
	{
		//alert(obj.getAttribute('label') + VLDOKU00002);
		ErrorBox({"obj":obj,"errMsg":obj.getAttribute('label') + VLDOKU00002});
		obj.value="";
		obj.focus();
	}
}

VAL.prototype.IsFloate=    function (a_strString) 
{

	if(( isNaN(a_strString) ) || ( a_strString.indexOf( " " ) != -1 )  )
		return false;
	else if (a_strString < 0 )
		return true;//-ve active
	else
		return true;
}


VAL.prototype.IsPositiveNumber=   function (a_strString) 
{

	if(( isNaN(a_strString) ) || ( a_strString.indexOf( " " ) != -1 ) || ( a_strString.indexOf(".") != -1 ))
		return false;
	else if (a_strString < 0 )
		return false;
	else
		return true;
}

VAL.prototype.onValidate=  function onValidate(obj)
{

	try
	{
			if (	cust_pre_onValidate(obj) == false )
				{
					return false;
				}
	}
	catch(e)
	{

	}
	try
	{
	if(obj.getAttribute('task')=='CANCEL')
	{
		window.close();
	}
	if(obj.getAttribute('task') =='SUBMIT')
	{
		if(!fnValidate())
		{
			return false;
			
		}
		//document.forms[0].method="post";
		//document.forms[0].submit();
		//alert("VALOVDL:003");
	}
	if(obj.getAttribute('task') == 'VALIDATE')
	{
		fnValidate();
	
	}
	}
	catch(e)
	{
		alert('VLDOVLException'+e);
	}

	try
	{
			if (	cust_pre_onValidate(obj) == false )
				{
					return false;
				}
	}
	catch(e)
	{

	}
}

VAL.prototype.onClick=   function onClick(obj)
{

	//alert(obj.id);

	try
	{

		try
		{
				if (	cust_pre_onClick(obj) == false )
				{
					return false;
				}
		}
		catch(e)
		{

		}
	if(obj.getAttribute('task')=='CANCEL')
	{
		window.close();
	}
	else if(obj.getAttribute('task') =='SUBMIT')
	{
		if(!fnValidate())
		{
			return false;
			
		}
			//alert("VALOVDL:003");
	}
	else if(obj.getAttribute('task') == 'VALIDATE')
	{
		if(!fnValidate())
		{
			return false;
			
		}
	
	}
		try
		{	
			 if  (cust_post_onClick(obj) == false )
			{
				return false;
			}
		}
		catch(e)
		{
			
		}
	}
	catch(e)
	{
		alert('VLDOVLExceptiom'+e);
	}

//	alert("V:Submit");

	if(obj.getAttribute('task') =='SUBMIT')
	{

	document.forms[0].method="post";
		document.forms[0].submit();

	}

}

VAL.prototype.fnValidate=  function ()
{


var elmnts = document.forms[0].elements;
	
	for ( var i=0; i<elmnts.length;i++)
	{
			if(elmnts[i].getAttribute('mndf') =='Y')
			{
				
				
				if(elmnts[i].getAttribute('dataType') == 'OPTION')
				{
					
					var radioButtons=  document.forms[0].elements[elmnts[i].id];
					try
					{
						var lvFlg=true;
						/*
						if(radioButtons[0].value.length !=0)
						{
						//	return false;
							lvFlg=false;

							
						}
						*/
						for(var j=1;j<=radioButtons.length;j++)
						{
						
							
							if( radioButtons[j].checked == true)
							lvFlg=false;
							//return true;
							break;
						}
						
						if (lvFlg  == true)
						{
							//alert( VLDOKU00003 + radioButtons[0].getAttribute('label') );
							ErrorBox({ "obj":radioButtons[0], "errMsg": VLDOKU00003 + radioButtons[0].getAttribute('label')} );
							radioButtons[1].focus();
							return false;
						}

					}
					catch(e)
					{
						alert("FVDException:"+e);
					}
				}
				else if(elmnts[i].value.length==0)
				{
					var Msg= VLDOKU00003 + elmnts[i].getAttribute('label') ;
					ErrorBox({"obj":elmnts[i] , "errMsg":Msg });
					elmnts[i].focus();
					return false;
				}
				
			}
	}
	xmlObj.genXml();
	return true;

}


//alert("end validate");

var dateMonStr="JAN=01;FEB=02;MAR=03;APR=04;MAY=05;JUN=06;JUL=07;AUG=08;SEP=09;OCT=10;NOV=11;DEC=12";
var dateMMStr= "01=JAN;02=FEB;03=MAR;04=APR;05=MAY;06=JUN;07=JUL;08=AUG;09=SEP;10=OCT;11=NOV;12=DEC;1=JAN;2=FEB;4=APR;5=MAY;6=JUN;7=JUL;8=AUG;9=SEP";
var dateDayStr= "0=SUN;1=MON;2=TUE;3=WED;4=THU;5=FRI;6=SAT";
var monthOffSet="0336146250351";
//var monthOffSet="0336146250351";
var monthOffSetLeaf="0340250361462";
monthOffSet=monthOffSet.split('');
monthOffSetLeaf=monthOffSetLeaf.split('');
var yearOffSet="0123560134561234601245602345";
yearOffSet=yearOffSet.split('');

VAL.prototype.dayDesc=function (name) {
    var nameEQ = name.toUpperCase()	 + "=";
	var ca = dateDayStr.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return  false;
}

VAL.prototype.MONtoMM=function (name) {
    var nameEQ = name.toUpperCase()	 + "=";
	var ca = dateMonStr.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return  false;
}

VAL.prototype.MMtoMON=function (name) {
    var nameEQ = name.toUpperCase()	 + "=";
		//alert(nameEQ);
	 var ca = dateMMStr.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return false;
}



VAL.prototype.valDate=function (inpStr)
{

inpStr=inpStr.replace(/-/g,'/');
inpStr=inpStr.replace(/\./g,'/');
if(inpStr.length == 0)
{
	alert(DTEVDT00002);
	return false;
}
var inpArr=inpStr.split('/');
//alert(inpArr);

if( inpArr.length !=3 )
{
	alert(DTEVDT00001);
	return false;
}
var dayStr   =inpArr[0];
var monthStr =inpArr[1];
var yearStr =inpArr[2];
var dayInt  =parseInt(dayStr,10);
var monthInt;

var yearInt =parseInt(yearStr,10);
if(monthStr.length ==3)
{
	monthStr=this.MONtoMM(monthStr);
	if(monthStr== false)
	{
		alert(DTEVDT00003);
		return false;
	}
}
monthInt=parseInt(monthStr,10);
if(dayInt> 31)
{
		alert(DTEVDT00004);
		return false;
}
else
{
	
	if( dayInt <= 0)
	{
			alert(DTEVDT00005);
			return false;
	}
	else if(  monthInt== 2)
	{
		if (yearInt%4 == 0 ) 
		{
			if(dayInt> 29)
			{
				alert(DTEVDT00006);
				return false;
			}
		
		}
		else if(dayInt> 28)
		{
			alert(DTEVDT00007);
		    return false;
		}
	}
	else 
	if( (monthInt == 4 )||( monthInt== 6)|| (monthInt==11))
	{
		if(dayInt> 30)
		{
			alert(DTEVDT00008);
		    return false;
		}
	}
		
}

if( dayInt <= 0)
	{
			alert(DTEVDT00005);
			return false;
	}

 var dayOff   = (dayInt-1);
 if(yearInt%4==0)
 {
	var monthOff = parseInt(monthOffSetLeaf[monthInt-1]);
 }
 else
 {
   var monthOff = parseInt(monthOffSet[monthInt-1]);
 }
 var yearOff  = parseInt(yearOffSet[(yearInt-1)%28]);
 
var  finalOffset = dayOff+monthOff+yearOff;

 var dayKey=finalOffset%7;
 //alert("dayKey" +dayKey);
 
monthStr=this.MMtoMON(monthStr);
if(inpArr[1]== false)
{
	alert(DTEVDT00003);
	return false;
}
//alert(" Day = "+dayDesc(""+dayKey+""));
return  dayStr+"-"+monthStr+"-"+yearStr+"|"+this.dayDesc(""+dayKey+"");


}


VAL.prototype.onChangeVal=function (obj)
{
	if(obj.getAttribute('dataType')=="DATE")
	{
		var  conValue=this.valDate(obj.value);
		if(conValue == false)
		{
			obj.value="";
			obj.focus();
			if(obj.getAttribute('desc') =='Y')
			{
		
				document.getElementById(obj.id+"Desc").value="";
			}
			
		}
		else
		{
			conValue=conValue.split('|');
			obj.value=conValue[0];
			
	
			if(obj.getAttribute('desc') =='Y')
			{
				document.getElementById(obj.id+"Desc").value=conValue[1];
			}
		}
	}
	return true;
	
}

exports.VAL=VAL;

});
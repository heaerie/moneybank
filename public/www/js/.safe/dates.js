<!--
//alert("Importing date");
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

function dayDesc(name) {
    var nameEQ = name.toUpperCase()	 + "=";
	var ca = dateDayStr.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return  false;
}

function MONtoMM(name) {
    var nameEQ = name.toUpperCase()	 + "=";
	var ca = dateMonStr.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return  false;
}

function MMtoMON(name) {
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



function valDate(inpStr)
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
	monthStr=MONtoMM(monthStr);
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
 
monthStr=MMtoMON(monthStr);
if(inpArr[1]== false)
{
	alert(DTEVDT00003);
	return false;
}
//alert(" Day = "+dayDesc(""+dayKey+""));
return  dayStr+"-"+monthStr+"-"+yearStr+"|"+dayDesc(""+dayKey+"");


}


function onChangeVal(obj)
{
	if(obj.getAttribute('dataType')=="DATE")
	{
		conValue=valDate(obj.value);
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
//alert('date end');
-->

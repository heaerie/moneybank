define([],
function()
{

	return [ '$scope' , 'toaster','keyBoardService','$state',function($scope,toaster,keyBoardService,$state){

var st='<table class="ctable" >';
var sr ='<tr class="ctable">';
var sd ='<td class="ctext">';
var sc ='<td class="ccaption">';
var dy = st;
var et='</table>';
var er ='</tr>';
var ed ='</td>';
var  offsetArry = new Array('3','66','7','77','56','57','28','65','8','47|56','47','31|64','31|63','75','10','9','41|65','41','40','40|65','21','21|65','42','42|65','62','72','16','36|65','36','46|65','46','31|65','31','5','6','71','70','74','76','52','52|65','64','63','30','25','26','','51','51|65','53|65','53','48','48|66','48|65','15','14','49|65','49','19','18','20','50','50|65','35','35|65');
var chaArr      = new Array('`','^','\',',';',']','}','#','%','<','A','a','B','b','','C','c','D','d','e','E','f','F','g','G','h','i','I','J','j','K','k','L','l','m','M','N','n','n+g','n+s','o','O','P','p','Q','q','r','R','s','S','T','t','u','&','U','V','v','W','w','X','x','Xs','y','Y','z','Z');
var chaArrId    = new Array('id_shift_delta','id_caps','id_cama','id_semicolon','id_rectangle_close_bracle','id_shift_rectangle_close_bracle','id_ambasant','id_hash','id_percentage','id_lesserthan','id_A','id_a','id_B','id_b','id_c','id_C','id_d','id_D','id_E','id_e','id_F','id_f','id_G','id_g','id_h','id_I','id_i','id_j','id_J','id_k','id_K','id_l','id_L','id_M','id_m','id_n','id_N','id_n+g','id_n+s','id_O','id_o','id_p','id_P','id_q','id_Q','id_R','id_r','id_S','id_s','id_t','id_T','id_U','id_u','id_v','id_V','id_w','id_W','id_x','id_X','id_Xs','id_Y','id_y','id_Z','id_z');
chaArr[2]='\\';





$scope.isNedil=function(b1,b2,b3)
{ 


var NedilConst=new Array(
 0xE0AE86
,0xE0AE88
,0xE0AE8A
,0xE0AE8F
,0xE0AE90
,0xE0AE93
,0xE0AE94
,0xE0AEBE
,0xE0AF80
,0xE0AF82
,0xE0AF87
,0xE0AF88
,0xE0AF8B
,0xE0AF8C 
); 
var byte1,byte2,byte3;

var rtBool=0x00;
var constValue=0x0;

//var longValue=constValue|parseInt(b1)<<(3*8)|parseInt(b2)<<(2*8)|parseInt(b3)<<(1*8);

var byte1=  b1.charCodeAt();
var byte2=  b2.charCodeAt();
var byte3=  b3.charCodeAt();

byte1= byte1<<8*2;
byte2= byte2<<8*1;
byte3= byte3;

var longValue=constValue|byte1|byte2|byte3;

for ( var j = 0;j< NedilConst.length ;j++)
{
  if(longValue==NedilConst[j])
  {


    rtBool=0x01;
    break;
  }

}

  return rtBool;
}
$scope.isUyir=function(b1,b2,b3)
{ 


var UyirConst=new Array(
  0xE0AE85
   ,0xE0AE87
   ,0xE0AE89 ,0xE0AE8E ,0xE0AE92 ,0xE0AE86 ,0xE0AE88 ,0xE0AE8A ,0xE0AE8F ,0xE0AE90 ,0xE0AE93 ,0xE0AE94 
); 
var byte1,byte2,byte3;

var rtBool=0x00;
var constValue=0x0;

//var longValue=constValue|parseInt(b1)<<(3*8)|parseInt(b2)<<(2*8)|parseInt(b3)<<(1*8);

var byte1=  b1.charCodeAt();
var byte2=  b2.charCodeAt();
var byte3=  b3.charCodeAt();

byte1= byte1<<8*2;
byte2= byte2<<8*1;
byte3= byte3;

var longValue=constValue|byte1|byte2|byte3;

for ( var j = 0;j< UyirConst.length ;j++)
{
  if(longValue==UyirConst[j])
  {


    rtBool=0x01;
    break;
  }

}

  return rtBool;
}
$scope.isSymbol=function(b1,b2,b3)
{ 


var MeiConst=new Array(
 0xE0AF8D
,0xE0AEBE
,0xE0AEBF
,0xE0AF80
,0xE0AF81
,0xE0AF82
,0xE0AF86
,0xE0AF87
,0xE0AF88
,0xE0AF8A
,0xE0AF8B
,0xE0AF8C
); 
var byte1,byte2,byte3;

var rtBool=0x00;
var constValue=0x0;

//var longValue=constValue|parseInt(b1)<<(3*8)|parseInt(b2)<<(2*8)|parseInt(b3)<<(1*8);

var byte1=  b1.charCodeAt();
var byte2=  b2.charCodeAt();
var byte3=  b3.charCodeAt();

byte1= byte1<<8*2;
byte2= byte2<<8*1;
byte3= byte3;

var longValue=constValue|byte1|byte2|byte3;

for ( var j = 0;j< MeiConst.length ;j++)
{
  if(longValue==MeiConst[j])
  {


    rtBool=0x01;
    break;
  }

}

  return rtBool;
}
$scope.isMei=function(b1,b2,b3)
{ 


var MeiConst=new Array(
 0xE0AE95
,0xE0AE9A
,0xE0AE9F
,0xE0AEA4
,0xE0AEAA
,0xE0AEB1
,0xE0AE99
,0xE0AE9E
,0xE0AEA3
,0xE0AEA8
,0xE0AEAE
,0xE0AEA9
,0xE0AEAF
,0xE0AEB0
,0xE0AEB2
,0xE0AEB5
,0xE0AEB4
,0xE0AEB3
); 
var byte1,byte2,byte3;

var rtBool=0x00;
var constValue=0x0;

//var longValue=constValue|parseInt(b1)<<(3*8)|parseInt(b2)<<(2*8)|parseInt(b3)<<(1*8);

var byte1=  b1.charCodeAt();
var byte2=  b2.charCodeAt();
var byte3=  b3.charCodeAt();

byte1= byte1<<8*2;
byte2= byte2<<8*1;
byte3= byte3;

var longValue=constValue|byte1|byte2|byte3;

for ( var j = 0;j< MeiConst.length ;j++)
{
  if(longValue==MeiConst[j])
  {


    rtBool=0x01;
    break;
  }

}

  return rtBool;
}
$scope.getMeiType=function(b1,b2,b3)
{ 


var valConst=new Array(
 0xE0AE95
,0xE0AE9A
,0xE0AE9F
,0xE0AEA4
,0xE0AEAA
,0xE0AEB1
);
var melConst=new Array(
 0xE0AE99
,0xE0AE9E
,0xE0AEA3
,0xE0AEA8
,0xE0AEAE
,0xE0AEA9
); 
var idaConst=new Array(
 0xE0AE99
,0xE0AE9E
,0xE0AEA3
,0xE0AEA8
,0xE0AEAE
,0xE0AEA9
); 
var byte1,byte2,byte3;

var rtBool=0x0;
var constValue=0x0;

//var longValue=constValue|parseInt(b1)<<(3*8)|parseInt(b2)<<(2*8)|parseInt(b3)<<(1*8);

var byte1=  b1.charCodeAt();
var byte2=  b2.charCodeAt();
var byte3=  b3.charCodeAt();

byte1= byte1<<8*2;
byte2= byte2<<8*1;
byte3= byte3;

var longValue=constValue|byte1|byte2|byte3;

for ( var j = 0;j< valConst.length ;j++)
{
  if(longValue==valConst[j])
  {


    rtBool=0x01;
    break;
  }

}
for ( var j = 0;j< melConst.length ;j++)
{
  if(longValue==melConst[j])
  {


    rtBool=02;
    break;
  }

}
for ( var j = 0;j< idaConst.length ;j++)
{
  if(longValue==idaConst[j])
  {


    rtBool=03;
    break;
  }

}

  return rtBool;
}


$scope.stringToByteArray=function(str) {
    var b = [], i, unicode;
    for(i = 0; i < str.length; i++) {
        unicode = str.charCodeAt(i);
        // 0x00000000 - 0x0000007f -> 0xxxxxxx
        if (unicode <= 0x7f) {
            b.push(String.fromCharCode(unicode));
        // 0x00000080 - 0x000007ff -> 110xxxxx 10xxxxxx
        } else if (unicode <= 0x7ff) {
            b.push(String.fromCharCode((unicode >> 6) | 0xc0));
            b.push(String.fromCharCode((unicode & 0x3F) | 0x80));
        // 0x00000800 - 0x0000ffff -> 1110xxxx 10xxxxxx 10xxxxxx
        } else if (unicode <= 0xffff) {
            b.push(String.fromCharCode((unicode >> 12) | 0xe0));
            b.push(String.fromCharCode(((unicode >> 6) & 0x3f) | 0x80));
            b.push(String.fromCharCode((unicode & 0x3f) | 0x80));
        // 0x00010000 - 0x001fffff -> 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        } else {
            b.push(String.fromCharCode((unicode >> 18) | 0xf0));
            b.push(String.fromCharCode(((unicode >> 12) & 0x3f) | 0x80));
            b.push(String.fromCharCode(((unicode >> 6) & 0x3f) | 0x80));
            b.push(String.fromCharCode((unicode & 0x3f) | 0x80));
        }
    }

    return b;
}


$scope.hexToByte = function(inpChar)
{

return h2d(inpChar);
}

$scope.hexToBytes=function(inpStrArr)
{

  //var rtStr=new Int8Array()
var bytes = new Uint8Array(inpStrArr.length/2);
j=0;
  for(var i=0; i< inpStrArr.length ; i +=2)
  {

    // rtStr.push(String.fromCharCode($scope.hexToByte(inpStrArr[i]) <<4| $scope.hexToByte(inpStrArr[i+1])));
     bytes[j++]=$scope.hexToByte(inpStrArr[i]) <<4| $scope.hexToByte(inpStrArr[i+1]);
  }

  return bytes;
}

$scope.getLengthVal=function(inp)
{
var retVal=0;
if(inp.length==1)
{
retVal=inp[0]
}
else
{
  for(var i=inp.length; i>=0  ; i--)
  {
    inp[i-1] =inp[i-1] & 0x7F;

  //retVal= retVal+ (inp[i] << (inp.length-i+1)*8 ) ;
    retVal= retVal+ (inp[i-1] << (inp.length-i)*7 );
  }
}

return retVal;
}
$scope.hexArrToString = function(hexArr)
{
  var hexStr="";
  for(var i=0; i< hexArr.length ; i++)
  {
    hexStr+=hexArr[i];
  }

  return hexStr;
}
$scope.ByteSubstr = function(byteArr,endlength)
{
  var rtbyte=[];
  for(var i=0; i<  byteArr.length  && i<=endlength ; i++)
  {
    rtbyte.push(byteArr[i]);

  }

  return rtbyte;
}
$scope.ByteSubstr1 = function(byteArr,start)
{
  var rtbyte=[];
  for(var i=start; i< byteArr.length ; i++)
  {
    rtbyte.push(byteArr[i]);
  }

  return rtbyte;
}
$scope.ByteSubstr2 = function(byteArr,start,endlength)
{
  var rtbyte=[];
  for(var i=start; i<  byteArr.length  && i<endlength ; i++)
  {
    rtbyte.push(byteArr[i]);

  }

  return rtbyte;
}

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
, "Xpath" :      "DF11"  
, "maxCol"  :      "DF12"  
, "col" :      "DF13"  
, "childs"  :      "E1"                          
  }

  return tagLib[tag]; 
 }

$scope.parseTVL = function(inpBytes)
{

  var parentJson=[];
  var s=0x80;
  var  classVal=0;
  var  primitiveOrConst=0;
  var tagLen=0;
  var tagByte=[];
  var highByte=0;
  var lowByte=0;
  var mode=["tag", "length", "value"];
  var modeCnt=0;
  var leadingOctet=1; //subsequent
  //.charCodeAt()
  var firstBit=0;
  var nextSubsequent=0
  var nextSubSeqByte=0;
  var lengthSize=0;
  var len=[];
  var lenByte=[];
  var dataByte=[];
  var data=[];
  var ascii=[];
  var lengthHeaderCnt=0;

  for (var i=0; i < inpBytes.length ; i++)
  {
     firstBit=0;
     highByte=0;
     lowByte=0;
     s=0x80;      
     nextSubSeqByte=0;

    //pre processing

     for (var b=8; b>0; b--)
     {
        if(inpBytes[i]&s)
        {
        if(b==8 )
        {

          
          firstBit=firstBit|s;
        }


         if(b==8 || b==7 || b == 6 || b == 5)
            {
             // if(inpBytes[i]&s)
              highByte=highByte|s;
            }
            if(b==4 || b==3 || b == 2 || b == 1)
            {
              //if(inpBytes[i]&s)
              lowByte=lowByte|s;
            }
             if(b==5||b==4 || b==3 || b == 2 || b == 1)
            {
              //if(inpBytes[i]&s)
              nextSubSeqByte=nextSubSeqByte|s;
            }

        if(modeCnt ==0)
        {
            if(leadingOctet==1)
            {

                if(b==8 || b==7)
                {

                  
                  classVal=classVal|s;
                }
                 if(b==6)
                {
                  //if(inpBytes[i]&s)
                  primitiveOrConst=primitiveOrConst|s;
                }
            }
           
           
        }
        else if (modeCnt == 1 )
      {
          if (leadingOctet == 1)
          { 

            if(firstBit == 1)
            {
              if(b==4 || b==3 || b == 2 || b == 1)
              {
                lengthSize=lengthSize|s;
              }
            }

          }

      }
      else if (modeCnt >= 2)
      {
        if(b==8 || b==7 || b == 6 || b == 5)
            {
             // if(inpBytes[i]&s)
              highByte=highByte|s;
            }
            if(b==4 || b==3 || b == 2 || b == 1)
            {
              //if(inpBytes[i]&s)
              lowByte=lowByte|s;
            }
      }
    }

        s=s>>1;
        
     }
     highByte=highByte>>4;
     firstBit=firstBit>>7;
    //decision processing  part
    
    if (modeCnt== 0 )
    {
      if (( leadingOctet == 1 && nextSubSeqByte == 0x1F )|| ( leadingOctet == 0 && firstBit ==1)  )
      {
        nextSubsequent=1;
      }
      else
      {
        nextSubsequent=0;
      }
/*
      if(firstBit ==1)
      {
        nextSubsequent=1;
      }
      */
    }
    else 
    if(modeCnt ==1) //length 
    {
        /*if(  leadingOctet == 1)
        {
          if(firstBit ==1 )
          {
            lengthHeaderCnt=1;


          }
          else
          {
            lengthHeaderCnt=0;
          }
          lengthSize= lengthSize+ lengthHeaderCnt;
        }
        if (lengthSize == 0)
        {
          nextSubsequent=0;
        }
        else
        {
          nextSubsequent=1;
        }
        */
         if(firstBit ==1 )
         {
          lengthSize+=1;
          nextSubsequent=1;
         }
         else
         {
          nextSubsequent=0;
         }

    }

    //Action Part
    if( leadingOctet ==1   ||nextSubsequent ==1)
    {
        if (modeCnt ==0)
        {
          tagByte.push($scope.intToHexChar(highByte));
          tagByte.push($scope.intToHexChar(lowByte));
       // nextSubsequent=1;
          tagLen++;
        }
        else if (modeCnt ==1)
        {
           len.push($scope.intToHexChar(highByte));
           len.push($scope.intToHexChar(lowByte));
           lenByte.push(highByte<<4|lowByte);
           lengthSize--;
           tagLen++;
        }
        else if (modeCnt >= 2)
        {
           data.push($scope.intToHexChar(highByte));
           data.push($scope.intToHexChar(lowByte));

          // ascii.push(String.fromCharCode(inpBytes[i])) ;
           dataByte.push(inpBytes[i]);
           tagLen++;
        }
    }

    if (modeCnt ==0 && nextSubsequent ==0 && leadingOctet ==0)
        {
          tagByte.push($scope.intToHexChar(highByte));
          tagByte.push($scope.intToHexChar(lowByte));
       // nextSubsequent=1;
          tagLen++;
        }

     if(( modeCnt == 1 && nextSubsequent == 0 ) && (leadingOctet !=1))
     {
          len.push($scope.intToHexChar(highByte));
           len.push($scope.intToHexChar(lowByte));
           lenByte.push(highByte<<4|lowByte);
           lengthSize--;
           tagLen++;
     }
  // post procesing   
     if(leadingOctet ==1 )
     {
      leadingOctet=0;
     }
     if(nextSubsequent ==0)
     {
        leadingOctet=1;
        modeCnt++;
        tagLen=0;
     }

   //console.log(mode[modeCnt]);


  }
 

     classVal= classVal>>6;
     primitiveOrConst=primitiveOrConst>>5;

     var parentObj      = [];
     var lenVal       =$scope.getLengthVal(lenByte);
     var dataHex       =  $scope.hexArrToString(data);
      var remData     = dataHex.substr(lenVal*2); 
      var value       = dataHex.substr(0,lenVal*2); 
      var valueByte   =$scope.ByteSubstr2(dataByte,0,lenVal);
      var remDataByte =$scope.ByteSubstr1(dataByte,lenVal);
      var tag         =$scope.hexArrToString(tagByte);
          ascii=$scope.bytesToAscii(valueByte) ;
     parentObj={    'class'             : classVal 
                    ,'primitiveOrConst' : primitiveOrConst
                    //,'tagByte'          : tagByte
                    ,'tag'              : tag
                     ,'lenVal'              : lenVal
                    ,'tagDescr'         :  $scope.getTagDescr(tag)
                    
                   // ,'len'              : len
                   // ,'lengthSize'              : lengthSize
                  //  ,'lenByte'          : lenByte 
                    ,'lenVal'           : lenVal
                   // ,'data'             : dataHex
                    //,'dataByte'         : dataByte
                  //  ,'remData'          : remData
                    ,'value'            : value
                    ,'ASCII'            : ascii //$scope.hexArrToString($scope.hexToBytes(dataHex))
                    //, 'valueByte'       : valueByte
                   // , 'remDataByte'     : remDataByte
                    ,'childs' : []
               };


  

  if(primitiveOrConst == 1)
  {
    //var childJson = 
      parentObj.childs=$scope.parseTVL(valueByte);
  }
   parentJson.push(parentObj);

if(remDataByte.length >0)
{
 if(remDataByte[0] == 0x90 && remDataByte[1] == 0x00 && remDataByte.length ==2 )
  {
    alert("No more ");
  }
  else
  {
    var childJsonS = $scope.parseTVL(remDataByte);
    for(var c=0; c< childJsonS.length ; c++)
     parentJson.push(childJsonS[c]);
  }

}

  return parentJson;
}
$scope.createTreeBody = function(parentObj)
{
  var bodyElement= document.createElement('div');
      bodyElement.className="bodyTreeClass";

  var dataElement= document.createElement('div');
      dataElement.className="elementClass";
      
var asciiElement= document.createElement('div');
      asciiElement.className="elementClass";

bodyElement.appendChild(dataElement);
bodyElement.appendChild(asciiElement);


   return   bodyElement;

}
$scope.bytesToAscii =function(inpBytes)
{
  var rtString= "";
  for (var i=0; i< inpBytes.length; i++)
  {
      rtString+= String.fromCharCode(inpBytes[i]);
  }

  return rtString;
}
$scope.createTreeHeader = function(parentObj)
{
  var headerElement             = document.createElement('div');
      headerElement.className   = "headerTreeClass";

  var dataElement               = document.createElement('div');
      dataElement.className     = "elementClass";
    
    var  fontawesome            = document.createElement('i');
         fontawesome.className   = "fa fa-clone";

    var TextNode                = document.createTextNode(parentObj.tag);
 
dataElement.appendChild(fontawesome);
dataElement.appendChild(TextNode);

headerElement.appendChild(dataElement);
headerElement.appendChild(asciiElement);


   return   headerElement;

}
$scope.treeView=function(parentJson)
{

  var parentElement= document.createElement('div');
      parentElement.className="parentClass";
  for(var i=0;i<parentJson.length ; i++)
  {
    var   parentObj=parentJson[i];

   $scope.createTreeHeader(parentObj);
   $scope.createTreeBody(parentObj);
  }
 return parentElement;
}
$scope.doTvl=function(val)
{
  var retVal=val;
  var inpStrArr=$scope.stringToByteArray(val);

  var respJson=[];
var j=0;

var pattern=/[0-9A-Fa-f]/i;



if( pattern.test(inpStrArr))
{

if(inpStrArr.length %2 == 0)
{
var inpBytes = $scope.hexToBytes(inpStrArr);

 respJson= $scope.parseTVL(inpBytes);

}

}
else
{

   for(var i=0; i<inpStrArr.length;)
  {



      if (inpStrArr[i].charCodeAt()== 0xE0)
      {
      var elmJson =[];
       var mei     =$scope.isMei(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var uyir    =$scope.isUyir(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var meiType =$scope.getMeiType(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var Nedil   =$scope.isNedil(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var symbol   =$scope.isSymbol(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);

       elmJson.push({'mei'     : mei });
       elmJson.push({'uyir'    : uyir });
       elmJson.push({'meiType' : meiType });
       elmJson.push({'symbol'  : symbol });
       elmJson.push({'Nedil'   : Nedil });
       elmJson.push({'h1'      : d2h(inpStrArr[i].charCodeAt()) });
       elmJson.push({'h2'      : d2h(inpStrArr[i+1].charCodeAt())  });
       elmJson.push({'h3'      : d2h(inpStrArr[i+2].charCodeAt()) });
       respJson.push({'ezuthu' : elmJson});
       i+=3;
     }
     else
     {
      i++;
     }
  }

}
  
 




document.getElementById('json').value= JSON.stringify(respJson);

  return retVal ;

}

$scope.compile=function()
{
//alert("compile" + editor);
var ed=document.getElementById('editor').innerText;

var compileValue=$scope.doCompile(ed);


document.getElementById('pad').value=compileValue;






}
$scope.doCompile=function(val)
{
  var retVal=val;
  var inpStrArr=$scope.stringToByteArray(val);

  var respJson=[];
var j=0;


  if( inpStrArr.length >3)
  for(var i=0; i<inpStrArr.length;)
  {



      if (inpStrArr[i].charCodeAt()== 0xE0)
      {
      var elmJson =[];
       var mei     =$scope.isMei(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var uyir    =$scope.isUyir(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var meiType =$scope.getMeiType(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var Nedil   =$scope.isNedil(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);
       var symbol   =$scope.isSymbol(inpStrArr[i],inpStrArr[i+1],inpStrArr[i+2]);

       elmJson.push({'mei'     : mei });
       elmJson.push({'uyir'    : uyir });
       elmJson.push({'meiType' : meiType });
       elmJson.push({'symbol'  : symbol });
       elmJson.push({'Nedil'   : Nedil });
       elmJson.push({'h1'      : d2h(inpStrArr[i].charCodeAt()) });
       elmJson.push({'h2'      : d2h(inpStrArr[i+1].charCodeAt())  });
       elmJson.push({'h3'      : d2h(inpStrArr[i+2].charCodeAt()) });
       respJson.push({'ezuthu' : elmJson});
       i+=3;
     }
     else
     {
      i++;
     }
  }




document.getElementById('json').value= JSON.stringify(respJson);

  return retVal ;

}

$scope.compile=function()
{
//alert("compile" + editor);
var ed=document.getElementById('editor').innerText;

var compileValue=$scope.doCompile(ed);


document.getElementById('pad').value=compileValue;






}

$scope.tvlToSchema=function()
{

  //alert("Alert");

  var jsonObj=eval(document.getElementById('json').value);

  //alert(jsonObj);
 var compileValue=$scope.pareseTvlToSchema(jsonObj);

//document.getElementById('schemaJson').value=JSON.stringify(compileValue) ;
console.log(compileValue);
document.getElementById('schemaJson').value=JSON.stringify(compileValue[0].childs);
}

$scope.pareseTvlToSchema=function(jsonObj)
{
  var schemaJson = [];
  var  j=0;
  var NeedEmptyChilds=true;
 // alert(jsonObj.length);
var tempJsonstr= '[{';
  for(var i=0; i<jsonObj.length ; i++)
  {
    //  alert("1");
      //jsonObj[i]["tag"]);

        var tag= jsonObj[i]["tag"];
        var valueKey=$scope.getDataType(tag);
        var value= jsonObj[i]["value"];
        var key =jsonObj[i]["tagDescr"];
        var childs =jsonObj[i]["childs"];
        var ascii =jsonObj[i]["ASCII"];


        if( valueKey.toUpperCase() == "ASCII")
        {
          value=ascii;
        }

      if(tag =="e1" ||tag =="E1" )
      {
        NeedEmptyChilds=false;
       var childJson= $scope.pareseTvlToSchema(childs);
       // key = "childs";
         //schemaJson.push({'childs':childJson});
          if( j==0 )
        {
         tempJsonstr+= ' "' + key +'" : ' +  JSON.stringify(childJson)+ '';
       }
       else
       {
          tempJsonstr+= ', "' + key +'" : ' +  JSON.stringify(childJson)+ '';
     
       }
       j++;
       //schemaJson["childs"]=$scope.pareseTvlToSchema(childs);
      }
      else 
      {

       //alert( key +" " +value);
        if( j==0 )
        {
          tempJsonstr+= ' "' + key +'" : "' +  value+ '"';
        }
        else
        {
          tempJsonstr+= ', "'+ key +'" : "' +  value+ '"';
        }
        j++;

      }
  }
if(NeedEmptyChilds == true)
{
  if( j==0 )
  {
    tempJsonstr+=  " 'childs':[]";
  }
  else
  {
    tempJsonstr+= ", 'childs':[]";
  }

}

tempJsonstr+= "}]";
var tempJson= eval(tempJsonstr);

        schemaJson.push(tempJson[0]);
  return schemaJson;
}


$scope.TVL=function()
{
//alert("compile" + editor);
var ed=document.getElementById('editor').innerText;

var compileValue=$scope.doTvl(ed);

document.getElementById('pad').value=compileValue;

}

$scope.stringToHexStr=function(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}


$scope.schemaToTvl=function()
{

 var schemaJsonStr=  document.getElementById('schemaJson').value; 
 var schemaJson = eval(schemaJsonStr);
  document.getElementById('pad').value = $scope.encodeSchemaToTvl(schemaJson);
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

$scope.keyBoard=function()
{

//alert("keyBoard:01");
      //var keys="`1234567890-=|QWERTYUIOP[]\|ASDFGHJKL;'|ZXCVBNM,./";
    //var keys="QWERTYUIOP|ASDFGJKL|XCVBNM";
      var keys="1234567890-=|qwertyuiop|asdfgjkl;|xcvbnm|QWERTYUIOP|ASDFGJKL|XCVBNM";
      var keyRows=keys.split('|');
      var keyChars="";
      var keyBoardStr=st;
      //alert("call offsetReplace");

      //alert("keyBoard:keyRows.length="+keyRows.length);
      for (var i=0;i<keyRows.length;i++)
      {
            //alert(" keyRows ");
            keyBoardStr=keyBoardStr+sr;
            //alert(" keyRows["+i+"]"+ keyRows[i]);
            keyChars=keyRows[i].split('');

            for(var j=0;j<keyChars.length;j++)
            {
                  // alert(" keyChars["+j+"]"+keyChars[j]);
                  //    alert(" keyRows ");
                  keyBoardStr=keyBoardStr+sc;
                  //keyBoardStr=keyBoardStr+ chaArrId[offsetReplace(keyChars[j])] + "<input type='button' class=''id='"+chaArrId[offsetReplace(keyChars[j])]+"' value='"+ change(offsetReplace(keyChars[j]))+"'   onclick='fnClick(this);'onfocus='fnFocus(this);'>"; keyBoardStr=keyBoardStr+ed;
                  keyBoardStr=keyBoardStr+  "<input type='button' class=''id='"+chaArrId[offsetReplace(keyChars[j])]+"' value='"+ change(offsetReplace(keyChars[j]))+"'   onclick='fnClick(this);'onfocus='fnFocus(this);'>"; keyBoardStr=keyBoardStr+ed;
               document.getElementById('test').innerHTML=keyBoardStr;
             }
            keyBoardStr=keyBoardStr+er;
            //keyBoardStr=keyBoardStr+er;
      }

      keyBoardStr=keyBoardStr+et;
      document.forms[0].scrCode.value=keyBoardStr;
      //alert(keyBoardStr);
  
      document.getElementById('test').innerHTML=keyBoardStr;
      //test.innerHTML="test";

      };





 rollOver=function(element) {
  //change the colour
        element.className += (element.className?' ':'') + 'CSStoHighlight';
  //change display of child
  for( var x = 0; element.childNodes[x]; x++ ){
    if( element.childNodes[x].tagName == 'UL' ) {
element.childNodes[x].className += (element.childNodes[x].className?' ':'')
+ 'CSStoShow'; }
    if( element.childNodes[x].tagName == 'A' ) {
element.childNodes[x].className += (element.childNodes[x].className?' ':'')
+ 'CSStoHighLink'; }
  }
}

 rollOff=function(element) {
  //change the colour
  element.className = element.className.replace(/ ?CSStoHighlight$/,'');
  //change display of child
  //alert('am calling');
  for( var x = 0; element.childNodes[x]; x++ ){
    if( element.childNodes[x].tagName == 'UL' ) {
element.childNodes[x].className = element.childNodes[x].className.replace(/ ?CSStoShow$/,''); }
    if( element.childNodes[x].tagName == 'A' ) {
element.childNodes[x].className = element.childNodes[x].className.replace(/ ?CSStoHighLink$/,''); }
  }
}


 fnClick=function(obj)
 {
 //alert("fnChange"+obj.value);
 //baseReplace(obj.value);
 //alert("fnClick" +obj.value);
//document.getElementById("pad").value=document.getElementById("pad").value+obj.value;


document.execCommand('insertText',true,document.getElementById("pad").value+obj.value);
//alert(document.getElementById("pad").value);
 }
var keyCombSets="";

 OnPress=function()
{
      var keycode=event.keyCode?event.keyCode : event.charCode;
      var charcode="";
      keyCombSets= event.keyCode;
      try
      {
      charcode=String.fromCharCode(keycode);
      }
      catch(e)
      {
      window.status= "OnDowb :"+e;
      }
      //alert("OnPress:key code:"+keycode+"|charcode:"+charcode);
      window.status="OnPress";
      try
      {
      window.status=" click id <"+chaArrId[offsetReplace(charcode)]+">";
      document.getElementById(chaArrId[offsetReplace(charcode)]).onclick(); 
      document.getElementById(chaArrId[offsetReplace(charcode)]).focus();
      document.getElementById(chaArrId[offsetReplace(charcode)]).className="button";
      }
      catch(e)
      {
      window.status="Please Key Board enable";
      }
      //event.keyCode=113;
}
 OnDown=function()
{
var keycode=event.keyCode?event.keyCode : event.charCode;
var charcode="";
keyCombSets+= event.keyCode;
try
{
charcode=String.fromCharCode(keycode);
}
catch(e)
{
window.status= "OnDowb :"+e;
}
//alert("OnDown:key code:"+keycode+"|charcode:"+charcode);
window.status="OnDown|"+keycode;

}
 OnUp=function()
{
      var keycode=event.keyCode?event.keyCode : event.charCode;
      var charcode="";
      keyCombSets+= event.keyCode;
      try
      {
            charcode=String.fromCharCode(keycode);
      }
      catch(e)
      {
            window.status= "OnDowb :"+e;
      }
      //alert("OnUp:key code:"+keycode+"charcode:"+charcode);
      //window.status="OnUp";
}


 convUniCode=function(code)
{
//alert("code ="+code);
      //code=parseInt(code)+2944;
      if(parseInt(document.getElementById('lang').value) >0 )
      {
      code=parseInt(code)+ parseInt(document.getElementById('lang').value);
//alert("code ="+code);
      var icode=code;
      code=d2h(code);
      code=code.toUpperCase();
      var ucode='"\\u0' + code+'"';
//alert(" uni code ="+ucode);
      if((icode >  1 ) && (icode < 10000))
      {
            //alert("Code=" + code +" hexa Decimal="+d2h(code).toUpperCase()); 
            //setValeById("uniCode",eval(ucode)); 
            return eval(ucode); //alert(eval(ucode));
      }
      else
      {
            alert("unicode out of the limite ");
      }
      }
      return code;
}
 change=function(inp)
{
//alert("change:"+inp);

var offArry=offsetArry[inp];
var out=offArry.split('|');
var i=0;
var rtStr="";
for(var i=0;i <out.length;i++)
{
      //rtStr=rtStr+"$" + out[i]+"="+convUniCode(parseInt(out[i]));
      //rtStr=rtStr+"$" + out[i]+"="+convUniCode(parseInt(out[i]));
      if(parseInt(document.forms[0].lang.value) >0 )
      {
      rtStr=rtStr+convUniCode(parseInt(out[i]));
      }
      else
      {
            rtStr=chaArr[inp];
      }
}


return rtStr;
}
function d2h(d) {return d.toString(16);}
function h2d(h) {return parseInt(h,16);}



 offsetReplaceComb=function()
{
      var ofsetCombo= 'Letter';
      //alert(" offsetReplace:A");
      ofsetCombo=ofsetCombo+'</td>';
      ofsetCombo=ofsetCombo+'<td class="ctext">';
      ofsetCombo=ofsetCombo+'<select name= "rName" id="rName" onchange="javascript:rNo.value=rName.value; val1();">';
      for(lv_i=0;lv_i<chaArr.length;lv_i++)
      ofsetCombo=ofsetCombo+'<option value='+ lv_i+'>'+chaArr[lv_i]+'</option>'; ofsetCombo=ofsetCombo+'</select>';
      ofsetCombo=ofsetCombo+'</td>';
//    alert(" offsetReplace:B");
      ofsetCombo=ofsetCombo+'<td class="ctext">';
      ofsetCombo=ofsetCombo+'offset';
      ofsetCombo=ofsetCombo+'</td>';
      ofsetCombo=ofsetCombo+'<td class="ctext">';
      ofsetCombo=ofsetCombo+'<select name= "rNo" id="rNo"onchange="javascript:rName.value=rNo.value; val1();" >'; for(lv_i=0;lv_i<chaArr.length;lv_i++)
      ofsetCombo=ofsetCombo+'<option value='+lv_i+'>'+offsetArry[lv_i]+'' + lv_i+'</option>'; ofsetCombo=ofsetCombo+'</select>';
      ofsetCombo=ofsetCombo+'</td>';
      //alert(" offsetReplace:C");
      test.innerHTML=ofsetCombo;

  return  0;
}


 offsetReplace=function(inp)
{

      //alert(" inp"+inp);
      for(var i=0;i<chaArr.length;i++)
      {

            if(chaArr[i]==inp)
            {
                 // alert('count:'+ i+':cahr:'+chaArr[i]+':baseArrySplt:'+offsetArry[i]);
                   return i;
            }
      }
  return 1;
}







var readFileIntoDataUrl = function (fileInfo) {
    var loader = $.Deferred(),
      fReader = new FileReader();
    fReader.onload = function (e) {
      loader.resolve(e.target.result);
    };
    fReader.onerror = loader.reject;
    fReader.onprogress = loader.notify;
    fReader.readAsDataURL(fileInfo);
    return loader.promise();
  };
  $.fn.cleanHtml = function () {
    var html = $(this).html();
    return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
  };
  $.fn.heaerieDocs = function (userOptions) {
    var editor = this,
      selectedRange,
      options,
      toolbarBtnSelector,
      updateToolbar = function () {
        if (options.activeToolbarClass) {
          $(options.toolbarSelector).find(toolbarBtnSelector).each(function () { 

           // console.log('in  options.commandRole:' );
           // console.log(options.commandRole );
           // console.log('command:');
           // console.log(command );
            var command = $(this).data(options.commandRole);
            if (document.queryCommandState(command)) {
              $(this).addClass(options.activeToolbarClass);
            } else {
              $(this).removeClass(options.activeToolbarClass);
            }
          });
        }
      },
      execCommand = function (commandWithArgs, valueArg) {
        var commandArr = commandWithArgs.split(' '),
          command = commandArr.shift(),
          args = commandArr.join(' ') + (valueArg || '');
        document.execCommand(command, 0, args);
        updateToolbar();
      },
      bindHotkeys = function (hotKeys) {

        $.each(hotKeys, function (hotkey, command) 
        {
          
          editor.keydown(hotkey, function (e) 
          {
            if (editor.attr('contenteditable') && editor.is(':visible')) {
             
              if(command == "doMapForM")
              {

                if (  e.shiftKey == true )
                {
                  document.execCommand('insertText',true,change(offsetReplace(String.fromCharCode(e.keyCode ))));
                }
                else
                {
                  document.execCommand('insertText',true,change(offsetReplace(String.fromCharCode(e.keyCode +32 ))));
               
                }
                e.preventDefault();
                e.stopPropagation();
              }
              else
              {
                e.preventDefault();
                e.stopPropagation();
                execCommand(command);
              }

            }
          }).keyup(hotkey, function (e) {
            if (editor.attr('contenteditable') && editor.is(':visible')) {
              e.preventDefault();
              e.stopPropagation();
            }
          });
        });
      },
      getCurrentRange = function () {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {

         // console.log('getCurrentRange:');
          //console.log(sel.getRangeAt(0));
          return sel.getRangeAt(0);
        }
      },
      saveSelection = function () {
        selectedRange = getCurrentRange();
      },
      restoreSelection = function () {
        var selection = window.getSelection();
        if (selectedRange) {
          try {
            selection.removeAllRanges();
          } catch (ex) {
            document.body.createTextRange().select();
            document.selection.empty();
          }

          selection.addRange(selectedRange);
        }
      },
      insertFiles = function (files) {
        editor.focus();
        $.each(files, function (idx, fileInfo) {
          if (/^image\//.test(fileInfo.type)) {
            $.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
              execCommand('insertimage', dataUrl);
            }).fail(function (e) {
              options.fileUploadError("file-reader", e);
            });
          } else {
            options.fileUploadError("unsupported-file-type", fileInfo.type);
          }
        });
      },
      markSelection = function (input, color) {
        restoreSelection();
        if (document.queryCommandSupported('hiliteColor')) {
          document.execCommand('hiliteColor', 0, color || 'transparent');
        }
        saveSelection();
        input.data(options.selectionMarker, color);
      },
      bindToolbar = function (toolbar, options) {
        toolbar.find(toolbarBtnSelector).click(function () {
          restoreSelection();
          editor.focus();
          execCommand($(this).data(options.commandRole));
          saveSelection();
        });
        toolbar.find('[data-toggle=dropdown]').click(restoreSelection);

        toolbar.find('input[type=text][data-' + options.commandRole + ']').on('webkitspeechchange change', function () {
          var newValue = this.value; /* ugly but prevents fake double-calls due to selection restoration */
          this.value = '';
          restoreSelection();
          if (newValue) {
            editor.focus();
            execCommand($(this).data(options.commandRole), newValue);
          }
          saveSelection();
        }).on('focus', function () {
          var input = $(this);
          if (!input.data(options.selectionMarker)) {
            markSelection(input, options.selectionColor);
            input.focus();
          }
        }).on('blur', function () {
          var input = $(this);
          if (input.data(options.selectionMarker)) {
            markSelection(input, false);
          }
        });
        toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
          restoreSelection();
          if (this.type === 'file' && this.files && this.files.length > 0) {
            insertFiles(this.files);
          }
          saveSelection();
          this.value = '';
        });
      },
      initFileDrops = function () {
        editor.on('dragenter dragover', false)
          .on('drop', function (e) {
            var dataTransfer = e.originalEvent.dataTransfer;
            e.stopPropagation();
            e.preventDefault();
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
              insertFiles(dataTransfer.files);
            }
          });
      };
    options = $.extend({}, $.fn.heaerieDocs.defaults, userOptions);
    toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';
    bindHotkeys(options.hotKeys);
    if (options.dragAndDropImages) {
      initFileDrops();
    }
    bindToolbar($(options.toolbarSelector), options);
    editor.attr('contenteditable', true)
      .on('mouseup keyup mouseout', function () {
        saveSelection();
        updateToolbar();
      });
    $(window).bind('touchend', function (e) {
      var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
        currentRange = getCurrentRange(),
        clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
      if (!clear || isInside) {
        saveSelection();
        updateToolbar();
      }
    });
    return this;
  };
  $.fn.heaerieDocs.defaults = {
    hotKeys: {
      'ctrl+b meta+b': 'bold',
      'ctrl+i meta+i': 'italic',
      'ctrl+u meta+u': 'underline',
      'ctrl+z meta+z': 'undo',
      'ctrl+y meta+y meta+shift+z': 'redo',
      'ctrl+l meta+l': 'justifyleft',
      'ctrl+r meta+r': 'justifyright',
      'ctrl+e meta+e': 'justifycenter',
      'ctrl+j meta+j': 'justifyfull',
      'shift+tab': 'outdent', 
      'a b c d e f g h i j k l m n o p q r s t u v w x y z ': 'doMapForM',
      'shift+a shift+b shift+c shift+d shift+e shift+f shift+g shift+h shift+i shift+j shift+k shift+l shift+m shift+n shift+o shift+p shift+q shift+r shift+s shift+t shift+u shift+v shift+w shift+x shift+y shift+z': 'doMapForM',
      'tab': 'indent'
    },
    toolbarSelector: '[data-role=editor-toolbar]',
    commandRole: 'edit',
    activeToolbarClass: 'btn-info',
    selectionMarker: 'edit-focus-marker',
    selectionColor: 'darkgrey',
    dragAndDropImages: true,
    fileUploadError: function (reason, detail) { console.log("File upload error", reason, detail); }
  };
  
$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};



  $scope.initToolbarBootstrapBindings = function() {
      var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
      $.each(fonts, function (idx, fontName) {
          fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
      });
      $('a[title]').tooltip({container:'body'});
      $('.dropdown-menu input').click(function() {return false;})
        .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});

      $('[data-role=magic-overlay]').each(function () { 
        var overlay = $(this), target = $(overlay.data('target')); 
        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
      });
      if ("onwebkitspeechchange"  in document.createElement("input")) {
        var editorOffset = $('#editor').offset();
        $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
      } else {
        $('#voiceBtn').hide();
      }
  };
 $scope.showErrorAlert= function  (reason, detail) {
    var msg='';
    if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
    else {
      console.log("error uploading file", reason, detail);
    }
    $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
     '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
  };



    
  


$scope.$watch('$viewContentLoaded', function(){
    $('#editor').heaerieDocs({ fileUploadError: $scope.showErrorAlert} );
    window.prettyPrint && prettyPrint();
    
   $scope.initToolbarBootstrapBindings();
  });




 $scope.$on('$viewChangeSuccess', function(){
    //Here your view content is fully loaded !!
   // alert('on viewContentLoaded');
    //$scope.getUserDetail();
  });

USSDoc_=function()
{

this.group      = 'USS', /*it has been chabged by durai on 02-Feb-2010*/
this.name       = '',
this.label      = '',
this.task       = 'NONE',
this.title       = 'NONE',
this.documentText       = 'NONE',
this.documentHTML       = '<div>this is test</div>',
this.desc       = '',
this.htmlType   = 'text', /* newly introduced in USS05*/
this.entitle    = 'READONLY'; // Editable /Readonly
this.enttlname  = ''; //Entitle name to db
this.mndf       = 'N',
this.dataType   = 'VARCHAR',  // NUMBER/VARCHAR/DATE/EMAIL/AMOUNT/LIST/DIV/
this.cclass     = 'ctable',   //
this.parent     = '',
this.parentHtmlType     = '',
this.validate   = '',
this.dflt       = '',
this.min        = '0',
this.max        = '60',
this.tips       = '',
this.onkeyup    = 'onKeyUp(this);',
this.onchange   = 'onChange(this);',
this.onkeydown  = 'onKeyDown(this);',
this.onkeypress = 'onKeyPress(this);',
this.onclick    = 'onClick(this);',
this.onblure    = 'onBlure(this);',
this.listVal    = '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
this.help       = 'N',
this.helpLink   = 'helpload',
this.xml        = 'Y',
this.xmlname    = '',
this.Xpath      = '/' ,
this.maxCol     = '1',
this.col        = '0'
  
}

$scope.createTreeNode= function(treeNode)
{

  

}


   $scope.createTreeHeader=function(fieldObj)
  {
      this.elm= document.createElement("div");
      this.elm.appendChild(document.createTextNode(fieldObj.title));
      return this.elm;
  }
   $scope.createTreeBody=function(fieldObj)
  {
    this.elm= document.createElement("div");
      this.elm.appendChild(document.createTextNode(fieldObj.documentText));
      var ed=document.getElementById('editor').innerHTML;
      //var editor=document.getElementById("editor");
    //   alert(ed);

       document.getElementById('editor').innerHTML=fieldObj.documentHTML;
      return this.elm;

  }

   

   $scope.viewDoc=function()
   {
     var docObj=new USSDoc_()
     docObj.documentHTML=document.getElementById('editor').innerHTML;
     docObj.documentText=document.getElementById('editor').innerText;

   $scope.createTreeBody(docObj);
   }





      // alert("basicDetService");
	
		$scope.basicDetEditSave=function()
    	{


       // console.log($scope);

    			
    		alert('basicDetEditSave :name =' + $scope.name);

        keyBoardService.save({     "grantType"     : "password" 
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


          //basicDetService.save()
    		

    		//alert("I am in uss_submit");
    	};
    
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
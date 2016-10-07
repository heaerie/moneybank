/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([

    './controllers/index'
    ,'./services/index'
   /* ,'./directives/index'
      ,'./filters/index'
      
    */

], function (controllers,services) {
    'use strict';

console.log('controllers in app');
console.log(controllers);

//console.log('ufi in app');
//console.log(ufi);

    var webApp= angular.module('app', [
         'controllers'
        ,'ngRoute'
        ,'toaster' 
        ,'services'
        ,'ui.router'
        ,'ngAnimate'
        //,'$http'
      //  , 'require'
        //,'ufi'
        //,''
        /*,'app.directives'
        ,'app.filters'
        ,'app.services'
        */
    ]);

    webApp.provider('heaerieUssService', function heaerieUssServiceProvider() {
  var GenHtmlTemplateFromSJson = false;



  this.GenHtmlTemplateFromSJson = function(jsonSchema,value,mode) {
   // alert("test" + value);
   var USS=require("ufi.core").USS;
   var ufiframegen=require("ufi.frameGen");
   var ufivalidate=require("ufi.validate");
   var $=require("jquery");


   var us= new ufiframegen.FG();
   //var val= new ufivalidate.VAL();
/*

   $http({
  method: 'GET',
  url: '/someUrl'
}).then(function successCallback(response) {
    
      alert('success');
  }, function errorCallback(response) {

     alert('failure');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
*/

var schemaJson=eval('[{"group":"USS","name":"basicDet","label":"Basic Details","task":"EA","desc":"","htmlType":"PAGE","entitle":"NONREADONLY", maxCol:2, col: 1,"enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"name","label":"Name ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"name1","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"bodyType","label":"Body Type","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"complexion","label":"complexion","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"age","label":"Age ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"NUMBER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"dob","label":"Date of Birth","task":"NONE","desc":"","htmlType":"DATE","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DATE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"DD/MM/YYYY or DD/MON/YYYY","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"phyStaus","label":"Physical Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"height","label":"Height ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"weight ","label":"Weight ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"motherTongue","label":"Mother Tongue ","task":"NONE","desc":"","htmlType":"DIV","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DIV","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"maritalStaus","label":"Marital Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|U|Unmarried|NM|Never married","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"eatingHabits","label":"Eating Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NV|Non Vegetarian|V|Vegetarian","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"drinkingHabits","label":"Drinking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|ND|Non-drinker|D|Drinker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"smokingHabits","label":"Smoking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NS|Non-smoker|S|Smoker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');

 /* 
 $.post("/jsonSchema/"+jsonSchema+".sjson", {suggest: 'txt'}, function(result){
        
         //
         schemaJson=result;

    });
*/

if (jsonSchema=="signatureVerify")
{
schemaJson=eval('[{"group":"USS","name":"signatureVerify","label":"signatureVerify","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"tirack","label":"TIRACK","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"sender","label":"Sender","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"receiver","label":"Receiver","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"amount","label":"Amount","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"currency","label":"Currency","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"intermediateBic","label":"Intermediate Bic","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');
}
else if(jsonSchema=="msgContentPrev")
{
 schemaJson=eval('[{"group":"USS","name":"msgContentPrev","label":"Message Content Preview","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"messageText","label":"Message Content","task":"NONE","desc":"","htmlType":"LOB","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"TEXTAREA","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"tirack","label":"TIRACK","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"signature","label":"Signature","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');
}
else if(jsonSchema=="sendMessage")
{
 schemaJson=eval('[{"group":"USS","name":"sendMessage","label":"Send Message","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"UploadFile","label":"Upload File","task":"NONE","desc":"","htmlType":"FILE","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"FILE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');
}
      

    


   // alert(GenHtmlTemplateFromSJson);

   var usResource= eval(    "[{" +us.frameGenerationResoure(schemaJson[0].childs,
  schemaJson[0]
)  +"}]" );


var  usListVal=eval("[{"+us.frameGenerationListVal(schemaJson[0].childs,
    schemaJson[0]
)  + "}]"); 



var OutJson=    eval( "[{" +us.frameGenerationJson(schemaJson[0].childs,
  schemaJson[0]
) +"}]");

var func=value;
//alert(func);
var inpUsListVal  = eval("usListVal[0]."+ schemaJson[0].name) ;
var inpUsResource = eval("usResource[0]."+ schemaJson[0].name) ;
var inpOutJson    = eval("OutJson[0]."+ schemaJson[0].name) ;
var ussScript=us.frameGeneration(inpUsListVal
                                              ,inpUsResource
                                              ,inpOutJson 
                                              ,schemaJson[0].childs
                                              ,schemaJson[0]
                                              ,0
                                              ,func
                                              ,0
                                              ,mode
                                          );


  ussScript+="return USSContainer0";
    console.log('-------------ussScript------------');
    console.log(ussScript);

   // try
    {
      var dynFGCall=(new Function("return function(us) {" + ussScript + "};"))();
   
      var appendObj=dynFGCall(us);

       console.log('appendObj.innerHTML');
      console.log(appendObj.innerHTML);

      //return "<div> thsis dashboard from heaerieUssServiceProvider </div>";
      return  "<div class='pageLayout'> <div class='bcontainer'>"+appendObj.innerHTML + "</div></div>";
     
    }
  /*  catch(e)
    {
      alert('Core App:' + e);
    }
*/
  };

  this.$get = ["apiToken", function heaerieUssServiceFactory(apiToken) {

    // let's assume that the heaerieUssService constructor was also changed to
    // accept and use the GenHtmlTemplateFromSJson argument
    return new heaerieUssService(apiToken, GenHtmlTemplateFromSJson);
  }];
});

/*
webApp.config(["heaerieUssServiceProvider", function(heaerieUssServiceProvider) {
  heaerieUssServiceProvider.GenHtmlTemplateFromSJson(true);
  console.log('heaerieUssServiceProvider.GenHtmlTemplateFromSJson');
  console.log(heaerieUssServiceProvider.GenHtmlTemplateFromSJson);
}]);

*/
     webApp.config(['$routeProvider', '$locationProvider', '$httpProvider' ,'$stateProvider','$urlRouterProvider','heaerieUssServiceProvider','$injector'
          ,function  ($routeProvider,$locationProvider,$httpProvider,$stateProvider,$urlRouterProvider ,heaerieUssServiceProvider,$injector
            ) {
        // body...
        console.log('$stateProvider');
        console.log($stateProvider);
        console.log($urlRouterProvider);
       // console.log(ussService);


      

      

       //alert(heaerieUssServiceProvider.GenHtmlTemplateFromSJson('Y'));
          $stateProvider.state('login', 
        {
            url         : '/www/'
           ,views:{

             'pageMainContext' :
              {                
               
                templateUrl : 'js/lib/views/loginView.html'
                ,controller :  'naviController'
               // templateUrl : 'view/loginView.html'
              }
            }
        });

          $stateProvider.state('dashboard', 
        {
            url         : '/dashboard/'
           ,views:{
              'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@dashboard' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL") //EIDT and ADD
                //template : 'this is test'
                templateUrl : 'js/lib/views/dashboardView.html'

               ,controller :  'dashboardController'
              }

             
            }
        });




         $stateProvider.state('SchemaGenerator', 
        {
            url         : '/SchemaGenerator/'
           ,views:{
              'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@SchemaGenerator' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL") //EIDT and ADD
                //template : 'this is test'
                templateUrl : 'js/lib/views/SchemaGenerator.html'

               ,controller :  'SchemaGeneratorController'
              }

             
            }
        });

//basicDet/USSAdd

 $stateProvider.state('basicDetUSSAdd', 
        {
            url         : '/basicDetUSSAdd/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSAdd' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y' ,'ADD')
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
            ,params: {
    $basicDet: { }
            }

        });


//basicDetUSSSave


$stateProvider.state('SchemaGeneratorView', 
        {
            url         : '/SchemaGeneratorView/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
               
              }
              ,

              'pageSubContext@SchemaGeneratorView' :
              {                
               
                templateUrl : 'js/lib/views/SchemaGeneratorView.html'
                ,controller :  'SchemaGeneratorController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
        });
$stateProvider.state('SchemaGenerator', 
        {
            url         : '/SchemaGenerator/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
               
              }
              ,

              'pageSubContext@SchemaGenerator' :
              {                
               
                templateUrl : 'js/lib/views/SchemaGenerator.html'
                ,controller :  'SchemaGeneratorController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }

            }
          }
              );
$stateProvider.state('KeyBoard', 
        {
            url         : '/KeyBoard/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
               
              }
              ,

              'pageSubContext@KeyBoard' :
              {                
               
                templateUrl : 'js/lib/views/keyBoard.html'
                ,controller :  'keyBoardController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
        });


$stateProvider.state('basicDetUSSSave', 
        {
            url         : '/basicDetUSSSave/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSSave' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y' ,'SAVE')
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
             ,params: {
    $basicDet: { }
            }
        });

  $stateProvider.state('basicDetUSSNew', 
        {
            url         : '/basicDetUSSNew/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSNew' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y' ,'NEW')
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
             ,params: {
    $basicDet: { }
            }
        });

  $stateProvider.state('basicDetUSSView', 
        {
            url         : '/basicDetUSSView/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSView' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL")
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
             ,params: {
    $basicDet: { }
            }
        });



$stateProvider.state('sendMessage', 
        {
            url         : '/sendMessage/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@sendMessage' :
              {                
               
                  // template: '<div class="row tableRow" style="margin-left: 0px;margin-right: 0px;" tabindex="-1"><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="sendMessageErrorBox"></div><input type="hidden" name="sendMessage" class="clabel" xml="Y" mndf="N" datatype="PAGE" htmltype="PAGE" id="sendMessage" maxlength="60" min="0" value="" maxcol="1" col="0" dflt="" errorbox="sendMessageErrorBox" label="" title="" xpath="$sendMessage" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="ES" parent="/" xmlname="sendMessage" container="Y" readonly="true"><span></span><script></script></div></div><div id="" class="bcontainer" tabindex="-1"><div id="" class="bheader" tabindex="-1"><a>Send Message</a></div><div id="" class="bsession" tabindex="-1"><div class="row tableRow" style="margin-left: 0px;margin-right: 0px;" tabindex="-1"><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="sendMessage1"></label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="sendMessage1ErrorBox"></div><input type="hidden" name="sendMessage1" class="clabel" xml="Y" mndf="N" datatype="CONTAINER" htmltype="CONTAINER" id="sendMessage1" maxlength="60" min="0" value="" maxcol="1" col="0" dflt="" errorbox="sendMessage1ErrorBox" label="" title="" xpath="$sendMessage.sendMessage1" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="sendMessage" xmlname="sendMessage1" container="Y" readonly="true"><span></span><script></script></div><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="uploadMessage">Upload Message</label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="uploadMessageErrorBox"></div><input type="File" name="USS_uploadMessage" class="clabel" xml="Y" mndf="N" datatype="VARCHAR" htmltype="TEXT" id="uploadMessage" ng-model="$sendMessage1.uploadMessage" maxlength="60" min="0" value="" maxcol="1" col="0" dflt="" errorbox="uploadMessageErrorBox" label="Upload Message" title="" xpath="$sendMessage.sendMessage1.uploadMessage" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="sendMessage1" xmlname="uploadMessage" container="N" readonly="true"><span></span><script></script></div> <input type="submit" ng-click="uploadFile()"></div></div></div>'
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('sendMessage','N',"SUBMIT")
               ,controller :  'sendMessageController'
              }
            }
            ,params: {
    $basicDet: { }
            }
        });

$stateProvider.state('msgContentPrev', 
        {
            url         : '/msgContentPrev/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@msgContentPrev' :
              {                
               
                   template: heaerieUssServiceProvider.GenHtmlTemplateFromSJson('msgContentPrev','Y' ,'BACK')   

                    ,controller :  'msgContentPrevController'
              }
            }
            ,params: {
    $msgContentPrev: { }
            }
        });

$stateProvider.state('signatureVerify', 
        {
            url         : '/signatureVerify/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@signatureVerify' :
              {                
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('signatureVerify','Y' ,'SUBMIT')
                  // template:'<div id="" class="bcontainer" tabindex="-1"><div id="" class="bheader" tabindex="-1"><a>Signature Verify </a></div><div id="" class="bsession" tabindex="-1"><div class="row tableRow" style="margin-left: 0px;margin-right: 0px;" tabindex="-1"><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="signatureVerify"></label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="signatureVerifyErrorBox"></div><input type="hidden" name="signatureVerify" class="clabel" xml="Y" mndf="N" datatype="CONTAINER" htmltype="CONTAINER" id="signatureVerify" maxlength="60" min="0" value="" maxcol="1" col="0" dflt="" errorbox="signatureVerifyErrorBox" label="" title="" xpath="$SingnatureVerify.signatureVerify" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="SingnatureVerify" xmlname="signatureVerify" container="Y" readonly="true"><span></span><script></script></div><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="tirack">TIRACK</label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="tirackErrorBox"></div><input type="TEXT" name="USS_tirack" class="clabel" xml="Y" mndf="N" datatype="VARCHAR" htmltype="TEXT" id="tirack" ng-model="$SingnatureVerify.signatureVerify.tirack" maxlength="60" min="0" value="" maxcol="1" col="0" dflt="" errorbox="tirackErrorBox" label="TIRACK" title="" xpath="$SingnatureVerify.signatureVerify.tirack" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="signatureVerify" xmlname="tirack" container="N" readonly="true"><span></span><script></script></div></div><div class="row tableRow" style="margin-left: 0px;margin-right: 0px;" tabindex="-1"><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="sender">Sender</label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="senderErrorBox"></div><input type="TEXT" name="USS_sender" class="clabel" xml="Y" mndf="N" datatype="VARCHAR" htmltype="TEXT" id="sender" ng-model="$SingnatureVerify.signatureVerify.sender" maxlength="60" min="0" value="" maxcol="1" col="1" dflt="" errorbox="senderErrorBox" label="Sender" title="" xpath="$SingnatureVerify.signatureVerify.sender" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="signatureVerify" xmlname="sender" container="N" readonly="true"><span></span><script></script></div><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="receiver">Receiver</label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="receiverErrorBox"></div><input type="TEXT" name="USS_receiver" class="clabel" xml="Y" mndf="N" datatype="VARCHAR" htmltype="TEXT" id="receiver" ng-model="$SingnatureVerify.signatureVerify.receiver" maxlength="60" min="0" value="" maxcol="1" col="2" dflt="" errorbox="receiverErrorBox" label="Receiver" title="" xpath="$SingnatureVerify.signatureVerify.receiver" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="signatureVerify" xmlname="receiver" container="N" readonly="true"><span></span><script></script></div><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="amount">Amount</label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="amountErrorBox"></div><input type="TEXT" name="USS_amount" class="clabel" xml="Y" mndf="N" datatype="VARCHAR" htmltype="TEXT" id="amount" ng-model="$SingnatureVerify.signatureVerify.amount" maxlength="60" min="0" value="" maxcol="1" col="3" dflt="" errorbox="amountErrorBox" label="Amount" title="" xpath="$SingnatureVerify.signatureVerify.amount" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="signatureVerify" xmlname="amount" container="N" readonly="true"><span></span><script></script></div><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="currency">Currency</label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="currencyErrorBox"></div><input type="TEXT" name="USS_currency" class="clabel" xml="Y" mndf="N" datatype="VARCHAR" htmltype="TEXT" id="currency" ng-model="$SingnatureVerify.signatureVerify.currency" maxlength="60" min="0" value="" maxcol="1" col="4" dflt="" errorbox="currencyErrorBox" label="Currency" title="" xpath="$SingnatureVerify.signatureVerify.currency" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="signatureVerify" xmlname="currency" container="N" readonly="true"><span></span><script></script></div><div class="clearfix visible-xs-block"></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><label class="chlabel" for="intermediateBic">Intermediate Bic</label></div><div id="td" class="col-md-6 col-sm-6 col-xs-12"><div id="intermediateBicErrorBox"></div><input type="TEXT" name="USS_intermediateBic" class="clabel" xml="Y" mndf="N" datatype="VARCHAR" htmltype="TEXT" id="intermediateBic" ng-model="$SingnatureVerify.signatureVerify.intermediateBic" maxlength="60" min="0" value="" maxcol="1" col="5" dflt="" errorbox="intermediateBicErrorBox" label="Intermediate Bic" title="" xpath="$SingnatureVerify.signatureVerify.intermediateBic" onclick="onClick(this);" onblure="onBlure(this);" onkeydown="onKeyDown(this);" onkeyup="onKeyUp(this);" onkeypress="onKeyPress(this);" onchange="onChange(this);" task="NONE" parent="signatureVerify" xmlname="intermediateBic" container="N" readonly="true"><span></span><script></script></div></div></div></div>'
                 ,controller :  'signatureVerifyController'
              }
            }
            ,params: {
    $basicDet: { }
            }
        });


 $stateProvider.state('signup', 
        {
            url         : '/signup/'
           ,views:{
              'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/signupView.html'
               ,controller :  'signupController'
              }
              ,

              'pageSubContext@signup' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL") //EIDT and ADD
                //template : 'this is test'
               // templateUrl : 'js/lib/views/dashboardView.html',controller :  'dashboardController'
                template:  "<center> <div style='width:600px'>" + heaerieUssServiceProvider.GenHtmlTemplateFromSJson('signup','Y',"REGISTER|BACK") + "</div> </center>"
               ,controller :  'signupController'
              }

             
            }
        });




    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');

        $state.go('login', {
            title: "Page not found",
            message: 'Could not find a state associated with url "'+$location.$$url+'"'
        });
    });
        


      

 
    //$httpProvider.defaults.headers.post['XSRF-AUTH'] = "some accessToken to be generated later"; 

        console.log('httpProvider');
        console.log($httpProvider);
      // $httpProvider.defaults.headers.post['x-access-token'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjYwbXMiLCJleHAiOjE0NDg2ODYwNTR9.-JiMA_sU22ZVbBSxuxTnyQY6khghSjGy7hdmNk11Ysk";
        $httpProvider.interceptors.push(['$q', '$injector','toaster','$window'//,'uss' 
                                ,function($q, $injector,toaster,$window//,uss
                                  ){  
    var sessionRecoverer = {
        responseError: function(response) {
            // Session has expired

               console.log(response);
            if (response.status == 302){

              //  $window.sessionStorage.clear(); --  durai
                //var SessionService = $injector.get('SessionService');
                var $http = $injector.get('$http');
                var deferred = $q.defer();
               // toaster.pop('error','this', 'session is expired');

             //   uss.Test('Test');
                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                //SessionService.login().then(deferred.resolve, deferred.reject);

                // When the session recovered, make the same backend call again and chain the request

             //   $injector.get('$state').go('login');

                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            else if (response.status == 304){

               // $window.sessionStorage.clear(); -- Durai
                //var SessionService = $injector.get('SessionService');
                var $http = $injector.get('$http');
                var deferred = $q.defer();
                toaster.pop('error','Error:', 'Invalid User Id / Password');

             //   uss.Test('Test');
                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                //SessionService.login().then(deferred.resolve, deferred.reject);

                // When the session recovered, make the same backend call again and chain the request

                $injector.get('$state').go('login');

                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            else if(response.status == 404)
            {
                toaster.pop('error','404', 'Request services is not avaliable for You');
                $injector.get('$state').go('login');
            }
            return $q.reject(response);
        }
        ,response: function(response) {
            var deferred = $q.defer();

             // console.log('response');
              //console.log(response);

            

              var respJSON=JSON.stringify(response);

              // alert("success["+ respJSON + "]" );
              
                //toaster.pop('success','200', 'Success response [' + response.headers('x-access-token') +"]");

                   var accessToken= response.headers('x-access-token');

                  // alert('accessToken:' + accessToken);
                   if (angular.isDefined(accessToken))
                   {
                      if( accessToken != null)
                      {
                        $window.sessionStorage.accessToken=accessToken;
                      }
                      else
                      {
                         $window.sessionStorage.accessToken="TMEPACCESS";
                      }
                  }
                return response;

            }
            ,request: function(request) {
           
                   console.log('request');
              console.log(request);

                //toaster.pop('success','Request', 'Send response session [' +$window.sessionStorage.accessToken +"]");


               request.headers['x-access-token'] = $window.sessionStorage.accessToken || '';
          
            return request;
        }
    };
    return sessionRecoverer;
}]);




        }]);

webApp.provider('$dashboardState', function($stateProvider,heaerieUssServiceProvider){
        this.$get = function($state){
            return {
                /**
                 * @function app.dashboard.dashboardStateProvider.addState
                 * @memberof app.dashboard
                 * @param {string} title - the title used to build state, url & find template
                 * @param {string} controllerAs - the controller to be used, if false, we don't add a controller (ie. 'UserController as user')
                 * @param {string} templatePrefix - either 'content', 'presentation' or null
                 * @author Alex Boisselle
                 * @description adds states to the dashboards state provider dynamically
                 * @returns {object} user - token and id of user
                 */
                addState: function(title, controllerAs, templatePrefix) {

                   /* $stateProvider.state('dashboard.' + title, {
                        url: '/' + title,
                        views: {
                            'dashboardModule@dashboard': {
                                templateUrl: PATHS.DASHBOARD + (templatePrefix ? templatePrefix + '/' : '/') + title + '/' + title + '.view.html',
                                controller: controllerAs ? controllerAs : null
                            }
                        }
                    });
*/

           // alert('dynamic State Add');
              $stateProvider.state('basicDetUSSNavi', 
        {
            url         : '/basicDetUSSNavi'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
              }
              ,

              'pageSubContext@basicDetUSSNavi' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y','SAVE')
                //template : '<form name="myForm" > <label for="exampleInput">Pick a date in 2013:</label> <input type="date" id="exampleInput" name="input" ng-model="example.value"placeholder="yyyy-MM-dd" min="2013-01-01" max="2016-12-31" required /> <div role="alert"> <span class="error" ng-show="myForm.input.$error.required"> Required!</span> <span class="error" ng-show="myForm.input.$error.date"> Not a valid date!</span> </div> <tt>value = {{example.value | date: "yyyy-MM-dd"}}</tt><br/> <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/> <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/> <tt>myForm.$valid = {{myForm.$valid}}</tt><br/> <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/> </form>'//heaerieUssServiceProvider.GenHtmlTemplateFromSJson('Y','SAVE') ,controller :  'basicDetController'
                ,controller :  'basicDetController'//template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
        });



                }
            }
        }
    });

webApp.run(['$rootScope','$q', '$injector' , '$window', function($rootScope,$q, $injector ,$window) {

    //$rootScope.$state = $state;
    $rootScope.goUrl= function(stateToGo)
    {

      //alert('I am in stateToGo' );
      //console.log(angular.toJson($state.get()));
       // console.log($injector.get('$state').get());

      if(stateToGo == 'registerUSSBack')
      {

         $injector.get('$state').go('login');
      }
      else if(stateToGo == 'logout')
      {

          $window.sessionStorage.clear();
         $injector.get('$state').go('login');
      }
     else
      {
         $injector.get('$state').go(stateToGo);
      }


         
    }
}]);


/*


   */

/*


    webApp.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  alert('alert config');
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

*/


    return webApp;
});
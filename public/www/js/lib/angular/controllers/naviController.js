define([],
function()
{

	return [ '$scope' , 'toaster','basicDetService','$state' ,'$window',function($scope,toaster,basicDetService,$state,$window){





$scope.firstName  =       $window.sessionStorage.getItem("firstName" );
$scope.grpName    =       $window.sessionStorage.getItem("grpName"   );
$scope.lastName    =     $window.sessionStorage.getItem("lastName"   );
$scope.prodVersion    =     $window.sessionStorage.getItem("prodVersion");
$scope.prtlName    =     $window.sessionStorage.getItem("prtlName"  );
$scope.prodName    =     $window.sessionStorage.getItem("prodName"  );

 



treeNodeOnclick=function(objId)
{
//alert("alert" + objId);
 $("."+objId).toggle(400);

// elements.hide(400);\

 //elements.toggle(400);

// .setAttribute("display", "none"); 
}


/*[]

$scope.entitlement=  [
  {
   'grpOrderId':1
  ,'groupId':1
  ,'grpName':'dashboard'
  ,'grpLink':'#/dashboard/'
  ,'dfltPage' :1
  ,'Pages': [ {
         'pageOrderId' : '1'
    ,'pageName' : 'DashBoard'
    ,'url' :''
    ,'link' :'#Dashboard'}
    ,
    {
         'pageOrderId' : '1'
    ,'pageName' : 'Transaction Activity'
    ,'url' :''
    ,'link' :'#transAct'}
    
    ]
  } 
  ,{'grpOrderId':1
  ,'groupId':1
  ,'grpName':'basicDetUSSAdd'
  ,'grpLink':'#/basicDetUSSAdd/'
  ,'dfltPage' :1
  ,'Pages': [ {
         'pageOrderId' : '1'
    ,'pageName' : 'DashBoard'
    ,'url' :''
    ,'link' :'#Dashboard'}
    ,
    {
         'pageOrderId' : '1'
    ,'pageName' : 'Transaction Activity'
    ,'url' :''
    ,'link' :'#transAct'}
    
    ]
  },{'grpOrderId':1
  ,'groupId':1
  ,'grpName':'SchemaGeneratorView'
  ,'grpLink':'#/SchemaGeneratorView/'
  ,'dfltPage' :1
  ,'Pages': [ {
         'pageOrderId' : '1'
    ,'pageName' : 'DashBoard'
    ,'url' :''
    ,'link' :'#Dashboard'}
    ,
    {
         'pageOrderId' : '1'
    ,'pageName' : 'Transaction Activity'
    ,'url' :''
    ,'link' :'#transAct'}
    
    ]
  }

  ,{'grpOrderId':1
  ,'groupId':1
  ,'grpName':'SchemaGenerator'
  ,'grpLink':'#/SchemaGenerator/'
  ,'dfltPage' :1
  ,'Pages': [ {
         'pageOrderId' : '1'
    ,'pageName' : 'DashBoard'
    ,'url' :''
    ,'link' :'#Dashboard'}
    ,
    {
         'pageOrderId' : '1'
    ,'pageName' : 'Transaction Activity'
    ,'url' :''
    ,'link' :'#transAct'}
    
    ]
  },{'grpOrderId':1
  ,'groupId':1
  ,'grpName':'KeyBoard'
  ,'grpLink':'#/KeyBoard/'
  ,'dfltPage' :1
  ,'Pages': [ {
         'pageOrderId' : '1'
    ,'pageName' : 'DashBoard'
    ,'url' :''
    ,'link' :'#Dashboard'}
    ,
    {
         'pageId' : '1'
    ,'pageName' : 'Transaction Activity'
    ,'url' :''
    ,'link' :'#transAct'}
    
    ]
  }
];

*/


$scope.$watch('$viewContentLoaded', function(){
//alert('I am in navi');


///console.log( $window.sessionStorage.getItem("treeViewJson"));

GenTreeView(eval($window.sessionStorage.getItem("treeViewJson")), 'dashboard');
  
});
    
    
	}];
	
});


GenTreeView=function(jsonInput, activeState) {
	var rtString="";
	var child=createTreeView(jsonInput,'root');

	document.getElementById('treeBase1').appendChild(child);
	return  rtString;
} 

createTreeView =function(jsonInput, parent)
{
  var rtDiv = document.createElement("div")

 // var child= document.createElement("div")


   for(var i=0; i< jsonInput.length; i++)
    {

        if(jsonInput[i].dataType == 'CONTAINER')
        {
          rtDiv.appendChild(createNodeContainer(jsonInput[i].uid, false, jsonInput[i].link, jsonInput[i].linkName ,parent));
           //rtDiv=createNodeContainer(jsonInput[i].uid, false, 'dashboard', 'dashboard' ,parent);
           rtDiv.appendChild( createTreeView(jsonInput[i].child, jsonInput[i].uid));

        }
        else
        {
            rtDiv.className="TreeNodeDiv";
           rtDiv.appendChild(createNode(jsonInput[i].uid, false,  jsonInput[i].link, jsonInput[i].linkName,parent));
        }
    }

  return rtDiv;

}

createNodeContainer =function(ContainerId,activeFlag, link,linkName, parent)
{


  this.ElDiv =  document.createElement("div");
  this.ElDiv.id = parent;
  this.ElDiv.className ="TreeContainer" ;
  this.ElDiv.setAttribute("onclick","treeNodeOnclick('"+ContainerId +"')" );

  this.ElLink                 = document.createElement("a");
  if( activeFlag == true)
  {
   this.ElLink.className      = "active";
  }
  else
  {
    this.ElLink.className      = "inactive";
  }

 
  // this.ElEditButton.setAttribute("href","#notes/delete");
   //this.ElLink.setAttribute("onclick","treeNodeOnclick('"+ContainerId +"')" );
   this.ElLabel         = document.createTextNode(linkName);
   this.ElLink.appendChild(this.ElLabel);
   this.ElDiv.appendChild(this.ElLink );

   return this.ElDiv
}


createNode =function(ContainerId,activeFlag, link,linkName,parent)
{
/*
<i class="fa fa-level-up" aria-hidden="true"></i>

*/
  this.ElDiv =  document.createElement("div");
  this.ElDiv.id = parent;
  this.ElDiv.className ="TreeNode "+ parent;

  this.ElLink                 = document.createElement("a");
  if( activeFlag == true)
  {
   this.ElLink.className      = "active";
  }
  else
  {
    this.ElLink.className      = "inactive";
  }


  this.ElFontAwesome                 = document.createElement("i");

  this.ElFontAwesome.className ="fa fa-level-up fa-rotate-90"
  this.ElFontAwesome.setAttribute("aria-hidden",true);
  // this.ElEditButton.setAttribute("href","#notes/delete");
   this.ElLink.setAttribute("href","#/"+link+"/");
   this.ElLabelDiv = document.createElement("span");
   this.ElLabelDiv.className="TreeNodeText";
   this.ElLabel  = document.createTextNode(linkName);
   //this.ElLabel.className ="TreeNodeText"

   this.ElLabelDiv.appendChild(this.ElLabel);
   this.ElLink.appendChild(this.ElFontAwesome);
   this.ElLink.appendChild(this.ElLabelDiv);
   this.ElDiv.appendChild(this.ElLink );

   return this.ElDiv
}





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
define('ufi','ufi.core','ufi.frameGen',function (ufi,ufiCore,ufiFrameGen){
var ufi=angular.module('ufi', ['ufi.core']);

//console.log('ufiFrameGen');
//console.log(ufiFrameGen);

//new ufiFrameGen.FG();


ufi.service('ufiFrameGen',new ufiFrameGen.FG());

return ufi;
});
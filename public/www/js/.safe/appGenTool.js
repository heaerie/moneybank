// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app"
    },
    "shim": {
        "ufi.core": ["require"],
        "backbone": ["underscore"],
        "ufi.core": ["backbone"],
        "ufi.frameGen": ["ufi.core"],
        "ufi.xml": ["ufi.core"],
        "ufi.validate": ["ufi.core"]
        

        
    }
});

// Load the main app module to start the app
requirejs(["app/mainGenTool"]);

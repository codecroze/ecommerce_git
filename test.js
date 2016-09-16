//it makes code more manaegable
//if a function depends on other then we need to sync them 
//orelse the sec function would run ahead of first and cause error
//used for dependable function
//callback is used for calling the next function
//[function,function,function]
var async = require('async');
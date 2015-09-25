Air.Module("test.testModule2", function(require){
	var result = require('test.testModule3');
	console.log(result)
	return result
})

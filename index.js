const fs = require('fs');
if(process.argv.length < 3){
	console.log('must enter input filename');
	return;
}
fs.readFile(process.argv[2],{encoding:'utf8'},(err,data)=>{
	if(err){
		console.log(err);
		return;
	}
	let output = "";
	let master = "";
	data = data.split('\n');
	data.forEach(line=>{
		split = line.split(' ');
		if(split[1] === 'struct'){
			master = split[2];
		} else if(split.includes('class')){
			master = split[split.indexOf('class')+1];	
		} else if(split.includes('RVA:')){
			let funcName = '';
			split.forEach(chunk=>{
				if(chunk.includes('(')){
					funcName = chunk.split('(')[0];
				}
			});
			output += `MakeName(${split[split.indexOf('RVA:')+1]},"${master}.${funcName}");\n`;
		}

	});
	fs.writeFileSync('output.idc',output);
});

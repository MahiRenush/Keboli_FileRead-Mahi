let express = require('express');
let fs = require('fs');
const path = require('path');

const app = express();

/* Get input from console*/
let stdin = process.openStdin();
let fileName, searchString, i=0;
app.listen('3000', ()=>{
    console.log("Please provide the name of the file");
})

stdin.on("data", (d)=> {
    if(i == 0) {
        fileName= d.toString().trim();
        i++;
        console.log("Kindly specify the string to be searched")
    }else{
        searchString= d.toString().trim();
        
        /* To read the file with size and parse it */
        let stats = fs.statSync(fileName); //fileName = 'newFile.txt'
        let fileSizeInBytes = stats["size"]
        let fileSizeInKB = fileSizeInBytes / 1000;
        try {
            let fileContent = fs.readFileSync(fileName, 'utf8');
            let str= fileContent.split(' ');
            let count =0;
            str.map(a =>{
                if( a.toLowerCase() === searchString.toLowerCase())
                    count++;
            })
            console.log(`The filename parsed is \n'${fileName}' it size \n'${fileSizeInKB}KB' and the occurrence of the search string \n'${searchString}' is \n'${count}'`)
            app.use('/', (req,res)=>{
                res.send({
                    'filename': fileName.split('.')[0],
                    "sizeinkb": fileSizeInKB,
                    "searchstring": searchString,
                    "format": fileName.split('.')[1],
                    "occurrence": count
                })
            })
        } catch(e) {
            console.log('Error:', e.stack);
        }
    }
});

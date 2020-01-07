let express = require('express');
let fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors())
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

let fileName, searchString, i=0;
app.use('/', (req,res)=>{
    console.log(req.body);
fileName= req.body.filename;
searchString= req.body.searchstring;

/* To read the file with size and parse it */
var result, count =0;

try {
    let stats = fs.statSync(fileName); //fileName = 'newFile.txt'
    let fileSizeInBytes = stats["size"]
    let fileSizeInKB = fileSizeInBytes / 1000;
    let fileContent = fs.readFileSync(fileName, 'utf8');
    let str= fileContent.split(' ');
  
    
    str.map(a =>{
        if( a.toLowerCase() === searchString.toLowerCase())
            count++;
    })
    console.log(`The filename parsed is \n'${fileName}' it size \n'${fileSizeInKB}KB' and the occurrence of the search string \n'${searchString}' is \n'${count}'`)
    result ={
        'filename': fileName.split('.')[0],
        "sizeinkb": fileSizeInKB,
        "searchstring": searchString,
        "format": fileName.split('.')[1],
        "occurrence": count
    };
} catch(e) {
    console.log('Error:', e.stack);
    result= "NOFILE";
}

    res.send(result)
})

app.listen('8080', ()=>{
    console.log("This server is being launched in the port 8080");
})

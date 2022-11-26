var fs = require('fs');
var moment = require('moment');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const directory = path.join(__dirname, 'savedlogs');
console.log(directory);

app.get('/createlogfile', (req, res) => {

    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });

        fs.writeFile(directory +'/'+ String(moment().format('DD-MM-YYYY:hh:mm:ss'))+'.txt', String(moment().format('DD-MM-YYYY:hh:mm:ss')), function (err) {
            if (err) throw err;
            console.log('Savedit!');
          });
        res.send('Log has been created');
    }
    
  });
  

  app.get('/displaylogfiles', (req, res) => {

    fs.readdir(directory, function (err, files) {
       
        if (err) {
            return res.status(400).send('Unable to scan the directory: ' + err);
        } 
        filelist = []
       
        files.forEach(function (file) {
          
            filelist.push(file); 
        });
        res.send(filelist);
    });
  });
  
  //   server
  app.listen(3000, () => {
    console.log('listening');
  });
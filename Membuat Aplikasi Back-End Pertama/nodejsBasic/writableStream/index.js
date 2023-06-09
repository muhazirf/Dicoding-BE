const fs = require('fs');

const {resolve} = require('path');

const readableStream = fs.createReadStream(resolve(__dirname, 'input.txt'), {
    highWaterMark: 15,
});

const writableStream = fs.createWriteStream(resolve(__dirname, 'output.txt'));

readableStream.on('readable', () =>{
    try {
        writableStream.write(`${readableStream.read()}\n`);
    } catch(error) {
        // console.log('cant read file');
    }
});

readableStream.on('end', () => {
    writableStream.end();
});
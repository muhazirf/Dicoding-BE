const fs = require('fs');

const readableStream = fs.createReadStream('./readableStream/article.txt', {
    highWaterMark: 10
});

readableStream.on('readable', () =>{
    try {
        process.stdout.write(`[${readableStream.read()}]`);
    } catch(error) {
        // console.log('cant read file');
    }
});

readableStream.on('end', () => {
    console.log('Done');
});
const axios = require('axios');
const LOGFILE = ''; //Link to log file [string] -- ex: https://example.com/client.log

async function parseLog(file) {
    try {
        let refinedData = [];
    
        await axios.get(`${file}`)
        .then((res) => {
            //Clean up the log file
            let data = res.data
            .replace(/............ INFO /g, '')
            .replace(/\[.*/g, '')
            .replace(/ /g, '')
            .split('\n');
    
            //Remove empty elements
            for (let i=0, len = data.length; i < len; i++) {
                if (data[i] !== '') {
                    if (data[i].length > 1) {
                        refinedData.push(JSON.parse(data[i]));
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
            return 'error';
        });

        return refinedData;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

parseLog(LOGFILE)
.then((res) => {
    //Do something with data
    console.log(res);
})
.catch((err) => {
    console.log(err);
});
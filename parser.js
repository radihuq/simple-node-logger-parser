const axios = require('axios');
const LOGFILE = ''; //Link to log file [string] -- ex: https://example.com/client.log

module.exports.parseLog = function () {
    let refinedData = [];
    
    axios.get(`${LOGFILE}`)
    .then((res) => {
        //Clean up the log file
        let data = res.data
        .replace(/............ INFO /g, '')
        .replace(/\[.*/g, '')
        .replace(/ /g, '')
        .split('\n');

        //Remove empty elements
        for (let i=0, len = data.length; i < len; i++) {
            console.log(`Cleaning up log ${i}`);
            if (data[i] !== '') {
                if (data[i].length > 1) {
                    refinedData.push(JSON.parse(data[i]));
                } else {
                    console.log(`Log ${i} is not good.`);
                }
            } else {
                console.log(`Log ${i} is not good.`);
            }
        }

        // return refinedData;
        console.log(`Finished with ${refinedData.length} logs`);
    })
    .catch((err) => {
        console.log(err);
        return 'error';
    });
}
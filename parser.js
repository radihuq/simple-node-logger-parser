const axios = require('axios');
const LOGFILE = 'https://chapsule-remote-test.s3.us-east-2.amazonaws.com/example.log'; //Link to log file [string] -- ex: https://example.com/client.log

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
                console.log(`Cleaning up log ${i}`);
                if (data[i] !== '') {
                    if (data[i].length > 1) {
                        // console.log(`Log ${i} is good.`);
                        refinedData.push(JSON.parse(data[i]));
                    } else {
                        console.log(`Log ${i} is not good.`);
                    }
                } else {
                    console.log(`Log ${i} is not good.`);
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
    // console.log(res);
    console.log(`Finished with ${res.length} logs`);
    console.log(res[0]);
})
.catch((err) => {
    console.log(err);
});
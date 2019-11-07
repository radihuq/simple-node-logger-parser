
# simple-node-logger Parser
Turn your logs into insights. This parser turns your log file into an array of objects.

### Installation
To install this project you can run:

`npm install`

### Dependencies
This project uses [axios](https://github.com/axios/axios) to fetch the log. The log is generated through the use of [simple-node-logger](https://github.com/darrylwest/simple-node-logger).

### Usage
Stringify your data when writing to your log file:

    let data = {
	    value: 'hello, world',
	    timestamp: 'Date.now()',
	    _unique: '1234567'
    };
    
    log.info(JSON.stringify(data));

The parser will remove the timestamps from the log and get rid of any empty lines. It will then `JSON.parse` each object and push it to a master array.

### Author
This parser was created by Radiun Huq. You can reach him at:

`Email: radi@mrhuq.com`

`Twitter: @radiunhuq`
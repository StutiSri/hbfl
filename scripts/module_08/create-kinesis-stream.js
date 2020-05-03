// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const kinesis = new AWS.Kinesis()
const streamName = 'hamster-race-results-ss'

createKinesisStream(streamName)
.then(data => console.log(data))

function createKinesisStream (streamName) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    kinesis.createStream({
      ShardCount: 1,
      StreamName: streamName
    }, (err) => {
      if(err) reject(err)
      else resolve()
    })
  })
}

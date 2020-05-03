// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const route53 = new AWS.Route53()
const hzName = 'hbfl.online' //your domain name

createHostedZone(hzName)
.then(data => console.log(data))

function createHostedZone (hzName) {
  const params = {
    Name: hzName,
    CallerReference: `${Date.now()}`
  }

  return new Promise((resolve, reject) => {
    route53.createHostedZone(params, (err, data) => {
            if(err) reject(err)
            else resolve(data) //after running this, get the data -  from CLI and use it in create-route53-recordset
        })
    })
}
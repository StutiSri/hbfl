// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

const ec = new AWS.ElastiCache()

helpers.createSecurityGroup('hamster_ss_redis_sg_2', 6379)
.then(sgId => createRedisCluster('hamster-ss', sgId))
.then(data => console.log(data))

function createRedisCluster (clusterName, sgId) {
  const params = {
    CacheClusterId: clusterName,
    CacheNodeType: 'cache.t2.micro',
    Engine: 'redis',
    NumCacheNodes: 1,
    SecurityGroupIds: [
        sgId
    ]
  }

  return new Promise((resolve, reject) => {
    ec.createCacheCluster(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })
}

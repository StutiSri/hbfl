const dataSource = require('./lib/dynamo')
const TableName = 'races_ss'

function getAll () {
  return dataSource.getAll(TableName)
}

function get (id) {
  return dataSource.get('races_ss', id)
}

async function clearResults () {
  const races = await dataSource.getAll(TableName)
  return races.map((race) => {
    race.results = []
    dataSource.put(TableName, race)
  })
}

module.exports = {
  get,
  getAll,
  clearResults
}

import fs from 'fs'

const filePath = './.seducwatchdog.json'

const stringify = JSON.stringify
const readLastTable = () => {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (e) {
    return undefined
  }
}
const touchFile = (table) => fs.appendFileSync(filePath, stringify(table))
const writeTableToFile = (table) => fs.writeFileSync(filePath, stringify(table))
const checkForLocalTableOrCreate = (currentTable) =>
  fs.existsSync(filePath) || (touchFile(currentTable) && undefined)

const compareTables = (t1, t2) => {
  const changedKeys = []
  for (const key in t2) {
    if (stringify(t1[key]) !== stringify(t2[key]))
      changedKeys.push(key)
  }
  return changedKeys[0] ? changedKeys : undefined
}

export const compareAgainstLastTable = (currentTable) => {
  if (!checkForLocalTableOrCreate(currentTable)) return undefined
  const table = readLastTable()
  const diff = compareTables(table, currentTable)

  if (diff) writeTableToFile(currentTable)
  return diff
}

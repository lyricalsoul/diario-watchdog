import 'dotenv/config'
import { getGrades } from './scrap.js'
import { compareAgainstLastTable } from './utils.js'
import { notifyToDiscord } from './notifications.js'

const main = async () => {
  console.log('Fetching grades...')
  const table = await getGrades().catch((e) => console.log(e) && undefined)
  if (!table) {
    console.log('Failed to fetch new table! Retrying in 15s.')
    return setTimeout(() => main(), 15 * 1000)
  }

  const diff = compareAgainstLastTable(table)
  if (diff) {
    console.log(`The following subject's data have changed: ${diff.join(', ').toLowerCase()}`)
    await notifyToDiscord(...diff)
  }
  console.log('No new updates for now.')
}

setInterval(() => main(), 10 * 60 * 1000)
main()

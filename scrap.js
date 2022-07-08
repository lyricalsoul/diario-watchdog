import pup from 'puppeteer'

const url = 'https://diario.seduc.ro.gov.br/portal/login.php'
const defaultTypingOptions = { visible: true, timeout: 3000 }

const getNormalTable = async (page) => {
  let data = await page.evaluate(() => {
    const dataObject = {}
    const tbody = document.querySelector('#notas tbody')

    for (const row of tbody.rows) {
      const [keyCell, ...cells] = row.cells
      dataObject[keyCell.innerText] = cells.map(a => a.innerText)
    }
    return dataObject
  })

  return data
}

export const getGrades = async () => {
  const browser = await pup.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitFor: 'networkidle2' })

  await page.type('#cpf', process.env.CPF, defaultTypingOptions)
  await page.type('#senha', process.env.PASSWORD, defaultTypingOptions)
  await page.click('button[type="submit"]')
  await page.waitForNavigation()

  const [element] = await page.$x(
    '/html/body/div[3]/fieldset/div/div/div/div[3]/div/div[1]/a'
  )
  await element.click()
  await page.waitForNavigation()

  const table = await getNormalTable(page)
  await browser.close()
  return table
}

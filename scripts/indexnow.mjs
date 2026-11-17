const HOST = 'kotok.site'
const KEY = '8f4d2c7a9b1e6f3d5a2c8e7b4f1d9c60'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const sitemapResponse = await fetch(SITEMAP)
if (!sitemapResponse.ok) {
  console.error(`Не удалось получить sitemap: ${sitemapResponse.status}`)
  process.exit(1)
}

const xml = await sitemapResponse.text()
const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])

if (urls.length === 0) {
  console.error('В sitemap не найдено ни одного URL')
  process.exit(1)
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
})

console.log(`IndexNow: ${response.status} ${response.statusText}`)
console.log(`Отправлено URL: ${urls.length}`)
for (const url of urls) console.log(`  ${url}`)

if (response.status >= 400) {
  console.error(await response.text())
  process.exit(1)
}

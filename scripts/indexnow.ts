/**
 * IndexNow ping — Bing / IndexNow に URL の新規・更新を即時通知する。
 *
 * 仕組み:
 *   https://scibase.app/<KEY>.txt に KEY をホストし（public/<KEY>.txt）、
 *   IndexNow API に { host, key, keyLocation, urlList } を POST する。
 *   Bing・Yandex・Seznam 等の参加エンジンが共有して受け取る。
 *   ※ Bing のインデックスは ChatGPT / Copilot の参照元なので AI 露出にも効く。
 *
 * 使い方:
 *   npx tsx scripts/indexnow.ts https://scibase.app/articles/foo https://scibase.app/ingredients/bar
 *     → 指定 URL のみ通知（コンテンツ更新時の通常運用。ship 後に変更ページを渡す）
 *   npx tsx scripts/indexnow.ts --from-sitemap
 *     → sitemap.xml の全 URL を通知（Bing 新規登録直後の初回キックスタート用）
 *
 * 前提: キー (KEY) が public/<KEY>.txt として本番にデプロイ済みであること。
 *   IndexNow はキー所有を https://scibase.app/<KEY>.txt の取得で検証する。
 *   未デプロイだと 403（key not found）になる。
 */

const KEY = 'a1c8a8c03eea8194529960c39579d9f7'
const HOST = 'scibase.app'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const BATCH_SIZE = 10000 // IndexNow の 1 リクエスト URL 上限

async function getSitemapUrls(): Promise<string[]> {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

async function submit(urls: string[]): Promise<void> {
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const urlList = urls.slice(i, i + BATCH_SIZE)
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    })
    const body = await res.text().catch(() => '')
    console.log(`POST ${urlList.length} URLs → ${res.status} ${res.statusText}`)
    if (body) console.log(`  body: ${body.slice(0, 200)}`)
    // IndexNow 成功 = 200 (OK) または 202 (Accepted・キー検証待ち)
    if (res.status !== 200 && res.status !== 202) {
      console.error(`  ⚠️ 失敗。キーファイルが ${KEY_LOCATION} で 200 を返すか確認。`)
    }
  }
}

async function main() {
  const args = process.argv.slice(2)
  let urls: string[]
  if (args.includes('--from-sitemap')) {
    urls = await getSitemapUrls()
    console.log(`sitemap から ${urls.length} URL を取得`)
  } else {
    urls = args.filter((a) => a.startsWith('http'))
    if (urls.length === 0) {
      console.error('使い方: npx tsx scripts/indexnow.ts <url...> | --from-sitemap')
      process.exit(1)
    }
  }
  await submit(urls)
  console.log('done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

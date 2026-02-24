#!/usr/bin/env node
/**
 * Prerender routes to static HTML after vite build.
 * Serves dist, visits each route with Puppeteer, writes HTML to dist for SEO.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { createServer } from 'http'
import { prerenderRoutes } from '../prerender-routes.js'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const port = 37542

function serveStatic(dir) {
  return createServer((req, res) => {
    let url = req.url === '/' ? '/index.html' : req.url
    if (!url.includes('.')) url = url.replace(/\/?$/, '/index.html')
    const file = path.join(dir, url.split('?')[0])
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.end()
        return
      }
      const ext = path.extname(file)
      const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' }
      res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
      res.end(data)
    })
  })
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error('Run "npm run build" first. dist/ not found.')
    process.exit(1)
  }
  const server = serveStatic(distDir)
  server.listen(port, '127.0.0.1', () => {})
  const base = `http://127.0.0.1:${port}`

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })

  for (const route of prerenderRoutes) {
    try {
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle0', timeout: 15000 })
      await page.waitForSelector('#main', { timeout: 5000 }).catch(() => {})
      await new Promise((r) => setTimeout(r, 800))
      const html = await page.content()
      const outPath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html')
      fs.mkdirSync(path.dirname(outPath), { recursive: true })
      fs.writeFileSync(outPath, html, 'utf8')
      console.log('Prerendered:', route, '->', outPath)
    } catch (e) {
      console.warn('Prerender failed for', route, e.message)
    }
  }

  await browser.close()
  server.close()
  console.log('Prerender done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

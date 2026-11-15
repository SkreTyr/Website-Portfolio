const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3500));

  await page.evaluate(() => document.querySelector('#About')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await new Promise((r) => setTimeout(r, 2000));

  const pt = await page.evaluate(() => {
    const item = document.querySelector('[aria-label="Application Navbar"] [role="button"]');
    const r = item.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });
  await page.mouse.move(pt.x, pt.y, { steps: 3 });

  // sample the height over 3s (headless throttles raf to ~10fps)
  const samples = [];
  for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 300));
    const s = await page.evaluate(() => {
      const dock = document.querySelector('[aria-label="Application Navbar"]');
      const r = dock.getBoundingClientRect();
      return Math.round(r.height);
    });
    samples.push(s);
  }

  console.log(JSON.stringify({ samples }, null, 1));
  await browser.close();
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
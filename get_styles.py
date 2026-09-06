import asyncio
from playwright.async_api import async_playwright
import json

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://www.pudurobotics.com/en/products?tab=cleaning")
        await page.wait_for_timeout(3000)
        
        styles = await page.evaluate('''() => {
            const getComp = (el) => el ? window.getComputedStyle(el).backgroundColor : null;
            const getCol = (el) => el ? window.getComputedStyle(el).color : null;
            
            return {
                bg_pdbg: getComp(document.querySelector('.bg-pdbg')),
                active_text: getCol(document.querySelector('.text-pdblue')),
                active_bg: getComp(document.querySelector('.bg-pdlightblue'))
            };
        }''')
        print(json.dumps(styles))
        await browser.close()

asyncio.run(run())

import asyncio
from playwright.async_api import async_playwright
import json
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        
        try:
            await page.goto("https://www.pudurobotics.com/en/products?tab=cleaning", timeout=30000)
            # Wait a bit for JS to render the grid
            await page.wait_for_timeout(5000)
        except Exception as e:
            print(f"Error during goto: {e}")
        
        # Take a screenshot
        await page.screenshot(path="/mnt/documents/pudu_products.png")
        
        # Extract styles
        styles = await page.evaluate('''() => {
            const getComp = (el) => {
                const s = window.getComputedStyle(el);
                return {
                    tag: el.tagName,
                    className: el.className,
                    fontSize: s.fontSize,
                    fontWeight: s.fontWeight,
                    color: s.color,
                    lineHeight: s.lineHeight,
                    fontFamily: s.fontFamily,
                    margin: s.margin,
                    padding: s.padding,
                    backgroundColor: s.backgroundColor,
                    borderRadius: s.borderRadius,
                    width: s.width,
                    height: s.height,
                    boxShadow: s.boxShadow,
                    display: s.display,
                    gap: s.gap
                };
            };
            
            const results = {};
            
            // Look for the "Cleaning" header or tab
            const tabs = Array.from(document.querySelectorAll('*')).filter(el => 
                el.innerText === 'Cleaning' && el.offsetWidth > 0
            );
            if (tabs.length > 0) results.tabActive = getComp(tabs[0].parentElement || tabs[0]);
            
            const otherTabs = Array.from(document.querySelectorAll('*')).filter(el => 
                el.innerText === 'Delivery' && el.offsetWidth > 0
            );
            if (otherTabs.length > 0) results.tabInactive = getComp(otherTabs[0].parentElement || otherTabs[0]);

            // Find product cards - look for elements with images and titles
            const cards = Array.from(document.querySelectorAll('div')).filter(el => 
                el.innerText && el.innerText.includes('PUDU') && el.querySelector('img') && el.offsetWidth > 100
            );
            
            if (cards.length > 0) {
                // Try to find the most specific card element
                let card = cards[0];
                results.card = getComp(card);
                
                // Titles inside cards
                const title = card.querySelector('h1, h2, h3, div[class*="title"], span[class*="title"]');
                if (title) results.cardTitle = getComp(title);
                
                // Grid container
                if (card.parentElement) results.grid = getComp(card.parentElement);
            }
            
            // Global typography
            const h1 = document.querySelector('h1');
            if (h1) results.h1 = getComp(h1);
            
            return results;
        }''')
        
        print(json.dumps(styles, indent=2))
        await browser.close()

asyncio.run(run())

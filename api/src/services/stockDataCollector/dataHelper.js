export const selectItems = async (page, itemsToSelect) => {
  let results = {};
  for (const i in itemsToSelect) {
    const item = itemsToSelect[i];
    if (item.waitForSelector) {
      await item.waitForSelector(page);
    } else {
      await page.waitForSelector(item.selector);
    }
    if (item.getContent) {
      results[i] = await item.getContent(page);
    } else {
      results[i] = await page.$eval(item.selector, (i) => i.textContent);
    }
  }
  return results;
};

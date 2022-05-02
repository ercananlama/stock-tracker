export async function runConcurrent(items, maxConcurrentAction, action) {
  let results = [];
  let itemsCompleted = 0;
  while (itemsCompleted < items.length) {
    const curItems = items.slice(
      itemsCompleted,
      itemsCompleted + maxConcurrentAction
    );
    const tasks = curItems.map(action);
    results.push(...(await Promise.all(tasks)));
    itemsCompleted += maxConcurrentAction;
  }
  return results;
}

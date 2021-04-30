import { Builder, By, Capabilities } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

// スリープ関数
const sleep = (millseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, millseconds));

(async function myFunction() {
  const options = new Options()
    .addArguments("--headless")
    .addArguments("--disable-dev-shm-usage");

  const driver = await new Builder()
    .setChromeOptions(options)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(Capabilities.chrome())
    .build();

  try {
    await driver.get("https://umamusume.jp/character/");

    // ページ最下部までスクロールして待機
    driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    await sleep(5000);

    // 画像を取得
    const elements = await driver.findElements(
      By.css(".character-umamusume li.anime-show a img")
    );

    // 名前を取得
    const names = await Promise.all(
      elements.map(async (element) => await element.getAttribute("alt"))
    );
    console.log(names);
  } finally {
    driver.quit();
  }
})();

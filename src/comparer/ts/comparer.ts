import { Builder, By } from "selenium-webdriver";
import chrome, { Driver } from "Selenium-webdriver/chrome";
import chromedriver from "chromedriver";

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// スリープ関数
const sleep = (millseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, millseconds));

(async () => {
  const driver = new Builder().forBrowser("chrome").build();

  const url = "https://umamusume.jp/character/";
  await driver.get(url);

  // ページ最下部までスクロール
  driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");

  // 遅延読み込みを少し待つ
  await sleep(5000);

  (await driver.findElements(By.className("character__list"))).map(
    async (element) => {
      const images = await element.findElements(By.xpath("/li/a/img"));
      console.log(images);
    }
  );

  driver.quit();
})();

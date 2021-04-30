import { Builder, By, Capabilities } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { Birthday } from "./models/birthday";

// スリープ関数
const sleep = (millseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, millseconds));

(async () => {
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

    console.log("公式サイトに記載されている最新データは以下の通りです。");
    const latestNames = await Promise.all(
      elements.map(async (element) => await element.getAttribute("alt"))
    );
    console.log(latestNames.sort());

    console.log("現在カレンダーデータに登録している名前は以下の通りです。");
    const currentNames = Birthday.getBirthdays().map(
      (birthday) => birthday.name
    );
    console.log(currentNames.sort());

    const diffNames = latestNames.filter((l) => !currentNames.indexOf(l));
    if (diffNames.length == 0) {
      console.log("未登録のウマ娘はいません。");
    } else {
      console.log("未登録のウマ娘は以下の通りです。");
      console.log(diffNames.sort());
    }
  } finally {
    driver.quit();
  }
})();

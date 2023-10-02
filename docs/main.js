(() => {
  function createCards(lang, flag, data) {
    const root = "https://umamusume-birthdays.ushibutatory.net/";

    const $calendars = $("#calendars");

    const title = document.createElement("h3");
    title.innerHTML = `<i class="fi fi-${flag}"></i>${lang}`;
    $calendars.append(title);

    const cardDeck = document.createElement("div");
    cardDeck.classList = "card-deck row";
    data.forEach((_) => {
      const calendarUrl = `${root}${_.src}`;

      cardDeck.append(
        (() => {
          const card = document.createElement("div");
          card.classList = "card";
          card.append(
            (() => {
              const header = document.createElement("div");
              header.classList = "card-header bg-transparent";
              header.innerText = _.text;
              return header;
            })(),
            (() => {
              const body = document.createElement("div");
              body.classList = "card-body";
              body.innerText = calendarUrl;
              return body;
            })(),
            (() => {
              const footer = document.createElement("div");
              footer.classList = "card-footer border-0 bg-transparent";

              const btnCopy = document.createElement("button");
              btnCopy.classList = "btn";
              btnCopy.innerHTML = "<i class='far fa-copy'></i> Copy";
              btnCopy.addEventListener("click", () => {
                navigator.clipboard.writeText(calendarUrl);
                btnCopy.innerHTML = "<i class='fas fa-check'></i> Copied!";
                setTimeout(() => {
                  btnCopy.innerHTML = "<i class='far fa-copy'></i> Copy";
                }, 1000);
              });
              footer.append(btnCopy);

              const btnDownload = document.createElement("a");
              btnDownload.classList = "btn";
              btnDownload.innerHTML =
                "<i class='fas fa-download'></i> Download";
              btnDownload.href = calendarUrl;
              btnDownload.setAttribute("download", calendarUrl);
              footer.append(btnDownload);

              return footer;
            })()
          );

          return card;
        })()
      );
    });
    $calendars.append(cardDeck);
  }

  createCards("日本語", "jp", [
    {
      text: "全てのウマ娘",
      src: "ja/birthdays.ics",
    },
    {
      text: "育成可能なウマ娘のみ",
      src: "ja/birthdays_p.ics",
    },
  ]);
  createCards("English", "us", [
    {
      text: "Everyone",
      src: "en/birthdays.ics",
    },
    {
      text: "Playable Only",
      src: "en/birthdays_p.ics",
    },
  ]);
})();

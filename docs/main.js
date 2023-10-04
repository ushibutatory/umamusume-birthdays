(() => {
  function createCards(language, data) {
    const root = "https://umamusume-birthdays.ushibutatory.net/dist/";

    const $tbody = $("#calendars tbody");
    data.forEach((_, index) => {
      const calendarUrl = `${root}${_.src}`;
      $tbody.append(
        (() => {
          const tr = document.createElement("tr");
          if (index === 0) {
            tr.append(
              (() => {
                const lang = document.createElement("td");
                lang.innerText = language;
                lang.rowSpan = data.length;
                return lang;
              })()
            );
          }
          tr.append(
            (() => {
              const content = document.createElement("td");
              content.innerText = _.text;
              return content;
            })()
          );
          tr.append(
            (() => {
              const url = document.createElement("td");
              url.innerText = calendarUrl;
              return url;
            })()
          );
          tr.append(
            (() => {
              const copy = document.createElement("td");

              const btnCopy = document.createElement("button");
              btnCopy.classList = "btn";
              btnCopy.innerHTML = "<i class='far fa-copy'></i>";
              btnCopy.addEventListener("click", () => {
                navigator.clipboard.writeText(calendarUrl);
                // コピーしたことを表示
                btnCopy.classList = "btn btn-success";
                btnCopy.innerHTML = "<i class='fas fa-check'></i>";

                // 元に戻す
                setTimeout(() => {
                  btnCopy.classList = "btn";
                  btnCopy.innerHTML = "<i class='far fa-copy'></i>";
                }, 500);
              });
              copy.append(btnCopy);

              return copy;
            })()
          );
          tr.append(
            (() => {
              const download = document.createElement("td");

              const btnDownload = document.createElement("a");
              btnDownload.classList = "btn";
              btnDownload.innerHTML = "<i class='fas fa-download'></i>";
              btnDownload.href = calendarUrl;
              btnDownload.setAttribute("download", calendarUrl);
              download.append(btnDownload);

              return download;
            })()
          );
          return tr;
        })()
      );
    });
  }

  createCards("日本語", [
    {
      text: "全てのウマ娘",
      src: "ja/birthdays.ics",
    },
    {
      text: "育成可能なウマ娘のみ",
      src: "ja/birthdays_p.ics",
    },
  ]);
  createCards("English", [
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

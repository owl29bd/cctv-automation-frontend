export function convertHtmlToPlain(html: string) {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}

export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function secondsToMmSs(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Add leading zeros if necessary
  const mm = minutes < 10 ? `0${minutes}` : minutes;
  const ss = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${mm}:${ss}`;
}

// A function that removes inline styles from a string of HTML where the styles to remove are specified in an array
export function removeInlineStyles(
  html: string,
  stylesToRemove: string[],
): string {
  const regexPattern = new RegExp(
    `\\b(${stylesToRemove.join("|")})\\s*:\\s*[^;"]*;?`,
    "gi",
  );
  return html.replace(regexPattern, "");
}

export function verifyImageUrl(url: string) {
  const urlPattern = new RegExp("^(\\/|https?:\\/\\/)", "i");
  if (urlPattern.test(url)) return url;
  return "/placeholder.svg";
}

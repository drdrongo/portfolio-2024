export function scrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

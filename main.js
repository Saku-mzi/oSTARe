const addToCartButton = document.querySelector(".addToCart");

if (!addToCartButton) {
  throw new Error("Add-to-cart button was not found.");
}

addToCartButton.addEventListener("pointerenter", (event) => {
  const margin = 8;
  const cursorRadius = 20;
  const buttonBounds = addToCartButton.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const maxLeft = Math.max(0, viewportWidth - buttonBounds.width - margin);
  const minLeft = Math.min(margin, maxLeft);
  const maxTop = Math.max(0, viewportHeight - buttonBounds.height - margin);
  const logoBottom =
    document.querySelector("#logo")?.getBoundingClientRect().bottom ?? 0;
  const minTop = Math.min(logoBottom + margin, maxTop);
  const destinations = [
    [minLeft, minTop],
    [maxLeft, minTop],
    [minLeft, maxTop],
    [maxLeft, maxTop],
  ];

  addToCartButton.style.position = "fixed";
  addToCartButton.style.zIndex = "11";
  addToCartButton.style.left = `${buttonBounds.left}px`;
  addToCartButton.style.top = `${buttonBounds.top}px`;

  requestAnimationFrame(() => {
    for (let attempt = 0; attempt < 60; attempt++) {
      destinations.push([
        minLeft + Math.random() * (maxLeft - minLeft),
        minTop + Math.random() * (maxTop - minTop),
      ]);
    }

    const safeDestinations = destinations.filter(([left, top]) => {
      const dx = Math.max(
        left - event.clientX,
        0,
        event.clientX - left - buttonBounds.width,
      );
      const dy = Math.max(
        top - event.clientY,
        0,
        event.clientY - top - buttonBounds.height,
      );
      return Math.hypot(dx, dy) >= cursorRadius;
    });

    if (safeDestinations.length === 0) {
      return;
    }

    const [left, top] =
      safeDestinations[Math.floor(Math.random() * safeDestinations.length)];
    addToCartButton.style.left = `${left}px`;
    addToCartButton.style.top = `${top}px`;
  });
});

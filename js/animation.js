export const addSmoothTransitions = (elements) => {
    elements.forEach((el) => {
        el.style.transition = "all 0.3s ease-in-out";
    });
};

// Example: Apply to sections
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    addSmoothTransitions(sections);
});

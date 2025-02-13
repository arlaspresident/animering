document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".heart-button");
    const container = document.querySelector(".heart-container");

    button.addEventListener("click", () => {
        for (let i = 0; i < 5; i++) {
            let heart = document.createElement("div");
            heart.classList.add("heart");

            container.appendChild(heart);

        
            setTimeout(() => heart.remove(), 5000);
        }
    });
});

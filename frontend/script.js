document.addEventListener("DOMContentLoaded", function() {
    const phrases = ["Unraveled...", "Accomplished..."];
    let currentPhraseIndex = 0;
    let currentCharacterIndex = 0;
    let typingSpeed = 150; // Speed of typing in milliseconds
    let deletingSpeed = 100; // Speed of deleting in milliseconds
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        const dynamicTitle = document.getElementById('typewriter');
        const fixedTitle = "DSA "; // Fixed text that stays in place

        if (isDeleting) {
            dynamicTitle.textContent = fixedTitle + currentPhrase.slice(0, currentCharacterIndex);
            currentCharacterIndex--;

            if (currentCharacterIndex < 0) {
                isDeleting = false; // Start typing the next phrase
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Loop back to the first phrase
                setTimeout(type, 500); // Pause before starting to type
            } else {
                setTimeout(type, deletingSpeed);
            }
        } else {
            dynamicTitle.textContent = fixedTitle + currentPhrase.slice(0, currentCharacterIndex);
            currentCharacterIndex++;

            if (currentCharacterIndex === currentPhrase.length) {
                isDeleting = true; // Start deleting after completing the phrase
                setTimeout(type, 1000); // Pause before starting to delete
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }

    // Flip Book Functionality
    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");
    const book = document.querySelector("#book");

    const paper1 = document.querySelector("#p1");
    const paper2 = document.querySelector("#p2");
    const paper3 = document.querySelector("#p3");

    prevBtn.addEventListener("click", goPrevPage);
    nextBtn.addEventListener("click", goNextPage);

    let currentLocation = 1;
    let numOfPapers = 3;
    let maxLocation = numOfPapers + 1;

    function openBook() {
        book.style.transform = "translateX(50%)";
        
    }

    function closeBook(isAtBeginning) {
        if (isAtBeginning) {
            book.style.transform = "translateX(0%)";
        } else {
            book.style.transform = "translateX(100%)";
        }

    
    }

    function goNextPage() {
        if (currentLocation < maxLocation) {
            switch (currentLocation) {
                case 1:
                    openBook();
                    paper1.classList.add("flipped");
                    paper1.style.zIndex = 1;
                    break;
                case 2:
                    paper2.classList.add("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 3:
                    paper3.classList.add("flipped");
                    paper3.style.zIndex = 3;
                    closeBook(false);
                    break;
                default:
                    throw new Error("unknown state");
            }
            currentLocation++;
        }
    }

    function goPrevPage() {
        if (currentLocation > 1) {
            switch (currentLocation) {
                case 2:
                    closeBook(true);
                    paper1.classList.remove("flipped");
                    paper1.style.zIndex = 3;
                    break;
                case 3:
                    paper2.classList.remove("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 4:
                    openBook();
                    paper3.classList.remove("flipped");
                    paper3.style.zIndex = 1;
                    break;
                default:
                    throw new Error("unknown state");
            }
            currentLocation--;
        }
    }

    // Start the typing effect
    type();
});

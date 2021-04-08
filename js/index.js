function calculatePercentClick(dimensionButton, coordinatesClick) {
    /**
     * |----------|----x     |
     * ^          ^          ^
     * |          |          |
     * |          |          -> Fim do botão
     * |          |
     * |          -> Início do botão
     * |
     * -> Início da tela
     */

    // Remove distância do início da tela até início do botão
    let lengthClick = coordinatesClick.x - dimensionButton.coordinateXOnScreen;

    return (lengthClick / dimensionButton.width) * 100;
}

function handleThrowCoin(event) {
    document.querySelector("#throw-coin").removeEventListener("click", handleThrowCoin);

    document.querySelector("#icon-crown").style.display = "none";
    document.querySelector("#icon-face").style.display = "none";

    let iconQuestion = document.querySelector("#icon-question");

    iconQuestion.style.display = "inline-block";
    iconQuestion.classList.add("throwCoin");

    setTimeout(() => {
        let coordinatesClick = getCoordinatesClick(event);
        let dimensionButton = getDimensionButton(event.target);

        showResult(dimensionButton, coordinatesClick);
    }, 2000);
}

function getCoordinatesClick(event) {
    let { x, y } = event;

    return { x, y };
}

function getDimensionButton(button) {
    return {
        height: button.offsetHeight,
        width: button.offsetWidth,
        coordinateXOnScreen: button.offsetLeft,
        coordinateYOnScreen: button.offsetTop
    };
}

function showResult(dimensionButton, coordinatesClick) {
    let iconQuestion = document.querySelector("#icon-question");

    iconQuestion.style.display = "none";
    iconQuestion.classList.remove("throwCoin");

    let percentClick = calculatePercentClick(dimensionButton, coordinatesClick);
    let limitPercent = 4; // Valor de 50% para cara e coroa

    if (percentClick >= 25 && percentClick <= 44) {
        limitPercent = 1; // Valor de 80% para cara
    } else if (percentClick >= 56 && percentClick <= 75) {
        limitPercent = 7; // Valor de 80% para coroa
    }

    let drawNumber = Math.floor(Math.random() * 10);

    if (drawNumber > limitPercent) {
        document.querySelector("#icon-face").style.display = "inline-block";
    } else {
        document.querySelector("#icon-crown").style.display = "inline-block";
    }

    document.querySelector("#throw-coin").addEventListener("click", handleThrowCoin);
}

document.querySelector("#throw-coin").addEventListener("click", handleThrowCoin);

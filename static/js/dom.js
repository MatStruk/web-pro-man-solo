// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function() {
        // retrieves boards and makes showBoards called
        dom.showBoards(dataHandler.getBoards());
    },
    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (var index = 0; index < boards.length; index++) {
            console.log(boards[index])
            const board = document.createElement("div");
            board.id = "index" + index
            board.classList.add("board")
            document.querySelector("#boards").appendChild(board)
            document.getElementById("index" + index).innerHTML += boards[index].title
        }

    },
    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    appendToElement: function(elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    }
    // here comes more features
}

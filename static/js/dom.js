// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function(optionalArgument) {
        if (typeof optionalArgument === 'undefined') {
            optionalArgument = 0;
        }
        // retrieves boards and makes showBoards called
        dom.showBoards(dataHandler.getBoards(), optionalArgument);
    },
    showBoards: function(boards, boardLength) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (var index = boardLength; index < boards.length; index++) {
            let board = document.createElement("div");
            board.id = "board" + index;
            board.classList.add("board");
            onClick="reply_click(this.id)"
            document.querySelector("#boards").appendChild(board);
            currentBoard = document.getElementById("board" + index)
            currentBoard.innerHTML += boards[index].title;
            currentBoard.addEventListener("click", function() {
                var idConvertedToBoardId = this.id.replace('board', '')
                dom.loadCards(parseInt(idConvertedToBoardId) + 1)});
            dom.expandBoardArrowButton(index);
        }

    },
    addBoardsButton: function() {
        let input = document.createElement("input");
        input.id = "nameBoard"
        input.setAttribute("placeholder", "Write name of a board and press enter")
        input.setAttribute("onkeydown","dom.setNameOfBoard(this)")
        input.setAttribute("type", "text")

        let button = document.createElement("button");
        button.id = "addBoardsButton";
        document.querySelector("#boards").appendChild(button);
        addBoardsButton = document.getElementById("addBoardsButton")
        addBoardsButton.innerHTML += "Create new board";
        addBoardsButton.addEventListener("click", function () {document.querySelector("#boards").insertBefore(input, addBoardsButton)});
    },
    setNameOfBoard: function(name) {
        if(event.keyCode == 13) {
                dataHandler.createNewBoard(name.value);
                document.getElementById("nameBoard").value = " ";
                document.querySelector("#nameBoard").remove();
            }

    },
    expandBoardArrowButton: function(boardId) {
        let arrow = document.createElement("img");
        arrow.id = "addBoardsButton" + boardId;
        arrow.setAttribute("src", "http://farm8.staticflickr.com/7418/8726310854_069f2fd220_o.jpg");
        arrow.className = "arrow-down";
        document.querySelector("#board" + boardId).appendChild(arrow);

    },
    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
        console.log(boardId)
        dom.showCards(dataHandler.getCardsByBoardId(boardId))
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for (var index = 0; index < cards.length; index++) {
            console.log(cards[index].title)
            console.log(cards[index].status_id)
            console.log(cards[index].order)
            console.log("board id" + cards[index].board_id)
        }
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

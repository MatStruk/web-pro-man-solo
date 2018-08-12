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
            currentBoard.innerHTML += boards[index].title
            currentBoard.addEventListener("click", function() {
                let idConvertedToBoardId = this.id.replace('board', '')
                });
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
    setNameOfCard: function(name, boardId) {
        if(event.keyCode == 13) {
                dataHandler.createNewCard(name.value, boardId +1, 1)
                document.getElementById("nameCard" + boardId).value = " ";
                document.querySelector("#nameCard" + boardId).remove();
            }

    },
    expandBoardArrowButton: function(boardId) {
        extendBoard = true
        let arrow = document.createElement("img");
        arrow.id = "addBoardsButton" + boardId;
        arrow.setAttribute("src", "http://farm8.staticflickr.com/7418/8726310854_069f2fd220_o.jpg");
        arrow.className = "arrow-down";
        document.querySelector("#board" + boardId).appendChild(arrow);
        document.getElementById("addBoardsButton" + boardId).addEventListener("click", function() {
            if (arrow.className === "arrow-down") {
                arrow.className = "arrow-up";
                extendBoard = true
            }
            else if (arrow.className === "arrow-up") {
                arrow.className = "arrow-down";
                extendBoard = false
            }
            dom.showPredefinedColumns(boardId, extendBoard);
        });

    },
    showPredefinedColumns: function (boardId) {
        if (extendBoard === true) {
            dom.addNewCardButton(boardId);
            let fourColumns = document.createElement("div");
            fourColumns.classList.add("fourColumns");
            fourColumns.setAttribute("id", "fourColumns" + boardId)
            document.querySelector("#board" + boardId).appendChild(fourColumns);

            columnsArray = ["newColumn", "inProgressColumn", "testingColumn", "doneColumn"]
            for (var i = 0; i < columnsArray.length; i++ ) {
                    let name = columnsArray[i];
                    let element = document.createElement("div");
                    element.className = "column"
                    element.setAttribute("id", "board" + boardId + name)
                    element.innerHTML += '<div class="title">' + name + '</div><hr>';
                    document.querySelector("#fourColumns" + boardId).appendChild(element);
                }
            dom.loadCards(parseInt(boardId) + 1)
        }
        else if (extendBoard === false) {
            document.querySelector("#fourColumns" + boardId).innerHTML = "";
            document.getElementById("fourColumns" + boardId).outerHTML = "";
            document.getElementById("board" + boardId + "addNewCardButton").outerHTML = "";
        }
    },
    loadCards: function(boardId, optionalArgument) {
        // retrieves cards and makes showCards called
        if (typeof optionalArgument === 'undefined') {
            optionalArgument = 0;
        }
        dom.showCards(dataHandler.getCardsByBoardId(boardId), optionalArgument);
    },
    showCards: function(cards, cardsLength) {
        statuses = {
            1: "newColumn",
            2: "inProgressColumn",
            3: "testingColumn",
            4: "doneColumn"
        }
        // shows the cards of a board
        // it adds necessary event listeners also
        for (var index = cardsLength; index < cards.length; index++) {
            card = document.createElement("div");
            card.id = cards[index].title;
            card.className = "card"
            card.innerHTML += cards[index].title;
            document.querySelector("#board" + (cards[index].board_id -1) + statuses[cards[index].status_id]).appendChild(card);
        }
    },
    sortCardsByOrder: function(cards) {
    },
    addNewCardButton: function(boardId) {
        let input = document.createElement("input");
        input.id = "nameCard" + boardId
        input.setAttribute("placeholder", "Write name of a card and press enter");
        input.setAttribute("onkeydown",'dom.setNameOfCard(this,' + boardId + ')');
        input.setAttribute("type", "text");

        addNewCard = document.createElement("button");
        addNewCard.id = "board" + boardId + "addNewCardButton";
        addNewCard.innerHTML += "Add new card";
        document.querySelector("#board" + boardId).appendChild(addNewCard);
        addNewCard.addEventListener("click", function () {document.querySelector("#board" + boardId).insertBefore(input, addNewCard)});
    }
    // here comes more features
}

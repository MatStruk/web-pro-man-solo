// It uses data_handler.js to visualize elements
let saveSelectedElement = null;
extendBoard = true
let dom = {
    loadBoards: function(dynamicCounter) {
        if (typeof dynamicCounter === 'undefined') {
            dynamicCounter = 0;
        }
        // retrieves boards and makes showBoards called
        //dom.showBoards(dataHandler.getBoards(), optionalArgument);
        logic.ajax('GET', '/get-boards','', 'dom.showBoards(data,' + dynamicCounter +')')
    },
    showBoards: function(boards, dynamicCounter) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        if (boards != undefined) {
            for (let index = dynamicCounter; index < boards.length; index++) {
                let board = document.createElement("div");
                board.id = "board" + boards[index].id;
                board.classList.add("board");
                onClick="reply_click(this.id)"
                document.querySelector("#boards").appendChild(board);
                currentBoard = document.getElementById("board" + boards[index].id)
                currentBoard.innerHTML += boards[index].title
                currentBoard.addEventListener("click", function() {let idConvertedToBoardId = this.id.replace('board', '')});
                dom.expandBoardArrowButton(boards[index].id);
                dom.deleteBoardButton(boards[index].id)
            }
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
        addBoardsButton.addEventListener("click", function () {
            document.querySelector("#boards").insertBefore(input, addBoardsButton)
        });
    },
    setNameOfBoard: function(name) {
        if(event.keyCode == 13 || event.keyCode == 27) {
            if (event.keyCode == 13) {
                //dataHandler.createNewBoard(name.value);
                numberOfBoards = document.querySelectorAll('.board').length
                logic.ajax('POST', '/create-new-board', 'title=' + name.value, 'dom.loadBoards(' + numberOfBoards + ')')
            }
            document.getElementById("nameBoard").value = " ";
            document.querySelector("#nameBoard").remove();
        }
    },
    setNameOfCard: function(name, boardId) {
         if(event.keyCode == 13 || event.keyCode == 27) {
            if (event.keyCode == 13) {
                //dataHandler.createNewCard(name.value, boardId +1, 1);
                currentBoardLength = document.querySelectorAll('#board' + boardId + ' .card').length
                console.log(currentBoardLength)
                logic.ajax('POST', '/create-new-card', 'title=' + name.value + '&boardId=' + (boardId), 'dom.loadCards(' + boardId + ',' + currentBoardLength + ')')
            }
            document.querySelector("#nameCard" + boardId).remove();
        }
    },
    changeNameOfCard: function(name, cardId) {
         if(event.keyCode == 13 || event.keyCode == 27) {
            if (event.keyCode == 13) {
                //dataHandler.overwriteNameOfCard(name.value, cardId -1);
                logic.ajax('POST', '/change-name-of-card', 'title=' + name.value + '&cardId=' + (cardId))
                document.querySelector("#inputCard" + cardId).outerHTML += '<div class="card-title" id="cardtitle' + cardId + '">' + name.value + '<img class="edit-icon" src="https://www.ibidinfo.com/img/22/clean-icon.png"></div>';
            } else {
                document.querySelector("#inputCard" + cardId).outerHTML += '<div class="card-title" id="cardtitle' + cardId + '">' + document.querySelector("#inputCard" + cardId).placeholder + '<img class="edit-icon" src="https://www.ibidinfo.com/img/22/clean-icon.png"></div>';
            }
            document.querySelector("#inputCard" + cardId).remove();
            document.querySelector("#cardtitle" + cardId).addEventListener("click", function() {
                this.id = this.id.replace('cardtitle', '')
                this.outerHTML = '<input id="inputCard' + this.id +'" placeholder="' + this.innerText +'" class="change-card-name" onkeydown="dom.changeNameOfCard(this,' + this.id + ')" type="text">'
            });
        }
    },
    expandBoardArrowButton: function(boardId) {
        extendBoard = true
        let arrow = document.createElement("img");
        arrow.id = "addBoardsButton" + boardId;
        arrow.setAttribute("src", "http://farm8.staticflickr.com/7418/8726310854_069f2fd220_o.jpg");
        arrow.className = "arrow-down";
        document.querySelector("#board" + boardId).appendChild(arrow);
        arrow.addEventListener("click", function() {
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
    deleteBoardButton: function(boardId) {
        let deleteButton = document.createElement("img");
        deleteButton.id = "deleteBoardButton" + boardId;
        deleteButton.setAttribute("src", "http://www.free-icons-download.net/images/recycle-bin-logo-icon-66421.png");
        deleteButton.className = "deleteButton";
        document.querySelector("#board" + boardId).appendChild(deleteButton);
        deleteButton.addEventListener("click", function() {
            if (confirm('Are you sure you want to delete this board? You won\'t be able to undo this operation.')) {
                logic.ajax('POST', '/delete-board', 'boardId=' + boardId, 'alert(data)')
                document.querySelector("#board" + boardId).outerHTML = ""
            } else {
                // Do nothing!
            }
        })
    },
    statusesArray: function() {
        statuses = {
            1: "newColumn",
            2: "inProgressColumn",
            3: "testingColumn",
            4: "doneColumn"
        }
        return statuses
    },
    showPredefinedColumns: function (boardId) {
        if (extendBoard === true) {
            dom.addNewCardButton(boardId);
            let fourColumns = document.createElement("div");
            fourColumns.classList.add("fourColumns");
            fourColumns.setAttribute("id", "fourColumns" + boardId);
            document.querySelector("#board" + boardId).appendChild(fourColumns);
            statusesArray = ["newColumn", "inProgressColumn", "testingColumn", "doneColumn"]
            for (let i = 1; i <= Object.keys(dom.statusesArray()).length; i++ ) {
                    let element = document.createElement("div");
                    element.classList.add("droptarget");
                    element.setAttribute("id", dom.statusesArray()[i] + "inside" + "board" + boardId);
                    element.innerHTML += '<div class="title">' + dom.statusesArray()[i] + '</div><hr>';
                    document.querySelector("#fourColumns" + boardId).appendChild(element);
                    element.addEventListener("dragenter", function(event) {dom.handleDragEnter(event);});
                    element.addEventListener("dragleave", function(event) {dom.dragLeave(event)});
                    element.addEventListener("dragover",  function(event) {dom.dragOver(event)});
                    element.addEventListener("drop", function(event) {dom.dropEvent(event, element)});
                }
            dom.loadCards(parseInt(boardId))
        }
        else if (extendBoard === false) {
            document.querySelector("#fourColumns" + boardId).innerHTML = "";
            document.getElementById("fourColumns" + boardId).outerHTML = "";
            document.getElementById("board" + boardId + "addNewCardButton").outerHTML = "";
        }
    },
    loadCards: function(boardId, dynamicCounter) {
        if (typeof dynamicCounter === 'undefined') {
            dynamicCounter = 0;
        }
        // retrieves cards and makes showCards called
        //dom.showCards(dataHandler.getCardsByBoardId(boardId), optionalArgument);
        logic.ajax('POST', '/get-cards-by-board', 'boardId=' + boardId, 'dom.showCards(data,' + dynamicCounter +')')
    },
    showCards: function(cards, dynamicCounter) {
        cards = dom.sortCards(cards)
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let index = dynamicCounter; index < cards.length; index++) {
            cardTitle = cards[index].title.replace(/\s/g, '')
            card = document.createElement("div");
            card.id = "card" + cards[index].id;
            card.className = "card";
            card.setAttribute("draggable", "true");
            card.innerHTML += '<img class="delete-card" id="delete' + cards[index].id + '" src="http://www.free-icons-download.net/images/recycle-bin-logo-icon-66421.png"></img><div class="card-title" id="cardtitle'+cards[index].id+'">' + cards[index].title + '<img class="edit-icon" src="https://www.ibidinfo.com/img/22/clean-icon.png"></img></div>';
            document.querySelector("#" + dom.statusesArray()[cards[index].status_id] + "insideboard" + (cards[index].board_id)).appendChild(card);
            document.querySelector('#delete' + cards[index].id).addEventListener("click", function() {
                if (confirm('Are you sure you want to delete this board? You won\'t be able to undo this operation.')) {
                    logic.ajax('POST', '/delete-card', 'cardId=' + cards[index].id, 'alert(data)')
                    document.querySelector("#card" + cards[index].id).outerHTML = ""
                } else {
                    // Do nothing!
                }
            })
            document.querySelector("#cardtitle"+cards[index].id).addEventListener("click", function() {
                this.id = this.id.replace('cardtitle', '')
                this.outerHTML = '<input id="inputCard' + this.id +'" placeholder="' + this.innerText +'" class="change-card-name" onkeydown="dom.changeNameOfCard(this,' + this.id + ')" type="text">'
            });
        };
        var allCards = document.querySelectorAll('.card');
        allCards.forEach(dom.addToCardsEvents)
    },
    sortCards: function(cards) {
        cards.sort(function(a, b) {
            return (a.card_order) - (b.card_order);
        });
        return cards
    },
    addToCardsEvents: function(card) {
        card.addEventListener('dragstart', function(event) {dom.handleDragStart(event, card)});
        card.addEventListener('dragenter', function(event) {dom.handleDragEnter(card)})
        card.addEventListener('dragover',  function(event) {dom.handleDragOver(event, card)});
        card.addEventListener('dragleave', function(event) {dom.handleDragLeave(card)});
        card.addEventListener('drop',      function(event) {dom.handleDrop(event, card)});
        card.addEventListener('dragend',   function(event) {dom.handleDragEnd(card)});
    },/* was bugging:( now it is outside dom
    saveSelectedElement: function() {
        let saveSelectedElement = null;
        return saveSelectedElement
    },*/
    handleDragStart: function(event, card) {
        saveSelectedElement = card;
        event.dataTransfer.setData('text/html', card.outerHTML);
        event.dataTransfer.setData("text", event.target.id);
    },
    handleDragEnter: function(card) {},
    handleDragOver: function(event, card) {
        event.preventDefault();
        card.classList.add('over');
    },
    handleDragLeave: function(card) {
        card.classList.remove('over');
    },
    handleDrop: function(event, card) {
        if (saveSelectedElement != card && saveSelectedElement != "undefined" && saveSelectedElement != "handleDropExecuted") {
            saveSelectedElement.parentNode.removeChild(saveSelectedElement);
            let element = event.dataTransfer.getData('text/html');
            card.insertAdjacentHTML('beforebegin',element);
            let droppedElement = card.previousSibling;
            dom.addToCardsEvents(droppedElement);
            saveDraggedCardId = saveSelectedElement;
            saveSelectedElement = "handleDropExecuted";
            if (event.path[1].id.includes('card') == true) {
                updatedStatusAndBoardArray = event.path[2].id.split("insideboard");
            } else {
                updatedStatusAndBoardArray = event.path[1].id.split("insideboard");
            }
            dom.updateOrder(updatedStatusAndBoardArray[0], saveDraggedCardId.id, updatedStatusAndBoardArray[1]);

        }
        card.classList.remove('over');
    },
    updateOrder: function(updatedStatus, cardToUpdateStatus, boardId) {
        var allCards = document.querySelectorAll('.card');
        let newOrderValue = 1
        allCards.forEach(function(element) {
            //dataHandler.updateCardsOrder(element.id.replace('card', ''), newOrderValue, parseInt(dom.extractKeyWithValue(dom.statusesArray(), updatedStatus)), (parseInt(cardToUpdateStatus.replace('card', '')) -1), parseInt(boardId));
            logic.ajax('POST', '/update-order', 'cardId=' + element.id.replace('card', '') + '&newOrder=' + newOrderValue + '&status=' + parseInt(dom.extractKeyWithValue(dom.statusesArray(), updatedStatus)) + '&boardId=' + boardId + '&cardToUpdateStatus=' + parseInt(cardToUpdateStatus.replace('card', '')))
            newOrderValue++;
        })
    },
    handleDragEnd: function(card) {
        card.classList.remove('over');
    },
    dragOver: function(event) {
        event.preventDefault();
    },
    dragLeave: function(event) {
        event.target.style.border = "";
    },
    dropEvent: function(event, element) {
        let data = "#" + event.dataTransfer.getData("text");
        if (saveSelectedElement !== 'handleDropExecuted') {
            card = document.querySelector(data);
            event.target.style.border = "";
            element.append(card);
            let statusBoardCardArray = element.id.split("insideboard");
            statusBoardCardArray.push(card.id)
            logic.ajax('POST', '/update-card-status-and-order', 'status=' + dom.extractKeyWithValue(dom.statusesArray(), statusBoardCardArray[0]) + '&boardId=' + statusBoardCardArray[1] + '&cardId=' + statusBoardCardArray[2].replace('card', ''))
            //dataHandler.changedCardStatusAndBoard(dom.extractKeyWithValue(dom.statusesArray(), statusBoardCardArray[0]), statusBoardCardArray[1], statusBoardCardArray[2].replace('card', ''));
        }
    },
    extractKeyWithValue: function(obj, value) {
        return Object.keys(obj)[Object.values(obj).indexOf(value)];
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
        addNewCard.addEventListener("click", function() {document.querySelector("#board" + boardId).insertBefore(input, addNewCard)});
    }
    // here comes more features
}


// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        dataHandler._data = JSON.parse(localStorage.getItem(dataHandler.keyInLocalStorage));
    },
    _saveData: function() {
        // it is not called from outside
        // saves the data from this._data to local storage
        localStorage.setItem(dataHandler.keyInLocalStorage, JSON.stringify(dataHandler._data));
    },
    init: function() {
        this._loadData();
        dom.addBoardsButton();
    },
    getBoards: function(callback) {
        // the boards are retrieved and then the callback function is called with the boards
        if (dataHandler._data != null) {
            return dataHandler._data.boards
        } else {
            dataHandler._data = {statuses: Array(0), boards: Array(0), cards: Array(0)};
        }
    },
    getBoard: function(boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function(callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function(boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        cards = []
        for (var index = 0; index < dataHandler._data.cards.length; index++) {
            if (dataHandler._data.cards[index].board_id === boardId) {
                cards.push(dataHandler._data.cards[index])
            }
        }
        cards.sort(function(a, b) {
            return (a.order) - (b.order);
        });
        return cards
    },
    getCard: function(cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
        return dataHandler._data.cards
    },
    createNewBoard: function(boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        dataHandler._data.boards.push({
            id: dataHandler._data.boards.length +1,
            title: boardTitle,
            is_active: true
        });
        dataHandler._saveData();
        dom.loadBoards(dataHandler._data.boards.length - 1);
    },
    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        if (dataHandler._data != null) {
            dataHandler._data.cards.push({
                id: dataHandler._data.cards.length +1,
                title: cardTitle,
                board_id: boardId,
                status_id: statusId,
                order: dataHandler._data.cards.length +1
            });
            dataHandler._saveData();
            dom.loadCards(boardId, dataHandler.getCardsByBoardId(boardId).length - 1);
        }
        else {
            console.log("error")
        }
    },
    overwriteNameOfCard: function(name, cardId) {
        dataHandler._data.cards[cardId].title = name
        dataHandler._saveData();
    },
    changedCardStatusAndBoard: function(status, board, card) {
        for (let index = 0; index < dataHandler._data.cards.length; index ++) {
            if (dataHandler._data.cards[index].id == card) {
                if (dataHandler._data.cards[index].board_id != parseInt(board) +1) {
                    dataHandler._data.cards[index].order = dataHandler.getCardsByBoardId(parseInt(board) +1).length + 1
                }
                dataHandler._data.cards[index].board_id = parseInt(board) +1
                dataHandler._data.cards[index].status_id = parseInt(status)
                dataHandler._data.cards[index].order = dataHandler._data.cards.length +1
            }
        };
        dataHandler._saveData();
    },
    updateCardsOrder: function(cardId, newOrder, updatedStatus, cardToUpdateStatus, boardId) {
        cardId -= 1 // Card1 has index of 0
        if (typeof dataHandler._data.cards[cardId] != 'undefined') {
            if (dataHandler._data.cards[cardId].id == cardToUpdateStatus) {
                if (typeof updatedStatus != 'undefined' || updatedStatus != 'null') {
                    dataHandler._data.cards[cardToUpdateStatus].status_id = updatedStatus;
                    //dataHandler._data.cards[cardToUpdateStatus].order = newOrder;
                    dataHandler._data.cards[cardToUpdateStatus].board_id = boardId +1;
                };
            };
            dataHandler._data.cards[cardId].order = newOrder;
        } else {
            console.log("Wrong cardId");
        };
        dataHandler._saveData();
    }
    // here comes more features
};

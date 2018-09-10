from flask import Flask, render_template, request
from data import database_manager
import json

app = Flask(__name__)


@app.route("/")
def boards():
    return render_template('boards.html')


@app.route('/create-new-card', methods=['POST'])
def create_new_card():
    title = request.form['title']
    boardId = request.form['boardId']
    database_manager.create_new_card(title, boardId)
    alert = "Card " + title + " was successfully added."
    return json.dumps(alert)


@app.route('/create-new-board', methods=['POST'])
def create_new_board():
    title = request.form['title']
    database_manager.create_new_board(title)
    alert = "Board " + title + " was successfully added."
    return json.dumps(alert)


@app.route('/get-boards', methods=['GET'])
def get_boards():
    return json.dumps(database_manager.get_boards())


@app.route('/change-name-of-card', methods=['POST'])
def change_name_of_card():
    title = request.form['title']
    cardId = request.form['cardId']
    database_manager.change_name_of_card(title, cardId)
    alert = "Title was successfully added to " + title + "."
    return json.dumps(alert)


@app.route('/get-cards-by-board', methods=['POST'])
def get_cards_by_board():
    boardId = request.form['boardId']
    return json.dumps(database_manager.get_cards_by_board(boardId))


@app.route('/update-card-status-and-order', methods=['POST'])
def update_card_status_and_order():
    boardId = request.form['boardId']
    cardId = request.form['cardId']
    status = request.form['status']
    return json.dumps(database_manager.update_card_status_and_order(cardId, boardId, status))


@app.route('/update-order', methods=['POST'])
def update_order():
    cardId = request.form['cardId']
    newOrder = request.form['newOrder']
    status = request.form['status']
    boardId = request.form['boardId']
    cardToUpdateStatus = request.form['cardToUpdateStatus']
    return json.dumps(database_manager.update_order(cardId, newOrder, status, boardId, cardToUpdateStatus))


@app.route('/delete-board', methods=['POST'])
def delete_board():
    boardId = request.form['boardId']
    alert = 'You deleted a board and all cards associated with it.'
    database_manager.delete_board(boardId)
    return json.dumps(alert)


@app.route('/delete-card', methods=['POST'])
def delete_card():
    cardId = request.form['cardId']
    alert = 'You deleted a card.'
    database_manager.delete_card(cardId)
    return json.dumps(alert)


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
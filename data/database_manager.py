from data import database_common


@database_common.connection_handler
def create_new_card(cursor, title, board_id):
    cursor.execute("""
                 INSERT INTO public.cards(
                 title, board_id, status_id)
                 VALUES (%(title)s, %(board_id)s, 1)
                 RETURNING id;
                 UPDATE public.cards
                 SET card_order = id;
                 """,
                 {"title": title, "board_id": board_id})


@database_common.connection_handler
def create_new_board(cursor, title):
    cursor.execute("""
                 INSERT INTO public.boards(
                 title, userid)
                 VALUES (%(title)s, 1);
                 """,
                 {"title": title})


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
                 SELECT *
                 FROM public.boards
                 """)
    return cursor.fetchall()


@database_common.connection_handler
def change_name_of_card(cursor, title, id):
    cursor.execute("""
                 UPDATE public.cards
                 SET title = %(title)s
                 WHERE id = %(id)s
                 """,
                 {"title": title, "id": id})


@database_common.connection_handler
def get_cards_by_board(cursor, boardId):
    cursor.execute("""
                 SELECT *
                 FROM public.cards
                 WHERE board_id = %(boardId)s
                 """,
                 {"boardId": boardId})
    return cursor.fetchall()


@database_common.connection_handler
def update_card_status_and_order(cursor, cardId, boardId, status):
    cursor.execute("""
                 UPDATE public.cards
                 SET board_id = %(boardId)s, status_id = %(status)s
                 WHERE id = %(cardId)s
                 """,
                 {"boardId": boardId, "cardId": cardId, "status": status})


@database_common.connection_handler
def update_order(cursor, cardId, newOrder, status, boardId, cardToUpdateStatus):
    cursor.execute("""
                 UPDATE public.cards
                 SET board_id = %(boardId)s, status_id = %(status)s
                 WHERE id = %(cardToUpdateStatus)s;

                 UPDATE public.cards
                 SET card_order = %(newOrder)s
                 WHERE id = %(cardId)s;
                 """,
                 {"boardId": boardId, "newOrder": newOrder, "cardId": cardId, "status": status, "cardToUpdateStatus": cardToUpdateStatus})


@database_common.connection_handler
def delete_board(cursor, boardId):
    cursor.execute("""
                   DELETE FROM public.boards
                   WHERE id = %(boardId)s
                   """,
                   {"boardId": boardId})


@database_common.connection_handler
def delete_card(cursor, cardId):
    cursor.execute("""
                   DELETE FROM public.cards
                   WHERE id = %(cardId)s
                   """,
                   {"cardId": cardId})
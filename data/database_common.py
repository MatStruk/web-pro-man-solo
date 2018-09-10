import os
import psycopg2
import psycopg2.extras


def get_connection_string():
    username = os.environ.get("PSQL_USER_NAME", 'mateusz')
    password = os.environ.get("PSQL_PASSWORD", 'dupek666')
    host = os.environ.get('PSQL_HOST', 'localhost')
    database = os.environ.get('PSQL_DB_NAME', 'mateusz')
    defined_variables = username and password and host and database

    if defined_variables:
        return 'postgresql://{username}:{password}@{host}/{database}'.format(
            username=username,
            password=password,
            host=host,
            database=database
        )
    else:
        raise KeyError("Global variables not defined")


def open_database():
    try:
        connection = psycopg2.connect(get_connection_string())
        connection.autocommit = True
    except psycopg2.DatabaseError as exception:
        print("Problem with connection")
        raise exception
    return connection


def connection_handler(function):
    def wrapper(*args, **kwargs):
        connection = open_database()
        dict_cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret_value = function(dict_cur, *args, **kwargs)
        dict_cur.close()
        connection.close()
        return ret_value
    return wrapper

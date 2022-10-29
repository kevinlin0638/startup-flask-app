import os

import flask
import psycopg2
from flask import Flask, send_from_directory
from urllib.parse import urlparse

from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/data")
def get_data():
    return flask.jsonify({"data": 1})


def get_db_connection():
    result = urlparse(os.environ['DATABASE_URL'])
    username = result.username
    password = result.password
    database = result.path[1:]
    hostname = result.hostname
    port = result.port
    connection = psycopg2.connect(
        database=database,
        user=username,
        password=password,
        host=hostname,
        port=port
    )

    return connection


# @app.route('/api/your_path', methods=['GET', 'POST'])
# def api_name(req):  # put application's code here
#     conn = get_db_connection()
#     # create a cursor
#     cur = conn.cursor()

#     # select something from database
#     cur.execute('SELECT USERID FROM USER_TABLE WHERE USER_NAME='' AND USER_PASSWORD=''')
#
#     # display the PostgreSQL database server version
#     ret = cur.fetchmany()
#     print(ret)
#
#     # close the communication with the PostgreSQL
#     cur.close()
#     return flask.jsonify(ret)


if __name__ == '__main__':
    app.run()

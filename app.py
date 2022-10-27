import os
import psycopg2
from flask import Flask, send_from_directory
from urllib.parse import urlparse


app = Flask(__name__, static_url_path='', static_folder='frontend/build')


@app.route("/", defaults={'path': ''})
def serve():
    return send_from_directory(app.static_folder, 'index.html')


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
# def api_name():  # put application's code here
#     conn = get_db_connection()
#     # create a cursor
#     cur = conn.cursor()
#
#     # execute a statement
#     print('PostgreSQL database version:')
#     cur.execute('SELECT version()')
#
#     # display the PostgreSQL database server version
#     db_version = cur.fetchone()
#     print(db_version[0])

#     # select something from database
#     cur.execute('SELECT AAA FROM TABLE_BB WHERE TRUE')
#
#     # display the PostgreSQL database server version
#     ret = cur.fetchmany()
#     print(ret)
#
#     # close the communication with the PostgreSQL
#     cur.close()
#     return render_template('index.html', version=db_version[0])


if __name__ == '__main__':
    app.run()

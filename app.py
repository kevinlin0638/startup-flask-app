import json
import os

import flask
import psycopg2
from flask import Flask, send_from_directory, request
from urllib.parse import urlparse

from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/data", methods=['POST'])
def get_data():
    data = json.loads(request.get_data().decode("utf-8"))

    conn = get_db_connection()
    # create a cursor
    cur = conn.cursor()

    # select something from database
    semester = data["semester"]
    department = '%' if data["department"] == 'All' else data["department"]
    teacher = '%' if data["teacher"] == '' else data["teacher"]
    course = '%' if data["course"] == '' else data["course"]

    cur.execute("""
        SELECT cs.course_code, cs.course_name, cs.course_department, tc.teacher_name, cs.course_credit, cs.credit_hours, ter.year_term 
        FROM course_registration cr
        LEFT JOIN course cs on cs.course_key = cr.course_key
        LEFT JOIN teacher tc on tc.teacher_key = cr.teacher_key
        LEFT JOIN term ter on ter.term_key = cr.term_key
        WHERE
        ter.year_term = %s AND
        cs.course_department LIKE %s AND
        tc.teacher_name LIKE %s AND
        (
            cs.course_code LIKE %s OR cs.course_name LIKE %s
        )
    """, (semester, department, teacher, course, course))

    # display the PostgreSQL database server version
    ret = cur.fetchall()

    # close the communication with the PostgreSQL
    cur.close()
    return flask.jsonify({"data": ret})


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


if __name__ == '__main__':
    app.run()

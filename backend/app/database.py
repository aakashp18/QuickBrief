
import os
import pymysql
from dotenv import load_dotenv

load_dotenv()


def get_db_connection():
    db_host = os.getenv("DB_HOST")
    db_port = int(os.getenv("DB_PORT", "4000"))
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("PASSWORD")
    db_name = os.getenv("DB_NAME")

    if not db_password:
        raise RuntimeError(
            "PASSWORD is missing from the environment"
        )

    return pymysql.connect(
        host=db_host,
        port=db_port,
        user=db_user,
        password=db_password,
        database=db_name,
        cursorclass=pymysql.cursors.Cursor,
        ssl={"check_hostname": False},
    )

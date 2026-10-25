import os
import pymysql
from dotenv import load_dotenv

load_dotenv()


def get_db_connection():
    db_host = os.getenv("DB_HOST")
    db_port = int(os.getenv("DB_PORT", "4000"))
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_name = os.getenv("DB_NAME")

    # Check configuration without printing secrets
    missing = [
        name
        for name, value in {
            "DB_HOST": db_host,
            "DB_USER": db_user,
            "DB_PASSWORD": db_password,
            "DB_NAME": db_name,
        }.items()
        if not value
    ]

    if missing:
        raise RuntimeError(
            "Missing database environment variables: "
            + ", ".join(missing)
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


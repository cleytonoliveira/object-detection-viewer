import os
import psycopg2
from dotenv import load_dotenv, find_dotenv


env_file = find_dotenv(f'.env.{os.getenv("ENV", "development")}')
load_dotenv(env_file)


def get_db():
    conn = psycopg2.connect(
        dbname=os.environ['POSTGRES_DB'],
        user=os.environ['POSTGRES_USER'],
        password=os.environ['POSTGRES_PASSWORD'],
        host=os.environ['POSTGRES_HOST'],
        port=os.environ['POSTGRES_PORT']
    )

    return conn


if __name__ == "__main__":
    get_db()

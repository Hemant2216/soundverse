from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://root:Lz441af5qjA1g9biLkavuWE9Serg8Rdo@dpg-cvds4lpc1ekc73e9alo0-a.oregon-postgres.render.com/soundverse"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

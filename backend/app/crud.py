from sqlalchemy.orm import Session
from . import models, schemas

def get_artists(db: Session):
    return db.query(models.Artist).all()

def create_artist(db: Session, artist: schemas.ArtistCreate):
    db_artist = models.Artist(**artist.dict())
    db.add(db_artist)
    db.commit()
    db.refresh(db_artist)
    return db_artist

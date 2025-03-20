from pydantic import BaseModel

class ArtistBase(BaseModel):
    name: str
    genre: str
    description: str

class ArtistCreate(ArtistBase):
    pass

class ArtistResponse(ArtistBase):
    id: int
    name: str
    image_url: str
    genre: str

    class Config:
        from_attributes = True

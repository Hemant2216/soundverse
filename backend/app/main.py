from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.staticfiles import StaticFiles
import os
import shutil
import psycopg2
from datetime import datetime

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

conn = psycopg2.connect(
    dbname="soundverse",
    user="postgres",
    password="root",
    host="localhost",
    port="5432"
)

# Upload Image
@app.post("/upload/image/")
async def upload_image(file: UploadFile = File(...)):
    try:
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        image_url = f"http://localhost:8000/uploads/{file.filename}"

        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO images (image_url, uploaded_at) VALUES (%s, %s)", (image_url, datetime.now()))
            conn.commit()

        return {"filename": file.filename, "url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Upload Audio and Link to Artist
@app.post("/upload/audio/")
async def upload_audio(artist_id: int = Form(...), file: UploadFile = File(...)):
    try:
        # Save audio file
        file_extension = file.filename.split(".")[-1]
        if file_extension not in ["mp3", "wav", "ogg", "flac"]:
            raise HTTPException(status_code=400, detail="Unsupported file format.")

        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        audio_url = f"http://localhost:8000/uploads/{file.filename}"

        with conn.cursor() as cursor:
            cursor.execute("SELECT id FROM artists WHERE id = %s", (artist_id,))
            if cursor.fetchone() is None:
                raise HTTPException(status_code=404, detail="Artist not found.")
            
            cursor.execute("INSERT INTO audio_files (artist_id, audio_url, uploaded_at) VALUES (%s, %s, %s)",
                            (artist_id, audio_url, datetime.now()))
            conn.commit()

        return {"filename": file.filename, "audio_url": audio_url, "artist_id": artist_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Get Artist with Audio
@app.get("/artists/")
async def get_artist_with_audio():
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT a.id, a.name, a.genre, a.image_url, a.description, a.gen1, a.gen2, af.audio_url
                FROM artists a
                LEFT JOIN audio_files af ON a.id = af.artist_id
                ORDER BY a.id ASC;
            """)
            data = cursor.fetchall()
            if not data:
                raise HTTPException(status_code=404, detail="Artist not found.")
            print(data)
            response = [{
                "id": row[0],
                "name": row[1],
                "genre": row[2],
                "image_url": row[3],
                "description": row[4],
                "gen1": row[5],
                "gen2": row[6],
                "audio_url": row[7]
            } for row in data]
            return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

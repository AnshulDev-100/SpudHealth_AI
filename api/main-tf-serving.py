from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import requests
import os




app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Can be overridden in deployment
TF_SERVING_ENDPOINT = os.getenv(
    "TF_SERVING_ENDPOINT",
    "http://localhost:8501/v1/models/potatoes_model:predict"
)

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]
@app.get("/")
def root():
    return {"message": "Potato Disease Classifier API"}


@app.get("/ping")
async def ping():
    return {"status": "alive"}

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((256, 256))
    image = np.array(image).astype("float32") / 255.0
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, 0)

        payload = {"instances": img_batch.tolist()}

        response = requests.post(TF_SERVING_ENDPOINT, json=payload, timeout=5)

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=response.text)

        prediction = np.array(response.json()["predictions"][0])
        predicted_class = CLASS_NAMES[np.argmax(prediction)]
        confidence = float(np.max(prediction))

        return {"class": predicted_class, "confidence": confidence}

    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Model server unavailable")

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

uvicorn.run(app, host="127.0.0.1", port=8002)


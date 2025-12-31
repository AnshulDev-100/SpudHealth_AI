import tensorflow as tf
import os

# --- Get absolute path to project root ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- Path to your existing Keras model ---
KERAS_MODEL_PATH = os.path.join(BASE_DIR, "saved_models", "1.keras")

# --- Base directory where TF Serving models will live ---
TF_SERVING_BASE = os.path.join(BASE_DIR, "tf_serving_models", "potatoes_model")

print("Loading model from:", KERAS_MODEL_PATH)
model = tf.keras.models.load_model(KERAS_MODEL_PATH, compile=False)

# Create base folder if missing
os.makedirs(TF_SERVING_BASE, exist_ok=True)

# Auto-increment version number
existing_versions = [
    int(d) for d in os.listdir(TF_SERVING_BASE)
    if d.isdigit()
]

version = max(existing_versions, default=0) + 1
export_path = os.path.join(TF_SERVING_BASE, str(version))

os.makedirs(export_path, exist_ok=True)

# 🚀 Export in TensorFlow SavedModel format for TF Serving
model.export(export_path)

print("\n✅ TF Serving model exported successfully")
print(f"   Model name : potatoes_model")
print(f"   Version    : {version}")
print(f"   Location   : {export_path}")

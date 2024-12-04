from waitress import serve
from app.views import app

if __name__ == "__main__":
    serve(app, host="127.0.0.1", port=4343)

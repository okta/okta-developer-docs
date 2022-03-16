To enable [flask_cors](https://flask-cors.readthedocs.io/en/latest/), import and initialize it in your `app.py`: 

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

```
To enable [flask_cors](https://flask-cors.readthedocs.io/en/latest/), import and initialize it into your `app.py`: 

```python
from flask_cors import CORS

...

CORS(app)
```
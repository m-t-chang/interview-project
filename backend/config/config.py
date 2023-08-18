# This is where we could set various config options.
DEBUG = True

# This can be DEBUG, INFO, WARNING, ERROR or CRITICAL
LOG_LEVEL = "DEBUG"

import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

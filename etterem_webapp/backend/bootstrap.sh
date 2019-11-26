#!/bin/bash
export FLASK_APP=./src/main.py
export FLASK_DEBUG=1
source $(pipenv --venv)/Scripts/activate
flask run -h 0.0.0.0
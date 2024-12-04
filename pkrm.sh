#!/bin/bash
gunicorn -b 0.0.0.0:4343 run:app
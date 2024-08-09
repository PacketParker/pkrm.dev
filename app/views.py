import flask
import os
import discord
import dotenv
import hashlib
import secrets
import hmac
import json
import base64
import random

app = flask.Flask(__name__)
dotenv.load_dotenv()
webhook_url = os.getenv("WEBHOOK_URL")
hmac_key = random.randbytes(500)


@app.route("/", methods=["GET"])
def index():
    return flask.render_template("index.html")


@app.route("/about", methods=["GET"])
def about():
    return flask.render_template("about.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if flask.request.method == "GET":
        return flask.render_template("contact.html")

    if flask.request.method == "POST":
        try:
            # Decode payload
            data = json.loads(base64.b64decode(flask.request.form["altcha"]).decode())

            # Validate algorithm
            if data["algorithm"] != "SHA-256":
                return flask.render_template("contact.html", error=True)
            # Validate challenge
            expected_challenge = hashlib.sha256(
                (data["salt"] + str(data["number"])).encode()
            ).hexdigest()
            if data["challenge"] != expected_challenge:
                return flask.render_template("contact.html", error=True)
            # Validate signature
            signature = hmac.new(
                hmac_key, data["challenge"].encode(), hashlib.sha256
            ).hexdigest()
            if data["signature"] != signature:
                return flask.render_template("contact.html", error=True)

            # All checks passed, send off form data

            name = flask.request.form["name"]
            email = flask.request.form["email"]
            message = flask.request.form["message"]
            # Send the contact form to Discord via a webhook
            webhook = discord.SyncWebhook.from_url(webhook_url)

            embed = discord.Embed(
                title="New Message",
                description=f"**Name:** ` {name} `\n**Email:** ` {email} `\n**Message:** ` {message} `",
                color=0x85C0F7,
            )
            webhook.send(embed=embed)

            return flask.render_template("contact.html", success=True)
        # If any error happens for any reason, return the contact page with error
        except:
            return flask.render_template("contact.html", error=True)


@app.route("/altcha-challenge", methods=["GET"])
def altcha_challenge():
    salt = secrets.token_urlsafe(25)
    secret_number = random.randint(10000, 50000)

    challenge_data = f"{salt}{secret_number}".encode()
    challenge = hashlib.sha256(challenge_data).hexdigest()

    signature = hmac.new(hmac_key, challenge.encode(), hashlib.sha256).hexdigest()

    response = {
        "algorithm": "SHA-256",
        "challenge": challenge,
        "salt": salt,
        "signature": signature,
    }

    return flask.jsonify(response)


@app.route("/pgp", methods=["GET"])
def pgp():
    return flask.render_template("pgp.html")


@app.route("/parker.asc", methods=["GET"])
def parker():
    # Send the file to download
    return flask.send_file("static/parker.asc", as_attachment=True)

import flask
import os
import discord
import dotenv

app = flask.Flask(__name__)
app.secret_key = os.urandom(32)
dotenv.load_dotenv()
webhook_url = os.getenv("WEBHOOK_URL")

@app.route('/', methods=['GET'])
def index():
    return flask.render_template('index.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if flask.request.method == 'GET':
        return flask.render_template('contact.html')

    if flask.request.method == 'POST':
        try:
            name = flask.request.form['name']
            email = flask.request.form['email']
            message = flask.request.form['message']
            # Send the contact form to Discord via a webhook
            webhook = discord.SyncWebhook.from_url(webhook_url)

            embed = discord.Embed(
                title='New Message',
                description=f"**Name:** ` {name} `\n**Email:** ` {email} `\n**Message:** ` {message} `",
                color=0x85C0F7
            )
            webhook.send(embed=embed)

            return flask.render_template('contact.html', success=True)
        # If any error happens for any reason, return the contact page with error
        except:
            return flask.render_template('contact.html', error=True)
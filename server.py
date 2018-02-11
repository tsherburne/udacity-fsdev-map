from flask import Flask, url_for, render_template

app = Flask(__name__)

@app.route('/')
def main():
    return( render_template('index.html') )


if __name__ == '__main__':
    # When running locally, disable OAuthlib's HTTPs verification.
    # ACTION ITEM for developers:
    #     When running in production *do not* leave this option enabled.

    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=8080)
    
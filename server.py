from flask import Flask, url_for, render_template, jsonify
import requests
import os

API_KEY =  'nLl6mhrZl_Ek1sIK4UKCcf9jM3DV8WwQmzqyStRCQos1-7ClyzFBuEeabXBvBYSL1AZWvrfglQ6jZBPhgqrwnrWhsFw3xW_apAkXUsLOHeJ5pjtX_p9dJFYqW9V9WnYx'
API_HOST = 'https://api.yelp.com'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.

app = Flask(__name__)

# JSON yelp api endpoint
@app.route('/api/yelp/<string:yelp_id>/')
def apiYelp(yelp_id):

    url = API_HOST + BUSINESS_PATH + yelp_id

    headers = {
        'Authorization': 'Bearer nLl6mhrZl_Ek1sIK4UKCcf9jM3DV8WwQmzqyStRCQos1-7ClyzFBuEeabXBvBYSL1AZWvrfglQ6jZBPhgqrwnrWhsFw3xW_apAkXUsLOHeJ5pjtX_p9dJFYqW9V9WnYx'
    }
    
    response = requests.request('GET', url, headers=headers, params={})

    return jsonify(response.json())

@app.route('/')
def main():
    return( render_template('index.html') )


if __name__ == '__main__':
    # When running locally, disable OAuthlib's HTTPs verification.
    # ACTION ITEM for developers:
    #     When running in production *do not* leave this option enabled.
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=8080)
    
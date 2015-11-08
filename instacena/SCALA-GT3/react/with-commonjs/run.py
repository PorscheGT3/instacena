from flask import Flask, render_template, jsonify, request, session, url_for,redirect, flash, send_from_directory
import ast
import sys, os

app = Flask(__name__)
host='0.0.0.0'
host_port='5000'
audio_stream_port='8081'

hashm = {'count': 0}


@app.route('/')
def index():
    complete_path = os.path.realpath(__file__) + '/../../with-commonjs'
    complete_path = os.path.abspath(complete_path)
    return send_from_directory(complete_path, 'index.html')


@app.route('/get_link/<url>/<start_time>/<end_time>/<custom_link_part>')
def produce_link(url, start_time, end_time, custom_link_part):
    t = hashm['count'] +1
    hashm[str(t)] = [url, start_time, end_time, custom_link_part]
    hashm['count'] = t
    return jsonify({'cena_url':'http://localhost:5000/bizghj/'+custom_link_part+'/'+str(t)})


@app.route('/bizghj/<custom_link_part>/<stuped_key>')
def get_lols(custom_link_part, stuped_key):
    parms = hashm[str(stuped_key)]  
    # sGbxmsDFVnE
    return render_template('template.html', url=parms[0], start_time=parms[1], end_time=parms[2])

if __name__ == '__main__':


    if sys.argv[1] != 'dev':
        host = sys.argv[1] 
        host_port = sys.argv[2]
        audio_stream_port=sys.argv[3]
        app.run(host=host, port=int(host_port))
    else:
        app.run(host= '0.0.0.0')



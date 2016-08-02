
import cherrypy
import os
import ast
from optparse import OptionParser
from jinja2 import Environment, FileSystemLoader

class Root:
    hashm = {'count': 0}    

    @cherrypy.expose
    def bizghj(self, custom_link, key):
        env = Environment(loader=FileSystemLoader(os.path.join(os.path.dirname(os.path.realpath(__file__)),'templates')))
        parms = self.hashm[str(key)]
        tmpl = env.get_template('template.html')
        return tmpl.render(url=parms[0], start_time=parms[1], end_time=parms[2])

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def get_link(self, url, start_time, end_time, custom_link_part):
        t = self.hashm['count'] +1
        self.hashm[str(t)] = [url, start_time, end_time, custom_link_part]
        self.hashm['count'] = t
        return {'cena_url':'http://192.168.99.100:5000/bizghj/'+custom_link_part+'/'+str(t)}


if __name__ == '__main__':
    
    conf = {
        '/': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.dirname(os.path.realpath(__file__)),'static'),
             'tools.staticdir.index': 'index.html'
         },
          '/static': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': os.path.join(os.path.dirname(os.path.realpath(__file__)),'static')
         }
     }


    parser = OptionParser()
    parser.add_option("-p", "--server_port",
                  action="store", type="string", dest="server_port", help="Port that the server will run from")
    parser.add_option("-i", "--server_ip",
                  action="store", type="string", dest="server_ip", help="Host IP")
    parser.add_option("--dev", action="store_true", help="Developer view. Accept all conections (host=0.0.0.0)")

    (options, args) = parser.parse_args()

    if options.server_port and options.server_ip:

        host_port = options.server_port
        audio_stream_port = options.server_port
        host = options.server_ip

        cherrypy.config.update({'server.socket_host': host , 'server.socket_port': int(host_port)})
        cherrypy.quickstart(Root(), '/', config=conf)
    elif options.dev: 
        print 'dev not configured'
    else:
        parser.print_help()










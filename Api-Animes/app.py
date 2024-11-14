from flask import *
from flask_cors import CORS
from models.models import *
from routes.filmes.filmes_routes import filme_bp
from routes.animes.animes_routes import anime_bp
from routes.episodios.episodios_routes import episodio_bp
from routes.comentarios.comentarios_routes import comentario_bp
from routes.generos.generos_routes import genero_bp
from routes.favoritos.favoritos_routes import favorito_bp
from routes.cadastro.cadastro_route import cadastro_bp
from routes.login.login_route import login_bp
from routes.logout.logout_route import logout_bp

import datetime


app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = False
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


#################################################

app.register_blueprint(filme_bp, url_prefix = "/filme") # v1
app.register_blueprint(anime_bp, url_prefix = "/anime") # v1
app.register_blueprint(episodio_bp, url_prefix = "/episodio") # v1
app.register_blueprint(comentario_bp, url_prefix="/comentario")
app.register_blueprint(favorito_bp, url_prefix=("/favoritos"))

# IMprimi as rotas registradas
print("Rotas registradas:")
for rule in app.url_map.iter_rules():
    print(rule)
    
#################################################

@app.route('/date')
def getDate():
    current_date = datetime.datetime.now()
    # Formata a data no formato desejado: DD/MM/YYYY
    formatted_date = current_date.strftime("%d/%m/%Y")
    expiration_time = datetime.datetime.now(datetime.UTC) + datetime.timedelta(seconds=30)
    print(current_date, expiration_time)
    return formatted_date




@app.route('/')
def index():

    return 'No Ar...'


if __name__ == '__main__':
    app.run(debug=True)

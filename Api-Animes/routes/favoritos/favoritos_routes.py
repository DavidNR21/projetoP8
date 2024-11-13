from flask import Blueprint, request, jsonify
from models.models import Favorito

favorito_bp = Blueprint('faviritos', __name__)

@favorito_bp.route("/adicionar_Favorito", methods=["POST"])
def adicionar_favorito():
    data = request.get_json()
    media_id = data.get("media_id")
    tipo = data.get("tipo")
    usuario = data.get("usuario")
    texto = data.get("texto")

    if tipo not in ["anime", "filme"]:
        return jsonify({"error": "Topo invalido. USe 'anime' ou 'filme'."}), 400

    if not texto:  # Verifique se o campo texto está vazio
        return jsonify({"error": "O campo 'texto' é obrigatório."}), 400
    
    favorito = Favorito.create(
        media_id=media_id, 
        tipo=tipo, 
        usuario=usuario,
        texto="texto") #texto="Favorito"

    # Usando dict() para converter o objeto para dicionário
    return jsonify(favorito._data), 201
   # return jsonify(favorito.to_json()), 201


@favorito_bp.route("/listar_Favoritos/<string:usuario>", methods=["GET"])
def listar_favoritos(usuario):
    tipo = request.args.get("tipo")
    query = Favorito.select().where(Favorito.usuario == usuario)

    if tipo:
        query = query.where(Favorito.tipo == tipo)

    return jsonify([favorito.to_json() for favorito in query])
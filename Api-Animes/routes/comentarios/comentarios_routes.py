from models.models import Comentario
from flask import Blueprint, request, jsonify
from datetime import datetime
from flask import Response
import json

comentario_bp = Blueprint('comentarios', __name__)


@comentario_bp.route("/novo_Comentario", methods = ["POST"])
def adicionar_comentario():
    data = request.get_json()
    media_id = data.get("media_id")
    tipo = data.get("tipo")
    usuario = data.get("usuario")
    texto = data.get("texto")

    if tipo not in ["anime", "filme"]:
        return jsonify({"error": "Tipo invalido. Uese 'anime' ou 'filme'."}), 400

    comentario = Comentario.create(
        media_id=media_id, 
        tipo=tipo, 
        usuario=usuario, 
        texto=texto,
        criadoEm=datetime.utcnow()
        )
    return jsonify(comentario.to_json()), 201

@comentario_bp.route("/listar_Comentario/<int:media_id>", methods=["GET"])
def listar_comentarios(media_id) :
    tipo = request.args.get("tipo")
    comentarios = Comentario.select().where(
        (Comentario.media_id == media_id) & (Comentario.tipo == tipo))

    comentarios_json = json.dumps(
        [comentario.to_json() for comentario in comentarios], ensure_ascii=False)

   # return Response((comentarios_json), mimetype = 'application/json; charset=utf-8')
    return jsonify([comentario.to_json() for comentario in comentarios])
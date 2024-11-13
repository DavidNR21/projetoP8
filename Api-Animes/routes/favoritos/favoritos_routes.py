from flask import Blueprint, request, jsonify
from flask_cors import CORS
from models.models import*
#from models.models import Favorito
from playhouse.shortcuts import model_to_dict

favorito_bp = Blueprint('faviritos', __name__)
CORS(favorito_bp)

#Rota para add um favorito
@favorito_bp.route("/add_Favorito", methods=["POST"])
def add_favorito():
    try:
        data = request.get_json()
        print("Dados recebidos:", data)  # Log dos dados recebidos

        media_id = data.get('media_id')
        tipo = data.get('tipo')
        usuario = data.get('usuario')

        # Verifica se os campos necessários foram fornecidos
        if not media_id or not tipo or not usuario:
            return jsonify({"error": "Campos 'media_id', 'tipo' ou 'usuario' ausentes!"}), 400

        print("Tipo recebido:", tipo)  # Log para verificação do tipo

        # Dependendo do tipo, procuramos o anime ou o filme
        if tipo == "anime":
            media = Animes.get_or_none(Animes.id == media_id)
        elif tipo == "filme":
            media = Filmes.get_or_none(Filmes.id == media_id)
        else:
            return jsonify({"error": "Tipo inválido! Use 'anime' ou 'filme'."}), 400

        if not media:
            return jsonify({"error": f"{tipo.capitalize()} não encontrado!"}), 404

        # Log do nome encontrado
        print("Anime ou filme encontrado:", media.name)

        # Criação do favorito, salvando o nome do anime ou filme
        Favorito.create(media_id=media.id, nome_media=media.name,
                        tipo=tipo, usuario=usuario)

        # Resposta de sucesso
        return jsonify({"message": f"{tipo.capitalize()} '{media.name}' adicionado aos favoritos!"}), 200

    except Exception as e:
        print("Erro ao processar requisição:", e)  # Log de erro
        return jsonify({"error": str(e)}), 400
    


#Rota que lista os favoritos
@favorito_bp.route("/favoritos/<string:usuario>", methods=["GET"])
def get_favoritos(usuario):
    try:
        # BUsca os favoritos do usuario
        favoritos = Favorito.select().where(Favorito.usuario == usuario)

        favoritos_list = []
        for favorito in favoritos:
            if favorito.tipo == 'anime':
                media = Animes.get_or_none(Animes.id == favorito.media_id)
            elif favorito.tipo == 'filme':
                media = Filmes.get_or_none(Filmes.id == favorito.media_id)
            else:
                continue  # Caso o tipo não seja válido

            if media:
                favoritos_list.append({
                    "id": media.id,
                    "name": media.name,
                    "poster": media.poster if hasattr(media, 'poster') else None # Mostrar a capa
                })
            else:
                favoritos_list.append({
                    "id": favorito.media_id,
                    "name": f"{favorito.tipo.capitalize} não encontrado!",
                    "erros": f"{favorito.tipo.capitalixe()} com ID {favorito.media_id} não encontrado"
                })

        return jsonify(favoritos_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

#Rota para remover dos favoritos
@favorito_bp.route('/delete_favorito/<int:anime_id>', methods=['DELETE'])
def remove_favorito(anime_id):
    try:
        #Busca o favorito com omedia_id correspondente ao anime_id
        favorito = Favorito.get_or_none(Favorito.media_id == anime_id)

        if not favorito:
            return jsonify({"rror": "Anime removido nos favoritos com suceso!"}), 404

        #remove o favorito encontrado
        favorito.delete_instance()

        return jsonify({"message": "Anime removido dos favoritos com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

#Rota para exibir detalhes dos animes favoritos
@favorito_bp.route('/detalhe_favorito/<int:anime_id>', methods=['GET'])
def get_favorito_Detalhe(anime_id):
    try:
        # Busca o favorito usando o media_id
        favorito = Favorito.get_or_none(Favorito.media_id == anime_id)

        if not favorito:
            return jsonify({"erro": "Favorito não encontrado!"}); 404

        # Dependendo do tipo (anime ou filme), buscamos a mídia correspondente
        if favorito.tipo == 'anime':
            media = Animes.get_or_none(Animes.id == favorito.media_id)
        elif favorito.tipo == 'filme':
            media == Filmes.get_or_none(Filmes.id == favorito.media_id)
        else:
            return jsonify({"error": "Tipo de midia invalido!"}), 400

        if not media:
            return jsonify({"erro": "Midia não encontrada!"}), 404

        media_dict = model_to_dict(media)
        return jsonify(media_dict), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
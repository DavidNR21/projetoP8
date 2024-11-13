from flask import Blueprint, request, jsonify
from flask_cors import CORS
from models.models import *
from playhouse.shortcuts import model_to_dict

anime_bp = Blueprint('animes',__name__)
CORS(anime_bp)


# Rotas GET
@anime_bp.route('/', methods=['GET'])
def getAnimes(): # raiz '/' retorna todos de forma decrescente. /?size=12 retorna o 12 animes... . '/?filter=name_Naruto retorna animes que contem nome Naruto, '
    try:
        size = request.args.get('size', type=int)
        pag = request.args.get('pag', default=1, type=int)
        order_by = request.args.get('order_by', type=str)
        filter_field = request.args.get('filter', type=str)


        if order_by:
            query = Animes.select()

            direction = order_by[0]
            field_name = order_by[1:]

            if hasattr(Animes, field_name):
                field = getattr(Animes, field_name)

                if direction == '-':
                    query = query.order_by(field.desc()).paginate(pag, 15)
                else:
                    query = query.order_by(field.asc()).paginate(pag, 15)

                anime_order_dict = [model_to_dict(f) for f in query]

                response = {
                    "pag" : pag,
                    "results" : anime_order_dict
                }

                return jsonify(response), 200

            else:
                return jsonify({'error': f'Invalid order_by field: {field_name}'}), 400


        if size:
            anime_size = Animes.select().order_by(Animes.id.desc()).paginate(pag, size)

            anime_size_dict = [model_to_dict(f) for f in anime_size]

            response = {
                "pag" : pag,
                "results" : anime_size_dict
            }

            return jsonify(response), 200
        

        if filter_field is not None:
            query_contain = Animes.select()

            column = filter_field.split('_')[0]
            param = filter_field.split('_')[1]

            search_field_attr = getattr(Animes, column)

            print(column, param)
    
            anime_contain = query_contain.where(search_field_attr.contains(param))

            anime_contain_dict = [model_to_dict(f) for f in anime_contain]

            response = {
                "pag" : pag,
                "results" : anime_contain_dict
            }

            return jsonify(response), 200


        anime = Animes.select().where(Animes.active == True).order_by(Animes.id.desc()).paginate(pag, 20)

        anime_dict = [model_to_dict(f) for f in anime]

        response = {
            "pag" : pag,
            "results" : anime_dict
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@anime_bp.route('/details/<string:titulo>', methods=['GET'])
def getAnimes_details(titulo):

    try:
        animes = Animes.select().where((Animes.active == True) & (Animes.name == titulo))

        animes_dict = [model_to_dict(a) for a in animes]

        return jsonify(animes_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@anime_bp.route('/add', methods=['POST'])
def criarAnime():
    try:
        data = request.get_json()

        if type(data) == list:
            n = len(data)

            for Ani in data:
                
                Animes.create(
                    name = Ani['nome'],
                    overview = Ani['sinopse'],
                    poster = Ani['img_path'],
                    active = Ani['active'],
                    back_drop_img = Ani['back_drop_img'],
                    genres = Ani['generos'],
                    rating = Ani['avalicaoes'],
                    dubbing = Ani['dublagem'],
                    subTitles = Ani['subTitulo'],
                    releaseDate = Ani['dataLancamento'],
                    seasonNumber = Ani['tempNumber'],
                    adult = Ani['adult'],
                    download = False
                )


            return jsonify({'msg': f'Animes Adicionados, tamanho: {n}!'}), 200


        required_fields = ['nome', 'dublagem', 'sinopse', 'tempNumber']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} ausente ou vazio!'}), 400
        
        download = False

        if data['download'] == 'true':
            download = True


        Animes.create(
            name = data['nome'],
            overview = data['sinopse'],
            poster = data['img_path'],
            active = data['active'],
            back_drop_img = data['back_drop_img'],
            genres = data['generos'],
            rating = data['avalicaoes'],
            dubbing = data['dublagem'],
            subTitles = data['subTitulo'],
            releaseDate = data['dataLancamento'],
            seasonNumber = data['tempNumber'],
            adult = data['adult'],
            download = download
        )


        response = {
            "message": "Dados JSON recebidos e processados com sucesso"
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print(e)
        return jsonify(error_message), 400



@anime_bp.route('/update/<int:id>', methods=['PUT'])
def updateAnime(id):
    try:
        data = request.get_json()

        query = Animes.update(**data).where(Animes.id == id)

        query.execute()

        response = {
            "message": f"Anime com ID: {id} foi atualizado com sucesso.",
        }

        return jsonify(response), 200

    except Animes.DoesNotExist:
        error_message = {"error": f"Anime com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    



@anime_bp.route('/delete/<string:nome>', methods=['DELETE'])
def deleteAnime(nome):
    try:
        Anime_delete = Animes.get(Animes.name == nome)

        Anime_delete.delete_instance()

        response = {
            "message": f"Anime chamado: {nome} foi deletado com sucesso.",
        }

        return jsonify(response), 200

    except Animes.DoesNotExist:
        error_message = {"error": f"Anime com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@anime_bp.route('/filtrar', methods=['GET'])
def getAnimes_filter(): # usado para fazer a filtragem e tbm mostar a quantidade de animes, para paginação 
    try:
        pag = request.args.get('pag', default=1, type=int)
        filter_field = request.args.get('item', type=str)
        

        if filter_field is not None:
            query_contain = Animes.select()

            column = filter_field.split('_')[0]
            param = filter_field.split('_')[1]

            search_field_attr = getattr(Animes, column)

            print(column, param)
    
            anime_contain_count = query_contain.where(search_field_attr.contains(param)) # count
    
            anime_contain = query_contain.where(search_field_attr.contains(param)).paginate(pag, 20) # principal

            anime_contain_dict = [model_to_dict(f) for f in anime_contain]

            anime_count = [model_to_dict(l) for l in anime_contain_count]

            #print(len(anime_count))

            response = {
                "pag" : pag,
                "count" : len(anime_count),
                "results" : anime_contain_dict
            }

            return jsonify(response), 200


    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400


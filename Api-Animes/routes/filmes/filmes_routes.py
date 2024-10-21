from flask import Blueprint, request, jsonify
from flask_cors import CORS
from models.models import *
from playhouse.shortcuts import model_to_dict

filme_bp = Blueprint('filmes',__name__)
CORS(filme_bp)


# Rotas GET
@filme_bp.route('/', methods=['GET'])
def getFilmes():
    try:
        size = request.args.get('size', type=int)
        pag = request.args.get('pag', default=1, type=int)
        order_by = request.args.get('order_by', type=str)
        filter_field = request.args.get('filter', type=str)


        if order_by:
            query = Filmes.select()

            direction = order_by[0]
            field_name = order_by[1:]

            if hasattr(Filmes, field_name):
                field = getattr(Filmes, field_name)

                if direction == '-':
                    query = query.order_by(field.desc()).paginate(pag, 15)
                else:
                    query = query.order_by(field.asc()).paginate(pag, 15)

                filme_order_dict = [model_to_dict(f) for f in query]

                response = {
                    "pag" : pag,
                    "results" : filme_order_dict
                }

                return jsonify(response), 200

            else:
                return jsonify({'error': f'Invalid order_by field: {field_name}'}), 400


        if size:
            filme_size = Filmes.select().order_by(Filmes.id.desc()).paginate(pag, size)

            filme_size_dict = [model_to_dict(f) for f in filme_size]

            response = {
                "pag" : pag,
                "results" : filme_size_dict
            }

            return jsonify(response), 200
        

        if filter_field is not None:
            query_contain = Filmes.select()

            column = filter_field.split('_')[0]
            param = filter_field.split('_')[1]

            search_field_attr = getattr(Filmes, column)

            print(column, param)
    
            filme_contain = query_contain.where(search_field_attr.contains(param))

            filme_contain_dict = [model_to_dict(f) for f in filme_contain]

            response = {
                "pag" : pag,
                "results" : filme_contain_dict
            }

            return jsonify(response), 200


        filme = Filmes.select().where(Filmes.active == True).order_by(Filmes.id.desc()).paginate(pag, 20)

        filme_dict = [model_to_dict(f) for f in filme]

        response = {
            "pag" : pag,
            "results" : filme_dict
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@filme_bp.route('/details/<string:titulo>', methods=['GET'])
def getFilmes_details(titulo):

    try:
        films = Filmes.select().where((Filmes.active == True) & (Filmes.name == titulo))

        films_dict = [model_to_dict(f) for f in films]

        return jsonify(films_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@filme_bp.route('/add', methods=['POST'])
def criarFilme():
    try:
        data = request.get_json()

        if type(data) == list:
            n = len(data)

            for fil in data:
                
                Filmes.create(
                    name = fil['nome'],
                    overview = fil['sinopse'],
                    active = True,
                    poster = fil['img_path'],
                    back_drop_img = fil['back_img'],
                    url = fil['url'],
                    genres = fil['generos'],
                    rating = fil['avaliacoes'],
                    dubbing = fil['dublagem'],
                    subTitles = fil['subTitulo'],
                    duration = fil['duracao'],
                    releaseDate = fil['dataLancamento'],
                    adult = fil['adult'],
                    download = False
                )


            return jsonify({'msg': f'Filmes Adicionados, tamanho: {n}!'}), 200


        required_fields = ['nome', 'url', 'dublagem', 'sinopse']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} ausente ou vazio!'}), 400
        
        download = False

        if data['download'] == 'true':
            download = True


        Filmes.create(
            name = data['nome'],
            overview = data['sinopse'],
            active = True,
            poster = data['img_path'],
            back_drop_img = data['back_img'],
            url = data['url'],
            genres = data['generos'],
            rating = data['avaliacoes'],
            dubbing = data['dublagem'],
            subTitles = data['subTitulo'],
            duration = data['duracao'],
            releaseDate = data['dataLancamento'],
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



@filme_bp.route('/update/<int:id>', methods=['PUT'])
def updateFilme(id):
    try:
        data = request.get_json()

        query = Filmes.update(**data).where(Filmes.id == id)

        query.execute()

        response = {
            "message": f"Filme com ID: {id} foi atualizado com sucesso.",
        }

        return jsonify(response), 200

    except Filmes.DoesNotExist:
        error_message = {"error": f"Filme com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    



@filme_bp.route('/delete/<string:nome>', methods=['DELETE'])
def deleteFilme(nome):
    try:
        filme_delete = Filmes.get(Filmes.name == nome)

        filme_delete.delete_instance()

        response = {
            "message": f"Filme chamado: {nome} foi deletado com sucesso.",
        }

        return jsonify(response), 200

    except Filmes.DoesNotExist:
        error_message = {"error": f"Filme com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



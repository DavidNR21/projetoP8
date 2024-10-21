from flask import Blueprint, request, jsonify
from flask_cors import CORS
from models.models import *
from playhouse.shortcuts import model_to_dict

episodio_bp = Blueprint('episodios',__name__)
CORS(episodio_bp)


# Rotas GET
@episodio_bp.route('/', methods=['GET'])
def getEpisodios():
    try:
        size = request.args.get('size', type=int)
        pag = request.args.get('pag', default=1, type=int)
        order_by = request.args.get('order_by', type=str)
        filter_field = request.args.get('filter', type=str)


        if order_by:
            query = Episodios.select()

            direction = order_by[0]
            field_name = order_by[1:]

            if hasattr(Episodios, field_name):
                field = getattr(Episodios, field_name)

                if direction == '-':
                    query = query.order_by(field.desc()).paginate(pag, 15)
                else:
                    query = query.order_by(field.asc()).paginate(pag, 15)

                Episodio_order_dict = [model_to_dict(f) for f in query]

                response = {
                    "pag" : pag,
                    "results" : Episodio_order_dict
                }

                return jsonify(response), 200

            else:
                return jsonify({'error': f'Invalid order_by field: {field_name}'}), 400


        if size:
            Episodio_size = Episodios.select().order_by(Episodios.id.desc()).paginate(pag, size)

            Episodio_size_dict = [model_to_dict(f) for f in Episodio_size]

            response = {
                "pag" : pag,
                "results" : Episodio_size_dict
            }

            return jsonify(response), 200
        

        if filter_field is not None:
            query_contain = Episodios.select()

            column = filter_field.split('_')[0]
            param = filter_field.split('_')[1]

            search_field_attr = getattr(Episodios, column)

            print(column, param)
    
            episodio_contain = query_contain.where(search_field_attr.contains(param))

            episodio_contain_dict = [model_to_dict(f) for f in episodio_contain]

            response = {
                "pag" : pag,
                "results" : episodio_contain_dict
            }

            return jsonify(response), 200


        episodio = Episodios.select().where(Episodios.active == True).order_by(Episodios.id.desc()).paginate(pag, 20)

        episodio_dict = [model_to_dict(f) for f in episodio]

        response = {
            "pag" : pag,
            "results" : episodio_dict
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@episodio_bp.route('/details/<string:titulo>/<int:temp>', methods=['GET'])
def getEpisodios_details(titulo, temp):
    try:
        episodios = Episodios.select().where((Episodios.active == True) & (Episodios.name == titulo) & (Episodios.seasonNumber == temp))

        episodio_dict = [model_to_dict(e) for e in episodios]

        response = {
            "results": episodio_dict
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@episodio_bp.route('/add', methods=['POST'])
def criarEpisodio():
    try:
        data = request.get_json()

        if type(data) == list:
            n = len(data)

            for epi in data:
                
                Episodios.create(
                    name = epi['nome'],
                    active = True,
                    seasonNumber = epi['tempNumber'],
                    episodioNumber = epi['epNumber'],
                    url = epi['url']
                )


            return jsonify({'msg': f'Episodios Adicionados, tamanho: {n}!'}), 200

        required_fields = ['nome', 'url', 'epNumber', 'tempNumber']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} ausente ou vazio!'}), 400


        Episodios.create(
            name = data['nome'],
            active = True,
            seasonNumber = data['tempNumber'],
            episodioNumber = data['epNumber'],
            url = data['url']
        )


        response = {
            "message": "Dados JSON recebidos e processados com sucesso"
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@episodio_bp.route('/update/<string:id>', methods=['PUT'])
def updateEpisodio(id):
    try:
        data = request.get_json()

        query = Episodios.update(**data).where(Episodios.id == id)

        query.execute()

        response = {
            "message": f"Episodio com ID: {id} foi atualizado com sucesso.",
        }

        return jsonify(response), 200

    except Episodios.DoesNotExist:
        error_message = {"error": f"Episodio com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    



@episodio_bp.route('/delete/<string:id>', methods=['DELETE'])
def deleteEpisodio(id):
    try:
        episodio_delete = Episodios.get(Episodios.id == id)

        episodio_delete.delete_instance()

        response = {
            "message": f"Episodio chamado: {id} foi deletado com sucesso.",
        }

        return jsonify(response), 200

    except Episodios.DoesNotExist:
        error_message = {"error": f"Episodio com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@episodio_bp.route('/releaseEp', methods=['GET'])
def siteEpisodio():
    try:
        # Consulta para obter episódios e dados relacionados de animes
        episodio_release = Episodios.select().order_by(Episodios.criadoEm.desc()).limit(12)
        
        # Converte a lista de objetos Episodios em dicionários
        Episodio_release_dict = [model_to_dict(f) for f in episodio_release]

        dados = []

        for i in Episodio_release_dict:
            #print("{ " + i.get('name') + ", " + str(i.get('seasonNumber')) + ", " + str(i.get('episodioNumber')) + " }")

            query_info = Animes.select().where(Animes.name == i.get('name'))

            infos = [model_to_dict(p) for p in query_info]

            md = {
                "name" : i.get('name'),
                "seasonNumber" : i.get('seasonNumber'),
                "episodioNumber" : i.get('episodioNumber'),
                "info" : infos
            }

            dados.append(md)



        response = {
            "results": dados
        }

        return jsonify(response), 200

    except Episodios.DoesNotExist:
        error_message = {"error": "Nenhum episódio encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400




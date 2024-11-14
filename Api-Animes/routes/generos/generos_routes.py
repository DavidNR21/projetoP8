from flask import Blueprint, request, jsonify
from flask_cors import CORS
from models.models import *
from playhouse.shortcuts import model_to_dict

genero_bp = Blueprint('generos',__name__)

# Rotas GET
@genero_bp.route('/', methods=['GET'])
def getGeneros():

    try:
        gens = Generos.select().where(Generos.active == True).limit(50)

        gen_dict = [model_to_dict(g) for g in gens]

        response = {
            "results": gen_dict
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400



@genero_bp.route('/details/<string:titulo>', methods=['GET'])
def getGeneros_details(titulo):

    try:
        gens = Generos.select().where(Generos.active == True & (Generos.titulo == titulo))

        gen_dict = [model_to_dict(g) for g in gens]

        return jsonify(gen_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400


@genero_bp.route('/add', methods=['POST'])
def criarGenero():
    try:
        data = request.get_json()

        required_fields = ['titulo']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} ausente ou vazio!'}), 400
            
        Generos.create(
            active = True,
            titulo = data['titulo']
        )


        response = {
            "message": "Dados JSON recebidos e processados com sucesso"
        }

        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 400


@genero_bp.route('/update/<string:id>', methods=['PUT'])
def updateGenero(id):
    try:
        data = request.get_json()

        query = Generos.update(**data).where(Generos.id == id)

        query.execute()

        response = {
            "message": f"Genero com ID: {id} foi atualizado com sucesso.",
        }

        return jsonify(response), 200

    except Generos.DoesNotExist:
        error_message = {"error": f"Genero com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    



@genero_bp.route('/delete/<string:nome>', methods=['DELETE'])
def deleteGenero(nome):
    try:
        gen_delete = Generos.get(Generos.titulo == nome)

        gen_delete.delete_instance()

        response = {
            "message": f"Genero chamado: {nome} foi deletado com sucesso.",
        }

        return jsonify(response), 200

    except Generos.DoesNotExist:
        error_message = {"error": f"Genero com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400




# rotas de filtro
@genero_bp.route('/v1/filter', methods=['GET'])
def filter_gen():
    try:

        # paginacao = .select().order_by(Tweet.id).paginate(2, 10):
        #.select().order_by(Tweet.created_date):
        #.select().count()

        if 'size' in request.args.keys():
            query = Generos.select().where((Generos.active == True) & (Generos.id <= request.args['size']))
            print(query)

        else:
            return jsonify({'message':'erro nos parametros'}), 400
        

        filter_dict = [model_to_dict(f) for f in query]

        response = {
            "result" : filter_dict
        }

        return jsonify(response), 200

    except Generos.DoesNotExist:
        error_message = {"error": "Genero não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400

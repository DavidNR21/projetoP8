from flask import Blueprint, request, jsonify
from models.models import Usuario

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        senha = data.get('senha')

        usuario = Usuario.select().where(Usuario.email == email).first()

        #verifica a senha
        if not usuario or not usuario.check_password(senha):
            return jsonify({"error": "Email ou senha invalidos!"}), 400

        return jsonify({"message": "Login realizado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
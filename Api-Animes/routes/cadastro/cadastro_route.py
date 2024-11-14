from flask import Blueprint, request, jsonify
from models.models import Usuario
from werkzeug.security import generate_password_hash
import bcrypt  # certifique-se de que bcrypt está importado

cadastro_bp = Blueprint('cadastro', __name__)


@cadastro_bp.route('/cadastro', methods=['POST'])
def cadastro_usuario():
    try:
        data = request.get_json()
        email = data.get('email')
        nome = data.get('nome')
        senha = data.get('senha')

        # Verifica se os campos foram preenchidos
        if not nome or not senha or not email:
            return jsonify({"error": "Nome, email e senha são necessários!"}), 400

        # Verifica se o email já existe
        if Usuario.select().where(Usuario.email == email).exists():
            return jsonify({"error": "Email já existe"}), 400

        # Cria um novo usuário e armazena a senha como hash
        hashed_senha = bcrypt.hashpw(senha.encode(
            'utf-8'), bcrypt.gensalt())  # criptografa a senha
        usuario = Usuario.create(email=email, nome=nome, senha=hashed_senha.decode(
            'utf-8'))  # salva a senha criptografada
        usuario.save()

        return jsonify({"message": "Usuário registrado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

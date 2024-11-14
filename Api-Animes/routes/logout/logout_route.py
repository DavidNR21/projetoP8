from flask import Blueprint, jsonify, session
from flask_cors import CORS


logout_bp = Blueprint('logout', __name__)
CORS(logout_bp)

@logout_bp.route('/logout', methods=["POST"])
def logout():
    try:

        session.clear() #remove dados da sessão

        return jsonify({"message": "Logout realizado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
from flask import Blueprint, jsonify, session

logout_bp = Blueprint('logout', __name__)

@logout_bp.route('/logout', methods=["POST"])
def logout():
    try:

        session.clear() #remove dados da sessão

        return jsonify({"message": "Logout realizado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
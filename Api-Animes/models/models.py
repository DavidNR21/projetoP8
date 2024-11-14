from peewee import *
from datetime import datetime
import uuid
import json
import hashlib
import bcrypt


db = PostgresqlDatabase('senpaiAnimes',port=5432,user='postgres',password='mk875')


class BaseModel(Model):
    class Meta():
        database = db



class Animes(BaseModel):
    id = AutoField(primary_key=True)
    name = CharField(max_length=200)
    overview = TextField()
    poster = TextField()
    active = BooleanField()
    back_drop_img = TextField()
    genres = TextField()
    rating = TextField()
    dubbing = TextField()
    subTitles = TextField()
    releaseDate = DateField()
    seasonNumber = IntegerField()
    adult = BooleanField()
    download = BooleanField()
    criadoEm = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    def to_json(self):
        data = {
            self
        }

        return json.dumps(data)


class Filmes(BaseModel):
    id = AutoField(primary_key=True)
    name = CharField(max_length=200)
    overview = TextField()
    active = BooleanField()
    poster = TextField()
    back_drop_img = TextField()
    url = TextField()
    genres = TextField()
    rating = TextField()
    dubbing = TextField()
    subTitles = TextField()
    duration = TextField()
    releaseDate = DateField()
    adult = BooleanField()
    download = BooleanField()
    criadoEm = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    def to_json(self):
        data = {
            self
        }

        return json.dumps(data)


class Episodios(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    name = CharField(max_length=200)
    active = BooleanField()
    seasonNumber = IntegerField()
    episodioNumber = IntegerField()
    url = TextField()
    criadoEm = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    def to_json(self):
        data = {
            self
        }

        return json.dumps(data)

class Comentario (BaseModel):
    id = AutoField(primary_key = True)
    media_id = IntegerField() #Id do anime ou do filme
    tipo = CharField(max_length = 100)
    usuario = CharField(max_length = 100)
    texto = TextField()
    criadoEm = DateTimeField(default=datetime.utcnow)

    def to_json(self):
        return json.dumps({
            "id": self.id,
            "media_id": self.media_id,
            "tipo": self.tipo,
            "usuario": self.usuario,
            "texto": self.texto,
            "criadoEm": self.criadoEm.isoformat()
        })

class Favorito(BaseModel):
    id = AutoField(primary_key=True)
    media_id = IntegerField()
    nome_media = CharField(max_length=255)
    tipo = CharField(max_length=100)
    usuario = CharField(max_length=100)
    criadoEm = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])


def to_json(self):
    return {
        "id": self.id,
        "media_id": self.media_id,
        "nome_media": self.nome_media,
        "tipo": self.tipo,
        "usuario": self.usuario,
        "criadoEm": self.criadoEm.isoformat() if self.criadoEm else None
    }


class Usuario(BaseModel):
    email = CharField(unique=True)
    nome = CharField()
    senha = CharField()  # Alterado para simplificar o nome do campo

    # Função para definir a senha com hash bcrypt
    def set_password(self, password):
        salt = bcrypt.gensalt()
        self.senha = bcrypt.hashpw(
            password.encode('utf-8'), salt).decode('utf-8')

    # Função para verificar a senha usando bcrypt
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.senha.encode('utf-8'))


db.connect()
db.create_tables([Animes, Filmes, Episodios, Comentario, Favorito, Usuario])
db.close()
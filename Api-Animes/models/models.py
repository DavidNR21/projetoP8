from peewee import *
from datetime import datetime
import uuid
import json


db = PostgresqlDatabase('senpaiAnimes',port=5432,user='postgres',password='123456')


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
    tipo = CharField(max_length=100)
    usuario = CharField(max_length=100)
    texto = TextField()
    criadoEm = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])


def to_json(self):
    return {
        "id": self.id,
        "media_id": self.media_id,
        "tipo": self.tipo,
        "usuario": self.usuario,
        "texto": self.texto, #if self.texto else "",
        "criadoEm": self.criadoEm.isoformat() if self.criadoEm else None
    }

    
db.connect()
db.create_tables([Animes, Filmes, Episodios, Comentario, Favorito])
db.close()


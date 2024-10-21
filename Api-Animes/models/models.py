from peewee import *
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



db.connect()
db.create_tables([Animes, Filmes, Episodios])
db.close()


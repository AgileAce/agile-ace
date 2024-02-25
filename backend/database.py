from sqlalchemy import Column, ForeignKey, Integer, String, create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "sqlite:///./db/database.db"


Base = declarative_base()


class Meeting(Base):
    __tablename__ = 'meeting'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    link = Column(String(6))

    latest_ticket = Column(Integer, ForeignKey("ticket.id"))


class Ticket(Base):
    __tablename__ = 'ticket'

    id = Column(Integer, primary_key=True)
    meeting_id = Column(Integer, ForeignKey("meeting.id"))
    number = Column(Integer)
    name = Column(String(50))
    description = Column(String(100))
    distance_average = Column(Integer)
    friction_average = Column(Integer)
    relativity_average = Column(Integer)
    energy_points = Column(Integer)


class Entry(Base):
    __tablename__ = 'entry'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    meeting_id = Column(Integer, ForeignKey("meeting.id"))
    ticket_id = Column(Integer, ForeignKey("ticket.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    user_name = Column(String(50))

    distance_choice = Column(Integer)
    friction_choice = Column(Integer)
    relativity_choice = Column(Integer)


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    password = Column(String(50))


# Create Sqlalchemy database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)
# Create local database session
localSession = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base.metadata.create_all(engine)

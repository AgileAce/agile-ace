
import logging

from fastapi import APIRouter, HTTPException
from fastapi_utils.cbv import cbv

from database import Entry, Meeting, Ticket, User, localSession
from utils import generate_unique_link

router = APIRouter()


@cbv(router)
class Router:
    def __init__(self):
        self._logger = logging.getLogger("server")

    @router.post('/api/meeting/create', tags=["meeting"])
    def create_meeting(self, meeting_name: str):
        database = localSession()

        meeting = Meeting()
        meeting.name = meeting_name
        meeting.link = generate_unique_link()
        database.add(meeting)
        database.commit()

        # Generate the first ticket for this meeting
        ticket = Ticket()
        ticket.meeting_id = meeting.id
        ticket.number = 1
        ticket.name = "Default"
        ticket.description = ""
        ticket.distance_average = 0
        ticket.friction_average = 0
        ticket.relativity_average = 0
        ticket.energy_points = 0
        database.add(ticket)
        database.commit()

        # Set latest ticket on meeting
        meeting.latest_ticket = ticket.id
        database.commit()

        # Generate the first entry for this meeting
        entry = Entry()
        entry.meeting_id = meeting.id
        entry.ticket_id = ticket.id
        entry.name = "Default User"
        entry.user_name = ""
        entry.distance_choice = 0
        entry.friction_choice = 0
        entry.relativity_choice = 0
        database.add(entry)
        database.commit()

        return {"link": meeting.link, "ticket": ticket.id, "entry": entry.id}

    @router.post('/api/meeting/join', tags=["meeting"])
    def join_meeting(self, meeting_link: str):
        database = localSession()
        meeting = database.query(Meeting).filter(Meeting.link == meeting_link).first()

        if meeting is None:
            raise HTTPException(status_code=404, detail="meeting was not found")

        ticket = database.query(Ticket).filter(Ticket.id == meeting.latest_ticket).first()

        if ticket is None:
            raise HTTPException(status_code=404, detail="ticket was not found")

        # Generate the first entry for this meeting
        entry = Entry()
        entry.meeting_id = meeting.id
        entry.ticket_id = meeting.latest_ticket
        entry.name = "Default User"
        entry.user_name = ""
        entry.distance_choice = 0
        entry.friction_choice = 0
        entry.relativity_choice = 0
        database.add(entry)
        database.commit()

        return {"link": meeting.link, "ticket": meeting.latest_ticket, "entry": entry.id}

    @router.get('/api/user/create', tags=["user"])
    def create_user(self, user_name: str, user_password: str):
        database = localSession()
        user = User()
        user.name = user_name
        user.password = user_password

        exist_user = database.query(User).filter(User.name == user_name).first()
        if exist_user:
            raise HTTPException(status_code=404, detail="The username is already in use, replace it with another one.")
        else:
            database.add(user)
            database.commit()
            return {"name": user.name, "password": user.password, "user_id":user.id}

    @router.post('/api/user/get', tags=["user"])
    def get_user(self, user_name: str, password: str):
        database = localSession()
        user = database.query(User).filter(User.name == user_name).first()

        if user is None:
            raise HTTPException(status_code=404, detail="User was not found")

        # Check if the hashed password matches the password in the database
        if password != user.password:
            raise HTTPException(status_code=404, detail="Password was not correct")
        else:
            return {"name": user.name, "password": user.password}

    @router.get('/api/ticket/get-all', tags=["ticket"])
    def get_all_tickets(self, meeting_link: int) -> dict:
        database = localSession()

        meeting_id = database.query(Meeting).filter(Meeting.link == meeting_link).first().id
        tickets = database.query(Ticket).filter(Ticket.meeting_id == meeting_id).all()

        result = {"tickets": []}

        for ticket in tickets:
            result["tickets"].append({
                "id": ticket.id,
                "name": ticket.name,
                "number": ticket.number,
                "description": ticket.description,
                "distance_average": ticket.distance_average,
                "friction_average": ticket.friction_average,
                "relativity_average": ticket.relativity_average,
                "energy_points": ticket.energy_points,
            })

        return result

    @router.get('/api/entry/get-all', tags=["entry"])
    def get_all_entries(self, meeting_link: int) -> dict:
        database = localSession()

        meeting = database.query(Meeting).filter(Meeting.link == meeting_link).first()
        ticket = database.query(Ticket).filter(Ticket.id == meeting.latest_ticket).first()
        entries = database.query(Entry).filter(Entry.ticket_id == ticket.id).all()

        result = {"entries": []}

        for entry in entries:
            result["entries"].append({
                "id": entry.id,
                "name": entry.name,
                "distance_choice": entry.distance_choice,
                "friction_choice": entry.friction_choice,
                "relativity_choice": entry.relativity_choice,
            })

        return result

    @router.post('/api/ticket/create', tags=["ticket"])
    def ticket_create(self, meeting_link: int, number: int, name: str, description: str) -> dict:
        database = localSession()

        meeting = database.query(Meeting).filter(Meeting.link == meeting_link).first()

        ticket = Ticket()
        ticket.meeting_id = meeting.id
        ticket.name = name
        ticket.number = number
        ticket.description = description
        database.add(ticket)
        database.commit()

        meeting.latest_ticket = ticket.id
        database.commit()

        return {
            "ticket": ticket.id,
            "name": name,
            "number": number,
            "description": description
        }

    @router.post('/api/ticket/description', tags=["ticket"])
    def ticket_description(self, ticket_id: int) -> dict:
        database = localSession()
        ticket = database.query(Ticket).filter(Ticket.id == ticket_id).first()
        return{"ticket": ticket.name, "description":  ticket.description, "number": ticket.number}

    @router.post('/api/ticket/number', tags=["ticket"])
    def ticket_number(self, ticket_id: int) -> dict:
        database = localSession()
        ticket = database.query(Ticket).filter(Ticket.id == ticket_id).first()
        return {"ticket": ticket.name, "number": ticket.number}

    @router.post('/api/ticket/name', tags=["ticket"])
    def ticket_name(self, ticket_id: str) -> dict:
        database = localSession()
        ticket = database.query(Ticket).filter(Ticket.id == ticket_id).first()
        ticket_name = ticket.name

        return {"ticket": ticket.name, "ticket number": ticket.number}

    @router.post('/api/ticket/reveal', tags=["ticket"])
    def ticket_reveal(self, ticket_id: str) -> dict:
        database = localSession()
        ticket = database.query(Ticket).filter(Ticket.id == ticket_id).first()

        # get all entries for ticket
        entries = database.query(Entry).filter(Entry.ticket_id == ticket_id).all()

        if entries:
            total_distance = 0
            total_friction = 0
            total_relativity = 0

            for entry in entries:
                total_distance += entry.distance_choice
                total_friction += entry.friction_choice
                total_relativity += entry.relativity_choice

            average_distance = total_distance / len(entries)
            average_friction = total_friction / len(entries)
            average_relativity = total_relativity / len(entries)
        else:
            average_distance = 0
            average_friction = 0
            average_relativity = 0

        # calculate averages & totals ( total = (distance + friction) * relativity )
        total_energy = (average_distance + average_friction) * average_relativity
        ticket.energy_points = total_energy
        database.commit()
        return {
            "distance": average_distance,
            "friction": average_friction,
            "relativity": average_relativity,
            "energy": total_energy
        }

    @router.get('/api/entry/create')
    def entry_create(self, meeting_link: int, user_name: str, user_id: int = None) -> dict:
        database = localSession()
        '''
        look up if the (user_name, ticket_id, group_id) has been in the database or not 
        '''
        #check if there is an user or not
        if user_id:
            user = database.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            user_name = user.name

        meeting = database.query(Meeting).filter(Meeting.link == meeting_link).first()
        print(meeting)
        if not get_entry(meeting_link, user_name, meeting.latest_ticket):
            entry = Entry()
            # Entry.name = entry_name
            entry.meeting_id = meeting_link
            entry.ticket_id = meeting.latest_ticket
            entry.user_name = user_name
            entry.user_id = user_id

            database.add(entry)
            database.commit()
            #get the entry for the output:
            return {"entry_id":entry.id,
                    "user_name":entry.user_name,
                    "user_id":entry.user_id,
                    "meeting_id": entry.meeting_id,
                    "ticket_id": entry.ticket_id}
        else:
            #Ticket has already been created
            raise HTTPException(status_code=409, detail="Ticket in use")

    @router.post('/api/entry/update')
    def entry_update(self, entry_id: int, distance: int, friction: int, relativity: int):
        database = localSession()

        entry = database.query(Entry).filter(Entry.id == entry_id).first()
        if entry:
            entry.distance_choice = distance
            entry.friction_choice = friction
            entry.relativity_choice = relativity
            database.commit()
        else:
            raise HTTPException(status_code=404, detail="entry not found")
        return entry

def get_entry(meeting_id: int, user_name: str, ticket_id: int) -> Entry:
    database = localSession()
    entry = database.query(Entry).filter(Entry.user_name == user_name).filter(Entry.meeting_id == meeting_id).filter(Entry.ticket_id == ticket_id).first()
    return entry


def create_mock_entry(group_id: int, ticket_id: int, user_name: str, user_id: int = None):
    database = localSession()
    entry = Entry()
    # Entry.name = entry_name
    entry.group_id = group_id
    entry.ticket_id = ticket_id
    if user_id:
        user = database.query(User).filter(User.id == user_id).first()
        entry.user_name = user.name
        entry.user_id = user.id
    else:
        entry.user_name = user_name
        entry.user_id = None

    database.add(entry)
    database.commit()

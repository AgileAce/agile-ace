import uuid


def generate_unique_link():
    unique_id = str(uuid.uuid4())
    unique_link = ''.join(filter(str.isdigit, unique_id))[:6]
    return unique_link



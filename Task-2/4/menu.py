class Menu:
    def __init__(self, name, special=False):
        self.name = name
        self.special = special
        self.items = []

    def add_item(self, item):
        self.items.append(item)
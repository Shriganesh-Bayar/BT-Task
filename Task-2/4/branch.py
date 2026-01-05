class Branch:
    def __init__(self, location):
        self.location = location
        self.menus = []

    def add_menu(self, menu):
        self.menus.append(menu)
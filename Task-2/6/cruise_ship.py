from ship import Ship

class CruiseShip(Ship):
    def __init__(self, ship_id, name, route):
        super().__init__(ship_id, name)
        self.route = route

class MarineCompany:
    def __init__(self, name):
        self.name = name
        self.ships = []

    def add_ship(self, ship):
        self.ships.append(ship)

    def get_total_amount_collected(self):
        return sum(ship.get_total_amount() for ship in self.ships)

    def get_amount_per_ship(self):
        return {ship.name: ship.get_total_amount() for ship in self.ships}

    def get_customers_for_cruise_ship(self, cruise_ship):
        return [b.customer for b in cruise_ship.bookings]

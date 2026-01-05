class Ship:
    def __init__(self, ship_id, name):
        self.ship_id = ship_id
        self.name = name
        self.bookings = []

    def add_booking(self, booking):
        self.bookings.append(booking)

    def get_total_amount(self):
        return sum(b.amount for b in self.bookings)

class MenuItem:
    def __init__(self, name, course_category, price):
        self.name = name
        self.course_category = course_category
        self.price = price

    def __str__(self):
        return f"{self.name} ({self.course_category}) - ₹{self.price}"
"""
Class to represent employee information
"""
class Employee:
    def __init__(self, name = "", Id = "", gender = "", address = None):
        self.name = name
        self.Id = Id
        self.gender = gender

        # employee has-a address
        self.address = None
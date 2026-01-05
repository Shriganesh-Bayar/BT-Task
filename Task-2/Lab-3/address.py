"""
Class to represent address of employee
"""
class Address:
    def __init__(self, address1, city, pincode, address2 = ""):
        self.address1 = address1
        self.city = city
        self.pincode = pincode
        self.address2 = address2

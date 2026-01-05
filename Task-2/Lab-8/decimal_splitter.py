class DecimalSplitter:
    """
    Method to get the whole number from a double
    """
    @staticmethod
    def get_whole(number):
        return int(number)

    """
    Method to get the fractional part of a double number
    """
    @staticmethod
    def get_fraction(number):
        return round(number - DecimalSplitter.get_whole(number), 4)

    """
    Method to check if a given number is odd or even
    """
    @staticmethod
    def is_odd(number):
        if not number.is_integer():
            return "Not a integer"
        number = int(number)
        return "Odd" if number & 1 == 1 else "Even"

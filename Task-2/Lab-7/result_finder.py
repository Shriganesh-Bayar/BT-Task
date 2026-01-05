class ResultFinder:
    """
    Properties of the fields of this class
    """
    def __init__(self):
        self.marks1 = 0
        self.marks2 = 0
        self.marks3 = 0

    """
    Method to set the marks1, marks2, marks3
    """
    def setMarks(self, marks1, marks2, marks3):
        self.marks1 = marks1
        self.marks2 = marks2
        self.marks3 = marks3

    """
    Method to display marks obtained
    """
    def display_marks(self):
        print("Marks 1 : " + str(self.marks1))
        print("Marks 2 : " + str(self.marks2))
        print("Marks 3 : " + str(self.marks3))

    """
    Method to get the total of the marks in subjects
    """
    def get_total(self):
        return self.marks1 + self.marks2 + self.marks3

    """
    Method to calculate the average of the marks
    """
    def get_average(self):
        return self.get_total() / 3

    """
    Method to get the result for the marks given
    """
    def get_result(self):
        return "Fail" if min(self.marks1, self.marks2, self.marks3) < 35 else "Fail" if self.get_average() < 35 else "Pass"

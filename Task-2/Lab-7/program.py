from result_finder import ResultFinder

class Program:
    @staticmethod
    def main(args):
        # Accept the marks manually from user input
        marks1 = int(input("Enter marks for subject 1: "))
        marks2 = int(input("Enter marks for subject 2: "))
        marks3 = int(input("Enter marks for subject 3: "))

        # Store the values entered in the object
        finder = ResultFinder()

        # setMarks to set the marks of all 3 subjects
        finder.setMarks(marks1, marks2, marks3)

        # Display all the information with the help of get and other methods
        print("Marks entered------------- ")
        finder.display_marks()
        print("Total : " + str(finder.get_total()))
        print("Average : " + str(finder.get_average()))
        print("Result : " + str(finder.get_result()))

if __name__ == "__main__":
    import sys
    Program.main(sys.argv[1:])

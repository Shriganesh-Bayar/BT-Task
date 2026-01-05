from exam_portal import ExamPortal
from question import MCQ, Paragraph

if __name__ == "__main__": 
    portal = ExamPortal()

    portal.add_question(
        MCQ(
            1,
            "What is Python?",
            "Programming",
            "Python",
            ["Language", "Snake", "Car", "Fruit"],
            "Language"
        )
    )

    portal.add_question(
        Paragraph(
            2,
            "Explain OOP concepts",
            "Programming",
            "OOP",
            100
        )
    )

    portal.add_question(
        MCQ(
            3,
            "What is inheritance?",
            "Programming",
            "OOP",
            ["Feature", "Bug", "Library", "Variable"],
            "Feature"
        )
    )

    print("Total Questions:", portal.get_total_number_of_questions())

    print("\nQuestions belonging to topic 'OOP':")
    for q in portal.get_questions_in_given_topic("OOP"):
        print(q)

    print("\nQuestions belonging to topic 'Python' and category 'Programming':")
    for q in portal.get_questions_by_topic_and_category("Python", "Programming"):
        print(q)
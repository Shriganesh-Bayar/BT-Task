class ExamPortal:
    def __init__(self):
        self.questions = []

    def add_question(self, question): 
        self.questions.append(question)

    def get_total_number_of_questions(self):
        return len(self.questions)
    
    def get_questions_in_given_topic(self, topic):
        return [question for question in self.questions if question.topic == topic]
    
    def get_questions_by_topic_and_category(self, topic, category):
        return [question 
            for question in self.questions 
            if question.topic == topic and question.category == category
        ]

    
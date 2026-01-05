class Question:
    type = "Question"
    def __init__(self, id, statement, category, topic):
        self.id = id
        self.statement = statement
        self.category = category
        self.topic = topic 
        
    """
    Function to print when print(Question) is called
    """
    def __str__(self):
        return f"[{self.type}] {self.id} - {self.statement}"

class MCQ(Question):
    type = "MCQ"
    def __init__(self, id, statement, category, topic, options, answer):
        super().__init__(id, statement, category, topic)
        self.options = options
        self.answer = answer

class Paragraph(Question):
    type = "Paragraph"
    def __init__(self, id, statement, category, topic, word_limit):
        super().__init__(id, statement, category, topic)
        self.word_limit = word_limit


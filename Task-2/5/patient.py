class Patient:
    def __init__(self, patient_id, name):
        self.patient_id = patient_id
        self.name = name

    def __str__(self):
        return f"{self.patient_id} - {self.name}"

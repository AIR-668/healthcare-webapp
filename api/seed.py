"""
Seed script to populate the database with sample data
"""
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Patient, SessionModel
from datetime import datetime, timedelta

def create_sample_data():
    """Create sample patients and sessions"""
    db = SessionLocal()
    
    try:
        # Create tables
        Base.metadata.create_all(bind=engine)
        
        # Check if data already exists
        if db.query(Patient).count() > 0:
            print("Sample data already exists!")
            return
        
        # Sample patients
        patients = [
            Patient(
                name="John Smith",
                age=45,
                medical_history="Hypertension, diabetes type 2"
            ),
            Patient(
                name="Sarah Johnson",
                age=32,
                medical_history="Asthma, allergies to penicillin"
            ),
            Patient(
                name="Michael Brown",
                age=67,
                medical_history="Heart disease, high cholesterol"
            ),
            Patient(
                name="Emily Davis",
                age=28,
                medical_history="No significant medical history"
            ),
            Patient(
                name="Robert Wilson",
                age=55,
                medical_history="Arthritis, previous knee surgery"
            )
        ]
        
        # Add patients to database
        for patient in patients:
            db.add(patient)
        
        db.commit()
        
        # Refresh to get IDs
        for patient in patients:
            db.refresh(patient)
        
        # Sample sessions
        sessions = [
            SessionModel(
                patient_id=patients[0].id,
                timestamp=datetime.now() - timedelta(days=7),
                diagnosis="Hypertension management checkup",
                treatment_plan="Continue current medication, monitor blood pressure daily"
            ),
            SessionModel(
                patient_id=patients[1].id,
                timestamp=datetime.now() - timedelta(days=5),
                diagnosis="Asthma exacerbation",
                treatment_plan="Increase inhaler usage, avoid known triggers"
            ),
            SessionModel(
                patient_id=patients[2].id,
                timestamp=datetime.now() - timedelta(days=3),
                diagnosis="Routine cardiac follow-up",
                treatment_plan="Continue statin therapy, schedule stress test"
            ),
            SessionModel(
                patient_id=patients[3].id,
                timestamp=datetime.now() - timedelta(days=1),
                diagnosis="Annual physical examination",
                treatment_plan="All normal, continue healthy lifestyle"
            ),
            SessionModel(
                patient_id=patients[0].id,
                timestamp=datetime.now(),
                diagnosis="Diabetes management",
                treatment_plan="Adjust insulin dosage, dietary consultation"
            )
        ]
        
        # Add sessions to database
        for session in sessions:
            db.add(session)
        
        db.commit()
        
        print("Sample data created successfully!")
        print(f"Created {len(patients)} patients and {len(sessions)} sessions.")
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()

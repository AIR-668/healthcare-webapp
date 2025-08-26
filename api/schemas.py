from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

# Patient schemas
class PatientBase(BaseModel):
    name: str
    age: int
    medical_history: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientResponse(PatientBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int

# Session schemas
class SessionBase(BaseModel):
    patient_id: int
    diagnosis: Optional[str] = None
    treatment_plan: Optional[str] = None

class SessionCreate(BaseModel):
    patient_id: int

class SessionUpdate(BaseModel):
    diagnosis: Optional[str] = None
    treatment_plan: Optional[str] = None

class SessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    patient_id: int
    timestamp: datetime
    diagnosis: Optional[str] = None
    treatment_plan: Optional[str] = None
    feedback: Optional[str] = None

# Feedback schemas
class FeedbackCreate(BaseModel):
    feedback: str

class FeedbackResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    session_id: int
    content: str
    created_at: datetime

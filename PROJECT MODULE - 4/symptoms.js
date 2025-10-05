function checkSymptoms() {
  const input = document.getElementById("symptomsInput").value.toLowerCase();
  const symptoms = input.split(",").map(symptom => symptom.trim());

  const diseases = {
    "flu": ["fever", "cough", "fatigue", "sore throat", "chills"],
    "covid-19": ["fever", "cough", "shortness of breath", "loss of taste", "fatigue"],
    "cold": ["sneezing", "cough", "sore throat", "runny nose"],
    "malaria": ["fever", "chills", "sweating", "headache", "nausea"],
    "allergy": ["sneezing", "itchy eyes", "runny nose", "rash"],
    "diabetes": ["frequent urination", "fatigue", "blurred vision", "weight loss"],
    "hypertension": ["headache", "dizziness", "nosebleeds", "shortness of breath"],
    "asthma": ["shortness of breath", "chest tightness", "wheezing", "coughing"],
    "pneumonia": ["fever", "cough", "chest pain", "shortness of breath"],
    "tuberculosis": ["cough", "fever", "night sweats", "weight loss"],
    "bronchitis": ["cough", "mucus", "fatigue", "shortness of breath"],
    "migraine": ["headache", "nausea", "sensitivity to light", "visual disturbances"],
    "anemia": ["fatigue", "pale skin", "shortness of breath", "dizziness"],
    "arthritis": ["joint pain", "stiffness", "swelling", "reduced mobility"],
    "depression": ["persistent sadness", "loss of interest", "fatigue", "changes in appetite"],
    "anxiety": ["nervousness", "restlessness", "rapid heartbeat", "difficulty concentrating"],
    "eczema": ["itchy skin", "redness", "dry patches", "inflammation"],
    "psoriasis": ["red patches", "scales", "itching", "joint pain"],
    "hepatitis": ["jaundice", "fatigue", "abdominal pain", "nausea"],
    "dengue": ["high fever", "headache", "muscle pain", "rash"],
    "chikungunya": ["fever", "joint pain", "rash", "fatigue"],
    "typhoid": ["fever", "abdominal pain", "weakness", "loss of appetite"],
    "cholera": ["diarrhea", "dehydration", "vomiting", "muscle cramps"],
    "measles": ["rash", "fever", "cough", "conjunctivitis"],
    "mumps": ["swollen glands", "fever", "headache", "muscle aches"],
    "rubella": ["rash", "fever", "swollen lymph nodes", "joint pain"],
    "chickenpox": ["itchy rash", "fever", "fatigue", "loss of appetite"],
    "scarlet fever": ["rash", "sore throat", "fever", "red tongue"],
    "whooping cough": ["severe cough", "vomiting", "fatigue", "fever"],
    "polio": ["fever", "fatigue", "headache", "stiffness"],
    "rabies": ["fever", "headache", "agitation", "hallucinations"],
    "leprosy": ["skin lesions", "numbness", "muscle weakness", "eye problems"],
    "tetanus": ["muscle stiffness", "jaw cramping", "seizures", "fever"],
    "diphtheria": ["sore throat", "fever", "swollen glands", "weakness"],
    "yellow fever": ["fever", "headache", "nausea", "jaundice"],
    "zika virus": ["fever", "rash", "joint pain", "conjunctivitis"],
    "ebola": ["fever", "bleeding", "weakness", "diarrhea"],
    "hiv/aids": ["fever", "fatigue", "weight loss", "recurrent infections"],
    "syphilis": ["sores", "rash", "fever", "swollen lymph nodes"],
    "gonorrhea": ["painful urination", "discharge", "pelvic pain", "testicular pain"],
    "chlamydia": ["painful urination", "discharge", "pelvic pain", "bleeding"],
    "herpes": ["blisters", "itching", "pain", "flu-like symptoms"],
    "hpv": ["warts", "itching", "discomfort", "bleeding"],
    "urinary tract infection": ["frequent urination", "burning sensation", "cloudy urine", "pelvic pain"],
    "kidney stones": ["severe pain", "blood in urine", "nausea", "frequent urination"],
    "gallstones": ["abdominal pain", "nausea", "vomiting", "indigestion"],
    "appendicitis": ["abdominal pain", "nausea", "fever", "loss of appetite"],
    "gastritis": ["stomach pain", "nausea", "bloating", "indigestion"],
    "ulcer": ["abdominal pain", "bloating", "heartburn", "nausea"],
    "irritable bowel syndrome": ["abdominal pain", "bloating", "diarrhea", "constipation"],
    "crohn's disease": ["diarrhea", "abdominal pain", "weight loss", "fatigue"],
    "ulcerative colitis": ["diarrhea", "abdominal pain", "rectal bleeding", "weight loss"],
    "celiac disease": ["diarrhea", "bloating", "weight loss", "fatigue"],
    "lactose intolerance": ["bloating", "diarrhea", "gas", "abdominal pain"],
    "food poisoning": ["nausea", "vomiting", "diarrhea", "abdominal cramps"],
    "constipation": ["infrequent stools", "hard stools", "abdominal pain", "bloating"],
    "hemorrhoids": ["bleeding", "itching", "pain", "swelling"],
    "anal fissure": ["painful bowel movements", "bleeding", "itching", "discomfort"],
    "prostatitis": ["pelvic pain", "painful urination", "flu-like symptoms", "frequent urination"],
    "benign prostatic hyperplasia": ["frequent urination", "weak stream", "urgency", "nocturia"],
    "prostate cancer": ["difficulty urinating", "blood in urine", "pelvic pain", "bone pain"],
    "breast cancer": ["lump", "nipple discharge", "skin changes", "pain"],
    "lung cancer": ["cough", "chest pain", "weight loss", "shortness of breath"],
    "colon cancer": ["blood in stool", "abdominal pain", "weight loss", "fatigue"],
    "skin cancer": ["new growth", "change in mole", "itching", "bleeding"],
    "leukemia": ["fatigue", "frequent infections", "weight loss", "easy bruising"],
    "lymphoma": ["swollen lymph nodes", "fever", "weight loss", "night sweats"],
    "pancreatic cancer": ["abdominal pain", "weight loss", "jaundice", "loss of appetite"],
    "ovarian cancer": ["abdominal bloating", "pelvic pain", "frequent urination", "fullness"],
    "cervical cancer": ["abnormal bleeding", "pelvic pain", "discharge", "pain during intercourse"],
    "endometrial cancer": ["abnormal bleeding", "pelvic pain", "weight loss", "fatigue"],
    "testicular cancer": ["lump", "heaviness", "pain", "swelling"],
    "bladder cancer": ["blood in urine", "painful urination", "pelvic pain", "frequent urination"],
    "brain tumor": ["headaches", "seizures", "nausea", "vision problems"],
    "multiple sclerosis": ["numbness", "weakness", "vision problems", "fatigue"],
    "parkinson's disease": ["tremors", "stiffness", "balance problems", "slowed movement"],
    "alzheimer's disease": ["memory loss", "confusion", "difficulty speaking", "mood changes"],
    "epilepsy": ["seizures", "confusion", "loss of consciousness", "staring spells"],
    "stroke": ["numbness", "confusion", "trouble speaking", "vision problems"],
    "heart attack": ["chest pain", "shortness of breath", "nausea", "lightheadedness"],
    "heart failure": ["shortness of breath", "fatigue", "swelling", "rapid heartbeat"],
    "arrhythmia": ["palpitations", "dizziness", "shortness of breath", "chest discomfort"],
    "angina": ["chest pain", "shortness of breath", "nausea", "fatigue"],
    "pericarditis": ["chest pain", "fever", "shortness of breath", "palpitations"],
    "endocarditis": ["fever", "chills", "fatigue", "shortness of breath"],
    "myocarditis": ["chest pain", "fatigue", "shortness of breath", "arrhythmia"],
    "valvular heart disease": ["shortness of breath", "fatigue", "swelling", "chest pain"],
    "cardiomyopathy": ["shortness of breath", "fatigue", "swelling", "arrhythmia"],
    "peripheral artery disease": ["leg pain", "numbness", "cold legs", "sores"],
    "deep vein thrombosis": ["leg swelling", "pain", "redness", "warmth"],
    "varicose veins": ["swollen veins", "aching", "cramping", "itching"],
  };

  let matchedDiseases = [];

  for (let disease in diseases) {
    let matchCount = symptoms.filter(symptom => diseases[disease].includes(symptom)).length;
    if (matchCount >= 2) { // Basic rule: at least 2 symptoms must match
      matchedDiseases.push(disease);
    }
  }

  const resultDiv = document.getElementById("result");
  if (matchedDiseases.length > 0) {
    resultDiv.innerHTML = "Possible conditions: " + matchedDiseases.join(", ");
  } else {
    resultDiv.innerHTML = "No matching condition found. Please consult a doctor.";
  }
}

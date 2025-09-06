from transformers import pipeline
from rest_framework.exceptions import ValidationError
import google.generativeai as genai

# generator = pipeline("text-generation", model="gpt2")
# generator = pipeline("text-generation", model="gpt2")
# qa_pipeline = pipeline("text2text-generation", model="google/flan-t5-base")

genai.configure(api_key="AIzaSyB9IHWHbqggP__-hN9304vrJqTnvTDha3c")

qa_pipeline = genai.GenerativeModel("gemini-1.5-flash")

def get_disease_insight(disease_name):
    prompt = f"""
    For the crop disease called "{disease_name}" in Uganda, provide the following information in a clearly labeled format:

    Cause:
    [List the main causes specific to Uganda]

    Treatment:
    [Give treatments used by Ugandan farmers or commonly available in Uganda]

    Prevention:
    [How can this disease be prevented, particularly in Ugandan agricultural conditions]

    Return ONLY these 3 sections.
    """
    
    response = qa_pipeline.generate_content(prompt)
    return response.text

    # result = qa_pipeline(prompt, max_length=300, do_sample=False)[0]['generated_text']
    # return result
    # prompt = (
    #     f"Explain the plant disease '{disease_name}' including:\n"
    #     f"- The cause\n"
    #     f"- Symptoms\n"
    #     f"- Treatment options\n"
    #     f"- Prevention tips\n"
    # )
    # result = qa_pipeline(prompt, max_length=200, num_return_sequences=1)
    # prompt = f"Give brief information about {disease_name} in crops only in uganda, including its causes, symptoms, treatments, and prevention."
    # result = qa_pipeline(prompt, max_length=2000, do_sample=True)[0]['generated_text']
    # return result
    
    
    # prompt = (
    #     f"Explain the plant disease '{disease_name}' including:\n"
    #     f"- The cause\n"
    #     f"- Symptoms\n"
    #     f"- Treatment options\n"
    #     f"- Prevention tips\n"
    # )
    # response = generator(prompt, max_length=200, num_return_sequences=1)
    # return response[0]["generated_text"]
    
    

# Initialize once



    
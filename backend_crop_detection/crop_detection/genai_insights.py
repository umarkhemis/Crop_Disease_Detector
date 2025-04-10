from transformers import pipeline
from rest_framework.exceptions import ValidationError

# generator = pipeline("text-generation", model="gpt2")
# generator = pipeline("text-generation", model="gpt2")
qa_pipeline = pipeline("text2text-generation", model="google/flan-t5-base")

def get_disease_insight(disease_name):
    # prompt = (
    #     f"Explain the plant disease '{disease_name}' including:\n"
    #     f"- The cause\n"
    #     f"- Symptoms\n"
    #     f"- Treatment options\n"
    #     f"- Prevention tips\n"
    # )
    # result = qa_pipeline(prompt, max_length=200, num_return_sequences=1)
    prompt = f"Give brief information about {disease_name} in crops only in uganda, including its causes, symptoms, treatments, and prevention."
    result = qa_pipeline(prompt, max_length=2000, do_sample=True)[0]['generated_text']
    return result
    
    
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



    
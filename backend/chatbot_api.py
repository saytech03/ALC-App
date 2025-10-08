from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import re
from collections import Counter
from scipy.spatial.distance import cosine
import os

app = Flask(__name__)
CORS(app)

def tokenize(text):
    return re.findall(r'\w+', text.lower())

def compute_tf(doc):
    tokens = tokenize(doc)
    tf = Counter(tokens)
    total = len(tokens)
    return {word: count / total for word, count in tf.items()}

def compute_idf(docs):
    N = len(docs)
    df = Counter()
    for doc in docs:
        tokens = set(tokenize(doc))
        df.update(tokens)
    return {word: np.log(N / (count + 1)) for word, count in df.items()}

def tfidf_vector(doc, idf, vocab):
    tf = compute_tf(doc)
    return np.array([tf.get(word, 0) * idf.get(word, 0) for word in vocab])

corpus = [
    "Question: What is art law? Answer: Art law is the body of law involving numerous disciplines that protects, regulates, and facilitates the creation, use, and marketing of art. It draws from intellectual property, contract, constitutional, tort, tax, commercial, and international law.",
    "Question: What does art law primarily concern? Answer: Art law traditionally concerns works of fine art and visual arts, but broadly includes music, film, theater, and literature.",
    "Question: How is art law treated legally? Answer: Art law receives specialized treatment through statutes, ordinances, regulations, treaties, or case law, with some principles national and others varying by state.",
    "Question: What is copyright in art law? Answer: Copyright, governed by the Copyright Act of 1976, provides exclusive rights to artists to display, distribute, or reproduce their original works like paintings and sculptures.",
    "Question: What is fair use? Answer: Fair use allows limited use of copyrighted works without permission for purposes like criticism, news reporting, commentary, teaching, or scholarship.",
    "Question: What role do contracts play in art transactions? Answer: Contracts outline terms of sale, ownership transfer, and rights and duties in transactions involving artists, gallery owners, and customers.",
    "Question: How are sales of artwork regulated? Answer: Sales are regulated by Uniform Commercial Codes (UCC) across states and federal laws, including state and local taxes.",
    "Question: What tax provisions apply to art? Answer: The tax code allows deductions for charitable contributions of artwork and provisions for importing/exporting.",
    "Question: How does art law protect cultural heritage? Answer: Art law protects cultural heritage by legalizing artistic products and controlling markets to preserve notable creations.",
    "Question: Who owns IP in commissioned art? Answer: The artist owns the intellectual property unless a contract states otherwise; the commissioner owns the physical object but cannot copy or display without permission.",
    "Question: What is the Visual Artists Rights Act (VARA)? Answer: VARA protects moral rights, including attribution and preventing destruction of art like paintings, sculptures, and murals, even if the artist has no copyrights.",
    "Question: What are moral rights? Answer: Moral rights are non-economic personal rights of artists, such as attribution and integrity of the work, protected under copyright or contract law.",
    "Question: What is rights of publicity? Answer: Rights of publicity prevent unauthorized commercial use of a person's likeness, especially for famous individuals.",
    "Question: What was Rogers v. Koons about? Answer: Jeff Koons' sculpture based on a photograph was ruled copyright infringement, not protected parody.",
    "Question: What was the outcome of Campbell v. Acuff-Rose Music? Answer: 2 Live Crew's parody was transformative and constituted fair use under copyright law.",
    "Question: What is the UNESCO 1970 Convention? Answer: An international treaty to combat illegal trade in cultural items.",
    "Question: What are immigration options for artists? Answer: Visas like O-1A and O-1B for artists with exceptional abilities, granted for up to three years with extensions.",
    "Question: How are estates handled in art law? Answer: Artists can appoint art executors; copyright is transferable separately from the artwork.",
    "Question: What is cultural property protection? Answer: Rules to safeguard cultural heritage, including monument protection, theft prevention, and equitable access.",
    "Question: What was Republic of Austria v. Altmann? Answer: Allowed Maria Altmann to sue in U.S. court for recovery of Nazi-stolen paintings."
]

docs = corpus
vocab = sorted(set(word for doc in docs for word in tokenize(doc)))
idf = compute_idf(docs)
vectors = np.array([tfidf_vector(doc, idf, vocab) for doc in docs])

def get_art_law_response(query):
    q_vec = tfidf_vector(query, idf, vocab)
    similarities = []
    for vec in vectors:
        if np.linalg.norm(vec) > 0 and np.linalg.norm(q_vec) > 0:
            sim = 1 - cosine(q_vec, vec)
        else:
            sim = 0
        similarities.append(sim)
    
    max_sim = max(similarities)
    if max_sim > 0.3:
        index = np.argmax(similarities)
        return corpus[index].split('Answer: ')[1]
    else:
        return "Sorry, I can only answer questions related to art law."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question', '')
    
    if not question:
        return jsonify({'error': 'No question provided'}), 400
    
    response = get_art_law_response(question)
    return jsonify({'response': response})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'ArtLex Chatbot API'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
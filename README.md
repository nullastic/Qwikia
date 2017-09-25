# Qwikia

A Facebook Messenger bot that uses the Wikia API to retrieve articles about the topic that YOU choose, and generate questions from them on the fly.

# Why we made this bot

Anamaya loves doing trivia about his favourite topics in fandom and fiction. However, the trivia apps we use always run out of questions and so he has to answer the same questions again and again. This is our solution to that problem.

# Technologies Used

NodeJS for the backend. Heroku for deployment and Facebook for its messenger platform. Wikia API for questions data and some help from the Google Cloud NLP API for making questions from data. We have plans to integrate api.ai and firebase in the future to provide some basic NLP to make conversations feel more life like and to provide a platform to users to rank questions they loved.

# Current State

On entering a topic, the bot outputs a question from the topic, with basic error handling on bad input and bad data received from Wikia.

# Work Left

Answers, Spell Check and NLP on user input, question rating, better NLP to make questions.

# For the future

Ports to Amazon Echo, standalone iOS and Android apps, etc.

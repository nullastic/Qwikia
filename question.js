
var request = require('request');
function getQuestionFromText(text, title) {
    var YOUR_API_KEY = 'AIzaSyAgWYqV90V6NCI3CUNWStkwH9-rPRsnt4M';
    var siteUrl = 'https://language.googleapis.com/v1beta2/documents:analyzeEntities?key='+YOUR_API_KEY;
    var options =
    {
        url: siteUrl,
        method: 'POST',
        body:
        {
            "document":
            {
              "type":"PLAIN_TEXT",
              "language": "EN",
              "content": text
            },
            "encodingType":"UTF8"
        },
        json: true
    }
    request(options, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            var data = body.entities;
            data.sort(function(a, b){
                return b.salience - a.salience;
            });
            console.log(data);
            var i = 0;
            var match = true;
            var key;
            var index;
            var length;
            var newText = text;
            
            function checkMatch(key) {
                var cond1 = nlp(key).has('#Noun')
                var cond2 = nlp(key).has('#Adjective')
                var cond3 = nlp(key).has('#Pronoun')
                if (cond1 == true || cond2 == true || cond3 == true) {
                    return true;
                }
            }
            
            while (i < data.length || match != false) {
            key = data[i].name;
            index = data[i].mentions[i].text.beginOffset;
            length = key.length;
            match = checkMatch(key);
            var blank='________';
            i++;
            }
            console.log(length);
            
            categorize(text)
            
            function categorize(text) {
                /* Decides if a question is a who or what question */
            }
            
            function whoQuestion(text, key) {
                var ans = "";
                blank = '________';

                sentences = nlp(text).sentences().data()

                if (text.startsWith(key) == true) {
                    ans = "Q: Who" + text.substr(text.indexOf(key)+key.length, text.length) + "?";
                }
                else if (text.endsWith(key) == true) {
                    ans = text.substr(0, text.indexOf(key)) + "Q: who?" + text.substr(text.indexOf(key)+key.length);
                }
                else {
                    for (i in sentences) {
                        if ((sentences[i].text).startsWith(key) == true) {
                            ans = text.substr(0, text.indexOf(key)) + "Q: Who" + 
                            text.substr(text.indexOf(key)+key.length);
                        }
                        else if ((sentences[i].text).endsWith(key) == true) {
                            ans = text.substr(0, text.indexOf(key)) + "Q: who" + 
                            text.substr(text.indexOf(key)+key.length);

                        }
                        else {
                            ans = text.substr(0,text.indexOf(key)) + blank + text.substr(text.indexOf(key)+key.length) + "?";
                        }
                    }
                }
                return nlp(ans).sentences().toQuestion().out()
            }

            // FUNCTIONS DEALING WITH OBJECTS

            function whatQuestion(text, key) {
                ans = "";
                blank = '________';

                sentences = nlp(text).sentences().data()

                if (text.startsWith(key) == true) {
                    ans = "What" + text.substr(text.indexOf(key)+key.length, text.length) + "?";
                }
                else if (text.endsWith(key) == true) {
                    ans = text.substr(0, text.indexOf(key)) + "what?" + text.substr(text.indexOf(key)+key.length);
                }
                else {
                    for (i in sentences) {
                        if ((sentences[i].text).startsWith(key) == true) {
                            ans = text.substr(0, text.indexOf(key)) + "What" + 
                            text.substr(text.indexOf(key)+key.length);
                        }
                        else if ((sentences[i].text).endsWith(key) == true) {
                            ans = text.substr(0, text.indexOf(key)) + "what" + 
                            text.substr(text.indexOf(key)+key.length);

                        }
                        else {
                            ans = text.substr(0,text.indexOf(key)) + blank + text.substr(text.indexOf(key)+key.length) + "?";
                        }
                    }
                }
                return nlp(ans).sentences().toQuestion().out()
            }
            
            newText = text.substr(0,index) + blank + text.substr(index+length);
             
            // edits end here
           
            request({
                  url: 'https://graph.facebook.com/v2.10/me/messages',
                  qs: {access_token: 'EAARiEsAuvXEBAHvp6kDS4bAcyIrkudgRZCieT78BWO7ZAsbfAzIdkjMe7EJlv731DezS6Ic5crJs2OOTZCIVXVf3GijGjnwzNRkcZAwJHJaFPfdERSsp9dvZCuKUnCchIEZCjE9BOv58Pcc6EdrKV3wSK5lkKkDLhqGFjwjUua0gZDZD'},
                  method: 'POST',
                  json: {
                    recipient: {id: sender},
                    message: {text: newText}
                  }
                });
              }
    });
}
module.exports.getQuestionFromText = getQuestionFromText;

// getQuestionFromText("Edd, also called Dolorous Edd, is a member of the Night's Watch. Edd swore his oath when he was fifteen. His nickname is due to his sarcastic and pessimistic sense of humour.", 'got');
/* var result = 
{
    "entities":
    [{
        "name":"Edd",
        "type":"PERSON",
        "metadata":{},
        "salience":0.73725903,
        "mentions":[
            {
                "text":
                {
                    "content":"Edd",
                    "beginOffset":0
                },
                "type":"PROPER"
            },
            {
                "text":
                {
                    "content":"Edd",
                    "beginOffset":65
                },
                "type":"PROPER"
            }]
        }, {}],
        "language":"en"
    };
 */

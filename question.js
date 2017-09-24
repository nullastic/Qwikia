
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
            var key = data[0].name;
            var index = data[0].mentions[0].text.beginOffset;
            var length = key.length;
            console.log(length);
            var newText = text;
            var blank='________';
            
            //edits: chelsea
            /**
            for(var i = 0; i < length; i++) {
                blank+='_';
            }
            */
            
            newText = text.substr(0,index) + blank + text.substr(index+length);
            trueKey = text.substr(0,index) + key + text.substr(index+length);
            reformatQuestion(newText, length);
            filterQuestion(trueKey, key);
            
            function reformatQuestion(text, length) {
                //reformat question
                var blank = "_";
                
                // WHO question
                var sub1 = "is";
                var sub2 = "was";
                
                /** ex: The ________ was a large Goblin leader who lived in the Misty Mountains 
                in Middle-earth during the Third Age. He appears only in The Hobbit. */
                if (text.indexOf(sub1) !== -1 || text.indexOf(sub2) !== -1) {
                    if (text.substr(text.indexOf(sub1)-1) == blank ||
                       text.substr(text.indexOf(sub1)-2) == blank) {
                        text = "Who is " + text.substr((text.indexOf(sub1)+3), length-1) + "?"
                    }
                    else if (text.substr(text.indexOf(sub2)-1) == blank ||
                            text.substr(text.indexOf(sub2)-2) == blank) {
                        text = "Who was " + text.substr((text.indexOf(sub1)+3), length-1) + "?"
                    }
                    // returns 
                }
                
                
                // WHAT question
                // Preceded by determiner
                var det = "the";
                
                
                
                // WHERE question
                var location_words = ["location", "located in", "country of"];

                
            }
            
            function filterQuestion(text, key) {
                /**
                check:
                - if key is embedded in text
                - if blank is a lexical stem of key
                */
                blank = "________";
                if (text.indexOf(key) != -1) {
                    // if key shows up before the blank
                    if (text.substr(0, text.indexOf(key)).indexOf(key) != -1) { 
                        text = text.substr(0,text.indexOf(key)) +
                            text.substr((text.indexOf(key)+(key.length+1)), text.indexOf(blank)) +
                            blank + text.substr((text.indexOf(blank)+(blank.length+1)), text.length);
                    }
                    // if key shows up after the blank
                    else if (text.substr((text.indexOf(key)+(key.length+1)), text.length).indexOf(key) != -1) {
                        text = text.substr(0, text.indexOf(blank)) + blank + 
                            text.substr((text.indexOf(blank)+(blank.length+1)), text.indexOf(key)) +
                            text.substr((text.indexOf(key)+(key.length+1)), text.length);
                    }
                }
                return text;
            }
            
            function fixQuestion(text, key) {
                //TODO
            }
            
            newText = fixQuestion(text); 
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

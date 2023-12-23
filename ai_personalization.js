```javascript
const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

class AIPersonalization {
    constructor() {
        this.userPreferences = {}; // Store user preferences
    }

    // Analyze content and update user preferences
    updatePreferences(userId, content) {
        tfidf.addDocument(content);

        let items = [];
        tfidf.listTerms(0 /* in document index 0 */).forEach(function(item) {
            items.push(item.term);
        });

        this.userPreferences[userId] = items;
    }

    // Generate personalized content based on user preferences
    generateContent(userId) {
        let preferences = this.userPreferences[userId];
        if (!preferences) {
            return 'No preferences found for this user.';
        }

        // This is a simple example, in a real-world application you would want to generate content based on user preferences
        let content = 'This is personalized content for ' + userId + '.';

        preferences.forEach(function(preference) {
            content += ' ' + preference + '.';
        });

        return content;
    }

    // Check if content matches user preferences
    isContentRelevant(userId, content) {
        let preferences = this.userPreferences[userId];
        if (!preferences) {
            return false;
        }

        let isRelevant = false;
        preferences.forEach(function(preference) {
            if (content.includes(preference)) {
                isRelevant = true;
            }
        });

        return isRelevant;
    }
}

module.exports = AIPersonalization;
```

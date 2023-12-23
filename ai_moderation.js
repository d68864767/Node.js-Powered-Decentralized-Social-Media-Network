```javascript
const natural = require('natural');
const classifier = new natural.BayesClassifier();

class AIModeration {
    constructor() {
        this.trainClassifier();
    }

    // Train the classifier with some initial data
    trainClassifier() {
        // This is a simple example, in a real-world application you would want to train with a much larger dataset
        classifier.addDocument('This is inappropriate content', 'inappropriate');
        classifier.addDocument('This is harmful content', 'inappropriate');
        classifier.addDocument('This is safe content', 'appropriate');
        classifier.addDocument('This is good content', 'appropriate');

        classifier.train();
    }

    // Classify a new piece of content
    classifyContent(content) {
        return classifier.classify(content);
    }

    // Add a new piece of content to the training data
    addTrainingDocument(content, label) {
        classifier.addDocument(content, label);
        classifier.train();
    }

    // Check if content is appropriate
    isContentAppropriate(content) {
        const classification = this.classifyContent(content);
        return classification === 'appropriate';
    }
}

module.exports = AIModeration;
```

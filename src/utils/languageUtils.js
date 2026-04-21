/**
 * Dynamically extracts the correct text from a multilingual object based on the requested language.
 * This works for any number of languages (en, ta, fr, hi, etc.) without needing to hardcode conditions.
 * 
 * @param {Object|String} textObj - The object containing multiple languages (e.g. { en: "Hello", ta: "Vanakkam" })
 * @param {String} currentLanguage - The active language code (e.g. "en", "ta")
 * @param {String} defaultText - Fallback text if nothing is found
 * @returns {String} The localized string
 */
export const getDynamicText = (textObj, currentLanguage, defaultText = '') => {
    if (!textObj) return defaultText;
    if (typeof textObj === 'string') return textObj;

    // 1. Try to get the text for the dynamically requested language
    if (textObj[currentLanguage]) {
        const val = textObj[currentLanguage];
        if (typeof val === 'string') return val;
        return Object.values(val)[0] || defaultText;
    }

    // 2. If the requested language isn't found, fallback to english if available
    if (textObj.en) {
        const enVal = textObj.en;
        if (typeof enVal === 'string') return enVal;
        return Object.values(enVal)[0] || defaultText;
    }

    // 3. Ultimate fallback: just return the first available translation in the object
    const extract = Object.values(textObj)[0];
    return typeof extract === 'string' ? extract : defaultText;
};

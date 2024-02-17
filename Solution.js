
/**
 * @param {string[]} words
 * @return {string}
 */
var longestWord = function (words) {
    this.NO_WORD_FOUND = "";
    this.trie = new Trie();

    addAllWordsToTrie(words);
    return findLongestWordWhereEachLetterEndsPrefix(words);
};

/**
 * @param {string[]} words
 * @return {void}
 */
function addAllWordsToTrie(words) {
    for (let word of words) {
        this.trie.addWord(word);
    }
}

/**
 * @param {string[]} words
 * @return {string}
 */
function findLongestWordWhereEachLetterEndsPrefix(words) {
    let maxLength = 0;
    let longestWord = this.NO_WORD_FOUND;

    for (let word of words) {
        if (this.trie.eachLetterInWordEndsPrefix(word)) {

            if (word.length > maxLength) {
                longestWord = word;
                maxLength = word.length;
            } else if (word.length === maxLength && word < longestWord) {
                longestWord = word;
            }
        }
    }
    return longestWord;
}

class Node {
    static ALPHABET_SIZE = 26;
    constructor() {
        this.branches = new Array(Node.ALPHABET_SIZE).fill(null);
        this.endsPrefix = false;
    }
}

class Trie {

    static ASCII_SMALL_CASE_A = 97;

    constructor() {
        this.root = new Node();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let current = this.root;

        for (let i = 0; i < word.length; ++i) {
            const index = word.codePointAt(i) - Trie.ASCII_SMALL_CASE_A;

            if (current.branches[index] === null) {
                current.branches[index] = new Node();
            }
            current = current.branches[index];
        }
        current.endsPrefix = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    eachLetterInWordEndsPrefix(word) {
        let current = this.root;

        for (let i = 0; i < word.length; ++i) {
            const index = word.codePointAt(i) - Trie.ASCII_SMALL_CASE_A;

            if (!current.branches[index].endsPrefix) {
                return false;
            }
            current = current.branches[index];
        }
        return true;
    }
}

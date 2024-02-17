
public class Solution {

    private static final String NO_WORD_FOUND = "";
    private final Trie trie = new Trie();

    public String longestWord(String[] words) {
        addAllWordsToTrie(words);
        return findLongestWordWhereEachLetterEndsPrefix(words);
    }

    private void addAllWordsToTrie(String[] words) {
        for (String word : words) {
            trie.addWord(word);
        }
    }

    private String findLongestWordWhereEachLetterEndsPrefix(String[] words) {
        int maxLength = 0;
        String longestWord = NO_WORD_FOUND;

        for (String word : words) {
            if (trie.eachLetterInWordEndsPrefix(word)) {

                if (word.length() > maxLength) {
                    longestWord = word;
                    maxLength = word.length();
                } else if (word.length() == maxLength && word.compareTo(longestWord) < 0) {
                    longestWord = word;
                }
            }
        }
        return longestWord;
    }
}

class Trie {

    private final Node root = new Node();

    private class Node {

        private static final int ALPHABET_SIZE = 26;
        Node[] branches = new Node[ALPHABET_SIZE];
        boolean endsPrefix;
    }

    public void addWord(String word) {
        Node current = root;
        for (int i = 0; i < word.length(); ++i) {
            int index = word.charAt(i) - 'a';
            if (current.branches[index] == null) {
                current.branches[index] = new Node();
            }
            current = current.branches[index];
        }
        current.endsPrefix = true;
    }

    public boolean eachLetterInWordEndsPrefix(String word) {
        Node current = root;
        for (int i = 0; i < word.length(); ++i) {
            int index = word.charAt(i) - 'a';
            if (!current.branches[index].endsPrefix) {
                return false;
            }
            current = current.branches[index];
        }
        return true;
    }
}


#include <span>
#include <array>
#include <vector>
#include <memory>
#include <string>
#include <string_view>
using namespace std;

class Trie {

    struct Node {
        const static int ALPHABET_SIZE = 26;
        array<shared_ptr<Node>, ALPHABET_SIZE> branches{};
        bool endsPrefix;
    };

    const shared_ptr<Node> root {make_shared<Node>()};

public:
    void addWord(string_view word) const {
        shared_ptr<Node> current = root;

        for (const auto& letter : word) {

            int index = letter - 'a';
            if (current->branches[index] == nullptr) {
                current->branches[index] = make_shared<Node>();
            }
            current = current->branches[index];
        }
        current->endsPrefix = true;
    }

    bool eachLetterInWordEndsPrefix(string_view word) const {
        shared_ptr<Node> current = root;

        for (const auto& letter : word) {

            int index = letter - 'a';
            if (!current->branches[index]->endsPrefix) {
                return false;
            }
            current = current->branches[index];
        }
        return true;
    }
};

class Solution {
    
    inline const static string NO_WORD_FOUND;
    const unique_ptr<Trie> trie = make_unique<Trie>();

public:
    string longestWord(const vector<string>& words) const {
        addAllWordsToTrie(words);
        return findLongestWordWhereEachLetterEndsPrefix(words);
    }

private:
    void addAllWordsToTrie(span<const string> words) const {
        for (const auto& word : words) {
            trie->addWord(word);
        }
    }

    string findLongestWordWhereEachLetterEndsPrefix(span<const string> words) const {
        int maxLength = 0;
        string longestWord = NO_WORD_FOUND;

        for (const auto& word : words) {
            if (trie->eachLetterInWordEndsPrefix(word)) {

                if (word.length() > maxLength) {
                    longestWord = word;
                    maxLength = word.length();
                } else if (word.length() == maxLength && word < longestWord) {
                    longestWord = word;
                }
            }
        }
        return longestWord;
    }
};

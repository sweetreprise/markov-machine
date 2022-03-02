/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for(let i = 0; i < this.words.length; i++){
      const word = this.words[i];

      if(!chains[word]){
        chains[word] = [];
      }

      if(!this.words[i+1]){
        chains[word].push(null);
      } else {
        chains[word].push(this.words[i + 1]);
      }
    } 
    return chains;
  }


  /** return random text from chains */

  // pick a random word from this.words
  // find the possible words that can come after that
  // pick one
  // if null is picked, then stop the chain
  // restart

  static random(arr){
    return Math.floor(Math.random() * (arr.length));
  }

  makeText(numWords = 100) {
    const textArr = [];
    let word = this.words[MarkovMachine.random(this.words)];

    while(textArr.length <= numWords) {
      let possibilities = this.chains[word];
      let next = MarkovMachine.random(possibilities)

      textArr.push(word);
      
      if(!possibilities[next]) {
        textArr.push('.');
        word = this.words[MarkovMachine.random(this.words)];
      } else {
        word = possibilities[next];
      }
    }
    return textArr.join(' ');
  }
}

module.exports = {
  MarkovMachine
};


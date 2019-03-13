const MORSE_CODE = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS',
};

Object.freeze(MORSE_CODE);

/**
 * This is the entry point to the program.
 *
 * @param {string} morseCode The string to decode.
 */
function get_words(code){
  var word_spacing = /\s{3}/g;
  return code.split(word_spacing);
}

function get_characters(words_array){
  var character_spacing = /\s{1}/g;
  var words_array = words_array.map(function(word){
    return word.split(character_spacing);
  })
  return words_array
}

function get_corresponding_word_characters(words_array,code){
  var words_in_characters_array = words_array.map(function(word_array){
    var word_characters_array = []
    for(var i = 0; i < word_array.length; i++){
      if(code[word_array[i]] !== undefined){
        word_characters_array.push(code[word_array[i]]);
      }
      else{
        word_characters_array.push(' ');
      }
    }
    return word_characters_array
  })
  return words_in_characters_array;
} 


function get_words_in_alphabet(words_characters_array){
  var words = words_characters_array.map(function(word_characters_array){
    return word_characters_array.join('');
  })
  return words;
}

function  get_sentence(words_array){
  var sentence = words_array.join(' ');
  return sentence;
}

function decodeMorse(morseCode) {
  // Your code should go here.
  if(!morseCode){
    return '';
  }
  var cleaned_code = morseCode.trim()
  var words_in_morse = get_words(cleaned_code);
  var characters_in_morse = get_characters(words_in_morse);
  var characters_in_alphabets = get_corresponding_word_characters(characters_in_morse, MORSE_CODE);
  var words_in_alphabets = get_words_in_alphabet(characters_in_alphabets);
  return get_sentence(words_in_alphabets);
}

module.exports = decodeMorse;

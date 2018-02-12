import $ from 'jquery'

const url = 'https://wordwatch-api.herokuapp.com/'

const handleResponse = (response) => {
  return response.json()
  .then(json => {
    if (!response.ok) {
      const error = {
        status: response.status,
        statusText: response.statusText,
      }
      return Promise.reject(error);
    }
    return json
  })
}

const getTopWord = () => {
  fetch(`${url}/api/v1/top_word`)
  .then((response) => handleResponse(response))
  .then((wordInfo) => {
    let word = getWord(wordInfo.word)
    let count = getCount(wordInfo.word)
    $('h3').append(`${word} (${count})`)
  })
  .catch((error) => console.error({ error }))
}

const getWord = (word) => {
  for(let i in word){
    return i
  }
}

const getCount = (word) => {
  for(let i in word){
    return word[i]
  }
}

const addToFrequency = (word) =>  {
  return fetch(`${url}api/v1/words`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ word: { value: `${word}` } })
  })
}

const countWords = (event) => {
  let paragraph = $('textarea').val()
  let words = paragraph.split(" ")
  let frequency = {}
    words.forEach((word) => {
      word = word.toLowerCase()
      frequency[word] = (frequency[word] || 0) + 1
      addToFrequency(word)
      .then(response => handleResponse(response))
    })
    createWordle(frequency)
}

const createWordle = (frequencies) =>  {
  let sorted = []
  for (let word in frequencies) {
    sorted.push([word, frequencies[word]])
}
  sorted.sort((a, b) =>  {
    return a[1] - b[1]
  })
  renderWordle(sorted)
}

const renderWordle = (sortedWords) => {
  sortedWords.forEach((word) => {
    $('.word-count').append(`<p style="font-size:${word[1]}em">${word[0]}</p>`)
  })
}

const onEnter = (event) =>  {
  if (event.keyCode == 13)  {
    countWords()
  }
}

$(document).ready(() => {
  getTopWord()
  $('#count-paragraph').on('click', countWords)
  $('.text-submission').on('keyup', onEnter)
})

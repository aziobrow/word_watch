import $ from 'jquery'

const url = 'https://wordwatch-api.herokuapp.com'

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
  for(var i in word){
    return i
    console.log(word[i])
  }
}

const getCount = (word) => {
  for(var i in word){
    return word[i]
  }
}

$(document).ready(() => {
  getTopWord()
})

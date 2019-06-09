'use strict';

const apiHeader = 'application/vnd.github.v3+json';
const testapiURL = 'https://api.github.com/users/skwx/repos';

//${handle} handle will be the username that the user searches for. No need to go into parameters for this.

function getRepos(username) {
  const URL = `https://api.github.com/users/${username}/repos`;
  const header = {
    headers: new Headers({
      Accept: "application/vnd.github.v3+json"
    })
  }

  console.log(`searching for ${username}'s repos`);

  fetch(URL, header)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text (`Something went wrong: ${err.message}`);
    });

}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#repo-list").empty();
  responseJson.forEach(obj =>
    $("#repo-list").append(
      `<li><a href='${obj.url}'>${obj.name}</a></li>`
    )
  ); 
  $("#results").removeClass("hidden");
}

function formListener() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $("#js-github-handle").val();
    getRepos(username);
  
  });
}



$(formListener);


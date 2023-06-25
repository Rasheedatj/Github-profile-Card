const searchBtn = document.querySelector('button');
const userName = document.querySelector('#username');
const avatar = document.querySelector('.icon');
const dateJoined = document.querySelector('.date');
const bio = document.querySelector('.bio');

// joined date conversion
function date(data) {
  const date = new Date(data.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formattedDate;
}

// change elemet content
function changeElementContent(data) {
  const formattedDate = date(data);

  userName.textContent = `@ ${data.login}`;
  avatar.innerHTML = `<img src="${data.avatar_url}" />`;
  dateJoined.textContent = `Joined ${formattedDate}`;

  document.querySelector('#repo__number').textContent = `${data.public_repos}`;
  document.querySelector('#follower__number').textContent = `${data.followers}`;
  document.querySelector(
    '#following__number'
  ).textContent = `${data.following}`;
  document.querySelector('.name').textContent = `${data.name}`;

  if (data.bio === null) {
    bio.textContent = `This profile has no bio`;
  } else {
    bio.textContent = `${data.bio}`;
  }
  if (data.location === null) {
    document.querySelector('#location').textContent = 'Not available';
  } else {
    document.querySelector('#location').textContent = `${data.location}`;
  }

  if (data.blog === '') {
    document.querySelector('#blog').textContent = 'Not available';
  } else {
    document.querySelector('#blog').textContent = `${data.blog}`;
  }

  if (data.twitter_username === null) {
    document.querySelector('#twitter').textContent = 'Not available';
  } else {
    document.querySelector(
      '#twitter'
    ).textContent = `@${data.twitter_username}`;
  }
  if (data.company === null) {
    document.querySelector('#organisation').textContent = '@github';
  } else {
    document.querySelector('#organisation').textContent = `${data.company}`;
  }
}

const searchUser = (e) => {
  e.preventDefault();
  const searchInput = document.querySelector('input').value;

  const apiURL = `https://api.github.com/users/${searchInput}`;
  console.log(searchInput);
  console.log(apiURL);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiURL);

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);

      changeElementContent(data);
    }
  };

  xhr.send();
};

searchBtn.addEventListener('click', searchUser);

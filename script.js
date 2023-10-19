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

// change element content
function changeElementContent(data) {
  document.getElementById('main__card').style.display = 'block';
  document.querySelector('.error').style.display = 'none';

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

  fetchData(apiURL);
};

const fetchData = async (apiURL) => {
  try {
    document.querySelector('.loader-container').style.display = 'flex';
    const res = await fetch(apiURL);
    if (!res.ok) {
      throw new Error('Something went wrong, pls enter a valid username.');
    }
    const data = await res.json();
    document.querySelector('.loader-container').style.display = 'none';
    changeElementContent(data);
  } catch (error) {
    document.getElementById('main__card').style.display = 'none';
    document.querySelector('.error').style.display = 'block';
    document.querySelector(
      '.error'
    ).innerHTML = `<p style="color: white; text-align: center;">${error}</p>`;
  }
};

searchBtn.addEventListener('click', searchUser);

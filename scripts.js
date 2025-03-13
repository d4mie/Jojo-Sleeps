// Function to toggle the navigation menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Event listener for the menu toggle button and page setup
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
  }

  lazyLoadImages(); // Initialize lazy loading
  setupVideoPage(); // Initialize video page content
  setupCategoryFilter(); // Initialize category filtering
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const config = { rootMargin: '0px 0px 50px 0px', threshold: 0.01 };
  
  if ('IntersectionObserver' in window) {
      let observer = new IntersectionObserver(onIntersection, config);
      images.forEach(image => observer.observe(image));
  } else {
      images.forEach(image => loadImage(image));
  }
}

function onIntersection(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          loadImage(entry.target);
      }
  });
}

function loadImage(image) {
  image.src = image.dataset.src;
  image.removeAttribute('data-src');
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      workItems.forEach(item => {
          item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
      });
  });
});

// Function to get URL parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function setupVideoPage() {
  if (window.location.pathname.includes("video.html")) {
      const imageSrc = getQueryParam('image');
      const videoSrc = getQueryParam('video');
      const title = getQueryParam('title') || "Untitled Video";
      const director = getQueryParam('director') || "Unknown Director";

      if (imageSrc) {
          document.body.style.backgroundImage = `url(${imageSrc})`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
          document.body.style.backgroundRepeat = 'no-repeat';
      }

      const videoTitleEl = document.getElementById('video-title');
      const videoDirectorEl = document.getElementById('video-director');

      videoTitleEl.textContent = title;
      videoDirectorEl.textContent = director;

      const playButtonEl = document.getElementById('play-button');
      const videoWrapperEl = document.querySelector('.video-wrapper');

      playButtonEl.addEventListener('click', function () {
          console.log("Play button clicked"); // Debugging statement
          playButtonEl.style.display = 'none'; // Hide play button immediately
          playVideo(videoWrapperEl, videoSrc);
      });
  }
}

function playVideo(container, videoSrc) {
  console.log("Playing video:", videoSrc); // Debugging statement
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', `${videoSrc}?autoplay=1&controls=1`);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'autoplay; fullscreen');
  iframe.setAttribute('class', 'video-player-iframe');

  container.innerHTML = "";
  container.appendChild(iframe);
}

// Attach event listeners to all work items for navigation
document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h3').textContent;
      const director = item.querySelector('p').textContent;
      const videoSrc = item.querySelector('a').getAttribute('href').split('&video=')[1];

      if (!img || !videoSrc) return;

      const imageSrc = img.getAttribute('src');

      window.location.href = `video.html?image=${encodeURIComponent(imageSrc)}&video=${encodeURIComponent(videoSrc)}&title=${encodeURIComponent(title)}&director=${encodeURIComponent(director)}`;
  });
});

function setupCategoryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      workItems.forEach(item => {
        item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
      });
    });
  });
}
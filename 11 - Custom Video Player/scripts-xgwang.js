const player = document.querySelector('.player');
const viewer = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggler = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = (e) => {
  if (viewer.paused) {
    viewer.play();
    toggler.textContent = '❚ ❚';
  } else {
    viewer.pause();
    toggler.textContent = '►';
  }
}
const handleProgress = (e) => {
  const percent = (viewer.currentTime / viewer.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
const handleRangeUpdate = (e) => {
  viewer[e.target.name] = e.target.value;
}
const skip = (e) => {
  viewer.currentTime += Number(e.target.dataset.skip);
}
const scrub = (e) => {
  const time = (e.offsetX / progress.offsetWidth) * viewer.duration;
  viewer.currentTime = time;
}

viewer.addEventListener('click', togglePlay);
viewer.addEventListener('timeupdate', handleProgress);

toggler.addEventListener('click', togglePlay);

ranges.forEach(r => r.addEventListener('change', handleRangeUpdate));
ranges.forEach(r => r.addEventListener('mousemove', handleRangeUpdate));

skipButtons.forEach(b => b.addEventListener('click', skip));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

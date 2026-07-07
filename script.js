const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

const videoInput = qs('#videoInput');
const dropZone = qs('#dropZone');
const filePreview = qs('#filePreview');
const fileName = qs('#fileName');
const fileMeta = qs('#fileMeta');
const clearFile = qs('#clearFile');
const tiktokUrl = qs('#tiktokUrl');
const caption = qs('#caption');
const detectCaption = qs('#detectCaption');
const repostForm = qs('#repostForm');
const queueList = qs('#queueList');
const settingsButton = qs('#settingsButton');

const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const setFile = (file) => {
  if (!file) return;
  fileName.textContent = file.name;
  fileMeta.textContent = `${formatBytes(file.size)} · ${file.type || 'video file'}`;
  filePreview.classList.remove('hidden');
};

videoInput.addEventListener('change', (event) => setFile(event.target.files[0]));

['dragenter', 'dragover'].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add('drag-over');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove('drag-over');
  });
});

dropZone.addEventListener('drop', (event) => {
  const file = event.dataTransfer.files[0];
  if (!file) return;

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  videoInput.files = dataTransfer.files;
  setFile(file);
});

clearFile.addEventListener('click', () => {
  videoInput.value = '';
  filePreview.classList.add('hidden');
});

const makePlaceholderCaption = (url) => {
  const trimmed = url.trim();
  if (!trimmed) return '';
  const username = trimmed.match(/@([^/]+)/)?.[1];
  return username
    ? `Placeholder caption from @${username}. Backend will replace this with the real TikTok caption.`
    : 'Placeholder caption. Backend will replace this with the real TikTok caption.';
};

detectCaption.addEventListener('click', () => {
  const detected = makePlaceholderCaption(tiktokUrl.value);
  caption.value = detected || 'Paste the TikTok link first.';
});

settingsButton?.addEventListener('click', () => {
  alert('Settings will be added when the backend is connected.');
});

repostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const file = videoInput.files[0];
  const link = tiktokUrl.value.trim();
  const selectedPlatforms = qsa('.platforms input:checked').map((input) => input.value);

  if (!file) return alert('Upload the saved TikTok video first.');
  if (!link) return alert('Paste the TikTok share link first.');
  if (!selectedPlatforms.length) return alert('Choose at least one platform.');

  const text = caption.value.trim() || 'No caption added.';

  queueList.innerHTML = `
    <article class="queue-item">
      <div class="queue-item-header">
        <strong>${file.name}</strong>
        <span class="queue-chip">queued</span>
      </div>
      <p>${text}</p>
      <div class="queue-platforms">
        ${selectedPlatforms.map((platform) => `<span class="queue-chip">${platform}</span>`).join('')}
      </div>
    </article>
  `;
});

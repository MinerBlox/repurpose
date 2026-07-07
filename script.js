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
const previewCaption = qs('#previewCaption');

const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const setFile = (file) => {
  if (!file) return;
  fileName.textContent = file.name;
  fileMeta.textContent = `${formatBytes(file.size)} · ${file.type || 'video file'}`;
  filePreview.classList.remove('hidden');
};

qsa('[data-scroll-to]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = qs(`#${button.dataset.scrollTo}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

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

const fakeCaptionFromUrl = (url) => {
  const clean = url.trim();
  if (!clean) return '';
  const author = clean.match(/@([^/]+)/)?.[1];
  const suffix = author ? ` via @${author}` : '';
  return `Auto-detected caption placeholder${suffix}. Backend will replace this with real TikTok metadata.`;
};

detectCaption.addEventListener('click', () => {
  const detected = fakeCaptionFromUrl(tiktokUrl.value);
  caption.value = detected || 'Paste a TikTok share link first.';
  previewCaption.textContent = caption.value;
});

caption.addEventListener('input', () => {
  previewCaption.textContent = caption.value || 'Caption preview will update here.';
});

repostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedPlatforms = qsa('.platform-selector input:checked').map((input) => input.value);
  const file = videoInput.files[0];

  if (!file) {
    alert('Upload your saved TikTok video first.');
    return;
  }

  if (!tiktokUrl.value.trim()) {
    alert('Paste the TikTok share link first.');
    return;
  }

  const body = caption.value.trim() || 'No caption added yet.';

  queueList.innerHTML = `
    <div class="queue-item">
      <div class="queue-item-header">
        <strong>${file.name}</strong>
        <span class="queue-chip">Queued</span>
      </div>
      <p>${body}</p>
      <div class="queue-platforms">
        ${selectedPlatforms.map((platform) => `<span class="queue-chip">${platform}</span>`).join('')}
      </div>
    </div>
  `;
});

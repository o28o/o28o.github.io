// Check the language in localStorage
const siteLanguage = localStorage.getItem('siteLanguage');

// Set the correct URL for the dictionary based on the language
let dpdlang;

// Condition to check the site language and URL
if (window.location.href.includes('/ru/') || window.location.href.includes('ml.html')) {

dpdlang = 'https://dict.dhamma.gift/ru/';
  //dpdlang = 'https://dpdict.net/ru/';
} else {
  dpdlang = 'https://dict.dhamma.gift/';
}

// Create elements for the Popup with resizing and moving capabilities
function createPopup() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.position = 'fixed';
  

  // Check browser window parameters
  const currentWindowWidth = window.innerWidth;
  const currentWindowHeight = window.innerHeight;

  const savedWindowWidth = localStorage.getItem('windowWidth');
  const savedWindowHeight = localStorage.getItem('windowHeight');

  // If the window size has changed, clear the saved popup data
  if (
    savedWindowWidth &&
    savedWindowHeight &&
    (parseInt(savedWindowWidth, 10) !== currentWindowWidth ||
      parseInt(savedWindowHeight, 10) !== currentWindowHeight)
  ) {
    const keys = ['popupWidth', 'popupHeight', 'popupTop', 'popupLeft', 'windowWidth', 'windowHeight'];
    keys.forEach(key => localStorage.removeItem(key));
    
  }

  // Save the current window size
  localStorage.setItem('windowWidth', currentWindowWidth);
  localStorage.setItem('windowHeight', currentWindowHeight);

  // Set the saved size and position if they exist
  

  
  const savedWidth = localStorage.getItem('popupWidth');
  const savedHeight = localStorage.getItem('popupHeight');
  const savedTop = localStorage.getItem('popupTop');
  const savedLeft = localStorage.getItem('popupLeft');
 
  
console.log('loaded: ' + savedTop +  'and ' + savedLeft);

  if (savedWidth) popup.style.width = savedWidth;
  if (savedHeight) popup.style.height = savedHeight;
  if (savedTop) popup.style.top = savedTop;
  if (savedLeft) 
  {
    popup.style.left = savedLeft;
  } 
  
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '<img src="assets/svg/xmark.svg" class=""></img>';

  const iframe = document.createElement('iframe');
  iframe.src = '';
  iframe.style.width = '100%';
  iframe.style.height = 'calc(100%)'; // Leave space for the header

  // Add a header for dragging
  const header = document.createElement('div');
  header.classList.add('popup-header');
  header.style.cursor = 'move';
  header.style.height = '10px';
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.padding = '0 10px';
  header.textContent = '';

  popup.appendChild(header);
  popup.appendChild(closeBtn);
  popup.appendChild(iframe);

  // Add popup and overlay to the page
  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  // Function to save the position and size
  function savePopupState() {
    localStorage.setItem('popupWidth', popup.style.width);
    localStorage.setItem('popupHeight', popup.style.height);
    localStorage.setItem('popupTop', popup.style.top);
    localStorage.setItem('popupLeft', popup.style.left);
    console.log('savedstates');
  }

  // Window dragging
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
let isFirstDrag = localStorage.getItem('isFirstDrag') === 'false' ? false : true;

    if (isFirstDrag) {
      popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.width = '80%';
  popup.style.height = '80%';
  popup.style.transform = 'translate(-50%, -50%)';
}

  // Mouse down handler (desktop)
  function startDrag(e) {
    isDragging = true;
    
      // Add this block for the first move
    if (isFirstDrag) {
      const rect = popup.getBoundingClientRect();
      popup.style.transform = 'none';  // Remove the transform that centers the window
      popup.style.top = rect.top + 'px';
      popup.style.left = rect.left + 'px';
      isFirstDrag = false;
    // Save the isFirstDrag state in sessionStorage
    localStorage.setItem('isFirstDrag', isFirstDrag);
    }  
   
    
    startX = e.clientX || e.touches[0].clientX; // Support for touch devices
    startY = e.clientY || e.touches[0].clientY;
    initialLeft = parseInt(popup.style.left || 0, 10);
    initialTop = parseInt(popup.style.top || 0, 10);
    e.preventDefault();
  }

  // Mouse move handler (desktop)
function moveDrag(e) {
    if (isDragging) {
      const deltaX = (e.clientX || e.touches[0].clientX) - startX;
      const deltaY = (e.clientY || e.touches[0].clientY) - startY;
      popup.style.left = `${initialLeft + deltaX}px`;
      popup.style.top = `${initialTop + deltaY}px`;
    }
  }

  // Mouse up handler (desktop)
  function stopDrag() {
    if (isDragging) {
      isDragging = false;
      savePopupState();
    }
  }

  // Handlers for dragging on desktop
  header.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', moveDrag);
  document.addEventListener('mouseup', stopDrag);

  // Handlers for dragging on mobile devices
  header.addEventListener('touchstart', startDrag);
  document.addEventListener('touchmove', moveDrag);
  document.addEventListener('touchend', stopDrag);

  // Resize the window
  popup.style.resize = 'both';
  popup.style.overflow = 'auto';

  const resizeObserver = new ResizeObserver(() => {
    savePopupState();
  });
  resizeObserver.observe(popup);

  return { overlay, popup, closeBtn, iframe };
}

// Insert the popup into the page
const { overlay, popup, closeBtn, iframe } = createPopup();

// Close the popup when clicking the button or the overlay
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
  iframe.src = ''; // Clear the iframe
  resizeObserver.disconnect();
});

overlay.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
  iframe.src = ''; // Clear the iframe
});

console.log('lookup dict ', dpdlang, ' siteLanguage ', siteLanguage);

// Check the state in localStorage when the page loads
let dictionaryVisible = localStorage.getItem('dictionaryVisible') === 'true';

const toggleBtn = document.querySelector('.toggle-dict-btn');
if (dictionaryVisible) {
  toggleBtn.innerHTML = '<img src="assets/svg/comment.svg"></img>';
} else {
  toggleBtn.innerHTML = '<img src="assets/svg/comment-slash.svg"></img>';
}

// Button handler to toggle dictionary visibility
toggleBtn.addEventListener('click', () => {
  dictionaryVisible = !dictionaryVisible;

  // Save the state in localStorage
  localStorage.setItem('dictionaryVisible', dictionaryVisible);

  if (dictionaryVisible) {
    toggleBtn.innerHTML = '<img src="assets/svg/comment.svg"></img>';
  } else {
    toggleBtn.innerHTML = '<img src="assets/svg/comment-slash.svg"></img>';
  }
});


// Word click interceptor
document.addEventListener('click', function(event) {
    // Check if the click was on an element with the class "pli-lang"
    if (event.target.closest('.pli-lang')) { // Consider nested elements
        const clickedWord = getClickedWordWithHTML(event.target, event.clientX, event.clientY);
        
                // If the click was on a link <a>, do nothing
        if (event.target.closest('a')) {
            return;
        }

        if (clickedWord) {
            // Remove quotes or apostrophes at the beginning of the word
            const cleanedWord = cleanWord(clickedWord);
            console.log('Clicked word:', cleanedWord);

            if (dictionaryVisible) {
//   use  /gd?search= for xompact mode
//     const url = `${dpdlang}gd?search=${encodeURIComponent(cleanedWord)}`;

               const url = `${dpdlang}search_html?q=${encodeURIComponent(cleanedWord)}`;
                iframe.src = url;
                popup.style.display = 'block';
                overlay.style.display = 'block';
                savePopupState();
            }
        }
    }
});

function getClickedWordWithHTML(element, x, y) {
    const range = document.caretRangeFromPoint(x, y);
    if (!range) return null;

    const parentElement = element.closest('.pli-lang');
    if (!parentElement) {
        console.log('Parent element with class pli-lang not found.');
        return null;
    }

    // Get the text without HTML tags
    const fullText = parentElement.textContent;

    // Calculate the offset in the text without considering HTML tags
    const globalOffset = calculateOffsetWithHTML(parentElement, range.startContainer, range.startOffset);
    if (globalOffset === -1) {
        console.error('Failed to calculate global offset.');
        return null;
    }

    console.log('Offset in full text:', globalOffset);

    // Use the updated regular expression to find the word
    const regex = /[^\s,;.!?()]+/g; // Regular expression ignoring spaces and punctuation
    let match;
    while ((match = regex.exec(fullText)) !== null) {
        if (match.index <= globalOffset && regex.lastIndex >= globalOffset) {
            console.log('Found word:', match[0]);
            return match[0];
        }
    }

    console.log('Word not found');
    return null;
}

// Function to calculate the global click offset in the full text
function calculateOffsetWithHTML(element, targetNode, targetOffset) {
    let offset = 0;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
        if (node === targetNode) {
            return offset + targetOffset;
        }
        offset += node.textContent.length;
    }

    console.log('Target node not found.');
    return -1; // Return an error if the node is not found
}

// Function to get the full text from an element, including all text nodes
function getFullTextFromElement(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
        textNodes.push(node.textContent);
    }

    return textNodes.join(' ').replace(/\s+/g, ' ').trim(); // Remove extra spaces
}

// Example of handling a click on an element
document.addEventListener('click', (event) => {
    const clickedWord = getClickedWordWithHTML(event.target, event.clientX, event.clientY);
    if (clickedWord) {
        console.log('Word on click:', clickedWord);
    } else {
        console.log('Word not defined');
    }
});

// Function to clean the word of extra characters
function cleanWord(word) {
    return word
        .replace(/^[\s'‘—.–…"“”]+/, ' ') // Remove characters at the beginning, including spaces and dashes
        .replace(/[\s'‘,—.—–"“…:;”]+$/, ' ') // Remove characters at the end, including spaces and dashes
        .replace(/[‘'’‘"“””]+/g, "'") // replace in the middle
        .trim()
        .toLowerCase();
}

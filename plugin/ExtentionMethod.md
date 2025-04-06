Adding Pali Lookup to any site, works for any browser that supports custom js extentions. e.g. Chrome, Edge, Brave, Safari.

Limitation: CORS related policies of some sites might block the iframe with the translation. 

1. Install one of the custom js extentions of your choice: e.g. Tampermonkey, ScriptCat, Violentmonkey.
2. Enable **developer mode in browser** settings. 
3. Create a custom script with the code listed below. This code is suitable for Tampermonkey and ScriptCat without any changes. For other extentions header part might slightly vary. 
4. Enable the extention, enable the custom script.
5. Open or refresh page and click the desired word. Enjoy.

This is a pretty basic code. If you'll improve it or get better solution for this case, please let me know.

If you're a webmaster and host Pali Texts. The [WebSitePlugin](https://github.com/o28o/dictPlugin?tab=readme-ov-file#dictplugin) method is a much user friendly way to add Pali Lookup to your site. 

   ## To customize the dictionary, try following

Choose prefered dictionary and uncomment it. 
**Don't forget to remove {WORD} from the examples
**
e.g. To enable instant word lookup in Dicttango Android aplication.    

```
dictURL = 'dttp://app.dicttango/WordLookup?word={WORD}'; 
```

You may use completly different dictionaries. Just need to know how to open the word. These are just examples: 
```
https://dsal.uchicago.edu/cgi-bin/app/pali_query.py?matchtype=default&qs={WORD}
https://www.wisdomlib.org/definition/{WORD}
https://www.learnsanskrit.cc/translate?dir=au&search={WORD}
https://sanskritdictionary.com/?iencoding=iast&lang=sans&action=Search&q={WORD}
```
   
   ## Code to paste in step 2

By default Compact DPD is used
```
// ==UserScript==
// @name         dict.dhamma.gift lookup
// @namespace    https://github.com/o28o/dictPlugin
// @version      2025-03-18
// @description  on click Dhamma.gift Search and Pali Lookup
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const dhammaGiftURL = 'https://dhamma.gift/?q=';
    const dgParams = '&p=-kn';
let dictURL;
let sandboxsandboxSettings = '';

//uncomment for compact online mode
  dictURL = 'https://dict.dhamma.gift/gd?search=';

//uncomment for full online mode
// dictURL = 'https://dict.dhamma.gift/search_html?q=';
// sandboxsandboxSettings = 'allow-scripts allow-forms allow-same-origin';

//uncomment for DictTango Android App Offline mode
//dictURL = 'dttp://app.dicttango/WordLookup?word=';


    const storageKey = 'dictPopupSize';

    let isEnabled = true;

    // Функция для создания popup
    function createPopup() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '99999';
        overlay.style.display = 'none';

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
  popup.style.width = '80%';
popup.style.height = '80%';
popup.style.maxWidth = '600px';
popup.style.transform = 'translate(-50%, -50%)';
        popup.style.background = 'white';
        popup.style.border = '2px solid #666';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        popup.style.zIndex = '100000';
        popup.style.display = 'none';
        popup.style.resize = 'both';
        popup.style.overflow = 'hidden';

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '10px';
        closeBtn.style.border = 'none';
        closeBtn.style.background = '#B71C1C';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.width = '30px';
        closeBtn.style.height = '30px';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.fontSize = '24px';
        closeBtn.style.display = 'flex';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.justifyContent = 'center';
      //  closeBtn.style.lineHeight = '1';

        const openBtn = document.createElement('a');
        openBtn.classList.add('open-btn');
        openBtn.style.position = 'absolute';
        openBtn.style.top = '10px';
        openBtn.style.right = '50px';
        openBtn.style.border = 'none';
        openBtn.style.background = '#244B26';
        openBtn.style.color = 'white';
        openBtn.style.cursor = 'pointer';
        openBtn.style.width = '30px';
        openBtn.style.height = '30px';
        openBtn.style.borderRadius = '50%';
        openBtn.style.display = 'flex';
        openBtn.style.alignItems = 'center';
        openBtn.style.justifyContent = 'center';
        openBtn.style.textDecoration = 'none';
        openBtn.target = '_blank';

        openBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="white" style="transform: scaleX(-1);">
                <path d="M505 442.7l-99.7-99.7c28.4-35.3 45.7-79.8 45.7-128C451 98.8 352.2 0 224 0S-3 98.8-3 224s98.8 224 224 224c48.2 0 92.7-17.3 128-45.7l99.7 99.7c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3zM224 384c-88.4 0-160-71.6-160-160S135.6 64 224 64s160 71.6 160 160-71.6 160-160 160z"/>
            </svg>
        `;

const iframe = document.createElement('iframe');

           if (!dictURL.includes('dicttango')) {
iframe.sandbox = sandboxsandboxSettings; 
           }
// 'allow-scripts allow-forms allow-same-origin allow-popups-to-escape-sandbox'; //allow-scripts allow-same-origin allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-top-navigation allow-top-navigation-by-user-activation
// allow-downloads allow-downloads-without-user-activation allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation allow-top-navigation-by-user-activation allow-clipboard-read allow-clipboard-write
iframe.style.height = '100%';
iframe.style.width = '100%';
iframe.style.border = 'none';


        const dragHandle = document.createElement('div');
        dragHandle.style.position = 'absolute';
        dragHandle.style.top = '0';
        dragHandle.style.left = '0';
        dragHandle.style.width = '100%';
        dragHandle.style.height = '5px';
        dragHandle.style.background = '#f0f0f0';
        dragHandle.style.cursor = 'move';

        popup.appendChild(dragHandle);
        popup.appendChild(closeBtn);
        popup.appendChild(openBtn);
        popup.appendChild(iframe);
        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        let isDragging = false;
        let offsetX, offsetY;

        dragHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - popup.getBoundingClientRect().left;
            offsetY = e.clientY - popup.getBoundingClientRect().top;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                popup.style.left = `${e.clientX - offsetX}px`;
                popup.style.top = `${e.clientY - offsetY}px`;
                popup.style.transform = 'none';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

function closePopup(event) {
    event.stopPropagation(); // Останавливаем всплытие события
    popup.style.display = 'none';
    overlay.style.display = 'none';
    iframe.src = '';
}

        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);

        function saveSize() {
            const size = {
                width: popup.style.width,
                height: popup.style.height
            };
            localStorage.setItem(storageKey, JSON.stringify(size));
        }

        function loadSize() {
            const savedSize = localStorage.getItem(storageKey);
            if (savedSize) {
                const { width, height } = JSON.parse(savedSize);
                popup.style.width = width;
                popup.style.height = height;
            }
        }

        function resetSize() {
            popup.style.width = '80%';
            popup.style.height = '80%';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            localStorage.removeItem(storageKey);
        }

        const resizeObserver = new ResizeObserver(saveSize);
        resizeObserver.observe(popup);
        window.addEventListener('resize', resetSize);
        loadSize();

        return { overlay, popup, iframe, openBtn };
    }

    const { overlay, popup, iframe, openBtn } = createPopup();

    function processWord(word) {
        return word
            .replace(/^[\s'‘—.–…"“”]+/, '')
            .replace(/[\s'‘,—.—–"“…:;”]+$/, '')
            .replace(/[‘'’‘"“””]+/g, "'")
            .trim()
            .toLowerCase();
    }

    function getWordUnderCursor(event) {
        const range = document.caretRangeFromPoint(event.clientX, event.clientY);
        if (!range) return null;
        const text = range.startContainer.textContent;
        const offset = range.startOffset;
        if (!text) return null;
        const regex = /[^\s,"";.–:—!?()]+/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            if (match.index <= offset && regex.lastIndex >= offset) {
                return match[0];
            }
        }
        return null;
    }

    function handleClick(event) {
        if (event.target.closest('a, button, input, textarea, select')) return;
        const clickedWord = getWordUnderCursor(event);
        if (clickedWord) {
            const processedWord = processWord(clickedWord);
            console.log('Слово:', processedWord);
            const url = `${dictURL}${encodeURIComponent(processedWord)}`;

            iframe.src = url;

           if (!dictURL.includes('dicttango')) {
            popup.style.display = 'block';
            overlay.style.display = 'block';
           }


            openBtn.href = `${dhammaGiftURL}${encodeURIComponent(processedWord)}${dgParams}`;
        }
    }

    document.addEventListener('click', handleClick);
})();
   ```

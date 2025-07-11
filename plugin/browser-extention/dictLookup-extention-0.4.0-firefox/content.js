// content.js
(async function() { // Make the IIFE async to use await
    'use strict';

    // 1. Cross-browser API helper
    const browserApi = typeof browser !== 'undefined' ? browser : chrome;

    // URLs and parameters for Pali Search and Lookup
    const dhammaGiftURL = 'https://dhamma.gift/?q='; // Base URL for Pali Search
    const dgParams = '&p=-kn'; // Additional parameters for Pali Search
    const storageKey = 'dictPopupSize'; // Key for storing popup size in localStorage
    const dictUrlKey = 'dictUrl'; // Key for storing custom dictionary URL
    
    // Default URLs
    const DEFAULT_DICT_URL = 'https://dict.dhamma.gift/search_html?q=';
    let customDictUrl = DEFAULT_DICT_URL; // Initialize with default value

    // 2. Load saved dictionary URL using await
    // This ensures customDictUrl is loaded before any dependent code runs
    try {
        const result = await browserApi.storage.sync.get(dictUrlKey);
        if (result && result[dictUrlKey]) {
            customDictUrl = result[dictUrlKey];
            console.log("Loaded customDictUrl from storage (initial):", customDictUrl);
        } else {
            console.log("No customDictUrl found in storage (initial), using default:", customDictUrl);
        }
    } catch (error) {
        console.error("Error loading customDictUrl from storage (initial):", error);
    }

    // Listen for URL changes
    // This can remain as a listener, as it updates customDictUrl when a change occurs later
    browserApi.storage.onChanged.addListener((changes, namespace) => {
        if (changes[dictUrlKey] && namespace === 'sync') { // Ensure it's sync storage
            customDictUrl = changes[dictUrlKey].newValue;
            console.log("customDictUrl updated via storage listener:", customDictUrl);
        }
    });

    let isEnabled = true; // Flag to track if the extension is enabled

    function savePopupStateExt() {
        localStorage.setItem('popupExtWidth', popupExt.style.width);
        localStorage.setItem('popupExtHeight', popupExt.style.height);
        localStorage.setItem('popupExtTop', popupExt.style.top);
        localStorage.setItem('popupExtLeft', popupExt.style.left);
    }

    function getSelectedText() {
        const selection = window.getSelection();
        return selection ? selection.toString().trim() : '';
    }

    // Function to create a popup for displaying search results
    function createPopupExt() {
        // Create overlay for background dimming
        const overlayExt = document.createElement('div');
        overlayExt.classList.add('overlayExt');
        overlayExt.style.position = 'fixed';
        overlayExt.style.top = '0';
        overlayExt.style.left = '0';
        overlayExt.style.width = '100%';
        overlayExt.style.height = '100%';
        overlayExt.style.background = 'rgba(0, 0, 0, 0.5)';
        overlayExt.style.zIndex = '99999';
        overlayExt.style.display = 'none';

        // Create popupExt container
        const popupExt = document.createElement('div');
        popupExt.classList.add('popupExt');
        popupExt.style.position = 'fixed';
        popupExt.style.top = '50%';
        popupExt.style.left = '50%';
        popupExt.style.width = '80%';
        popupExt.style.maxWidth = '600px';
        popupExt.style.maxHeight = '600px';
        popupExt.style.height = '80%';
        popupExt.style.transform = 'translate(-50%, -50%)';
        popupExt.style.background = 'white';
        popupExt.style.border = '2px solid #666';
        popupExt.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        popupExt.style.zIndex = '100000';
        popupExt.style.display = 'none';
        popupExt.style.resize = 'both'; // Allow resizing of the popupExt
        popupExt.style.overflow = 'hidden';

        // Close button for the popupExt
        const closeBtnExt = document.createElement('button');
        closeBtnExt.classList.add('close-btnExt');
        closeBtnExt.textContent = '×';
        closeBtnExt.style.position = 'absolute';
        closeBtnExt.style.top = '10px';
        closeBtnExt.style.right = '10px';
        closeBtnExt.style.border = 'none';
        closeBtnExt.style.background = '#B71C1C';
        closeBtnExt.style.color = 'white';
        closeBtnExt.style.cursor = 'pointer';
        closeBtnExt.style.width = '30px';
        closeBtnExt.style.height = '30px';
        closeBtnExt.style.borderRadius = '50%';
        closeBtnExt.style.fontSize = '24px';
        closeBtnExt.style.display = 'flex';
        closeBtnExt.style.alignItems = 'center';
        closeBtnExt.style.justifyContent = 'center';
        closeBtnExt.title = 'Close';

        // Open button to open the search in a new tab
        const openBtnExt = document.createElement('a');
        openBtnExt.classList.add('open-btnExt');
        openBtnExt.style.position = 'absolute';
        openBtnExt.style.top = '10px';
        openBtnExt.style.right = '50px';
        openBtnExt.style.border = 'none';
        openBtnExt.style.background = '#244B26';
        openBtnExt.style.color = 'white';
        openBtnExt.style.cursor = 'pointer';
        openBtnExt.style.width = '30px';
        openBtnExt.style.height = '30px';
        openBtnExt.style.borderRadius = '50%';
        openBtnExt.style.display = 'flex';
        openBtnExt.style.alignItems = 'center';
        openBtnExt.style.justifyContent = 'center';
        openBtnExt.style.textDecoration = 'none';
        openBtnExt.target = '_blank'; // Open link in a new tab
        openBtnExt.title = 'Search with Dhamma.Gift';

        // SVG icon for the open button
        openBtnExt.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="white" style="transform: scaleX(-1);">
                <path d="M505 442.7l-99.7-99.7c28.4-35.3 45.7-79.8 45.7-128C451 98.8 352.2 0 224 0S-3 98.8-3 224s98.8 224 224 224c48.2 0 92.7-17.3 128-45.7l99.7 99.7c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3zM224 384c-88.4 0-160-71.6-160-160S135.6 64 224 64s160 71.6 160 160-71.6 160-160 160z"/>
            </svg>
        `;
        
        // Dictionary button to open full dictionary in new tab (dict.dhamma.gift)
        const dictBtnExt = document.createElement('a');
        dictBtnExt.classList.add('dict-btnExt');
        dictBtnExt.style.position = 'absolute';
        dictBtnExt.style.top = '10px';
        dictBtnExt.style.right = '90px'; // Positioned to the left of openBtnExt
        dictBtnExt.style.border = 'none';
        dictBtnExt.style.background = '#2D3E50'; // Different color for distinction
        dictBtnExt.style.color = 'white';
        dictBtnExt.style.cursor = 'pointer';
        dictBtnExt.style.width = '30px';
        dictBtnExt.style.height = '30px';
        dictBtnExt.style.borderRadius = '50%';
        dictBtnExt.style.display = 'flex';
        dictBtnExt.style.alignItems = 'center';
        dictBtnExt.style.justifyContent = 'center';
        dictBtnExt.style.textDecoration = 'none';
        dictBtnExt.target = '_blank'; // Open link in a new tab
        dictBtnExt.title = 'Open in DPD full mode';
        
        // **SVG icon for dictionary button (assuming it will be handled externally or via CSS background-image)**
        // Or if you want to include a simpler SVG string directly (without XML declaration):
        // SVG icon for dictionary button
              dictBtnExt.innerHTML = `
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="16"
   height="16"
   viewBox="0 0 132.29167 132.29167"
   version="1.1"
   id="svg5"
   xml:space="preserve"
   inkscape:version="1.2.2 (b0a8486541, 2022-12-01)"
   sodipodi:docname="dpd-logo-dark.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview
     id="namedview7"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     showgrid="true"
     inkscape:zoom="1.6819304"
     inkscape:cx="230.68731"
     inkscape:cy="241.98385"
     inkscape:window-width="2048"
     inkscape:window-height="1252"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1"><inkscape:grid
       type="xygrid"
       id="grid9801"
       spacingx="13.229167"
       spacingy="13.229167" /></sodipodi:namedview><defs
     id="defs2"><rect
       x="623.54949"
       y="-94.37282"
       width="484.21534"
       height="376.887"
       id="rect9793" /><rect
       x="-321.14527"
       y="85.608354"
       width="283.33104"
       height="181.75908"
       id="rect3173" /><rect
       x="53.865571"
       y="95.434039"
       width="392.08253"
       height="309.07333"
       id="rect3161" /></defs><g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"><path
       id="path111"
       style="fill:#e5f7ff;stroke-width:0.26587;fill-opacity:1"
       d="M 132.29168,66.145836 A 66.145844,66.145836 0 0 1 66.145836,132.29167 66.145844,66.145836 0 0 1 -7.6293945e-6,66.145836 66.145844,66.145836 0 0 1 66.145836,0 66.145844,66.145836 0 0 1 132.29168,66.145836 Z" /><text
       xml:space="preserve"
       transform="scale(0.26458333)"
       id="text3159"
       style="white-space:pre;shape-inside:url(#rect3161);display:inline;fill:#e5f7ff;fill-opacity:1" /><image
       width="135.46666"
       height="135.46666"
       preserveAspectRatio="none"
       xlink:href="data:image/png;base64,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 "
       id="image8596"
       x="-140.22711"
       y="-1.9911809" /><text
       xml:space="preserve"
       transform="scale(0.26458333)"
       id="text9791"
       style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:226.667px;font-family:Inter;-inkscape-font-specification:'Inter Bold';text-align:center;white-space:pre;shape-inside:url(#rect9793);display:inline;fill:#ecf9ff;fill-opacity:1" /><g
       aria-label="dpd"
       id="text9799"
       style="font-weight:bold;font-size:69.4843px;font-family:Inter;-inkscape-font-specification:'Inter Bold';text-align:center;text-anchor:middle;fill:#00121a;stroke-width:0.306548;fill-opacity:1"
       transform="matrix(0.89266763,0,0,0.89266763,5.5336428,8.0597213)"><path
         d="m 19.218448,85.54734 q -4.682047,0 -8.176619,-2.341024 Q 7.5472575,80.865292 5.6133683,76.658235 3.713407,72.451178 3.713407,66.853078 q 0,-5.530245 1.9338892,-9.703374 1.967817,-4.207057 5.4284608,-6.548081 3.494572,-2.374952 8.074835,-2.374952 2.341024,0 4.308841,0.64463 1.967817,0.610702 3.5285,1.866033 1.560682,1.255332 2.71423,3.189221 h 0.03393 V 34.248385 H 39.71089 V 84.800926 H 29.871803 V 79.30461 h -0.03393 q -1.051765,2.0696 -2.646375,3.494571 -1.560682,1.391043 -3.596355,2.069601 -2.035673,0.678558 -4.376697,0.678558 z m 2.578519,-8.142692 q 2.544591,0 4.410625,-1.289259 1.899961,-1.323187 2.951725,-3.698139 1.051764,-2.374952 1.051764,-5.564172 0,-3.223149 -1.051764,-5.564173 -1.051764,-2.374951 -2.951725,-3.664211 -1.866034,-1.323187 -4.410625,-1.323187 -2.408879,0 -4.207057,1.255331 -1.798178,1.255332 -2.816014,3.596356 -0.983909,2.341023 -0.983909,5.699884 0,3.35886 0.983909,5.733811 1.017836,2.341024 2.816014,3.596356 1.798178,1.221403 4.207057,1.221403 z"
         id="path1527"
         style="fill:#00121a;fill-opacity:1" /><path
         d="M 46.801815,98.98278 V 48.973085 h 9.873013 v 4.851687 h 0.101783 q 1.119621,-1.866034 2.680303,-3.087438 1.59461,-1.255331 3.596355,-1.866033 2.035673,-0.64463 4.342769,-0.64463 4.580264,0 8.040908,2.374952 3.494571,2.341024 5.42846,6.548081 1.967818,4.173129 1.967818,9.703374 0,5.5981 -1.93389,9.805157 -1.933889,4.207057 -5.394533,6.548081 -3.460643,2.341024 -8.176619,2.341024 -2.341023,0 -4.342768,-0.678558 -1.967817,-0.678558 -3.5285,-2.035673 -1.526755,-1.357115 -2.544591,-3.392788 H 56.810539 V 98.98278 Z M 64.749663,77.404648 q 2.442808,0 4.207057,-1.221403 1.798178,-1.255332 2.782087,-3.596356 1.017836,-2.374951 1.017836,-5.733811 0,-3.358861 -1.017836,-5.699884 -0.983909,-2.341024 -2.782087,-3.596356 -1.764249,-1.255331 -4.207057,-1.255331 -2.510663,0 -4.444552,1.323187 -1.899961,1.28926 -2.951726,3.664211 -1.017836,2.341024 -1.017836,5.564173 0,3.18922 1.017836,5.564172 1.051765,2.374952 2.951726,3.698139 1.933889,1.289259 4.444552,1.289259 z"
         id="path1529"
         style="fill:#00121a;fill-opacity:1" /><path
         d="m 102.2739,85.54734 q -4.682049,0 -8.17662,-2.341024 -3.494572,-2.341024 -5.428461,-6.548081 -1.899962,-4.207057 -1.899962,-9.805157 0,-5.530245 1.93389,-9.703374 1.967817,-4.207057 5.42846,-6.548081 3.494572,-2.374952 8.074833,-2.374952 2.34103,0 4.30884,0.64463 1.96782,0.610702 3.5285,1.866033 1.56069,1.255332 2.71423,3.189221 h 0.0339 v -19.67817 h 9.9748 v 50.552541 h -9.83909 V 79.30461 h -0.0339 q -1.05177,2.0696 -2.64638,3.494571 -1.56068,1.391043 -3.59635,2.069601 -2.03568,0.678558 -4.3767,0.678558 z m 2.57852,-8.142692 q 2.54459,0 4.41062,-1.289259 1.89996,-1.323187 2.95173,-3.698139 1.05176,-2.374952 1.05176,-5.564172 0,-3.223149 -1.05176,-5.564173 -1.05177,-2.374951 -2.95173,-3.664211 -1.86603,-1.323187 -4.41062,-1.323187 -2.40888,0 -4.20706,1.255331 -1.798177,1.255332 -2.816014,3.596356 -0.983908,2.341023 -0.983908,5.699884 0,3.35886 0.983908,5.733811 1.017837,2.341024 2.816014,3.596356 1.79818,1.221403 4.20706,1.221403 z"
         id="path1531"
         style="fill:#00121a;fill-opacity:1" /></g></g></svg>

        `;     
        // iframeExt to display search results
        const iframeExt = document.createElement('iframe');
        iframeExt.style.height = '100%';
        iframeExt.style.width = '100%';
        iframeExt.style.border = 'none';
        iframeExt.style.overflow = 'hidden';

        // Drag handle for moving the popupExt
        const resizeHandleExt = document.createElement('div');
        resizeHandleExt.classList.add('resize-handleExt');
        resizeHandleExt.style.position = 'absolute';
        resizeHandleExt.style.right = '0';
        resizeHandleExt.style.bottom = '0';
        resizeHandleExt.style.width = '20px';
        resizeHandleExt.style.height = '20px';
        resizeHandleExt.style.cursor = 'nwse-resize';
        resizeHandleExt.style.zIndex = '10';
        
        // Create triangle for resize handle
        resizeHandleExt.innerHTML = `
            <style>
                .resize-handle::after {
                    content: "";
                    position: absolute;
                    right: 3px;
                    bottom: 3px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 0 12px 12px;
                    border-color: transparent transparent #666 transparent;
                }
            </style>
        `;

        const headerExt = document.createElement('div');
        headerExt.classList.add('popup-headerExt');
        headerExt.style.cursor = 'move';
        headerExt.style.height = '10px';
        headerExt.style.display = 'flex';
        headerExt.style.alignItems = 'center';
        headerExt.style.padding = '0 10px';
        headerExt.textContent = '';

        // Append elements to the popup and document body
        popupExt.appendChild(headerExt);
        popupExt.appendChild(dictBtnExt);
        popupExt.appendChild(openBtnExt);
        popupExt.appendChild(closeBtnExt);
        popupExt.appendChild(iframeExt);
        popupExt.appendChild(resizeHandleExt);

        document.body.appendChild(overlayExt);
        document.body.appendChild(popupExt);

        // Drag functionality
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        let isFirstDrag = localStorage.getItem('isFirstDrag') === 'false' ? false : true;

        if (isFirstDrag) {
            popupExt.style.top = '50%';
            popupExt.style.left = '50%';
            popupExt.style.width = '80%';
            popupExt.style.maxWidth = '600px';
            popupExt.style.height = '80%';
            popupExt.style.transform = 'translate(-50%, -50%)';
        }

        function startDragExt(e) {
            isDragging = true;
            
            if (isFirstDrag) {
                const rect = popupExt.getBoundingClientRect();
                popupExt.style.transform = 'none';
                popupExt.style.top = rect.top + 'px';
                popupExt.style.left = rect.left + 'px';
                isFirstDrag = false;
                localStorage.setItem('isFirstDrag', isFirstDrag);
            }  
            
            startX = e.clientX || e.touches[0].clientX;
            startY = e.clientY || e.touches[0].clientY;
            initialLeft = parseInt(popupExt.style.left || 0, 10);
            initialTop = parseInt(popupExt.style.top || 0, 10);
            e.preventDefault();
        }

        function moveDragExt(e) {
            if (isDragging) {
                const deltaX = (e.clientX || e.touches[0].clientX) - startX;
                const deltaY = (e.clientY || e.touches[0].clientY) - startY;
                popupExt.style.left = `${initialLeft + deltaX}px`;
                popupExt.style.top = `${initialTop + deltaY}px`;
            }
        }

        function stopDragExt() {
            if (isDragging) {
                isDragging = false;
                savePopupStateExt();
            }
        }

        // Event listeners for dragging
        headerExt.addEventListener('mousedown', startDragExt);
        document.addEventListener('mousemove', moveDragExt);
        document.addEventListener('mouseup', stopDragExt);
        headerExt.addEventListener('touchstart', startDragExt);
        document.addEventListener('touchmove', moveDragExt);
        document.addEventListener('touchend', stopDragExt);

        // Function to close the popupExt
        function closePopupExt(event) {
            event.stopPropagation();
            popupExt.style.display = 'none';
            overlayExt.style.display = 'none';
            iframeExt.src = '';
        }

        closeBtnExt.addEventListener('click', closePopupExt);
        overlayExt.addEventListener('click', closePopupExt);

        // Save popupExt size to localStorage
        function saveSizeExt() {
            const size = {
                width: popupExt.style.width,
                height: popupExt.style.height
            };
            localStorage.setItem(storageKey, JSON.stringify(size));
        }

        // Load saved popupExt size from localStorage
        function loadSizeExt() {
            const savedSize = localStorage.getItem(storageKey);
            if (savedSize) {
                const { width, height } = JSON.parse(savedSize);
                popupExt.style.width = width;
                popupExt.style.height = height;
            }
        }

        // Resize functionality
        let isResizing = false;
        let startWidth, startHeight, startResizeExtX, startResizeExtY;

        resizeHandleExt.addEventListener('mousedown', startResizeExt);
        resizeHandleExt.addEventListener('touchstart', startResizeExt);

        function startResizeExt(e) {
            isResizing = true;
            startWidth = parseInt(document.defaultView.getComputedStyle(popupExt).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(popupExt).height, 10);
            startResizeExtX = e.clientX || e.touches[0].clientX;
            startResizeExtY = e.clientY || e.touches[0].clientY;
            
            e.preventDefault();
            e.stopPropagation();
        }

        function doResizeExt(e) {
            if (!isResizing) return;
            
            const currentX = e.clientX || e.touches[0].clientX;
            const currentY = e.clientY || e.touches[0].clientY;
            
            const newWidth = startWidth + (currentX - startResizeExtX);
            const newHeight = startHeight + (currentY - startResizeExtY);
            
            const minWidth = 200;
            const minHeight = 150;
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.9;
            
            popupExt.style.width = Math.max(minWidth, Math.min(newWidth, maxWidth)) + 'px';
            popupExt.style.height = Math.max(minHeight, Math.min(newHeight, maxHeight)) + 'px';
            
            e.preventDefault();
            e.stopPropagation();
        }

        function stopResizeExt() {
            isResizing = false;
            savePopupStateExt();
        }

        document.addEventListener('mousemove', doResizeExt);
        document.addEventListener('touchmove', doResizeExt);
        document.addEventListener('mouseup', stopResizeExt);
        document.addEventListener('touchend', stopResizeExt);
        
        loadSizeExt();

        // 6. Return values from createPopupExt for use in the main IIFE scope
        return { overlayExt, popupExt, iframeExt, openBtnExt, dictBtnExt };
    }

    // 7. Call createPopupExt after customDictUrl is potentially loaded
    const { overlayExt, popupExt, iframeExt, openBtnExt, dictBtnExt } = createPopupExt();

    // Function to process and clean up the word
    function processWordExt(word) {
        return word
            .replace(/^[\s'‘—.–…"“”]+/, '') // Remove leading punctuation
            .replace(/[\s'‘,—.—–"“…:;”]+$/, '') // Remove trailing punctuation
            .replace(/[‘'’‘"“””]+/g, "'") // Normalize quotes
            .trim()
            .toLowerCase();
    }

    // Function to get the word under the cursor
    function getWordUnderCursorExt(event) {
        const range = document.caretRangeFromPoint(event.clientX, event.clientY);
        if (!range) return null;
        const text = range.startContainer.textContent;
        const offset = range.startOffset;
        if (!text) return null;
        const regex = /[^\s,"";.–:—!?()]+/g; // Regex to match words
        let match;
        while ((match = regex.exec(text)) !== null) {
            if (match.index <= offset && regex.lastIndex >= offset) {
                return match[0];
            }
        }
        return null;
    }

    // Function to show translation for a given word
    async function showTranslation(word) { // Make this function async
        const processedWord = processWordExt(word);
        const url = `${customDictUrl}${encodeURIComponent(processedWord)}`;
        iframeExt.src = url;
        popupExt.style.display = 'block';
        overlayExt.style.display = 'block';
        openBtnExt.href = `${dhammaGiftURL}${encodeURIComponent(processedWord)}${dgParams}`;
        
        // 8. Update dictBtnExt href based on custom URL (now awaits for consistency)
        try {
            const result = await browserApi.storage.sync.get(dictUrlKey);
            const dictUrl = result[dictUrlKey] || DEFAULT_DICT_URL; // Use the loaded value or default
            dictBtnExt.href = `${dictUrl}${encodeURIComponent(processedWord)}`;
        } catch (error) {
            console.error("Error updating dictBtnExt href:", error);
            dictBtnExt.href = `${DEFAULT_DICT_URL}${encodeURIComponent(processedWord)}`; // Fallback to default
        }
    }

    // Function to handle click events and display search results
    function handleClickExt(event) {
        if (!isEnabled) return;
        if (event.target.closest('a, button, input, textarea, select')) return;
        
        // First check for selected text
        const selectedText = getSelectedText();
        if (selectedText) {
            showTranslation(selectedText);
            return;
        }
        
        // If no text selected, check for word under cursor
        const clickedWord = getWordUnderCursorExt(event);
        if (clickedWord) {
            showTranslation(clickedWord);
        }
    }

    // Initialize extension state (using browserApi)
    // This can remain as a callback because it's handling initial state,
    // but can also be awaited if subsequent code depends on `isEnabled`
    browserApi.storage.local.get(['isEnabled'], (result) => {
        isEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
        if (isEnabled) {
            document.addEventListener('click', handleClickExt);
            console.log("Extension enabled, click listener added.");
        } else {
            console.log("Extension disabled on load.");
        }
    });

    // Listener for storage changes (using browserApi)
    browserApi.storage.onChanged.addListener((changes, namespace) => {
        if (changes.isEnabled && namespace === 'local') { // Ensure it's local storage
            isEnabled = changes.isEnabled.newValue;
            if (isEnabled) {
                document.addEventListener('click', handleClickExt);
                console.log("Extension enabled via storage change.");
            } else {
                document.removeEventListener('click', handleClickExt);
                popupExt.style.display = 'none';
                overlayExt.style.display = 'none';
                console.log("Extension disabled via storage change.");
            }
        }
    });

})(); // End of async IIFE
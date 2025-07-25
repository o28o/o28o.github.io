document.addEventListener('DOMContentLoaded', function() {
    const urlPreset = document.getElementById('urlPreset');
    const customUrlContainer = document.getElementById('customUrlContainer');
    const customUrl = document.getElementById('customUrl');
    const saveButton = document.getElementById('save');
    const resetButton = document.getElementById('reset');
    const status = document.getElementById('status');
    
    // Показываем/скрываем поле для кастомного URL
    urlPreset.addEventListener('change', function() {
        if (this.value === 'custom') {
            customUrlContainer.style.display = 'block';
            customUrl.focus();
        } else {
            customUrlContainer.style.display = 'none';
        }
    });
    
    // Сохранение настроек
    saveButton.addEventListener('click', function() {
        let selectedUrl;
        
        if (urlPreset.value === 'custom') {
            selectedUrl = customUrl.value.trim();
            if (!selectedUrl) {
                showStatus('Please enter a custom URL', 'error');
                return;
            }
            
            // Basic URL validation
            if (!selectedUrl.includes('?q=') && !selectedUrl.includes('?search=')) {
                showStatus('Error: URL must contain "?q=" or "?search=" parameter', 'error');
                return;
            }
        } else {
            selectedUrl = urlPreset.value;
        }
        
        // Сохраняем в chrome.storage
        chrome.storage.sync.set({ dictUrl: selectedUrl }, function() {
            showStatus('Settings saved!', 'success');
        });
    });

    // Сброс настроек
    resetButton.addEventListener('click', function() {
        // Удаляем URL из sync storage
        chrome.storage.sync.remove('dictUrl', function() {
            // Устанавливаем флаг для сброса попапа в content script
            chrome.storage.local.set({ 'popup_reset_flag': true });

            // Отправляем сообщение в background.js для сброса состояния
            chrome.runtime.sendMessage({ action: 'reset_extension_state' });
            
            // Сбрасываем UI
            urlPreset.selectedIndex = 0;
            customUrlContainer.style.display = 'none';
            customUrl.value = '';
            
            showStatus('Settings reset. Please reload the page you were reading.', 'success');
        });
    });
    
    // Загрузка сохраненных настроек
    chrome.storage.sync.get(['dictUrl'], function(result) {
        if (result.dictUrl) {
            // Проверяем, есть ли этот URL в предустановленных
            const options = urlPreset.options;
            let found = false;
            
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === result.dictUrl) {
                    urlPreset.selectedIndex = i;
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                urlPreset.selectedIndex = options.length - 1; // Выбираем "Custom URL..."
                customUrlContainer.style.display = 'block';
                customUrl.value = result.dictUrl;
            }
        }
    });
    
    function showStatus(message, type) {
        status.textContent = message;
        status.className = type;
        status.style.display = 'block';
        
        setTimeout(function() {
            status.style.display = 'none';
        }, 3000);
    }
});
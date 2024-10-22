import React from 'react';
import ReactDOM from 'react-dom';
import ChatModal from './ChatModal';

/**
 * Content script for displaying AI Icon on LinkedIn messaging page
 */
export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],
  runAt: "document_idle",
  main(ctx) {
    let messageInputField: HTMLElement | null = null;

    /**
     * Shows AI Icon on the message input field
     * @param {HTMLElement} targetElement The message input field
     */
    async function showAIIconOnMessageInputField(targetElement: HTMLElement) {
      if (document.getElementById('ai-icon')) return; // Avoid duplicates

      const icon = document.createElement('span');
      icon.id = 'ai-icon';
      icon.style.cursor = 'pointer'; 
      icon.style.position = 'absolute'; 
      icon.style.bottom = `15px`; 
      icon.style.right = `15px`;
      icon.style.zIndex = '99';

      icon.innerHTML = `<div class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg">
        <img src="${browser.runtime.getURL('icon/Vector.svg' as any)}" alt="AI Icon" class="w-6 h-6 text-blue-500" />
      </div>`

      targetElement.appendChild(icon);

      icon.addEventListener('click', () => {
        showModalForMessageInputField(targetElement);
      });
    }

    /**
     * Hides AI Icon on the message input field
     */
    function hideAIIcon() {
      const icon = document.getElementById('ai-icon');
      if (icon) {
        icon.remove();
      }
    }

    /**
     * Shows modal for inserting AI generated message
     * @param {HTMLElement} messageInputField The message input field
     */
    function showModalForMessageInputField(messageInputField: HTMLElement) {
      const modalContainer = document.createElement('div');
      modalContainer.id = 'ai-modal';
      modalContainer.style.position = 'fixed';
      modalContainer.style.top = '0';
      modalContainer.style.left = '0';
      modalContainer.style.width = '100vw';
      modalContainer.style.height = '100vh';
      modalContainer.style.display = 'flex';
      modalContainer.style.alignItems = 'center';
      modalContainer.style.justifyContent = 'center';
      modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Dark transparent background
      modalContainer.style.zIndex = '9999'; // Ensure it's above other content
      modalContainer.style.borderRadius = '10px';

      document.body.appendChild(modalContainer);
      modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
          hideModal();
        }
      });
      ReactDOM.render(
        <ChatModal
          onHide={() => {
            hideModal();
          }}
          onInsertMessage={(message: string) => {
            insertMessageIntoInputField(messageInputField, message);
            hideModal();
          }}
        />,
        modalContainer
      );
    }

    /**
     * Hides modal
     */
    function hideModal() {
      const modalContainer = document.getElementById('ai-modal');
      if (modalContainer) {
        ReactDOM.unmountComponentAtNode(modalContainer);
        modalContainer.remove();
      }
    }

    /**
     * Inserts generated message into the message input field
     * @param {HTMLElement} messageInputField The message input field
     * @param {string} message The generated message
     */
    function insertMessageIntoInputField(messageInputField: HTMLElement, message: string) {
      if (messageInputField) {
        messageInputField.innerHTML = `<p>${message}</p>`;
        messageInputField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }

    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.getAttribute('data-artdeco-is-focused') === 'true' && target.classList.contains('msg-form__contenteditable')) {
        messageInputField = target;
        showAIIconOnMessageInputField(messageInputField);
      }
    });

    document.addEventListener('focusout', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('msg-form__contenteditable')) {
        hideAIIcon();
      }
    });
  }
});
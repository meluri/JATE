const butInstall = document.getElementById('buttonInstall');

// Variable to store the event
let deferredPrompt;

// Add an event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing
  event.preventDefault();

  // Save the event so it can be triggered later
  deferredPrompt = event;

  // Remove the hidden class from the install button
  butInstall.style.display = 'block';

  console.log('👍', 'beforeinstallprompt', event);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log('👍', 'userChoice', outcome);

    // Reset the deferredPrompt variable, as it can only be used once
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);

  // Optionally show a notification or log when the app is successfully installed
  alert('App successfully installed!');
});
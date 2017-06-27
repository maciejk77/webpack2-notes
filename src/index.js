const buttons = document.createElement('button');
button.innerText = 'Click me';
button.onclick = () => {
  System.import('./image_viewer').then(module => { // an idea how to import module into the web page, Promise which when fullfilled then will console log object in this example
    console.log(module);
  });
};

document.body.appendChild(button);
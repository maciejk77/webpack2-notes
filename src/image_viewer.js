// importing image assets 
//import big from '../assets/big.jpg'; // is around 120kB so it will land in build folder on compile
import small from '../assets/small.jpg'; // is below 40kB so should be included in bundle.js file

import '../styles/image_viewer.css';

export default () => {  
const image = document.createElement('img');
image.src = small;

document.body.appendChild(image);
};

//const bigImage = document.createElement('img');
//bigImage.src = big;

//document.body.appendChild(bigImage);
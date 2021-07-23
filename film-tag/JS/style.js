export const styleInLine = `
<link
rel="stylesheet"
href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
crossorigin="anonymous"
/>
<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
/>
<script
src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
crossorigin="anonymous"
></script>
<script
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
crossorigin="anonymous"
></script>
<script
src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
crossorigin="anonymous"
></script>
<style>
* {
    font-family: Roboto, sans-serif;
    list-style-type: none;
  }
  img{
    max-width: 100%;
  }
  .block-description {
    position: absolute;
    left: 25px;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .block-description > h6 {
    font-size: 18px;
    color: var(--iq-white-color);
    text-transform: capitalize;
    margin-bottom: 0;
  }
  .block-description > h6 > a {
    text-decoration: none;
    color: #d8d0cf;
  }
  .actions {
    position: absolute;
    right: 25px;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .btnPlay {
    background-color: #e50914;
    text-align: center;
    color: white;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  .title {
    width: fit-content;
  }
  .title > a {
    font-weight: bold;
    font-size: 18px;
  }
  .title > a:hover {
    cursor: pointer;
    color: #e50914;
    transition: 1s;
  }
  .component{
    padding: 0; 
    // border-left: 0px solid #e50914;
  }
  .component:hover {
    box-shadow: rgba(0, 0, 0, 0.56) 5px 5px 50px 4px;
    // overflow: visible;
    // border-left: 5px solid #e50914;
    transform: translateX(10px) scale(1.1);
    transition: 0.8s;
    z-index: 1;
  }
  .component:hover .img {
    filter: brightness(50%);
    transition: 1s;
  }
  .component:hover .block-description {
    opacity: 0;
  }
  .component:hover .block-description {
    opacity: 1;
    transition: 1s;
  }
  .btnPlay:hover,
  .btnPlay:focus {
    cursor: pointer;
    box-shadow: inset -5em 0 0 0 #bf000a, inset 5em 0 0 0 #bf000a;
    transition: 0.6s;
  }
  /* actions */
  .actions {
    position: absolute;
    top: 0;
    left: auto;
    bottom: 0;
    right: 25px;
    z-index: 999;
    display: flex;
    align-items: center;
    opacity: 0;
    width: 40px;
  }
  .component:hover .actions {
    opacity: 1;
    transition: 1s;
  }
  .actions .music-play-lists li {
    height: 40px;
    width: 40px;
  }
  .music-play-lists li {
    position: relative;
    height: 30px;
    width: 30px;
    line-height: 35px;
    text-align: center;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    margin: 5px auto;
    display: flex;
    -webkit-display: flex;
    -moz-display: flex;
    -o-display: flex;
    align-items: center;
  }
  .music-play-lists span {
    position: relative;
    height: 30px;
    width: 30px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    background: white;
    color: #e50914;
    border-radius: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .music-play-lists span:hover {
    background: #e50914;
    color: white;
    transition: 0.6s;
  }
  .music-play-lists .count-box {
    position: absolute;
    height: 15px !important;
    width: 15px !important;
    line-height: 15px i !important;
    font-size: 8px !important;
    background: #e50914 !important;
    color: white !important;
    right: 0;
    top: 0px;
    padding: 0;
    text-align: center !important;
  }
  .share-box {
    display: none;
    position: absolute;
    width: max-content;
    top: 3px;
    right: 40px;
    left: auto;
    background-color: #191919;
    padding: 0px 5px;
    border-radius: 0px;
    text-align: center;
    z-index: 2;
  }
  .share:hover .share-box {
    display: inline-block;
  }
  .share-box a {
    text-align: center;
    color: white;
    margin: 0 5px;
  }
  .share-box i:hover {
    text-decoration: unset;
    color: #e50914;
    transition: 0.6s;
  }

  
</style>
`;

const { useState, useEffect } = React;

const AudioPlayer = ({ audioSrc, id, display, on, volume, text, isActive }) => {
  const [focusedButton, setFocusedButton] = useState(null);

  const playAudio = () => {
    if (on) {
      display(text);

      const audioElement = document.getElementById(id);
      if (audioElement) {
        audioElement.volume = volume / 100;
        audioElement.play();
      }
    }
  };

  return /*#__PURE__*/(
    React.createElement("button", { className: "", id: text, className: `drum-pad btn btn-warning m-1 ${isActive ? 'active' : ''}`,
      onClick: playAudio,
      style: { width: '80px', height: '80px' } }, id, /*#__PURE__*/
    React.createElement("audio", { id: id, className: "clip", src: audioSrc, type: "audio/mp3" })));







};

const Display = props => {

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", {
      className: " d-flex flex-column align-items-center justify-content-center",
      style: { height: "100%" } }, /*#__PURE__*/


    React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, " Power")), /*#__PURE__*/
    React.createElement("div", { className: "form-check form-switch" }, /*#__PURE__*/
    React.createElement("input", { className: "form-check-input custom-control-input", type: "checkbox", role: "switch", id: "flexSwitchCheckDefault", checked: props.on, onChange: () => {props.setOn(!props.on);} })), /*#__PURE__*/



    React.createElement("div", {
      className: "  text-light d-flex align-items-center text-center justify-content-center m-4",
      style: { width: "100%", height: "40px", backgroundColor: "#004643" }, id: "display" }, props.text), /*#__PURE__*/
    React.createElement("p", null, "Volume"), /*#__PURE__*/
    React.createElement("input", {
      type: "range",
      className: "form-range custom-range",
      id: "customRange1",
      min: "0",
      max: "100",
      value: props.volume,
      onChange: e => {
        props.setVolume(e.target.value);
        props.setDisplay(`Volume: ${e.target.value}`);
        setTimeout(() => {
          props.setDisplay('');
        }, 1000);
      } }))));





};

const Drum = () => {
  const [text, setText] = useState(" ");
  const [on, setOn] = useState(true);
  const [volume, setVolume] = useState(50);

  const [audioFiles, setAudioFiles] = useState([
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', id: 'Q', display: 'Heater 1' },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', id: 'W', display: 'Heater 2' },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', id: 'E', display: 'Heater 3' },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', id: 'A', display: 'Heater 4' },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', id: 'S', display: 'Clap' },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', id: 'D', display: 'Open HH' },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', id: 'Z', display: "Kick n'Hat" },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', id: 'X', display: 'Kick' },
  { src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', id: 'C', display: 'Clone HH' }]);



  const [buttonStatus, setButtonStatus] = useState({
    Q: false,
    W: false,
    E: false,
    A: false,
    S: false,
    D: false,
    Z: false,
    X: false,
    C: false });





  useEffect(() => {
    const handleKeyDown = event => {
      const key = event.key.toUpperCase();
      const audioFile = audioFiles.find(file => file.id === key);

      if (audioFile) {
        const audioElement = document.getElementById(audioFile.id);

        if (on && !buttonStatus[key]) {
          setText(audioFile.display);

          setTimeout(() => {

            setButtonStatus(prevStatus => ({
              ...prevStatus,
              [key]: false }));

          }, 500);

          setButtonStatus(prevStatus => ({
            ...prevStatus,
            [key]: true }));


          if (audioElement) {
            audioElement.volume = volume / 100;
            audioElement.play();
          }
        }
      }
    };



    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [audioFiles, volume, setText, on]);

  return /*#__PURE__*/(
    React.createElement("div", {
      className: "min-vh-100 d-flex flex-column align-items-center justify-content-center",
      tabIndex: "0" }, /*#__PURE__*/

    React.createElement("div", { className: "container row p-5 rounded-3", id: "drum-machine", style: { backgroundColor: "#abd1c6" } }, /*#__PURE__*/
    React.createElement("div", { className: "col" }, /*#__PURE__*/
    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("div", { className: "row" },
    audioFiles.map((audioFile, index) => /*#__PURE__*/
    React.createElement("div", { key: index, className: "col-4" }, /*#__PURE__*/
    React.createElement(AudioPlayer, {
      audioSrc: audioFile.src,
      id: audioFile.id,
      display: setText,
      on: on,
      volume: volume,
      text: audioFile.display,
      isActive: buttonStatus[audioFile.id] })))))), /*#__PURE__*/






    React.createElement("div", { className: "col", id: "display" }, /*#__PURE__*/
    React.createElement(Display, {
      text: text,
      setOn: setOn,
      on: on,
      volume: volume,
      setVolume: setVolume,
      setDisplay: setText }))), /*#__PURE__*/




    React.createElement("span", null, "Code by", /*#__PURE__*/

    React.createElement("a", {
      href: "https://github.com/sanskriti-03-04",
      target: "_black",
      className: "text-decoration-none",
      style: { color: "#004643" } }, " SanskritiKumari"), " ")));



};

class App extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "App" }, /*#__PURE__*/
      React.createElement(Drum, null)));


  }}


const rootElement = document.getElementById("root");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);
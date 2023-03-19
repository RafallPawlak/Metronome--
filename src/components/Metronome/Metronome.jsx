import React, { Component } from "react";
import { Section } from "../Section/Section";
import { Display } from "../Display/Display";
import { FunctionButtons } from '../FunctionButtons/FunctionButtons';
import { TempoButtons } from "../TempoButtons/TempoButtons";
import { TapButton } from "../TapButton/TapButton";
import { StartStop } from "../StartStop/StartStop";

import css from "./Metronome.module.css";

let intervalId = null;
let nextNoteTime = 0.0;   
let tapBpm = 0;
const scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec )
const noteLength = 0.04;      
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      count: 1,
      bpm: 100,
      current16thNote: 0,
      beat16thNote: 16,
      beatsPerMeasure: 4,
      beatAcctual: 1,
      notes: 1,
      interval: 1000,
      noteResolution: 1,
      led: false,
      greenLed: false,
      noteName: '4th',
    }
  }

  componentDidMount() {
    window.addEventListener('knob-move-change', this.handleInputChange);
  }
  
  nextNote = () => {
    let { current16thNote, bpm, beatsPerMeasure } = this.state;
    const beatsPerMeasure16th = beatsPerMeasure * 4;
    const secondsPerBeat = 60.0 / bpm;   
    nextNoteTime += 0.25 * secondsPerBeat;    
     this.setState({
        current16thNote: ++current16thNote,
      })
    if (current16thNote === beatsPerMeasure16th) {
      this.setState({ current16thNote: 0 })
    } 

  }

  scheduleNote = (beatNumber, time) => {
    let { beat16thNote, beatAcctual, noteResolution } = this.state;
    
    if ((noteResolution === 1) && (beatNumber % 4)) {
      return;
    }
    if ((noteResolution === 2) && (beatNumber % 2)) {
      return;
    }
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
 
    if (beatNumber %  beat16thNote === 0) {
      oscillator.frequency.value = 880.0;
      this.setState({
        beatAcctual: 1,
      });
   }
    else if (beatNumber % 4 === 0){   
      oscillator.frequency.value = 440.0;
      this.setState({
        beatAcctual: beatAcctual + 1,
      });
  } else
      oscillator.frequency.value = 280.0;
      oscillator.start(time);
    oscillator.stop(time + noteLength);
  }
  
  
  scheduler = () => {
      while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        this.scheduleNote(this.state.current16thNote, nextNoteTime);
        this.nextNote();
      }
    }

  startStop = () => {
        let buffer = audioContext.createBuffer(1, 1, 22050);
        let node = audioContext.createBufferSource();
        node.buffer = buffer;
        node.start(0);

    if (this.state.isPlaying) {
      clearInterval(intervalId);
       this.setState({
        isPlaying: false
       });
    } else {
      this.setState({
        isPlaying: true,
       current16thNote: 0
      });
      nextNoteTime = audioContext.currentTime;
      intervalId = setInterval(() => this.scheduler(), 10);
      }
    };

  beatPerMeasure = () => {
      const {beatsPerMeasure, beat16thNote} = this.state;
      if (beatsPerMeasure >= 9) {
        this.setState({
          beatsPerMeasure: 1,
          beat16thNote: 4,
        });
      } else {
        this.setState({
          beatsPerMeasure: beatsPerMeasure + 1,
          beat16thNote: beat16thNote + 4,
        });
      }
    };
  
    notes = () => {
      const { noteResolution } = this.state;
     console.log(noteResolution);

      if (noteResolution === 1) {
        this.setState({
          noteResolution: 2,
          noteName: '8th',
        });
      } else if (noteResolution === 2) {
        this.setState({
          noteResolution: 3,
          noteName: '16th'
        });
      } else {
        this.setState({
          noteResolution: 1,
          noteName: '4th'
        });
      }
    }
    
  tempoUp = () => {
    const { bpm } = this.state;
    const newBpm = parseFloat(bpm);
    if (newBpm > 190) {
      return
    } else {
      this.setState({
        bpm: newBpm + 10,
      })
    }
  }

  tempoDown = () => {
    const { bpm } = this.state;
    const newBpm = parseFloat(bpm);
    if (newBpm < 10) {
      return
    } else {
      this.setState({
        bpm: newBpm - 10,
      });
    };
  }

  handleInputChange = event => {
    const bpm = Number.parseFloat(event.target.value).toFixed(0);
      this.setState({
        bpm: bpm,
      })
  };
  
  tap = event => {
    let data = new Date();
    let time = parseInt(data.getTime(), 10);
    this.setState({
      bpm: Math.ceil(60000 / (time - tapBpm)),
    });
    tapBpm = time;
  }
    
  render() {
    const { isPlaying, bpm, beatAcctual, greenLed, beatsPerMeasure, noteName, current16thNote} = this.state;
      
    return (
      <div className={css.metronome}>
        <Section title="Metronome--" isPlaying={isPlaying} beatAcctual={beatAcctual} greenLed={greenLed} current16thNote={current16thNote}/>
        <Display bpm={bpm.toString()} beats={beatsPerMeasure} beatAcctual={beatAcctual} noteName={noteName} />
        <FunctionButtons beatsPerMeasure={this.beatPerMeasure} notes={this.notes} />
          <div className={css.container}>
            <TapButton tap={this.tap} />
            <input-knob value={bpm} scale="30" min="0" max="200" onChange={this.handleInputChange}><div className={css.mark}></div></input-knob>
          </div> 
        <TempoButtons tempoUp={this.tempoUp} tempoDown={this.tempoDown} />
        <StartStop onClick={this.startStop} isPlaying={this.state.isPlaying} />
      </div>
    );
  };
}


import React from 'react'
import { formatDate, formatShortDate } from '../utils/date';

import './MapStoryControls.css'

const StartScreen = ({ loading, start }) =>
  <div>
    <p>Timeline</p>
    <button className="map-story-controls__button" onClick={start} disabled={loading}>
      <svg className="map-story-controls__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
  </div>

const MapStoryControls = ({
    loadedMap,
    loadingInteractive,
    loadedInteractive,
    start,
    date,
    next,
    animating
  }) =>
  !loadedMap ? null :
  <div className="map-story-controls">
    { !loadedInteractive ?
      <StartScreen loading={loadingInteractive} start={start} /> :
      <div className="map-story-controls__wrapper">
        { date ?
          [
            <p key="full-date" className="map-story-controls__date map-story-controls__date--full">{ formatDate(date) }</p>,
            <p key="short-date" className="map-story-controls__date map-story-controls__date--short">{ formatShortDate(date) }</p>
          ]
        : null }
        <button className="map-story-controls__button" onClick={next} disabled={animating}>
          <svg className="map-story-controls__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div> }
  </div>

export default MapStoryControls

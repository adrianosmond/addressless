import React from 'react'

export const suffix = (dateStr) => {
  const date = new Date(dateStr);
  const number = date.getDate();
  if (number === 11 || number === 12 || number === 13) return "th"
  if (number % 10 === 1) return "st"
  if (number % 10 === 2) return "nd"
  if (number % 10 === 3) return "rd"
  return "th"
}

export const monthDay = (dateStr) => {
  const date = new Date(dateStr);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];  
  return `${months[date.getMonth()]} ${date.getDate()}`
}

export const year = (dateStr) => new Date(dateStr).getFullYear();

export const formatDate = (dateStr) =>
  <span>{monthDay(dateStr)}<sup>{suffix(dateStr)}</sup>, {year(dateStr)}</span>
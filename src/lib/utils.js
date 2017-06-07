import React from 'react';
import moment from 'moment';

const addCommasToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const formatDate = (dateStr) => {
  const date = moment(dateStr)
  return (
    <span>
      {date.format("MMMM D")}
      <sup>{date.format("Do").substr(-2)}</sup>
      {date.format(", YYYY")}
    </span>
  );
};

const urlSafeString = (string) => string.toLowerCase().replace(/[^a-z]/g, '-').replace(/--/g, '-');

export { addCommasToNumber, formatDate, urlSafeString };

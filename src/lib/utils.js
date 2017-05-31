import React from 'react';
import moment from 'moment';

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

export default formatDate;

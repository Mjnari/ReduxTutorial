import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

function TimeAgo(props) {
  const { timestamp } = props;

  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export { TimeAgo };

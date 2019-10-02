import { useState, useEffect } from 'react';
import { format } from "timeago.js";

const defaultOptions = {
  interval: 1000,
  locale: 'en_US'
};

type Options = {
  interval?: number
  locale?: string
  relativeDate?: any
}

function useTimeAgo(value: string | number, options: Options) {
  const mergedOptions = {
    ...defaultOptions,
    ...options
  }
  const [timeago, setTimeAgo] = useState(format(value, mergedOptions.locale));

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (mergedOptions.relativeDate) {
        setTimeAgo(format(value, mergedOptions.locale, mergedOptions.relativeDate))
      } else {
        setTimeAgo(format(value, mergedOptions.locale))
      }
    }, mergedOptions.interval)

    return () => clearInterval(intervalId)
  }, [timeago, mergedOptions, value])

  return timeago;
}

export default useTimeAgo;
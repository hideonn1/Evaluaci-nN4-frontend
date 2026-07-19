"use client";
import { useState, useCallback, useEffect } from 'react';
export function useCookie(cookieName: string, initialValue: string, daysToExpire: number = 365) {
  const [cookieValue, setCookieValue] = useState<string>(initialValue);
  useEffect(() => {
    const getCookie = () => {
      if (typeof document === 'undefined') return initialValue;
      const name = cookieName + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return initialValue;
    };
    setCookieValue(getCookie());
  }, [cookieName, initialValue]);
  const updateCookie = useCallback(
    (value: string) => {
      if (typeof document === 'undefined') return;
      const d = new Date();
      d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + d.toUTCString();
      document.cookie = `${cookieName}=${value};${expires};path=/`;
      setCookieValue(value);
    },
    [cookieName, daysToExpire]
  );
  return [cookieValue, updateCookie] as const;
}

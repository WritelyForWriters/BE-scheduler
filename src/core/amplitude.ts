import { createInstance, Identify } from "@amplitude/analytics-node";

const AMPLI_API_KEY = process.env.AMPLI_API_KEY;
if (!AMPLI_API_KEY) {
  throw new Error("Amplitude API Key is not set in environment variables.");
}

export const instance = createInstance();
instance.init(AMPLI_API_KEY, {
  flushIntervalMillis: 10 * 1000,
  flushQueueSize: 50,
});

export const setWritingStreak = (userId: string, num: number) => {
  const identifyObj = new Identify().set("writing_streak", num);
  instance.identify(identifyObj, { user_id: userId });
};

export const withLogging = (name: string, job: () => Promise<void> | void) => {
  return async () => {
    console.log(`[${name}] Job started`);
    try {
      await job();
      console.log(`[${name}] Job finished`);
    } catch (err) {
      console.error(`[${name}] Job failed:`, err);
    }
  };
};

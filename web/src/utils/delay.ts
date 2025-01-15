export const delay = async (timer: number) => {
  await new Promise((r) => setTimeout(r, timer));
}
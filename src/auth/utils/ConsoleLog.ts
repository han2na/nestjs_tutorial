let count = 0;

export function ConsoleLog(...message: any) {
  count += 1;
  console.log(count, message, __filename.split('dist')[1]);
}

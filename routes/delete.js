const data = input.split("\n");
const length = data[0];
let dataIndex = 1;
for (let i = 1; i <= length; i++) {
  const row_and_column = data[dataIndex].split(" ").map(Number);
  let largest = data[dataIndex + 1].split("").filter((i) => i == "#").length;
  for (let j = dataIndex + 2; j < row_and_column[0] + dataIndex + 1; j++) {
    const newLargest = data[j].split("").filter((i) => i == "#").length;
    if (largest < newLargest) largest = newLargest;
  }
  process.stdout.write(String(largest) + "\n");
  dataIndex = row_and_column[0] + dataIndex + 1;
}

// icon

const pickers = [
  {
    title: "Mức độ chính xác",
    name: "accuracy_point",
    length: 6,
  },
  {
    title: "Mức độ sạch sẽ",
    name: "location_point",
    length: 6,
  },
  {
    title: "Giải trí",
    name: "value_point",
    length: 6,
  },
  {
    title: "Phục vụ",
    name: "communication_point",
    length: 6,
  },
];

const pointInitialState = {
  accuracy_point: 0,
  location_point: 0,
  value_point: 0,
  communication_point: 0,
};

export { pickers, pointInitialState };

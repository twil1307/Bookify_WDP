const catchAsync = (fn) => {
  fn(1).catch((err) => console.log(err));
};

catchAsync(async (var1) => {
  const count = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done"), 1000);
  });

  count.then((result) => console.log(result));
});

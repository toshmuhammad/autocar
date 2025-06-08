self.onmessage = function (e) {
  const { cars, searchTerm } = e.data;
  const lowerSearch = searchTerm.toLowerCase();

  const filtered = cars.filter((car) => {
    return (
      car.model.toLowerCase().includes(lowerSearch) ||
      car.brand.toLowerCase().includes(lowerSearch)
    );
  });

  postMessage(filtered);
};

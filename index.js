import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const teaData = [];
let teaId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: teaId++, name, price };

  teaData.push(newTea);
  res.status(201).send(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).json({ msg: "Not Found Tea" });
  }
  return res.status(200).send(tea);
});

app.put("/teas/:id", (req, res) => {
  const teaIndex = teaData.findIndex(
    (tea) => tea.id === parseInt(req.params.id)
  );
  if (teaIndex === -1) {
    return res.status(404).json({ msg: "Not Found Tea" });
  }

  if (req.body?.name) {
    teaData[teaIndex].name = req.body.name;
  }
  if (req.body?.price) {
    teaData[teaIndex].price = req.body.price;
  }
  res.status(204).send(teaData[teaIndex]);
});

app.delete("/teas/:id", (req, res) => {
  const teaIndex = teaData.findIndex(
    (tea) => tea.id === parseInt(req.params.id)
  );
  if (teaIndex === -1) {
    return res.status(404).json({ msg: "Not Found Tea" });
  }
  const removedTea = teaData.splice(teaIndex, 1);
  console.log("TeaData:\t", teaData);
  res.status(204).send(teaData);
});

app.listen(port, () => {
  console.log(`Server is up on port:\t${port}...`);
});

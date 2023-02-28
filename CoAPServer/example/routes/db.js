const Router = require("../../lib/router");
const express = require("express");
const router = Router();
const routers = express.Router();
const client = require("../connection/connection");
const bodyParser = require("body-parser");
const thermometer = require("../sensors/thermometer");

routers.use(bodyParser.json());

router.get("/", (req, res) => {
  client.query(`SELECT * FROM humidity ORDER BY id_thermo`, (err, result) => {
    console.log(result.rows);

    if (!err) {
      res.json(result.rows).end();
    }
  });
});

router.post("/", (req, res) => {
  const id_thermo = JSON.stringify(6);
  const suhu = JSON.stringify(30);
  const kelembaban = JSON.stringify(82);
  // const { id_thermo, suhu, kelembaban } = req.body;
  console.log("asdsa");
  client.query(
    `INSERT INTO humidity (id_thermo, suhu, kelembaban) VALUES ('${id_thermo}', '${suhu}' , '${kelembaban}')`,
    (err) => {
      if (id_thermo < 1) {
        res.status(402).json("Gagal input data").end();
      } else {
        res.json("Insert Success").end();
        // console.log(suhu);
        // res.send("Insert succes");
      }
    }
  );
});

// router.observe("/", (req, res) => {
//   function _onupdate() {
//     res.json({
//       temperature: thermometer.temperature,
//       humidity: thermometer.humidity,
//       timestamp: new Date().getTime(),
//     });
//   }

//   console.log("Start observing...");
//   thermometer.on("update", _onupdate);
//   res.on("finish", () => {
//     thermometer.removeListener("update", _onupdate);
//     console.log("End observing.");
//   });
// });

// router.get("/temperature", (req, res) => {
//   if (thermometer.temperature >= 29) {
//     res.json({ humidity: thermometer.humidity }).end();
//   } else {
//     res
//       .json({
//         temperature: thermometer.temperature,
//         timestamp: new Date().getTime(),
//       })
//       .end();
//   }
// });

// router.get("/humidity", (req, res) => {
//   res
//     .json({
//       humidity: thermometer.humidity,
//       timeshumidity: thermometer.humidity,
//       tamp: new Date().getTime(),
//     })
//     .end();
// });

// router.get("/:foo/:bar", (req, res) => {
//   res.json(req.params).end();
// });

module.exports = router;

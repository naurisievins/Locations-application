import express from "express";
import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import bodyparser from "body-parser";
import cors from "cors";
import pool from "./pool";
import { validateName, validateLatLong } from "./utility/validate";
import { formatName } from "./utility/formatName";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

// GET locations
app.get("/locations", (req: Request, res: Response) => {
  const sql = "SELECT * FROM locations";

  pool.query(sql, (error, result) => {
    if (error) {
      res.status(500).send(`Error executing database query: ${error.message}`);
    } else {
      res.send(result);
    }
  });
});

// Post location
app.post("/post-location", (req: Request, res: Response) => {
  const name = formatName(req.body.name);
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  if (
    validateName(name) &&
    validateLatLong(latitude, -90, 90) &&
    validateLatLong(longitude, -180, 180)
  ) {
    pool.query(
      "INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)",
      [name, latitude, longitude],
      (error, result: ResultSetHeader) => {
        if (error) throw error;

        const insertedId = result.insertId;

        pool.query(
          "SELECT * FROM locations WHERE id = ?",
          [insertedId],
          (error, result) => {
            if (error) throw error;

            const insertedLocation = result[0];
            res.status(200).send(JSON.stringify(insertedLocation));
          }
        );
      }
    );
  }
});

// DELETE location by ID
app.delete("/delete-location/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  pool.query("DELETE FROM locations WHERE id = ?", [id], (error, result) => {
    if (error) throw error;
    res.status(200).send(`Location with ID ${id} has been deleted.`);
  });
});

// GET root route
app.get("/", (req: Request, res: Response) => {
  res.send("Locations");
});

// Listen port 3004
app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

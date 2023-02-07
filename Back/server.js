const express = require("express");
const cors = require("cors");
var mysql = require("mysql");
const jwt = require("jsonwebtoken");
const { json } = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "trainee",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected");
});

app.post("/registration19", (req, res) => {
  const Firstname = req.body.Firstname;
  const Lastname = req.body.Lastname;
  const Email = req.body.Email;
  const Password = req.body.Password;
  // const Confirmpassword = req.body.Confirmpassword;
  const mobilenumber = req.body.mobilenumber;
  const gender = req.body.gender;
  const address = req.body.address;
  const dob = req.body.dob;
  const token = jwt.sign(Email, "bhavya");

  con.query(`insert into registration19(Firstname, Lastname, Email, Password, accesstoken, mobilenumber, gender, address, dob) values("${Firstname}","${Lastname}","${Email}","${Password}","${token}","${mobilenumber}","${gender}","${address}","${dob}")`, function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log("inserted");
  }
  );
});

app.post("/login19", (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  try {
    con.query(`select * from registration19 where Email="${Email}" and Password="${Password}"`,
      (err, result) => {
        if (err) return res.send(err);
        else if (result.length != 0) {
          res.send;
          const token = jwt.sign(Email, "bhavya");
          // console.log("user does not exit ");
          con.query(`update registration19 set accesstoken="${token}" where Email="${Email}"`
          ),
            (err, result);
          if (err) return res.status(400).send(err);
          else {
            con.query(`select accesstoken from registration19 where accesstoken="${token}"`
            ),
              (err, result);
            if (err) throw err;
            res.status(200).send(result);
          }
        }
      }
    );
  } catch (error) {
    res.status(400).send("Error");
  }
});

app.get('/products', async (req, res) => {
  console.log("req.query.token");
  try {
    // const email = await resolveToken(req.query.token);
    // console.log(email);
    const sql = `select * from bhavyaproduct19`
    con.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      else {
        res.send(result)
        // res.json(result);
      }
    })
  } catch (err) {
    res.status(400).send(err);
  }
})


app.get("/myprofile", async (req, res) => {
  //const Token = req.body.token;
  const email = await resolveToken(req.query.token);
  console.log("email",email);
  const token = req.query.token;
  //const token = req.query.token;
  console.log(req.query);
  //res.status(200).send("Bhavya");
  if (token) {
    con.query(`select * from registration19 where accesstoken="${token}" `, function (error, result) {
      if (error) {
        console.log(error);
        return res.status(400).send(error);
      }
      // else if(result.length==0) {
      //   res.status(400).send("user is not exist");
      // }
      else {
        console.log(result)
        // if(token == result[0].accesstoken)
        // {
        //   console.log("from server", result[0].accesstoken);
        //   res.status(200).send(result[0]);
        //   console.log("token matched");
        // } 
        // else {
        //   res.status(401).send("unauthorized user");
        //   console.log("unauthorized user");
        // }
      }
    })
  }
});


const resolveToken = (token) => {
  console.log("token : ", token);
  return new Promise((resolve, reject) => {
    jwt.verify(token, "bhavya", function (err, decoded) {
      if (err) reject(err);
      console.log("decoded", decoded);
      resolve(decoded);
    });
  });
};

app.listen(9000, () => {
  console.log(`Server is running on port 9000.`);
});

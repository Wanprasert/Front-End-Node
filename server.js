// Description: Node.js HTML client 
// requires: npm install express ejs axios body-parser

const express = require('express'); 
const axios = require('axios'); 
const app = express(); 
var bodyParser = require('body-parser'); 
//const path = require("path"); //css

// Base URL for the API 
//const base_url = "https://api.example.com"; 

//const base_url = "http://10.104.9.171"; //run on ruk.com
// const base_url = "http://localhost:3000"; // localhost
const base_url = "http://node50259-wanprasert.proen.app.ruk-com.cloud";
//a
// Set the template engine 
//app.set("views", path.join(__dirname, "public/views"));
app.set('view engine', 'ejs'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Serve static files 
app.use(express.static (__dirname + '/public')); 

app.get("/", async (req, res) => { 
  try { 
      const response = await axios.get(base_url + '/scores'); 
      res.render("scores", { scores: response.data }); 
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
}); 


app.get("/index", (req, res) => { 
  res.render("index"); 
}); 
// app.get("/", async (req, res) => { 
//     try { 
//         const response = await axios.get(base_url + '/players'); 
//         res.render("players", { players: response.data }); 
//     } catch (err) { 
//         console.error(err); 
//         res.status(500).send('Error'); 
//     } 
// }); 


app.get("/create", (req, res) => { 
    res.render("create"); 
}); 
//เพิ่ม
app.post("/create", async (req, res) => { 
    try { 
        const data = { name: req.body.name, number: req.body.number }; 
        await axios.post (base_url + '/players', data); 
        res.redirect("/"); 
    } catch (err) { 
        console.error(err); 
        res.status(500).send('Error'); 
    } 
}); 
//แก้ไข
app.get("/update/:id", async (req, res) => { 
    try { 
        const response = await axios.get( 
            base_url + '/players/' + req.params.id); 
            res.render("update", { player: response.data }); 
        } catch (err) { 
            console.error(err); 
            res.status(500).send('Error'); 
        } 
    });

app.post("/update/:id", async (req, res) => { 
    try { 
        const data = { name: req.body.name, number: req.body.number }; 
        await axios.put(base_url + '/players/' + req.params.id, data); 
        res.redirect("/"); 
    } catch (err) { 
        console.error(err); 
        res.status(500).send('Error'); 
    } 
}); 

//ลบ
app.get("/delete/:id", async (req, res) => { 
    try { 
        await axios.delete(base_url + '/players/' + req.params.id);
            res.redirect("/");  
    } catch (err) { 
        console.error(err); 
        res.status(500).send('Error'); 
    } 
}); 


app.get("/teams", async (req, res) => { 
  try { 
      const response = await axios.get(base_url + '/teams'); 
      res.render("teams", { teams: response.data }); 
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
}); 

app.get("/team/:id", async (req, res) => { 
  try { 
      const response = await axios.get(base_url + '/teams/' + req.params.id); 
      res.render("team", {team: response.data }); 
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
});

app.get("/createteam", (req, res) => { 
  res.render("createTeam"); 
}); 

app.post("/createteam", async (req, res) => { 
  try { 
      const data = { team_name: req.body.team_name }; 
      await axios.post (base_url + '/teams', data); 
      res.redirect("/"); 
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
}); 

app.get("/updateteam/:id", async (req, res) => { 
  try { 
      const response = await axios.get( 
          base_url + '/teams/' + req.params.id); 
          res.render("updateteam", { team: response.data }); 
      } catch (err) { 
          console.error(err); 
          res.status(500).send('Error'); 
      } 
  });

app.post("/updateteam/:id", async (req, res) => { 
  try { 
      const data = { team_name: req.body.team_name }; 
      await axios.put(base_url + '/teams/' + req.params.id, data); 
      res.redirect("/"); 
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
}); 

//ลบ
app.get("/deleteteam/:id", async (req, res) => { 
  try { 
      await axios.delete(base_url + '/teams/' + req.params.id);
          res.redirect("/");  
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
}); 

app.get("/players", async (req, res) => { 
  try { 
      const response = await axios.get(base_url + '/players'); 
      res.render("players", { players: response.data }); 
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
}); 
app.get("/player/:id", async (req, res) => { 
    try { 
        const response = await axios.get(base_url + '/players/' + req.params.id); 
        res.render("player", {player: response.data }); 
    } catch (err) { 
        console.error(err); 
        res.status(500).send('Error'); 
    } 
  });
  
app.get("/createscore", (req, res) => { 
  res.render("createscore"); 
}); 
app.post("/createscore", async (req, res) => { 
  try { 
      const data = { playerId: req.body.playerId, teamId: req.body.teamId,score: req.body.score  }; 
      await axios.post (base_url + '/scores', data); 
      res.redirect("/"); 
  } catch (err) { 
      console.error(err); 
      res.status(500).send('Error'); 
  } 
}); 




app.get('/createscore', (req, res) => {
    res.render('createscore', { players });
  });
  
 
  


// app.get('/players', (req, res) => {
//   db.all('SELECT playerId FROM players', [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     const playerIds = rows.map(row => row.playerId);
//     res.json(playerIds);
//   });
// });


// app.listen(8080, () => { 
//             console.log('Server started on port 8080'); 
//             }); //ruk.com

app.listen(5500, () => { 
                console.log('Server started on port 5500'); 
                }); // localhost
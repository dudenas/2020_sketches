// const Datastore = require('nedb')
// let count = 0
// let _total = 0
// app.listen(8080, () => console.log('listening to port 8080'))

// app.use(express.json())
// app.use(express.static('public'))

// const database = new Datastore('database.db')
// database.loadDatabase()

// app.post('/users', (request, response) => {
//   console.log(request.body)
//   const data = request.body
//   const timestamp = Date.now()
//   data.timestamp = timestamp
//   if (data.startTime) {
//     data.current = ++count
//     data.total = ++_total
//   } else {
//     data.current = --count
//     data.total = _total
//   }

//   // insert information to a database and send the information to the user
//   database.insert(data, (err, elm) => {
//     response.json({
//       status: "success",
//       startTime: data.startTime,
//       total: count,
//       id: elm._id,
//     })
//   })
// })

// app.get('/users', (request, response) => {
//   response.json({
//     status: count,
//   })
// })


console.log('server is loading')

const express = require('express')

const app = express();

const server = require('http').Server(app)

const io = require('socket.io')(server)

server.listen(32323);

app.use(express.static('./public'))

var count = 0;

var $ipsConnected = [];

io.on('connection', function (socket) {
  socket.emit('news', {
    hello: 'world'
  });

  var $ipAddress = socket.handshake.address;

  if (!$ipsConnected.hasOwnProperty($ipAddress)) {

    $ipsConnected[$ipAddress] = 1;

    count++;

    io.sockets.emit('counter', {
      count: count
    });

  }

  console.log(`client ${socket.id} is connected`, count);

  // update counter every ten seconds
  // setInterval(() => {
  //   io.sockets.emit('counter', {
  //     count: count
  //   })
  // }, 10000)


  /* Disconnect socket */

  socket.on('disconnect', function () {

    if ($ipsConnected.hasOwnProperty($ipAddress)) {

      delete $ipsConnected[$ipAddress];

      count--;

      io.sockets.emit('counter', {
        count: count
      });

    }
  });
});

app.get("/", function (req, res) {
  // res.send("You have reached the contact page");
  console.log('test')
  res.render("testy");
});
const express = require("express");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    methods: ["PUT", "DELETE", "POST", "GET", "PATCH"],
    origin: "*",
  })
);

app.use("/", require("./routes/route"));
const PORT = 3001;

app.get("/", (req, resp) => {
  resp.write(`<h1>user connected</h1>`);
});

io.on("connection", (socket) => {
  socket.on("chat-message", (msg) => {
    socket.emit("chat-message", msg);
  });
  // socket.broadcast.emit("hello", "Welcome new user");
  // socket.join('room1')
  // io.to('room1').emit('he', 'this is chat room')

  // socket.on("create-chat-room", (msg) => {
  //   if (msg.name && msg.chatpassword) {
  //     socket.join(msg.name);
  //     socket.emit("chat-room", "chat room is created");
  //   }
  // });
  // io.of("/").adapter.on("create-room", (room) => {
  //   console.log(`room ${room} was created`);
  // });
  // const count = io.engine.clientsCount;
  // const count22 = io.of("/").sockets.size;
  // console.log(`-----------------`)
  // console.log(`count :${count}`)
  // console.log(`count22 :${count22}`)

});

io.on("connection", (socket) => {
  socket.emit("check", socket.id)
})


server.listen(process.env.NODE_REACT_APP_PORT_NO || PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_REACT_APP_PORT_NO || PORT}`
  );
});

//server file

// All of the services create todo , get todo will be created
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Synchronously we have to load the proto inside server

// once you create the package definition you need to create the packageObject
const packageDefinition = protoLoader.loadSync("./todo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// package object we need to create
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

var todoService = protoDescriptor.TodoService;

// will create new grpc server.
const server = new grpc.Server();

const todos = [
  {
    id: "1",
    title: "Todo1",
    content: "Content of Todo 1",
  },
  {
    id: "2",
    title: "Todo2",
    content: "Content of Todo 2",
  },
];

// Inside this method using our todo's proto we have lot of services defined there. we can add their implementation.
// Implementation means what have to done when we will call ListTodos
server.addService(todoService.service, {
  listTodos: (call, callback) => {
    // callback -> error first callback
    // callback expects an object to return . Here since ListTodos return the todoListobject and inside the todoListobject we have "todos" property therefore which is expected to be an  array.
    callback(null, {
      todos: todos,
    }); // return all the todos
  },
  createTodo: (call, callback) => {
    // inside the request you will be having the todo object
    let incomingNewTodo = call.request; // this will be having - message todo
    todos.push(incomingNewTodo);
    console.log(todos);
    callback(null, incomingNewTodo);
  },
  getTodo: (call, callback) => {
    let incomingTodoRequest = call.request; // this will be having - message todoRequest
    let todoId = incomingTodoRequest.id;

    //filter todo
    const response = todos.filter((todo) => todo.id == todoId);
    if (response.length > 0) {
      callback(null, response);
    } else {
      callback(
        {
          message: "Todo not found",
        },
        null
      );
    }
  },
});

// To start the server - bind the server on the particular port
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Started the server");
    server.start();
  }
);

// console.log("server started");

// server.start();

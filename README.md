## INTRODUCTION TO gRPC 

### How to make PROTO file ?

`syntax : <file_name>.proto `

`syntax = "proto3"` means whole file will be following the proto3 version (latest).

`message Todo {
    string id =1;
    string title =2;
    optional string content =3;
}` this message will be acting like an object that will be either sent or receive in an api . 

Note: By default it will be Required and if you mention optional then it will be optional .

We can also have other messages as the type.

`repeated` : can be thought like an array 

so there will be lot of todos that wil be coming .

We can even define the API contracts here . 
service TodoService
{
    // whenever there is the request to create todo then return todo 
    rpc Create(Todo) returns (Todo) {}

    //get the todo from the todo request
    rpc Get(TodoRequest) returns (Todo) {}

    // whenever there is the empty message return all of the todos 
    rpc List(Empty) returns (TodoList) {}
}

NOTE:
In Rest - /todo , /users

Recommendation ->
Whereas in protocol buffers it is action oriented . like createTodo , GetTodo , ListTodos

install: npm i @grpc/grpc-js


// every function have two things - call , callback 
// IMPORTANT : call is going to access the `request` object .Kind of fetching parameters from the request .  
# SOA Project

This project was created to show the usages of the following soa patterns:
- Authentication broker
- Service Facade
- Adapter

## Details

The purpose of this application is to allow users the ability to search books by ISBN from sources (public API’s) from all over the world. The system contains 3 main components:
- Authentication API that acts as a authentication broker (NodeJS)
- Books API (NodeJs)
- Web portal (Angular v7)

Below is the system architecture:

![alt text](https://i.imgur.com/i6ANozh.jpg)

### BMM
![alt text](https://i.imgur.com/81rdRbW.jpg)

### BPMN
![alt text](https://i.imgur.com/uwbfCdV.jpg)


## SOA Patterns Used

- **Authentication Broker**
An authentication broker assumes responsibility for authenticating consumers. Consumers are issued a token they can use to access services. 

- **Service Façade**
A service façade sits between a service and a contract. It eliminates the tight coupling between the service and its contract. This is intended to minimize changes to the service if the contract changes. A service can have multiple service façades to support multiple contracts. 

- **Message Translator**
The Message Translator is the messaging equivalent of the Adapter pattern. An adapter converts the interface of a component into a another interface so it can be used in a different context.



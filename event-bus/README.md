# Event Bus

## Routes

| Path    | Method | Body(?)                                                  | Goal                                                                  |
| ------- | ------ | -------------------------------------------------------- | --------------------------------------------------------------------- |
| /events | POST   | {eventType: String, id: String, content: String, postId} | Receive a new event from services, and emit the event to all services |

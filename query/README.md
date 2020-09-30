# Query Service

## Routes

| Path    | Method | Body(?)                                                  | Goal                              |
| ------- | ------ | -------------------------------------------------------- | --------------------------------- |
| /events | POST   | {eventType: String, id: String, content: String, postId} | Receive a new event from services |
| /posts  | GET    | -                                                        | Get all Posts and Comments        |

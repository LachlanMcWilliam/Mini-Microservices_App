# Comments Service

## Routes

| Path                | Method | Body(?)           | Goal                                              |
| ------------------- | ------ | ----------------- | ------------------------------------------------- |
| /posts/:id/comments | POST   | {content: String} | Create a new Comment associated with the given id |
| /posts/:id/comments | GET    | -                 | Get all Comments associated with a given post id  |

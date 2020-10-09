import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content;

    switch (comment.status) {
      case "approved":
        content = comment.content;
        break;
      case "pending":
        content = "pending moderation";
        break;
      case "rejected":
        content = "rejected";
        break;
      default:
        content = "error";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

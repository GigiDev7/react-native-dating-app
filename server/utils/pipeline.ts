export const genPipelineObject = () => {
  const arr = ["matches", "likes", "likedBy", "dislikes", "dislikedBy"];
  let result = [];

  for (let field of arr) {
    let obj = {
      $lookup: {
        from: "users",
        localField: field,
        foreignField: "_id",
        as: field,
        pipeline: [
          {
            $project: {
              _id: 1,
              firstname: 1,
              lastname: 1,
              age: 1,
              images: 1,
              gender: 1,
              location: 1,
              city: 1,
              country: 1,
            },
          },
        ],
      },
    };
    result.push(obj);
  }

  return result;
};

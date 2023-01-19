import React from "react";
// below allows to grab url so we can use it in our fetch one
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

// rest api way of doing things
// import useFetch from "src/hooks/useFetch";

// "ID" is a graphql special type(we're simply declaring a type of the property), "!" means that it cannot be empty
// review(id: $id)  // gets the id where the id porperty is equal to id variable we passed in
const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          body
          rating
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const ReviewDetails = () => {
  const { id } = useParams(); // that alone gives us the id of the review

  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }, // we specify variables to use in the query "REVIEW" coming from useParams
  });

  // rest api way of doing things
  // const { loading, error, data } = useFetch(
  //   `http://localhost:1337/api/reviews/${id}`,
  // );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>ReviewDetails</h1>
      <div className="review-card">
        {/* need to destructure this for clarity */}
        <div className="rating">{data.review.data.attributes.rating}</div>
        <h2>{data.review.data.attributes.title}</h2>

        {data.review.data.attributes.categories.data.map((cat) => (
          <small key={cat.id}>{cat.attributes.name}</small>
        ))}

        <ReactMarkdown>{data.review.data.attributes.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReviewDetails;

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                rating
                body
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
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(CATEGORY, {
    variables: {
      id: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>{data.category.data.attributes.name}</h1>
      {data.category.data.attributes.reviews.data.map(
        (
          review, // they just couldn't nest it any deeped, could they...
        ) => (
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>

            {review.attributes.categories.data.map((cat) => (
              <small key={cat.id}>{cat.attributes.name}</small>
            ))}
            <p>{review.attributes.body.substring(0, 200)}...</p>
            <Link to={`/details/${review.id}`}>Read more</Link>
          </div>
        ),
      )}
    </div>
  );
}

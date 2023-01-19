import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
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

// rest api way of doing things
// import useFetch from "src/hooks/useFetch";

const Homepage = () => {
  // rest api way of doing things
  // const { loading, error, data } = useFetch("http://localhost:1337/api/reviews");

  const { loading, error, data } = useQuery(REVIEWS); // those 3 things are being returned by graphql

  console.log(
    "%c [qq]: data ",
    "background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;",
    "\n",
    data,
    "\n\n",
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    return (
      <div>
        <h1>Homepage</h1>
        {/* {data.map((review) => ( */}
        {data.reviews.data.map((review) => (
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>

            {review.attributes.categories.data.map((cat) => (
              <small key={cat.id}>{cat.attributes.name}</small>
            ))}

            <p>{review.attributes.body.substring(0, 200)}...</p>
            <Link to={`/details/${review.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    );
  }
};

export default Homepage;

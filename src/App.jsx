import { Routes, Route } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import SiteHeader from "src/components/SiteHeader";
import Homepage from "src/pages/Homepage";
import ReviewDetails from "src/pages/ReviewDetails";
import Category from "src/pages/Category";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql", // needed to add graphql (I guess it's a strapi V4 thing)
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details/:id" element={<ReviewDetails />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;

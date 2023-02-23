import { Flex } from "@chakra-ui/react";
import Docka from "../components/Docka";

function App() {
  return (
    <Flex justify="center" alignItems="center" width="100%" height="100vh" flexWrap="wrap" position="relative">
      <Docka dockaNumber={1} />
      <Docka dockaNumber={2} />
      <Docka dockaNumber={3} />
      <Docka dockaNumber={4} />
      <Docka dockaNumber={5} />
      <Docka dockaNumber={6} />
      <Docka dockaNumber={7} />
      <Docka dockaNumber={8} />
      <Docka dockaNumber={9} />
      <Docka dockaNumber={10} />
    </Flex>
  );
}

export default App;

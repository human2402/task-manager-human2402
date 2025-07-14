import { Container } from "@mui/material";
import TaskList from "../features/task/TaskList";

export default function Home() {
  return (
    <Container sx={{ py: 4 }}>
      <TaskList />
    </Container>
  );
}

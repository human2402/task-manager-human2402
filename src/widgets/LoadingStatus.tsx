import { Box, CircularProgress, Typography } from "@mui/material";
import type { TaskState } from "@/entities/task/model/slice";

type LoadingStatusProps = {
  status: TaskState['status']; // статус из состояния
};

const LoadingStatus = ({ status }: LoadingStatusProps) => {
  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box textAlign="center" py={6}>
        <Typography color="error" variant="h6">
          Ошибка загрузки
        </Typography>
      </Box>
    );
  }

  return null;
};

export default LoadingStatus;

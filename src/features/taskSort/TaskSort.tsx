import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

type SortOption = "createdAt" | "priority" | "";
type Props = {
    sortOption: SortOption;
    setSortOption: (value: SortOption) => void;
}

const TaskSort = ({ sortOption, setSortOption }: Props) => {
    return (
        <FormControl size="small" sx={{ minWidth: 200, mb: 2, mr: 2 }}>
            <InputLabel id="sort-label">Сортировка</InputLabel>
            <Select
                labelId="sort-label"
                value={sortOption}
                label="Сортировка"
                onChange={(e) => setSortOption(e.target.value as any)}
            >
                <MenuItem value="">Без сортировки</MenuItem>
                <MenuItem value="createdAt">По дате создания</MenuItem>
                <MenuItem value="priority">По приоритету</MenuItem>
            </Select>
        </FormControl>
    )
}

export default TaskSort
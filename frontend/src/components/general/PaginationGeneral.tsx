// material-ui
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface Props {
  page: number;
  rowsPerPage: number;
  count: number;
  onChangePage: (value: number) => void;
  onChangeRowsPerPage: (value: number) => void;
  textCount?: boolean;
  rowsActive?: boolean;
}

const PaginationGeneral = ({
  page,
  rowsPerPage,
  onChangePage,
  count,
  onChangeRowsPerPage,
  textCount,
  rowsActive = true,
}: Props) => {
  const theme = useTheme();

  const isXS = useMediaQuery(theme.breakpoints.down('md'));

  const handleFirstPageButtonClick = (): void => {
    onChangePage(0);
  };

  const handleBackButtonClick = (): void => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = (): void => {
    onChangePage(page + 1);
  };

  const handleLastPageButtonClick = (): void => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handleRowsPerPageChange = (event: any): void => {
    onChangePage(0);
    onChangeRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Grid container alignItems="flex-end" flexDirection="column">
      {isXS && (
        <Grid item mt={2}>
          {textCount ? (
            <Typography variant="caption">
              {`${page * rowsPerPage + 1}-${page * rowsPerPage + rowsPerPage} de ${count}`}
            </Typography>
          ) : (
            <Typography variant="caption">
              {`Página ${page + 1} de ${
                Math.ceil(count / rowsPerPage) > 0 ? Math.ceil(count / rowsPerPage) : 1
              }`}
            </Typography>
          )}
        </Grid>
      )}

      <Grid item display="flex" flexDirection="row" alignItems="center">
        {/* change rows per page */}
        {rowsActive && (
          <Grid item mr={2} my={2}>
            <FormControl variant="outlined" size="small" style={{ width: '80px' }} fullWidth>
              <InputLabel id="rows-per-page-label">Filas</InputLabel>
              <Select
                labelId="rows-per-page-label"
                id="rows-per-page"
                label="Filas"
                fullWidth
                value={rowsPerPage || rowsPerPage === 0 ? rowsPerPage.toString() : ''}
                onChange={handleRowsPerPageChange}
                size="small"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {!isXS && (
          <Grid item>
            {textCount ? (
              <Typography>
                {`${page * rowsPerPage + 1}-${page * rowsPerPage + rowsPerPage} de ${count}`}
              </Typography>
            ) : (
              <Typography>
                {`Página ${page + 1} de ${
                  Math.ceil(count / rowsPerPage) > 0 ? Math.ceil(count / rowsPerPage) : 1
                }`}
              </Typography>
            )}
          </Grid>
        )}
        <Grid item>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
            size="large"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
            size="large"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={count <= rowsPerPage * (page + 1)}
            aria-label="next page"
            size="large"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={count <= rowsPerPage * (page + 1)}
            aria-label="last page"
            size="large"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaginationGeneral;

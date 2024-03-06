import { Box, Typography } from '@mui/material';
import { type FC, type PropsWithChildren } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import useAccessToken from 'src/hooks/useAccessToken';

const Fallback: FC<FallbackProps> = ({ error }) => {
  const { pathname } = useLocation();
  if (!error.message || !pathname) return;

  return (
    <Box
      display="grid"
      height="100%"
      px={2}
      sx={{
        alignContent: 'center',
        placeItems: 'center',
      }}
    >
      <svg
        style={{ maxWidth: 300, width: '60%' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40.96668 49.16565"
      >
        <g fill="white">
          <path
            d="M17.48192,19.1671c3.21726,0,3.22259-5,0-5-3.21726,0-3.22259,5,0,5h0Z"
            origin="undraw"
          />
          <path d="M23.91104,19.1671c3.21726,0,3.22259-5,0-5-3.21726,0-3.22259,5,0,5h0Z" />
          <path d="M4.86666,47.34178c1.03481-6.33217,2.41234-12.60457,4.1499-18.78141,1.68242-5.98078,3.56619-12.04924,6.08151-17.73907,.83618-1.89148,1.89304-4.08154,3.7105-5.21024,1.87606-1.16509,4.09859-.54121,5.74563,.75122,2.02908,1.59223,3.13082,4.1372,3.97571,6.50067,1.07302,3.00165,1.99225,6.06607,2.85992,9.1325,2.02506,7.15672,3.58988,14.43638,4.71278,21.78832,.20403,1.33585,1.88291,2.07378,3.0753,1.7461,1.42757-.39232,1.95074-1.73544,1.7461-3.0753-1.08669-7.11489-2.58733-14.16153-4.5181-21.09558-.95543-3.43124-1.96641-6.87098-3.19563-10.21555-1.07391-2.92199-2.44398-5.88746-4.78399-8.024C26.00138,.90541,22.75992-.4132,19.46016,.11703c-2.85236,.45834-5.07725,2.34491-6.71206,4.63273-1.75954,2.46235-2.78587,5.415-3.85088,8.22124-1.22136,3.21821-2.34523,6.47332-3.36865,9.75985C3.15534,30.35198,1.33252,38.1356,.04526,46.01258c-.21751,1.33096,.34643,2.69071,1.7461,3.0753,1.19398,.32807,2.85629-.40597,3.0753-1.7461h0Z" />
        </g>
      </svg>
      <Typography variant="h2" maxWidth={700} textAlign="center" mt={4} mb={1}>
        Ups! Algo salió mal.
      </Typography>
    </Box>
  );
};

const RootErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  useAccessToken()
  const { pathname } = useLocation();

  return (
    // change key to force the error state to reset whenever pathname changes
    <ErrorBoundary key={pathname} FallbackComponent={Fallback}>
      {children}
    </ErrorBoundary>
  );
};

export default RootErrorBoundary;

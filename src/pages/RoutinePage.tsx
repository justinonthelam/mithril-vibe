import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const RoutinePage: React.FC = () => {
  return (
    <Container>
      <Title>My Workout Routine</Title>
      {/* Other components will be added here */}
    </Container>
  );
};

export default RoutinePage; 
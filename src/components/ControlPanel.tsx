import React from 'react';
import { Checkbox, FormControlLabel, Paper, Typography, Box } from '@mui/material';

const ControlPanel = ({ 
  controls, 
  onControlChange, 
  style = {} 
}) => {
  const handleToggle = (controlName) => {
    onControlChange(controlName, !controls[controlName]);
  };

  const controlItems = [
    { key: 'cognitiveLoad', label: 'Cognitive load', color: '#1976d2' },
    { key: 'exertion', label: 'Exertion', color: '#1976d2' },
    { key: 'stability', label: 'Stability', color: '#1976d2' },
    { key: 'discomfort', label: 'Comfort', color: '#1976d2' }
  ];

  return (
    <Paper 
      elevation={2} 
      sx={{
        p: 2,
        minWidth: 200,
        border: '2px solid #1976d2',
        borderRadius: 2,
        backgroundColor: '#f8f9fa',
        ...style
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          textAlign: 'center',
          mb: 2,
          fontWeight: 'bold',
          color: '#333'
        }}
      >
        Criteria
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {controlItems.map((item) => (
          <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={controls[item.key]}
                  onChange={() => handleToggle(item.key)}
                  sx={{ p: 0 }}
                />
              }
              label={
                <Typography sx={{ fontSize: '14px', color: '#333' }}>
                  {item.label}
                </Typography>
              }
              sx={{ flex: 1, m: 0 }}
            />
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: item.color,
                opacity: controls[item.key] ? 1 : 0.3,
                transition: 'opacity 0.2s'
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ControlPanel;
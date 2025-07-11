import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box,
} from "@mui/material";

const QUESTION_LABELS = [
  ["Reduced Exertion", "Light Cognitive Load", "C1", "C2"],
  ["Reduced Exertion", "Stability", "C1", "C3"],
  ["Reduced Exertion", "Compatibility", "C1", "C4"],
  ["Reduced Exertion", "Ease of Use", "C1", "C5"],
  ["Reduced Exertion", "Productivity", "C1", "C6"],
  ["Reduced Exertion", "Comfort", "C1", "C7"],
  ["Light Cognitive Load", "Stability", "C2", "C3"],
  ["Light Cognitive Load", "Compatibility", "C2", "C4"],
  ["Light Cognitive Load", "Ease of Use", "C2", "C5"],
  ["Light Cognitive Load", "Productivity", "C2", "C6"],
  ["Light Cognitive Load", "Comfort", "C2", "C7"],
  ["Stability", "Compatibility", "C3", "C4"],
  ["Stability", "Ease of Use", "C3", "C5"],
  ["Stability", "Productivity", "C3", "C6"],
  ["Stability", "Comfort", "C3", "C7"],
  ["Compatibility", "Ease of Use", "C4", "C5"],
  ["Compatibility", "Productivity", "C4", "C6"],
  ["Compatibility", "Comfort", "C4", "C7"],
  ["Ease of Use", "Productivity", "C5", "C6"],
  ["Ease of Use", "Comfort", "C5", "C7"],
  ["Productivity", "Comfort", "C6", "C7"],
];

const RATING_OPTIONS = [
  { label: "Equal Importance (1)", value: 1 },
  { label: "Weak Slight (2)", value: 2 },
  { label: "Moderate Importance (3)", value: 3 },
  { label: "Moderate Plus (4)", value: 4 },
  { label: "Strong Importance (5)", value: 5 },
  { label: "Strong Plus (6)", value: 6 },
  { label: "Very Strong (7)", value: 7 },
  { label: "Very, Very Strong (8)", value: 8 },
  { label: "Extreme Importance (9)", value: 9 },
  { label: "Weak Slight (1/2)", value: 1 / 2 },
  { label: "Moderate Importance (1/3)", value: 1 / 3 },
  { label: "Moderate Plus (1/4)", value: 1 / 4 },
  { label: "Strong Importance (1/5)", value: 1 / 5 },
  { label: "Strong Plus (1/6)", value: 1 / 6 },
  { label: "Very Strong (1/7)", value: 1 / 7 },
  { label: "Very, Very Strong (1/8)", value: 1 / 8 },
  { label: "Extreme Importance (1/9)", value: 1 / 9 },
];

const QuestionnaireModal = ({ open, onClose, onSubmit }) => {
  const [answers, setAnswers] = React.useState(
    Array(QUESTION_LABELS.length).fill("")
  );

  const isValid = answers.every((a) => a !== "");

  const handleChange = (index) => (event) => {
    const updated = [...answers];
    updated[index] = event.target.value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const result = {};
    answers.forEach((val, i) => {
      const [_, __, key1, key2] = QUESTION_LABELS[i];
      const forwardKey = `${key1}_${key2}`;
      const num = parseFloat(val);
      result[forwardKey] = num;
    });

    onSubmit(result);
  };

  React.useEffect(() => {
    if (open) setAnswers(Array(QUESTION_LABELS.length).fill(""));
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Rate the Importance of Each Criterion in Choosing an Exoskeleton
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" gutterBottom>
          <i>
            For each question, rate how much more important the first criterion
            is compared to the second. (1 = Equal, 9 = Extremely more
            important). If the second is more important, choose a fractional
            value (e.g., 1/3).
          </i>
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          {QUESTION_LABELS.map(([label1, label2, key1, key2], index) => (
            <FormControl key={index} fullWidth>
              <Typography fontWeight="bold" gutterBottom>
                Q{index + 1}: {label1} ({key1}) vs {label2} ({key2})
              </Typography>
              <Select
                value={answers[index]}
                onChange={handleChange(index)}
                displayEmpty
              >
                {RATING_OPTIONS.map((option, optIndex) => (
                  <MenuItem key={optIndex} value={option.value.toString()}>
                    {`${option.label} — (${
                      option.value > 1
                        ? `${key1} over ${key2}`
                        : option.value < 1
                        ? `${key2} over ${key1}`
                        : "Equal"
                    })`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" disabled={!isValid} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionnaireModal;

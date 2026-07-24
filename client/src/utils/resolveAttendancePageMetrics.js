const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Converts PDF font size points to SVG user units (mm for A4 210x297 viewBox).
 * 1 point = 25.4 / 72 mm ≈ 0.352778 mm.
 */
export const ptToSvgUnit = (points) => points * 0.352778;

/**
 * Resolves single-source-of-truth metrics for Attendance Sheet layout.
 * Used identically by SVG Preview, Vector PDF Generator, and Layout Validator.
 */
export const resolveAttendancePageMetrics = ({ rowsOnPage = 39, isLastPage = false }) => {
  const safeRows = Math.max(1, Math.min(39, rowsOnPage || 1));
  const tableX = 12;
  const tableWidth = 186;

  const baseDateRowY = 44.5;
  const dateRowHeight = 8;
  const columnHeaderHeight = 8;

  let rowHeight = 5.35;
  let tableVerticalOffset = 0;

  if (!isLastPage || safeRows === 39) {
    rowHeight = 5.35;
    tableVerticalOffset = 0;
  } else {
    const baseStudentRowsY = baseDateRowY + dateRowHeight + columnHeaderHeight; // 60.5mm
    const availableFinalTableBottom = 262; // mm
    const availableRowsHeight = availableFinalTableBottom - baseStudentRowsY; // 201.5mm

    const calculatedRowHeight = availableRowsHeight / safeRows;

    if (safeRows >= 15) {
      rowHeight = clamp(calculatedRowHeight, 5.35, 9.2);
      tableVerticalOffset = 0;
    } else {
      // Short final page (< 15 rows)
      rowHeight = clamp(calculatedRowHeight, 5.35, 10.5);

      const totalBlockHeight =
        dateRowHeight + columnHeaderHeight + safeRows * rowHeight + 8 + 6;
      const availableBodySpace = 262 - (baseDateRowY + 1);
      const unusedSpace = Math.max(0, availableBodySpace - totalBlockHeight);

      tableVerticalOffset = Math.min(30, Number((unusedSpace * 0.22).toFixed(2)));
    }
  }

  const dateRowY = baseDateRowY + tableVerticalOffset;
  const columnHeaderY = dateRowY + dateRowHeight;
  const studentRowsY = columnHeaderY + columnHeaderHeight;

  const tableBottomY = studentRowsY + safeRows * rowHeight;
  const coordinatorY = tableBottomY + 8; // 8mm gap directly below final table

  // Adaptive font scaling derived from rowHeight
  const rowScale = clamp(rowHeight / 5.35, 1, 1.25);

  const serialFontSize = Number(clamp(8.8 * rowScale, 8.8, 10.5).toFixed(2));
  const enrollmentFontSize = Number(clamp(8.6 * rowScale, 8.6, 10.3).toFixed(2));
  const studentNameFontSize = Number(
    clamp(9.0 * rowScale, 9.0, safeRows < 15 ? 10.8 : 10.6).toFixed(2)
  );
  const columnHeaderFontSize = Number(clamp(9.5 * rowScale, 9.5, 10.0).toFixed(2));

  return {
    tableX,
    tableWidth,
    dateRowY,
    columnHeaderY,
    studentRowsY,
    rowHeight: Number(rowHeight.toFixed(2)),
    serialFontSize,
    enrollmentFontSize,
    studentNameFontSize,
    columnHeaderFontSize,
    coordinatorY: Number(coordinatorY.toFixed(2)),
    tableBottomY: Number(tableBottomY.toFixed(2)),
    tableVerticalOffset
  };
};

export default resolveAttendancePageMetrics;

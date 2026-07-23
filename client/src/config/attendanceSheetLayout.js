export const ATTENDANCE_PAGE = {
  width: 210,
  height: 297
};

export const ATTENDANCE_LAYOUT = {
  tableX: 25,
  tableWidth: 160,

  headerTop: 11,

  schoolY: 16,
  departmentY: 22,
  headingY: 28,
  documentTitleY: 34,
  classY: 40,

  dateRowY: 45,
  dateRowHeight: 7,

  columnHeaderY: 52,
  columnHeaderHeight: 7,

  studentRowsY: 59,
  rowHeight: 5.25,

  rowsPerPage: 39,

  coordinatorGap: 9,

  columns: {
    serial: 16,
    enrollment: 43,
    name: 82,
    sign: 19
  }
};

export const ATTENDANCE_TYPOGRAPHY = {
  fontFamily: "times",
  svgFontFamily: "'Times New Roman', Times, serif",

  school: {
    size: 13,
    weight: "bold"
  },

  department: {
    size: 10.5,
    weight: "bold"
  },

  heading: {
    size: 10,
    weight: "bold"
  },

  documentTitle: {
    size: 11.5,
    weight: "bold"
  },

  className: {
    size: 10,
    weight: "bold"
  },

  date: {
    size: 8.5,
    weight: "normal"
  },

  dateLabel: {
    size: 8.5,
    weight: "bold"
  },

  columnHeader: {
    size: 8.3,
    weight: "bold"
  },

  serial: {
    size: 7.8,
    minimumSize: 7
  },

  enrollment: {
    size: 7.5,
    minimumSize: 6.7
  },

  studentName: {
    size: 8,
    minimumSize: 6.7
  },

  coordinator: {
    size: 9.5,
    weight: "bold"
  }
};
